import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ParentRegister() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
        password: '',
        agreeToTerms: false
    });
    const [error, setError] = useState("");

    const handleRegister = async () => {
        if (!formData.fullName) {
            setError('Full name is required');
            return;
        }

        if (!formData.password) {
            setError('Password is required');
            return;
        }

        if (!formData.agreeToTerms) {
            setError('You must agree to the terms and conditions');
            return;
        }

        setError("");

        try {
            // TODO: Implement actual registration API call
            console.log("Parent registration attempt:", formData);

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            // On success, navigate to login
            navigate("/auth/parent/login");
        } catch {
            setError("Registration failed. Please try again.");
        }
    };

    const updateFormData = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    return (
        <div className="min-h-screen bg-white flex flex-col font-grotesk">
            <div className="flex-1 px-5 pt-10">
                <div className="max-w-md mx-auto">
                    {/* Header */}
                    <div className="relative flex items-center justify-center mb-6 mt-3">
                        <button
                            onClick={() => navigate("/auth/choose-account")}
                            className="absolute left-0 p-2 hover:bg-gray-100 rounded-full"
                        >
                            ←
                        </button>
                        <h1 className="text-2xl font-semibold text-center text-gray-800">
                            Parent Account
                        </h1>
                    </div>

                    {/* Full Name */}
                    <label className="block text-base font-medium text-gray-700 mb-2">
                        Full Name
                    </label>
                    <input
                        type="text"
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-50 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Billie Dom"
                        value={formData.fullName}
                        onChange={(e) => updateFormData('fullName', e.target.value)}
                    />

                    {/* Email */}
                    <label className="block text-base font-medium text-gray-700 mb-2">
                        Email
                    </label>
                    <div className="relative">
                        <input
                            type="email"
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-50 mb-4 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Nz@gmail.com"
                            value={formData.email}
                            onChange={(e) => updateFormData("email", e.target.value)}
                        />
                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                            ✉️
                        </span>
                    </div>

                    {/* Phone Number */}
                    <label className="block text-base font-medium text-gray-700 mb-2">
                        Phone Number
                    </label>
                    <input
                        type="tel"
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-50 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="+2347062487335"
                        value={formData.phoneNumber}
                        onChange={(e) => updateFormData('phoneNumber', e.target.value)}
                    />

                    {/* Password */}
                    <label className="block text-base font-medium text-gray-700 mb-2">
                        Password
                    </label>
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-50 mb-4 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="******"
                            value={formData.password}
                            onChange={(e) => updateFormData("password", e.target.value)}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        >
                            {showPassword ? "🙈" : "👁️"}
                        </button>
                    </div>

                    {/* Terms & Conditions */}
                    <div className="flex items-start mb-6">
                        <input
                            type="checkbox"
                            id="terms"
                            checked={formData.agreeToTerms}
                            onChange={(e) => updateFormData('agreeToTerms', e.target.checked)}
                            className="mt-1 mr-3 w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <label htmlFor="terms" className="text-gray-700 flex-1">
                            I hereby agree to the{" "}
                            <span className="text-blue-500 font-semibold">Terms & Conditions</span>.
                        </label>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                            {error}
                        </div>
                    )}

                    {/* Create Account Button */}
                    <button
                        onClick={handleRegister}
                        disabled={!formData.agreeToTerms}
                        className={`w-full py-4 rounded-full mb-4 text-white text-lg font-semibold ${formData.agreeToTerms
                                ? "bg-blue-500 hover:bg-blue-700"
                                : "bg-gray-300 cursor-not-allowed"
                            } transition-colors`}
                    >
                        Create My Account
                    </button>

                    {/* Divider */}
                    <div className="flex items-center my-2">
                        <div className="flex-1 h-px bg-gray-300"></div>
                        <span className="mx-4 text-gray-500">Or Sign Up with</span>
                        <div className="flex-1 h-px bg-gray-300"></div>
                    </div>

                    {/* Social Buttons */}
                    <div className="space-y-3 mb-6 mt-2">
                        <button className="w-full flex items-center justify-center bg-gray-100 border border-gray-300 rounded-full px-6 py-3 hover:bg-gray-200 transition-colors">
                            <span className="text-red-500 mr-2">G</span>
                            <span className="text-gray-700 font-medium">Google</span>
                        </button>
                        <button className="w-full flex items-center justify-center bg-gray-100 border border-gray-300 rounded-full px-6 py-3 hover:bg-gray-200 transition-colors">
                            <span className="text-black mr-2"></span>
                            <span className="text-gray-700 font-medium">Apple</span>
                        </button>
                    </div>

                    {/* Login Link */}
                    <div className="flex justify-center items-center mb-8">
                        <span className="text-gray-600">Already have an account?</span>
                        <button
                            onClick={() => navigate("/auth/parent/login")}
                            className="text-blue-500 font-semibold ml-1 hover:text-blue-700"
                        >
                            Login
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
