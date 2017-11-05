var mongoose = require('mongoose');

/**
 * @type mongoose.schema
 */
var soldModel = new mongoose.Schema({
    user_id: {type: String, required: true},
    Account_num: {
        type: String, required: true, 
        unique: true, default: "MB_"+Math.floor(Math.random() * 1000000000000)},
    amount: {type: Number, required: true, default: 0},
    created_at: {type: Date, default: Date.now },
    updated_at: {type: Date, default: Date.now }
});

var sold = mongoose.model('soldModel', soldModel);
module.exports  = sold;
