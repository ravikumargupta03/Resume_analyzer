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
  ExternalLink,
  Globe,
  Video,
  FileText,
  Code
} from 'lucide-react';

interface LearningRoadmapProps {
  onProgress: (progress: any) => void;
  analysisData?: {
    targetRole: string;
    gaps: string[];
    recommendations: string[];
    matchPercentage: number;
    skillsFound: string[];
    experienceLevel: string;
  };
}

const LearningRoadmap: React.FC<LearningRoadmapProps> = ({ onProgress, analysisData }) => {
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);
  
  // Generate dynamic roadmap based on analysis data
  const generateRoadmap = () => {
    if (!analysisData) {
      // Default roadmap for general frontend development
      return [
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
            }
          ]
        }
      ];
    }

    const { targetRole, gaps, recommendations, skillsFound, experienceLevel } = analysisData;
    const roadmap = [];

    // Phase 1: Address critical skill gaps
    const phase1Tasks = [];
    
    // Add tasks based on missing skills
    if (gaps.some(gap => gap.toLowerCase().includes('react'))) {
      phase1Tasks.push({
        id: 'react-fundamentals',
        title: 'React Fundamentals',
        description: 'Master React components, props, and state management',
        type: 'course',
        duration: '12 hours',
        platform: 'React Official Tutorial',
        url: 'https://react.dev/learn/tutorial-tic-tac-toe',
        priority: 'high',
        skills: ['React', 'JSX', 'Components']
      });
    }

    if (gaps.some(gap => gap.toLowerCase().includes('typescript'))) {
      phase1Tasks.push({
        id: 'typescript-basics',
        title: 'TypeScript Essentials',
        description: 'Learn TypeScript syntax, types, and interfaces',
        type: 'course',
        duration: '10 hours',
        platform: 'TypeScript Handbook',
        url: 'https://www.typescriptlang.org/docs/',
        priority: 'high',
        skills: ['TypeScript', 'Types', 'Interfaces']
      });
    }

    if (gaps.some(gap => gap.toLowerCase().includes('node'))) {
      phase1Tasks.push({
        id: 'nodejs-fundamentals',
        title: 'Node.js & Express',
        description: 'Build REST APIs with Node.js and Express',
        type: 'course',
        duration: '15 hours',
        platform: 'Node.js Docs',
        url: 'https://nodejs.org/en/learn/',
        priority: 'high',
        skills: ['Node.js', 'Express', 'REST APIs']
      });
    }

    if (gaps.some(gap => gap.toLowerCase().includes('aws') || gap.toLowerCase().includes('cloud'))) {
      phase1Tasks.push({
        id: 'aws-basics',
        title: 'AWS Cloud Fundamentals',
        description: 'Learn AWS services and cloud deployment',
        type: 'course',
        duration: '20 hours',
        platform: 'AWS Training',
        url: 'https://aws.amazon.com/training/',
        priority: 'high',
        skills: ['AWS', 'Cloud Computing', 'Deployment']
      });
    }

    if (gaps.some(gap => gap.toLowerCase().includes('testing'))) {
      phase1Tasks.push({
        id: 'testing-fundamentals',
        title: 'Testing Best Practices',
        description: 'Unit testing with Jest and React Testing Library',
        type: 'course',
        duration: '8 hours',
        platform: 'Testing Library Docs',
        url: 'https://testing-library.com/docs/',
        priority: 'medium',
        skills: ['Testing', 'Jest', 'TDD']
      });
    }

    // Add default tasks if no specific gaps identified
    if (phase1Tasks.length === 0) {
      phase1Tasks.push({
        id: 'skill-enhancement',
        title: `Advanced ${targetRole} Skills`,
        description: `Deepen your expertise in ${targetRole.toLowerCase()} technologies`,
        type: 'course',
        duration: '15 hours',
        platform: 'Industry Resources',
        url: 'https://developer.mozilla.org/en-US/',
        priority: 'high',
        skills: skillsFound.slice(0, 3)
      });
    }

    roadmap.push({
      phase: 'Phase 1: Skill Development (Weeks 1-3)',
      color: 'bg-blue-500',
      tasks: phase1Tasks
    });

    // Phase 2: Hands-on projects
    const phase2Tasks = [
      {
        id: 'portfolio-project',
        title: `${targetRole} Portfolio Project`,
        description: `Build a comprehensive project showcasing ${targetRole.toLowerCase()} skills`,
        type: 'project',
        duration: '25 hours',
        platform: 'GitHub',
        url: 'https://github.com/',
        priority: 'high',
        skills: skillsFound.length > 0 ? skillsFound.slice(0, 4) : ['Project Management', 'Problem Solving']
      },
      {
        id: 'code-review',
        title: 'Code Quality & Best Practices',
        description: 'Learn code review processes and industry standards',
        type: 'course',
        duration: '6 hours',
        platform: 'Industry Blogs',
        url: 'https://google.github.io/eng-practices/review/',
        priority: 'medium',
        skills: ['Code Quality', 'Best Practices', 'Collaboration']
      }
    ];

    // Add experience-specific tasks
    if (experienceLevel === 'Junior') {
      phase2Tasks.push({
        id: 'mentorship',
        title: 'Find a Mentor',
        description: 'Connect with senior developers for guidance',
        type: 'networking',
        duration: '2 hours',
        platform: 'LinkedIn/Discord',
        url: 'https://www.linkedin.com/',
        priority: 'medium',
        skills: ['Networking', 'Learning', 'Growth']
      });
    }

    roadmap.push({
      phase: 'Phase 2: Practical Application (Weeks 4-6)',
      color: 'bg-purple-500',
      tasks: phase2Tasks
    });

    // Phase 3: Interview preparation
    const phase3Tasks = [
      {
        id: 'interview-prep',
        title: `${targetRole} Interview Preparation`,
        description: 'Practice technical and behavioral interview questions',
        type: 'practice',
        duration: '12 hours',
        platform: 'LeetCode/InterviewBit',
        url: 'https://leetcode.com/',
        priority: 'high',
        skills: ['Interview Skills', 'Problem Solving', 'Communication']
      },
      {
        id: 'system-design',
        title: 'System Design Basics',
        description: 'Learn to design scalable systems and architectures',
        type: 'course',
        duration: '15 hours',
        platform: 'System Design Primer',
        url: 'https://github.com/donnemartin/system-design-primer',
        priority: experienceLevel === 'Senior' ? 'high' : 'medium',
        skills: ['System Design', 'Architecture', 'Scalability']
      },
      {
        id: 'resume-optimization',
        title: 'Resume & LinkedIn Optimization',
        description: 'Update your resume and LinkedIn with new skills',
        type: 'task',
        duration: '4 hours',
        platform: 'LinkedIn',
        url: 'https://www.linkedin.com/',
        priority: 'high',
        skills: ['Personal Branding', 'Networking', 'Job Search']
      }
    ];

    roadmap.push({
      phase: 'Phase 3: Job Readiness (Weeks 7-8)',
      color: 'bg-green-500',
      tasks: phase3Tasks
    });

    return roadmap;
  };

  const roadmapData = generateRoadmap();

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
      case 'practice':
        return <Code className="h-4 w-4" />;
      case 'networking':
        return <Globe className="h-4 w-4" />;
      case 'task':
        return <FileText className="h-4 w-4" />;
      default:
        return <Circle className="h-4 w-4" />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Learning Roadmap</h1>
        {analysisData ? (
          <div>
            <p className="text-xl text-gray-600 mb-2">
              Personalized roadmap for <span className="font-semibold text-blue-600">{analysisData.targetRole}</span>
            </p>
            <p className="text-gray-500">
              Based on your resume analysis ({analysisData.matchPercentage}% match)
            </p>
          </div>
        ) : (
          <p className="text-xl text-gray-600">
            A step-by-step journey to bridge your skill gaps and land your dream job
          </p>
        )}
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
                        {task.url ? (
                          <a 
                            href={task.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 transition-colors"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <ExternalLink className="h-4 w-4" />
                            <span>{task.platform}</span>
                          </a>
                        ) : (
                          <>
                            <ExternalLink className="h-4 w-4" />
                            <span>{task.platform}</span>
                          </>
                        )}
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
                      <div className="mt-4 space-y-2">
                        {task.url ? (
                          <a
                            href={task.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <ExternalLink className="h-4 w-4" />
                            <span>Start Learning</span>
                          </a>
                        ) : (
                          <button 
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                            onClick={() => toggleTask(task.id)}
                          >
                            <Play className="h-4 w-4" />
                            <span>Mark Complete</span>
                          </button>
                        )}
                      </div>
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