import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { AIFeatures } from "@/components/AIFeatures";
import { RoleDashboards } from "@/components/RoleDashboards";
import { DashboardPreview } from "@/components/DashboardPreview";
import { GovernmentInitiatives } from "@/components/GovernmentInitiatives";
import { Footer } from "@/components/Footer";
import { GraduationCap, UserCircle, Building2, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <GovernmentInitiatives />
        {/* Login Portal Cards */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
            {/* Ministry Portal */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-orange-400 bg-gradient-to-br from-orange-50 to-white">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-500 group-hover:scale-110 transition-transform">
                  <BarChart3 className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl">Ministry Portal</CardTitle>
                <CardDescription className="text-sm">
                  Policy oversight, national analytics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  className="w-full bg-orange-500 hover:bg-orange-600"
                  onClick={() => navigate('/auth')}
                >
                  Login as Ministry
                </Button>
              </CardContent>
            </Card>

            {/* Admin Portal (can be added here if you have one) */}

            {/* Institution Portal */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-purple-400 bg-gradient-to-br from-purple-50 to-white">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-500 group-hover:scale-110 transition-transform">
                  <Building2 className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl">Institution Portal</CardTitle>
                <CardDescription className="text-sm">
                  Management, compliance, analytics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  className="w-full bg-purple-500 hover:bg-purple-600"
                  onClick={() => navigate('/auth')}
                >
                  Login as Institution
                </Button>
              </CardContent>
            </Card>

            {/* Faculty Portal */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-green-400 bg-gradient-to-br from-green-50 to-white">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500 group-hover:scale-110 transition-transform">
                  <UserCircle className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl">Faculty Portal</CardTitle>
                <CardDescription className="text-sm">
                  Teaching records, research, appraisals
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  className="w-full bg-green-500 hover:bg-green-600"
                  onClick={() => navigate('/auth')}
                >
                  Login as Faculty
                </Button>
              </CardContent>
            </Card>

            {/* Student Portal */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-blue-400 bg-gradient-to-br from-blue-50 to-white">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-500 group-hover:scale-110 transition-transform">
                  <GraduationCap className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl">Student Portal</CardTitle>
                <CardDescription className="text-sm">
                  Academic records, schemes, certificates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  className="w-full bg-blue-500 hover:bg-blue-600"
                  onClick={() => navigate('/auth')}
                >
                  Login as Student
                </Button>
              </CardContent>
            </Card>
          </div>
        <Features />
        <AIFeatures />
        <RoleDashboards />
        <DashboardPreview />
      </main>
      <Footer />
    </div>
  );
};

export default Index;