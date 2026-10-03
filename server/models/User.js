const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        firstName: { type: String, trim: true },
        lastName: { type: String, trim: true },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        password: { type: String, required: false }, // اختياري لمستخدمي Social Login
        phoneNumber: { type: String, trim: true },

        // OAuth Fields
        googleId: { type: String, unique: true, sparse: true },
        facebookId: { type: String, unique: true, sparse: true },
        provider: {
            type: String,
            enum: ['local', 'google', 'facebook'],
            default: 'local'
        },

        // Password Reset
        resetPasswordToken: String,
        resetPasswordExpires: Date,
    },
    { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);