const promise = require('bluebird');
const mongoose = promise.promisifyAll(require('mongoose'));
mongoose.Promise = require('bluebird');

const userSchema = new mongoose.Schema({
  providerId: String,
  email: String,
  dateModified: Date,
  dateCreated: Date,
  authDetails: Object,
  addresses: Object,
});

module.exports = mongoose.model('User', userSchema, 'users');
