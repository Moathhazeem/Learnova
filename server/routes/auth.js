const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

router.post('/google', async (req, res) => {
    const { credential } = req.body;

    try {
        const ticket = await client.verifyIdToken({
            idToken: credential,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();
        const { sub: googleId, email, given_name: firstName, family_name: lastName } = payload;

        let user = await User.findOne({ email });
        if (!user) {
            user = new User({
                firstName: firstName || 'Google',
                lastName: lastName || 'User',
                email,
                googleId,
                provider: 'google',
            });
            await user.save();
        } else if (!user.googleId) {
            user.googleId = googleId;
            await user.save();
        }

        res.status(200).json({
            message: 'Google authentication successful',
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
            },
        });
    } catch (error) {
        console.error('Google Auth Error:', error);
        res.status(400).json({ message: 'Google Authentication Failed' });
    }
});

router.post('/signup', async (req, res) => {
    try {
        const { firstName, lastName, email, password, confirmPassword, phoneNumber } = req.body;
        if (!firstName || !lastName || !email || !password || !confirmPassword || !phoneNumber) {
            return res.status(400).json({ message: 'All fields are required.' });
        }
        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match.' });
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists.' });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            phoneNumber,
        });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;