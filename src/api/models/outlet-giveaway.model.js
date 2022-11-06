const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const outletGiveawaySchema = new Schema({

    tempId: { type: String },
    amount: { type: Number },
    user: {
        type: Schema.ObjectId,
        ref: 'user',
        required: false
    },
    outlet: {
      type: Schema.ObjectId,
      ref: 'outlet',
      required: false
    },
    giveaway: {
        type: Schema.ObjectId,
        ref: 'giveaway',
        required: false
    },
    project: {
        type: Schema.ObjectId,
        ref: 'project',
        required: false
    },
    visit: {
      type: Schema.ObjectId,
      ref: 'visit',
      required: false
    },
    created: { type: Date, default: Date.now },
});

module.exports = mongoose.model('outletGiveaway', outletGiveawaySchema, 'outletGiveaways');