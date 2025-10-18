import { useState, useRef } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Maximize2, MapPin, BarChart, GraduationCap, TrendingUp, X } from "lucide-react";

const galleryItems = [
  {
    id: 1,
    title: "Campus Events & Interactive Map",
    description: "Navigate campus events, library timings & department success",
    image: "/campus-events.png",
    icon: MapPin,
    gradient: "from-green-500 via-emerald-500 to-teal-600",
    bgColor: "bg-green-50"
  },
  {
    id: 2,
    title: "Scheme Mapping Dashboard",
    description: "Real-time government scheme participation & benefit tracking",
    image: "/scheme-mapping.png",
    icon: BarChart,
    gradient: "from-orange-500 via-amber-500 to-red-600",
    bgColor: "bg-orange-50"
  },
  {
    id: 3,
    title: "Student Life Cycle Tracker",
    description: "Complete journey from enrollment to alumni network",
    image: "/student-lifecycle-tracker.png",
    icon: GraduationCap,
    gradient: "from-blue-600 via-indigo-600 to-blue-700",
    bgColor: "bg-blue-50"
  },
  {
    id: 4,
    title: "Institution Ranking Analytics",
    description: "AI-powered NIRF analysis & compliance metrics",
    image: "/institution-ranking.png",
    icon: TrendingUp,
    gradient: "from-orange-600 via-orange-500 to-amber-600",
    bgColor: "bg-orange-50"
  }
];

const TiltCard = ({ item, onClick }: { item: typeof galleryItems[0], onClick: () => void }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [7.5, -7.5]), {
    stiffness: 300,
    damping: 30
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-7.5, 7.5]), {
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
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className="relative cursor-pointer"
      whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
    >
      <div className={`relative rounded-xl overflow-hidden shadow-2xl border-2 border-gray-200 ${item.bgColor} group`}>
        <div className="relative overflow-hidden aspect-[4/3]">
          <motion.img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover"
            style={{ transformStyle: "preserve-3d", transform: "translateZ(20px)" }}
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          <motion.div 
            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ transformStyle: "preserve-3d", transform: "translateZ(40px)" }}
          >
            <div className="bg-white/90 backdrop-blur-sm rounded-full p-4 shadow-2xl">
              <Maximize2 className="w-8 h-8 text-gray-800" />
            </div>
          </motion.div>
        </div>

        <motion.div 
          className={`absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-br ${item.gradient} text-white`}
          style={{ transformStyle: "preserve-3d", transform: "translateZ(30px)" }}
        >
          <div className="flex items-center gap-3 mb-1">
            <div className="bg-white/20 backdrop-blur-sm p-2 rounded-lg">
              <Icon className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base md:text-lg leading-tight">{item.title}</h3>
          </div>
          <p className="text-xs md:text-sm text-white/90 ml-12">{item.description}</p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export const HeroGallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedTitle, setSelectedTitle] = useState<string>("");

  const handleImageClick = (image: string, title: string) => {
    setSelectedImage(image);
    setSelectedTitle(title);
  };

  return (
    <>
      <section className="relative py-8 md:py-12 bg-gradient-to-br from-gray-50 via-white to-blue-50 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-orange-100/20 via-transparent to-blue-100/20"></div>
        
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="container mx-auto px-4 relative z-10"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-8"
          >
            <motion.div
              animate={{ 
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              className="inline-block"
            >
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold mb-3 bg-gradient-to-r from-orange-600 via-blue-600 to-green-600 bg-clip-text text-transparent bg-[length:200%_auto]">
                Platform Features at a Glance
              </h2>
            </motion.div>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto"
            >
              Hover and click to explore our comprehensive education data analytics
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto perspective-1000">
            {galleryItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 50, rotateX: -20 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.15,
                  ease: [0.25, 0.4, 0.25, 1]
                }}
              >
                <TiltCard 
                  item={item} 
                  onClick={() => handleImageClick(item.image, item.title)} 
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-7xl w-[95vw] p-0 bg-black/95 border-none">
          <DialogTitle className="sr-only">{selectedTitle}</DialogTitle>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative"
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-50 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white rounded-full p-2 transition-all"
            >
              <X className="w-6 h-6" />
            </button>
            {selectedImage && (
              <img
                src={selectedImage}
                alt={selectedTitle}
                className="w-full h-auto rounded-lg"
              />
            )}
          </motion.div>
        </DialogContent>
      </Dialog>
    </>
  );
};
