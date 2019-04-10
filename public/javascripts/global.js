/*
var monk = require('monk');
var db = monk('localhost:27017/project');
var userCollection = db.get('usercollection');
var eventCollection = db.get('eventcollection');
*/

// DOM Ready =============================================================
$(document).ready(function() {

  // Populate the user table on initial page load
    populateHomePage();
    //populateHomeEvents();

});

// Functions ============================================================

function populateHomePage() {   
  // jQuery AJAX call for JSON
  $.getJSON('home_page.json', function( data ) {
      console.log("=============> home_page.json in global populateHomePage");
      //data = JSON.parse(data);
      console.log("... data.users.length: " + data.users.length);
      console.log("... data.events: " + data.events);

        // Empty content string
        var tableContent = '<p>All Users In Database</p>';
        var eventContent = '<p>All Events In Database</p>';
      
        // For each item in our JSON, add a table row and cells to the content string
        $.each(data.users, function(){
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
        
        // For each item in our JSON, add a table row and cells to the content string
        $.each(data.events, function(){
            //if(this.userName != ":eventName" && this.eventName != "home_page.json" && this.eventName != null) {
                console.log("... event name: " + this.eventName);
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
function populateHomeEvents() {
  var tableContent = ''; // Empty content string
   
  // jQuery AJAX call for JSON
  $.getJSON('home_page.json', function( data ) {
      console.log("=============> home_page.json in global in populateHomeEvents");

        // Empty content string
        var tableContent = '<p>All Events In Database</p>';
      
        // For each item in our JSON, add a table row and cells to the content string
        $.each(data.events, function(){
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
        
        // Inject the whole content string into our existing HTML table
        $('#homeFillEventDiv').append(tableContent);
    });
};
*/

function searchEventsAndUsers() {
    var tableContents = '';
    $.getJSON('search.json', function( data ) {

        // For each USER in our JSON, add a table row and cells to the content string
        $.each(data.users, function(){
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

        // For each EVENT in our JSON, add a table row and cells to the content string
        $.each(data.events, function(){
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
        $('#homeSearchResults').append(tableContent);
    });
}


