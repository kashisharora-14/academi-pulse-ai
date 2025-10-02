import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";

const slides = [
  {
    id: 1,
    title: "स्वच्छोत्सव - स्वच्छता ही सेवा 2025",
    subtitle: "Swachh Hotsav - Swachhata Hi Seva 2025",
    imageUrl: "/swachh-hotsav.png"
  },
  {
    id: 2,
    title: "विकसित भारत बिल्डथॉन 2025",
    subtitle: "Viksit Bharat Buildathon 2025",
    imageUrl: "/viksit-bharat.png"
  },
  {
    id: 3,
    title: "स्वच्छ एवं हरित विद्यालय रेटिंग 2025-26",
    subtitle: "Swachh Evam Harit Vidyalaya Rating (SHVR) 2025-26",
    imageUrl: "/swachh-evam-harit.png"
  },
  {
    id: 4,
    title: "विकसित भारत @2047 विजन",
    subtitle: "Viksit Bharat @2047 - Ideas for the Vision",
    imageUrl: "/viksit-bharat-2047.png"
  }
];

export const GovernmentSlideshow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Auto-advance every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handlePrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const current = slides[currentSlide];

  return (
    <div className="w-full mb-8">
      <div className="relative overflow-hidden rounded-lg shadow-xl">
        {/* Government Header Stripe */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-orange-500 via-white to-green-500 z-10"></div>

        {/* Navigation Arrows */}
        <Button
          variant="ghost"
          size="icon"
          onClick={handlePrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white shadow-lg rounded-full h-12 w-12"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white shadow-lg rounded-full h-12 w-12"
        >
          <ChevronRight className="h-6 w-6" />
        </Button>

        {/* Full Size Image */}
        <div className="relative w-full bg-white">
          <img
            src={current.imageUrl}
            alt={current.title}
            className="w-full h-auto object-contain"
            style={{ maxHeight: '500px' }}
          />
        </div>

        {/* Pagination Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'w-8 bg-blue-600'
                  : 'w-3 bg-white/70 hover:bg-white'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};