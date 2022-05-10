const mongoose = require('mongoose');
const geocoder = require('../utils/geocoderConfig');

const Schema = mongoose.Schema;

const fundraiserSchema = new Schema({
  writer: String,
  title: String,
  targetAmount: Number,
  address: String,
  currentAmount: {
    type: Number,
    default: 0
  },
  deadlineDate: Date,
  location: {
    type: {
      type: String,
      enum: ['Point'],
    },
    coordinates: {
      type: [Number],
      index: '2dsphere',
    },
    country: { type: String },
  },
  description: String,
  categories: [String],
  backers: Number,
  image: String,
});


fundraiserSchema.pre('save', async function (next) {
  const location = await geocoder.geocode(this.address);
  this.location = {
    type: 'Point',
    coordinates: [location[0].longitude, location[0].latitude],
    country: location[0].countryCode,
    city: location[0].city,
  };
  next();
});

const Fundraiser = mongoose.model('Fundraiser', fundraiserSchema);

module.exports = Fundraiser;
