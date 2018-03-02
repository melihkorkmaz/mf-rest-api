import express from 'express';
import CouponService from './coupons.service';
import config from '../../config';

const route = () => {
  const router = new express.Router();

  router.route('/check/:restaurantId/:coupon')
    .get(CouponService.getCoupon);

  return router;
};

export default {
  route,
  routePrefix: `/node-api/${config.version}/coupons`,
};
