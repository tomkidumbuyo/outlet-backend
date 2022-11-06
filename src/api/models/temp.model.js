const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tempSchema = new Schema({
 user: {
    type: Schema.ObjectId,
    ref: 'user',
    require: true
  },
  project: {
    type: Schema.ObjectId,
    ref: 'project',
    require: true
  },
  date: { type: Date, require: true, default: Date.now() },
});

module.exports = mongoose.model('temp', tempSchema, 'temps');
