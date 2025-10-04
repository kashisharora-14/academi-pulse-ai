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
    </header>
  );
};