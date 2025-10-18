
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authHelpers } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  Building2, 
  GraduationCap, 
  UserCircle, 
  Smartphone,
  CreditCard,
  Eye,
  EyeOff,
  CheckCircle,
  Lock,
  User,
  Home
} from "lucide-react";

const demoAccounts = [
  {
    role: "admin",
    email: "admin@nedp.gov.in",
    password: "admin123",
    aadhaar: "1234-5678-9012",
    name: "Rajesh Kumar",
    icon: Shield,
    title: "Government Admin",
    color: "bg-red-500",
    description: "National education data oversight and policy management"
  },
  {
    role: "institution",
    email: "institution@nedp.gov.in", 
    password: "institution123",
    aadhaar: "2345-6789-0123",
    name: "Dr. Priya Sharma",
    icon: Building2,
    title: "Institution Head",
    color: "bg-blue-500",
    description: "College administration and student management portal"
  },
  {
    role: "student",
    email: "student@nedp.gov.in",
    password: "student123",
    aadhaar: "3456-7890-1234",
    name: "Arjun Patel",
    icon: GraduationCap,
    title: "Student Portal",
    color: "bg-green-500",
    description: "Complete academic life cycle tracking and benefits"
  },
  {
    role: "teacher",
    email: "teacher@nedp.gov.in",
    password: "teacher123",
    aadhaar: "4567-8901-2345",
    name: "Prof. Meera Singh",
    icon: UserCircle,
    title: "Faculty Portal",
    color: "bg-purple-500",
    description: "Teaching management and APAR evaluation system"
  }
];

