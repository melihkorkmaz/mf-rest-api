import mongoose from 'mongoose';

const couponSchema = new mongoose.Schema({
  restaurantId: {type: mongoose.Schema.ObjectId },
  name: String,
  codes: Array,
  type: String,
  options: Object,
  useType: String,
  usedBy: Object,
});

export default mongoose.model('Coupon', couponSchema, 'coupons');

