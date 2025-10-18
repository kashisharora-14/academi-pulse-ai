import { useState, useRef, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { motion, useMotionValue, useSpring, useTransform, useAnimation } from "framer-motion";
import { Maximize2, MapPin, BarChart, GraduationCap, TrendingUp, MessageSquare, X, Sparkles } from "lucide-react";

const galleryItems = [
  {
    id: 1,
    title: "Campus Events & Interactive Map",
    description: "Navigate campus events, library timings & department success",
    image: "/campus-events.png",
    icon: MapPin,
    gradient: "from-green-500 via-emerald-500 to-teal-600",
    bgColor: "bg-green-50",
    particleColor: "#10b981"
  },
  {
    id: 2,
    title: "Scheme Mapping Dashboard",
    description: "Real-time government scheme participation & benefit tracking",
    image: "/scheme-mapping.png",
    icon: BarChart,
    gradient: "from-orange-500 via-amber-500 to-red-600",
    bgColor: "bg-orange-50",
    particleColor: "#f97316"
  },
  {
    id: 3,
    title: "Student Life Cycle Tracker",
    description: "Complete journey from enrollment to alumni network",
    image: "/student-lifecycle-tracker.png",
    icon: GraduationCap,
    gradient: "from-blue-600 via-indigo-600 to-blue-700",
    bgColor: "bg-blue-50",
    particleColor: "#3b82f6"
  },
  {
    id: 4,
    title: "Institution Ranking Analytics",
    description: "AI-powered NIRF analysis & compliance metrics",
    image: "/institution-ranking.png",
    icon: TrendingUp,
    gradient: "from-orange-600 via-orange-500 to-amber-600",
    bgColor: "bg-orange-50",
    particleColor: "#ea580c"
  },
  {
    id: 5,
    title: "Chatbot Features",
    description: "AI-powered help, guidance & predictive analytics for students & faculty",
    image: "/chatbot-features.png",
    icon: MessageSquare,
    gradient: "from-teal-500 via-cyan-500 to-blue-600",
    bgColor: "bg-teal-50",
    particleColor: "#14b8a6"
  }
];

const FloatingParticles = ({ color }: { color: string }) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full"
          style={{ backgroundColor: color }}
          initial={{ 
            x: Math.random() * 100 + "%", 
            y: Math.random() * 100 + "%",
            opacity: 0
          }}
          animate={{
            y: [null, "-100%"],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeOut"
          }}
        />
      ))}
    </div>
  );
};

