const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    thumbnail: { type: String, required: true },
    price: { type: Number, required: true },
    duration: { type: String, required: true },
    level: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], default: 'Beginner' },
    instructor: {
        name: { type: String, required: true },
        avatar: { type: String }
    },
    rating: { type: Number, default: 0.0 },
    category: { type: String, required: true },
    tags: [{ type: String }],
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);