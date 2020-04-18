$(document).ready(function() {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page

  $(".modal").modal();
  $(".tooltipped").tooltip();


  $.get("/api/user_data").then(function(user) { 
    console.log(user);


  //function to get first namer of dog owner

  $.get("/api/actor/" + user.id).then(function(data) {
    $("#UserName").text(data.firstName);
  });

  //function to get any active upcoming appointments
  
  $.get("/api/mydog/" + user.id).then(function(data) {
    
    if (data.length > 0) {
      $("#defaultMessage").hide();
      for (i = 0; i < data.length; i++) {
        console.log(data[i])
        $("#appointments").append(
          "<li class='collection-item'>" + "Dog Name: " + data[i].Dog.dogName + "<br>Walk Date: " + data[i].walkDate + "<br>Time Slot: " + data[i].timeSlot + "</li>"
        );
      }
    }else {
      $("#defaultMessage").show();
    }
    
      // $("#defaultMessage").show();
    
  });


  //retrieving current dog data and creating an li
  function getDogData(){
  $.get("/api/dog/" + user.id).then((results) => {
    console.log(results);
    $("#petList").empty();  
    results.forEach(function(res){
      $("#petList").append(
        `<li class='collection-item' id="dog-list" data-id="${res.id}"><div class='row'><div class='col s9'>Dog Name: ${res.dogName}<br>Breed: ${res.breed} </div><div class='col s3'><a class='secondary-content btn-flat' id='deleteDog'><i class='material-icons red-text' id='trash'>delete_forever</i></a></div></div></li>`
      );
    })
    });
  };

  $("#addPet").on("click", function(){
    getDogData();
  })
  


  //add pet button to post new dog info to db
  $("#addPetBtn").on("click", function(event) {
    event.preventDefault();
    getDogData();
  
    const dogName = $("#dog_name");
    const breed = $("#breed");
    

    const newDog = {
      dogName: dogName.val().trim(),
      breed: breed.val().trim(),
      DogActorId: user.id,
    };

    console.log(newDog);
    $.post("/api/dog/", newDog).then(function(result) {
      console.log(result);
      
      
    }).then(function(){
      dogName.val("");
      breed.val("");
     
      getDogData();
    })
  });

    //autofills Member Profile
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
    // event.preventDefault();
    const dogId = $("#dog-list").data(id);
    $.delete("/api/dog/" + dogId).then(() => {
     getDogData()
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
      australianshepherd: null,
      basenji: null,
      beagle: null,
      bluetick: null,
      borzoi: null,
      bouvier: null,
      boxer: null,
      brabancon: null,
      briard: null,
      norwegianbuhund: null,
      bostonbulldog: null,
      englishbulldog: null,
      frenchbulldog: null,
      staffordshirebullterrier: null,
      cairn: null,
      australiancattledog: null,
      chihuahua: null,
      chow: null,
      clumber: null,
      cockapoo: null,
      bordercollie: null,
      coonhound: null,
      cardigancorgi: null,
      cotondetulear: null,
      dachshund: null,
      dalmatian: null,
      greatdane: null,
      scottishdeerhound: null,
      dhole: null,
      dingo: null,
      doberman: null,
      norwegianelkhound: null,
      entlebucher: null,
      eskimo: null,
      finnishlapphund: null,
      bichonfrise: null,
      germanshepherd: null,
      italiangreyhound: null,
      groenendael: null,
      havanese: null,
      afghanhound: null,
      bassethound: null,
      bloodhound: null,
      englishhound: null,
      ibizanhound: null,
      plotthound: null,
      walkerhound: null,
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
      bullmastiff: null,
      englishmastiff: null,
      tibetanmastiff: null,
      mexicanhairless: null,
      mix: null,
      bernesemountain: null,
      swissmountain: null,
      newfoundland: null,
      otterhound: null,
      caucasianovcharka: null,
      papillon: null,
      pekinese: null,
      pembroke: null,
      miniaturepinscher: null,
      pitbull: null,
      germanpointer: null,
      germanlonghairpointer: null,
      pomeranian: null,
      miniaturepoodle: null,
      standardpoodle: null,
      toypoodle: null,
      pug: null,
      puggle: null,
      pyrenees: null,
      redbone: null,
      chesapeakeretriever: null,
      curlyretriever: null,
      flatcoatedretriever: null,
      goldenretriever: null,
      rhodesianridgeback: null,
      rottweiler: null,
      saluki: null,
      samoyed: null,
      schipperke: null,
      giantschnauzer: null,
      miniatureschnauzer: null,
      englishsetter: null,
      gordonsetter: null,
      irishsetter: null,
      englishsheepdog: null,
      shetlandsheepdog: null,
      shiba: null,
      shihtzu: null,
      blenheimspaniel: null,
      brittanyspaniel: null,
      cockerspaniel: null,
      irishspaniel: null,
      japanesespaniel: null,
      sussexspaniel: null,
      welshspaniel: null,
      englishspringer: null,
      stbernard: null,
      americanterrier: null,
      australianterrier: null,
      bedlingtonterrier: null,
      borderterrier: null,
      dandieterrier: null,
      foxterrier: null,
      irishterrier: null,
      kerryblueterrier: null,
      lakelandterrier: null,
      norfolkterrier: null,
      norwichterrier: null,
      patterdaleterrier: null,
      russellterrier: null,
      scottishterrier: null,
      sealyhamterrier: null,
      silkyterrier: null,
      tibetanterrier: null,
      toyterrier: null,
      westhighlandterrier: null,
      wheatenterrier: null,
      yorkshireterrier: null,
      vizsla: null,
      spanishwaterdog: null,
      weimaraner: null,
      whippet: null,
      irishwolfhound: null,
    },
  }).trim;
});