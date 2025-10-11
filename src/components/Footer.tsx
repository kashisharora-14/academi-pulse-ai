
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { 
  Shield, 
  Phone, 
  Mail, 
  MapPin,
  ExternalLink,
  Globe,
  FileText,
  Construction
} from "lucide-react";

export const Footer = () => {
  const [showFutureDialog, setShowFutureDialog] = useState(false);

  const handleLinkClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowFutureDialog(true);
  };

  return (
    <footer className="bg-slate-800 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Government Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-2">National Education Data Platform</h3>
              <p className="text-slate-300 text-sm">Ministry of Education, Government of India</p>
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
                  demo@education.gov.in
                </span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" onClick={handleLinkClick} className="text-slate-300 hover:text-white flex items-center cursor-pointer">
                  <ExternalLink className="w-3 h-3 mr-2" />
                  Ministry of Education
                </a>
              </li>
              <li>
                <a href="#" onClick={handleLinkClick} className="text-slate-300 hover:text-white flex items-center cursor-pointer">
                  <ExternalLink className="w-3 h-3 mr-2" />
                  Digital India
                </a>
              </li>
              <li>
                <a href="#" onClick={handleLinkClick} className="text-slate-300 hover:text-white flex items-center cursor-pointer">
                  <ExternalLink className="w-3 h-3 mr-2" />
                  National Portal of India
                </a>
              </li>
              <li>
                <a href="#" onClick={handleLinkClick} className="text-slate-300 hover:text-white flex items-center cursor-pointer">
                  <ExternalLink className="w-3 h-3 mr-2" />
                  PM-USHA
                </a>
              </li>
              <li>
                <a href="#" onClick={handleLinkClick} className="text-slate-300 hover:text-white flex items-center cursor-pointer">
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
                <a href="#" onClick={handleLinkClick} className="text-slate-300 hover:text-white flex items-center cursor-pointer">
                  <FileText className="w-3 h-3 mr-2" />
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" onClick={handleLinkClick} className="text-slate-300 hover:text-white flex items-center cursor-pointer">
                  <FileText className="w-3 h-3 mr-2" />
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" onClick={handleLinkClick} className="text-slate-300 hover:text-white flex items-center cursor-pointer">
                  <FileText className="w-3 h-3 mr-2" />
                  Data Protection
                </a>
              </li>
              <li>
                <a href="#" onClick={handleLinkClick} className="text-slate-300 hover:text-white flex items-center cursor-pointer">
                  <FileText className="w-3 h-3 mr-2" />
                  Accessibility
                </a>
              </li>
              <li>
                <a href="#" onClick={handleLinkClick} className="text-slate-300 hover:text-white flex items-center cursor-pointer">
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
          
          {/* Government Motto */}
          <div className="mt-4">
            <div className="flex justify-center">
              <div className="text-slate-400 text-xs font-semibold flex items-center gap-1">
                <span>सत्यमेव जयते</span>
                <span>•</span>
                <span>Truth Alone Triumphs</span>
              </div>
            </div>
          </div>

          {/* Team Information */}
          <div className="mt-4 pt-4 border-t border-slate-700">
            <div className="flex justify-center">
              <div className="text-slate-400 text-xs flex items-center gap-2">
                <span>Developed by Team</span>
                <span className="font-bold text-blue-400">RE-CONNECT</span>
                <span>•</span>
                <span>Team ID:</span>
                <span className="font-bold text-yellow-400">#99958</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Future Implementation Dialog */}
      <Dialog open={showFutureDialog} onOpenChange={setShowFutureDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex items-center justify-center mb-4">
              <div className="h-16 w-16 bg-orange-100 rounded-full flex items-center justify-center">
                <Construction className="h-8 w-8 text-orange-600" />
              </div>
            </div>
            <DialogTitle className="text-center text-xl">Future Implementation</DialogTitle>
            <DialogDescription className="text-center text-base pt-2">
              This link is yet to be implemented and will be available in the upcoming releases of the National Education Data Platform.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center pt-4">
            <Button onClick={() => setShowFutureDialog(false)} className="bg-blue-600 hover:bg-blue-700">
              Got it
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </footer>
  );
};
