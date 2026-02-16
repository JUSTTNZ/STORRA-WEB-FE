import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, Loader2, CheckCircle } from 'lucide-react';
import { authService } from '../../../services/authService';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setError('Email is required');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      await authService.resetPassword(email.trim());
      setSent(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send reset link. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-[var(--background)] dark:via-[var(--background)] dark:to-[var(--background)] px-4">
      <div className="w-full max-w-md animate-fade-in-up">
        <div className="bg-white dark:bg-[var(--card-background)] rounded-2xl border border-[var(--secondary-100)] dark:border-[var(--border-color)] p-8">
          {sent ? (
            <div className="text-center">
              <div className="w-16 h-16 bg-[var(--success-50)] dark:bg-[rgba(40,180,17,0.15)] rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-[var(--success-200)] dark:text-[var(--success-color)]" />
              </div>
              <h1 className="text-xl font-bold text-[var(--secondary-800)] dark:text-[var(--text)] mb-2">
                Check your email
              </h1>
              <p className="text-sm text-[var(--secondary-500)] dark:text-[var(--text-muted)] mb-6">
                We sent a password reset link to <span className="font-medium text-[var(--secondary-700)] dark:text-[var(--text)]">{email}</span>
              </p>
              <Link
                to="/auth/student/login"
                className="inline-flex items-center gap-2 text-sm font-medium text-[var(--primary-500)] dark:text-[var(--primary)] hover:text-[var(--primary-600)]"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to login
              </Link>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <h1 className="text-xl font-bold text-[var(--secondary-800)] dark:text-[var(--text)] mb-1">
                  Forgot password?
                </h1>
                <p className="text-sm text-[var(--secondary-500)] dark:text-[var(--text-muted)]">
                  Enter your email and we'll send you a reset link.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[var(--secondary-700)] dark:text-[var(--text-muted)] mb-1.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--secondary-400)]" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full pl-10 pr-4 py-2.5 border border-[var(--secondary-200)] dark:border-[var(--border-color)] rounded-lg bg-white dark:bg-[var(--input-background)] text-[var(--secondary-800)] dark:text-[var(--text)] placeholder-[var(--secondary-400)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-400)] dark:focus:ring-[var(--primary)] focus:border-transparent"
                    />
                  </div>
                </div>

                {error && (
                  <div className="p-3 bg-error-50 border border-error-100 text-error-200 rounded-lg text-sm">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-2.5 bg-[var(--primary-400)] dark:bg-[var(--primary)] text-white rounded-lg font-semibold hover:bg-[var(--primary-500)] dark:hover:bg-[var(--primary-hover)] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    'Send Reset Link'
                  )}
                </button>

                <Link
                  to="/auth/student/login"
                  className="flex items-center justify-center gap-2 text-sm font-medium text-[var(--secondary-500)] dark:text-[var(--text-muted)] hover:text-[var(--primary-500)] dark:hover:text-[var(--primary)] transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to login
                </Link>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
