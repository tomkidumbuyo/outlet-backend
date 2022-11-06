const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const outletAttributeSchema = new Schema({

    tempId: { type: String },

    number: { type: Number },
    string: { type: String },
    bool: { type: Boolean },
    
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
    attribute: {
      type: Schema.ObjectId,
      ref: 'classificationAttribute',
      required: false
    },
    created: { type: Date, default: Date.now },
});


module.exports = mongoose.model('outletAttribute', outletAttributeSchema, 'outletAttributes');