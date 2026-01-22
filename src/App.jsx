import './styles/globals.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

// Context & Providers
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './components/common/Toast';
import { ErrorBoundary, PrivateRoute } from './components/common';

// Layouts
import MainLayout from './components/layout/MainLayout';

// Public Pages
import LogoPage from './pages/LogoPage';
import OnboardingPage from './pages/OnboardingPage';

// Auth Pages
import StudentLogin from './pages/auth/student/Login';
import StudentRegister from './pages/auth/student/Register';
import Personalization from './pages/personalization/personalization';

// Protected Pages
import HomeLayout from './pages/home/HomeLayout';
import CoursePage from './pages/courses';
import WalletPage from './pages/wallet';
import StorraLeaderboard from './pages/leaderboard/StorraLeaderboard';
import SpinPage from './pages/spin_the_wheel/Spin';
import RewardsPage from './pages/Rewards';
import SettingsPage from './pages/setting/Setting';
import Notifications from './pages/notifications/Notifications';
import Profile from './pages/profile/Profile';

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <ToastProvider>
          <BrowserRouter>
            <Routes>
              {/* PUBLIC ROUTES */}
              <Route path="/" element={<LogoPage />} />
              <Route path="/onboarding" element={<OnboardingPage />} />
                <Route path="/hom" element={<HomeLayout />} />
              {/* AUTH ROUTES */}
              <Route path="/auth/student/login" element={<StudentLogin />} />
              <Route path="/auth/student/register" element={<StudentRegister />} />

              {/* PERSONALIZATION (requires auth but no sidebar) */}
              <Route
                path="/personalization"
                element={
                  <PrivateRoute>
                    <Personalization />
                  </PrivateRoute>
                }
              />

              {/* PROTECTED ROUTES WITH MAIN LAYOUT */}
              <Route
                element={
                  <PrivateRoute>
                    <MainLayout />
                  </PrivateRoute>
                }
              >
                {/* Home */}
                <Route path="/home" element={<HomeLayout />} />

                {/* Courses */}
                <Route path="/courses" element={<CoursePage />} />

                {/* Wallet */}
                <Route path="/wallet" element={<WalletPage />} />

                {/* Leaderboard */}
                <Route path="/leaderboard" element={<StorraLeaderboard />} />

                {/* Spin the Wheel */}
                <Route path="/spin" element={<SpinPage />} />

                {/* Rewards */}
                <Route path="/rewards" element={<RewardsPage />} />

                {/* Settings */}
                <Route path="/settings" element={<SettingsPage />} />

                {/* Notifications */}
                <Route path="/notifications" element={<Notifications />} />

                {/* Profile */}
                <Route path="/profile" element={<Profile />} />
              </Route>

              {/* Redirect unknown routes */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
        </ToastProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
