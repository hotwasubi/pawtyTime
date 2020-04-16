document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.fixed-action-btn');
  var instances = M.FloatingActionButton.init(elems, {
    toolbarEnabled: true
  });
});
$(document).ready(function(){
  $('.modal').modal();
  $('select').formSelect();
// sign up
  $("#signUpBtn").on("click", event => {
    event.preventDefault();
    const firstName = $("#first_name").val().trim();
    const lastName = $("#last_name").val().trim();
    const email = $("#email").val().trim();
    const password = $("#password").val().trim();
    const address1 = $("#address1").val().trim();
    const address2 = $("#address2").val().trim();
    const city = $("#city").val().trim();
    const state = $("#state").val().trim();
    const zipCode = $("#zipCode").val().trim();
    const phoneNumber = $("#phoneNumber").val().trim();
    const actorType = $("#userType input[name='actorType']:checked").val() === "true" ? true : false;
    const phoneType = $("#phoneType input[name='phoneType']:checked").val();
    const newUser = {
      email: email,
      password: password,
      actorType: actorType,
      firstName: firstName,
      lastName: lastName,
      address1: address1,
      address2: address2,
      city: city,
      st: state,
      phone: phoneNumber,
      phoneType: phoneType,
      zip5:zipCode,
      lat: 0,
      lng: 0
    }
    console.log(newUser);
    // $.ajax("/api/signup", {
    //   type: "POST",
    //   data: newUser
    // }).then(
    //   function(res){
    //   console.log(res)
    // })
  })
});