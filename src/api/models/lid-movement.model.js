const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const lidMovementSchema = new Schema({
    from: { type: String, require: true, enum: ['outlet', 'distributionCenter'] },
    to: { type: String, require: true, enum: ['distributionCenter', 'plant'] },
    amount: { type: Number, require: true },
    verified_amount: { type: Number, require: true },
    boxes: [{
      number: { type: String, require: true },
      amount: { type: Number, require: true },
      plant_amount: { type: Number, require: true },
    }],
    verified: { type: Boolean },
    verified_by: {
      type: Schema.ObjectId,
      ref: 'user',
    },
    verified_time: { type: Date },
    cancel: { type: Boolean },
    cancel_by: {
      type: Schema.ObjectId,
      ref: 'user',
    },
    cancel_time: { type: Date },
    distributionCenter:  {
      type: Schema.ObjectId,
      ref: 'distributionCenter',
    },
    outlet:  {
      type: Schema.ObjectId,
      ref: 'outlet',
    },
    status: { type: String, default: 'dispatched'},
    vehicle_number: { type: String },
    date: { type: Date, required: true, default: Date.now }
});

module.exports = mongoose.model('lidMovement', lidMovementSchema, 'lidMovements');
