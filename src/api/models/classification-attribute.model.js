
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const classificationAttributeSchema = new Schema({
    
    name: { type: String, require: true },
    type: { type: String, require: true, enum: ['number', 'string', 'boolean'] },
    unit: { type: String, require: true },
    classification: {
        type: Schema.ObjectId,
        ref: 'classification',
        required: false
    },
    date: { type: Date, require: true, default: Date.now() },
});

module.exports = mongoose.model('classificationAttribute', classificationAttributeSchema, 'classificationAttributes');
