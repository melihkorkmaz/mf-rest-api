const promise = require('bluebird');
const mongoose = promise.promisifyAll(require('mongoose'));
mongoose.Promise = require('bluebird');

const menuSchema = new mongoose.Schema({
  accountId: { type: mongoose.Schema.ObjectId, required: 'Add account id' },
  name: { type: String, required: 'Name is required.' },
  isActive: { type: Boolean, default: true },
  isDeleted: { type: Boolean, default: false },
  groups: Object,
});

module.exports = mongoose.model('Menu', menuSchema, 'menus');
