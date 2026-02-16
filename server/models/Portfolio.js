const mongoose = require('mongoose');

const PortfolioSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a project title']
    },
    category: {
        type: String,
        required: [true, 'Please add a category'],
        enum: ['Editing', 'Thumbnails', 'Web Development', 'Brand Deals', 'Creator Network', 'Other']
    },
    thumbnail: {
        type: String,
        required: [true, 'Please add a thumbnail URL']
    },
    description: {
        type: String
    },
    projectLink: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Portfolio', PortfolioSchema);
