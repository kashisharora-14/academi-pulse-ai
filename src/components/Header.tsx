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
          <div className="flex items-center space-x-3 md:space-x-4 flex-1 min-w-0">
            {/* 75th Independence Day Logo - Simplified */}
            <div className="flex-shrink-0">
              <div className="relative">
                <div className="w-14 h-14 md:w-16 md:h-16 border-2 border-orange-500 rounded-lg p-1 bg-white">
                  <div className="w-full h-full flex flex-col items-center justify-center text-center">
                    <span className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-orange-500 to-green-600 bg-clip-text text-transparent">75</span>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-2 bg-orange-500 rounded-sm"></div>
                      <div className="w-3 h-2 bg-white border border-gray-300 rounded-sm"></div>
                      <div className="w-3 h-2 bg-green-600 rounded-sm"></div>
                    </div>
                  </div>
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

          <div className="flex items-center space-x-2 md:space-x-3">
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

      {/* Government Initiative Banner - Below Main Header */}
      <div className="bg-gradient-to-r from-orange-50 via-white to-green-50 border-t border-gray-200">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-center gap-4">
            {/* 75 Years Independence Celebration */}
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <Badge className="bg-blue-800 text-white px-4 py-2 text-sm font-semibold rounded-full flex items-center gap-2 shadow-md">
                <Shield className="w-4 h-4" />
                <span className="hidden sm:inline">Government of India Initiative | </span>भारत सरकार की पहल
              </Badge>
              
              <div className="bg-gradient-to-r from-orange-100 via-white to-green-100 border-2 border-blue-200 rounded-full px-4 py-2 shadow-md">
                <div className="flex items-center gap-2 text-xs md:text-sm font-semibold text-blue-800">
                  <span className="text-lg">🇮🇳</span>
                  <span>आज़ादी का अमृत महोत्सव | Celebrating 75 Years of Independence</span>
                </div>
              </div>
              
              <Button variant="outline" size="sm" className="hidden lg:flex text-xs border-blue-600 text-blue-800 hover:bg-blue-50">
                <Globe className="w-3 h-3 mr-1" />
                Digital India
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};