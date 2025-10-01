import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { 
  Menu,
  Phone,
  Mail,
  Globe,
  Shield 
} from "lucide-react";

export const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="bg-white border-b-4 border-blue-800 shadow-sm">
      {/* Top Government Bar */}
      <div className="bg-blue-800 text-white py-1.5 md:py-2">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center text-xs md:text-sm">
            <div className="flex items-center space-x-3 md:space-x-6">
              <span className="flex items-center">
                <Phone className="w-3 h-3 mr-1" />
                <span className="hidden sm:inline">Helpline: </span>1800-11-2020
              </span>
              <span className="hidden md:flex items-center">
                <Mail className="w-3 h-3 mr-1" />
                support@education.gov.in
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="flex items-center text-xs md:text-sm">
                <Globe className="w-3 h-3 mr-1" />
                <span className="hidden sm:inline">भारत सरकार | </span>Government of India
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-3 md:py-4">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center space-x-2 md:space-x-4 flex-1 min-w-0">
            {/* Government Emblem - Ashoka Chakra */}
            <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-800 rounded-full flex items-center justify-center relative flex-shrink-0">
              <div className="w-6 h-6 md:w-8 md:h-8 relative">
                {/* Ashoka Chakra - 24 spokes wheel */}
                <div className="w-6 h-6 md:w-8 md:h-8 border-2 border-white rounded-full relative flex items-center justify-center">
                  <div className="absolute w-1 h-1 bg-white rounded-full"></div>
                  {/* Spokes */}
                  {Array.from({length: 24}).map((_, i) => (
                    <div 
                      key={i}
                      className="absolute w-0.5 h-2 md:h-3 bg-white origin-bottom"
                      style={{
                        transform: `rotate(${i * 15}deg) translateY(-${i % 2 === 0 ? '5' : '4'}px)`,
                        transformOrigin: 'center 10px'
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* 75th Independence Day Logo */}
            <div className="flex-shrink-0 mx-2 md:mx-4">
              <div className="relative">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-orange-500 via-white to-green-500 rounded-full flex items-center justify-center border-2 border-gold">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-800 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-xs md:text-sm">75</span>
                  </div>
                </div>
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 bg-orange-600 text-white px-1 rounded text-xs font-bold">
                  स्वतंत्रता
                </div>
              </div>
            </div>

            <div className="min-w-0 flex-1">
              <h1 className="text-sm md:text-lg lg:text-xl font-bold text-slate-800 truncate">
                National Education Data Platform
              </h1>
              <p className="text-xs md:text-sm text-slate-600 hidden sm:block">
                Ministry of Education | भारत सरकार | Government of India
              </p>
              <div className="flex items-center gap-2 mt-1">
                <Badge className="bg-gradient-to-r from-orange-500 to-green-500 text-white text-xs px-2 py-0.5">
                  🇮🇳 Digital India
                </Badge>
                <Badge className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5">
                  🏛️ Gov Certified
                </Badge>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2 md:space-x-4">
            {/* National Emblem Badge */}
            <Badge className="bg-blue-800 text-white px-2 md:px-3 py-1 text-xs hidden md:flex items-center">
              <Shield className="w-3 h-3 mr-1" />
              सत्यमेव जयते
            </Badge>

            {/* 75th Independence Special Badge */}
            <Badge className="bg-gradient-to-r from-saffron via-white to-green-600 text-blue-800 px-2 md:px-3 py-1 text-xs font-bold border border-blue-800 hidden sm:flex">
              आज़ादी का अमृत महोत्सव
            </Badge>

            {/* Quick Access Menu */}
            <Button variant="outline" size="sm" className="hidden lg:flex">
              <Menu className="w-4 h-4 mr-1" />
              Quick Access
            </Button>

            {/* Mobile Menu */}
            <Button variant="outline" size="sm" className="lg:hidden">
              <Menu className="w-4 h-4" />
            </Button>

            <Button 
              onClick={() => navigate("/auth")}
              className="bg-blue-800 hover:bg-blue-900 text-white font-medium px-3 md:px-4 lg:px-6 text-xs md:text-sm"
            >
              <span className="hidden sm:inline">Login / Register</span>
              <span className="sm:hidden">Login</span>
            </Button>

            <Button variant="outline" size="icon" className="lg:hidden">
              <Menu className="w-4 h-4 md:w-5 md:h-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};