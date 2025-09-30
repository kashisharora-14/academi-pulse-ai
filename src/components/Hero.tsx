import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-education.jpg";
import { useNavigate } from "react-router-dom";

export const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden bg-gradient-hero py-20 lg:py-32">
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />

      <div className="container relative mx-auto px-4">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur-sm">
              <Sparkles className="h-4 w-4 text-secondary" />
              <span className="text-sm font-medium text-white">AI-Powered Education Platform</span>
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-white lg:text-6xl">
              National Education Data Platform
            </h1>

            <p className="text-lg text-white/90 lg:text-xl">
              Unified ecosystem connecting students, teachers, institutions, and government. 
              Track progress, analyze performance, and drive educational excellence with AI-powered insights.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
              <Button size="lg" onClick={() => navigate("/auth")}>
                Get Started
              </Button>
              <Button size="lg" variant="outline" className="border-white/20 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm" onClick={() => navigate("/auth")}>
                Demo Login
              </Button>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 pt-6">
              <Button 
                variant="outline" 
                size="sm" 
                className="border-white/20 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm text-xs"
                onClick={() => navigate("/admin")}
              >
                Admin Demo
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="border-white/20 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm text-xs"
                onClick={() => navigate("/institution")}
              >
                Institution Demo
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="border-white/20 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm text-xs"
                onClick={() => navigate("/student")}
              >
                Student Demo
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="border-white/20 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm text-xs"
                onClick={() => navigate("/teacher")}
              >
                Teacher Demo
              </Button>
            </div>

            <div className="flex gap-8 pt-4">
              <div>
                <div className="text-3xl font-bold text-white">10M+</div>
                <div className="text-sm text-white/80">Students Tracked</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">50K+</div>
                <div className="text-sm text-white/80">Institutions</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">5L+</div>
                <div className="text-sm text-white/80">Teachers</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-accent opacity-20 blur-3xl" />
            <img 
              src={heroImage} 
              alt="Education Platform" 
              className="relative rounded-2xl shadow-large"
            />
          </div>
        </div>
      </div>
    </section>
  );
};