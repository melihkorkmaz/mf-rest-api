import express from 'express';
import request from 'request';

const Router = express.Router;
import config from '../../config';

import moment from 'moment';
import 'moment-timezone';
import menufieldCommon from '../../utils/menufield.common';

const routePrefix = `/node-api/${config.version}/orders`;

import Order from '../../models/order';
import { charge } from '../../utils/payment.helper';

import { sendPDFToRestaurant, postSave, createOrderNumber } from './orders.service';


const route = () => {
  const router = new Router();

  router.route('/').get((req, res) => {
    const filter = req.query.filter || {};
    let fields = {};

    filter.restaurantId = req.user.restaurantId;

    if (req.query.fields) {
      fields = req.query.fields.split(',').reduce((prev, current) => {
        prev[current] = 1;
        return prev;
      }, {});
    }

    console.log("getting orders");
    Order.find(filter, fields).sort({ createDate: -1 }).then((orders) => {
      res.send(orders);
    });
  });

  router.route('/').post((req, res) => {
    const model = new Order(req.body);
    model.orderNumber = createOrderNumber(8);
    model.userId = req.user.sub;

    if (model.paymentType === 'ONLINE') {
      charge(model).then((x) => {
        model.transactionId = x.transactionId;

        model.creditCard.cardNumber = `${model.creditCard.cardNumber[0]}${model.creditCard.cardNumber[1]}**-****-****-**${model.creditCard.cardNumber[model.creditCard.cardNumber.length - 2]}${model.creditCard.cardNumber[model.creditCard.cardNumber.length - 1]}`;
        model.creditCard.ccv = '***';
        model.save().then((order) => {
          postSave(order);
          res.send({
            status: true,
            data: order,
          });
        });
      }, (err) => {
        res.send({ status: false, error: err.message });
      });
    } else {
      model.save().then((order) => {
        postSave(order);
        res.send({
          status: true,
          data: order,
        });
      });
    }


    // postSave(order);

    // res.send({
    //     status: true,
    //     data: order
    // });
    // })
  });

  router.route('/:orderNumber').get((req, res) => {
    let fields = {};

    if (req.query.fields) {
      fields = req.query.fields.split(',').reduce((prev, current) => {
        prev[current] = 1;
        return prev;
      }, {});
    }

    Order.findOne({ orderNumber: req.params.orderNumber, restaurantId: req.user.restaurantId }, fields, (err, order) => {
      console.log('order', order);
      res.send(order);
    });
  });


  return router;
};

export default {
  routePrefix,
  route,
};

