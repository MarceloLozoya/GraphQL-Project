const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const organizationSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    locations: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Location'
        }
    ],
    events: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Event'
        }
    ]
}, {
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    }
});

module.exports = mongoose.model('Organization', organizationSchema);