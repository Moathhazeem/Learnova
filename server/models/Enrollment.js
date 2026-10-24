const mongoose = require('mongoose');

const enrollmentSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    progressPercentage: { type: Number, default: 0 }, // مثال: 30 (يعني 30%)
    timeLeft: { type: String, default: "0h 0m left" }, // مثال: "6h 30m left"
    isCompleted: { type: Boolean, default: false },
    lastAccessed: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Enrollment', enrollmentSchema);