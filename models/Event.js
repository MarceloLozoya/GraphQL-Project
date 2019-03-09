const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const eventSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    organization: {
        type: Schema.Types.ObjectId,
        required: false,
        ref: 'Organization'
    }
}, {
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    }
});

module.exports = mongoose.model('Event', eventSchema);