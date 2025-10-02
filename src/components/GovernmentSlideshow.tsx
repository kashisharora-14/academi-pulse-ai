import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Star, Users, BookOpen, Trophy, CheckCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";


const slides = [
  {
    id: 1,
    title: "स्वच्छोत्सव - स्वच्छता ही सेवा 2025",
    subtitle: "Swachh Hotsav - Swachhata Hi Seva 2025",
    imageUrl: "/swachh-hotsav.png",
    bgGradient: "from-teal-50 via-white to-green-50"
  },
  {
    id: 2,
    title: "विकसित भारत बिल्डथॉन 2025",
    subtitle: "Viksit Bharat Buildathon 2025",
    imageUrl: "/viksit-bharat.png",
    bgGradient: "from-orange-50 via-white to-blue-50"
  },
  {
    id: 3,
    title: "स्वच्छ एवं हरित विद्यालय रेटिंग 2025-26",
    subtitle: "Swachh Evam Harit Vidyalaya Rating (SHVR) 2025-26",
    imageUrl: "/swachh-evam-harit.png",
    bgGradient: "from-blue-50 via-white to-gray-50"
  },
  {
    id: 4,
    title: "विकसित भारत @2047 विजन",
    subtitle: "Viksit Bharat @2047 - Ideas for the Vision",
    imageUrl: "/viksit-bharat-2047.png",
    bgGradient: "from-blue-100 via-white to-blue-50"
  },
  {
    id: 5,
    title: "राष्ट्रीय छात्रवृत्ति पोर्टल (NSP) 2024-25",
    subtitle: "National Scholarship Portal - Applications Open",
    content: "प्री-मैट्रिक और पोस्ट-मैट्रिक छात्रवृत्ति के लिए आवेदन आमंत्रित। SC/ST/OBC/अल्पसंख्यक छात्रों के लिए ₹75,000 तक की सहायता।",
    englishContent: "Applications invited for Pre-Matric and Post-Matric Scholarships. Financial assistance up to ₹75,000 for SC/ST/OBC/Minority students.",
    image: "🎓",
    bgGradient: "from-orange-50 via-white to-green-50",
    badge: "Scholarship Alert"
  },
  {
    id: 6,
    title: "प्रधानमंत्री श्री नरेंद्र मोदी का संदेश",
    subtitle: "Prime Minister Shri Narendra Modi's Message",
    content: "शिक्षा ही वह शक्ति है जो राष्ट्र को आगे बढ़ाती है। डिजिटल इंडिया के तहत हमारा लक्ष्य है कि हर छात्र को गुणवत्तापूर्ण शिक्षा मिले।",
    englishContent: "Education is the power that drives the nation forward. Under Digital India, our goal is quality education for every student.",
    image: "🇮🇳",
    bgGradient: "from-blue-50 via-white to-purple-50",
    badge: "PM's Vision"
  },
  {
    id: 7,
    title: "INSPIRE छात्रवृत्ति - अंतिम तिथि 15 मई",
    subtitle: "INSPIRE Scholarship - Last Date May 15",
    content: "विज्ञान और प्रौद्योगिकी में उत्कृष्टता के लिए ₹80,000 प्रति वर्ष। कक्षा 12 में शीर्ष 1% छात्र पात्र हैं।",
    englishContent: "₹80,000 per year for excellence in Science & Technology. Top 1% students in Class 12 are eligible.",
    image: "🔬",
    bgGradient: "from-green-50 via-white to-blue-50",
    badge: "Scholarship News"
  },
  {
    id: 8,
    title: "75वां स्वतंत्रता दिवस - आज़ादी का अमृत महोत्सव",
    subtitle: "75th Independence Day - Azadi Ka Amrit Mahotsav",
    content: "शिक्षा के क्षेत्र में भारत की उपलब्धियों का जश्न। 50,000+ संस्थान, 4.5 करोड़ छात्र - एक डिजिटल प्लेटफॉर्म पर।",
    englishContent: "Celebrating India's educational achievements. 50,000+ institutions, 4.5 Crore students - One Digital Platform.",
    image: "🎉",
    bgGradient: "from-orange-100 via-white to-green-100",
    badge: "75 Years Special"
  },
  {
    id: 9,
    title: "NEP 2020 - शिक्षा नीति में बदलाव",
    subtitle: "NEP 2020 - Transforming Education Policy",
    content: "5+3+3+4 पाठ्यक्रम संरचना लागू। कौशल विकास, व्यावसायिक शिक्षा और समग्र विकास पर जोर।",
    englishContent: "Implementing 5+3+3+4 curriculum structure. Focus on skill development, vocational education and holistic growth.",
    image: "📚",
    bgGradient: "from-purple-50 via-white to-blue-50",
    badge: "Policy Update"
  },
  {
    id: 10,
    title: "डिजिटल डिग्री - ब्लॉकचेन सत्यापन",
    subtitle: "Digital Degrees - Blockchain Verification",
    content: "अब डिजिटल प्रमाणपत्र DigiLocker में उपलब्ध। तत्काल सत्यापन, जीवन भर वैध - कागज रहित भारत की ओर।",
    englishContent: "Digital certificates now available on DigiLocker. Instant verification, lifetime validity - Towards paperless India.",
    image: "💻",
    bgGradient: "from-blue-50 via-white to-cyan-50",
    badge: "Digital India"
  }
];

export const GovernmentSlideshow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

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
      {/* Simple Slideshow Container */}
      <div className="relative overflow-hidden rounded-lg shadow-lg">
        {/* Government Header Stripe */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-orange-500 via-white to-green-500 z-10"></div>

        {/* Navigation Arrows */}
        <Button
          variant="ghost"
          size="icon"
          onClick={handlePrevious}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white shadow-lg rounded-full h-10 w-10"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={handleNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white shadow-lg rounded-full h-10 w-10"
        >
          <ChevronRight className="h-6 w-6" />
        </Button>

        {/* Slide Content */}
        <div className={`relative bg-gradient-to-br ${current.bgGradient} p-8 md:p-12 min-h-[400px] flex items-center transition-all duration-500`}>
          {/* Main Content */}
          <div className="w-full mx-auto flex flex-col md:flex-row items-center gap-6 md:gap-8">
            {/* Image Section */}
            {current.imageUrl && (
              <div className="w-full md:w-1/2 flex justify-center">
                <img
                  src={current.imageUrl}
                  alt={current.title}
                  className="max-w-full h-auto max-h-[300px] object-contain rounded-lg shadow-xl"
                />
              </div>
            )}

            {/* Text Content */}
            <div className={`space-y-4 ${current.imageUrl ? 'md:w-1/2' : 'max-w-4xl mx-auto text-center'}`}>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-800 leading-tight">
                {current.title}
              </h2>
              <h3 className="text-lg md:text-xl text-blue-700 font-semibold">
                {current.subtitle}
              </h3>

              {current.content && (
                <div className="space-y-3">
                  <p className="text-base md:text-lg text-slate-700 leading-relaxed font-medium">
                    {current.content}
                  </p>
                  {current.englishContent && (
                    <p className="text-sm md:text-base text-slate-600 leading-relaxed italic">
                      {current.englishContent}
                    </p>
                  )}
                </div>
              )}

              {current.image && !current.imageUrl && (
                <div className="text-6xl md:text-7xl lg:text-8xl animate-bounce">{current.image}</div>
              )}
            </div>
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'w-8 bg-blue-600'
                  : 'w-2 bg-gray-400 hover:bg-gray-600'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};