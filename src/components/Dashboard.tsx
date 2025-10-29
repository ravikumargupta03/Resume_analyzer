import React from 'react';
import { 
  BookOpen, 
  Trophy, 
  Target, 
  TrendingUp, 
  Clock, 
  CheckCircle,
  FileText,
  MessageCircle,
  Briefcase,
  Video,
  Brain,
  Star,
  Award,
  Users,
  Zap,
  ArrowRight,
  Play,
  Calendar,
  BarChart3,
  Sparkles,
  Globe,
  Mail,
  Heart
} from 'lucide-react';

interface UserProgress {
  completedModules: number;
  totalModules: number;
  currentStreak: number;
  skillLevel: string;
  recentAchievements: string[];
  resumeAnalyzed?: boolean;
  roadmapCreated?: boolean;
  interviewsCompleted?: number;
  applicationsSubmitted?: number;
  skillsLearned?: number;
  analysisData?: any;
}

interface DashboardProps {
  userProgress: UserProgress;
  onModuleSelect: (moduleId: string) => void;
  darkMode: boolean;
}

const Dashboard: React.FC<DashboardProps> = ({ userProgress, onModuleSelect, darkMode }) => {
  const progressPercentage = Math.round(
    ((userProgress.resumeAnalyzed ? 1 : 0) +
     (userProgress.roadmapCreated ? 1 : 0) +
     (userProgress.interviewsCompleted || 0) +
     (userProgress.applicationsSubmitted || 0) / 5 +
     (userProgress.skillsLearned || 0) / 10) / 5 * 100
  );

  const features = [
    {
      id: 'resume',
      title: 'AI Resume Analyzer',
      description: 'Get instant feedback on your resume with ATS compatibility scoring',
      icon: FileText,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      textColor: 'text-blue-600 dark:text-blue-400',
      completed: userProgress.resumeAnalyzed,
      stats: '95% ATS Pass Rate',
      features: ['ATS Optimization', 'Skill Gap Analysis', 'Industry Matching']
    },
    {
      id: 'roadmap',
      title: 'Learning Roadmap',
      description: 'Personalized learning path based on your career goals',
      icon: Target,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      textColor: 'text-purple-600 dark:text-purple-400',
      completed: userProgress.roadmapCreated,
      stats: '8-Week Program',
      features: ['Custom Learning Path', 'Skill Development', 'Project-Based Learning']
    },
    {
      id: 'interview',
      title: 'Interview Simulator',
      description: 'Practice with AI-powered mock interviews',
      icon: MessageCircle,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      textColor: 'text-green-600 dark:text-green-400',
      completed: (userProgress.interviewsCompleted || 0) > 0,
      stats: `${userProgress.interviewsCompleted || 0} Completed`,
      features: ['Real-time Feedback', 'Role-specific Questions', 'Performance Analytics']
    },
    {
      id: 'video-interview',
      title: 'Video Interview Practice',
      description: 'Advanced video interview simulation with AI analysis',
      icon: Video,
      color: 'from-red-500 to-pink-600',
      bgColor: 'bg-red-50 dark:bg-red-900/20',
      textColor: 'text-red-600 dark:text-red-400',
      completed: false,
      stats: 'AI-Powered Analysis',
      features: ['Video Recording', 'Body Language Analysis', 'Ideal Response Examples']
    },
    {
      id: 'insights',
      title: 'Market Insights',
      description: 'Real-time job market data and salary insights',
      icon: TrendingUp,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20',
      textColor: 'text-orange-600 dark:text-orange-400',
      completed: false,
      stats: 'Live Market Data',
      features: ['Salary Trends', 'Skill Demand', 'Company Insights']
    },
    {
      id: 'tracker',
      title: 'Job Application Tracker',
      description: 'Organize and track your job applications',
      icon: Briefcase,
      color: 'from-indigo-500 to-indigo-600',
      bgColor: 'bg-indigo-50 dark:bg-indigo-900/20',
      textColor: 'text-indigo-600 dark:text-indigo-400',
      completed: (userProgress.applicationsSubmitted || 0) > 0,
      stats: `${userProgress.applicationsSubmitted || 0} Applications`,
      features: ['Kanban Board', 'Status Tracking', 'Interview Scheduling']
    }
  ];

  const quickStats = [
    {
      label: 'Resume Score',
      value: userProgress.analysisData?.matchPercentage || 0,
      suffix: '%',
      icon: FileText,
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-100 dark:bg-blue-900/30'
    },
    {
      label: 'Skills Learned',
      value: userProgress.skillsLearned || 0,
      suffix: '',
      icon: Brain,
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-100 dark:bg-purple-900/30'
    },
    {
      label: 'Interviews',
      value: userProgress.interviewsCompleted || 0,
      suffix: '',
      icon: MessageCircle,
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-100 dark:bg-green-900/30'
    },
    {
      label: 'Applications',
      value: userProgress.applicationsSubmitted || 0,
      suffix: '',
      icon: Briefcase,
      color: 'text-orange-600 dark:text-orange-400',
      bgColor: 'bg-orange-100 dark:bg-orange-900/30'
    }
  ];

  const achievements = [
    { title: 'Resume Analyzed', completed: userProgress.resumeAnalyzed, icon: FileText },
    { title: 'Learning Path Created', completed: userProgress.roadmapCreated, icon: Target },
    { title: 'First Interview', completed: (userProgress.interviewsCompleted || 0) > 0, icon: MessageCircle },
    { title: 'Job Application', completed: (userProgress.applicationsSubmitted || 0) > 0, icon: Briefcase },
    { title: 'Skill Milestone', completed: (userProgress.skillsLearned || 0) >= 5, icon: Brain },
    { title: 'Interview Expert', completed: (userProgress.interviewsCompleted || 0) >= 5, icon: Award }
  ];

  return (
    <div className={`min-h-screen transition-all duration-300 ${
      darkMode 
        ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900' 
        : 'bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-6 shadow-lg animate-float">
            <Sparkles className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 dark:from-gray-100 dark:via-blue-300 dark:to-purple-300 bg-clip-text text-transparent mb-4">
            Welcome to CareerFlow AI
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Your AI-powered career companion that helps you land your dream job through personalized resume analysis, 
            interview practice, and strategic career guidance.
          </p>
        </div>

        {/* Progress Overview */}
        <div className="card mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Your Career Journey</h2>
            <div className="flex items-center space-x-2">
              <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {progressPercentage}%
              </span>
              <span className="text-gray-600 dark:text-gray-400">Complete</span>
            </div>
          </div>
          
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 mb-6 shadow-inner">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-4 rounded-full transition-all duration-1000 shadow-lg"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl">
                  <div className={`inline-flex items-center justify-center w-12 h-12 ${stat.bgColor} rounded-xl mb-3`}>
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stat.value}{stat.suffix}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Main Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-8">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.id}
                className={`card card-hover cursor-pointer transition-all duration-300 hover:shadow-2xl ${
                  feature.completed ? 'ring-2 ring-green-500 ring-opacity-50' : ''
                }`}
                onClick={() => onModuleSelect(feature.id)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r ${feature.color} rounded-2xl shadow-lg`}>
                    <Icon className="h-7 w-7 text-white" />
                  </div>
                  {feature.completed && (
                    <div className="flex items-center justify-center w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full">
                      <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                    </div>
                  )}
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                  {feature.description}
                </p>
                
                <div className={`${feature.bgColor} rounded-xl p-3 mb-4`}>
                  <div className={`text-sm font-semibold ${feature.textColor} mb-2`}>
                    {feature.stats}
                  </div>
                  <div className="space-y-1">
                    {feature.features.map((feat, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className={`w-1.5 h-1.5 rounded-full ${feature.color.replace('from-', 'bg-').split(' ')[0]}`} />
                        <span className="text-xs text-gray-600 dark:text-gray-400">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <button className={`w-full py-3 px-4 bg-gradient-to-r ${feature.color} text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 group`}>
                  <Play className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  <span>{feature.completed ? 'Continue' : 'Get Started'}</span>
                </button>
              </div>
            );
          })}
        </div>

        {/* Achievements & Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Achievements */}
          <div className="card">
            <div className="flex items-center space-x-3 mb-6">
              <div className="flex items-center justify-center w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-2xl">
                <Trophy className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Achievements</h2>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {achievements.map((achievement, index) => {
                const Icon = achievement.icon;
                return (
                  <div
                    key={index}
                    className={`p-4 rounded-2xl border-2 transition-all duration-300 ${
                      achievement.completed
                        ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                        : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                        achievement.completed
                          ? 'bg-green-100 dark:bg-green-900/30'
                          : 'bg-gray-200 dark:bg-gray-700'
                      }`}>
                        <Icon className={`h-4 w-4 ${
                          achievement.completed
                            ? 'text-green-600 dark:text-green-400'
                            : 'text-gray-500 dark:text-gray-400'
                        }`} />
                      </div>
                      <div>
                        <div className={`text-sm font-medium ${
                          achievement.completed
                            ? 'text-green-800 dark:text-green-300'
                            : 'text-gray-600 dark:text-gray-400'
                        }`}>
                          {achievement.title}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recent Activity & Tips */}
          <div className="card">
            <div className="flex items-center space-x-3 mb-6">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-2xl">
                <Clock className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Career Tips</h2>
            </div>
            
            <div className="space-y-4">
              {[
                {
                  tip: "Optimize your resume with ATS-friendly keywords",
                  action: "Analyze Resume",
                  module: "resume",
                  icon: FileText,
                  color: "text-blue-600 dark:text-blue-400"
                },
                {
                  tip: "Practice behavioral interview questions daily",
                  action: "Start Practice",
                  module: "interview",
                  icon: MessageCircle,
                  color: "text-green-600 dark:text-green-400"
                },
                {
                  tip: "Track your job applications systematically",
                  action: "Open Tracker",
                  module: "tracker",
                  icon: Briefcase,
                  color: "text-orange-600 dark:text-orange-400"
                },
                {
                  tip: "Stay updated with market salary trends",
                  action: "View Insights",
                  module: "insights",
                  icon: TrendingUp,
                  color: "text-purple-600 dark:text-purple-400"
                }
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors">
                    <div className="flex items-center space-x-3">
                      <Icon className={`h-5 w-5 ${item.color}`} />
                      <span className="text-gray-700 dark:text-gray-300">{item.tip}</span>
                    </div>
                    <button
                      onClick={() => onModuleSelect(item.module)}
                      className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-sm flex items-center space-x-1 group"
                    >
                      <span>{item.action}</span>
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Platform Statistics */}
        <div className="card">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Join Thousands of Successful Job Seekers
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              CareerFlow AI has helped professionals land their dream jobs at top companies
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'Resumes Analyzed', value: '50K+', icon: FileText, color: 'text-blue-600 dark:text-blue-400' },
              { label: 'Interviews Practiced', value: '125K+', icon: MessageCircle, color: 'text-green-600 dark:text-green-400' },
              { label: 'Jobs Landed', value: '15K+', icon: Briefcase, color: 'text-purple-600 dark:text-purple-400' },
              { label: 'Success Rate', value: '89%', icon: Star, color: 'text-yellow-600 dark:text-yellow-400' }
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-2xl mb-4 shadow-lg">
                    <Icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="card bg-gradient-to-r from-blue-500 to-purple-600 text-white">
            <div className="flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mx-auto mb-6">
              <Zap className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Ready to Accelerate Your Career?</h2>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
              Start with our AI resume analyzer to get personalized insights and begin your journey to landing your dream job.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => onModuleSelect('resume')}
                className="px-8 py-4 bg-white text-blue-600 rounded-2xl font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
              >
                <FileText className="h-5 w-5" />
                <span>Analyze My Resume</span>
              </button>
              <button
                onClick={() => onModuleSelect('contact')}
                className="px-8 py-4 border-2 border-white text-white rounded-2xl font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <Mail className="h-5 w-5" />
                <span>Get Support</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;