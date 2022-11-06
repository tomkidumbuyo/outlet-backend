const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const outletPosmSchema = new Schema({

    tempId: { type: String },
    added: { type: Number },
    removed: { type: Number },
    user: {
        type: Schema.ObjectId,
        ref: 'user',
        required: false
    },
    outlet: {
      type: Schema.ObjectId,
      ref: 'outlet',
      required: false
    },
    posm: {
        type: Schema.ObjectId,
        ref: 'posm',
        required: false
    },
    product: {
      type: Schema.ObjectId,
      ref: 'product',
      required: false
  },
    project: {
        type: Schema.ObjectId,
        ref: 'project',
        required: false
    },
    visit: {
      type: Schema.ObjectId,
      ref: 'visit',
      required: false
    },
    images: [{
      type: String,
    }],
    created: { type: Date, default: Date.now },
});

module.exports = mongoose.model('outletPosm', outletPosmSchema, 'outletPosms');