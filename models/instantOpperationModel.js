var mongoose = require('mongoose');

/**
 * @type mongoose.schema
 */
var instantOpperationModel = new mongoose.Schema({
    user_id: {type: String, required: true},
    typeOpperation: {type: String, required: true},
    dateOpperation: {type: Date},
    co_author_id: {type: String, required: true},
    description: {type: String, required: true},
    created_at: {type: Date, default: Date.now },
    updated_at: {type: Date, default: Date.now }
});

var instantOpperation = mongoose.model('AppartementModel', instantOpperationModel);
module.exports  = instantOpperation;
