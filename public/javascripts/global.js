//functions to be used by any of the .ejs files

// DOM Ready =============================================================
$(document).ready(function() {

    // Populate the home page elements
    populateHomePage();
});

// ===================================== Functions ============================================================

function populateHomePage() {   
  // jQuery AJAX call for JSON
  $.getJSON('home_page.json', function( data ) {
      console.log("=============> home_page.json in global populateHomePage");
      //console.log("... data.users.length: " + data.users.length);
      //console.log("... data.events: " + data.events);

        // Empty content string
        var tableContent = '<p>All Users In Database</p>';
        var eventContent = '<p>All Events In Database</p>';
      
        // For each item in our JSON, add a table row and cells to the content string
        $.each(data.users, function(){
                //console.log("Username: " + this.userName);
                tableContent += '<div class="userDiv">';
                tableContent += '<div class="userNameDiv">';
                tableContent += '<a href="user_page/' + this.userName + '">' + this.userName + '</a></div>';
                tableContent += '<div class="userRatingDiv"><div class="userRatingTitle">';
                tableContent += '<p> ' + this.userName + '\'s Rating: </p></div>';
                tableContent += '<div class="userRatingStars"> ';
                tableContent += '<span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span></div></div></div>';
                tableContent += '</div></div></div>';
        });
        
        // For each item in our JSON, add a table row and cells to the content string
        $.each(data.events, function(){
            //if(this.userName != ":eventName" && this.eventName != "home_page.json" && this.eventName != null) {
                //console.log("... event name: " + this.eventName);
                eventContent += '<div class="userDiv">';
                eventContent += '<div class="userNameDiv">';
                eventContent += '<a href="event_page/' + this.eventName + '">' + this.eventName + '</a></div>';
                eventContent += '<div class="userRatingDiv"><div class="userRatingTitle">';
                eventContent += '<p> ' + this.eventName + '\'s Rating: </p></div>';
                eventContent += '<div class="userRatingStars"> ';
                eventContent += '<span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span></div></div></div>';
            //}
        });

        // Inject the whole content string into our existing HTML USERS div
        $('#homeFillDiv').append(tableContent);
        // Inject the whole content string into our existing HTML EVENT div
        $('#homeFillEventDiv').append(eventContent);
    });
};

/*
function searchEventsAndUsers(searchParam) {
    var tableContents = '';
    console.log("... searchParam: " + searchParam);
    Ucollection.find({userName: {$eq:searchParam}},function(e,docs){
        // For each USER that matches searchParam, fill in their info
        $.each(docs, function(){
                console.log("Username: " + this.userName);
                tableContent += '<div class="userDiv">';
                tableContent += '<div class="userNameDiv">';
                tableContent += '<a href="user_page/' + this.userName + '">' + this.userName + '</a></div>';
                tableContent += '<div class="userRatingDiv"><div class="userRatingTitle">';
                tableContent += '<p> ' + this.userName + '\'s Rating: </p></div>';
                tableContent += '<div class="userRatingStars"> ';
                tableContent += '<span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span></div></div></div>';
                tableContent += '</div></div></div>';
        });
    });
    Ecollection.find({eventName: {$eq:searchParam}},function(e,docs){
        // For each EVENT in our JSON, add a table row and cells to the content string
        $.each(docs, function(){
            //if(this.userName != ":eventName" && this.eventName != "home_page.json" && this.eventName != null) {
                console.log("... event name: " + this.eventName);
                tableContent += '<div class="userDiv">';
                tableContent += '<div class="userNameDiv">';
                tableContent += '<a href="event_page/' + this.eventName + '">' + this.eventName + '</a></div>';
                tableContent += '<div class="userRatingDiv"><div class="userRatingTitle">';
                tableContent += '<p> ' + this.eventName + '\'s Rating: </p></div>';
                tableContent += '<div class="userRatingStars"> ';
                tableContent += '<span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span></div></div></div>';
            //}
        });
    });
    $('#homeSearchResults').append(tableContent);
}
*/

