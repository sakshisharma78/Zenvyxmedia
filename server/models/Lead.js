const mongoose = require('mongoose');

const LeadSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    role: {
        type: String,
        enum: ['Creator', 'Brand', 'Agency', 'Other'],
        default: 'Other'
    },
    serviceInterested: {
        type: String
    },
    socialLink: {
        type: String
    },
    budget: {
        type: String
    },
    email: {
        type: String,
        required: [true, 'Please add an email']
    },
    message: {
        type: String
    },
    status: {
        type: String,
        enum: ['New', 'Contacted', 'Closed'],
        default: 'New'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Lead', LeadSchema);
