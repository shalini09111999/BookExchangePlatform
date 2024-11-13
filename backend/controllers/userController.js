const User = require('../models/User');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');

// Generate JWT token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Register a new user
exports.register = async (req, res) => {
    const { name, email, password, favoriteGenres } = req.body;  // Accept favoriteGenres from the request
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already registered' });
        }
        
        // Create user with favoriteGenres included
        const user = await User.create({ name, email, password, favoriteGenres });
        
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            favoriteGenres: user.favoriteGenres,  // Include favoriteGenres in the response
            token: generateToken(user._id),
        });
    } catch (error) {
        console.error('User registration failed', error);
        res.status(400).json({ message: 'User registration failed' });
    }
};

// Forgot Password
exports.forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        // Generate a reset token
        const resetToken = crypto.randomBytes(20).toString('hex');
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = Date.now() + 3600000; // Token valid for 1 hour
        //await user.save();

        console.log('Before save:', {
            email: user.email,
            resetPasswordToken: user.resetPasswordToken,
            resetPasswordExpires: user.resetPasswordExpires
        });

        // Save the user with new fields
        await user.save();

        console.log('After save:', {
            email: user.email,
            resetPasswordToken: user.resetPasswordToken,
            resetPasswordExpires: user.resetPasswordExpires
        });

        // Configure the email transporter
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            to: user.email,
            from: process.env.EMAIL_USER,
            subject: 'Password Reset Request',
            text: `You are receiving this email because you (or someone else) requested a password reset. Use the following token to reset your password: ${resetToken}`
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Password reset token sent to email' });
    } catch (error) {
        res.status(500).json({ message: 'Error sending password reset email' });
    }
};

//reset password

exports.resetPassword = async (req, res) => {
    const { resetToken, newPassword } = req.body;
    try {
        const user = await User.findOne({
            resetPasswordToken: resetToken,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired token' });
        }

        // Trim and hash the new password
        const trimmedPassword = newPassword.trim();
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(trimmedPassword, salt);

        //console.log("New hashed password after reset:", user.password); // Debugging

        // Clear the reset token fields
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        // Save the updated user
        await user.save();
        console.log('Password reset successful'); // Debugging

        res.status(200).json({ message: 'Password successfully reset' });
    } catch (error) {
        console.error('Error during password reset:', error);
        res.status(500).json({ message: 'Password reset failed' });
    }
};

//Login
exports.login = async (req, res) => {
    const { email, password } = req.body;
    //console.log('Login attempt:', email, password); // Log login attempt data
    const trimmedPassword = password.trim(); // Trim the password

    try {
        const user = await User.findOne({ email });
        //console.log('User found:', user); // Debugging

        if (user) {
            const isMatch = await user.matchPassword(trimmedPassword);
           // console.log('Password match:', isMatch); 

            if (isMatch) {
                res.json({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    token: generateToken(user._id),
                });
            } else {
                console.log('Invalid email or password');
                res.status(401).json({ message: 'Invalid email or password' });
            }
        } else {
            console.log('No user found with this email');
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Login failed' });
    }
};



exports.logout = (req, res) => {
    res.clearCookie("token"); // If token is stored in cookies
    res.status(200).json({ message: "Logged out successfully" });
};





