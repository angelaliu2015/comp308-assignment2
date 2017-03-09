// business.js Author: Angela Liu Website name: Business Contact List Description: business model
// require modules for our BusinessContact Model
let mongoose = require('mongoose');
let Schema = mongoose.Schema; //alias for mongoose Schema
let passportLocalMongoose = require('passport-local-mongoose');

let BusinessSchema = new Schema({
  contactname: {
    type: String,
    default: '',
    trim: true,
    required: 'contact name is required'
  },
  contactemail: {
    type: String,
    default: '',
    trim: true,
    required: 'contact email is required'
  },
  contactphone: {
    type: String,
    default: '',
    trim: true,
    required: 'contact phone is required'
  },
  created: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date,
    default: Date.now
  }
},{
  collection: "businesses"
});

//exports.Business = mongoose.model('Business', BusinessSchema);
module.exports = mongoose.model('businesses', BusinessSchema);