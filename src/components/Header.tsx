
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
      <div className="bg-blue-800 text-white py-2">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-6">
              <span className="flex items-center">
                <Phone className="w-3 h-3 mr-1" />
                Helpline: 1800-11-2020
              </span>
              <span className="flex items-center">
                <Mail className="w-3 h-3 mr-1" />
                support@education.gov.in
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="flex items-center">
                <Globe className="w-3 h-3 mr-1" />
                भारत सरकार | Government of India
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Government Emblem - Ashoka Chakra */}
            <div className="w-12 h-12 bg-blue-800 rounded-full flex items-center justify-center relative">
              <div className="w-8 h-8 relative">
                {/* Ashoka Chakra - 24 spokes wheel */}
                <div className="w-8 h-8 border-2 border-white rounded-full relative flex items-center justify-center">
                  <div className="absolute w-1 h-1 bg-white rounded-full"></div>
                  {/* Spokes */}
                  {Array.from({length: 24}).map((_, i) => (
                    <div 
                      key={i}
                      className="absolute w-0.5 h-3 bg-white origin-bottom"
                      style={{
                        transform: `rotate(${i * 15}deg) translateY(-6px)`,
                        transformOrigin: 'center 12px'
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
            
            <div>
              <h1 className="text-xl font-bold text-slate-800">
                National Education Data Platform
              </h1>
              <p className="text-sm text-slate-600">
                Ministry of Education | भारत सरकार
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Badge variant="outline" className="border-green-600 text-green-700">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              System Status: Online
            </Badge>
            
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#" className="text-slate-700 hover:text-blue-800 font-medium">Home</a>
              <a href="#" className="text-slate-700 hover:text-blue-800 font-medium">About</a>
              <a href="#" className="text-slate-700 hover:text-blue-800 font-medium">Services</a>
              <a href="#" className="text-slate-700 hover:text-blue-800 font-medium">Help</a>
            </nav>

            <Button 
              onClick={() => navigate("/auth")}
              className="bg-blue-800 hover:bg-blue-900 text-white font-medium px-6"
            >
              Login / Register
            </Button>
            
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