const TiltCard = ({ item, onClick, index }: { item: typeof galleryItems[0], onClick: () => void, index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), {
    stiffness: 300,
    damping: 30
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), {
    stiffness: 300,
    damping: 30
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set((e.clientX - centerX) / rect.width);
    mouseY.set((e.clientY - centerY) / rect.height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  const Icon = item.icon;

  return (
    <motion.div
      ref={cardRef}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className="relative cursor-pointer h-full"
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        ease: [0.25, 0.4, 0.25, 1]
      }}
      whileHover={{ 
        scale: 1.05, 
        transition: { duration: 0.3 },
        zIndex: 10
      }}
    >
      <div className={`relative rounded-2xl overflow-hidden shadow-2xl border-2 border-gray-200 ${item.bgColor} group h-full`}>
        {/* Floating Particles */}
        <FloatingParticles color={item.particleColor} />
        
        {/* Shine Effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30"
          initial={{ x: "-100%" }}
          animate={isHovered ? { x: "100%" } : { x: "-100%" }}
          transition={{ duration: 0.8 }}
        />

        <div className="relative overflow-hidden aspect-[16/10]">
          <motion.img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-contain bg-white"
            style={{ 
              transformStyle: "preserve-3d", 
              transform: "translateZ(30px)" 
            }}
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Magnify Icon with Ripple Effect */}
          <motion.div 
            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ transformStyle: "preserve-3d", transform: "translateZ(50px)" }}
          >
            <motion.div 
              className="relative"
              initial={{ scale: 0 }}
              animate={isHovered ? { scale: 1 } : { scale: 0 }}
              transition={{ duration: 0.3, ease: "backOut" }}
            >
              <motion.div
                className="absolute inset-0 bg-white/30 rounded-full"
                animate={isHovered ? { 
                  scale: [1, 2, 2.5],
                  opacity: [0.5, 0.2, 0]
                } : {}}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <div className="relative bg-white/95 backdrop-blur-sm rounded-full p-4 shadow-2xl">
                <Maximize2 className="w-8 h-8 text-gray-800" />
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Card Footer with Solid Gradient Background */}
        <motion.div 
          className={`absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-br ${item.gradient} text-white shadow-lg`}
          style={{ transformStyle: "preserve-3d", transform: "translateZ(40px)" }}
        >
          <div className="flex items-center gap-3 mb-2">
            <motion.div 
              className="bg-white/30 backdrop-blur-sm p-2.5 rounded-lg shadow-md"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <Icon className="w-5 h-5 text-white drop-shadow-lg" />
            </motion.div>
            <h3 className="font-bold text-base md:text-lg leading-tight flex items-center gap-2 drop-shadow-md">
              {item.title}
              <Sparkles className="w-4 h-4 opacity-90 drop-shadow-md" />
            </h3>
          </div>
          <p className="text-xs md:text-sm text-white font-medium ml-12 leading-relaxed drop-shadow-md">
            {item.description}
          </p>
        </motion.div>

        {/* Glow Effect */}
        <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${item.gradient} blur-xl -z-10`} 
             style={{ transform: "translateZ(-10px)" }} 
        />
      </div>
    </motion.div>
  );
};

export const HeroGallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedTitle, setSelectedTitle] = useState<string>("");
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
      transition: { duration: 8, repeat: Infinity, ease: "linear" }
    });
  }, [controls]);

  const handleImageClick = (image: string, title: string) => {
    setSelectedImage(image);
    setSelectedTitle(title);
  };

  return (
    <>
      <section className="relative py-8 md:py-12 lg:py-16 bg-gradient-to-br from-gray-50 via-white to-blue-50/50 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 -left-4 w-96 h-96 bg-orange-200/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-green-200/20 rounded-full blur-3xl animate-pulse delay-500" />
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="container mx-auto px-4 relative z-10"
        >
          {/* Enhanced Header */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-10 md:mb-12"
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

            <motion.h2 
              animate={controls}
              className="text-3xl md:text-5xl lg:text-6xl font-extrabold mb-4 bg-gradient-to-r from-orange-600 via-blue-600 to-green-600 bg-clip-text text-transparent bg-[length:200%_auto]"
            >
              Platform Features at a Glance
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed"
            >
              Hover and interact with our feature cards • Click to view detailed analytics
            </motion.p>
          </motion.div>

          {/* Gallery Grid - 5 items responsive layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-5 max-w-[1600px] mx-auto perspective-1000">
            {galleryItems.map((item, index) => (
              <div key={item.id} className="h-full">
                <TiltCard 
                  item={item} 
                  onClick={() => handleImageClick(item.image, item.title)} 
                  index={index}
                />
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Enhanced Modal */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-5xl w-[90vw] p-4 bg-white border-none">
          <DialogTitle className="sr-only">{selectedTitle}</DialogTitle>
          <motion.div
            initial={{ scale: 0.8, opacity: 0, rotateX: -20 }}
            animate={{ scale: 1, opacity: 1, rotateX: 0 }}
            exit={{ scale: 0.8, opacity: 0, rotateX: 20 }}
            transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
            className="relative"
          >
            <motion.button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-2 -right-2 z-50 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 transition-all shadow-lg"
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="w-5 h-5" />
            </motion.button>
            {selectedImage && (
              <motion.img
                src={selectedImage}
                alt={selectedTitle}
                className="w-full h-auto rounded-lg max-h-[80vh] object-contain"
                layoutId={selectedImage}
              />
            )}
          </motion.div>
        </DialogContent>
      </Dialog>
    </>
  );
};
