import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import API_BASE_URL from '../config';
import qrImage from '../assets/image.png';
import {
    User,
    Users,
    Calendar,
    Briefcase,
    CreditCard,
    FileText,
    Phone,
    Mail,
    Upload,
    QrCode,
    CheckCircle,
    Loader2,
    AlertCircle
} from 'lucide-react';

const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        fatherName: '',
        motherName: '',
        dob: '',
        occupation: '',
        aadhaar: '',
        pan: '',
        phone: '',
        email: '',
        paymentScreenshot: null
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const validate = () => {
        const newErrors = {};
        if (!formData.fullName.trim()) newErrors.fullName = "Full Name is required";
        if (!formData.fatherName.trim()) newErrors.fatherName = "Father's Name is required";
        if (!formData.motherName.trim()) newErrors.motherName = "Mother's Name is required";
        if (!formData.dob) newErrors.dob = "Date of Birth is required";
        if (!formData.occupation.trim()) newErrors.occupation = "Occupation is required";

        // Aadhaar
        if (!formData.aadhaar.trim()) {
            newErrors.aadhaar = "Aadhaar Number is required";
        } else if (!/^\d{12}$/.test(formData.aadhaar)) {
            newErrors.aadhaar = "Aadhaar must be 12 digits";
        }

        // PAN
        if (!formData.pan.trim()) {
            newErrors.pan = "PAN Number is required";
        } else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.pan.toUpperCase())) {
            newErrors.pan = "Invalid PAN format (e.g. ABCDE1234F)";
        }

        // Phone
        if (!formData.phone.trim()) {
            newErrors.phone = "Phone Number is required";
        } else if (!/^\d{10}$/.test(formData.phone)) {
            newErrors.phone = "Phone must be 10 digits";
        }

        // Email
        if (!formData.email.trim()) {
            newErrors.email = "Email Address is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Invalid email address";
        }

        if (!formData.paymentScreenshot) {
            newErrors.paymentScreenshot = "Payment screenshot is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'paymentScreenshot') {
            setFormData({ ...formData, [name]: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
        // Clear error for the field being edited
        if (errors[name]) {
            setErrors({ ...errors, [name]: '' });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            setIsSubmitting(true);

            // Prepare FormData as per requirement
            const data = new FormData();
            Object.keys(formData).forEach(key => {
                data.append(key, formData[key]);
            });

            try {
                const response = await fetch(`${API_BASE_URL}/register`, {
                    method: 'POST',
                    body: data,
                });

                const result = await response.json();

                if (response.ok) {
                    setIsSubmitting(false);
                    setIsSuccess(true);
                    // Reset form after success
                    setFormData({
                        fullName: '',
                        fatherName: '',
                        motherName: '',
                        dob: '',
                        occupation: '',
                        aadhaar: '',
                        pan: '',
                        phone: '',
                        email: '',
                        paymentScreenshot: null
                    });

                    // Clear errors
                    setErrors({});

                    // Hide success message after 5 seconds
                    setTimeout(() => setIsSuccess(false), 5000);
                } else {
                    setIsSubmitting(false);
                    alert(result.message || 'Registration failed');
                }
            } catch (error) {
                console.error('Submission error:', error);
                setIsSubmitting(false);
                alert('Connection error. Please ensure the backend is running.');
            }
        }
    };

    const FormDropdown = () => (
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-600 to-blue-500 rounded-t-2xl"></div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
            <div className="max-w-6xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col lg:flex-row relative">
                <FormDropdown />

                {/* Left Section: Form */}
                <div className="flex-1 p-6 lg:p-10">
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold text-slate-800 tracking-tight">HEL PVT LTD</h1>
                        <p className="text-slate-500 mt-2 font-medium">Please fill in the registration details below</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">


                        {/* Full Name */}
                        <div className="space-y-1">
                            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                                <User size={16} className="text-purple-500" /> Full Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                className={`w-full px-4 py-3 rounded-xl border ${errors.fullName ? 'border-red-500 bg-red-50' : 'border-slate-200'} focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all`}
                                placeholder="John Doe"
                            />
                            {errors.fullName && <p className="text-xs text-red-500 font-medium">{errors.fullName}</p>}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Father's Name */}
                            <div className="space-y-1">
                                <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                                    <Users size={16} className="text-purple-500" /> Father's Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="fatherName"
                                    value={formData.fatherName}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-3 rounded-xl border ${errors.fatherName ? 'border-red-500 bg-red-50' : 'border-slate-200'} focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all`}
                                    placeholder="Richard Doe"
                                />
                                {errors.fatherName && <p className="text-xs text-red-500 font-medium">{errors.fatherName}</p>}
                            </div>

                            {/* Mother's Name */}
                            <div className="space-y-1">
                                <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                                    <Users size={16} className="text-purple-500" /> Mother's Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="motherName"
                                    value={formData.motherName}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-3 rounded-xl border ${errors.motherName ? 'border-red-500 bg-red-50' : 'border-slate-200'} focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all`}
                                    placeholder="Jane Doe"
                                />
                                {errors.motherName && <p className="text-xs text-red-500 font-medium">{errors.motherName}</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Phone */}
                            <div className="space-y-1">
                                <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                                    <Phone size={16} className="text-purple-500" /> Phone Number <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="phone"
                                    maxLength="10"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-3 rounded-xl border ${errors.phone ? 'border-red-500 bg-red-50' : 'border-slate-200'} focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all`}
                                    placeholder="9876543210"
                                />
                                {errors.phone && <p className="text-xs text-red-500 font-medium">{errors.phone}</p>}
                            </div>

                            {/* Email */}
                            <div className="space-y-1">
                                <label className="text-sm font-semibold text-slate-700 flex items-center gap-1">
                                    <Mail size={16} className="text-purple-500" /> Email Address <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-3 rounded-xl border ${errors.email ? 'border-red-500 bg-red-50' : 'border-slate-200'} focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all`}
                                    placeholder="john@example.com"
                                />
                                {errors.email && <p className="text-xs text-red-500 font-medium">{errors.email}</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* DOB */}
                            <div className="space-y-1">
                                <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                                    <Calendar size={16} className="text-purple-500" /> Date of Birth <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="date"
                                    name="dob"
                                    value={formData.dob}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-3 rounded-xl border ${errors.dob ? 'border-red-500 bg-red-50' : 'border-slate-200'} focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all`}
                                />
                                {errors.dob && <p className="text-xs text-red-500 font-medium">{errors.dob}</p>}
                            </div>

                            {/* Occupation */}
                            <div className="space-y-1">
                                <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                                    <Briefcase size={16} className="text-purple-500" /> Occupation <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="occupation"
                                    value={formData.occupation}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-3 rounded-xl border ${errors.occupation ? 'border-red-500 bg-red-50' : 'border-slate-200'} focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all`}
                                    placeholder="Software Engineer"
                                />
                                {errors.occupation && <p className="text-xs text-red-500 font-medium">{errors.occupation}</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Aadhaar */}
                            <div className="space-y-1">
                                <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                                    <CreditCard size={16} className="text-purple-500" /> Aadhaar Number <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="aadhaar"
                                    maxLength="12"
                                    value={formData.aadhaar}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-3 rounded-xl border ${errors.aadhaar ? 'border-red-500 bg-red-50' : 'border-slate-200'} focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all`}
                                    placeholder="1234 5678 9012"
                                />
                                {errors.aadhaar && <p className="text-xs text-red-500 font-medium">{errors.aadhaar}</p>}
                            </div>

                            {/* PAN */}
                            <div className="space-y-1">
                                <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                                    <FileText size={16} className="text-purple-500" /> PAN Number <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="pan"
                                    maxLength="10"
                                    value={formData.pan}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-3 rounded-xl border ${errors.pan ? 'border-red-500 bg-red-50' : 'border-slate-200'} focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all uppercase`}
                                    placeholder="ABCDE1234F"
                                />
                                {errors.pan && <p className="text-xs text-red-500 font-medium">{errors.pan}</p>}
                            </div>
                        </div>



                        {/* Mobile QR (Only on mobile) */}
                        <div className="lg:hidden bg-slate-50 p-6 rounded-2xl border border-slate-100 flex flex-col items-center mb-6">
                            <div className="bg-white p-4 rounded-xl shadow-sm mb-4">
                                <div className="w-44 h-44 bg-white rounded flex items-center justify-center">
                                    <img src={qrImage} alt="Payment QR" className="w-full h-full object-contain" />
                                </div>
                            </div>
                            <p className="text-sm font-bold text-slate-700 mb-1">Scan to Pay</p>
                            <p className="text-xs text-slate-500">Scan this QR to complete your payment</p>
                        </div>

                        {/* File Upload */}
                        <div className="space-y-1">
                            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                                <Upload size={16} className="text-purple-500" /> Payment Screenshot <span className="text-red-500">*</span>
                            </label>
                            <div className={`relative border-2 border-dashed ${errors.paymentScreenshot ? 'border-red-300 bg-red-50' : 'border-slate-200'} rounded-xl p-6 text-center hover:border-purple-400 transition-all group`}>
                                <input
                                    type="file"
                                    name="paymentScreenshot"
                                    onChange={handleChange}
                                    accept="image/*"
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                />
                                <div className="space-y-2">
                                    <Upload className="mx-auto text-slate-400 group-hover:text-purple-500 transition-colors" size={32} />
                                    <p className="text-sm text-slate-600">
                                        {formData.paymentScreenshot ? (
                                            <span className="font-medium text-purple-600 underline">{formData.paymentScreenshot.name}</span>
                                        ) : (
                                            <>Click to upload or drag and drop</>
                                        )}
                                    </p>
                                    <p className="text-xs text-slate-400 italic">PNG, JPG or JPEG (Max 2MB)</p>
                                </div>
                            </div>
                            {errors.paymentScreenshot && <p className="text-xs text-red-500 font-medium">{errors.paymentScreenshot}</p>}
                        </div>



                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-blue-500 text-white font-bold text-lg shadow-lg hover:shadow-purple-200 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 ${isSubmitting ? 'opacity-90 cursor-not-allowed' : ''}`}
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="animate-spin" size={20} />
                                    Processing...
                                </>
                            ) : (
                                'Submit Registration'
                            )}
                        </button>
                    </form>

                </div>

                {/* Right Section: Sticky QR Code (Desktop only) */}
                <div className="hidden lg:block w-80 bg-slate-50 border-l border-slate-100 p-6">
                    <div className="sticky top-12 flex flex-col items-center text-center">
                        <h3 className="text-xl font-bold text-slate-800 mb-6">Payment Details</h3>

                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                            <div className="relative bg-white p-6 rounded-2xl shadow-xl">
                                <div className="w-60 h-60 bg-white flex items-center justify-center">
                                    <img src={qrImage} alt="Payment QR" className="w-full h-full object-contain" />
                                </div>
                            </div>
                        </div>


                    </div>
                </div>

                {/* Success Popup */}
                {isSuccess && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-300">
                        <div className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl scale-110 animate-in zoom-in duration-300 text-center">
                            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <CheckCircle className="text-green-500" size={48} />
                            </div>
                            <h2 className="text-2xl font-bold text-slate-800 mb-2">Success!</h2>
                            <p className="text-slate-600 mb-8">Your registration has been submitted successfully. We will review your application soon.</p>
                            <button
                                onClick={() => setIsSuccess(false)}
                                className="w-full py-3 rounded-xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition-colors"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RegistrationForm;
