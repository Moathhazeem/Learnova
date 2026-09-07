const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');
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
            return res.status(400).json({ message: 'Email already exists.' })
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