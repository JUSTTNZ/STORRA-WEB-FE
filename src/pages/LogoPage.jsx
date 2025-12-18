import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/images/auth/logo.png';

const LogoPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/onboarding');
        }, 3000);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="min-h-screen bg-white flex items-center justify-center">
            <div className="text-center">
                <img
                    src={logo}
                    alt="STORRA Logo"
                    className="w-48 h-48 object-contain mx-auto"
                />
            </div>
        </div>
    );
};

export default LogoPage;
