//functions for only user_page.ejs

function printUserEvents(userEvents) {
    let currentEvents = ""; 
    let passedEvents = "";
    userEvents = userEvents.split(",");
    //console.log("... userEvents: " + userEvents);
    $.each(userEvents, function() {
        // splits event on |, new form is name|date|time 
        eventString = this.split("|");

        //current date object 
        var now = new Date();
        now.setHours(0,0,0,0);

        //YYYY-MMM-DD, this splits on - to get yyyy, mm, dd to compare against current
        let checkDate = eventString[1].split("-");

        // An event will pass the day after the event, not after the specific times
        /* ------- Printing out event dates info and current event info ----------
        console.log("... event year: " + checkDate[0] + ", checking against: " + now.getFullYear());
        console.log("... event month: " + checkDate[1] + ", checking against: " + now.getMonth());
        console.log("... event date: " + checkDate[2] + ", checking against: " + now.getDate());
        */
        //if year of event < current year
        if(checkDate[0] < now.getFullYear())
        {
            //add this event info to passedEvents
            passedEvents += '<div class="pastEvent"><div class="eventNameDiv">';
            passedEvents += '<a href="../event_page/' + eventString[0] + '" >' + eventString[0] + '</a></div>';
            passedEvents += '<div class="eventRatingDiv"><div class="eventRatingTitle">';
            passedEvents += '<p>Date: ' + eventString[1] + '</p></div>';
            passedEvents += '<div class="eventRatingStars"><p>Time: ' + eventString[2] + '</p></div></div></div>';
        }
        //if month of event > current month
        else if(checkDate[1] < now.getMonth())
        {
            //add this event info to passedEvents
            passedEvents += '<div class="pastEvent"><div class="eventNameDiv">';
            passedEvents += '<a href="../event_page/' + eventString[0] + '" >' + eventString[0] + '</a></div>';
            passedEvents += '<div class="eventRatingDiv"><div class="eventRatingTitle">';
            passedEvents += '<p>Date: ' + eventString[1] + '</p></div>';
            passedEvents += '<div class="eventRatingStars"><p>Time: ' + eventString[2] + '</p></div></div></div>';  
        }
        //if day of event < current day
        else if(checkDate[2] < now.getDate())
        {
            //add this event info to passedEvents
            passedEvents += '<div class="pastEvent"><div class="eventNameDiv">';
            passedEvents += '<a href="../event_page/' + eventString[0] + '" >' + eventString[0] + '</a></div>';
            passedEvents += '<div class="eventRatingDiv"><div class="eventRatingTitle">';
            passedEvents += '<p>Date: ' + eventString[1] + '</p></div>';
            passedEvents += '<div class="eventRatingStars"><p>Time: ' + eventString[2] + '</p></div></div></div>';
        }
        else { 
            //This event has not happened yet, add this event info to currentEvents
            currentEvents += '<div class="pastEvent"><div class="eventNameDiv">';
            currentEvents += '<a href="../event_page/' + eventString[0] + '" >' + eventString[0] + '</a></div>';
            currentEvents += '<div class="eventRatingDiv"><div class="eventRatingTitle">';
            currentEvents += '<p>Date: ' + eventString[1] + '</p></div>';
            currentEvents += '<div class="eventRatingStars"><p>Time: ' + eventString[2] + '</p></div></div></div>';
        }
    });
    // put events where they go on the page
    $('#currentEventsFillDiv').append(currentEvents);
    $('#passedEventsFillDiv').append(passedEvents);
}




