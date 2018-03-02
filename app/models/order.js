const promise = require('bluebird');
const mongoose = promise.promisifyAll(require('mongoose'));
mongoose.Promise = require('bluebird');


const orderSchema = new mongoose.Schema({
  restaurantId: {type: mongoose.Schema.ObjectId },
  userId: String,
  orderNumber: { type: String },
  user: {
    email: String,
    family_name: String,
    gender: String,
    given_name: String,
    name: String,
    sub: String,
  },
  address: {
    city: String,
    email: String,
    googleFormatted: String,
    lat: Number,
    lng: Number,
    note: String,
    phone: String,
    province: String,
    title: String,
    zip: String,
    _id: mongoose.Schema.ObjectId,
  },
  basket: Object,
  transactionId: String,
  creditCard: {
    cardNumber: String,
    ccv: String,
    expirationMonth: String,
    expirationYear: String,
    nameOnCard: String,
  },
  expectedTime: String,
  note: String,
  paymentType: String,
  phone: String,
  scheduled: Date,
  tip: Object,
  createDate: { type: Date, default: new Date() },
  status: { type: Number, default: 0 },
  paymentTransactionResult: mongoose.Schema.Types.Mixed,
  carryOrDelivery: String,
  restaurantTimeZone: String,
});

module.exports = mongoose.model('Order', orderSchema, '_orders');
