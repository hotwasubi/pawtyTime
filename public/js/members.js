$(document).ready(function() {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $('.tooltipped').tooltip();
  $.get("/api/actor").then(function(data) {
    $(".member-name").text(data.firstName);
  });

  $.get("/api/booked_appt/:DogActorId").then(function(data){
 if(data.length > 0){
    for(let i = 0; i < data.length; i++){
      $("#appointments").append("<li>" + data + "</li>").attr("class", "collection-item")
    }
  } else {
    return $("#appointments").append("<li>You have no upcoming appointments!</li>").attr("class", "collection-item")
  }
  })
});

document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.fixed-action-btn');
  var instances = M.FloatingActionButton.init(elems, {
    toolbarEnabled: true
  });
});
