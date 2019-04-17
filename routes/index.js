var express = require('express');
var router = express.Router();

/*home search functionality
document.getElementById(searchBar).addEventListener("change", searchScript);
function searchScript() {
    res.send($(searchInput.value));

}
*/

/* =======================================   ROUTING STARTS     ===========================================

/* ------------------------------------------------- GET home page. --------------------------- */
router.get('/home_page', function(req, res) {
    var db = req.db;
    var Ucollection = db.get('usercollection');
    var Ecollection = db.get('eventcollection');
    console.log("\n====> Home Page");
    console.log("hi jenny !");
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
    console.log("\n====> home_page.json");
    var allUsers = [];
    var allEvents = [];
    var db = req.db;
    var Ucollection = db.get('usercollection');
    var Ecollection = db.get('eventcollection');
    Ucollection.find({},{},function(e,docs){
        allUsers = docs;  
    });
    Ecollection.find({},{},function(e,docs){
        allEvents = docs;
        if(allUsers.length == 0) { // On reload, users would become "". This fixes that and sends the correct data.
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
        var Ecollection = db.get('eventcollection');
        var userObject = []; // for user object to be created ( only used for viewing data in cmd for testing )
        var usersEvents = []; // need an  array of events, times and dates
        var curruser = req.params.userName;
        Ucollection.findOne({userName: {$eq:curruser}},function(e,docs){
            if (docs) {
                var counter = 0;
                console.log(docs.userEvents);
                // this code block gets the usersEvents and adds them to the array to be sent to the template page
                // and then used in users.js to be printed onto the user's page
                Ecollection.find({eventName: {$in:docs.userEvents}},function(e,doc){
                    if(e) { console.log("... did not find event " + docs.userEvents + " in the database."); } 
                    else {  
                        doc.forEach((ele) => {
                            console.log("... event info: " + ele.eventName + ", " + ele.eventDate + ", " + ele.eventTime);
                            usersEvents[counter] = ele.eventName + "|" + ele.eventDate + "|" + ele.eventTime;
                            counter++;
                        });
                    }
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
                        instagramLink: docs.instagramLink,
                        userEvents: usersEvents
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
                        instagramLink: docs.instagramLink,
                        userEvents: usersEvents
                    });
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
        var Ucollection = db.get('usercollection');
        var eventObject = [];
        var allUsers = [];
        var currevent = req.params.eventName;
        Ucollection.find({},{},function(e,docs){
            docs.forEach(ele => {
                allUsers += ele.userName + ",";  
            });
        });

        // --------------- using findOne returns to stack, reformat this *******************
        Ecollection.findOne({eventName: {$eq:currevent}},function(e,docs){
            if (docs) {
                eventObject = [{    
                    eventID: docs._id,    
                    eventName: docs.eventName, 
                    eventTime: docs.eventTime,
                    eventDate: docs.eventDate,
                    eventLocation: docs.eventLocation, 
                    eventDesc: docs.eventDesc, 
                    eventsCreator: docs.eventsCreator,
                    relatedUsers: docs.relatedUsers,
                    allUsers: allUsers   
                }];
                console.log(eventObject);
                console.log("...allUsers.length: " + allUsers.length);
                if(allUsers.length == 0) {
                    Ucollection.find({},{},function(e,docs){
                        docs.forEach(ele => {
                            allUsers += ele.userName + ",";  
                        });
                    });
                }
                res.render('event_page', {
                    eventID: docs._id,    
                    eventName: docs.eventName, 
                    eventTime: docs.eventTime,
                    eventDate: docs.eventDate, 
                    eventLocation: docs.eventLocation, 
                    eventDesc: docs.eventDesc,
                    eventsCreator: docs.eventsCreator,
                    relatedUsers: docs.relatedUsers,
                    allUsers: allUsers                    
                }); 
            } else {
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
    console.log("... req.params: " + JSON.stringify(req.params));
    var Ucollection = req.db.get('usercollection');
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
   // var userEvents = req.body.editUserEvents;
    //console.log("... userEvents: " + userEvents);


     Ucollection.find({userName: {$eq:userName}}, (err, docs) => { 
        // if docs = "", name exists in DB already. Don't create account
        if(docs != "") {
                console.log("this name DOES exist in the db");
                // --------------------------------- CREATE ERROR PAGE TO SEND
                res.send("This user name already exists in the database!");
        }
        else{
            console.log("this name does not exist in the db");
            // update in the DB
            Ucollection.findOneAndUpdate(
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
                        //},$push:{"userEvents":userEvents}},
                {new: true}, (err, doc) => {
                    if (err) {
                        console.log("Something wrong when updating data!");
                    }
                    console.log("... redirecting to: ../user_page/" + userName);
                    res.redirect("../user_page/" + userName);
            });
        }
    });
    
});

/* ------------------------------------------- POST to Add User Service ------------------------------*/
router.post('/adduser', function(req, res) {
    console.log("\n====> Add User");

    // Set our internal DB variable
    var db = req.db;
    // Set our collection
    var Ucollection = db.get('usercollection');

    // Get our form values. These rely on the "name" attributes
    var userName = req.body.userName;
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

    //if Name is already in database, error
    Ucollection.find({userName: {$eq:userName}}, (err, docs) => { 
        // if docs = "", name exists in DB already. Don't create account
        if(docs != "") {
                console.log("this name DOES exist in the db");
                // --------------------------------- CREATE ERROR PAGE TO SEND
                res.send("This user name already exists in the database!");
        }
        else {
            console.log("this name does not exist in the db");
            // Submit to the DB
            Ucollection.insert({
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
                "facebookLink" : facebookLink,
                "userEvents": [],
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
        }
    });
});

/* ----------------------------------------- POST to create event Service -------------------------------- */
router.post('/createEvent', function(req, res) {
    console.log("\n====> Create Event");
    var db = req.db; // Set our internal DB variable
    //console.log("... req.body = " + JSON.stringify(req.body));
    // Get our form values. These rely on the "name" attributes
    var eventsCreator = req.body.eventsCreator
    var eventName = req.body.eventName;
    var eventTime = req.body.eventTime;
    var eventDate = req.body.eventDate;
    var eventLocation = req.body.eventLocation;
    var eventDesc = req.body.eventDesc;
    var eventsCreator = req.body.eventsCreator;
    var relatedUsers = [req.body.eventsCreator];
    // Set our collection
    var Ecollection = db.get('eventcollection');
    var Ucollection = db.get('usercollection');

    //if Name is already in database, error 
    // AND query for only eventCreator's events, make sure 1 creator cannot create 2 same events, 
    // but 2 different creartors could create same named event
    Ecollection.find({eventName: {$eq:eventName}}, (err, docs) => { 
        // if docs = "", name exists in DB already. Don't create account
        if(docs != "") {
                console.log("... this name DOES exist in the db");
                // --------------------------------- CREATE ERROR PAGE TO SEND
                res.send("This event name already exists in the database!");
        }
        else {
            console.log("... This name does not exist in the database");

            //add the event to creator's userEvents
            Ucollection.findOneAndUpdate({userName: {$eq:eventsCreator}}, {$push:{"userEvents":eventName}}, (err, docs) => {
                if(err) {
                    console.log("... error adding eventName to array userEvents");
                }
            });

            // Submit to the DB
            Ecollection.insert({
                "eventName" : eventName,
                "eventTime" : eventTime, 
                "eventDate" : eventDate, 
                "eventLocation" : eventLocation,
                "eventDesc": eventDesc,
                "eventsCreator": eventsCreator,
                "relatedUsers" : relatedUsers
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
        }
    });
    
});

/* ---------------------------------------------------  POST to update EVENT Service  -------------------------------*/
router.post('/updateEventInfo/:eventName', function(req, res) {
    console.log("\n====> update Event " + req.params.eventName);
    var Ecollection = req.db.get('eventcollection');
    var oldEventName = req.params.eventName;

    // Get our form values. These rely on the "name" attributes check that they arent equal or null
    var eventName = req.body.editEventName;
    var eventTime = req.body.editEventTime;
    var eventDate = req.body.editEventDate;
    var eventLocation = req.body.editEventLocation;
    var eventDesc = req.body.editEventDesc;
    var eventsCreator = req.body.editEventsCreator;

    Ecollection.find({eventName: {$eq:eventName}}, (err, docs) => { 
        // if docs = "", name exists in DB already. Don't create account
        if(docs != "") {
            console.log("... this name DOES exist in the db");
            // --------------------------------- CREATE ERROR PAGE TO SEND
            res.send("This event name already exists in the database!");
        }
        else {
            // Event name doesn't exist in DB yet, update in the DB
            Ecollection.findOneAndUpdate(
                {eventName: {$eq:oldEventName}}, // Query to find the event to update
                {$set: {         // Update all values (needs error checking/val)
                        "eventName" : eventName,
                        "eventDate" : eventDate, 
                        "eventTime" : eventTime, 
                        "eventLocation" : eventLocation,
                        "eventDesc": eventDesc,
                        "eventsCreator" : eventsCreator}}, 
                {new: true}, (err, doc) => {
                    if (err) {
                        console.log("... Something wrong when updating data!");
                    }
                    console.log("... redirecting to: ../event_page/" + eventName);
                    res.redirect("../event_page/" + eventName);
                });
        }

    });
    
});

/* ----------------------------------------- POST to addUsersToEvent Service -------------------------------- */
router.post('/addUsersToEvent/:eventName', function(req, res) {
    console.log("\n====> add users to Event ");
    var checkedUsers = JSON.stringify(req.body).split(",");
    var usersToAdd = [];
    var currevent = req.params.eventName;
    var collection = req.db.get('eventcollection');

    //this will get the userNames that were checked to add to the db, and load them into array
    checkedUsers.forEach((ele)=> {
        ele = ele.replace("\"", "");
        ele = ele.replace("{", "");
        var user = ele.split("|");
        usersToAdd.push(user[0]);
    });
    console.log("... usersToAdd: " + usersToAdd);
    usersToAdd.forEach((ele) => {
        collection.findOneAndUpdate({eventName: {$eq:currevent}},{$push: {"relatedUsers" : ele}},(err, doc) => {
            if (err) {
                console.log("... Something wrong when updating data!");
            }
        });
    });
    console.log("... redirecting to: ../event_page/" + currevent);
    res.redirect("../event_page/" + currevent);
});

/* ----------------------------------------- POST to removeUsersFromEvent Service -------------------------------- */
router.post('/removeUsersFromEvent/:eventName', function(req, res) {
    console.log("\n====> add users to Event ");
    var checkedUsers = JSON.stringify(req.body).split(",");
    var usersToAdd = [];
    var currevent = req.params.eventName;
    var collection = req.db.get('eventcollection');

    //this will get the userNames that were checked to add to the db, and load them into array
    checkedUsers.forEach((ele)=> {
        ele = ele.replace("\"", "");
        ele = ele.replace("{", "");
        var user = ele.split("|");
        usersToAdd.push(user[0]);
    });
    console.log("... usersToAdd: " + usersToAdd);
    usersToAdd.forEach((ele) => {
        collection.findOneAndUpdate({eventName: {$eq:currevent}},{$pull: {"relatedUsers" : ele}},(err, doc) => {
            if (err) {
                console.log("... Something wrong when updating data!");
            }
        });
    });
    console.log("... redirecting to: ../event_page/" + currevent);
    res.redirect("../event_page/" + currevent);
});

// ==============================================      ROUTING ENDS        =====================================================


module.exports = router;
