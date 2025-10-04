
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const GovernmentSlideshow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      quote: "Education is the most powerful weapon which you can use to change the world.",
      author: "Nelson Mandela"
    },
    {
      quote: "The function of education is to teach one to think intensively and to think critically.",
      author: "Martin Luther King Jr."
    },
    {
      quote: "Education is not preparation for life; education is life itself.",
      author: "John Dewey"
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

  return (
    <div className="relative bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 mb-8 border border-blue-200">
      <div className="flex items-center justify-between">
        <button
          onClick={prevSlide}
          className="p-2 rounded-full bg-white shadow-md hover:bg-blue-50 transition-colors"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5 text-blue-600" />
        </button>

        <div className="flex-1 text-center px-8">
          <blockquote className="text-lg md:text-xl font-medium text-slate-700 italic">
            "{slides[currentSlide].quote}"
          </blockquote>
          <p className="mt-2 text-sm md:text-base text-slate-600">
            — {slides[currentSlide].author}
          </p>
        </div>

        <button
          onClick={nextSlide}
          className="p-2 rounded-full bg-white shadow-md hover:bg-blue-50 transition-colors"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5 text-blue-600" />
        </button>
      </div>

      <div className="flex justify-center mt-4 space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentSlide ? 'bg-blue-600 w-6' : 'bg-blue-300'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
