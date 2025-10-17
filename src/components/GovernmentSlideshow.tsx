
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const GovernmentSlideshow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: "/scheme-mapping.png",
      alt: "Scheme Mapping - Track government scheme participation and benefit distribution with real-time monitoring"
    },
    {
      image: "/student-lifecycle.png",
      alt: "Student Life Cycle Tracker - Complete journey from enrollment to alumni with academic performance, projects, and placements tracking"
    },
    {
      image: "/teacher-performance.png",
      alt: "Teacher Performance Dashboard - APAR ID-based tracking of teaching outcomes, research contributions, and training achievements"
    },
    {
      image: "/unified-data.png",
      alt: "Unified Data Repository - Aadhaar/APAR/AISHE linked database ensuring data integrity across students, teachers, and institutions"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative w-full mb-8">
      {/* Main Banner Container - NSP Portal Style */}
      <div className="relative w-full overflow-hidden rounded-lg shadow-2xl bg-white">
        {/* Slides */}
        <div className="relative w-full">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`transition-opacity duration-700 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0 absolute inset-0'
              }`}
            >
              <img
                src={slide.image}
                alt={slide.alt}
                className="w-full h-auto"
              />
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all hover:scale-110"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6 text-gray-800" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all hover:scale-110"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6 text-gray-800" />
        </button>

        {/* Dot Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all ${
                index === currentSlide
                  ? 'w-8 h-3 bg-white'
                  : 'w-3 h-3 bg-white/60 hover:bg-white/80'
              } rounded-full`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
