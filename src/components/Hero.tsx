import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { GovernmentSlideshow } from "@/components/GovernmentSlideshow";
import { motion } from "framer-motion";
import { 
  GraduationCap, 
  Users, 
  Building2, 
  UserCheck, 
  Shield,
  Globe,
  BarChart3,
  CheckCircle,
  Sparkles
} from "lucide-react";

export const Hero = () => {
  const navigate = useNavigate();

  const handleDemoLogin = (role: string) => {
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
      navigate('/auth', { replace: true });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const portalCards = [
    {
      role: 'student',
      title: 'Student Portal',
      description: 'Academic records, schemes, certificates',
      icon: GraduationCap,
      color: 'blue',
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      role: 'teacher',
      title: 'Faculty Portal',
      description: 'Teaching records, research, appraisals',
      icon: UserCheck,
      color: 'green',
      gradient: 'from-green-500 to-green-600'
    },
    {
      role: 'institution',
      title: 'Institution Portal',
      description: 'Management, compliance, analytics',
      icon: Building2,
      color: 'purple',
      gradient: 'from-purple-500 to-purple-600'
    },
    {
      role: 'admin',
      title: 'Ministry Portal',
      description: 'Policy oversight, national analytics',
      icon: BarChart3,
      color: 'orange',
      gradient: 'from-orange-500 to-orange-600'
    }
  ];

  const stats = [
    { value: '50,000+', label: 'Institutions', color: 'blue' },
    { value: '4.5 Cr+', label: 'Students', color: 'green' },
    { value: '200+', label: 'Schemes', color: 'orange' },
    { value: '99.9%', label: 'Uptime', color: 'purple' }
  ];

  return (
    <section className="relative bg-gradient-to-br from-orange-50 via-white to-green-50 py-8 md:py-12 lg:py-16 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large decorative circles */}
        <motion.div
          className="absolute -top-20 -left-20 w-96 h-96 bg-gradient-to-br from-orange-200 to-orange-300 rounded-full opacity-40 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 30, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-40 -right-32 w-[500px] h-[500px] bg-gradient-to-br from-blue-200 to-indigo-300 rounded-full opacity-40 blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -40, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute -bottom-32 left-1/3 w-[450px] h-[450px] bg-gradient-to-br from-green-200 to-emerald-300 rounded-full opacity-40 blur-3xl"
          animate={{
            scale: [1, 1.4, 1],
            rotate: [0, 90, 180],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Decorative patterns */}
        <div className="absolute top-0 left-0 w-full h-full opacity-30">
          <div className="absolute top-20 right-32 w-40 h-40 border-4 border-orange-400 rounded-full animate-pulse"></div>
          <div className="absolute bottom-60 left-60 w-32 h-32 border-4 border-green-500 rounded-lg rotate-45 animate-pulse"></div>
          <div className="absolute top-1/2 right-1/3 w-24 h-24 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full animate-bounce opacity-50"></div>
          <div className="absolute bottom-32 right-48 w-20 h-20 border-4 border-yellow-500 rounded-full"></div>
          <div className="absolute top-48 left-1/4 w-16 h-16 bg-gradient-to-br from-pink-400 to-rose-500 rounded-lg rotate-12"></div>
        </div>
        
        {/* Geometric patterns */}
        <svg className="absolute top-0 left-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="1" fill="#FF9933"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)"/>
        </svg>
      </div>

      {/* Tricolor Header Bar */}
      <motion.div 
        className="absolute top-0 w-full h-4 bg-gradient-to-r from-orange-500 via-white to-green-600"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-white to-green-600 animate-pulse opacity-50"></div>
      </motion.div>
      
      <motion.div 
        className="container mx-auto px-4 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="text-center mb-8 md:mb-12">
          
          {/* Government Slideshow */}
          <motion.div variants={itemVariants}>
            <GovernmentSlideshow />
          </motion.div>

          {/* Key Statistics with Animation */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mb-8 md:mb-12 max-w-4xl mx-auto"
            variants={containerVariants}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ 
                  scale: 1.08, 
                  y: -5,
                  transition: { duration: 0.2 }
                }}
              >
                <Card className={`p-4 md:p-6 border-3 relative overflow-hidden group cursor-pointer shadow-2xl ${
                  stat.color === 'blue' ? 'bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600 border-blue-400' :
                  stat.color === 'green' ? 'bg-gradient-to-br from-green-600 via-emerald-500 to-teal-600 border-green-400' :
                  stat.color === 'orange' ? 'bg-gradient-to-br from-orange-600 via-amber-500 to-yellow-600 border-orange-400' :
                  'bg-gradient-to-br from-purple-600 via-fuchsia-500 to-pink-600 border-purple-400'
                }`}>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent opacity-0 group-hover:opacity-100"
                    transition={{ duration: 0.3 }}
                  />
                  <motion.div
                    className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150"
                    transition={{ duration: 0.5 }}
                  />
                  <div className="relative z-10">
                    <div className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white drop-shadow-2xl mb-1">{stat.value}</div>
                    <div className="text-xs md:text-sm text-white/95 font-semibold uppercase tracking-wide">{stat.label}</div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Login Section with Enhanced Animations */}
          <motion.div variants={itemVariants}>
            <Card className="max-w-4xl mx-auto p-4 md:p-6 lg:p-8 bg-white border-4 border-gradient-to-r from-orange-400 via-blue-500 to-green-500 shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-blue-50 to-green-50 opacity-50"></div>
              <motion.h3 
                className="text-xl md:text-2xl lg:text-3xl font-extrabold mb-4 md:mb-6 flex items-center justify-center gap-2 relative z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <Sparkles className="w-6 h-6 md:w-7 md:h-7 text-orange-500 animate-pulse" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-blue-700 to-green-700">
                  Access Dashboard
                </span>
                <Sparkles className="w-6 h-6 md:w-7 md:h-7 text-green-500 animate-pulse" />
              </motion.h3>
              
              <motion.div 
                className="bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 border-2 border-blue-200/50 rounded-lg p-3 md:p-4 mb-4 md:mb-6"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="text-xs md:text-sm text-slate-700 mb-2">
                  <strong>🔐 Demo Access Credentials:</strong>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 text-xs md:text-sm">
                  <motion.div 
                    className="bg-white p-2.5 md:p-3 rounded border"
                    whileHover={{ y: -2 }}
                  >
                    <strong>Email:</strong> demo@gov.in<br/>
                    <strong>Password:</strong> Demo@123
                  </motion.div>
                  <motion.div 
                    className="bg-white p-2.5 md:p-3 rounded border"
                    whileHover={{ y: -2 }}
                  >
                    <strong>Aadhaar:</strong> 1234-5678-9012<br/>
                    <strong>Mobile OTP:</strong> 123456
                  </motion.div>
                </div>
              </motion.div>

              <motion.div 
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4"
                variants={containerVariants}
              >
                {portalCards.map((portal, index) => (
                  <motion.div
                    key={portal.role}
                    variants={cardVariants}
                    whileHover={{ 
                      y: -8,
                      transition: { duration: 0.3 }
                    }}
                  >
                    <Card 
                      className={`p-4 md:p-5 lg:p-6 border-2 transition-all cursor-pointer group relative overflow-hidden ${
                        portal.color === 'blue' ? 'border-blue-200 hover:border-blue-400' :
                        portal.color === 'green' ? 'border-green-200 hover:border-green-400' :
                        portal.color === 'purple' ? 'border-purple-200 hover:border-purple-400' :
                        'border-orange-200 hover:border-orange-400'
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleDemoLogin(portal.role);
                      }}
                    >
                      <motion.div
                        className={`absolute inset-0 bg-gradient-to-br ${portal.gradient} opacity-0 group-hover:opacity-10`}
                        transition={{ duration: 0.3 }}
                      />
                      <div className="text-center relative z-10">
                        <motion.div 
                          className={`w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 ${
                            portal.color === 'blue' ? 'bg-blue-100' :
                            portal.color === 'green' ? 'bg-green-100' :
                            portal.color === 'purple' ? 'bg-purple-100' :
                            'bg-orange-100'
                          }`}
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                        >
                          <portal.icon className={`w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 ${
                            portal.color === 'blue' ? 'text-blue-600' :
                            portal.color === 'green' ? 'text-green-600' :
                            portal.color === 'purple' ? 'text-purple-600' :
                            'text-orange-600'
                          }`} />
                        </motion.div>
                        <h4 className="font-semibold text-sm md:text-base text-slate-800 mb-1.5 md:mb-2">{portal.title}</h4>
                        <p className="text-xs md:text-sm text-slate-600 mb-3 md:mb-4">{portal.description}</p>
                        <Button 
                          className={`w-full text-xs md:text-sm bg-gradient-to-r ${portal.gradient} hover:shadow-lg transition-all`}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDemoLogin(portal.role);
                          }}
                        >
                          Login as {portal.role === 'admin' ? 'Ministry' : portal.title.split(' ')[0]}
                        </Button>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </Card>
          </motion.div>

          {/* Features Grid with Staggered Animation */}
          <motion.div 
            className="mt-8 md:mt-12 lg:mt-16 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8 max-w-6xl mx-auto"
            variants={containerVariants}
          >
            {[
              { icon: Globe, color: 'blue', title: 'Unified Data Integration', description: 'Single platform connecting AISHE, NIRF, NAAC, UGC, and state databases' },
              { icon: Shield, color: 'green', title: 'Secure & Compliant', description: 'Aadhaar-based authentication with end-to-end encryption and data protection' },
              { icon: CheckCircle, color: 'purple', title: 'Real-time Analytics', description: 'Live dashboards for policy makers with AI-powered insights and recommendations' }
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ 
                  y: -5,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
                }}
              >
                <Card className="p-4 md:p-5 lg:p-6 bg-white border-2 border-slate-200 hover:border-slate-300 transition-all group">
                  <motion.div 
                    className={`w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center mx-auto mb-3 md:mb-4 ${
                      feature.color === 'blue' ? 'bg-blue-100' :
                      feature.color === 'green' ? 'bg-green-100' :
                      'bg-purple-100'
                    }`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <feature.icon className={`w-5 h-5 md:w-6 md:h-6 ${
                      feature.color === 'blue' ? 'text-blue-600' :
                      feature.color === 'green' ? 'text-green-600' :
                      'text-purple-600'
                    }`} />
                  </motion.div>
                  <h3 className="text-base md:text-lg font-semibold text-slate-800 mb-2 md:mb-3">{feature.title}</h3>
                  <p className="text-xs md:text-sm text-slate-600">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};
