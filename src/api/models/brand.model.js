const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const brandSchema = new Schema({
  name: { type: String, require: true },
  logo: { type: String },
  client: {
    type: Schema.ObjectId,
    ref: 'client',
  },
  manager: {
    name: { type: String, require: true },
    phones: [{
      type: Schema.ObjectId,
      ref: 'phone',
    }],
    email: { type: String, require: true },
  },
  date: { type: Date, require: true, default: Date.now() },
});


module.exports = mongoose.model('brand', brandSchema, 'brands');
