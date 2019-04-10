var express = require('express');
var router = express.Router();

/*home search functionality
document.getElementById(searchBar).addEventListener("change", searchScript);
function searchScript() {
    res.send($(searchInput.value));

}
*/

/*    ============================   ROUTING STARTS     ===========================================

/* ------------------------------------------------- GET home page. --------------------------- */
router.get('/home_page', function(req, res) {
    var db = req.db;
    var Ucollection = db.get('usercollection');
    var Ecollection = db.get('eventcollection');
    console.log("\n====> Home Page");
    res.render('home_page');
});

/* ------------------------------------------------- GET vendor page. ---------------------------------------*/
router.get('/user_page', function(req, res) {
    var db = req.db;
    var Ucollection = db.get('usercollection');
    var Ecollection = db.get('eventcollection');
    console.log("\n====> User Page");
    res.render('user_page');
});

/*   --------------------------------------------------- GET event page.  ---------------------------*/
router.get('/event_page', function(req, res) {
    var db = req.db;
    var Ucollection = db.get('usercollection');
    var Ecollection = db.get('eventcollection');
    console.log("\n====> Event Page");
    res.render('event_page');
});     

/* ----------------------- GET JSON data for all users in userCollection and send to global.js to render on home page -----*/
router.get('/home_page.json', function(req, res) {
    console.log("\n====> homepage.json");
    var allUsers = [];
    var allEvents = [];
    var db = req.db;
    var Ucollection = db.get('usercollection');
    var Ecollection = db.get('eventcollection');
    Ucollection.find({},{},function(e,docs){
        allUsers = docs;  
        //console.log("... all users in DB: " + allUsers);
    });
    Ecollection.find({},{},function(e,docs){
        allEvents = docs;
        //console.log("... all events in DB: " + allEvents);
        //console.log("... allUsers.length: " + allUsers.length);
        if(allUsers.length == 0) { // On reload, users would become "". This fixes that and sends the correct data
            Ucollection.find({},{},function(e,docs){
                allUsers = docs;
                console.log("... allUsers.length was 0, is now: " + allUsers.length);
                res.send({ users: allUsers, events: allEvents });
            });
        } else {
            res.send({ users: allUsers, events: allEvents });
        }
    });
}); 

/* --------------------------------------- GET JSON data for search query and return users and events that match -----*/
router.get('/search.json', function(req, res) {
    console.log("\n====> search.json");
    var foundUsers = [];
    var foundEvents = [];
    var db = req.db;
    var Ucollection = db.get('usercollection');
    var Ecollection = db.get('eventcollection');    
    Ucollection.find({userName: searchParam, 
                      firstName: searchParam, 
                      lastName: searchParam },{},function(e,docs){
        foundUsers = docs;        
        console.log("... Found Users: " + foundUsers);
    });
    Ecollection.find({eventName: searchParam},{},function(e,docs){
        foundEvents = docs;
        console.log("... Found Events: " + foundEvents);
        res.send({ users: foundUsers, events: foundEvents });
    });
    
}); 

/* ---------------------------------------------------- GET JSON data and route to userpage/... -------------------*/
router.get('/user_page/:userName', function(req, res) {
    if(req.params.userName != ":userName" && req.params.userName != "home_page.json" && req.params.userName != null) {
        console.log("\n===============  USER NAME: ===== " + req.params.userName);
        var db = req.db;
        var Ucollection = db.get('usercollection');
        var userObject = [];
        var curruser = req.params.userName;
        Ucollection.findOne({userName: {$eq:curruser}},function(e,docs){
            if (docs) {
                //console.log(docs._id);
                userObject = [{    
                    userID: docs._id,    
                    userName: docs.userName, 
                    firstName: docs.firstName,
                    middleName: docs.middleName,
                    lastName: docs.lastName,
                    userEmail: docs.useremail,
                    userBio: docs.userBio,
                    phoneNum: docs.phoneNum,
                    birthday: docs.birthday,
                    soundcloudLink: docs.soundcloudLink,
                    facebookLink: docs.facebookLink,
                    instagramLink: docs.instagramLink    
                }];
                console.log(userObject);
                res.render('user_page', {
                    userID: docs._id,    
                    userName: docs.userName, 
                    firstName: docs.firstName,
                    middleName: docs.middleName,
                    lastName: docs.lastName,
                    userEmail: docs.useremail,
                    userBio: docs.userBio,
                    phoneNum: docs.phoneNum,
                    birthday: docs.birthday,
                    soundcloudLink: docs.soundcloudLink,
                    facebookLink: docs.facebookLink,
                    instagramLink: docs.instagramLink  
                }); 
            }
        });
    }   
});