const Auth = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState<string | null>(null);
  const [authMethod, setAuthMethod] = useState<"aadhaar" | "email">("aadhaar");
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  
  // Aadhaar auth state
  const [aadhaarNumber, setAadhaarNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [verificationStep, setVerificationStep] = useState(1);
  
  // Email auth state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const formatAadhaar = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{0,4})(\d{0,4})(\d{0,4})$/);
    if (match) {
      return [match[1], match[2], match[3]].filter(Boolean).join('-');
    }
    return value;
  };

  const handleAadhaarChange = (value: string) => {
    const formatted = formatAadhaar(value);
    if (formatted.replace(/-/g, '').length <= 12) {
      setAadhaarNumber(formatted);
    }
  };

  const handleSendOTP = async () => {
    if (aadhaarNumber.replace(/-/g, '').length !== 12) {
      toast({
        title: "Invalid Aadhaar",
        description: "Please enter a valid 12-digit Aadhaar number",
        variant: "destructive",
      });
      return;
    }

    setLoading("otp");
    
    // Simulate OTP sending
    setTimeout(() => {
      setOtpSent(true);
      setVerificationStep(2);
      setLoading(null);
      toast({
        title: "OTP Sent",
        description: "Verification code sent to your registered mobile number",
      });
    }, 2000);
  };

  const handleVerifyOTP = async () => {
    if (otp.length !== 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter the 6-digit OTP",
        variant: "destructive",
      });
      return;
    }

    setLoading("verify");

    // Find matching demo account
    const account = demoAccounts.find(acc => acc.aadhaar === aadhaarNumber);
    
    if (!account || otp !== "123456") {
      toast({
        title: "Verification Failed",
        description: "Invalid OTP or Aadhaar number",
        variant: "destructive",
      });
      setLoading(null);
      return;
    }

    await handleDemoLogin(account.email, account.password, account.role);
  };

  const handleEmailLogin = async () => {
    if (!email || !password) {
      toast({
        title: "Missing Information",
        description: "Please enter both email and password",
        variant: "destructive",
      });
      return;
    }

    const account = demoAccounts.find(acc => acc.email === email && acc.password === password);
    
    if (!account) {
      toast({
        title: "Login Failed",
        description: "Invalid email or password",
        variant: "destructive",
      });
      return;
    }

    await handleDemoLogin(account.email, account.password, account.role);
  };

  const handleDemoLogin = async (email: string, password: string, role: string) => {
    setLoading(role);
    try {
      // Simple demo authentication
      authHelpers.login(email, role);

      toast({
        title: "Login Successful",
        description: `Welcome to ${role} dashboard`,
      });

      navigate(`/${role}`);
    } catch (error: any) {
      toast({
        title: "Login Failed",
        description: error.message || "An error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(null);
    }
  };

  const handleQuickRoleLogin = async (account: any) => {
    setSelectedRole(account.role);
    if (authMethod === "aadhaar") {
      setAadhaarNumber(account.aadhaar);
      setVerificationStep(1);
      setOtpSent(false);
      setOtp("");
    } else {
      setEmail(account.email);
      setPassword(account.password);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-primary to-accent">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <div>
              <div className="text-lg font-bold">NEDP</div>
              <div className="text-xs text-muted-foreground">National Education Data Platform</div>
            </div>
          </div>
          <Button variant="outline" onClick={() => navigate("/")}>
            <Home className="h-4 w-4 mr-2" />
            Return to Home
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Secure Authentication Portal</h1>
            <p className="text-muted-foreground mb-6">
              Access your education dashboard using Aadhaar-based authentication or email login
            </p>
            
            <div className="flex justify-center mb-6">
              <div className="flex items-center gap-2 bg-green-50 text-green-800 px-4 py-2 rounded-full text-sm">
                <CheckCircle className="h-4 w-4" />
                <span>Secure • Verified • Government Approved</span>
              </div>
            </div>
          </div>

          {/* Quick Role Selection */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-center">Select Your Role</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {demoAccounts.map((account) => (
                <Card
                  key={account.role}
                  className={`p-4 cursor-pointer transition-all hover:shadow-lg ${
                    selectedRole === account.role ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => handleQuickRoleLogin(account)}
                >
                  <div className="text-center">
                    <div className={`mb-3 inline-flex h-12 w-12 items-center justify-center rounded-lg ${account.color}`}>
                      <account.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-semibold mb-1">{account.title}</h3>
                    <p className="text-xs text-muted-foreground mb-2">{account.description}</p>
                    <Badge variant="outline" className="text-xs">
                      {account.name}
                    </Badge>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Authentication Methods */}
          <Card className="max-w-2xl mx-auto">
            <div className="p-6">
              {/* Custom Tab Buttons */}
              <div className="grid grid-cols-2 gap-2 bg-gray-100 p-2 rounded-lg mb-6">
                <button
                  onClick={() => setAuthMethod("aadhaar")}
                  className={`flex items-center justify-center gap-2 px-4 py-3 rounded-md font-bold text-sm transition-all ${
                    authMethod === "aadhaar"
                      ? "bg-white text-black shadow-sm"
                      : "bg-transparent text-black hover:bg-white/50"
                  }`}
                  style={{ color: '#000000', fontWeight: 'bold' }}
                >
                  <CreditCard className="h-4 w-4" />
                  Aadhaar Authentication
                </button>
                <button
                  onClick={() => setAuthMethod("email")}
                  className={`flex items-center justify-center gap-2 px-4 py-3 rounded-md font-bold text-sm transition-all ${
                    authMethod === "email"
                      ? "bg-white text-black shadow-sm"
                      : "bg-transparent text-black hover:bg-white/50"
                  }`}
                  style={{ color: '#000000', fontWeight: 'bold' }}
                >
                  <User className="h-4 w-4" />
                  Email Login
                </button>
              </div>

              <Tabs value={authMethod} onValueChange={(value: any) => setAuthMethod(value)}>

                <TabsContent value="aadhaar" className="space-y-6 mt-6">
                  <div className="text-center">
                    <CreditCard className="h-12 w-12 mx-auto mb-4 text-primary" />
                    <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">Aadhaar-based Authentication</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Secure login using your 12-digit Aadhaar number and OTP verification
                    </p>
                  </div>

                  {verificationStep === 1 && (
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block text-gray-900 dark:text-gray-100">
                          Enter Aadhaar Number
                        </label>
                        <Input
                          type="text"
                          placeholder="1234-5678-9012"
                          value={aadhaarNumber}
                          onChange={(e) => handleAadhaarChange(e.target.value)}
                          className="text-center text-lg tracking-wider"
                          maxLength={14}
                        />
                        <p className="text-xs text-muted-foreground mt-1 text-center">
                          Demo Aadhaar numbers: 1234-5678-9012, 2345-6789-0123, 3456-7890-1234, 4567-8901-2345
                        </p>
                      </div>
                      
                      <Button 
                        onClick={handleSendOTP}
                        disabled={loading === "otp" || aadhaarNumber.replace(/-/g, '').length !== 12}
                        className="w-full"
                      >
                        {loading === "otp" ? (
                          <>
                            <Smartphone className="mr-2 h-4 w-4 animate-pulse" />
                            Sending OTP...
                          </>
                        ) : (
                          <>
                            <Smartphone className="mr-2 h-4 w-4" />
                            Send OTP
                          </>
                        )}
                      </Button>
                    </div>
                  )}

                  {verificationStep === 2 && (
                    <div className="space-y-4">
                      <div className="text-center">
                        <CheckCircle className="h-8 w-8 mx-auto mb-2 text-green-500" />
                        <p className="text-sm text-muted-foreground">
                          OTP sent to mobile number ending with ****789
                        </p>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium mb-2 block text-gray-900 dark:text-gray-100">
                          Enter 6-digit OTP
                        </label>
                        <Input
                          type="text"
                          placeholder="123456"
                          value={otp}
                          onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                          className="text-center text-2xl tracking-widest"
                          maxLength={6}
                        />
                        <p className="text-xs text-muted-foreground mt-1 text-center">
                          Demo OTP: 123456
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <Button 
                          variant="outline"
                          onClick={() => {
                            setVerificationStep(1);
                            setOtpSent(false);
                            setOtp("");
                          }}
                        >
                          Back
                        </Button>
                        <Button 
                          onClick={handleVerifyOTP}
                          disabled={loading === "verify" || otp.length !== 6}
                        >
                          {loading === "verify" ? "Verifying..." : "Verify & Login"}
                        </Button>
                      </div>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="email" className="space-y-6 mt-6">
                  <div className="text-center">
                    <User className="h-12 w-12 mx-auto mb-4 text-primary" />
                    <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">Email Authentication</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Login using your registered email address and password
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block text-gray-900 dark:text-gray-100">Email Address</label>
                      <Input
                        type="email"
                        placeholder="your-email@nedp.gov.in"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-2 block text-gray-900 dark:text-gray-100">Password</label>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                    
                    <Button 
                      onClick={handleEmailLogin}
                      disabled={loading !== null}
                      className="w-full"
                    >
                      {loading ? (
                        <>
                          <Lock className="mr-2 h-4 w-4 animate-pulse" />
                          Logging in...
                        </>
                      ) : (
                        <>
                          <Lock className="mr-2 h-4 w-4" />
                          Login
                        </>
                      )}
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </Card>

          {/* Demo Credentials Helper */}
          <Card className="max-w-4xl mx-auto mt-8">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4 text-center">Demo Login Credentials</h3>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {demoAccounts.map((account) => (
                  <div key={account.role} className="border rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <account.icon className="h-4 w-4" />
                      <span className="font-medium text-sm">{account.title}</span>
                    </div>
                    <div className="space-y-1 text-xs text-muted-foreground">
                      <p><strong>Aadhaar:</strong> {account.aadhaar}</p>
                      <p><strong>Email:</strong> {account.email}</p>
                      <p><strong>Password:</strong> {account.password}</p>
                      <p><strong>OTP:</strong> 123456</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Auth;
