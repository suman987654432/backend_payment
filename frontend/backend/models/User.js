const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    fatherName: { type: String, required: true },
    motherName: { type: String, required: true },
    dob: { type: String, required: true },
    occupation: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    aadhaar: { type: String, required: true },
    pan: { type: String, required: true },
    paymentScreenshot: { type: String, required: true } // Cloudinary URL
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
