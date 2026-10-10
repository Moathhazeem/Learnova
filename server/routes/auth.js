const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const User = require('../models/User');

// Initialize Google OAuth client
if (!process.env.GOOGLE_CLIENT_ID) {
    console.warn('GOOGLE_CLIENT_ID is not defined! Google OAuth will not work properly.');
}
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Helper function to generate JWT token
const generateToken = (user) => {
    return jwt.sign(
        { userId: user._id, email: user.email },
        process.env.JWT_SECRET || 'secretkey',
        { expiresIn: '1d' }
    );
};

// Helper to format uniform user response
const formatUserResponse = (user) => ({
    id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phoneNumber: user.phoneNumber,
    provider: user.provider,
});

/**
 * @route   POST /api/auth/signup
 * @desc    Register a new user with email & password
 */
router.post('/signup', async (req, res) => {
    try {
        const { firstName, lastName, email, password, confirmPassword, phoneNumber } = req.body;

        if (!firstName || !lastName || !email || !password || !confirmPassword || !phoneNumber) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match.' });
        }

        const normalizedEmail = email.toLowerCase().trim();
        const existingUser = await User.findOne({ email: normalizedEmail });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already registered.' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            email: normalizedEmail,
            password: hashedPassword,
            phoneNumber: phoneNumber.trim(),
            provider: 'local',
        });

        await newUser.save();
        const token = generateToken(newUser);

        res.status(201).json({
            message: 'User registered successfully.',
            token,
            user: formatUserResponse(newUser),
        });
    } catch (error) {
        console.error('Signup Error:', error);
        res.status(500).json({ message: 'Server error during signup', error: error.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password, rememberMe } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'email and password are required.' });
        }
        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            return res.status(400).json({ message: 'email or password not correct.' });
        }
        if (!user.password) {
            return res.status(400).json({
                message: 'this account was created via google or facebook. Please use the login option.'
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'email or password not correct.' });
        }
        const expiresIn = rememberMe ? '30d' : '1d';

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'your_secret_key',
            { expiresIn }
        );
        const userResponse = {
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
        };

        res.status(200).json({
            message: 'Logged in successfully.',
            token,
            user: userResponse,
        });
    } catch (error) {
        console.error("Login Error Details:", error);
        res.status(500).json({ message: 'Server error during login' });
    }
});
/**
 * @route   POST /api/auth/google
 * @desc    Authenticate with Google OAuth
 */
router.post('/google', async (req, res) => {
    const { idToken } = req.body;
    const { credential, googleId, email, firstName, lastName } = req.body;

    if (!credential && !email) {
        return res.status(400).json({ message: 'No credential or email provided.' });
    }

    try {
        let userEmail = email;
        let gId = googleId;
        let fName = firstName;
        let lName = lastName;

        // Verify Google ID Token if client ID & credential exist
        if (credential) {
            try {
                const googleUserRes = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
                    headers: { Authorization: `Bearer ${credential}` }
                });
                const payload = googleUserRes.data;
                if (payload) {
                    gId = payload.sub || gId;
                    userEmail = payload.email || userEmail;
                    fName = payload.given_name || fName;
                    lName = payload.family_name || lName;
                }
            } catch (accessTokenErr) {
                if (process.env.GOOGLE_CLIENT_ID) {
                    try {
                        const ticket = await googleClient.verifyIdToken({
                            idToken: credential,
                            audience: process.env.GOOGLE_CLIENT_ID,
                        });
                        const payload = ticket.getPayload();
                        if (payload) {
                            gId = payload.sub || gId;
                            userEmail = payload.email || userEmail;
                            fName = payload.given_name || fName;
                            lName = payload.family_name || lName;
                        }
                    } catch {
                        console.warn('Google Token verification failed:', accessTokenErr.message);
                    }
                }
            }
        }

        if (!userEmail) {
            return res.status(400).json({ message: 'User email is required.' });
        }

        userEmail = userEmail.toLowerCase().trim();
        let user = await User.findOne({ email: userEmail });

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
            user.provider = user.provider || 'google';
            await user.save();
        }

        const token = generateToken(user);

        res.status(200).json({
            message: 'Google authentication successful',
            token,
            user: formatUserResponse(user),
        });
    } catch (error) {
        console.error('Google Auth Error:', error);
        res.status(400).json({ message: 'Google Authentication Failed', error: error.message });
    }
});

/**
 * @route   POST /api/auth/facebook
 * @desc    Authenticate with Facebook OAuth
 */
router.post('/facebook', async (req, res) => {
    const { accessToken } = req.body;

    if (!accessToken) {
        return res.status(400).json({ message: 'Access Token is required.' });
    }

    try {
        const fbUrl = `https://graph.facebook.com/v18.0/me?fields=id,first_name,last_name,email,picture&access_token=${encodeURIComponent(accessToken)}`;
        const fbResponse = await fetch(fbUrl);

        if (!fbResponse.ok) {
            const errorData = await fbResponse.json().catch(() => ({}));
            throw new Error(errorData.error?.message || 'Failed to fetch Facebook user info');
        }

        const fbData = await fbResponse.json();
        const { id: facebookId, email, first_name: firstName, last_name: lastName } = fbData;

        const userEmail = email ? email.toLowerCase().trim() : `${facebookId}@facebook.com`;

        let user = await User.findOne({ email: userEmail });

        if (!user) {
            user = new User({
                firstName: firstName || 'Facebook',
                lastName: lastName || 'User',
                email: userEmail,
                facebookId: facebookId,
                provider: 'facebook',
            });
            await user.save();
        }

        const token = generateToken(user);

        return res.status(200).json({
            message: 'Facebook authentication successful',
            token,
            user: formatUserResponse(user),
        });
    } catch (error) {
        console.error('Facebook Auth Error:', error);
        return res.status(400).json({ message: 'Facebook Authentication Failed', error: error.message });
    }
});

router.post('/forgot-password', async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'Email is not registered.' });
        }

        // توليد 6 أقام عشوائية (OTP Code)
        const resetCode = Math.floor(100000 + Math.random() * 900000).toString();

        user.resetPasswordToken = resetCode; // حفظ الكود في قاعدة البيانات
        user.resetPasswordExpires = Date.now() + 60 * 1000; // صالح لمدة 1 دقائق
        await user.save();

        try {
            await axios.post('http://localhost:5678/webhook/forgot-password', {
                email: user.email,
                resetCode: resetCode // إرسال الكود بدلاً من الرابط
            });
        } catch (webhookError) {
            console.error("Failed to send email", webhookError.message);
        }

        return res.status(200).json({
            success: true,
            message: 'تم إرسال رمز التحقق المكون من 6 أرقام إلى بريدك الإلكتروني'
        });

    } catch (error) {
        console.error('Error in forgot-password:', error);
        return res.status(500).json({
            success: false,
            message: 'حدث خطأ داخلي في الخادم، يرجى المحاولة لاحقاً'
        });
    }
});
module.exports = router;