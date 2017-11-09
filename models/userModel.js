var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

/**
 * @type mongoose.schema
 */
var userModel = new mongoose.Schema({
    firstName: {type: String, required: [true, 'Firstname is required']},
    lastName: {type: String, required: [true, 'Lastname is required']},
    phone: {type: Number},
    email: {type: String, required: [true, 'Email is required']},
    password: {type: String, required: [true, 'password is required']},
    role: {type: String, enum:['user', 'admin', 'root'], default:'user', required: true},
    created_at: {type: Date, default: Date.now },
    updated_at: {type: Date, default: Date.now }
});

// Save the user's hashed password
userModel.pre('save', function(next){
    var user = this;
    if(this.isModified('password') || this.isNew){
        bcrypt.genSalt(10, function(err, salt){
            if(err) return next(err);
            
            bcrypt.hash(user.password, salt, function(err, hash){
                if(err) return next(err);
                
                user.password = hash;
                next();
            });
        });
    }else { next(); }
});

// compare password
userModel.methods.comparePassword = function(pw, cb) {
    bcrypt.compare(pw, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

var User = mongoose.model('UserModel', userModel);
module.exports = User;
