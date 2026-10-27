const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    level: {
        type: String,
        required: true
    },
    instructor: {
        name: {
            type: String,
            default: 'Learnova Expert'
        },
        avatar: {
            type: String,
            required: true
        }
    },
    rating: {
        type: Number,
        default: 5
    },
    category: {
        type: String,
        default: 'General'
    },
    tags: [{
        type: String
    }]
}, { timestamps: true });

// Virtual to ensure backwards-compatibility if `thumbnail` is referenced anywhere
courseSchema.virtual('thumbnail').get(function () {
    return this.image;
});

courseSchema.set('toJSON', { virtuals: true });
courseSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Course', courseSchema);