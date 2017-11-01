var mongoose = require('mongoose');

/**
 * @type mongoose.schema
 */
var scheduledOpperationModel = new mongoose.Schema({
    user_id: {type: String, required: true},
    typeOpperation: {type: String, required: true},
    dateOpperation: {type: Date, default: Date.now },
    scheduledDateOpperation: {type: Date },
    co_author_id: {type: String, required: true},
    amount: {type: Number, required: true},
    description: {type: String, required: true},
    created_at: {type: Date, default: Date.now },
    updated_at: {type: Date, default: Date.now }
});

var scheduledOpperation = mongoose.model('ScheduledOpperationModel', scheduledOpperationModel);
module.exports  = scheduledOpperation;
