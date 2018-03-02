const promise = require('bluebird');
const mongoose = promise.promisifyAll(require('mongoose'));
const _ = require('lodash');
mongoose.Promise = require('bluebird');

const moment = require('moment-timezone');

const restaurantSchema = new mongoose.Schema({
  accountId: { type: mongoose.Schema.ObjectId, required: 'Add account id' },
  friendlyId: String,
  name: { type: String, required: 'Name is required.' },
  webUrl: String,
  sortName: { type: String, index: { unique: true } },
  slogan: String,
  orderSlogan: String,
  email: String,
  faxMail: String,
  status: String,
  deliveryDuration: Number,
  pickUpDuration: Number,
  deliveryCharge: Number,
  taxRate: Number,
  minOrderDeliveryValue: Number,
  address: {
    googleFormatted: String,
    addressLine: String,
    city: String,
    province: String,
    zip: String,
    lat: Number,
    lng: Number,
  },
  addressLimits: mongoose.Schema.Types.Mixed,
  menuId: { type: mongoose.Schema.ObjectId },
  homePage: {
    logoUrl: String,
    authLogoUrl: String,
    style: Object,
  },
  timeZone: {
    text: String,
    value: Number,
    name: String,
  },
  workHours: {
    weekDays: Object,
  },
  workingHours: [{
    whType: String,
    day: String,
    startHour: Number,
    startMinute: Number,
    startPeriod: String,
    endHour: Number,
    endMinute: Number,
    endPeriod: String,
  }],
  appStyle: {
    cssThemeFile: String,
    logoUrl: String,
  },
  phone: String,
  phoneAlternate: String,
  navigation: [
    {
      name: String,
      route: String,
    },
  ],
});

const convertDayToString = (day) => {
  switch (day) {
    case 0:
      return 'sunday';
    case 1:
      return 'monday';
    case 2:
      return 'tuesday';
    case 3:
      return 'wednesday';
    case 4:
      return 'thursday';
    case 5:
      return 'friday';
    case 6:
      return 'saturday';
    default:
      return 'sunday';
  }
};

// restaurantSchema.path('workingHours').schema.virtual('startTime').get(() => {
//   console.log("THİS", this);
//   const momentObj = moment(`${this.startHour}:${this.startMinute} ${this.startPeriod.toUpperCase()}`, ['h:mm A']);
//   return momentObj.toDate();
// });

// restaurantSchema.path('workingHours').schema.virtual('endTime').get(() => {
//   const momentObj = moment(`${this.endHour}:${this.endMinute} ${this.endPeriod.toUpperCase()}`, ['h:mm A']);
//   return momentObj.toDate();
// });

restaurantSchema.virtual('serverTime').get(() => new Date());

// restaurantSchema.virtual('todayWorkHours').get(() => {
//   const d = new Date();
//   const dayString = convertDayToString(d.getDay());

//   const weekDay = _.find(this.workingHours, { whType: 'weekDay', day: dayString });

//   if (weekDay === undefined) { return; }

//   const startDate = moment(new Date());
//   startDate.hour(weekDay.startHour);
//   startDate.minute(weekDay.startMinute);

//   if (weekDay.startPeriod.toUpperCase() === 'PM') { startDate.add(12, 'hours'); }

//   const endDate = moment(new Date());
//   endDate.hour(weekDay.endHour);
//   endDate.minute(weekDay.endMinute);

//   if (weekDay.endPeriod.toUpperCase() === 'PM') { endDate.add(12, 'hours'); }

//   return {
//     startTime: startDate.toDate(),
//     endTime: endDate.toDate(),
//     startHour: weekDay.startHour < 10 ? `0${weekDay.startHour}` : weekDay.startHour.toString(),
//     startMinute: weekDay.startMinute < 10 ? `0${weekDay.startMinute}` : weekDay.startMinute.toString(),
//     startPeriod: weekDay.startPeriod,
//     endHour: weekDay.endHour < 10 ? `0${weekDay.endHour}` : weekDay.endHour.toString(),
//     endMinute: weekDay.endMinute < 10 ? `0${weekDay.endMinute}` : weekDay.endMinute.toString(),
//     endPeriod: weekDay.endPeriod,
//   };
// });

restaurantSchema.path('workingHours').schema.set('toJSON', {
  virtuals: true,
});

restaurantSchema.set('toJSON', {
  virtuals: true,
});


module.exports = mongoose.model('Restaurant', restaurantSchema);
