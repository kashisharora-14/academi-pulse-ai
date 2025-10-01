import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Check, 
  Crown, 
  Star,
  Zap,
  Shield,
  TrendingUp,
  Users,
  BarChart3,
  FileText,
  Upload,
  Sparkles
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface PlanFeature {
  name: string;
  included: boolean;
}

interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  billingCycle: string;
  popular?: boolean;
  icon: any;
  color: string;
  storage: string;
  documents: string;
  features: PlanFeature[];
}

interface PremiumSubscriptionProps {
  currentPlan?: string;
  userEmail: string;
  userType: 'student' | 'teacher' | 'institution' | 'admin';
}

export const PremiumSubscription = ({ 
  currentPlan = 'free', 
  userEmail,
  userType 
}: PremiumSubscriptionProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const plans: SubscriptionPlan[] = [
    {
      id: 'free',
      name: 'Free',
      price: 0,
      billingCycle: 'forever',
      icon: FileText,
      color: 'bg-gray-500',
      storage: '2 GB',
      documents: '10 documents',
      features: [
        { name: 'Basic document storage', included: true },
        { name: 'Up to 10 documents', included: true },
        { name: 'Standard export (PDF)', included: true },
        { name: 'Community support', included: true },
        { name: 'Advanced analytics', included: false },
        { name: 'AI-powered insights', included: false },
        { name: 'Priority support', included: false },
        { name: 'Custom branding', included: false },
      ]
    },
    {
      id: 'basic',
      name: 'Basic',
      price: 299,
      billingCycle: 'month',
      icon: Upload,
      color: 'bg-blue-500',
      storage: '10 GB',
      documents: '50 documents',
      features: [
        { name: 'Enhanced document storage', included: true },
        { name: 'Up to 50 documents', included: true },
        { name: 'Multiple export formats', included: true },
        { name: 'Email support', included: true },
        { name: 'Basic analytics dashboard', included: true },
        { name: 'Document verification', included: true },
        { name: 'AI-powered insights', included: false },
        { name: 'Priority support', included: false },
      ]
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 999,
      billingCycle: 'month',
      popular: true,
      icon: Crown,
      color: 'bg-purple-500',
      storage: '50 GB',
      documents: '500 documents',
      features: [
        { name: 'Premium document storage', included: true },
        { name: 'Up to 500 documents', included: true },
        { name: 'All export formats + Excel', included: true },
        { name: 'Priority email & chat support', included: true },
        { name: 'Advanced analytics & reports', included: true },
        { name: 'AI-powered recommendations', included: true },
        { name: 'Document verification & QR', included: true },
        { name: 'Custom dashboards', included: true },
        { name: 'API access', included: true },
        { name: 'Custom branding', included: false },
      ]
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 4999,
      billingCycle: 'month',
      icon: Star,
      color: 'bg-amber-500',
      storage: '500 GB',
      documents: 'Unlimited',
      features: [
        { name: 'Unlimited document storage', included: true },
        { name: 'Unlimited documents', included: true },
        { name: 'All features included', included: true },
        { name: '24/7 dedicated support', included: true },
        { name: 'Custom analytics & BI tools', included: true },
        { name: 'Full AI suite & automation', included: true },
        { name: 'Enterprise-grade security', included: true },
        { name: 'Custom integrations', included: true },
        { name: 'White-label solutions', included: true },
        { name: 'Dedicated account manager', included: true },
      ]
    }
  ];

  const currentPlanData = plans.find(p => p.id === currentPlan) || plans[0];

  const handleSubscribe = async (planId: string) => {
    if (planId === 'free') {
      toast({
        title: "Already on Free Plan",
        description: "You're currently using the free plan.",
      });
      return;
    }

    if (planId === currentPlan) {
      toast({
        title: "Current Plan",
        description: "You're already subscribed to this plan.",
      });
      return;
    }

    setSelectedPlan(planId);

    // In production, integrate with Stripe or payment gateway
    toast({
      title: "Payment Integration",
      description: `Please contact support@education.gov.in to upgrade to ${plans.find(p => p.id === planId)?.name} plan.`,
    });

    // Simulate payment success for demo
    setTimeout(() => {
      toast({
        title: "Upgrade Successful!",
        description: `Welcome to the ${plans.find(p => p.id === planId)?.name} plan!`,
      });
      setSelectedPlan(null);
    }, 2000);
  };

  const getBenefits = (userType: string) => {
    const benefits = {
      student: [
        "Store academic records & certificates",
        "Track your educational journey",
        "Share verified credentials with employers",
        "Get AI-powered scholarship recommendations"
      ],
      teacher: [
        "Manage student records efficiently",
        "Track teaching performance metrics",
        "Generate automated reports",
        "Access advanced analytics"
      ],
      institution: [
        "Centralized document management",
        "Compliance tracking & reporting",
        "Multi-user access & permissions",
        "Custom branding & analytics"
      ],
      admin: [
        "System-wide analytics & insights",
        "Policy compliance monitoring",
        "Data-driven decision making",
        "Custom reports & dashboards"
      ]
    };
    return benefits[userType] || benefits.student;
  };

  return (
    <div className="space-y-8">
      {/* Current Plan Banner */}
      <Card className="p-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <currentPlanData.icon className="h-6 w-6" />
              <h2 className="text-2xl font-bold">Current Plan: {currentPlanData.name}</h2>
            </div>
            <p className="text-blue-100">
              {currentPlanData.storage} storage • {currentPlanData.documents}
            </p>
          </div>
          {currentPlan === 'free' && (
            <Button 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-blue-50"
              onClick={() => document.getElementById('plans')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Sparkles className="mr-2 h-5 w-5" />
              Upgrade Now
            </Button>
          )}
        </div>
      </Card>

      {/* Benefits Section */}
      <Card className="p-6">
        <h3 className="text-xl font-bold mb-4 flex items-center">
          <Zap className="mr-2 h-5 w-5 text-amber-500" />
          Premium Benefits for {userType.charAt(0).toUpperCase() + userType.slice(1)}s
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {getBenefits(userType).map((benefit, index) => (
            <div key={index} className="flex items-start">
              <Check className="mr-2 h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm">{benefit}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Pricing Plans */}
      <div id="plans">
        <h3 className="text-2xl font-bold text-center mb-8">Choose Your Plan</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan) => (
            <Card 
              key={plan.id}
              className={`relative p-6 ${plan.popular ? 'border-purple-500 border-2 shadow-lg' : ''} ${currentPlan === plan.id ? 'bg-blue-50' : ''}`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-purple-500">
                  Most Popular
                </Badge>
              )}
              {currentPlan === plan.id && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-green-600">
                  Current Plan
                </Badge>
              )}

              <div className="text-center mb-6">
                <div className={`inline-flex p-3 rounded-full ${plan.color} text-white mb-4`}>
                  <plan.icon className="h-8 w-8" />
                </div>
                <h4 className="text-xl font-bold mb-2">{plan.name}</h4>
                <div className="mb-2">
                  <span className="text-3xl font-bold">₹{plan.price}</span>
                  {plan.price > 0 && <span className="text-muted-foreground">/{plan.billingCycle}</span>}
                </div>
                <p className="text-sm text-muted-foreground">{plan.storage} • {plan.documents}</p>
              </div>

              <div className="space-y-3 mb-6">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start text-sm">
                    {feature.included ? (
                      <Check className="mr-2 h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                    ) : (
                      <span className="mr-2 h-4 w-4 flex-shrink-0 mt-0.5 opacity-30">×</span>
                    )}
                    <span className={!feature.included ? 'text-muted-foreground line-through' : ''}>
                      {feature.name}
                    </span>
                  </div>
                ))}
              </div>

              <Button 
                className="w-full"
                variant={currentPlan === plan.id ? 'outline' : 'default'}
                disabled={currentPlan === plan.id || selectedPlan === plan.id}
                onClick={() => handleSubscribe(plan.id)}
              >
                {selectedPlan === plan.id ? 'Processing...' : 
                 currentPlan === plan.id ? 'Current Plan' : 
                 plan.price === 0 ? 'Current Plan' : 'Upgrade Now'}
              </Button>
            </Card>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <Card className="p-6">
        <h3 className="text-xl font-bold mb-4">Frequently Asked Questions</h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold mb-1">How do I upgrade my plan?</h4>
            <p className="text-sm text-muted-foreground">
              Click the "Upgrade Now" button on any plan above. Payment is processed securely through our integrated payment gateway.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-1">Can I cancel anytime?</h4>
            <p className="text-sm text-muted-foreground">
              Yes! You can cancel your subscription at any time. You'll retain access until the end of your billing period.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-1">Is my data secure?</h4>
            <p className="text-sm text-muted-foreground">
              Absolutely! All documents are encrypted and stored securely. We follow government-grade security standards.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-1">What payment methods do you accept?</h4>
            <p className="text-sm text-muted-foreground">
              We accept all major credit/debit cards, UPI, net banking, and digital wallets through our secure payment partners.
            </p>
          </div>
        </div>
      </Card>

      {/* Contact Support */}
      <Card className="p-6 bg-gradient-to-r from-slate-50 to-slate-100">
        <div className="text-center">
          <Shield className="h-12 w-12 mx-auto mb-4 text-blue-600" />
          <h3 className="text-xl font-bold mb-2">Need Help Choosing?</h3>
          <p className="text-muted-foreground mb-4">
            Contact our support team for personalized recommendations
          </p>
          <div className="flex justify-center gap-4">
            <Button variant="outline">
              Email Support
            </Button>
            <Button>
              Schedule Call
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
