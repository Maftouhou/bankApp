var mongoose = require('mongoose');

/**
 * @type mongoose.schema
 */
var soldModel = new mongoose.Schema({
    user_id: {type: String, required: true},
    amount: {type: Number, required: true, default: 0},
    created_at: {type: Date, default: Date.now },
    updated_at: {type: Date, default: Date.now }
});

var sold = mongoose.model('soldModel', soldModel);
module.exports  = sold;
