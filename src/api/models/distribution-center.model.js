const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const distributionCenterSchema = new Schema({
    name: { type: String, require: true },
    number: { type: String, require: true },
    region: {
      type: Schema.ObjectId,
      ref: 'region',
    },
    phone: { type: String},
    district: {
      type: Schema.ObjectId,
      ref: 'district',
    },
    supervisor: {
      type: Schema.ObjectId,
      ref: 'user',
    },
});

module.exports = mongoose.model('distributionCenter', distributionCenterSchema, 'distributionCenters');
