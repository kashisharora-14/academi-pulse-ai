
import { Card } from "@/components/ui/card";
import { 
  Shield, 
  Phone, 
  Mail, 
  MapPin,
  ExternalLink,
  Globe,
  FileText
} from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-slate-800 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Government Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-start space-x-4 mb-6">
              <div className="flex flex-col items-center space-y-2">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                {/* 75th Independence Logo */}
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 via-white to-green-500 rounded-full flex items-center justify-center border-2 border-yellow-400">
                  <div className="w-6 h-6 bg-blue-800 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-xs">75</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold">National Education Data Platform</h3>
                <p className="text-slate-300 text-sm">Ministry of Education, Government of India</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs bg-gradient-to-r from-orange-500 to-green-500 text-white px-2 py-1 rounded">
                    🇮🇳 Digital India
                  </span>
                  <span className="text-xs bg-blue-700 text-white px-2 py-1 rounded">
                    आज़ादी का अमृत महोत्सव
                  </span>
                </div>
              </div>
            </div>
            
            <p className="text-slate-300 mb-6 leading-relaxed">
              A comprehensive digital platform for unified education data management, 
              scheme distribution, and policy implementation across India's educational ecosystem.
            </p>

            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-blue-400" />
                <span className="text-slate-300 text-sm">
                  Shastri Bhawan, New Delhi - 110001
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-blue-400" />
                <span className="text-slate-300 text-sm">
                  Helpline: 1800-11-2020 (Toll Free)
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-blue-400" />
                <span className="text-slate-300 text-sm">
                  support@education.gov.in
                </span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-slate-300 hover:text-white flex items-center">
                  <ExternalLink className="w-3 h-3 mr-2" />
                  Ministry of Education
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-300 hover:text-white flex items-center">
                  <ExternalLink className="w-3 h-3 mr-2" />
                  Digital India
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-300 hover:text-white flex items-center">
                  <ExternalLink className="w-3 h-3 mr-2" />
                  National Portal of India
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-300 hover:text-white flex items-center">
                  <ExternalLink className="w-3 h-3 mr-2" />
                  PM-USHA
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-300 hover:text-white flex items-center">
                  <ExternalLink className="w-3 h-3 mr-2" />
                  SWAYAM
                </a>
              </li>
            </ul>
          </div>

          {/* Policies & Compliance */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Policies & Compliance</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-slate-300 hover:text-white flex items-center">
                  <FileText className="w-3 h-3 mr-2" />
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-300 hover:text-white flex items-center">
                  <FileText className="w-3 h-3 mr-2" />
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-300 hover:text-white flex items-center">
                  <FileText className="w-3 h-3 mr-2" />
                  Data Protection
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-300 hover:text-white flex items-center">
                  <FileText className="w-3 h-3 mr-2" />
                  Accessibility
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-300 hover:text-white flex items-center">
                  <FileText className="w-3 h-3 mr-2" />
                  RTI Information
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Government Footer Bar */}
      <div className="border-t border-slate-700 bg-slate-900 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-6 text-sm text-slate-400">
              <span>© 2024 Government of India</span>
              <span className="flex items-center">
                <Globe className="w-3 h-3 mr-1" />
                Last Updated: December 2024
              </span>
            </div>
            
            <div className="flex items-center space-x-4">
              <Card className="px-3 py-1 bg-green-800 border-green-600">
                <span className="text-xs text-green-100 font-medium">ISO 27001 Certified</span>
              </Card>
              <Card className="px-3 py-1 bg-blue-800 border-blue-600">
                <span className="text-xs text-blue-100 font-medium">STQC Audited</span>
              </Card>
            </div>
          </div>
          
          {/* Government Tricolor Bar with 75th Independence */}
          <div className="mt-4 space-y-2">
            <div className="h-2 bg-gradient-to-r from-orange-500 via-white to-green-500 rounded"></div>
            <div className="flex justify-center">
              <div className="bg-blue-800 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                <span>🇮🇳</span>
                <span>सत्यमेव जयते</span>
                <span>•</span>
                <span>Truth Alone Triumphs</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
