import React, { useState } from 'react';
import { 
  CheckCircle, 
  Circle, 
  Clock, 
  BookOpen, 
  Award, 
  Target,
  Calendar,
  Play,
  ExternalLink
} from 'lucide-react';

interface LearningRoadmapProps {
  onProgress: (progress: any) => void;
}

const LearningRoadmap: React.FC<LearningRoadmapProps> = ({ onProgress }) => {
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);
  
  const roadmapData = [
    {
      phase: 'Phase 1: Foundation (Weeks 1-2)',
      color: 'bg-blue-500',
      tasks: [
        {
          id: 'ts-basics',
          title: 'TypeScript Fundamentals',
          description: 'Complete TypeScript crash course',
          type: 'course',
          duration: '8 hours',
          platform: 'TypeScript Handbook',
          priority: 'high',
          skills: ['TypeScript', 'Types', 'Interfaces']
        },
        {
          id: 'react-hooks',
          title: 'Advanced React Hooks',
          description: 'Master useEffect, useContext, and custom hooks',
          type: 'course',
          duration: '6 hours',
          platform: 'React Docs',
          priority: 'high',
          skills: ['React', 'Hooks', 'State Management']
        },
        {
          id: 'portfolio-setup',
          title: 'Portfolio Project Setup',
          description: 'Initialize your showcase project with TypeScript',
          type: 'project',
          duration: '4 hours',
          platform: 'GitHub',
          priority: 'medium',
          skills: ['Project Setup', 'Git', 'TypeScript']
        }
      ]
    },
    {
      phase: 'Phase 2: Backend & Testing (Weeks 3-4)',
      color: 'bg-purple-500',
      tasks: [
        {
          id: 'node-express',
          title: 'Node.js & Express API',
          description: 'Build RESTful APIs with Node.js and Express',
          type: 'course',
          duration: '12 hours',
          platform: 'Node.js Docs',
          priority: 'high',
          skills: ['Node.js', 'Express', 'REST APIs']
        },
        {
          id: 'testing-fundamentals',
          title: 'Testing with Jest & RTL',
          description: 'Unit and integration testing for React applications',
          type: 'course',
          duration: '8 hours',
          platform: 'Testing Library',
          priority: 'medium',
          skills: ['Testing', 'Jest', 'React Testing Library']
        },
        {
          id: 'full-stack-project',
          title: 'Full-Stack Project',
          description: 'Build a complete application with frontend and backend',
          type: 'project',
          duration: '20 hours',
          platform: 'Personal Project',
          priority: 'high',
          skills: ['Full-Stack', 'API Integration', 'Database']
        }
      ]
    },
    {
      phase: 'Phase 3: Advanced Topics (Weeks 5-6)',
      color: 'bg-green-500',
      tasks: [
        {
          id: 'system-design',
          title: 'System Design Basics',
          description: 'Learn scalability, caching, and architecture patterns',
          type: 'course',
          duration: '15 hours',
          platform: 'System Design Primer',
          priority: 'high',
          skills: ['System Design', 'Scalability', 'Architecture']
        },
        {
          id: 'performance-optimization',
          title: 'Performance Optimization',
          description: 'Optimize React apps for production',
          type: 'course',
          duration: '6 hours',
          platform: 'Web.dev',
          priority: 'medium',
          skills: ['Performance', 'Optimization', 'Webpack']
        },
        {
          id: 'deployment',
          title: 'Deployment & DevOps',
          description: 'Deploy your application to production',
          type: 'project',
          duration: '8 hours',
          platform: 'Vercel/Netlify',
          priority: 'medium',
          skills: ['Deployment', 'DevOps', 'CI/CD']
        }
      ]
    }
  ];

  const toggleTask = (taskId: string) => {
    setCompletedTasks(prev => 
      prev.includes(taskId) 
        ? prev.filter(id => id !== taskId)
        : [...prev, taskId]
    );
    onProgress((prev: any) => ({ 
      ...prev, 
      roadmapCreated: true,
      skillsLearned: prev.skillsLearned + 1
    }));
  };

  const getProgressPercentage = () => {
    const totalTasks = roadmapData.reduce((sum, phase) => sum + phase.tasks.length, 0);
    return Math.round((completedTasks.length / totalTasks) * 100);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'course':
        return <BookOpen className="h-4 w-4" />;
      case 'project':
        return <Target className="h-4 w-4" />;
      default:
        return <Circle className="h-4 w-4" />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Learning Roadmap</h1>
        <p className="text-xl text-gray-600">
          A step-by-step journey to bridge your skill gaps and land your dream job
        </p>
      </div>

      {/* Progress Overview */}
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Overall Progress</h2>
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-blue-600">{getProgressPercentage()}%</span>
            <span className="text-gray-600">Complete</span>
          </div>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${getProgressPercentage()}%` }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-3">
              <CheckCircle className="h-6 w-6 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{completedTasks.length}</div>
            <div className="text-sm text-gray-600">Tasks Completed</div>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mb-3">
              <Clock className="h-6 w-6 text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">6</div>
            <div className="text-sm text-gray-600">Weeks Timeline</div>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-3">
              <Award className="h-6 w-6 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">15</div>
            <div className="text-sm text-gray-600">Skills to Learn</div>
          </div>
        </div>
      </div>

      {/* Roadmap Phases */}
      <div className="space-y-8">
        {roadmapData.map((phase, phaseIndex) => (
          <div key={phaseIndex} className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className={`w-4 h-4 rounded-full ${phase.color}`} />
              <h2 className="text-xl font-semibold text-gray-900">{phase.phase}</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {phase.tasks.map((task) => {
                const isCompleted = completedTasks.includes(task.id);
                return (
                  <div
                    key={task.id}
                    className={`border-2 rounded-xl p-6 transition-all duration-300 cursor-pointer ${
                      isCompleted 
                        ? 'border-green-500 bg-green-50' 
                        : 'border-gray-200 hover:border-blue-500 hover:shadow-md'
                    }`}
                    onClick={() => toggleTask(task.id)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        {getTypeIcon(task.type)}
                        <span className="text-sm font-medium text-gray-600 capitalize">{task.type}</span>
                      </div>
                      <button
                        className={`p-1 rounded-full transition-colors ${
                          isCompleted ? 'text-green-600' : 'text-gray-400 hover:text-blue-600'
                        }`}
                      >
                        {isCompleted ? <CheckCircle className="h-5 w-5" /> : <Circle className="h-5 w-5" />}
                      </button>
                    </div>
                    
                    <h3 className="font-semibold text-gray-900 mb-2">{task.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{task.description}</p>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4 text-gray-500" />
                          <span className="text-gray-600">{task.duration}</span>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          task.priority === 'high' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {task.priority}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-1 text-sm text-gray-600">
                        <ExternalLink className="h-4 w-4" />
                        <span>{task.platform}</span>
                      </div>
                      
                      <div className="flex flex-wrap gap-1">
                        {task.skills.map((skill, idx) => (
                          <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {!isCompleted && (
                      <button className="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
                        <Play className="h-4 w-4" />
                        <span>Start Learning</span>
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LearningRoadmap;