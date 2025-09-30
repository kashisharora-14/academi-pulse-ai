import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Shield, Building2, GraduationCap, UserCircle } from "lucide-react";

const demoAccounts = [
  {
    role: "admin",
    email: "admin@nedp.gov.in",
    password: "admin123",
    icon: Shield,
    title: "Admin Dashboard",
    color: "bg-primary"
  },
  {
    role: "institution",
    email: "institution@nedp.gov.in",
    password: "institution123",
    icon: Building2,
    title: "Institution Portal",
    color: "bg-accent"
  },
  {
    role: "student",
    email: "student@nedp.gov.in",
    password: "student123",
    icon: GraduationCap,
    title: "Student Dashboard",
    color: "bg-secondary"
  },
  {
    role: "teacher",
    email: "teacher@nedp.gov.in",
    password: "teacher123",
    icon: UserCircle,
    title: "Teacher Portal",
    color: "bg-success"
  }
];

const Auth = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState<string | null>(null);

  const handleDemoLogin = async (email: string, password: string, role: string) => {
    setLoading(role);
    try {
      // Try to sign in
      let { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      // If user doesn't exist, create account
      if (error?.message.includes("Invalid login credentials")) {
        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
        });

        if (signUpError) throw signUpError;

        // Insert role
        if (signUpData.user) {
          const { error: roleError } = await supabase
            .from("user_roles")
            .insert({ user_id: signUpData.user.id, role: role as any });

          if (roleError) console.error("Role insert error:", roleError);
        }

        // Sign in after signup
        const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (loginError) throw loginError;
        data = loginData;
      } else if (error) {
        throw error;
      }

      toast({
        title: "Login successful",
        description: `Welcome to ${role} dashboard`,
      });

      navigate(`/${role}`);
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">NEDP Demo Login</h1>
          <p className="text-muted-foreground">
            Select a role to explore the platform
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {demoAccounts.map((account) => (
            <Card
              key={account.role}
              className="p-6 hover:shadow-large transition-all cursor-pointer"
              onClick={() =>
                handleDemoLogin(account.email, account.password, account.role)
              }
            >
              <div
                className={`mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl ${account.color}`}
              >
                <account.icon className="h-8 w-8 text-white" />
              </div>

              <h3 className="mb-2 text-xl font-bold">{account.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Click to login as {account.role}
              </p>

              <Button
                className="w-full"
                disabled={loading === account.role}
              >
                {loading === account.role ? "Logging in..." : "Demo Login"}
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Auth;
