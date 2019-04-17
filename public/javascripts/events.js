//functions for only event_page.ejs

function fillEventsUsers(relatedUsers, eventsCreator) {
   // console.log("... in fillEventsUsers, related Users: " + JSON.stringify(relatedUsers));
    relatedUsers = relatedUsers.split(",");
    //console.log(relatedUsers, relatedUsers.length);
    var tableContent = "";

    for(i = 0; i < relatedUsers.length; i++) {
        if(relatedUsers[i] != "" && relatedUsers[i] != eventsCreator){
            console.log("Username: " + relatedUsers[i]);
            tableContent += '<div class="relatedUser">';
            tableContent += '<div class="userNameDiv">';
            tableContent += '<a href="../user_page/' + relatedUsers[i] + '">' + relatedUsers[i] + '</a></div>';
            tableContent += '<div class="userRatingDiv"><div class="userRatingTitle">';
            tableContent += '<p> ' + relatedUsers[i] + '\'s Rating: </p></div>';
            tableContent += '<div class="userRatingStars"> ';
            tableContent += '<span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span></div></div></div>';
            tableContent += '</div></div></div>';
        }
    }
    $('#related').append(tableContent);
}

//fills all users into the form to choose users to add to the event
function fillAllUsers(allUsers, eventsCreator, relatedUsers) {
    allUsers = allUsers.split(",");
    relatedUsers = relatedUsers.split(",");
    console.log("... all users: " + allUsers + "\n\nrelatedUsers: " + relatedUsers);
    var tableContent = "";
    let inRelated = false;
    allUsers.forEach((user) => {
        // sets inRelated to TRUE if the user is already a part of the event
        relatedUsers.forEach((related) => {
            if(user == related) {
                inRelated = true;
            } 
        });
        if(user != "" && user != eventsCreator && inRelated == false) {
            tableContent += '<div class="relatedUser">';
            tableContent += '<div class="userNameDiv">';
            tableContent += '<input type="checkbox" name="'+ user +'|checkbox"';
            tableContent += '<a href="user_page/' + user + '">' + user + '</a></div>';
            tableContent += '<div class="userRatingDiv"><div class="userRatingTitle">';
            tableContent += '<p> ' + user + '\'s Rating: </p></div>';
            tableContent += '<div class="userRatingStars"> ';
            //tableContent += '<span>â˜†</span><span>â˜†</span><span>â˜†</span><span>â˜†</span><span>â˜†</span></div></div></div>';
            tableContent += '</div></div></div>';
        }
        // reset bool as false for next user
        inRelated = false;
    });
        
    //});
    // Inject the whole content string into our existing HTML USERS div
    $('#eventsSearchResults').append(tableContent);
}

function relatedUsersToRemove(relatedUsers, eventsCreator) {
    relatedUsers = relatedUsers.split(",");
    var tableContent = "";
    $.each(relatedUsers, function(){
        //console.log("... this: " + this + " , eventsCreator: "+ eventsCreator);
        if(this != "" && this != eventsCreator){
            tableContent += '<div class="relatedUser">';
            tableContent += '<div class="userNameDiv">';
            tableContent += '<input type="checkbox" name="'+ this +'|checkbox"';
            tableContent += '<a href="user_page/' + this + '">' + this + '</a></div>';
            tableContent += '<div class="userRatingDiv"><div class="userRatingTitle">';
            tableContent += '<p> ' + this + '\'s Rating: </p></div>';
            tableContent += '<div class="userRatingStars"> ';
            //tableContent += '<span>â˜†</span><span>â˜†</span><span>â˜†</span><span>â˜†</span><span>â˜†</span></div></div></div>';
            tableContent += '</div></div></div>';
        }
    });
    $('#relatedUsersRemove').append(tableContent);
}

