var mongoose = require('mongoose');

/**
 * @type mongoose.schema
 */
var userModel = new mongoose.Schema({
    firstname: {type: String, required: [true, 'Firstname is required']},
    lastName: {type: String, required: [true, 'Lastname is required']},
    email: {type: String, required: [true, 'Email is required']},
    phone: {type: Number},
    created_at: {type: Date, default: Date.now },
    updated_at: {type: Date, default: Date.now }
});

var User = mongoose.model('UserModel', userModel);
module.exports = User;
