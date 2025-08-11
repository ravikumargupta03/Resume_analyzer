import React from 'react';
import { BookOpen, Trophy, Target, TrendingUp, Clock, CheckCircle } from 'lucide-react';

interface UserProgress {
  completedModules: number;
  totalModules: number;
  currentStreak: number;
  skillLevel: string;
  recentAchievements: string[];
}

interface DashboardProps {
  userProgress: UserProgress;
  onModuleSelect: (moduleId: string) => void;
  darkMode: boolean;
}

const Dashboard: React.FC<DashboardProps> = ({ userProgress, onModuleSelect, darkMode }) => {
  const progressPercentage = (userProgress.completedModules / userProgress.totalModules) * 100;

  const modules = [
    {
      id: 'resume-writing',
      title: 'Resume Writing',
      description: 'Learn to create compelling resumes',
      icon: BookOpen,
      completed: true,
      duration: '2 hours'
    },
    {
      id: 'interview-prep',
      title: 'Interview Preparation',
      description: 'Master interview techniques',
      icon: Target,
      completed: false,
      duration: '3 hours'
    },
    {
      id: 'networking',
      title: 'Professional Networking',
      description: 'Build valuable connections',
      icon: TrendingUp,
      completed: false,
      duration: '1.5 hours'
    }
  ];

  return (
    <div className={`min-h-screen p-6 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Career Development Dashboard</h1>
          <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Track your progress and continue your learning journey
          </p>
        </div>

        {/* Progress Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className={`p-6 rounded-lg shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex items-center justify-between mb-4">
              <Trophy className="w-8 h-8 text-yellow-500" />
              <span className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {userProgress.completedModules}
              </span>
            </div>
            <h3 className={`font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
              Completed Modules
            </h3>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Out of {userProgress.totalModules} total
            </p>
          </div>

          <div className={`p-6 rounded-lg shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="w-8 h-8 text-green-500" />
              <span className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {Math.round(progressPercentage)}%
              </span>
            </div>
            <h3 className={`font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
              Overall Progress
            </h3>
            <div className={`w-full bg-gray-200 rounded-full h-2 mt-2 ${darkMode ? 'bg-gray-700' : ''}`}>
              <div 
                className="bg-green-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>

          <div className={`p-6 rounded-lg shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex items-center justify-between mb-4">
              <Clock className="w-8 h-8 text-blue-500" />
              <span className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {userProgress.currentStreak}
              </span>
            </div>
            <h3 className={`font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
              Day Streak
            </h3>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Keep it up!
            </p>
          </div>

          <div className={`p-6 rounded-lg shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex items-center justify-between mb-4">
              <Target className="w-8 h-8 text-purple-500" />
              <span className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {userProgress.skillLevel}
              </span>
            </div>
            <h3 className={`font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
              Skill Level
            </h3>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Current level
            </p>
          </div>
        </div>

        {/* Learning Modules */}
        <div className="mb-8">
          <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Learning Modules
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((module) => {
              const IconComponent = module.icon;
              return (
                <div
                  key={module.id}
                  className={`p-6 rounded-lg shadow-lg cursor-pointer transition-all duration-200 hover:shadow-xl ${
                    darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'
                  }`}
                  onClick={() => onModuleSelect(module.id)}
                >
                  <div className="flex items-center justify-between mb-4">
                    <IconComponent className={`w-8 h-8 ${module.completed ? 'text-green-500' : 'text-blue-500'}`} />
                    {module.completed && <CheckCircle className="w-6 h-6 text-green-500" />}
                  </div>
                  <h3 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {module.title}
                  </h3>
                  <p className={`text-sm mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {module.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {module.duration}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      module.completed 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                    }`}>
                      {module.completed ? 'Completed' : 'In Progress'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Achievements */}
        <div className={`p-6 rounded-lg shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Recent Achievements
          </h2>
          <div className="space-y-3">
            {userProgress.recentAchievements.map((achievement, index) => (
              <div key={index} className="flex items-center space-x-3">
                <Trophy className="w-5 h-5 text-yellow-500" />
                <span className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {achievement}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;