
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const classificationSchema = new Schema({
    name: { type: String, require: true },
    for: { type: String, require: true, default: 'outlet', enum: ['outlet', 'product'] },
    attributes: [{
      type: Schema.ObjectId,
      ref: 'classificationAttribute',
      require: false
    }],
    category: {
      type: Schema.ObjectId,
      ref: 'category',
      require: false
    },
    color: { type: String, require: true },
    date: { type: Date, require: true, default: Date.now() },
});

module.exports = mongoose.model('classification', classificationSchema, 'classifications');
