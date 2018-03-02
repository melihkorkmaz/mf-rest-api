const promise = require('bluebird');
const mongoose = promise.promisifyAll(require('mongoose'));
mongoose.Promise = require('bluebird');

const userAddressSchema = new mongoose.Schema({
  userId: String,
  email: String,
  dateModified: Date,
  dateCreated: Date,
  phone: String,
  lat: Number,
  lng: Number,
  province: String,
  title: String,
  googleFormatted: String,
  addressLine: String,
  city: String,
  zip: String,
  note: String,
});

module.exports = mongoose.model('UserAddress', userAddressSchema, 'useraddresses');
