import Coupon from '../../models/coupon';

export default {
  getCoupon: (req, res) => {
    const userId = req.user.sub;
    const couponCode = [req.params.coupon];
    const restaurantId = req.params.restaurantId;

    Coupon.findOne({
      restaurantId,
      codes: { $all: couponCode },
    }).then((coupon) => {
      let usable = false;
      let message = 'Coupon not found!';

      console.log('userId', coupon.usedBy);
      if (coupon) {
        if (coupon.useType === 'single' && coupon.usedBy[userId]) {
          message = "You've already used this code!";
        } else {
          usable = true;
        }
      }

      if (usable) {
        res.send({
          status: true,
          coupon: {
            type: coupon.type,
            code: req.params.coupon,
            options: coupon.options,
            name: coupon.name,
          },
        });
      } else { res.send({ status: false, message }); }
    });
  },
};
