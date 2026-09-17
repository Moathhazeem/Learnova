const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { OAuth2Client } = require('google-auth-library');

if (!process.env.GOOGLE_CLIENT_ID) {
    console.warn('GOOGLE_CLIENT_ID is not defined! Google OAuth will not work.');
}

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

router.post('/google', async (req, res) => {
    const { credential, googleId, email, firstName, lastName } = req.body;

    if (!credential && !email) {
        return res.status(400).json({ message: 'No credential or email provided' });
    }

    if (!process.env.GOOGLE_CLIENT_ID) {
        return res.status(500).json({ message: 'Server configuration error: GOOGLE_CLIENT_ID missing' });
    }

    try {
        let userEmail = email;
        let gId = googleId;
        let fName = firstName;
        let lName = lastName;
        if (!userEmail && credential) {
            const googleRes = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${credential}`);
            const payload = await googleRes.json();
            if (payload.error) {
                return res.status(400).json({ message: 'Invalid Google Access Token' })
            }
            userEmail = payload.email;
            fName = payload.given_name;
            lName = payload.family_name;
            gId = payload.sub;
        }
        let user = await User.findOne({ email: userEmail });

        const ticket = await client.verifyIdToken({
            idToken: credential,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();
        const { sub: googleId, email, given_name: firstName, family_name: lastName } = payload;

        if (!user) {
            user = new User({
                firstName: fName || 'Google',
                lastName: lName || 'User',
                email: userEmail,
                googleId: gId,
                provider: 'google',
            });
            await user.save();
        } else if (!user.googleId) {
            user.googleId = gId;
            user.provider = 'google';
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