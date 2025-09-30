import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { AIFeatures } from "@/components/AIFeatures";
import { RoleDashboards } from "@/components/RoleDashboards";
import { DashboardPreview } from "@/components/DashboardPreview";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
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