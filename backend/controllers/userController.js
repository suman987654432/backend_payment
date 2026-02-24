const User = require('../models/User');

const registerUser = async (req, res) => {
    try {
        const {
            fullName,
            fatherName,
            motherName,
            dob,
            occupation,
            phone,
            email,
            aadhaar,
            pan
        } = req.body;

        // Check if image was uploaded
        if (!req.file) {
            return res.status(400).json({ message: 'Payment screenshot is required' });
        }

        const newUser = new User({
            fullName,
            fatherName,
            motherName,
            dob,
            occupation,
            phone,
            email,
            aadhaar,
            pan,
            paymentScreenshot: req.file.path // Cloudinary URL provided by multer-storage-cloudinary
        });

        await newUser.save();

        res.status(201).json({
            success: true,
            message: 'Registration successful',
            data: newUser
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error during registration',
            error: error.message
        });
    }
};

module.exports = { registerUser };
