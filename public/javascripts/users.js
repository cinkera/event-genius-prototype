//functions for user_page.ejs

function printUserEvents(userEvents) {
    let currentEvents = ""; 
    let passedEvents = "";
    //splits the array of "," separated events into an array of event objects that are "|" separated
    if(userEvents.length > 0) {
        userEvents = userEvents.split(",");
        $.each(userEvents, function() {
            // splits event on |, new form is name|date|time 
            eventString = this.split("|");

            //current date object 
            var now = new Date();
            now.setHours(0,0,0,0);

            //format the event's date into a Date se we can easily check if current or past
            var newDate = new Date(eventString[1]);

            if(now < newDate) {
                //the date has not passed yet, throw it in current events
                currentEvents += '<div class="pastEvent"><div class="eventNameDiv">';
                currentEvents += '<a href="../event_page/' + eventString[0] + '" >' + eventString[0] + '</a></div>';
                currentEvents += '<div class="eventRatingDiv"><div class="eventRatingTitle">';
                currentEvents += '<p>Date: ' + eventString[1] + '<br>Time: ' + eventString[2] + '<br>Location: ' + eventString[3] + '</p></div>';
                currentEvents += '<div class="eventRatingStars"></div></div></div>'; 
            }
            else {
                //the date has passed, throw it in passed events
                passedEvents += '<div class="pastEvent"><div class="eventNameDiv">';
                passedEvents += '<a href="../event_page/' + eventString[0] + '" >' + eventString[0] + '</a></div>';
                passedEvents += '<div class="eventRatingDiv"><div class="eventRatingTitle">';
                passedEvents += '<p>Date: ' + eventString[1] + '<br>Time: ' + eventString[2] + '<br>Location: ' + eventString[3] + '</p></div>';
                passedEvents += '<div class="eventRatingStars"></div></div></div>';
            }
        });
    }
    else {
        currentEvents, passedEvents = "";
    }
    //if either strings to load are empty, show a message
    if(currentEvents == "") {
        currentEvents += '<p>No current events to show</p>';
    }
    if(passedEvents == "") {
        passedEvents += '<p>No past events to show</p>';
    }

    // put events where they go on the page
    $('#currentEventsFillDiv').append(currentEvents);
    $('#passedEventsFillDiv').append(passedEvents);
}

// this function will print all events a user owns with checkboxes, they check and then submit, they get deleted from DB
function printEventsToRemove(userEvents, userName) {
    var eventsOwned = "";
    userEvents = userEvents.split(",");
    $.each(userEvents, function(){
        eventString = this.split("|");
        if(eventString[4] == userName.trim()) {
            eventsOwned += '<div class="pastEvent"><div class="eventNameDiv">';
            eventsOwned += '<input type="checkbox" name="'+ eventString[0] +'|checkbox"';
            eventsOwned += '<a href="../event_page/' + eventString[0] + '" >' + eventString[0] + '</a></div>';
            eventsOwned += '<div class="eventRatingDiv"><div class="eventRatingTitle">';
            eventsOwned += '<p>Date: ' + eventString[1] + '<br>Time: ' + eventString[2] + '<br>Location: ' + eventString[3] + '</p></div>';
            eventsOwned += '<div class="eventRatingStars"></div></div></div>';
        }
    });
    if(eventsOwned == "") eventsOwned = "You do not own any events to delete!";
    $('#ownedEvents').append(eventsOwned);
}

function printLinks(facebookLink, soundcloudLink, instagramLink, youtubeLink, otherLink) {
    var editlinks = "";
    var linkshtml = "";
    var lengthstring = facebookLink.length + soundcloudLink.length + instagramLink.length + youtubeLink.length + otherLink.length;
    if(lengthstring > 5) {
        linkshtml += '<p> Check me out on Social Media! </p>';
    }
    // error check and fill in html for social media links
    if (facebookLink == null || facebookLink == "" || facebookLink == " ") facebookLink = "";
    else linkshtml += "<a href='"+ facebookLink +"' target='_blank'> <img src='/images/facebookIcon50px.png' /> </a>";

    if (soundcloudLink == null || soundcloudLink == "" || soundcloudLink == " ") soundcloudLink = "";
    else linkshtml += "<a href='"+ soundcloudLink +"' target='_blank'> <img src='/images/soundcloudIcon50px.png' /> </a>";

    if (instagramLink == null || instagramLink == "" || instagramLink == " ") instagramLink = "";
    else linkshtml += "<a href='"+ instagramLink +"' target='_blank'> <img src='/images/instagramIcon50px.png' /> </a>";

    if (youtubeLink == null || youtubeLink == "" || youtubeLink == " ") youtubeLink = "";
    else linkshtml += "<a href='"+ youtubeLink +"' target='_blank'> <img src='/images/youtubeIcon50px.png' /> </a>";

    if (otherLink == null || otherLink == "" || otherLink == " ") otherLink = "";
    else linkshtml += "<a href='"+ otherLink +"' target='_blank'> <img src='/images/otherIcon50px.png' /> </a>";

    // fill in html to add to editLinks space
    editlinks += "<label>Soundcloud: <input type='url' name='editSoundcloudLink' size='35' value='"+ soundcloudLink +"'></label><br>";
    editlinks += "<label>Facebook: <input type='url' name='editFacebookLink' size='35' value='"+ facebookLink +"'></label><br>";
    editlinks += "<label>Instagram: <input type='url' name='editInstagramLink'  size='35' value='"+ instagramLink +"'></label><br>";
    editlinks += "<label>youtube: <input type='url' name='editYoutubeLink' size='35' value='"+ youtubeLink +"'></label><br>";
    editlinks += "<label>Other: <input type='url' name='editOtherLink' size='35' value='"+ otherLink +"'></label><br></br>";

    //fill in editLinks and Links
    $('#editLinks').append(editlinks);
    $('#socialMedias').append(linkshtml);
}

function printAges(bday, dateCreated) {
    console.log("... bday: " + bday);
    console.log("... date created: " + dateCreated);

    var birthday = new Date(bday);
    var ageDifMs = Date.now() - birthday.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    var age = Math.abs(ageDate.getUTCFullYear() - 1970);

    $('#userAgeFill').append(age);
    $('#userDateFill').append(dateCreated);
}
