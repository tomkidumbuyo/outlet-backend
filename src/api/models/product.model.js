const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: { type: String, require: true },
  classifications: [{
    type: Schema.ObjectId,
    ref: 'classification',
  }],
  skus: [{
    type: Schema.ObjectId,
    ref: 'sku',
  }],
  brand: {
    type: Schema.ObjectId,
    ref: 'brand',
  },
  image: { type: String, require: true },
  date: { type: Date, require: true, default: Date.now() },
});

module.exports = mongoose.model('product', productSchema, 'products');
