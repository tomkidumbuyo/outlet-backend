
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const wardSchema = new Schema({
    code: { type: String, require: true },
    name: { type: String, require: true },
    district: {
      type: Schema.ObjectId,
      ref: 'district',
    },
});

module.exports = mongoose.model('ward', wardSchema, 'wards');
