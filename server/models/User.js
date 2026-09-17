const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        firstName: { type: String, required: true, trim: true },
        lastName: { type: String, required: true, trim: true },
        email: { type: String, required: true, unique: true, lowercase: true, trim: true },
        password: { type: String, required: false },
        phoneNumber: { type: String, required: false, trim: true },
        googleId: { type: String, unique: false },
        provider: { type: String, default: 'local' },
    },
    { timestamps: true }
);
module.exports = mongoose.model('User', userSchema);