
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
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
    navigate(`/auth?role=${role}&demo=true`);
  };

  return (
    <section className="relative bg-gradient-to-br from-slate-50 to-blue-50 py-16">
      {/* Government Header Bar */}
      <div className="absolute top-0 w-full h-2 bg-gradient-to-r from-orange-500 via-white to-green-500"></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          {/* Government Badge */}
          <div className="flex justify-center mb-6">
            <Badge className="bg-blue-800 text-white px-6 py-2 text-sm font-semibold">
              <Shield className="w-4 h-4 mr-2" />
              Government of India Initiative
            </Badge>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-slate-800 mb-6 leading-tight">
            National Education
            <span className="block text-blue-800">Data Integration Platform</span>
          </h1>
          
          <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Unified digital ecosystem for seamless data management across educational institutions, 
            government schemes, and stakeholder coordination under Digital India initiative.
          </p>

          {/* Key Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 max-w-4xl mx-auto">
            <Card className="p-4 bg-white border-2 border-slate-200">
              <div className="text-2xl font-bold text-blue-800">50,000+</div>
              <div className="text-sm text-slate-600">Institutions</div>
            </Card>
            <Card className="p-4 bg-white border-2 border-slate-200">
              <div className="text-2xl font-bold text-green-700">4.5 Cr+</div>
              <div className="text-sm text-slate-600">Students</div>
            </Card>
            <Card className="p-4 bg-white border-2 border-slate-200">
              <div className="text-2xl font-bold text-orange-600">200+</div>
              <div className="text-sm text-slate-600">Schemes</div>
            </Card>
            <Card className="p-4 bg-white border-2 border-slate-200">
              <div className="text-2xl font-bold text-purple-700">99.9%</div>
              <div className="text-sm text-slate-600">Uptime</div>
            </Card>
          </div>

          {/* Login Section */}
          <Card className="max-w-4xl mx-auto p-8 bg-white border-2 border-slate-300 shadow-lg">
            <h3 className="text-2xl font-bold text-slate-800 mb-6">Access Dashboard</h3>
            
            <div className="bg-slate-50 border-2 border-slate-200 rounded-lg p-4 mb-6">
              <div className="text-sm text-slate-700 mb-2">
                <strong>Demo Access Credentials:</strong>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="bg-white p-3 rounded border">
                  <strong>Email:</strong> demo@gov.in<br/>
                  <strong>Password:</strong> Demo@123
                </div>
                <div className="bg-white p-3 rounded border">
                  <strong>Aadhaar:</strong> 1234-5678-9012<br/>
                  <strong>Mobile OTP:</strong> 123456
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="p-6 border-2 border-blue-200 hover:border-blue-400 transition-colors cursor-pointer"
                    onClick={() => handleDemoLogin('student')}>
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <GraduationCap className="w-8 h-8 text-blue-600" />
                  </div>
                  <h4 className="font-semibold text-slate-800 mb-2">Student Portal</h4>
                  <p className="text-sm text-slate-600 mb-4">Academic records, schemes, certificates</p>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    Login as Student
                  </Button>
                </div>
              </Card>

              <Card className="p-6 border-2 border-green-200 hover:border-green-400 transition-colors cursor-pointer"
                    onClick={() => handleDemoLogin('teacher')}>
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <UserCheck className="w-8 h-8 text-green-600" />
                  </div>
                  <h4 className="font-semibold text-slate-800 mb-2">Faculty Portal</h4>
                  <p className="text-sm text-slate-600 mb-4">Teaching records, research, appraisals</p>
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    Login as Faculty
                  </Button>
                </div>
              </Card>

              <Card className="p-6 border-2 border-purple-200 hover:border-purple-400 transition-colors cursor-pointer"
                    onClick={() => handleDemoLogin('institution')}>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Building2 className="w-8 h-8 text-purple-600" />
                  </div>
                  <h4 className="font-semibold text-slate-800 mb-2">Institution Portal</h4>
                  <p className="text-sm text-slate-600 mb-4">Management, compliance, analytics</p>
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">
                    Login as Institution
                  </Button>
                </div>
              </Card>

              <Card className="p-6 border-2 border-orange-200 hover:border-orange-400 transition-colors cursor-pointer"
                    onClick={() => handleDemoLogin('admin')}>
                <div className="text-center">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BarChart3 className="w-8 h-8 text-orange-600" />
                  </div>
                  <h4 className="font-semibold text-slate-800 mb-2">Ministry Portal</h4>
                  <p className="text-sm text-slate-600 mb-4">Policy oversight, national analytics</p>
                  <Button className="w-full bg-orange-600 hover:bg-orange-700">
                    Login as Ministry
                  </Button>
                </div>
              </Card>
            </div>
          </Card>

          {/* Features Grid */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="p-6 bg-white border-2 border-slate-200">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Globe className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-3">Unified Data Integration</h3>
              <p className="text-slate-600">Single platform connecting AISHE, NIRF, NAAC, UGC, and state databases</p>
            </Card>

            <Card className="p-6 bg-white border-2 border-slate-200">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-3">Secure & Compliant</h3>
              <p className="text-slate-600">Aadhaar-based authentication with end-to-end encryption and data protection</p>
            </Card>

            <Card className="p-6 bg-white border-2 border-slate-200">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-3">Real-time Analytics</h3>
              <p className="text-slate-600">Live dashboards for policy makers with AI-powered insights and recommendations</p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
