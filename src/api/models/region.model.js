
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const regionSchema = new Schema({
    code: { type: String, require: true },
    name: { type: String, require: true },
    supervisor:  {
      type: Schema.ObjectId,
      ref: 'user',
    },
});

module.exports = mongoose.model('region', regionSchema, 'regions');
