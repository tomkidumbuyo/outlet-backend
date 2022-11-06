const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const visitSchema = new Schema({
    date: { type: Date, require: true },
    outlet: {
      type: Schema.ObjectId,
      ref: 'outlet',
    },
    project: {
        type: Schema.ObjectId,
        ref: 'project',
    },
    user: {
        type: Schema.ObjectId,
        ref: 'user',
    },
    images: [{ type: String, require: true }],
    posmBeforeImages: [{ type: String, require: true }],
    posmAfterImages: [{ type: String, require: true }],

});

module.exports = mongoose.model('visit', visitSchema, 'visits');