
import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Star, Users, BookOpen, Trophy } from 'lucide-react';

const slides = [
  {
    id: 1,
    title: "प्रधानमंत्री श्री नरेंद्र मोदी का संदेश",
    subtitle: "Prime Minister Shri Narendra Modi's Message",
    content: "शिक्षा ही वह शक्ति है जो राष्ट्र को आगे बढ़ाती है। डिजिटल इंडिया के तहत हमारा लक्ष्य है कि हर छात्र को गुणवत्तापूर्ण शिक्षा मिले।",
    englishContent: "Education is the power that drives the nation forward. Under Digital India, our goal is quality education for every student.",
    image: "🇮🇳",
    bgGradient: "from-orange-50 via-white to-green-50",
    badge: "Prime Minister's Vision"
  },
  {
    id: 2,
    title: "शिक्षा मंत्रालय की पहल",
    subtitle: "Ministry of Education Initiative",
    content: "NEP 2020 के तहत शिक्षा व्यवस्था में क्रांतिकारी बदलाव। डिजिटल प्लेटफॉर्म के माध्यम से सभी शिक्षण संस्थानों का एकीकरण।",
    englishContent: "Revolutionary changes in education system under NEP 2020. Integration of all educational institutions through digital platforms.",
    image: "📚",
    bgGradient: "from-blue-50 via-white to-purple-50",
    badge: "Ministry Update"
  },
  {
    id: 3,
    title: "आत्मनिर्भर भारत में शिक्षा",
    subtitle: "Education in Self-Reliant India",
    content: "स्किल इंडिया और डिजिटल इंडिया के माध्यम से युवाओं को रोजगार के लिए तैयार करना। 21वीं सदी की चुनौतियों के लिए तैयार भारत।",
    englishContent: "Preparing youth for employment through Skill India and Digital India. India ready for 21st century challenges.",
    image: "🚀",
    bgGradient: "from-green-50 via-white to-blue-50",
    badge: "Skill Development"
  },
  {
    id: 4,
    title: "75वां स्वतंत्रता दिवस विशेष",
    subtitle: "75th Independence Day Special",
    content: "आज़ादी का अमृत महोत्सव - शिक्षा के क्षेत्र में भारत की उपलब्धियों का जश्न। गुणवत्तापूर्ण शिक्षा के साथ विकसित भारत की ओर।",
    englishContent: "Azadi Ka Amrit Mahotsav - Celebrating India's achievements in education. Towards developed India with quality education.",
    image: "🎉",
    bgGradient: "from-orange-100 via-white to-green-100",
    badge: "75 Years Celebration"
  },
  {
    id: 5,
    title: "डिजिटल इंडिया मिशन",
    subtitle: "Digital India Mission",
    content: "तकनीक के माध्यम से शिक्षा में पारदर्शिता और जवाबदेही। ऑनलाइन प्लेटफॉर्म से छात्रवृत्ति और योजनाओं तक आसान पहुंच।",
    englishContent: "Transparency and accountability in education through technology. Easy access to scholarships and schemes via online platforms.",
    image: "💻",
    bgGradient: "from-purple-50 via-white to-blue-50",
    badge: "Digital Innovation"
  }
];

export const GovernmentSlideshow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  useEffect(() => {
    if (!isAutoPlay) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000); // Change slide every 6 seconds

    return () => clearInterval(interval);
  }, [isAutoPlay]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlay(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlay(false);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlay(false);
  };

  const current = slides[currentSlide];

  return (
    <div className="relative w-full max-w-6xl mx-auto mb-8">
      {/* Government Header Bar */}
      <div className="h-2 bg-gradient-to-r from-orange-500 via-white to-green-500 rounded-t-lg"></div>
      
      <Card className={`relative overflow-hidden bg-gradient-to-br ${current.bgGradient} border-2 border-slate-200 shadow-lg min-h-[300px]`}>
        {/* Government Seal Background */}
        <div className="absolute top-4 right-4 w-24 h-24 opacity-10">
          <div className="w-full h-full bg-blue-800 rounded-full flex items-center justify-center">
            <div className="w-16 h-16 border-2 border-white rounded-full relative flex items-center justify-center">
              <div className="absolute w-2 h-2 bg-white rounded-full"></div>
              {/* Ashoka Chakra spokes */}
              {Array.from({length: 24}).map((_, i) => (
                <div 
                  key={i}
                  className="absolute w-0.5 h-6 bg-white origin-bottom"
                  style={{
                    transform: `rotate(${i * 15}deg) translateY(-12px)`,
                    transformOrigin: 'center 24px'
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="relative p-6 md:p-8 lg:p-10">
          {/* Badge */}
          <div className="flex justify-between items-start mb-4">
            <Badge className="bg-blue-800 text-white px-4 py-2 text-sm font-semibold">
              {current.badge}
            </Badge>
            <div className="text-4xl">{current.image}</div>
          </div>

          {/* Content */}
          <div className="space-y-4 max-w-4xl">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-800 leading-tight">
              {current.title}
            </h2>
            <h3 className="text-lg md:text-xl text-blue-700 font-semibold">
              {current.subtitle}
            </h3>
            
            <div className="space-y-3">
              <p className="text-base md:text-lg text-slate-700 leading-relaxed font-medium">
                {current.content}
              </p>
              <p className="text-sm md:text-base text-slate-600 leading-relaxed italic">
                {current.englishContent}
              </p>
            </div>

            {/* Ministry Information */}
            <div className="flex flex-wrap gap-2 pt-4">
              <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                🏛️ Ministry of Education
              </Badge>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                🇮🇳 Government of India
              </Badge>
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                💻 Digital India
              </Badge>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5 text-slate-700" />
        </button>
        
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5 text-slate-700" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide
                  ? 'bg-blue-600 scale-125'
                  : 'bg-white/60 hover:bg-white/80'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Auto-play indicator */}
        {isAutoPlay && (
          <div className="absolute top-4 left-4">
            <Badge variant="outline" className="bg-white/80 text-slate-600 text-xs">
              Auto-playing
            </Badge>
          </div>
        )}
      </Card>

      {/* Government Footer Bar */}
      <div className="h-2 bg-gradient-to-r from-green-500 via-white to-orange-500 rounded-b-lg"></div>
      
      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
        <Card className="p-3 text-center bg-gradient-to-br from-orange-50 to-white border border-orange-200">
          <div className="text-xl font-bold text-orange-600">75+</div>
          <div className="text-xs text-orange-700">Years Independence</div>
        </Card>
        <Card className="p-3 text-center bg-gradient-to-br from-green-50 to-white border border-green-200">
          <div className="text-xl font-bold text-green-600">130+</div>
          <div className="text-xs text-green-700">Crore Citizens</div>
        </Card>
        <Card className="p-3 text-center bg-gradient-to-br from-blue-50 to-white border border-blue-200">
          <div className="text-xl font-bold text-blue-600">50,000+</div>
          <div className="text-xs text-blue-700">Educational Institutions</div>
        </Card>
        <Card className="p-3 text-center bg-gradient-to-br from-purple-50 to-white border border-purple-200">
          <div className="text-xl font-bold text-purple-600">4.5 Cr+</div>
          <div className="text-xs text-purple-700">Students Enrolled</div>
        </Card>
      </div>
    </div>
  );
};
