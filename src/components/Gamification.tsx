
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  Trophy, 
  Star, 
  Zap, 
  Target, 
  BookOpen, 
  Award,
  Gift,
  Sparkles,
  PartyPopper
} from "lucide-react";

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  points: number;
  unlocked: boolean;
  category: "academic" | "scheme" | "milestone" | "ai";
}

interface PartyPopup {
  id: string;
  title: string;
  message: string;
  type: "achievement" | "milestone" | "recommendation";
  show: boolean;
}

const achievements: Achievement[] = [
  {
    id: "first_login",
    title: "Welcome Explorer!",
    description: "Completed your first login to NEDP",
    icon: Star,
    points: 50,
    unlocked: true,
    category: "milestone"
  },
  {
    id: "ai_interaction",
    title: "AI Whisperer",
    description: "Had your first conversation with EduBot",
    icon: Zap,
    points: 100,
    unlocked: true,
    category: "ai"
  },
  {
    id: "scheme_eligible",
    title: "Opportunity Finder",
    description: "AI found 3+ schemes you're eligible for",
    icon: Gift,
    points: 200,
    unlocked: true,
    category: "scheme"
  },
  {
    id: "high_performer",
    title: "Academic Star",
    description: "Maintained 8.5+ CGPA for 2 semesters",
    icon: Trophy,
    points: 500,
    unlocked: false,
    category: "academic"
  },
  {
    id: "research_contributor",
    title: "Research Pioneer",
    description: "Published your first research paper",
    icon: BookOpen,
    points: 1000,
    unlocked: false,
    category: "academic"
  },
  {
    id: "scheme_beneficiary",
    title: "Scheme Champion",
    description: "Successfully enrolled in 5+ government schemes",
    icon: Award,
    points: 750,
    unlocked: false,
    category: "scheme"
  }
];

export const Gamification = () => {
  const [userPoints, setUserPoints] = useState(350);
  const [currentLevel, setCurrentLevel] = useState(2);
  const [partyPopup, setPartyPopup] = useState<PartyPopup | null>(null);
  const [showAchievements, setShowAchievements] = useState(false);

  const unlockedAchievements = achievements.filter(a => a.unlocked);
  const nextLevelPoints = currentLevel * 500;
  const progressToNext = (userPoints % 500) / 500 * 100;

  useEffect(() => {
    // Simulate party popup for new achievement
    const timer = setTimeout(() => {
      setPartyPopup({
        id: "ai_recommendation",
        title: "🎉 AI Found Perfect Match!",
        message: "The AI discovered 2 new scholarships worth ₹50,000 that match your profile perfectly!",
        type: "recommendation",
        show: true
      });
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const closePartyPopup = () => {
    setPartyPopup(null);
  };

  const triggerNewAchievement = () => {
    setPartyPopup({
      id: "new_achievement",
      title: "🏆 Achievement Unlocked!",
      message: "Congratulations! You've earned the 'Data Explorer' badge for viewing your complete academic timeline!",
      type: "achievement",
      show: true
    });
    setUserPoints(prev => prev + 150);
  };

  return (
    <div className="space-y-6">
      {/* Level Progress Card */}
      <Card className="p-6 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-bold">Level {currentLevel} Scholar</h3>
              <p className="text-sm text-muted-foreground">{userPoints} points earned</p>
            </div>
          </div>
          <Badge className="bg-accent text-white">
            {nextLevelPoints - userPoints} to next level
          </Badge>
        </div>
        
        <div className="w-full bg-muted rounded-full h-3 mb-2">
          <div 
            className="bg-gradient-to-r from-primary to-accent h-3 rounded-full transition-all duration-500"
            style={{ width: `${progressToNext}%` }}
          />
        </div>
        <p className="text-xs text-muted-foreground text-center">
          {progressToNext.toFixed(0)}% progress to Level {currentLevel + 1}
        </p>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <Button 
          onClick={() => setShowAchievements(true)}
          className="h-16 flex flex-col gap-1"
          variant="outline"
        >
          <Trophy className="h-5 w-5" />
          <span className="text-sm">View Achievements</span>
        </Button>
        <Button 
          onClick={triggerNewAchievement}
          className="h-16 flex flex-col gap-1"
        >
          <Target className="h-5 w-5" />
          <span className="text-sm">Explore Timeline</span>
        </Button>
      </div>

      {/* Recent Achievements */}
      <Card className="p-4">
        <h4 className="font-semibold mb-3 flex items-center gap-2">
          <Award className="h-4 w-4" />
          Recent Achievements
        </h4>
        <div className="space-y-2">
          {unlockedAchievements.slice(0, 3).map((achievement) => (
            <div key={achievement.id} className="flex items-center gap-3 p-2 rounded-lg bg-muted/50">
              <achievement.icon className="h-5 w-5 text-primary" />
              <div className="flex-1">
                <p className="text-sm font-medium">{achievement.title}</p>
                <p className="text-xs text-muted-foreground">{achievement.description}</p>
              </div>
              <Badge variant="secondary" className="text-xs">
                +{achievement.points}
              </Badge>
            </div>
          ))}
        </div>
      </Card>

      {/* Party Popup Dialog */}
      {partyPopup && (
        <Dialog open={partyPopup.show} onOpenChange={closePartyPopup}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="text-center text-xl flex items-center gap-2 justify-center">
                <PartyPopper className="h-6 w-6 text-primary animate-bounce" />
                {partyPopup.title}
              </DialogTitle>
            </DialogHeader>
            <div className="text-center py-4">
              <div className="mb-4 flex justify-center">
                {partyPopup.type === "recommendation" ? (
                  <div className="h-16 w-16 rounded-full bg-accent/20 flex items-center justify-center animate-pulse">
                    <Zap className="h-8 w-8 text-accent" />
                  </div>
                ) : (
                  <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center animate-pulse">
                    <Trophy className="h-8 w-8 text-primary" />
                  </div>
                )}
              </div>
              <p className="text-muted-foreground mb-6">{partyPopup.message}</p>
              <Button onClick={closePartyPopup} className="w-full">
                Awesome! Continue
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Achievements Modal */}
      <Dialog open={showAchievements} onOpenChange={setShowAchievements}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Trophy className="h-6 w-6 text-primary" />
              Your Achievements
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 mt-4">
            {achievements.map((achievement) => (
              <Card 
                key={achievement.id} 
                className={`p-4 ${achievement.unlocked ? 'border-primary/50 bg-primary/5' : 'opacity-60'}`}
              >
                <div className="flex items-center gap-4">
                  <div className={`h-12 w-12 rounded-full flex items-center justify-center ${
                    achievement.unlocked ? 'bg-primary/20' : 'bg-muted'
                  }`}>
                    <achievement.icon className={`h-6 w-6 ${
                      achievement.unlocked ? 'text-primary' : 'text-muted-foreground'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold">{achievement.title}</h4>
                    <p className="text-sm text-muted-foreground">{achievement.description}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant={achievement.unlocked ? "default" : "secondary"}>
                        {achievement.category}
                      </Badge>
                      <Badge variant="outline">
                        {achievement.points} points
                      </Badge>
                    </div>
                  </div>
                  {achievement.unlocked && (
                    <div className="text-green-500">
                      <Trophy className="h-5 w-5" />
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
