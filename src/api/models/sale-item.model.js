const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const saleItemSchema = new Schema({
    sku : {
        type: Schema.ObjectId,
        ref: 'sku',
    },
    tempId: {type: String},
    sale : {
        type: Schema.ObjectId,
        ref: 'sku',
    },
    amount : { type: Number },
    priceEach : { type: Number }
});

module.exports = mongoose.model('saleItem', saleItemSchema, 'saleItems');
