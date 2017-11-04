var mongoose = require('mongoose');
//var bcrypt = require('bcrypt-node');
var bcrypt = require('bcrypt');

/**
 * @type mongoose.schema
 */
var authModel = new mongoose.Schema({
    user_id: {type: String, required: true},
    email: {type: String, unique: true, required: [true, 'login is required']},
    password: {type: String, required: [true, 'password is required']},
    role: {type: String, enum:['user', 'admin', 'root'], default:'user', required: true},
    created_at: {type: Date, default: Date.now },
    updated_at: {type: Date, default: Date.now }
});

// Save the user's hashed password
authModel.pre('save', function(next){
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
authModel.methods.comparePassword = function(pw, cb) {
    bcrypt.compare(pw, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

var Auth = mongoose.model('AuthModel', authModel);
module.exports = Auth;
