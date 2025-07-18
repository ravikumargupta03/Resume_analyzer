import React from 'react';
import { 
  Target, 
  Trophy, 
  Clock, 
  TrendingUp, 
  CheckCircle,
  ArrowRight,
  Star,
  Zap,
  Users,
  Calendar,
  Award
} from 'lucide-react';

interface DashboardProps {
  userProgress: {
    resumeAnalyzed: boolean;
    roadmapCreated: boolean;
    interviewsCompleted: number;
    applicationsSubmitted: number;
    skillsLearned: number;
  };
  onModuleSelect: (module: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ userProgress, onModuleSelect }) => {
  const completionPercentage = Math.round(
    ((userProgress.resumeAnalyzed ? 1 : 0) +
     (userProgress.roadmapCreated ? 1 : 0) +
     (userProgress.interviewsCompleted > 0 ? 1 : 0) +
     (userProgress.applicationsSubmitted > 0 ? 1 : 0) +
     (userProgress.skillsLearned > 0 ? 1 : 0)) / 5 * 100
  );

  const quickActions = [
    {
      title: 'Analyze Resume',
      description: 'Get your skill gap analysis and match percentage',
      icon: Target,
      color: 'bg-blue-500',
      module: 'resume',
      completed: userProgress.resumeAnalyzed
    },
    {
      title: 'Create Roadmap',
      description: 'Build your personalized learning path',
      icon: TrendingUp,
      color: 'bg-purple-500',
      module: 'roadmap',
      completed: userProgress.roadmapCreated
    },
    {
      title: 'Practice Interviews',
      description: 'Simulate real interviews with AI feedback',
      icon: Zap,
      color: 'bg-green-500',
      module: 'interview',
      completed: userProgress.interviewsCompleted > 0
    },
    {
      title: 'Track Applications',
      description: 'Manage your job applications in one place',
      icon: CheckCircle,
      color: 'bg-orange-500',
      module: 'tracker',
      completed: userProgress.applicationsSubmitted > 0
    }
  ];

  const achievements = [
    { label: 'Interviews Completed', value: userProgress.interviewsCompleted, icon: Trophy, color: 'from-yellow-400 to-orange-500' },
    { label: 'Applications Submitted', value: userProgress.applicationsSubmitted, icon: Target, color: 'from-blue-400 to-purple-500' },
    { label: 'Skills Learned', value: userProgress.skillsLearned, icon: Star, color: 'from-green-400 to-emerald-500' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-6 shadow-lg animate-float">
          <Zap className="h-10 w-10 text-white" />
        </div>
        <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent mb-6">
          Accelerate Your Career Journey
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          From resume analysis to job offers - your AI-powered career companion guides you every step of the way
        </p>
        <div className="flex items-center justify-center space-x-6 mt-8 text-sm text-gray-500">
          <div className="flex items-center space-x-2">
            <Users className="h-4 w-4" />
            <span>10,000+ users</span>
          </div>
          <div className="flex items-center space-x-2">
            <Award className="h-4 w-4" />
            <span>95% success rate</span>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4" />
            <span>Avg 30 days to offer</span>
          </div>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-100 p-8 mb-8 hover:shadow-2xl transition-all duration-300">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Your Progress</h2>
            <p className="text-gray-600 mt-1">Track your journey to success</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-40 h-3 bg-gray-200 rounded-full overflow-hidden shadow-inner">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-1000 ease-out shadow-sm animate-glow"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
            <span className="text-lg font-bold text-gray-900">{completionPercentage}%</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon;
            return (
              <div key={index} className="text-center group">
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${achievement.color} rounded-2xl mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{achievement.value}</div>
                <div className="text-sm text-gray-600 font-medium">{achievement.label}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {quickActions.map((action, index) => {
          const Icon = action.icon;
          return (
            <div
              key={index}
              className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-100 p-8 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer group"
              onClick={() => onModuleSelect(action.module)}
            >
              <div className="flex items-start space-x-6">
                <div className={`${action.color} rounded-2xl p-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}>
                  <Icon className="h-7 w-7 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="text-xl font-bold text-gray-900">{action.title}</h3>
                    {action.completed && (
                      <div className="flex items-center justify-center w-6 h-6 bg-green-100 rounded-full">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      </div>
                    )}
                  </div>
                  <p className="text-gray-600 mb-4 leading-relaxed">{action.description}</p>
                  <div className="flex items-center text-blue-600 font-semibold group-hover:text-blue-700">
                    <span>Get Started</span>
                    <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-100 p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Recent Activity</h2>
            <p className="text-gray-600 mt-1">Your latest achievements</p>
          </div>
          <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">View All</button>
        </div>
        <div className="space-y-6">
          {[
            { action: 'Resume analyzed', time: '2 hours ago', status: 'completed', score: '78%' },
            { action: 'Learning roadmap created', time: '1 day ago', status: 'completed', score: '5 skills' },
            { action: 'Mock interview scheduled', time: '3 days ago', status: 'pending', score: 'Tomorrow' },
          ].map((item, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors duration-200">
              <div className="flex items-center space-x-4">
                <div className={`w-3 h-3 rounded-full ${
                  item.status === 'completed' ? 'bg-green-500' : 'bg-yellow-500'
                }`} />
                <div>
                  <span className="text-gray-900 font-semibold">{item.action}</span>
                  <div className="text-gray-500 text-sm">{item.time}</div>
                </div>
              </div>
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                item.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
              }`}>
                {item.score}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;