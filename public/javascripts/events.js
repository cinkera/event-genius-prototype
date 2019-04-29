//functions for only event_page.ejs

// this function fills the event's related users into the right side div to show on the front
function fillEventsUsers(relatedUsers, eventsCreator) {
    relatedUsers = relatedUsers.split(",");
    var tableContent = "";

    for(i = 0; i < relatedUsers.length; i++) {
        if(relatedUsers[i] != "" && relatedUsers[i] != eventsCreator){
            // each user formatted as ['username|vendorType|birthday|dateCreated] 
            var thisUser = relatedUsers[i].split("|");
            var birthday = new Date(thisUser[2]);
            var ageDifMs = Date.now() - birthday.getTime();
            var ageDate = new Date(ageDifMs); // miliseconds from epoch
            var age = Math.abs(ageDate.getUTCFullYear() - 1970); // age is now correct in years
            //if owner, print them first and label as owner
            if(thisUser[0] == eventsCreator) {
                tableContent += '<div class="relatedUser">';
                tableContent += '<div class="userNameDiv">';
                tableContent += '<p>Creator:<a href="../user_page/' + thisUser[0] + '">' + thisUser[0] + '</a> </p></div>';
                tableContent += '<div class="userRatingDiv"><div class="userRatingTitle">';
                tableContent += '<p>' + thisUser[1] + '<br>Age: ' + age + '<br>Member since: ' + thisUser[3] + '</p></div>';
                tableContent += '<div class="userRatingStars"> ';
                tableContent += /*'<span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>*/'</div></div></div>';
            }
            else {
                tableContent += '<div class="relatedUser">';
                tableContent += '<div class="userNameDiv">';
                tableContent += '<a href="../user_page/' + thisUser[0] + '">' + thisUser[0] + '</a></div>';
                tableContent += '<div class="userRatingDiv"><div class="userRatingTitle">';
                tableContent += '<p>' + thisUser[1] + '<br>Age: ' + age + '<br>Member since: ' + thisUser[3] + '</p></div>';
                tableContent += '<div class="userRatingStars"> ';
                tableContent += /*'<span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>*/'</div></div></div>';
            }
        }
    }
    // fills the related users into the template
    $('#related').append(tableContent);
}

//fills all users into the form to choose users to add to the event
function fillAllUsers(allUsers, eventsCreator, relatedUsers) {
    allUsers = allUsers.split(",");
    relatedUsers = relatedUsers.split(",");
    var tableContent = "";
    let inRelated = false;
    // for each user, put get their info and print it out correctly in the add user section
    allUsers.forEach((user) => {
        var thisUser = user.split("|");
        var birthday = new Date(thisUser[2]);
        var ageDifMs = Date.now() - birthday.getTime();
        var ageDate = new Date(ageDifMs); // miliseconds from epoch
        var age = Math.abs(ageDate.getUTCFullYear() - 1970);
        // sets inRelated to TRUE if the user is already a part of the event
        relatedUsers.forEach((related) => {
            if(user == related) {
                inRelated = true;
            } 
        });
        // if user is not the creator and they are not already related, add to content string
        if(user != "" && user != eventsCreator && inRelated == false) {
            tableContent += '<div class="relatedUser">';
            tableContent += '<div class="userNameDiv">';
            tableContent += '<input type="checkbox" name="'+ thisUser[0] +'|checkbox"';
            tableContent += '<a href="../user_page/' + thisUser[0] + '">' + thisUser[0] + '</a></div>';
            tableContent += '<div class="userRatingDiv"><div class="userRatingTitle">';
            tableContent += '<p>' + thisUser[1] + '<br>Age: ' + age + '<br>Member since: ' + thisUser[3] + '</p></div>';
            tableContent += '<div class="userRatingStars"> ';
            tableContent += /*'<span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>*/'</div></div></div>';
        }
        // reset bool as false for next user
        inRelated = false;
    });
    if(tableContent == "") {
        tableContent += '<p>No users to add to this event</p>';
    }
    // Inject the whole content string into our existing HTML USERS div
    $('#eventsSearchResults').append(tableContent);
}

// fills users related to an event in the remove modal, so you can chjeck the related users and remove those checked
function relatedUsersToRemove(relatedUsers, eventsCreator) {
    // split related Users into each 
    relatedUsers = relatedUsers.split(",");
    var tableContent = "";
    //for each related user(minus event creator), print them out with checkboxes to be deleted
    $.each(relatedUsers, function(){
        // get thisUser to be each piece of info
        var thisUser = this.split("|");
        // stuff to get the age
        var birthday = new Date(thisUser[2]);
        var ageDifMs = Date.now() - birthday.getTime();
        var ageDate = new Date(ageDifMs); // miliseconds from epoch
        var age = Math.abs(ageDate.getUTCFullYear() - 1970);
        // if userName isnt "" or eventsCreatpr, print them out
        if(thisUser[0] == eventsCreator) {
            tableContent += '<div class="relatedUser">';
            tableContent += '<div class="userNameDiv">';
            tableContent += '<p>Creator:<a href="../user_page/' + thisUser[0] + '">' + thisUser[0] + '</a> </p></div>';
            tableContent += '<div class="userRatingDiv"><div class="userRatingTitle">';
            tableContent += '<p>' + thisUser[1] + '<br>Age: ' + age + '<br>Member since: ' + thisUser[3] + '</p></div>';
            tableContent += '<div class="userRatingStars"> ';
            tableContent += /*'<span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>*/'</div></div></div>';
        }
        else if (thisUser[0] != "" && thisUser[0] != eventsCreator){
            tableContent += '<div class="relatedUser">';
            tableContent += '<div class="userNameDiv">';
            tableContent += '<input type="checkbox" name="'+ thisUser[0] +'|checkbox"';
            tableContent += '<a href="../user_page/' + thisUser[0] + '">' + thisUser[0] + '</a></div>';
            tableContent += '<div class="userRatingDiv"><div class="userRatingTitle">';
            tableContent += '<p>' + thisUser[1] + '<br>Age: ' + age + '<br>Member since: ' + thisUser[3] + '</p></div>';
            tableContent += '<div class="userRatingStars"> ';
            tableContent += /*'<span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>*/'</div></div></div>';
        }
    });
    // fill the related users info on the event
    $('#relatedUsersRemove').append(tableContent);
}

// this function will make it so you can click on event's location and it will take you to google maps search of it
function fillEventLocation(location) {
    //google maps search with this link
    //https://www.google.com/maps/search/app+state/
    var locationContent = "";
    locationContent += '<a href="https://www.google.com/maps/search/' + location +' " target="_blank">' + location + '</a>';
    $('#locationLink').append(locationContent);
}


