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