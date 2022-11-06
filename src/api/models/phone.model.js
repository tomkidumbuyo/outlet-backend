const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const phoneSchema = new Schema({
  countryCode: {type: String, require: true },
  nationalNumber: {type: String, require: true },
  number: {type: String, require: true },
  dialCode: {type: String, require: true },
  internationalNumber: {type: String, require: true },
  e164Number: {type: String, require: true },
  date: { type: Date, require: true, default: Date.now() },
});

module.exports = mongoose.model('phone', phoneSchema, 'phones');
