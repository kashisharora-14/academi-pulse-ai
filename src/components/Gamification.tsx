import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { 
  Trophy, 
  Star, 
  Medal, 
  Target, 
  Zap, 
  Crown, 
  Gift, 
  Users, 
  BookOpen, 
  Award,
  TrendingUp,
  Calendar,
  CheckCircle
} from "lucide-react";

const achievements = [
  {
    id: 1,
    title: "Academic Excellence",
    description: "Maintain CGPA above 9.0 for 2 semesters",
    icon: Trophy,
    points: 500,
    progress: 85,
    unlocked: false,
    category: "Academic",
    color: "bg-yellow-500"
  },
  {
    id: 2,
    title: "Perfect Attendance",
    description: "100% attendance for a complete semester",
    icon: Calendar,
    progress: 100,
    unlocked: true,
    category: "Discipline",
    color: "bg-green-500"
  },
  {
    id: 3,
    title: "Certification Master",
    description: "Complete 5 professional certifications",
    icon: Medal,
    progress: 100,
    unlocked: true,
    category: "Skills",
    color: "bg-blue-500"
  },
  {
    id: 4,
    title: "Research Pioneer",
    description: "Publish a research paper",
    icon: BookOpen,
    progress: 60,
    unlocked: false,
    category: "Research",
    color: "bg-purple-500"
  },
  {
    id: 5,
    title: "Community Helper",
    description: "Participate in 10 community service activities",
    icon: Users,
    progress: 70,
    unlocked: false,
    category: "Social",
    color: "bg-pink-500"
  },
  {
    id: 6,
    title: "Innovation Champion",
    description: "Win a hackathon or innovation contest",
    icon: Zap,
    progress: 0,
    unlocked: false,
    category: "Innovation",
    color: "bg-orange-500"
  }
];

const leaderboard = [
  { rank: 1, name: "Priya Sharma", points: 2850, level: "Diamond", avatar: "PS" },
  { rank: 2, name: "Rahul Kumar", points: 2720, level: "Diamond", avatar: "RK" },
  { rank: 3, name: "Anita Singh", points: 2650, level: "Platinum", avatar: "AS" },
  { rank: 4, name: "Vikash Raj", points: 2480, level: "Platinum", avatar: "VR" },
  { rank: 5, name: "You", points: 2350, level: "Platinum", avatar: "YO", isCurrentUser: true },
  { rank: 6, name: "Neha Gupta", points: 2200, level: "Gold", avatar: "NG" },
  { rank: 7, name: "Amit Patel", points: 2150, level: "Gold", avatar: "AP" },
  { rank: 8, name: "Sneha Das", points: 2050, level: "Gold", avatar: "SD" }
];

const challenges = [
  {
    id: 1,
    title: "7-Day Study Streak",
    description: "Study for at least 2 hours daily for 7 consecutive days",
    progress: 5,
    target: 7,
    reward: 150,
    expires: "2 days",
    difficulty: "Easy",
    icon: BookOpen
  },
  {
    id: 2,
    title: "Assignment Sprint",
    description: "Submit all assignments 2 days before deadline",
    progress: 2,
    target: 4,
    reward: 200,
    expires: "1 week",
    difficulty: "Medium",
    icon: Target
  },
  {
    id: 3,
    title: "Skill Builder",
    description: "Complete 3 online courses this month",
    progress: 1,
    target: 3,
    reward: 300,
    expires: "3 weeks",
    difficulty: "Hard",
    icon: Star
  }
];

const playerStats = {
  level: 24,
  currentXP: 2350,
  nextLevelXP: 2500,
  totalPoints: 8750,
  rank: 5,
  streak: 12,
  unlockedAchievements: 8,
  totalAchievements: 15
};

