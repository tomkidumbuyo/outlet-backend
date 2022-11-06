const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  name: { type: String, require: true },
  for: { type: String, require: true, default: 'outlet', enum: ['outlet', 'product']},
  classification: {
    type: Schema.ObjectId,
    ref: 'classification',
    require: true
  },
  date: { type: Date, require: true, default: Date.now() },
});

module.exports = mongoose.model('category', categorySchema, 'categories');
