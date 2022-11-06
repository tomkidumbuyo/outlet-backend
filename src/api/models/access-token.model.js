const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const accessTokenSchema = new Schema({
    access_token: {type:String, require:true},
    user_id: {type:String, require:true},
    time: {type:Date, require:true, default: Date.now},
    ip_adress: {type:String, require:true},
});

module.exports = mongoose.model('access_token',accessTokenSchema,'access_token');
