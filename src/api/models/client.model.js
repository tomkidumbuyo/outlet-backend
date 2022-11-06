const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clientSchema = new Schema({
  name: { type: String, require: true },
  classification: {
    type: String,
    enum: ['FMCG', 'Heavy Industries', 'Merchandising',
    'Communication', 'Financial', 'Electronics',
    'Agri Products', 'RealEstate']
  },
  logo: { type: String, require: true },
  phones: [{
    type: Schema.ObjectId,
    ref: 'phone',
  }],
  website: { type: String, require: true },
  adress: { type: String, require: true },
  email: { type: String, require: true },
  date: { type: Date, require: true, default: Date.now() },
});

module.exports = mongoose.model('client', clientSchema, 'clients');
