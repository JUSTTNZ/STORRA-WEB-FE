import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, Phone, Loader2 } from 'lucide-react';
import { AiFillApple } from 'react-icons/ai';
import { useAuth } from '../../../context/AuthContext';
import swipeImg from '../../../assets/images/auth/swipe2.png';

export default function StudentRegister() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    password: '',
    parentPhoneNumber: '',
    agreeToTerms: false,
  });
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e?.preventDefault();

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

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      await register({
        fullName: formData.fullName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        password: formData.password,
        parentPhoneNumber: formData.parentPhoneNumber || undefined,
      });
      navigate('/personalization');
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const updateFormData = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (error) setError('');
  };

  return (
    <div className="min-h-screen bg-secondary-0 flex items-center justify-center px-4 py-6 sm:py-8">
      <div className="w-full max-w-6xl bg-white rounded-xl overflow-hidden shadow-lg">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* FORM SECTION */}
          <div className="p-5 sm:p-6 md:p-8 lg:p-10">
            {/* Tablet Image Section */}
            <div className="hidden md:block lg:hidden bg-primary-400 rounded-xl p-4 sm:p-6 mb-6 sm:mb-8">
              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                <div className="flex sm:flex-col gap-2 sm:gap-3 sm:flex-shrink-0">
                  <Step number="1" text="Create an account type" active />
                  <Step number="2" text="Provide your details" />
                  <Step number="3" text="Start learning and earning" />
                </div>
                <div className="flex-1 flex items-center justify-center">
                  <img
                    src={swipeImg}
                    alt="Learning illustration"
                    className="w-full max-w-xs sm:max-w-sm"
                  />
                </div>
              </div>
            </div>

            {/* Header */}
            <div className="text-center mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-secondary-800">
                Create Account
              </h2>
              <p className="text-secondary-500 text-sm mt-1">
                Start your learning journey with Storra
              </p>
            </div>

            <form onSubmit={handleRegister} className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium mb-1.5 text-secondary-700">
                  Full Name <span className="text-error-200">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary-400" />
                  <input
                    type="text"
                    placeholder="e.g John Doe"
                    value={formData.fullName}
                    onChange={(e) => updateFormData('fullName', e.target.value)}
                    className="w-full border border-secondary-100 rounded-lg pl-10 pr-4 py-2.5 text-sm
                               focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent
                               placeholder:text-gray-400 text-gray-800"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium mb-1.5 text-secondary-700">
                  Email <span className="text-error-200">*</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary-400" />
                  <input
                    type="email"
                    placeholder="e.g storra@gmail.com"
                    value={formData.email}
                    onChange={(e) => updateFormData('email', e.target.value)}
                    className="w-full border border-secondary-100 rounded-lg pl-10 pr-4 py-2.5 text-sm
                               focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent
                               placeholder:text-gray-400 text-gray-800"
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-sm font-medium mb-1.5 text-secondary-700">
                  Phone Number <span className="text-error-200">*</span>
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary-400" />
                  <input
                    type="tel"
                    placeholder="e.g +234 800 000 0000"
                    value={formData.phoneNumber}
                    onChange={(e) => updateFormData('phoneNumber', e.target.value)}
                    className="w-full border border-secondary-100 rounded-lg pl-10 pr-4 py-2.5 text-sm
                               focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent
                               placeholder:text-gray-400 text-gray-800"
                  />
                </div>
              </div>

              {/* Parent Phone Number */}
              <div>
                <label className="block text-sm font-medium mb-1.5 text-secondary-700">
                  Parent's Phone Number <span className="text-secondary-400">(Optional)</span>
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary-400" />
                  <input
                    type="tel"
                    placeholder="Parent's phone number"
                    value={formData.parentPhoneNumber}
                    onChange={(e) => updateFormData('parentPhoneNumber', e.target.value)}
                    className="w-full border border-secondary-100 rounded-lg pl-10 pr-4 py-2.5 text-sm
                               focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent
                               placeholder:text-gray-400 text-gray-800"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium mb-1.5 text-secondary-700">
                  Password <span className="text-error-200">*</span>
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Min. 6 characters"
                    value={formData.password}
                    onChange={(e) => updateFormData('password', e.target.value)}
                    className="w-full border border-secondary-100 rounded-lg pl-10 pr-12 py-2.5 text-sm
                               focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent
                               placeholder:text-gray-400 text-gray-800"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary-400 hover:text-secondary-600"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Terms & Conditions */}
              <div className="flex items-start gap-2 text-sm">
                <input
                  type="checkbox"
                  id="terms"
                  checked={formData.agreeToTerms}
                  onChange={(e) => updateFormData('agreeToTerms', e.target.checked)}
                  className="w-4 h-4 mt-0.5 accent-primary-400"
                />
                <label htmlFor="terms" className="text-secondary-600">
                  I agree to the{' '}
                  <Link to="/terms" className="text-primary-500 hover:text-primary-600">
                    Terms & Conditions
                  </Link>
                </label>
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-3 bg-error-50 border border-error-100 text-error-200 rounded-lg text-sm">
                  {error}
                </div>
              )}

              {/* Register Button */}
              <button
                type="submit"
                disabled={!formData.agreeToTerms || isLoading}
                className={`w-full py-2.5 sm:py-3 rounded-lg font-medium text-white text-sm sm:text-base flex items-center justify-center gap-2 ${
                  formData.agreeToTerms && !isLoading
                    ? 'bg-primary-400 hover:bg-primary-500'
                    : 'bg-secondary-300 cursor-not-allowed'
                } transition-colors`}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  'Create Account'
                )}
              </button>

              {/* Divider */}
              <div className="flex items-center gap-3 text-sm text-secondary-400 my-4">
                <div className="flex-1 h-px bg-secondary-100" />
                Or continue with
                <div className="flex-1 h-px bg-secondary-100" />
              </div>

              {/* Social Buttons */}
              <div className="flex gap-3">
                <button
                  type="button"
                  className="flex-1 border border-secondary-100 rounded-lg py-2.5 flex items-center justify-center gap-2 hover:bg-secondary-50 transition-colors"
                >
                  <img
                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                    className="w-5 h-5"
                    alt="Google"
                  />
                  <span className="font-medium text-sm text-secondary-700">Google</span>
                </button>
                <button
                  type="button"
                  className="flex-1 border border-secondary-100 rounded-lg py-2.5 flex items-center justify-center gap-2 hover:bg-secondary-50 transition-colors"
                >
                  <AiFillApple className="w-5 h-5" />
                  <span className="font-medium text-sm text-secondary-700">Apple</span>
                </button>
              </div>

              {/* Login Link */}
              <p className="text-center text-sm mt-4 text-secondary-500">
                Already have an account?{' '}
                <Link
                  to="/auth/student/login"
                  className="text-primary-500 font-medium hover:text-primary-600"
                >
                  Sign in
                </Link>
              </p>
            </form>
          </div>

          {/* IMAGE SECTION - Desktop only */}
          <div className="hidden lg:flex bg-primary-400 rounded-r-xl p-6 xl:p-8 flex-col justify-center items-center">
            <div className="w-full max-w-md">
              <img
                src={swipeImg}
                alt="Learning illustration"
                className="w-full h-auto mb-6 xl:mb-8"
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

function Step({ number, text, active }) {
  return (
    <div
      className={`rounded-lg p-3 text-sm ${
        active ? 'bg-white text-secondary-800' : 'bg-primary-300/50 text-white'
      }`}
    >
      <div className="w-7 h-7 rounded-full bg-attention-200 text-secondary-900 flex items-center justify-center mb-2 font-bold text-sm">
        {number}
      </div>
      <p className="text-xs leading-tight">{text}</p>
    </div>
  );
}
