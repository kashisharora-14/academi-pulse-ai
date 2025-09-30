import { Button } from "@/components/ui/button";
import { GraduationCap, Menu } from "lucide-react";
import { useState } from "react";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-hero">
            <GraduationCap className="h-6 w-6 text-white" />
          </div>
          <div>
            <div className="text-lg font-bold">NEDP</div>
            <div className="text-xs text-muted-foreground">National Education Data Platform</div>
          </div>
        </div>

        <nav className="hidden gap-6 md:flex">
          <a href="#features" className="text-sm font-medium transition-colors hover:text-primary">
            Features
          </a>
          <a href="#modules" className="text-sm font-medium transition-colors hover:text-primary">
            Modules
          </a>
          <a href="#roles" className="text-sm font-medium transition-colors hover:text-primary">
            Dashboards
          </a>
          <a href="#ai" className="text-sm font-medium transition-colors hover:text-primary">
            AI Features
          </a>
        </nav>

        <div className="flex items-center gap-4">
          <Button variant="ghost" className="hidden md:inline-flex">
            Login
          </Button>
          <Button>Get Started</Button>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="border-t border-border/40 bg-background/95 backdrop-blur md:hidden">
          <nav className="container mx-auto flex flex-col gap-4 px-4 py-4">
            <a href="#features" className="text-sm font-medium transition-colors hover:text-primary">
              Features
            </a>
            <a href="#modules" className="text-sm font-medium transition-colors hover:text-primary">
              Modules
            </a>
            <a href="#roles" className="text-sm font-medium transition-colors hover:text-primary">
              Dashboards
            </a>
            <a href="#ai" className="text-sm font-medium transition-colors hover:text-primary">
              AI Features
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};
