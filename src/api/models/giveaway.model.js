
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const giveawaySchema = new Schema({
    name: { type: String, require: true },
    date: {type: Date, required: true, default: Date()}
});

module.exports = mongoose.model('giveaway', giveawaySchema, 'giveaways');
