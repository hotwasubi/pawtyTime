// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");

module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the dogactor has valid login credentials, send them to the members page.
  // Otherwise the dogactor will be sent an error
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    res.json(req.dogactor);
  });

  // Route for signing up a dogactor. The dogactor's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the dogactor is created successfully, proceed to log the dogactor in,
  // otherwise send back an error
  //Create new DogActor
  app.post("/api/signup", function(req, res) {
    db.DogActor.create({
      email: req.body.email,
      password: req.body.pw,
      firstName: req.body.fn,
      lastName: req.body.ln,
      address1: req.body.add1,
      address2: req.body.add2,
      city: req.body.cty,
      st: req.body.s,
      zip5: req.body.z5,
      phone: req.body.pt
    })
      .then(function() {
        res.redirect(307, "/api/login");
      })
      .catch(function(err) {
        res.status(401).json(err);
      });
  });

  // Route for logging dogactor out
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });


  //Update DogActor information
  //fn = firstName, ln = lastName, add1 = address1
  // add2 = address2, cty = city, s =st, 
  // z5 = zip5, ph = phone, pt = phoneType
  app.put("/api/update-actor/:id", function(req, res){
    db.dogActor.update({
      firstName: req.body.fn,
      lastName: req.body.ln,
      address1: req.body.add1,
      address2: req.body.add2,
      city: req.body.cty,
      st: req.body.s,
      zip5: req.body.z5,
      phone: req.body.pt
    }, 
    {
      where: {
        id: req.params.id
      }
    }).then(function(dbAppt){
      console.log(res.json(dbAppt));
      res.json(dbAppt);
    })
  });

  // Delete DogActor
  app.delete("/api/deleteActor/:userName", function (req,res ){
    db.DogActor.destroy({
      where: {
        userName: req.params.userName
      }
    }).then(results => res.json(results)
    );
  });


  //APPOINTMENT ROUTES
  //Route for getting appointments: if booked == true, then dogUser !=0
  // if booked == false, then dogUser == 0

    //Create a new open appointment
  // did = dogwalkerId, wd = walkDate, ts = timeSlot
  app.post("/api/add-appt/", function(req,res){
    db.Appt.create({
      dogwalkerId: req.body.did,
      walkDate: req.body.wd,
      timeSlot: req.body.ts
    }).then(function(dbAppt){
      console.log(dbAppt);
      res.json(dbAppt);
    });
  });

  // Get unbooked appointments
  app.get("/api/unbooked_appt/:id", function(req, res){
      db.Appt.findAll({
        attributes:["walkDate", "timeSlot"],
        where: {
          id: req.params.id,
          dogUser: 0
        }
      }).then(function(dbUnbooked){
        res.json(dbUnbooked)
      })
  });

// get booked appointments
  app.get("/api/booked_appt/:id", function(req, res){  
      db.Appt.findAll({
        attributes: ["walkDate", "timeSlot", "dogUser", "dogName", "firstName", "lastName"],
        where: {
          id: req.params.id,
          dogUser: {$ne:0}
        },
        include:[db.DogActor, db.Dog]
      });
    });


  // dwid = dogwakerId, wd = walkDate, ts = timeSlot, 
  // du = dogUser, cncl = true to cancel false to change

  //Cancel an appointment
  app.put("/api/cancel-walk/:id", function(req,res){
    // if cncl true, cancel the appointment by setting dogUser = 0
  //  if(reg.params.cncl){
      db.Appt.update({
        dogUser: 0
      },
      {
        where:{
          id: 0
        }
      }).then(function(dbDog){
        res.json(dbDog);
      });
  });

  //Book an appointment
  app.put("/api/change-walk/:id", function(req,res){
      db.Appt.update({
        dogUser: req.body.du
      },
      {
        where: {
          id: req.params.id  
        }
      })
    }).then(function(dbDog){
    res.json(dbDog);
  });

  //Delete a time slot
  app.delete("/api/deleteSlot/:id", function(req, res) {
    db.Appt.destroy({
      where: {
        id: req.params.id
      }
    }).then(results => res.json(results) 
    );
  });

  //DOG ROUTES
  //Create Dog
  app.post("/api/newDog", (req, res)=>{
    db.Dog.create({
      dogName : req.body.name,
      dogActorId : req.body.dogownerId,
      breed : req.body.breed,
      breedUrl:  "https://dog.ceo/api/breed/"+ req.body.breed + "/images/random"
    }).then (results => res.json(results));
   });
};

// Delete a dog
app.delete("/api/deleteDog/:id", function(req, res) {
  db.Dog.destroy({
    where: {
      id: req.params.id
    }
  }).then(results => res.json(results) 
  );
});