import express from 'express';
import crypto from 'crypto';
import config from '../../config';
import Admin from '../../models/admin';
import Jwt from 'jsonwebtoken';

const routePrefix = `/node-api/${config.version}/auth`;


const route = () => {
  const router = new express.Router();

  router.route('/sign-in').post((req, res) => {
    const { email, password } = req.body;
    const hashedPassword = crypto.createHmac('sha512', config.secret).update(password).digest('hex');

    Admin.findOne({ email }, (err, user) => {
      if (user) {
        if (user.password === hashedPassword) {
          const tokenData = {
            restaurantId: user.restaurantId,
            _id: user._id,
          };
          const token = Jwt.sign(tokenData, config.secret);
          return res.send({ status: true, token, restaurantId: user.restaurantId });
        }
        return res.send({ status: false, message: 'Password is wrong!' });
      } return res.send({ status: false, message: 'Wrong e-mail address!' });
    });
  });


  return router;
};

export default {
  routePrefix,
  route,
};
