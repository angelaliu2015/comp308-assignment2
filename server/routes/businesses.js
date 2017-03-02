// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');

// define the user model
let UserModel = require('../models/users');
let User = UserModel.User; // alias for User Model - User object

// define the business model
let business = require('../models/businesses');

// create a function to check if the user is authenticated
function requireAuth(req, res, next) {
  // check if the user is logged in
  if(!req.isAuthenticated()) {
    return res.redirect('/login');
  }
  next();
}

/* GET business contact List page. READ */
router.get('/', requireAuth, (req, res, next) => {
  // find all businesses in the businsesses collection
  business.find( (err, businesses) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('businesses/index', {
        title: 'Business',
        businesses: businesses,
        displayName: req.user.displayName
      });
    }
  });

});

//  GET the Business Details page in order to add a new Business
router.get('/add', requireAuth, (req, res, next) => {
  res.render('businesses/details', {
    title: "Add a new business contact",
    businesses: '',
    displayName: req.user.displayName
  });
});

// POST process the Business Details page and create a new business contact - CREATE
router.post('/add', requireAuth, (req, res, next) => {

    let newBusiness = business({
      "contactname": req.body.contactname,
      "contactemail": req.body.contactemail,
      "contactphone": req.body.contactphone
    });

    business.create(newBusiness, (err, business) => {
      if(err) {
        console.log(err);
        res.end(err);
      } else {
        res.redirect('/businesses');
      }
    });
});

// GET the Business Details page in order to edit a new Business
router.get('/:id', requireAuth, (req, res, next) => {

    try {
      // get a reference to the id from the url
      let id = mongoose.Types.ObjectId.createFromHexString(req.params.id);

        // find one business by its id
      business.findById(id, (err, businesses) => {
        if(err) {
          console.log(err);
          res.end(error);
        } else {
          // show the business details view
          res.render('businesses/details', {
              title: 'Business Details',
              businesses: businesses,
              displayName: req.user.displayName
          });
        }
      });
    } catch (err) {
      console.log(err);
      res.redirect('/errors/404');
    }
});

// POST - process the information passed from the details form and update the document
router.post('/:id', requireAuth, (req, res, next) => {
  // get a reference to the id from the url
    let id = req.params.id;

     let updatedBusiness = business({
       "_id": id,
      "contactname": req.body.contactname,
      "contactemail": req.body.contactemail,
      "contactphone": req.body.contactphone
    });

    business.update({_id: id}, updatedBusiness, (err) => {
      if(err) {
        console.log(err);
        res.end(err);
      } else {
        // refresh the business List
        res.redirect('/businesses');
      }
    });

});

// GET - process the delete by business id
router.get('/delete/:id', requireAuth, (req, res, next) => {
  // get a reference to the id from the url
    let id = req.params.id;

    business.remove({_id: id}, (err) => {
      if(err) {
        console.log(err);
        res.end(err);
      } else {
        // refresh the business list
        res.redirect('/businesses');
      }
    });
});


module.exports = router;
