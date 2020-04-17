$(document).ready(function() {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $(".modal").modal();
  $(".tooltipped").tooltip();
  getActorName();
  getUpcomingAppt();
  getDogData();

  //function to get first namer of dog owner
  function getActorName() {
    $.get("/api/actor").then(function(data) {
      $(".member-name").text(data.firstName);
    });
  }

  //function to get any active upcoming appointments
  function getUpcomingAppt() {
    $.get("/api/booked_appt/:DogActorId").then(function(data) {
      if (data.length > 0) {
        $("#defaultMessage").hide();
        for (let i = 0; i < data.length; i++) {
          $("#appointments").append(
            "<li class='collection-item'>" + data[i] + "</li>"
          );
        }
      } else {
        $("#defaultMessage").show();
      }
    });
  }

  //retrieving current dog data and creating an li
  function getDogData() {
    $.get("/api/dog").then((results) => {
      for (let i = 0; i < results.length; i++) {
        $("#petList").append(
          `<li class='collection-item'>` +
            results[i] +
            `<a class='secondary-content' id='editDog'><i class='material-icons green-text'>edit</i></a><a class='secondary-content' id='deleteDog'><i class='material-icons red-text'>delete_forever</i></a></li>`
        );
      }
    });
  }

  

  //add pet button to post new dog info to db
  $("#addPetBtn").on("click", function(event) {
    event.preventDefault();

    const dogName = $("#dog_name");
    const breed = $("#breed");

    $.get("/api/get_actor/"+ email).then(function(result){
      const newDog = {
        dogName: dogName.val().trim(),
        breed: breed.val().trim(),
        id: result.id
      };
      console.log(newDog);
      $.post("/api/dog", newDog).then(function(result) {
        console.log(result);
        dogName.val("");
        breed.val("");
      });
    });
  });

  //edit dog information
  $("#editDog").on("click", (event) => {
    event.preventDefault();
    const id = $(this).data(id);

    $.put("/api/dog" + id).then((result) => {});
  });

  //delete dog information
  $("#deleteDog").on("click", (event) => {
    event.preventDefault();
    const id = $(this).data(id);

    $.delete("/api/dog" + id).then((result) => {});
  });
});

// floating action navbar at the bottom of page
document.addEventListener("DOMContentLoaded", function() {
  var elems = document.querySelectorAll(".fixed-action-btn");
  var instances = M.FloatingActionButton.init(elems, {
    toolbarEnabled: true,
  });
});


