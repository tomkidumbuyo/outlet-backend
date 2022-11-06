
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const outletClassificationSchema = new Schema({
    tempId: { type: String },
    outlet: {
      type: Schema.ObjectId,
      ref: 'outlet',
    },
    classification: {
      type: Schema.ObjectId,
      ref: 'classification',
    },
});

module.exports = mongoose.model('outletClassification', outletClassificationSchema, 'outletClassifications');
