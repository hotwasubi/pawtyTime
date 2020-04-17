$(document).ready(function() {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function(user) { 
    
  


  $(".modal").modal();
  $(".tooltipped").tooltip();



  //function to get first namer of dog owner

  $.get("/api/actor/" + user.id).then(function(data) {
    $("#UserName").text(data.firstName);
  });

  //function to get any active upcoming appointments

  $.get("/api/booked_appt/" + user.id).then(function(data) {
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

  //retrieving current dog data and creating an li

  $.get("/api/dog/" + user.id).then((results) => {
    
    results.forEach(function(res){
      $("#petList").append(
        `<li class='collection-item avatar'><img src='${res.breedUrl}' alt='breed image' class='circle'>${res.dogName}<br>${res.breed}<a class='secondary-content btn-flat' id='deleteDog'><i class='material-icons red-text'>delete_forever</i></a></li>`
      );
    })
      
    });

  //add pet button to post new dog info to db
  $("#addPetBtn").on("click", function(event) {
    event.preventDefault();

    const dogName = $("#dog_name");
    const breed = $("#breed");
    

    const newDog = {
      dogName: dogName.val().trim(),
      breed: breed.val().trim(),
      id: user.id,
    };

    $("#petList").append("<li class='collection-item'><div>Dog Name: " + newDog.dogName + " </div><br><div>Breed: " + newDog.breed + "</div><a class='secondary-content btn-flat' id='deleteDog'><i class='material-icons red-text'>delete_forever</i></a></li>")
    console.log(newDog);
    $.post("/api/dog/", newDog).then(function(result) {
      console.log(result);
      dogName.val("");
      breed.val("");
    });
  });

  $.get("/api/actor/" + user.id).then(results => {
    $("#firstNam").html(results.firstName);
    $("#lastNam").html(results.lastName);
    $("#add1").html(results.address1);
    $("#add2").html(results.address2);
    $("#cit").html(results.city);
    $("#st").html(results.st);
    $("#zip").html(results.zip5);
    $("#profEmail").html(results.email);
    $("#profPhone").html(results.phone);
  })

  //edit dog information
  // $("#editDog").on("click", (event) => {
  //   event.preventDefault();

  //   $.put("/api/dog" + id).then((result) => {});
  // });

  //delete dog information
  $("#deleteDog").on("click", (event) => {
    event.preventDefault();
    const dogId = $(this).data(id);

    $.delete("/api/dog" + dogId).then(() => {

    });
  });
});
});

// floating action navbar at the bottom of page
document.addEventListener("DOMContentLoaded", function() {
  var elems = document.querySelectorAll(".fixed-action-btn");
  var instances = M.FloatingActionButton.init(elems, {
    toolbarEnabled: true,
  });
});

$(document).ready(function() {
  $("#breed").autocomplete({
    data: {
      affenpinscher: null,
      african: null,
      airedale: null,
      akita: null,
      appenzeller: null,
      "australian shepherd": null,
      basenji: null,
      beagle: null,
      bluetick: null,
      borzoi: null,
      bouvier: null,
      boxer: null,
      brabancon: null,
      briard: null,
      "norwegian buhund": null,
      "boston bulldog": null,
      "english bulldog": null,
      "french bulldog": null,
      "staffordshire bullterrier": null,
      cairn: null,
      "australian cattledog": null,
      chihuahua: null,
      chow: null,
      clumber: null,
      cockapoo: null,
      "border collie": null,
      coonhound: null,
      "cardigan corgi": null,
      cotondetulear: null,
      dachshund: null,
      dalmatian: null,
      greatdane: null,
      "scottish deerhound": null,
      dhole: null,
      dingo: null,
      doberman: null,
      "norwegian elkhound": null,
      entlebucher: null,
      eskimo: null,
      "finnish lapphund": null,
      "bichon frise": null,
      germanshepherd: null,
      "italian greyhound": null,
      groenendael: null,
      havanese: null,
      "afghan hound": null,
      "basset hound": null,
      "blood hound": null,
      "english hound": null,
      "ibizan hound": null,
      "plott hound": null,
      "walker hound": null,
      husky: null,
      keeshond: null,
      kelpie: null,
      komondor: null,
      kuvasz: null,
      labrador: null,
      leonberg: null,
      lhasa: null,
      malamute: null,
      malinois: null,
      maltese: null,
      "bull mastiff": null,
      "english mastiff": null,
      "tibetan mastiff": null,
      mexicanhairless: null,
      mix: null,
      "bernese mountain": null,
      "swiss mountain": null,
      newfoundland: null,
      otterhound: null,
      "caucasian ovcharka": null,
      papillon: null,
      pekinese: null,
      pembroke: null,
      "miniature pinscher": null,
      pitbull: null,
      "german pointer": null,
      "germanlonghair pointer": null,
      pomeranian: null,
      "miniature poodle": null,
      "standard poodle": null,
      "toy poodle": null,
      pug: null,
      puggle: null,
      pyrenees: null,
      redbone: null,
      "chesapeake retriever": null,
      "curly retriever": null,
      "flatcoated retriever": null,
      "golden retriever": null,
      "rhodesian ridgeback": null,
      rottweiler: null,
      saluki: null,
      samoyed: null,
      schipperke: null,
      "giant schnauzer": null,
      "miniature schnauzer": null,
      "english setter": null,
      "gordon setter": null,
      "irish setter": null,
      "english sheepdog": null,
      "shetland sheepdog": null,
      shiba: null,
      shihtzu: null,
      "blenheim spaniel": null,
      "brittany spaniel": null,
      "cocker spaniel": null,
      "irish spaniel": null,
      "japanese spaniel": null,
      "sussex spaniel": null,
      "welsh spaniel": null,
      "english springer": null,
      stbernard: null,
      "american terrier": null,
      "australian terrier": null,
      "bedlington terrier": null,
      "border terrier": null,
      "dandie terrier": null,
      "fox terrier": null,
      "irish terrier": null,
      "kerryblue terrier": null,
      "lakeland terrier": null,
      "norfolk terrier": null,
      "norwich terrier": null,
      "patterdale terrier": null,
      "russell terrier": null,
      "scottish terrier": null,
      "sealyham terrier": null,
      "silky terrier": null,
      "tibetan terrier": null,
      "toy terrier": null,
      "westhighland terrier": null,
      "wheaten terrier": null,
      "yorkshire terrier": null,
      vizsla: null,
      "spanish waterdog": null,
      weimaraner: null,
      whippet: null,
      "irish wolfhound": null,
    },
  });
});