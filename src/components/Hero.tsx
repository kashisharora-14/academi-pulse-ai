
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { GovernmentSlideshow } from "@/components/GovernmentSlideshow";
import { 
  GraduationCap, 
  Users, 
  Building2, 
  UserCheck, 
  Shield,
  Globe,
  BarChart3,
  CheckCircle
} from "lucide-react";

export const Hero = () => {
  const navigate = useNavigate();

  const handleDemoLogin = (role: string) => {
    // Navigate directly to dashboard with proper routing
    console.log(`Navigating to ${role} dashboard`);
    
    try {
      switch(role) {
        case 'student':
          navigate('/student', { replace: true });
          break;
        case 'teacher':
          navigate('/teacher', { replace: true });
          break;
        case 'institution':
          navigate('/institution', { replace: true });
          break;
        case 'admin':
          navigate('/admin', { replace: true });
          break;
        default:
          navigate('/auth', { replace: true });
      }
    } catch (error) {
      console.error('Navigation error:', error);
      // Fallback to auth page
      navigate('/auth', { replace: true });
    }
  };

  return (
    <section className="relative bg-gradient-to-br from-slate-50 to-blue-50 py-8 md:py-12 lg:py-16">
      {/* Government Header Bar */}
      <div className="absolute top-0 w-full h-2 bg-gradient-to-r from-orange-500 via-white to-green-500"></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          
          
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold text-slate-800 mb-4 md:mb-6 leading-tight px-2">
            National Education
            <span className="block text-blue-800">Data Integration Platform</span>
          </h1>
          
          <p className="text-sm md:text-lg lg:text-xl text-slate-600 mb-6 md:mb-8 max-w-3xl mx-auto leading-relaxed px-4">
            Unified digital ecosystem for seamless data management across educational institutions, 
            government schemes, and stakeholder coordination under Digital India initiative.
          </p>

          {/* Government Slideshow */}
          <GovernmentSlideshow />

          {/* Key Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mb-8 md:mb-12 max-w-4xl mx-auto">
            <Card className="p-3 md:p-4 bg-white border-2 border-slate-200">
              <div className="text-xl md:text-2xl font-bold text-blue-800">50,000+</div>
              <div className="text-xs md:text-sm text-slate-600">Institutions</div>
            </Card>
            <Card className="p-3 md:p-4 bg-white border-2 border-slate-200">
              <div className="text-xl md:text-2xl font-bold text-green-700">4.5 Cr+</div>
              <div className="text-xs md:text-sm text-slate-600">Students</div>
            </Card>
            <Card className="p-3 md:p-4 bg-white border-2 border-slate-200">
              <div className="text-xl md:text-2xl font-bold text-orange-600">200+</div>
              <div className="text-xs md:text-sm text-slate-600">Schemes</div>
            </Card>
            <Card className="p-3 md:p-4 bg-white border-2 border-slate-200">
              <div className="text-xl md:text-2xl font-bold text-purple-700">99.9%</div>
              <div className="text-xs md:text-sm text-slate-600">Uptime</div>
            </Card>
          </div>

          {/* Login Section */}
          <Card className="max-w-4xl mx-auto p-4 md:p-6 lg:p-8 bg-white border-2 border-slate-300 shadow-lg">
            <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-4 md:mb-6">Access Dashboard</h3>
            
            <div className="bg-slate-50 border-2 border-slate-200 rounded-lg p-3 md:p-4 mb-4 md:mb-6">
              <div className="text-xs md:text-sm text-slate-700 mb-2">
                <strong>Demo Access Credentials:</strong>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 text-xs md:text-sm">
                <div className="bg-white p-2.5 md:p-3 rounded border">
                  <strong>Email:</strong> demo@gov.in<br/>
                  <strong>Password:</strong> Demo@123
                </div>
                <div className="bg-white p-2.5 md:p-3 rounded border">
                  <strong>Aadhaar:</strong> 1234-5678-9012<br/>
                  <strong>Mobile OTP:</strong> 123456
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
              <Card className="p-4 md:p-5 lg:p-6 border-2 border-blue-200 hover:border-blue-400 transition-colors cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      console.log('Student portal clicked');
                      handleDemoLogin('student');
                    }}>
                <div className="text-center">
                  <div className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                    <GraduationCap className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-blue-600" />
                  </div>
                  <h4 className="font-semibold text-sm md:text-base text-slate-800 mb-1.5 md:mb-2">Student Portal</h4>
                  <p className="text-xs md:text-sm text-slate-600 mb-3 md:mb-4">Academic records, schemes, certificates</p>
                  <Button 
                    className="w-full text-xs md:text-sm bg-blue-600 hover:bg-blue-700"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDemoLogin('student');
                    }}
                  >
                    Login as Student
                  </Button>
                </div>
              </Card>

              <Card className="p-4 md:p-5 lg:p-6 border-2 border-green-200 hover:border-green-400 transition-colors cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      console.log('Teacher portal clicked');
                      handleDemoLogin('teacher');
                    }}>
                <div className="text-center">
                  <div className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                    <UserCheck className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-green-600" />
                  </div>
                  <h4 className="font-semibold text-sm md:text-base text-slate-800 mb-1.5 md:mb-2">Faculty Portal</h4>
                  <p className="text-xs md:text-sm text-slate-600 mb-3 md:mb-4">Teaching records, research, appraisals</p>
                  <Button 
                    className="w-full text-xs md:text-sm bg-green-600 hover:bg-green-700"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDemoLogin('teacher');
                    }}
                  >
                    Login as Faculty
                  </Button>
                </div>
              </Card>

              <Card className="p-4 md:p-5 lg:p-6 border-2 border-purple-200 hover:border-purple-400 transition-colors cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      console.log('Institution portal clicked');
                      handleDemoLogin('institution');
                    }}>
                <div className="text-center">
                  <div className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                    <Building2 className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-purple-600" />
                  </div>
                  <h4 className="font-semibold text-sm md:text-base text-slate-800 mb-1.5 md:mb-2">Institution Portal</h4>
                  <p className="text-xs md:text-sm text-slate-600 mb-3 md:mb-4">Management, compliance, analytics</p>
                  <Button 
                    className="w-full text-xs md:text-sm bg-purple-600 hover:bg-purple-700"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDemoLogin('institution');
                    }}
                  >
                    Login as Institution
                  </Button>
                </div>
              </Card>

              <Card className="p-4 md:p-5 lg:p-6 border-2 border-orange-200 hover:border-orange-400 transition-colors cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      console.log('Admin portal clicked');
                      handleDemoLogin('admin');
                    }}>
                <div className="text-center">
                  <div className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                    <BarChart3 className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-orange-600" />
                  </div>
                  <h4 className="font-semibold text-sm md:text-base text-slate-800 mb-1.5 md:mb-2">Ministry Portal</h4>
                  <p className="text-xs md:text-sm text-slate-600 mb-3 md:mb-4">Policy oversight, national analytics</p>
                  <Button 
                    className="w-full text-xs md:text-sm bg-orange-600 hover:bg-orange-700"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDemoLogin('admin');
                    }}
                  >
                    Login as Ministry
                  </Button>
                </div>
              </Card>
            </div>
          </Card>

          {/* Features Grid */}
          <div className="mt-8 md:mt-12 lg:mt-16 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8 max-w-6xl mx-auto">
            <Card className="p-4 md:p-5 lg:p-6 bg-white border-2 border-slate-200">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3 md:mb-4">
                <Globe className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
              </div>
              <h3 className="text-base md:text-lg font-semibold text-slate-800 mb-2 md:mb-3">Unified Data Integration</h3>
              <p className="text-xs md:text-sm text-slate-600">Single platform connecting AISHE, NIRF, NAAC, UGC, and state databases</p>
            </Card>

            <Card className="p-4 md:p-5 lg:p-6 bg-white border-2 border-slate-200">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3 md:mb-4">
                <Shield className="w-5 h-5 md:w-6 md:h-6 text-green-600" />
              </div>
              <h3 className="text-base md:text-lg font-semibold text-slate-800 mb-2 md:mb-3">Secure & Compliant</h3>
              <p className="text-xs md:text-sm text-slate-600">Aadhaar-based authentication with end-to-end encryption and data protection</p>
            </Card>

            <Card className="p-4 md:p-5 lg:p-6 bg-white border-2 border-slate-200">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3 md:mb-4">
                <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-purple-600" />
              </div>
              <h3 className="text-base md:text-lg font-semibold text-slate-800 mb-2 md:mb-3">Real-time Analytics</h3>
              <p className="text-xs md:text-sm text-slate-600">Live dashboards for policy makers with AI-powered insights and recommendations</p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
