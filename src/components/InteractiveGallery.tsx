import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Maximize2, MapPin, BarChart, GraduationCap, TrendingUp } from "lucide-react";

const galleryItems = [
  {
    id: 1,
    title: "Campus Events & Interactive Map",
    description: "Navigate through campus events, library timings, department success metrics, and university rankings with an interactive map interface",
    image: "/campus-events.png",
    icon: MapPin,
    color: "from-green-500 to-emerald-600"
  },
  {
    id: 2,
    title: "Scheme Mapping Dashboard",
    description: "Track government scheme participation and benefit distribution with real-time monitoring and comprehensive analytics",
    image: "/scheme-mapping.png",
    icon: BarChart,
    color: "from-orange-500 to-red-600"
  },
  {
    id: 3,
    title: "National Student Life Cycle Tracker",
    description: "Seamless journey from enrollment to alumni with complete academic performance metrics, projects, and alumni network tracking",
    image: "/student-lifecycle-tracker.png",
    icon: GraduationCap,
    color: "from-blue-600 to-blue-700"
  },
  {
    id: 4,
    title: "Institution Ranking Analytics",
    description: "AI-powered analysis using NIRF parameters, compliance metrics, and scheme participation data for comprehensive institution evaluation",
    image: "/institution-ranking.png",
    icon: TrendingUp,
    color: "from-orange-600 to-orange-700"
  }
];

export const InteractiveGallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedTitle, setSelectedTitle] = useState<string>("");

  const handleImageClick = (image: string, title: string) => {
    setSelectedImage(image);
    setSelectedTitle(title);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-600 via-blue-600 to-green-600 bg-clip-text text-transparent">
            Interactive Platform Features
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our comprehensive analytics and tracking systems through interactive visualizations
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {galleryItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card 
                  className="group cursor-pointer overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 hover:border-primary/50"
                  onClick={() => handleImageClick(item.image, item.title)}
                >
                  <CardContent className="p-0">
                    <div className="relative">
                      <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-10 group-hover:opacity-20 transition-opacity duration-300`} />
                      
                      <div className="relative overflow-hidden aspect-video bg-gray-100">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                        
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                          <motion.div
                            initial={{ scale: 0 }}
                            whileHover={{ scale: 1 }}
                            className="bg-white rounded-full p-4 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          >
                            <Maximize2 className="w-8 h-8 text-primary" />
                          </motion.div>
                        </div>
                      </div>

                      <div className="p-6 bg-white">
                        <div className="flex items-start gap-3 mb-3">
                          <div className={`p-3 rounded-lg bg-gradient-to-br ${item.color} shadow-md`}>
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                              {item.title}
                            </h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                              {item.description}
                            </p>
                          </div>
                        </div>
                        
                        <div className="mt-4 flex items-center text-primary font-medium text-sm">
                          <span>Click to view full size</span>
                          <motion.span
                            animate={{ x: [0, 5, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                            className="ml-2"
                          >
                            →
                          </motion.span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>

      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-7xl w-full p-2 bg-white">
          <DialogTitle className="sr-only">{selectedTitle}</DialogTitle>
          {selectedImage && (
            <div className="relative">
              <img
                src={selectedImage}
                alt={selectedTitle}
                className="w-full h-auto rounded-lg"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};
