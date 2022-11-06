const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const skuSchema = new Schema({

    sku: { type: String, require: true },
    price: { type: Number, require: true },
    product: {
      type: Schema.ObjectId,
      ref: 'product',
    },

});

module.exports = mongoose.model('sku', skuSchema, 'skus');
