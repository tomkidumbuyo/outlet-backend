
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const classSchema = new Schema({
    platform: { type: String, require: true, enum: ['facebook', 'twitter', 'instagram'] },
    positive: { type: Number, require: true },
    negative: { type: Number, require: true },
    neutral: { type: Number, require: true },
    date: { type: Date, require: true, default: Date.now() },
});

module.exports = mongoose.model('class', classSchema, 'classs');