export const Gamification = () => {
  const xpProgress = (playerStats.currentXP / playerStats.nextLevelXP) * 100;

  return (
    <div className="space-y-6">
      {/* Player Stats Header */}
      <Card className="p-6 bg-gradient-to-r from-purple-500 to-blue-600 text-white">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
              <Crown className="h-8 w-8" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Level {playerStats.level}</h2>
              <p className="text-white/80">Platinum Scholar</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">{playerStats.totalPoints}</div>
            <div className="text-white/80">Total Points</div>
          </div>
        </div>

        <div className="mb-2">
          <div className="flex justify-between text-sm">
            <span>XP Progress</span>
            <span>{playerStats.currentXP}/{playerStats.nextLevelXP}</span>
          </div>
          <Progress value={xpProgress} className="h-2 bg-white/20" />
        </div>

        <div className="grid grid-cols-4 gap-4 mt-4">
          <div className="text-center">
            <div className="text-xl font-bold">{playerStats.rank}</div>
            <div className="text-xs text-white/80">Rank</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold">{playerStats.streak}</div>
            <div className="text-xs text-white/80">Day Streak</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold">{playerStats.unlockedAchievements}</div>
            <div className="text-xs text-white/80">Achievements</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold">94%</div>
            <div className="text-xs text-white/80">Completion</div>
          </div>
        </div>
      </Card>

      {/* Recognition & Achievements */}
      <div className="grid gap-6 lg:grid-cols-2 mb-6">
        <Card className="p-6">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Star className="h-6 w-6 text-yellow-500" />
            Academic Recognition
          </h3>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">8.9</div>
              <div className="text-sm text-yellow-700">Current CGPA</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">#23</div>
              <div className="text-sm text-blue-700">College Rank</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">92%</div>
              <div className="text-sm text-green-700">Attendance</div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold">Recent Achievements</h4>
            {[
              { action: "Completed Data Structures Course", grade: "A+", time: "2 hours ago" },
              { action: "Perfect Attendance (Week 12)", status: "Recognized", time: "1 day ago" },
              { action: "Peer Teaching Session", status: "Completed", time: "3 days ago" },
              { action: "Research Paper Submission", grade: "A", time: "1 week ago" }
            ].map((activity, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <div>
                  <p className="font-medium text-sm">{activity.action}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
                <Badge className="bg-success">{activity.grade || activity.status}</Badge>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Trophy className="h-6 w-6 text-amber-500" />
            Class Performance
          </h3>
          <div className="space-y-3">
            {[
              { name: "Priya Sharma", cgpa: 9.5, rank: 1 },
              { name: "Rahul Gupta", cgpa: 9.2, rank: 2 },
              { name: "Anita Patel", cgpa: 9.1, rank: 3 },
              { name: "Arjun Patel (You)", cgpa: 8.9, rank: 23 },
            ].map((student, index) => (
              <div key={index} className={`flex items-center justify-between p-3 rounded ${student.name.includes('(You)') ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50'}`}>
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    index === 0 ? 'bg-yellow-500 text-white' :
                    index === 1 ? 'bg-gray-400 text-white' :
                    index === 2 ? 'bg-amber-600 text-white' : 'bg-blue-500 text-white'
                  }`}>
                    {student.rank}
                  </div>
                  <div>
                    <p className="font-medium">{student.name}</p>
                    <p className="text-sm text-muted-foreground">CGPA: {student.cgpa}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Active Challenges */}
      <Card className="p-6">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Target className="h-6 w-6 text-orange-500" />
          Active Challenges
        </h3>
        <div className="grid gap-4 lg:grid-cols-3">
          {challenges.map((challenge) => (
            <div key={challenge.id} className="p-4 border rounded-lg">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                  <challenge.icon className="h-5 w-5 text-orange-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold">{challenge.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    {challenge.description}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Progress</span>
                  <span className="text-sm font-medium">
                    {challenge.progress}/{challenge.target}
                  </span>
                </div>
                <Progress value={(challenge.progress / challenge.target) * 100} />

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {challenge.difficulty}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      Expires in {challenge.expires}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-sm font-medium">
                    <Gift className="h-4 w-4 text-green-500" />
                    {challenge.reward}
                  </div>
                </div>

                <Button size="sm" className="w-full">
                  Continue Challenge
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Achievements */}
      <Card className="p-6">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Trophy className="h-6 w-6 text-yellow-500" />
            Achievements
          </h3>
          <div className="space-y-4">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`p-4 rounded-lg border-2 ${
                  achievement.unlocked 
                    ? 'border-yellow-200 bg-yellow-50' 
                    : 'border-gray-200 bg-gray-50'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-full ${achievement.color} flex items-center justify-center ${
                    !achievement.unlocked ? 'opacity-50' : ''
                  }`}>
                    <achievement.icon className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold">{achievement.title}</h4>
                      {achievement.unlocked && (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {achievement.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {achievement.category}
                        </Badge>
                        <span className="text-sm font-medium">
                          {achievement.points} points
                        </span>
                      </div>
                      <div className="text-sm">
                        {achievement.progress}%
                      </div>
                    </div>
                    <Progress value={achievement.progress} className="mt-2" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Leaderboard */}
        <Card className="p-6">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-blue-500" />
            Class Leaderboard
          </h3>
          <div className="space-y-3">
            {leaderboard.map((player) => (
              <div
                key={player.rank}
                className={`flex items-center gap-3 p-3 rounded-lg ${
                  player.isCurrentUser ? 'bg-blue-50 border-2 border-blue-200' : 'bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${
                    player.rank === 1 ? 'bg-yellow-500' :
                    player.rank === 2 ? 'bg-gray-400' :
                    player.rank === 3 ? 'bg-orange-600' : 'bg-gray-600'
                  }`}>
                    {player.rank <= 3 ? (
                      <Crown className="h-4 w-4" />
                    ) : (
                      player.rank
                    )}
                  </div>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-400 to-blue-500 flex items-center justify-center text-white text-sm font-bold">
                    {player.avatar}
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className={`font-medium ${player.isCurrentUser ? 'text-blue-600' : ''}`}>
                      {player.name}
                    </span>
                    <div className="text-right">
                      <div className="font-bold">{player.points}</div>
                      <Badge variant="outline" className="text-xs">
                        {player.level}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
    </div>
  );
};