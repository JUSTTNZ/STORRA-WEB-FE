import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import swipe from '../assets/images/auth/swipe.png';
import swipe1 from '../assets/images/auth/swipe1.png';
import swipe2 from '../assets/images/auth/swipe2.png';

const OnboardingPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const slides = [
    {
      image: swipe,
      title: "Stay involved in your child's learning journey.",
      subtitle:
        "Set goals, track progress, and celebrate wins together, all in one place.",
    },
    {
      image: swipe1,
      title: "Make teaching rewarding and engaging.",
      subtitle:
        "Assign fun quizzes, monitor growth, and help students learn the fun way.",
    },
    {
      image: swipe2,
      title: "Everything starts here.",
      subtitle:
        "Create an account and begin your learning experience today.",
    },
  ];

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === slides.length - 1 ? prev : prev + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="h-screen min-h-screen bg-blue-700 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">

      {/* Skip */}
      <button
        onClick={() => navigate('/auth/student/login')}
        className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white text-sm sm:text-lg font-medium opacity-90 hover:opacity-100 z-10"
      >
        Skip
      </button>

      {/* Slide container */}
      <div className="w-full max-w-xs sm:max-w-md lg:max-w-lg text-center relative">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`transition-all duration-700 ease-in-out ${
              index === currentSlide
                ? 'opacity-100 translate-x-0 relative'
                : index < currentSlide
                ? 'opacity-0 -translate-x-full absolute inset-0 pointer-events-none'
                : 'opacity-0 translate-x-full absolute inset-0 pointer-events-none'
            }`}
          >
            {/* Image */}
            <div className={`transition-all duration-700 delay-100 ${
              index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}>
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-48 sm:h-64 lg:h-68 object-contain "
              />
            </div>

            {/* Title */}
            <h2 className={`text-white text-xl sm:text-2xl lg:text-2xl font-semibold leading-snug mb-2 sm:mb-4 px-2 transition-all duration-700 delay-200 ${
              index === currentSlide ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              {slide.title}
            </h2>

            {/* Subtitle */}
            <p className={`text-blue-100 text-sm sm:text-base lg:text-lg leading-relaxed mb-6 sm:mb-8 px-2 transition-all duration-700 delay-300 ${
              index === currentSlide ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              {slide.subtitle}
            </p>

            {/* Dots */}
            <div className="flex justify-center mb-6 sm:mb-8">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className={`w-2.5 h-2.5 sm:w-3 sm:h-3 mx-1 sm:mx-1.5 rounded-full transition-all duration-300 ${
                    i === currentSlide
                      ? 'bg-white scale-125'
                      : 'bg-white/40'
                  }`}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OnboardingPage;