/* -----------------------------------------------------  GET JSON data and route to event_page/... -------------*/
router.get('/event_page/:eventName', function(req, res) {
    if(req.params.eventName != ":eventName" && req.params.eventName != "home_page.json" && req.params.eventName != null) {
        console.log("\n===============  EVENT NAME: ===== " + req.params.eventName);
        var db = req.db;
        var Ecollection = db.get('eventcollection');
        var eventObject = [];
        var currevent = req.params.eventName;
        Ecollection.findOne({eventName: {$eq:currevent}},function(e,docs){
            if (docs) {
                //console.log(docs._id);
                eventObject = [{    
                    eventID: docs._id,    
                    eventName: docs.eventName, 
                    eventTime: docs.eventTime,
                    eventDate: docs.eventDate,
                    eventLocation: docs.eventLocation, 
                    eventDesc: docs.eventDesc
                }];
                console.log(eventObject);
                res.render('event_page', {
                    eventID: docs._id,    
                    eventName: docs.eventName, 
                    eventTime: docs.eventTime,
                    eventDate: docs.eventDate, 
                    eventLocation: docs.eventLocation, 
                    eventDesc: docs.eventDesc
                }); 
            }
            else {
                console.log("... did not find event " + currevent + " in the database.");
                console.log("... redirecting to home_page");
                res.redirect('../home_page');
            }
        });
    }   
});

/* ---------------------------------------------------  POST to update User Service  -------------------------------*/
router.post('/updateUserInfo/:userName', function(req, res) {
    console.log("\n====> update User " + req.params.userName);
    // Set our collection in internal DB variable
    var collection = req.db.get('usercollection');
    var oldUserName = req.params.userName;

    // Get our form values. These rely on the "name" attributes check that they arent equal or null
        var userName = req.body.editUserName;
        var firstName = req.body.editFirstName;
        var middleName = req.body.editMiddleName;
        var lastName = req.body.editLastName;
        var userEmail = req.body.editEmail;
        var phoneNum = req.body.editPhone1;
        var userBio = req.body.editUserBio;
        var userExp = req.body.editUserExp;
        var birthday = req.body.editBirthday;
        var soundcloudLink = req.body.editSoundcloudLink;
        var facebookLink = req.body.editFacebookLink;
        var instagramLink = req.body.editInstagramLink;

    // update in the DB
    collection.findOneAndUpdate(
        {userName: {$eq:oldUserName}}, // Query to find the user to update
        {$set: {         // Update all values (needs error checking/val)
                "userName" : userName,
                "firstName" : firstName,
                "middleName" : middleName,
                "lastName" : lastName,
                "useremail" : userEmail, 
                "phoneNum" : phoneNum, 
                "userBio": userBio,
                "userExp": userExp,
                "birthday" : birthday, 
                "soundcloudLink" : soundcloudLink, 
                "instagramLink" : instagramLink, 
                "facebookLink" : facebookLink}},
        {new: true}, (err, doc) => {
            if (err) {
                console.log("Something wrong when updating data!");
            }
            console.log("... redirecting to: ../user_page/" + userName);
            //console.log(doc);
            res.redirect("../user_page/" + userName);
        }
    );
});

