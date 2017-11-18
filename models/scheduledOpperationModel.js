var mongoose = require('mongoose');

/**
 * @type mongoose.schema
 */
var scheduledOpperationModel = new mongoose.Schema({
    user_id: {type: String, required: true},
    statusOpperation: {type: String, enum: ['done', 'undone'], required: true, default: 'undone'},
    statusRepport: {
        status: {type: String, enum: ['success', 'fail', 'pending'], required: true, default: 'pending'},
        comment: {type: String, default: 'en attente de validation'}
    },
    dateOpperation: {type: Date, required: true},
    scheduledDateOpperation: {type: Date },
    co_author_id: {type: String, required: true},
    amount: {type: Number, required: true},
    description: {type: String, required: true},
    created_at: {type: Date, default: Date.now },
    updated_at: {type: Date, default: Date.now }
});

var scheduledOpperation = mongoose.model('ScheduledOpperationModel', scheduledOpperationModel);
module.exports  = scheduledOpperation;
