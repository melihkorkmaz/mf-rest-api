const promise = require('bluebird');
const mongoose = promise.promisifyAll(require('mongoose'));
mongoose.Promise = require('bluebird');

const adminSchema = new mongoose.Schema({
  restaurantId: { type: mongoose.Schema.ObjectId },
  email: String,
  password: String,
  lastLogin: Date,
});

module.exports = mongoose.model('Admin', adminSchema, 'admins');
