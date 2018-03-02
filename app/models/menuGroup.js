const promise = require('bluebird');
const mongoose = promise.promisifyAll(require('mongoose'));
mongoose.Promise = require('bluebird');

const menuGroupSchema = new mongoose.Schema({
  menuId: { type: mongoose.Schema.ObjectId, required: 'Add menuId id' },
  name: { type: String, required: 'Name is required.' },
  description: String,
  order: Number,
  products: Object,
});

module.exports = mongoose.model('MenuGroup', menuGroupSchema, 'menuGroups');
