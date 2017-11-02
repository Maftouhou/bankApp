var mongoose = require('mongoose');

/**
 * @type mongoose.schema
 */
var instantOpperationModel = new mongoose.Schema({
    user_id: {type: String, required: true},
    dateOpperation: {type: Date, default: Date.now },
    co_author_id: {type: String, required: true},
    amount: {type: Number, required: true},
    description: {type: String, required: true},
    created_at: {type: Date, default: Date.now },
    updated_at: {type: Date, default: Date.now }
});

var instantOpperation = mongoose.model('InstantOpperationModel', instantOpperationModel);
module.exports  = instantOpperation;
