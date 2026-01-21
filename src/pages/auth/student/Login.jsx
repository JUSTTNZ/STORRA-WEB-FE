import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, Loader2 } from 'lucide-react';
import { AiFillApple } from 'react-icons/ai';
import { useAuth } from '../../../context/AuthContext';
import swipeImg from '../../../assets/images/auth/swipe2.png';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e?.preventDefault();

    if (!formData.email || !formData.password) {
      setError('Email and password are required');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      await login({
        email: formData.email,
        password: formData.password,
      });
      navigate('/home');
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Login failed. Please try again.');
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
          <div className="p-5 sm:p-6 md:p-8 lg:p-12">
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
                Welcome Back
              </h2>
              <p className="text-secondary-500 text-sm mt-1">
                Sign in to continue your learning journey
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium mb-1.5 text-secondary-700">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary-400" />
                  <input
                    type="email"
                    placeholder="e.g storra@gmail.com"
                    value={formData.email}
                    onChange={(e) => updateFormData('email', e.target.value)}
                    className="w-full border border-secondary-100 rounded-lg pl-10 pr-4 py-2.5 text-sm sm:text-base
                               focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent
                               placeholder:text-secondary-400"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium mb-1.5 text-secondary-700">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => updateFormData('password', e.target.value)}
                    className="w-full border border-secondary-100 rounded-lg pl-10 pr-12 py-2.5 text-sm sm:text-base
                               focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent
                               placeholder:text-secondary-400"
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

              {/* Forgot Password */}
              <div className="text-right">
                <Link
                  to="/auth/forgot-password"
                  className="text-sm text-primary-500 hover:text-primary-600"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-3 bg-error-50 border border-error-100 text-error-200 rounded-lg text-sm">
                  {error}
                </div>
              )}

              {/* Login Button */}
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-2.5 sm:py-3 rounded-lg font-medium text-white text-sm sm:text-base flex items-center justify-center gap-2 ${
                  !isLoading
                    ? 'bg-primary-400 hover:bg-primary-500'
                    : 'bg-secondary-300 cursor-not-allowed'
                } transition-colors`}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Signing In...
                  </>
                ) : (
                  'Sign In'
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

              {/* Register Link */}
              <p className="text-center text-sm mt-4 text-secondary-500">
                Don't have an account?{' '}
                <Link
                  to="/auth/student/register"
                  className="text-primary-500 font-medium hover:text-primary-600"
                >
                  Sign up
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
