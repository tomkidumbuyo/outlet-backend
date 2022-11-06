const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const outletProductSchema = new Schema({

    tempId: { type: String },
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
    posms: [{ 
        posm: {
            type: Schema.ObjectId,
            ref: 'posm',
            required: false
        }, 
        visible: {type: Boolean, default: false},
        saved: {type: Boolean, default: false}
    }],
    created: { type: Date, default: Date.now },
});

module.exports = mongoose.model('outletProduct', outletProductSchema, 'outletProducts');