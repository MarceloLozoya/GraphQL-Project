const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const locationSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: false
    },
    latitude: {
        type: String,
        required: false
    },
    longitude: {
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

module.exports = mongoose.model('Location', locationSchema);