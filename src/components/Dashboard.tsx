import React from 'react';
import { 
  Target, 
  Trophy, 
  Clock, 
  TrendingUp, 
  CheckCircle,
  ArrowRight,
  Star,
  Zap
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
    { label: 'Interviews Completed', value: userProgress.interviewsCompleted, icon: Trophy },
    { label: 'Applications Submitted', value: userProgress.applicationsSubmitted, icon: Target },
    { label: 'Skills Learned', value: userProgress.skillsLearned, icon: Star },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Accelerate Your Career Journey
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          From resume analysis to job offers - your AI-powered career companion guides you every step of the way
        </p>
      </div>

      {/* Progress Overview */}
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Your Progress</h2>
          <div className="flex items-center space-x-2">
            <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
            <span className="text-sm font-medium text-gray-600">{completionPercentage}%</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon;
            return (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-3">
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-gray-900">{achievement.value}</div>
                <div className="text-sm text-gray-600">{achievement.label}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {quickActions.map((action, index) => {
          const Icon = action.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 cursor-pointer group"
              onClick={() => onModuleSelect(action.module)}
            >
              <div className="flex items-start space-x-4">
                <div className={`${action.color} rounded-xl p-3 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{action.title}</h3>
                    {action.completed && (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    )}
                  </div>
                  <p className="text-gray-600 mb-3">{action.description}</p>
                  <div className="flex items-center text-blue-600 font-medium group-hover:text-blue-700">
                    <span className="text-sm">Get Started</span>
                    <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {[
            { action: 'Resume analyzed', time: '2 hours ago', status: 'completed' },
            { action: 'Learning roadmap created', time: '1 day ago', status: 'completed' },
            { action: 'Mock interview scheduled', time: '3 days ago', status: 'pending' },
          ].map((item, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className={`w-2 h-2 rounded-full ${
                item.status === 'completed' ? 'bg-green-500' : 'bg-yellow-500'
              }`} />
              <span className="text-gray-900 font-medium">{item.action}</span>
              <span className="text-gray-500 text-sm">{item.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;