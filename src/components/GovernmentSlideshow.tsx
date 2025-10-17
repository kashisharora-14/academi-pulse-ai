
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const GovernmentSlideshow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: "/scheme-mapping-clean.png",
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
    <div className="relative w-full mb-8 md:mb-10 lg:mb-12">
      {/* Main Banner Container - India.gov.in Style */}
      <div className="relative w-full overflow-hidden rounded-xl shadow-2xl bg-gradient-to-br from-blue-50 to-slate-100 border-2 border-blue-100">
        {/* Slides Container with fixed aspect ratio */}
        <div className="relative w-full" style={{ paddingBottom: '40%' }}>
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
                  className="w-full h-full object-contain p-4 md:p-6"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 bg-orange-500 hover:bg-orange-600 text-white p-2 md:p-3 rounded-full shadow-xl transition-all hover:scale-110"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 bg-orange-500 hover:bg-orange-600 text-white p-2 md:p-3 rounded-full shadow-xl transition-all hover:scale-110"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
        </button>

        {/* Dot Indicators */}
        <div className="absolute bottom-3 md:bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2 bg-black/30 px-3 py-2 rounded-full backdrop-blur-sm">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all ${
                index === currentSlide
                  ? 'w-6 md:w-8 h-2.5 md:h-3 bg-orange-500'
                  : 'w-2.5 md:w-3 h-2.5 md:h-3 bg-white/60 hover:bg-white/80'
              } rounded-full`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
