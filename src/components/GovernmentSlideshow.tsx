
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const GovernmentSlideshow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      quote: "Education is not just about going to school and getting a degree. It's about widening your knowledge and absorbing the truth about life.",
      author: "Shri Narendra Modi, Hon'ble Prime Minister of India"
    },
    {
      quote: "The future belongs to those who believe in the power of their dreams. Education empowers us to turn those dreams into reality.",
      author: "Shri Narendra Modi, Hon'ble Prime Minister of India"
    },
    {
      quote: "Every child is like a seed which has the potential to grow. Let us nourish every child with the power of education and see them bloom into confident citizens.",
      author: "Shri Narendra Modi, Hon'ble Prime Minister of India"
    },
    {
      quote: "We need to prepare our youth not just for degrees but for life. Education should create entrepreneurs, innovators and job creators.",
      author: "Shri Narendra Modi, Hon'ble Prime Minister of India"
    },
    {
      quote: "Digital India is empowering our students with technology. Let us leverage this to transform our education system and build a knowledge economy.",
      author: "Shri Narendra Modi, Hon'ble Prime Minister of India"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative bg-white rounded-lg p-6 mb-8 border-4 border-transparent india-flag-border shadow-lg">
      {/* India Flag Border Effect */}
      <div className="absolute inset-0 rounded-lg overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-orange-500 to-orange-500"></div>
        <div className="absolute top-1 left-0 right-0 h-1 bg-gradient-to-r from-white via-white to-white"></div>
        <div className="absolute top-2 left-0 right-0 h-1 bg-gradient-to-r from-green-600 via-green-600 to-green-600"></div>
        
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-600 via-green-600 to-green-600"></div>
        <div className="absolute bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-white via-white to-white"></div>
        <div className="absolute bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-orange-500 to-orange-500"></div>
        
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-orange-500 via-white to-green-600"></div>
        <div className="absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-b from-orange-500 via-white to-green-600"></div>
      </div>

      <div className="flex items-center justify-between relative z-10">
        <button
          onClick={prevSlide}
          className="p-2 rounded-full bg-gradient-to-br from-orange-100 to-green-100 shadow-md hover:shadow-lg hover:scale-110 transition-all"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5 text-blue-700" />
        </button>

        <div className="flex-1 text-center px-8">
          <div className="mb-3">
            <div className="inline-flex items-center gap-2 px-4 py-1 bg-gradient-to-r from-orange-500 via-white to-green-600 rounded-full">
              <span className="text-2xl">🇮🇳</span>
              <span className="font-bold text-blue-800 text-sm">PM's Message on Education</span>
              <span className="text-2xl">🇮🇳</span>
            </div>
          </div>
          
          <blockquote className="text-base md:text-lg lg:text-xl font-medium text-slate-800 italic leading-relaxed">
            "{slides[currentSlide].quote}"
          </blockquote>
          <p className="mt-3 text-xs md:text-sm font-semibold text-blue-800">
            — {slides[currentSlide].author}
          </p>
        </div>

        <button
          onClick={nextSlide}
          className="p-2 rounded-full bg-gradient-to-br from-orange-100 to-green-100 shadow-md hover:shadow-lg hover:scale-110 transition-all"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5 text-blue-700" />
        </button>
      </div>

      <div className="flex justify-center mt-4 space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentSlide 
                ? 'bg-gradient-to-r from-orange-500 via-white to-green-600 w-8' 
                : 'bg-slate-300 w-2'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
