
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const realRegionSchema = new Schema({
    name: { type: String, require: true },
});

module.exports = mongoose.model('realRegion', realRegionSchema, 'realRegions');
