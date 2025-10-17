
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const GovernmentSlideshow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: "/attached_assets/image_1760807436888.png",
      alt: "Scheme Mapping - Track government scheme participation and benefit distribution with real-time monitoring"
    },
    {
      image: "/student-lifecycle.png",
      alt: "Student Life Cycle Tracker - Complete journey from enrollment to alumni with academic performance, projects, and placements tracking"
    },
    {
      image: "/teacher-performance-clean.png",
      alt: "Teacher Performance Dashboard - APAR ID-based tracking of teaching outcomes, research contributions, and training achievements"
    },
    {
      image: "/unified-data-clean.png",
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
    <div className="relative w-full mb-6">
      {/* Main Banner Container - India.gov.in Style */}
      <div className="relative w-full overflow-hidden rounded-xl shadow-2xl bg-gradient-to-br from-blue-50 to-slate-100 border-2 border-blue-100">
        {/* Slides Container with fixed aspect ratio */}
        <div className="relative w-full" style={{ paddingBottom: '28%' }}>
          <div className="absolute inset-0">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-700 ${
                  index === currentSlide ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <img
                  src={slide.image}
                  alt={slide.alt}
                  className="w-full h-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons - Centered Vertically */}
        <button
          onClick={prevSlide}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-orange-500/80 hover:bg-orange-600 text-white p-1.5 md:p-2 rounded-full shadow-lg transition-all hover:scale-110"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-orange-500/80 hover:bg-orange-600 text-white p-1.5 md:p-2 rounded-full shadow-lg transition-all hover:scale-110"
          aria-label="Next slide"
        >
          <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
        </button>

        </div>
      
      {/* Dot Indicators - Outside slideshow container */}
      <div className="flex justify-center mt-4 gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all ${
              index === currentSlide
                ? 'w-8 md:w-10 h-3 bg-orange-500'
                : 'w-3 h-3 bg-gray-300 hover:bg-gray-400'
            } rounded-full`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
