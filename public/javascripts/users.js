//functions for user_page.ejs

function printUserEvents(userEvents) {
    let currentEvents = ""; 
    let passedEvents = "";
    //splits the array of "," separated events into an array of event objects that are "|" separated
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

