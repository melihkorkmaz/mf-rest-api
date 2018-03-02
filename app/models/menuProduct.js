const promise = require('bluebird');
const mongoose = promise.promisifyAll(require('mongoose'));


mongoose.Promise = require('bluebird');

const menuProductSchema = new mongoose.Schema({
  menuId: { type: mongoose.Schema.ObjectId, required: 'Add menuId id' },
  groupId: { type: mongoose.Schema.ObjectId, required: 'Add menuId id' },
  name: { type: String, required: 'Name is required.' },
  description: String,
  discountOptions: [],
  price: [],
  order: Number,
  properties: [],
});

module.exports = mongoose.model('MenuProduct', menuProductSchema, 'menuProducts');
