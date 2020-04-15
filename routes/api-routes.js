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
  app.post("/api/signup", function(req, res) {
    db.DogActor.create({
      email: req.body.email,
      password: req.body.pw
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

  // Route for getting some data about our dogactor to be used client side
  /* app.get("/api/dogactor_data", function(req, res) {
    if (!req.dogactor) {
      // The dogactor is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the dogactor's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.dogactor.email,
        id: req.dogactor.id
      });
    }
  }); */

  //Route for getting appointments: if booked == true, then dogUser !=0
  // if booked == false, then dogUser == 0
  app.get("/api/booked_appt:id&:booked&:actortype", function(req, res){
    if(!req.params.booked){
      db.Appt.findAll({
        attributes:["walkDate", ["timeSlot"]],
        where: {
          id: req.params.id,
          dogUser: 0
        }
      }).then(function(dbUnbooked){
        res.json(dbUnbooked)
      })
    } else {
      db.Appt.findAll({
        attributes: ["walkDate", "timeSlot", "dogUser", "dogName", "firstName", "lastName"],
        where: {
          id: req.params.id,
          dogUser: {$ne:0},
          actortype: req.params.actorytype
        },
        include:[db.DogActor, db.Dog]
      })
    }
  });

  //Create a new open time slot
  // did = dogwalkerId, wd = walkDate, ts = timeSlot
  app.post("/api/add-appt/:did&:wd&:ts", function(req,res){
    db.Appt.create({
      dogwalkerId: req.params.did,
      walkDate: req.params.wd,
      timeSlot: req.params.ts
    }).then(function(dbAppt){
      console.log(dbAppt);
      res.json(dbAppt);
    });
  });

  // Book or Cancel a walking appointment
  // for a specific dog, however other checks will 
  // be needed to ensure appt and walker availability
  // dwid = dogwakerId, wd = walkDate, ts = timeSlot, 
  // du = dogUser, cncl = true to cancel false to change
  app.post("/api/update-walk/:dwid&:wd&:ts&:du&:cncl", function(req,res){
    // if cncl true, cancel the appointment by setting dogUser = 0
    if(reg.params.cncl){
      db.Apt.update({
        dogUser: 0,
        where:{
          dogwalkerId: req.params.dwid,
          walkDate: req.params.wd,
          timeSlot: req.params.ts
        }
      })
    } else{
      db.Appt.update({
        dogUser: req.params.du,
        where: {
          dogwalkerId: req.params.dwid,
          walkDate: req.params.wd,
          timeSlot: req.params.ts          
        }
      })
    }
  }).then(function(dbDog){
    res.json(dbDog);
  });

  //fn = firstName, ln = lastName, add1 = address1
  // add2 = address2, cty = city, s =st, 
  // z5 = zip5, ph = phone, pt = phoneType
  app.post("/api/update-actor/:id&:fn&:ln&:add1&:add2&:cty&:s&:z5&:ph&:pt", function(req, res){
    db.dogActor.update({
      firstName: req.params.fn,
      lastName: req.params.ln,
      address1: req.params.add1,
      address2: req.params.add2,
      city: req.params.cty,
      st: req.params.s,
      zip5: req.params.z5,
      phone: req.params.pt,
      where: {
        id: req.params.id
      }
    }).then(function(dbAppt){
      console.log(res.json(dbAppt));
      res.json(dbAppt);
    })
  })

};
