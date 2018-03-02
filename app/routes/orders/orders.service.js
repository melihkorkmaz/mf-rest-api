import { htmlTemplate, PDF } from '../../utils/template.helper';
import mail from '../../utils/mail.helper';
import streamToBuffer from 'stream-to-buffer';
import Restaurant from '../../models/restaurant';
import Coupon from '../../models/coupon';
import menufieldCommon from '../../utils/menufield.common';
import * as firebase from 'firebase';
import moment from 'moment';
import 'moment-timezone';

const restaurantOrderHTML = (order) => {
  const deliveryMethod = order.carryOrDelivery === 'DELIVERY' ? 'Delivery' : 'Pick Up';
  const titleText = order.expectedTime === 'NOW' ? `You Have New Order for ${deliveryMethod} Timed(NOW)!` : `You Have New Order for ${deliveryMethod}!<br/>Timed (Future)`;
  const paidTitle = order.paymentType === 'ONLINE' ? 'Paid By Card' : `CASH : ${order.carryOrDelivery === 'DELIVERY' ? 'Charge On Delivery!' : 'Store!'}`;


  const basket = order.basket.items.reduce((prev, current) => {
    prev[current.group._id] = prev[current.group._id]
      ? prev[current.group._id]
      : {
        name: current.group.name,
        _id: current.group._id,
        items: [],
      };

    current.properties = menufieldCommon.setProductPropsForRender(current.properties);
    prev[current.group._id].items.push(current);
    return prev;
  }, {});

  const params = {
    titleText,
    paidTitle,
    deliveryMethod,
    address: order.carryOrDelivery === 'DELIVERY' ? order.address.googleFormatted : '----',
    addressNote: order.carryOrDelivery === 'DELIVERY' ? order.address.note : '----',
    phone: order.carryOrDelivery === 'DELIVERY' ? '----' : order.phone,
    email: order.carryOrDelivery === 'DELIVERY' ? order.address.email : order.user.email,
    customerName: order.user.name === order.user.email ? `${order.user.given_name} ${order.user.family_name}` : order.user.name,
    orderTime: order.expectedTime === 'NOW' ? 'NOW' : moment(order.scheduled).tz(order.restaurantTimeZone).format('MM/DD/YYYY'),
    creditCard: order.creditCard.cardNumber,
    tip: order.tip.value ? order.tip.value.toFixed(2) : '0.00',
    basket,
    total: order.basket.total,
  };


  return htmlTemplate('order')(params);
};

const sendOrderFaxToRestaurant = (restaurant, order) => {
  if (!restaurant.faxMail || restaurant.faxMail.length <= 0)
    return;

  restaurantOrderHTML(order).then((template) => {
    PDF(template)(undefined).then((buffer) => {

      const attachments = [
        {
          filename: `${order.orderNumber}.pdf`,
          content: buffer,
        },
      ];

      // mail.send(restaurant.faxMail, "9143013033", "", attachments);
      mail.send('melih@tdsmaker.com', '9143013033', '', attachments);
    });
  });
};


const notifyTablets = (order) => {
  const orderId = order._id;
  const data = {};
  data[order.orderNumber] = true;

  const listnersPath = `listeners_test/${order.restaurantId}`;
  const listenersRef = firebase.database().ref(listnersPath);

  listenersRef.once('value').then((snapshot) => {
    if (snapshot.val()) {
      Object.keys(snapshot.val()).forEach((key) => {
        const ref = listenersRef.child(key).child('orders');
        ref.update(data);
      });
    }
  });
};

const sendOrderMailToRestaurant = (restaurant, order) => {
  restaurantOrderHTML(order).then((template) => {
    //mail.send('melih@tdsmaker.com', '9143013033', template);
  });
};

const updateCoupon = (coupon, restaurantId, userId) => {
  if (!coupon || coupon.useType === 'multi') return;

  Coupon.update({
    restaurantId,
    codes: { $all: [coupon.data.code] },
  }, {
      $set: {
        [`usedBy.${userId}`]: true,
      },
    }, (err, data) => {
      console.log('err', err);

      console.log('data', data);
    });
};

const postSave = (order) => {
  updateCoupon(order.basket.coupon, order.restaurantId, order.userId);
  notifyTablets(order);
  Restaurant.findById(order.restaurantId).then((restaurant) => {
    sendOrderFaxToRestaurant(restaurant, order);
    sendOrderMailToRestaurant(restaurant, order);
  });
};

const createOrderNumber = function (lengthOfText) {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

  for (let i = 0; i < lengthOfText; i++) {
    let randomNumber = Math.random() * possible.length;
    randomNumber = Math.floor(randomNumber);
    text += possible.charAt(randomNumber);
  }

  return text;
};
export {
  postSave,
  createOrderNumber,
};
