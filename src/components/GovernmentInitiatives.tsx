
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ExternalLink, Calendar, Users, Award, Construction } from 'lucide-react';

const initiatives = [
  {
    id: 1,
    title: "Pariksha Pe Charcha 2024",
    description: "Participate & Get an Opportunity to Interact with Hon'ble Prime Minister Narendra Modi",
    image: "🎓",
    color: "from-blue-500 to-purple-600",
    badge: "Interactive Session",
    link: "#",
    status: "Open for Registration"
  },
  {
    id: 2,
    title: "Swachh Otsav - Swachhta Hi Seva 2025",
    description: "A Swachh Bharat Mission Initiative - School students across the nation unite for a cleaner India",
    image: "🌱",
    color: "from-green-500 to-teal-600",
    badge: "National Campaign",
    date: "17th September - 2nd October 2025",
    link: "#",
    status: "Upcoming"
  },
  {
    id: 3,
    title: "Viksit Bharat Buildathon 2025",
    description: "A nationwide innovation movement empowering school students to build solutions for a self-reliant India",
    image: "🚀",
    color: "from-orange-500 to-red-600",
    badge: "Innovation Challenge",
    themes: ["Atmanirbhar Bharat", "Swadeshi", "Vocal for Local", "Samriddh Bharat"],
    link: "#",
    status: "Registration Open"
  }
];

export const GovernmentInitiatives = () => {
  const [showFutureDialog, setShowFutureDialog] = useState(false);

  return (
    <section className="py-8 md:py-12 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-1 w-12 bg-gradient-to-r from-orange-500 to-green-600 rounded"></div>
            <Badge className="bg-blue-800 text-white px-4 py-2 text-sm font-semibold">
              Government of India Initiatives
            </Badge>
            <div className="h-1 w-12 bg-gradient-to-r from-green-600 to-orange-500 rounded"></div>
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-800 mb-3">
            National Educational Programs
          </h2>
          <p className="text-sm md:text-base text-slate-600 max-w-2xl mx-auto">
            Join nationwide initiatives by the Ministry of Education to shape India's future
          </p>
        </div>

        {/* Initiatives Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
          {initiatives.map((initiative) => (
            <Card 
              key={initiative.id} 
              className="group hover:shadow-2xl transition-all duration-300 border-2 hover:border-blue-400 overflow-hidden"
            >
              {/* Top Gradient Bar */}
              <div className={`h-2 bg-gradient-to-r ${initiative.color}`}></div>
              
              <CardContent className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="text-5xl">{initiative.image}</div>
                  <Badge className="bg-green-100 text-green-700 border border-green-300">
                    {initiative.status}
                  </Badge>
                </div>

                {/* Title & Badge */}
                <div className="mb-3">
                  <Badge className="bg-blue-50 text-blue-700 border border-blue-200 mb-2">
                    {initiative.badge}
                  </Badge>
                  <h3 className="text-lg md:text-xl font-bold text-slate-800 mb-2 group-hover:text-blue-700 transition-colors">
                    {initiative.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                  {initiative.description}
                </p>

                {/* Date if available */}
                {initiative.date && (
                  <div className="flex items-center gap-2 mb-4 text-sm text-orange-700 bg-orange-50 p-2 rounded border border-orange-200">
                    <Calendar className="w-4 h-4" />
                    <span className="font-medium">{initiative.date}</span>
                  </div>
                )}

                {/* Themes if available */}
                {initiative.themes && (
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {initiative.themes.map((theme, idx) => (
                        <Badge 
                          key={idx} 
                          variant="outline" 
                          className="text-xs bg-gradient-to-r from-orange-50 to-green-50 border-orange-200"
                        >
                          {theme}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Button */}
                <Button 
                  className={`w-full bg-gradient-to-r ${initiative.color} text-white font-semibold hover:shadow-lg transition-all group-hover:scale-105`}
                  onClick={() => setShowFutureDialog(true)}
                >
                  Participate Now
                  <ExternalLink className="ml-2 w-4 h-4" />
                </Button>

                {/* Ministry Badge */}
                <div className="mt-4 pt-4 border-t border-slate-200 flex items-center justify-center gap-2">
                  <div className="w-6 h-6 bg-blue-800 rounded-full flex items-center justify-center">
                    <div className="w-4 h-4 border border-white rounded-full relative flex items-center justify-center">
                      <div className="absolute w-0.5 h-0.5 bg-white rounded-full"></div>
                    </div>
                  </div>
                  <span className="text-xs text-slate-600">Ministry of Education • भारत सरकार</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <Card className="bg-gradient-to-r from-blue-50 via-white to-green-50 border-2 border-blue-200 p-6 max-w-3xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-left">
                <h3 className="text-lg font-bold text-slate-800 mb-1">
                  🇮🇳 Join the Movement for Viksit Bharat
                </h3>
                <p className="text-sm text-slate-600">
                  Be part of India's educational transformation journey
                </p>
              </div>
              <Button 
                className="bg-blue-800 hover:bg-blue-900 text-white font-semibold whitespace-nowrap"
                onClick={() => setShowFutureDialog(true)}
              >
                View All Programs
                <Award className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </Card>
        </div>
      </div>

      {/* Future Implementation Dialog */}
      <Dialog open={showFutureDialog} onOpenChange={setShowFutureDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex items-center justify-center mb-4">
              <div className="h-16 w-16 bg-orange-100 rounded-full flex items-center justify-center">
                <Construction className="h-8 w-8 text-orange-600" />
              </div>
            </div>
            <DialogTitle className="text-center text-xl">Future Implementation</DialogTitle>
            <DialogDescription className="text-center text-base pt-2">
              This feature is yet to be implemented and will be available in the upcoming releases of the National Education Data Platform.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center pt-4">
            <Button onClick={() => setShowFutureDialog(false)} className="bg-blue-600 hover:bg-blue-700">
              Got it
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};
