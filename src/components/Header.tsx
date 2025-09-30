
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { 
  Menu,
  Phone,
  Mail,
  Globe
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
            
            <div className="min-w-0 flex-1">
              <h1 className="text-sm md:text-lg lg:text-xl font-bold text-slate-800 truncate">
                National Education Data Platform
              </h1>
              <p className="text-xs md:text-sm text-slate-600 truncate">
                Ministry of Education<span className="hidden sm:inline"> | भारत सरकार</span>
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 md:space-x-4 flex-shrink-0">
            <Badge variant="outline" className="border-green-600 text-green-700 hidden lg:flex">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              System Status: Online
            </Badge>
            
            <nav className="hidden lg:flex items-center space-x-6">
              <a href="#" className="text-slate-700 hover:text-blue-800 font-medium">Home</a>
              <a href="#" className="text-slate-700 hover:text-blue-800 font-medium">About</a>
              <a href="#" className="text-slate-700 hover:text-blue-800 font-medium">Services</a>
              <a href="#" className="text-slate-700 hover:text-blue-800 font-medium">Help</a>
            </nav>

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
