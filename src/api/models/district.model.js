
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const districtSchema = new Schema({
    code: { type: String, require: true },
    name: { type: String, require: true },
    region: {
      type: Schema.ObjectId,
      ref: 'region',
    },
});

module.exports = mongoose.model('district', districtSchema, 'districts');
