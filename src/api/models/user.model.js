const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
SALT_WORK_FACTOR = 10;

const userSchema = new Schema({
    email: { type: String, require: true },
    user: { type: String, require: true },
    first_name: { type: String },
    last_name: { type: String },
    country: { type: String },
    city: { type: String },
    twitter: { type: String },
    about: { type: String },
    password: { type: String, require: true },
    date_of_birth: { type: Date },
    ethnicity: { type: String },
    sex: { type: String },
    citizenship: { type: String },
    phone: { type: String },
    adress: { type: String },
    project: {
        type: Schema.ObjectId,
        ref: 'project',
    },
    client: {
        type: Schema.ObjectId,
        ref: 'client',
    },
    type: { type: String, require: true , enum: ['admin','distributionCenter','regionalSuperviser','aim','plant','temp','client']},
    creation_dt: { type: Date, require: true, default: Date.now },
    isAdmin: { type: Boolean, require: true, default: false },
    region:  {
      type: Schema.ObjectId,
      ref: 'region',
    },
    dc:  {
      type: Schema.ObjectId,
      ref: 'distributionCenter',
    },
});

userSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

userSchema.methods.isValid = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('user', userSchema, 'users');
