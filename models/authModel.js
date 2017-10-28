var mongoose = require('mongoose');

/**
 * @type mongoose.schema
 */
var authModel = new mongoose.Schema({
    user_id: {type: String, required: true},
    login: {type: String, required: [true, 'login is required']},
    password: {type: String, required: [true, 'password is required']},
    remember_token: {type: String, required: true},
    role: {type: String, required: true},
    created_at: {type: Date, default: Date.now },
    updated_at: {type: Date, default: Date.now }
});

var Auth = mongoose.model('UserModel', authModel);
module.exports = Auth;
