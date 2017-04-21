const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamps');
const Schema = mongoose.Schema;

const ChallengeSchema = Schema({
    date: {
        type: Date
    },
    status: {
        type: String,
        default: 'Pending'
    },
    source: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    target: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    winner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    bots: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
    }]
});

ChallengeSchema.plugin(timestamps);

module.exports = mongoose.model('Challenge', ChallengeSchema);