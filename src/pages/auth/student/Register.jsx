import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiFillApple } from 'react-icons/ai';
import { Eye, EyeOff } from 'lucide-react';
import swipeImg from "../../../assets/images/auth/swipe2.png";

export default function StudentRegister() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
        password: '',
        parentPhoneNumber: '',
        agreeToTerms: false
    });
    const [error, setError] = useState("");

    const handleRegister = async () => {
        if (!formData.email || !formData.password) {
            setError('Email and password are required');
            return;
        }

        if (!formData.fullName) {
            setError('Full name is required');
            return;
        }

        if (!formData.phoneNumber) {
            setError('Phone number is required');
            return;
        }

        if (!formData.agreeToTerms) {
            setError('You must agree to the terms and conditions');
            return;
        }

        setIsLoading(true);
        setError("");

        try {
            // TODO: Implement actual registration API call
            console.log("Registration attempt:", formData);

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            // On success, navigate to personification
            navigate("/auth/others/personification");
        } catch {
            setError("Registration failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const updateFormData = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    return (
        <div className="min-h-screen bg-white flex items-center justify-center px-4 py-8">
            <div className="w-full max-w-6xl bg-white rounded-xl overflow-hidden shadow-lg">

                <div className="grid grid-cols-1 lg:grid-cols-2">

                    {/* FORM - Full width on mobile/tablet, half on large screens */}
                    <div className="p-6 sm:p-8 md:p-10 lg:p-12">

                        {/* IMAGE WITH STEPS - Shows on tablet (md) only, above Student Account */}
                        <div className="hidden md:block lg:hidden bg-blue-600 rounded-xl p-6 mb-8">
                            <div className="flex items-center gap-6">
                                {/* Steps on the left */}
                                <div className="flex-shrink-0 space-y-3">
                                    <Step number="1" text="Create an account type" active />
                                    <Step number="2" text="Provide your details" />
                                    <Step number="3" text="Start learning and earning" />
                                </div>

                                {/* Image on the right */}
                                <div className="flex-1 flex items-center justify-center">
                                    <img
                                        src={swipeImg}
                                        alt="Learning illustration"
                                        className="w-full max-w-sm"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Header */}
                        <div className="relative flex items-center justify-center mb-6">
                            <h2 className="text-2xl font-semibold">
                                Student Account
                            </h2>
                        </div>

                        <div className="space-y-4">
                            {/* Full Name */}
                            <Input
                                label="Full Name"
                                placeholder="Billie Dom"
                                value={formData.fullName}
                                onChange={(e) => updateFormData('fullName', e.target.value)}
                            />

                            {/* Email */}
                            <Input
                                label="Email"
                                type="email"
                                placeholder="Nz@gmail.com"
                                value={formData.email}
                                onChange={(e) => updateFormData('email', e.target.value)}
                            />

                            {/* Phone Number */}
                            <Input
                                label="Phone Number"
                                type="tel"
                                placeholder="+2347062487335"
                                value={formData.phoneNumber}
                                onChange={(e) => updateFormData('phoneNumber', e.target.value)}
                            />

                            {/* Password */}
                            <div>
                                <label className="block text-sm font-medium mb-1.5">Password</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="******"
                                        value={formData.password}
                                        onChange={(e) => updateFormData("password", e.target.value)}
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 pr-10
                                                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </div>

                            {/* Parent Phone Number */}
                            <Input
                                label={
                                    <>
                                        Parent Phone Number <span className="text-gray-500">(Optional)</span>
                                    </>
                                }
                                type="tel"
                                placeholder="Parent's phone number"
                                value={formData.parentPhoneNumber}
                                onChange={(e) => updateFormData('parentPhoneNumber', e.target.value)}
                            />

                            {/* Terms & Conditions */}
                            <div className="flex items-center gap-2 text-sm">
                                <input
                                    type="checkbox"
                                    id="terms"
                                    checked={formData.agreeToTerms}
                                    onChange={(e) => updateFormData('agreeToTerms', e.target.checked)}
                                    className="w-4 h-4"
                                />
                                <label htmlFor="terms">
                                    I hereby agree to the{" "}
                                    <span className="text-blue-600 cursor-pointer">
                                        Terms & Conditions.
                                    </span>
                                </label>
                            </div>

                            {/* Error Message */}
                            {error && (
                                <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
                                    {error}
                                </div>
                            )}

                            {/* Create Account Button */}
                            <button
                                onClick={handleRegister}
                                disabled={!formData.agreeToTerms || isLoading}
                                className={`w-full py-3 rounded-lg font-medium text-white ${formData.agreeToTerms && !isLoading
                                    ? "bg-blue-600 hover:bg-blue-700"
                                    : "bg-gray-300 cursor-not-allowed"
                                    } transition-colors`}
                            >
                                {isLoading ? (
                                    <div className="flex items-center justify-center">
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                        Creating Account...
                                    </div>
                                ) : (
                                    "Create My Account"
                                )}
                            </button>

                            {/* Divider */}
                            <div className="flex items-center gap-3 text-sm text-gray-400 my-4">
                                <div className="flex-1 h-px bg-gray-200" />
                                Or Sign Up with
                                <div className="flex-1 h-px bg-gray-200" />
                            </div>

                            {/* Social Buttons */}
                            <div className="flex gap-3">
                                <SocialButton
                                    icon="https://www.svgrepo.com/show/475656/google-color.svg"
                                    label="Google"
                                />
                                <SocialButton
                                    icon={<AiFillApple />}
                                    label="Apple"
                                />
                            </div>

                            {/* Login Link */}
                            <p className="text-center text-sm mt-4">
                                Already have an account?{" "}
                                <span
                                    onClick={() => navigate("/auth/student/login")}
                                    className="text-blue-600 cursor-pointer font-medium"
                                >
                                    Sign in
                                </span>
                            </p>
                        </div>
                    </div>

                    {/* IMAGE - Visible only on lg screens and above (right side) */}
                    <div className="hidden lg:flex bg-blue-600 rounded-r-xl p-8 flex-col justify-center items-center">
                        <div className="w-full max-w-md">
                            <img
                                src={swipeImg}
                                alt="Learning illustration"
                                className="w-full h-auto mb-8"
                            />

                            <div className="grid grid-cols-3 gap-3">
                                <Step number="1" text="Create an account type" active />
                                <Step number="2" text="Provide your details" />
                                <Step number="3" text="Start learning and earning" />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

/* ---------- Reusable Components ---------- */

function Input({ label, type = "text", placeholder, value, onChange }) {
    return (
        <div>
            <label className="block text-sm font-medium mb-1.5">{label}</label>
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
        </div>
    );
}

function SocialButton({ icon, label }) {
    return (
        <button className="flex-1 border border-gray-300 rounded-lg py-2.5 flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
            {typeof icon === 'string' ? (
                <img src={icon} className="w-5 h-5" alt={label} />
            ) : (
                <span className="w-5 h-5 flex items-center justify-center">{icon}</span>
            )}
            <span className="font-medium">{label}</span>
        </button>
    );
}

function Step({ number, text, active }) {
    return (
        <div
            className={`rounded-lg p-3 text-sm ${active ? "bg-white text-black" : "bg-blue-500/50 text-white"
                }`}
        >
            <div className="w-7 h-7 rounded-full bg-yellow-400 text-black flex items-center justify-center mb-2 font-bold text-sm">
                {number}
            </div>
            <p className="text-xs leading-tight">{text}</p>
        </div>
    );
}