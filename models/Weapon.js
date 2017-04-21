const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamps');
const Schema = mongoose.Schema;

const WeaponSchema = Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    prix: {
        type: Number,
        required: true
    },
    dommages: {
        type: Number,
        required: true
    },
    capacity: {
        type: Number,
        required: true
    },
    bot: {
        type: Schema.Types.ObjectId,
        ref: 'Bot'
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

WeaponSchema.plugin(timestamps);

module.exports = mongoose.model('Weapon', WeaponSchema);
