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
  Heart,
  Rocket,
  Shield,
  TrendingDown,
  Activity,
  Eye,
  ChevronRight
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
      description: 'Get instant feedback on your resume with ATS compatibility scoring and personalized recommendations',
      icon: FileText,
      gradient: 'from-blue-500 via-blue-600 to-indigo-600',
      bgGradient: 'from-blue-50 to-indigo-100',
      darkBgGradient: 'from-blue-900/30 to-indigo-900/30',
      completed: userProgress.resumeAnalyzed,
      stats: '95% ATS Pass Rate',
      features: ['ATS Optimization', 'Skill Gap Analysis', 'Industry Matching', 'Real-time Feedback'],
      badge: 'Most Popular'
    },
    {
      id: 'roadmap',
      title: 'Learning Roadmap',
      description: 'Personalized learning path based on your career goals with step-by-step guidance',
      icon: Target,
      gradient: 'from-purple-500 via-purple-600 to-pink-600',
      bgGradient: 'from-purple-50 to-pink-100',
      darkBgGradient: 'from-purple-900/30 to-pink-900/30',
      completed: userProgress.roadmapCreated,
      stats: '8-Week Program',
      features: ['Custom Learning Path', 'Skill Development', 'Project-Based Learning', 'Progress Tracking'],
      badge: 'Recommended'
    },
    {
      id: 'interview',
      title: 'Interview Simulator',
      description: 'Practice with AI-powered mock interviews tailored to your target role and experience level',
      icon: MessageCircle,
      gradient: 'from-green-500 via-emerald-600 to-teal-600',
      bgGradient: 'from-green-50 to-emerald-100',
      darkBgGradient: 'from-green-900/30 to-emerald-900/30',
      completed: (userProgress.interviewsCompleted || 0) > 0,
      stats: `${userProgress.interviewsCompleted || 0} Completed`,
      features: ['Real-time Feedback', 'Role-specific Questions', 'Performance Analytics', 'STAR Method Training'],
      badge: null
    },
    {
      id: 'video-interview',
      title: 'Video Interview Practice',
      description: 'Advanced video interview simulation with AI analysis of your body language and delivery',
      icon: Video,
      gradient: 'from-red-500 via-pink-600 to-rose-600',
      bgGradient: 'from-red-50 to-pink-100',
      darkBgGradient: 'from-red-900/30 to-pink-900/30',
      completed: false,
      stats: 'AI-Powered Analysis',
      features: ['Video Recording', 'Body Language Analysis', 'Ideal Response Examples', 'Confidence Scoring'],
      badge: 'New'
    },
    {
      id: 'insights',
      title: 'Market Insights',
      description: 'Real-time job market data, salary insights, and industry trends to guide your career decisions',
      icon: TrendingUp,
      gradient: 'from-orange-500 via-amber-600 to-yellow-600',
      bgGradient: 'from-orange-50 to-yellow-100',
      darkBgGradient: 'from-orange-900/30 to-yellow-900/30',
      completed: false,
      stats: 'Live Market Data',
      features: ['Salary Trends', 'Skill Demand', 'Company Insights', 'Location Analysis'],
      badge: null
    },
    {
      id: 'tracker',
      title: 'Job Application Tracker',
      description: 'Organize and track your job applications with a powerful Kanban-style interface',
      icon: Briefcase,
      gradient: 'from-indigo-500 via-blue-600 to-cyan-600',
      bgGradient: 'from-indigo-50 to-cyan-100',
      darkBgGradient: 'from-indigo-900/30 to-cyan-900/30',
      completed: (userProgress.applicationsSubmitted || 0) > 0,
      stats: `${userProgress.applicationsSubmitted || 0} Applications`,
      features: ['Kanban Board', 'Status Tracking', 'Interview Scheduling', 'Follow-up Reminders'],
      badge: null
    }
  ];

  const quickStats = [
    {
      label: 'Resume Score',
      value: userProgress.analysisData?.matchPercentage || 0,
      suffix: '%',
      icon: FileText,
      gradient: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-500/10',
      change: '+12%',
      changeType: 'positive'
    },
    {
      label: 'Skills Learned',
      value: userProgress.skillsLearned || 0,
      suffix: '',
      icon: Brain,
      gradient: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-500/10',
      change: '+3',
      changeType: 'positive'
    },
    {
      label: 'Interviews',
      value: userProgress.interviewsCompleted || 0,
      suffix: '',
      icon: MessageCircle,
      gradient: 'from-green-500 to-green-600',
      bgColor: 'bg-green-500/10',
      change: '+2',
      changeType: 'positive'
    },
    {
      label: 'Applications',
      value: userProgress.applicationsSubmitted || 0,
      suffix: '',
      icon: Briefcase,
      gradient: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-500/10',
      change: '+5',
      changeType: 'positive'
    }
  ];

  const achievements = [
    { title: 'Resume Analyzed', completed: userProgress.resumeAnalyzed, icon: FileText, color: 'text-blue-600' },
    { title: 'Learning Path Created', completed: userProgress.roadmapCreated, icon: Target, color: 'text-purple-600' },
    { title: 'First Interview', completed: (userProgress.interviewsCompleted || 0) > 0, icon: MessageCircle, color: 'text-green-600' },
    { title: 'Job Application', completed: (userProgress.applicationsSubmitted || 0) > 0, icon: Briefcase, color: 'text-orange-600' },
    { title: 'Skill Milestone', completed: (userProgress.skillsLearned || 0) >= 5, icon: Brain, color: 'text-indigo-600' },
    { title: 'Interview Expert', completed: (userProgress.interviewsCompleted || 0) >= 5, icon: Award, color: 'text-yellow-600' }
  ];

  const careerTips = [
    {
      tip: "Optimize your resume with ATS-friendly keywords to pass initial screening",
      action: "Analyze Resume",
      module: "resume",
      icon: FileText,
      priority: "High",
      timeToComplete: "10 min"
    },
    {
      tip: "Practice behavioral interview questions using the STAR method daily",
      action: "Start Practice",
      module: "interview",
      icon: MessageCircle,
      priority: "Medium",
      timeToComplete: "15 min"
    },
    {
      tip: "Track your job applications systematically to improve follow-up",
      action: "Open Tracker",
      module: "tracker",
      icon: Briefcase,
      priority: "Medium",
      timeToComplete: "5 min"
    },
    {
      tip: "Stay updated with market salary trends for better negotiation",
      action: "View Insights",
      module: "insights",
      icon: TrendingUp,
      priority: "Low",
      timeToComplete: "8 min"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Hero Section */}
        <div className="text-center py-12 px-6">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl mb-8 shadow-2xl animate-pulse">
            <Sparkles className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-600 to-purple-600 dark:from-white dark:via-blue-300 dark:to-purple-300 bg-clip-text text-transparent mb-6 leading-tight">
            Welcome to CareerFlow AI
          </h1>
          <p className="text-xl sm:text-2xl text-gray-700 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed font-medium">
            Your AI-powered career companion that helps you land your dream job through personalized resume analysis, 
            interview practice, and strategic career guidance.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-lg">
              <Shield className="h-5 w-5 text-green-500" />
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">95% ATS Pass Rate</span>
            </div>
            <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-lg">
              <Users className="h-5 w-5 text-blue-500" />
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">50K+ Users</span>
            </div>
            <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-lg">
              <Star className="h-5 w-5 text-yellow-500" />
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">4.9/5 Rating</span>
            </div>
          </div>
        </div>

        {/* Progress Overview */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Your Career Journey</h2>
              <p className="text-gray-600 dark:text-gray-400">Track your progress and achievements</p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {progressPercentage}%
              </div>
              <p className="text-gray-600 dark:text-gray-400 font-medium">Complete</p>
            </div>
          </div>
          
          <div className="relative w-full bg-gray-200 dark:bg-gray-700 rounded-full h-6 mb-8 shadow-inner overflow-hidden">
            <div 
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full transition-all duration-1000 shadow-lg"
              style={{ width: `${progressPercentage}%` }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {quickStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-700 dark:to-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-600 hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <div className={`inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r ${stat.gradient} rounded-2xl mb-4 shadow-lg`}>
                    <Icon className="h-7 w-7 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                    {stat.value}{stat.suffix}
                  </div>
                  <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">{stat.label}</div>
                  <div className={`text-xs font-semibold ${stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'} flex items-center space-x-1`}>
                    {stat.changeType === 'positive' ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                    <span>{stat.change} this week</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Main Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.id}
                className={`group relative bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 border border-gray-200 dark:border-gray-700 cursor-pointer transition-all duration-500 hover:shadow-3xl hover:scale-105 hover:-translate-y-2 ${
                  feature.completed ? 'ring-2 ring-green-500 ring-opacity-50' : ''
                }`}
                onClick={() => onModuleSelect(feature.id)}
              >
                {/* Badge */}
                {feature.badge && (
                  <div className="absolute -top-3 -right-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                    {feature.badge}
                  </div>
                )}
                
                {/* Completion Badge */}
                {feature.completed && (
                  <div className="absolute top-4 right-4 flex items-center justify-center w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full">
                    <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                )}
                
                <div className="flex items-start justify-between mb-6">
                  <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  {feature.description}
                </p>
                
                <div className={`bg-gradient-to-r ${feature.bgGradient} dark:${feature.darkBgGradient} rounded-2xl p-4 mb-6 border border-gray-100 dark:border-gray-600`}>
                  <div className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3">
                    {feature.stats}
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {feature.features.map((feat, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${feature.gradient}`} />
                        <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <button className={`w-full py-4 px-6 bg-gradient-to-r ${feature.gradient} text-white rounded-2xl font-bold text-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center space-x-3 group-hover:scale-105`}>
                  <Play className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  <span>{feature.completed ? 'Continue Journey' : 'Get Started'}</span>
                </button>
              </div>
            );
          })}
        </div>

        {/* Achievements & Career Tips */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Achievements */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-4 mb-8">
              <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl shadow-lg">
                <Trophy className="h-7 w-7 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Achievements</h2>
                <p className="text-gray-600 dark:text-gray-400">Your career milestones</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              {achievements.map((achievement, index) => {
                const Icon = achievement.icon;
                return (
                  <div
                    key={index}
                    className={`flex items-center space-x-4 p-4 rounded-2xl border-2 transition-all duration-300 ${
                      achievement.completed
                        ? 'border-green-500 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 shadow-lg'
                        : 'border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 hover:border-gray-300 dark:hover:border-gray-500'
                    }`}
                  >
                    <div className={`flex items-center justify-center w-12 h-12 rounded-2xl ${
                      achievement.completed
                        ? 'bg-green-100 dark:bg-green-900/30'
                        : 'bg-gray-200 dark:bg-gray-600'
                    }`}>
                      <Icon className={`h-6 w-6 ${
                        achievement.completed
                          ? 'text-green-600 dark:text-green-400'
                          : 'text-gray-500 dark:text-gray-400'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <div className={`font-bold ${
                        achievement.completed
                          ? 'text-green-800 dark:text-green-300'
                          : 'text-gray-600 dark:text-gray-400'
                      }`}>
                        {achievement.title}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {achievement.completed ? 'Completed ✨' : 'Not completed yet'}
                      </div>
                    </div>
                    {achievement.completed && (
                      <CheckCircle className="h-6 w-6 text-green-500" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Career Tips */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-4 mb-8">
              <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-lg">
                <Rocket className="h-7 w-7 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Career Tips</h2>
                <p className="text-gray-600 dark:text-gray-400">Actionable advice for success</p>
              </div>
            </div>
            
            <div className="space-y-4">
              {careerTips.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-700 dark:to-blue-900/20 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-600">
                    <div className="flex items-start space-x-4">
                      <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg flex-shrink-0">
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-800 dark:text-gray-200 font-medium mb-3 leading-relaxed">
                          {item.tip}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                              item.priority === 'High' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' :
                              item.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' :
                              'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                            }`}>
                              {item.priority}
                            </span>
                            <div className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400">
                              <Clock className="h-3 w-3" />
                              <span>{item.timeToComplete}</span>
                            </div>
                          </div>
                          <button
                            onClick={() => onModuleSelect(item.module)}
                            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-xl font-semibold text-sm hover:shadow-lg transition-all duration-300 flex items-center space-x-2 group"
                          >
                            <span>{item.action}</span>
                            <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Platform Statistics */}
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl shadow-2xl p-8 text-white">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Join Thousands of Successful Job Seekers
            </h2>
            <p className="text-blue-100 text-lg max-w-3xl mx-auto">
              CareerFlow AI has helped professionals land their dream jobs at top companies worldwide
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'Resumes Analyzed', value: '50K+', icon: FileText, description: 'Professional resumes optimized' },
              { label: 'Interviews Practiced', value: '125K+', icon: MessageCircle, description: 'Mock interviews completed' },
              { label: 'Jobs Landed', value: '15K+', icon: Briefcase, description: 'Dream jobs secured' },
              { label: 'Success Rate', value: '89%', icon: Star, description: 'Users who got hired' }
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-3xl mb-6 shadow-2xl group-hover:scale-110 transition-transform duration-300">
                    <Icon className="h-10 w-10 text-white" />
                  </div>
                  <div className="text-4xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300">
                    {stat.value}
                  </div>
                  <div className="text-lg font-semibold mb-1">
                    {stat.label}
                  </div>
                  <div className="text-blue-200 text-sm">
                    {stat.description}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-12 text-center border border-gray-200 dark:border-gray-700">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl mb-8 shadow-2xl animate-pulse">
            <Zap className="h-10 w-10 text-white" />
          </div>
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">Ready to Accelerate Your Career?</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
            Start with our AI resume analyzer to get personalized insights and begin your journey to landing your dream job.
            Join thousands of successful professionals who transformed their careers with CareerFlow AI.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button
              onClick={() => onModuleSelect('resume')}
              className="px-10 py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-bold text-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center space-x-3 group hover:scale-105"
            >
              <FileText className="h-6 w-6 group-hover:rotate-12 transition-transform" />
              <span>Analyze My Resume</span>
            </button>
            <button
              onClick={() => onModuleSelect('contact')}
              className="px-10 py-5 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-2xl font-bold text-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 flex items-center justify-center space-x-3 group hover:scale-105"
            >
              <Mail className="h-6 w-6 group-hover:rotate-12 transition-transform" />
              <span>Get Support</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;