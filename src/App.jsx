import "./styles/globals.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

// Onboarding Components
import LogoPage from "./pages/LogoPage";
import OnboardingPage from "./pages/OnboardingPage";

// Auth Components
import StudentLogin from "./pages/auth/student/Login";
import StudentRegister from "./pages/auth/student/Register";
import Personalization from "./pages/personalization/personalization";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* ONBOARDING SECTION */}
                <Route path="/" element={<LogoPage />} />
                <Route path="/onboarding" element={<OnboardingPage />} />

                {/* AUTH SECTION */}
                <Route path="/auth/student/login" element={<StudentLogin />} />
                <Route path="/auth/student/register" element={<StudentRegister />} />

                {/* Redirect unknown routes to home */}
                <Route path="*" element={<Navigate to="/" replace />} />

                <Route path="personalization" element={<Personalization />}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
