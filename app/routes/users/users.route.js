import express from 'express';
import config from '../../config';
import User from '../../models/user';
import UserAddress from '../../models/userAddress';

const routePrefix = `/node-api/${config.version}/users`;


const route = () => {
  const router = new express.Router();

  router.route('/login').post((req, res) => {
    User.findOne({ providerId: req.user.sub }).then((user) => {
      if (user) {
        UserAddress.find({ userId: req.user.sub }).then((addresses) => {
          user.addresses = addresses;
          res.send(user);
        });
      } else {
        const newUser = new User({
          email: req.body.email,
          authDetails: req.body,
          providerId: req.user.sub,
          dateModified: new Date(),
          dateCreated: new Date(),
        });

        newUser.save((err, savedUser) => {
          savedUser.addresses = [];
          res.send(newUser);
        });
      }
    });
  });

  router.route('/me/address').post((req, res) => {
    const userId = req.user.sub;
    const model = req.body;
    model.userId = userId;

    const newUserAddress = new UserAddress(model);
    newUserAddress.save().then((x) => {
      res.send({ status: true, data: x });
    });
  });

  router.route('/me/address/:id').delete((req, res) => {
    const id = req.params.id;

    UserAddress.remove({ _id: id }, (err) => {
      if (err) { res.send({ status: false, error: err }); } else { res.send({ status: true }); }
    });
  });

  return router;
};

export default {
  routePrefix,
  route,
};
