
const mongoose = require('mongoose');
require('mongoose-double')(mongoose);
const Schema = mongoose.Schema;
const SchemaTypes = mongoose.Schema.Types;

const outletSchema = new Schema({

    tempId: { type: String },
    number: { type: String },
    name: { type: String, require: true },
    owner: { type: String, require: true },
    phone: { type: String },
    countryCode: { type: String },
    tin: { type: String },
    brn: { type: String },
    counters:  { type: Number },
    latlng: {
      lng: { type: String },
      lat: { type: String }
    },
    location: {
      type: [ Number ],
      default: [ 0, 0 ], 
      index: '2dsphere' 
    },
    region: {
      type: Schema.ObjectId,
      ref: 'region',
      required: false
    },
    district: {
      type: Schema.ObjectId,
      ref: 'district',
      required: false
    },
    ward: {
      type: Schema.ObjectId,
      ref: 'ward',
      required: false
    },
    project: {
      type: Schema.ObjectId,
      ref: 'project',
      required: false
    },
    temp: {
      type: Schema.ObjectId,
      ref: 'temp',
      required: false
    },
    classifications: [{
      type: Schema.ObjectId,
      ref: 'classification',
    }],
    user: {
      type: Schema.ObjectId,
      ref: 'user',
      required: false
    },
    images: [{
      type: String,
    }],
    town: { type: String},
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now }
    
    
});

module.exports = mongoose.model('outlet', outletSchema, 'outlets');
