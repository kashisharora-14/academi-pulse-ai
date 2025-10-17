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
    <header className="bg-white border-b-4 border-gradient-to-r from-orange-500 via-blue-600 to-green-600 shadow-xl">
      {/* Top Tricolor Bar */}
      <div className="h-2 bg-gradient-to-r from-orange-500 via-white to-green-600"></div>
      
      {/* Government Info Bar */}
      <div className="bg-gradient-to-r from-orange-50 via-blue-50 to-green-50 border-b border-slate-200">
        <div className="container mx-auto px-4 py-2">
          <div className="flex justify-between items-center text-xs md:text-sm">
            <div className="flex items-center space-x-3 md:space-x-6">
              <span className="flex items-center text-orange-700 font-semibold">
                <Phone className="w-3 h-3 mr-1" />
                <span className="hidden sm:inline">Helpline: </span>1800-11-2020
              </span>
              <span className="hidden md:flex items-center text-blue-700 font-semibold">
                <Mail className="w-3 h-3 mr-1" />
                demo@education.gov.in
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="flex items-center text-xs md:text-sm font-bold bg-gradient-to-r from-orange-600 via-blue-700 to-green-700 bg-clip-text text-transparent">
                <Globe className="w-3 h-3 mr-1 text-blue-600" />
                <span className="hidden sm:inline">भारत सरकार | </span>Government of India
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-3 md:py-4 bg-white">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center space-x-3 md:space-x-4 flex-1 min-w-0">
            <div className="min-w-0 flex-1">
              <h1 className="text-sm md:text-lg lg:text-2xl font-extrabold truncate">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-blue-700 to-green-700">
                  National Education Data Platform
                </span>
              </h1>
              <p className="text-xs md:text-sm font-semibold text-slate-600 hidden sm:block">
                Ministry of Education | <span className="text-orange-600">भारत सरकार</span> | Government of India
              </p>
              <div className="flex items-center gap-2 mt-1">
                <Badge className="bg-gradient-to-r from-orange-500 to-green-600 text-white text-xs px-2 py-0.5 font-bold shadow-md">
                  🇮🇳 Digital India
                </Badge>
                <Badge className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-xs px-2 py-0.5 font-bold shadow-md">
                  🏛️ Gov Certified
                </Badge>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2 md:space-x-3">
            <Button 
              onClick={() => navigate("/auth")}
              className="bg-gradient-to-r from-orange-600 via-pink-600 to-rose-600 hover:from-orange-700 hover:via-pink-700 hover:to-rose-700 text-white font-bold px-3 md:px-4 lg:px-6 text-xs md:text-sm shadow-xl border-2 border-orange-200 transform hover:scale-105 transition-all"
            >
              <span className="hidden sm:inline">Login / Register</span>
              <span className="sm:hidden">Login</span>
            </Button>

            <Button variant="outline" size="icon" className="lg:hidden border-2 border-blue-600 text-blue-700 hover:bg-blue-50">
              <Menu className="w-4 h-4 md:w-5 md:h-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};