/* ------------------------------------------- POST to Add User Service ------------------------------*/
router.post('/adduser', function(req, res) {
    console.log("\n====> Add User");
    // Set our internal DB variable
    var db = req.db;
    console.log("          db = " + db);

    // Get our form values. These rely on the "name" attributes
    var userName = req.body.userName;
    console.log(userName);
    var firstName = req.body.firstName;
    var middleName = req.body.middleName;
    var lastName = req.body.lastName;
    var userEmail = req.body.email;
    var userBio = req.body.userBio;
    var userExp = req.body.userExp;
    var phoneNum = req.body.phone1;
    var birthday = req.body.birthday;
    var soundcloudLink = req.body.soundcloudLink;
    var facebookLink = req.body.facebookLink;
    var instagramLink = req.body.instagramLink;

    // Set our collection
    var collection = db.get('usercollection');
    console.log("          collection = " + collection);

    // Submit to the DB
    collection.insert({
        "userName" : userName,
        "firstName" : firstName,
        "middleName" : middleName,
        "lastName" : lastName,
        "useremail" : userEmail, 
        "phoneNum" : phoneNum, 
        "userBio" : userBio, 
        "userExp" : userExp, 
        "birthday" : birthday, 
        "soundcloudLink" : soundcloudLink, 
        "instagramLink" : instagramLink, 
        "facebookLink" : facebookLink
    }, function (err, doc) {
        if (err) {
       // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // And forward to success page
            res.redirect("user_page/" + userName);
        }
    });
});


/* ----------------------------------------- POST to create event Service -------------------------------- */
router.post('/createEvent', function(req, res) {
    console.log("\n====> Create Event");
    var db = req.db; // Set our internal DB variable

    //console.log("... userName = " + req.params.userName);

    // Get our form values. These rely on the "name" attributes
    var eventName = req.body.eventName;
    var eventTime = req.body.eventTime;
    var eventDate = req.body.eventDate;
    var eventLocation = req.body.eventLocation;
    var eventDesc = req.body.eventDesc;
    //console.log("... event name: " + eventName);

    // Set our collection
    var collection = db.get('eventcollection');

    // Submit to the DB
    collection.insert({
        "eventName" : eventName,
        "eventTime" : eventTime, 
        "eventDate" : eventDate, 
        "eventLocation" : eventLocation,
        "eventDesc": eventDesc
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("... There was a problem adding the information to the database.");
        }
        else {
            // And forward to success page
            res.redirect("event_page/" + eventName);
        }
    });
});

/* ---------------------------------------------------  POST to update EVENT Service  -------------------------------*/
router.post('/updateEventInfo/:eventName', function(req, res) {
    console.log("\n====> update Event " + req.params.eventName);
    // Set our collection in internal DB variable
    var collection = req.db.get('eventcollection');
    var oldEventName = req.params.eventName;

    // Get our form values. These rely on the "name" attributes check that they arent equal or null
    var eventName = req.body.editEventName;
    var eventTime = req.body.editEventTime;
    var eventDate = req.body.editEventDate;
    var eventLocation = req.body.editEventLocation;
    var eventDesc = req.body.editEventDesc;

    // update in the DB
    collection.findOneAndUpdate(
        {eventName: {$eq:oldEventName}}, // Query to find the event to update
        {$set: {         // Update all values (needs error checking/val)
                "eventName" : eventName,
                "eventDate" : eventDate, 
                "eventTime" : eventTime, 
                "eventLocation" : eventLocation,
                "eventDesc": eventDesc}}, 
        {new: true}, (err, doc) => {
            if (err) {
                console.log("... Something wrong when updating data!");
            }
            console.log("... redirecting to: ../event_page/" + eventName);
            //console.log("... updated event info: " + docs);
            res.redirect("../event_page/" + eventName);
        }
    );
});

// ==============================================      ROUTING ENDS        =====================================================

module.exports = router;
