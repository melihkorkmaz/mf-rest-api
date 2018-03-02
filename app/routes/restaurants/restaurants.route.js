import express from 'express';
import * as _ from 'lodash';
import config from '../../config';

import Restaurant from '../../models/restaurant';
import Menu from '../../models/menu';
import MenuProduct from '../../models/menuProduct';
import MenuGroup from '../../models/menuGroup';
import urlUtils from '../../utils/url.utils';
import { error } from '../../utils/dna.logger';

const Router = express.Router;
const routePrefix = `/node-api/${config.version}/restaurants`;

const route = () => {
  const router = new Router();
  router.route('/init').get((req, res) => {
    let restaurantNameKey = urlUtils.restaurantNameKey(req.headers.referer);

    // if (restaurantNameKey === '') { restaurantNameKey = 'silver-sands-pizza'; }
    restaurantNameKey = 'silver-sands-pizza';

    Restaurant.findOne({ sortName: restaurantNameKey }, (err, restaurant) => {
      if (err) { error(err); }
      
      if (restaurant) {
        Menu.findById({ _id: restaurant.menuId }).then((menu) => {
          MenuGroup.find({ menuId: menu._id }, (groupError, menuGroups) => {
            if (groupError) { error(groupError); }

            menu.groups = menuGroups;
            MenuProduct.find({ menuId: menu._id }, (productError, products) => {
              if (productError) { error(productError); }

              menu.groups.forEach((group) => {
                group.products = _.filter(products, { groupId: group._id });
              });

              res.send({
                status: true,
                restaurant,
                menu,
              });
            });
          });
        });
      } else { res.send({ status: false }); }
    });
  });

  router.route('/me').get((req, res) => {
    const restaurantId = req.user.restaurantId;

    Restaurant.findById(restaurantId).then(x => res.send(x));
  });

  router.route('/toggle-status').post((req, res) => {
    const restaurantId = req.user.restaurantId;

    Restaurant.update({ _id: restaurantId }, {
      $set: {
        status: req.body.status,
      },
    }).then(() => res.send({ status: true }));
  });

  return router;
};

export default {
  routePrefix,
  route,
};

