import { useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { MapPin, BarChart, GraduationCap, TrendingUp, MessageSquare, Sparkles, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";

const galleryItems = [
  {
    id: 1,
    title: "Campus Events & Interactive Map",
    description: "Navigate campus events, library timings & department success",
    details: "Real-time campus navigation with interactive maps, event calendars, department performance tracking, and university rankings visualization",
    image: "/campus-events.png",
    icon: MapPin,
    gradient: "from-green-500 via-emerald-500 to-teal-600",
    bgColor: "bg-green-50",
    accentColor: "text-green-600"
  },
  {
    id: 2,
    title: "Scheme Mapping Dashboard",
    description: "Real-time government scheme participation & benefit tracking",
    details: "Comprehensive monitoring of government scheme participation, benefit distribution analytics, and real-time compliance tracking with detailed reports",
    image: "/scheme-mapping.png",
    icon: BarChart,
    gradient: "from-orange-500 via-amber-500 to-red-600",
    bgColor: "bg-orange-50",
    accentColor: "text-orange-600"
  },
  {
    id: 3,
    title: "Student Life Cycle Tracker",
    description: "Complete journey from enrollment to alumni network",
    details: "Seamless tracking of student lifecycle from enrollment through graduation, including academic performance, project management, and alumni network engagement",
    image: "/student-lifecycle-tracker.png",
    icon: GraduationCap,
    gradient: "from-blue-600 via-indigo-600 to-blue-700",
    bgColor: "bg-blue-50",
    accentColor: "text-blue-600"
  },
  {
    id: 4,
    title: "Institution Ranking Analytics",
    description: "AI-powered NIRF analysis & compliance metrics",
    details: "Advanced AI-powered analytics using NIRF parameters, compliance metrics evaluation, scheme participation data, and comprehensive institutional benchmarking",
    image: "/institution-ranking.png",
    icon: TrendingUp,
    gradient: "from-orange-600 via-orange-500 to-amber-600",
    bgColor: "bg-orange-50",
    accentColor: "text-orange-600"
  },
  {
    id: 5,
    title: "Chatbot Features",
    description: "AI-powered help, guidance & predictive analytics for students & faculty",
    details: "Intelligent AI chatbot providing 24/7 assistance, personalized guidance, predictive analytics, and instant support for students, faculty, and administrators",
    image: "/chatbot-features.png",
    icon: MessageSquare,
    gradient: "from-teal-500 via-cyan-500 to-blue-600",
    bgColor: "bg-teal-50",
    accentColor: "text-teal-600"
  }
];

export const HeroGallery = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedTitle, setSelectedTitle] = useState<string>("");
  const controls = useAnimation();
  const navigate = useNavigate();

  const handleImageClick = (image: string, title: string) => {
    setSelectedImage(image);
    setSelectedTitle(title);
  };

  return (
    <section className="relative py-12 md:py-16 lg:py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50/50 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-4 w-96 h-96 bg-orange-200/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-block mb-4">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-100 via-blue-100 to-green-100 px-6 py-2 rounded-full border-2 border-orange-200/50">
              <Sparkles className="w-5 h-5 text-orange-500" />
              <span className="text-sm md:text-base font-semibold text-gray-700">
                Comprehensive Education Analytics
              </span>
              <Sparkles className="w-5 h-5 text-blue-500" />
            </div>
          </div>

          <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold mb-4 bg-gradient-to-r from-orange-600 via-blue-600 to-green-600 bg-clip-text text-transparent">
            Platform Features at a Glance
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
            Explore our comprehensive suite of analytics and tracking tools
          </p>
        </motion.div>

        {/* Main Content - Side by Side Layout */}
        <div className="max-w-7xl mx-auto">
          {galleryItems.map((item, index) => {
            const Icon = item.icon;
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="mb-12 last:mb-0"
              >
                <Card className="overflow-hidden border-2 border-gray-200 hover:border-gray-300 transition-all duration-300 shadow-lg hover:shadow-xl">
                  <div className={`grid lg:grid-cols-2 gap-0 ${isEven ? '' : 'lg:grid-flow-dense'}`}>
                    {/* Image Side */}
                    <div className={`relative ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                      <div 
                        className="relative aspect-[4/3] lg:aspect-auto lg:h-full bg-gray-100 cursor-pointer group"
                        onClick={() => handleImageClick(item.image, item.title)}
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-contain p-4 lg:p-6 transition-transform group-hover:scale-105"
                        />

                        {/* Gradient Overlay on hover */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                        
                        {/* Click to view indicator */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="bg-white/90 px-4 py-2 rounded-lg shadow-lg">
                            <p className="text-sm font-semibold text-gray-700">Click to view full size</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Content Side */}
                    <div className={`p-6 lg:p-8 flex flex-col justify-center ${isEven ? 'lg:order-2' : 'lg:order-1'} ${item.bgColor}`}>
                      <div className="flex items-start gap-4 mb-4">
                        <motion.div 
                          className={`p-3 rounded-xl bg-gradient-to-br ${item.gradient} shadow-md flex-shrink-0`}
                          whileHover={{ rotate: 360, scale: 1.1 }}
                          transition={{ duration: 0.6 }}
                        >
                          <Icon className="w-7 h-7 text-white" />
                        </motion.div>

                        <div className="flex-1">
                          <h3 className={`text-2xl lg:text-3xl font-bold mb-2 ${item.accentColor} flex items-center gap-2`}>
                            {item.title}
                            <Sparkles className="w-5 h-5 opacity-70" />
                          </h3>
                          <p className="text-sm lg:text-base font-semibold text-gray-700 mb-3">
                            {item.description}
                          </p>
                        </div>
                      </div>

                      <p className="text-gray-600 leading-relaxed mb-4 text-sm lg:text-base">
                        {item.details}
                      </p>

                      <button 
                        onClick={() => navigate('/auth')}
                        className={`flex items-center gap-2 ${item.accentColor} font-semibold text-sm hover:underline cursor-pointer transition-all`}
                      >
                        <span>Learn more about this feature</span>
                        <motion.div
                          animate={{ x: [0, 5, 0] }}
                          transition={{ repeat: Infinity, duration: 1.5 }}
                        >
                          <ChevronRight className="w-5 h-5" />
                        </motion.div>
                      </button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Image Preview Dialog */}
      <Dialog open={selectedImage !== null} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-5xl w-[95vw] max-h-[90vh] overflow-auto p-0">
          <DialogTitle className="sr-only">{selectedTitle}</DialogTitle>
          <div className="relative w-full">
            <img
              src={selectedImage || ""}
              alt={selectedTitle}
              className="w-full h-auto"
            />
          </div>
          <div className="p-4 bg-gray-50 border-t">
            <h3 className="text-lg font-semibold text-gray-800">{selectedTitle}</h3>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};