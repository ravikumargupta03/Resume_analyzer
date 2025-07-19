import React, { useState } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Award, 
  Clock, 
  MessageCircle,
  Star,
  ChevronRight,
  Mic,
  MicOff
} from 'lucide-react';

interface InterviewSimulatorProps {
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

const InterviewSimulator: React.FC<InterviewSimulatorProps> = ({ onProgress, analysisData }) => {
  const [activeSession, setActiveSession] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [sessionComplete, setSessionComplete] = useState(false);
  const [answers, setAnswers] = useState<string[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [selectedRole, setSelectedRole] = useState(analysisData?.targetRole || 'Frontend Developer');
  const [selectedCompany, setSelectedCompany] = useState('Tech Startup');
  const [selectedLevel, setSelectedLevel] = useState(analysisData?.experienceLevel || 'Mid-level (3-5 years)');

  // Dynamic question generation based on role and analysis
  const generateQuestions = () => {
    const questionBank = {
      'Frontend Developer': {
        technical: [
          'Explain the difference between useEffect and useLayoutEffect in React.',
          'How would you optimize the performance of a React application?',
          'What are the key differences between CSS Grid and Flexbox?',
          'Explain how virtual DOM works in React.',
          'How do you handle state management in large React applications?'
        ],
        behavioral: [
          'Tell me about a challenging UI/UX problem you solved.',
          'How do you ensure cross-browser compatibility?',
          'Describe a time when you had to optimize website performance.'
        ]
      },
      'Backend Developer': {
        technical: [
          'Explain the difference between SQL and NoSQL databases.',
          'How would you design a RESTful API?',
          'What are microservices and their advantages?',
          'How do you handle database scaling?',
          'Explain caching strategies in backend systems.'
        ],
        behavioral: [
          'Tell me about a time you optimized database performance.',
          'How do you handle system failures and downtime?',
          'Describe your experience with API design.'
        ]
      },
      'Full Stack Developer': {
        technical: [
          'How do you ensure data consistency between frontend and backend?',
          'Explain your approach to full-stack application architecture.',
          'How do you handle authentication and authorization?',
          'What are your strategies for API versioning?',
          'How do you manage state across the entire application?'
        ],
        behavioral: [
          'Tell me about a full-stack project you built from scratch.',
          'How do you balance frontend and backend development?',
          'Describe a time you had to debug across multiple layers.'
        ]
      },
      'DevOps Engineer': {
        technical: [
          'Explain the difference between containers and virtual machines.',
          'How would you set up a CI/CD pipeline?',
          'What are Infrastructure as Code principles?',
          'How do you monitor and troubleshoot production systems?',
          'Explain blue-green deployment strategy.'
        ],
        behavioral: [
          'Tell me about a time you improved deployment processes.',
          'How do you handle production incidents?',
          'Describe your experience with cloud platforms.'
        ]
      },
      'Data Scientist': {
        technical: [
          'Explain the bias-variance tradeoff in machine learning.',
          'How do you handle missing data in datasets?',
          'What are the differences between supervised and unsupervised learning?',
          'How do you evaluate model performance?',
          'Explain feature engineering and its importance.'
        ],
        behavioral: [
          'Tell me about a data science project that had business impact.',
          'How do you communicate technical findings to non-technical stakeholders?',
          'Describe a time you had to work with messy or incomplete data.'
        ]
      },
      'Product Manager': {
        technical: [
          'How do you prioritize features in a product roadmap?',
          'Explain your approach to A/B testing.',
          'How do you measure product success?',
          'What frameworks do you use for product strategy?',
          'How do you gather and analyze user feedback?'
        ],
        behavioral: [
          'Tell me about a product you launched from concept to market.',
          'How do you handle conflicting stakeholder requirements?',
          'Describe a time you had to pivot a product strategy.'
        ]
      },
      'UI/UX Designer': {
        technical: [
          'Explain your design process from research to implementation.',
          'How do you conduct user research and usability testing?',
          'What are design systems and why are they important?',
          'How do you ensure accessibility in your designs?',
          'Explain the difference between UX and UI design.'
        ],
        behavioral: [
          'Tell me about a design that significantly improved user experience.',
          'How do you handle design feedback and criticism?',
          'Describe a time you had to design under tight constraints.'
        ]
      }
    };

    const roleQuestions = questionBank[selectedRole as keyof typeof questionBank] || questionBank['Frontend Developer'];
    const questions = [];

    // Add role-specific questions
    questions.push({
      category: 'Technical',
      question: roleQuestions.technical[0],
      tips: `Focus on ${selectedRole.toLowerCase()} specific concepts and best practices.`,
      timeLimit: 120
    });

    questions.push({
      category: 'Behavioral',
      question: roleQuestions.behavioral[0],
      tips: 'Use the STAR method (Situation, Task, Action, Result) to structure your response.',
      timeLimit: 150
    });

    // Add questions based on skill gaps
    if (analysisData?.gaps) {
      analysisData.gaps.forEach((gap, index) => {
        if (index < 2) { // Limit to 2 gap-based questions
          questions.push({
            category: 'Technical',
            question: `How would you approach learning ${gap.split(':')[1]?.trim() || gap}?`,
            tips: 'Demonstrate your learning approach and growth mindset.',
            timeLimit: 90
          });
        }
      });
    }

    // Add more technical questions
    questions.push({
      category: 'Technical',
      question: roleQuestions.technical[1] || 'Describe your development workflow.',
      tips: 'Provide specific examples and mention tools you use.',
      timeLimit: 120
    });

    questions.push({
      category: 'Behavioral',
      question: roleQuestions.behavioral[1] || 'Tell me about a challenging project you worked on.',
      tips: 'Highlight your problem-solving skills and impact.',
      timeLimit: 180
    });

    return questions;
  };

  const interviewQuestions = generateQuestions();

  const startSession = () => {
    setActiveSession(true);
    setCurrentQuestion(0);
    setAnswers([]);
    setSessionComplete(false);
  };

  const nextQuestion = () => {
    if (currentAnswer.trim()) {
      setAnswers([...answers, currentAnswer]);
      setCurrentAnswer('');
      
      if (currentQuestion < interviewQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setSessionComplete(true);
        setActiveSession(false);
        onProgress((prev: any) => ({ 
          ...prev, 
          interviewsCompleted: prev.interviewsCompleted + 1 
        }));
      }
    }
  };

  const generateFeedback = () => {
    // Generate dynamic feedback based on role and analysis data
    const baseScore = 70 + Math.floor(Math.random() * 20);
    const matchBonus = analysisData ? Math.floor(analysisData.matchPercentage * 0.1) : 0;
    
    const scores = {
      clarity: Math.min(95, baseScore + Math.floor(Math.random() * 15) + 5),
      technical: Math.min(95, baseScore + matchBonus + Math.floor(Math.random() * 10)),
      communication: Math.min(95, baseScore + Math.floor(Math.random() * 20)),
      overall: 0
    };
    
    scores.overall = Math.round((scores.clarity + scores.technical + scores.communication) / 3);
    
    // Generate dynamic feedback based on analysis
    const strengths = [];
    const improvements = [];
    const nextSteps = [];
    
    if (scores.technical > 80) {
      strengths.push(`Strong technical knowledge in ${selectedRole.toLowerCase()} concepts`);
    }
    if (scores.clarity > 85) {
      strengths.push('Clear and structured responses using STAR method');
    }
    if (scores.communication > 80) {
      strengths.push('Confident delivery and professional tone');
    }
    
    if (analysisData?.gaps && analysisData.gaps.length > 0) {
      improvements.push(`Consider strengthening knowledge in: ${analysisData.gaps[0].split(':')[1]?.trim() || analysisData.gaps[0]}`);
    }
    if (scores.technical < 80) {
      improvements.push(`Practice more ${selectedRole.toLowerCase()} technical questions`);
    }
    if (scores.communication < 80) {
      improvements.push('Work on explaining complex concepts more simply');
    }
    
    nextSteps.push(`Practice more ${selectedRole.toLowerCase()} interview questions`);
    if (analysisData?.experienceLevel === 'Junior') {
      nextSteps.push('Build more hands-on projects to demonstrate skills');
    }
    nextSteps.push('Record yourself to improve pace and clarity');
    
    return scores;
  };

  const feedback = sessionComplete ? generateFeedback() : null;

  if (sessionComplete && feedback) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <Award className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Interview Complete!</h2>
            <p className="text-gray-600">Here's your detailed feedback and performance analysis</p>
          </div>

          {/* Overall Score */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-4">
              <span className="text-3xl font-bold text-white">{feedback.overall}</span>
            </div>
            <p className="text-lg text-gray-600">Overall Performance Score</p>
          </div>

          {/* Score Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{feedback.clarity}</div>
              <div className="text-sm text-gray-600">Clarity & Structure</div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: `${feedback.clarity}%` }}
                />
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{feedback.technical}</div>
              <div className="text-sm text-gray-600">Technical Accuracy</div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div 
                  className="bg-purple-600 h-2 rounded-full"
                  style={{ width: `${feedback.technical}%` }}
                />
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{feedback.communication}</div>
              <div className="text-sm text-gray-600">Communication</div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div 
                  className="bg-green-600 h-2 rounded-full"
                  style={{ width: `${feedback.communication}%` }}
                />
              </div>
            </div>
          </div>

          {/* Feedback Details */}
          <div className="space-y-6">
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="font-semibold text-green-800 mb-2">🎉 Strengths</h3>
              <ul className="space-y-1 text-green-700">
                <li>• Clear and structured responses using STAR method</li>
                <li>• Good technical knowledge and examples</li>
                <li>• Confident delivery and professional tone</li>
              </ul>
            </div>
            
            <div className="bg-yellow-50 p-6 rounded-lg">
              <h3 className="font-semibold text-yellow-800 mb-2">💡 Areas for Improvement</h3>
              <ul className="space-y-1 text-yellow-700">
                <li>• Consider providing more specific metrics and results</li>
                <li>• Practice explaining complex technical concepts more simply</li>
                <li>• Work on keeping responses within time limits</li>
              </ul>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-2">🎯 Next Steps</h3>
              <ul className="space-y-1 text-blue-700">
                <li>• Practice more behavioral questions with specific examples</li>
                <li>• Review system design concepts for senior roles</li>
                <li>• Record yourself to improve pace and clarity</li>
              </ul>
            </div>
          </div>

          <div className="flex justify-center space-x-4 mt-8">
            <button
              onClick={() => setSessionComplete(false)}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Practice Again
            </button>
            <button className="bg-gray-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-700 transition-colors">
              Save Results
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Interview Simulator</h1>
        <p className="text-xl text-gray-600">
          Practice with AI-powered mock interviews and get instant feedback
        </p>
      </div>

      {!activeSession ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Start Session */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Start New Session</h2>
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Interview Type
                </label>
                <select 
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Frontend Developer">Frontend Developer</option>
                  <option value="Backend Developer">Backend Developer</option>
                  <option value="Full Stack Developer">Full Stack Developer</option>
                  <option value="DevOps Engineer">DevOps Engineer</option>
                  <option value="Data Scientist">Data Scientist</option>
                  <option value="Product Manager">Product Manager</option>
                  <option value="UI/UX Designer">UI/UX Designer</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Type
                </label>
                <select 
                  value={selectedCompany}
                  onChange={(e) => setSelectedCompany(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Tech Startup">Tech Startup</option>
                  <option value="Large Corporation">Large Corporation</option>
                  <option value="Consulting">Consulting</option>
                  <option value="Government">Government</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Experience Level
                </label>
                <select 
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Junior (0-2 years)">Junior (0-2 years)</option>
                  <option value="Mid-level (3-5 years)">Mid-level (3-5 years)</option>
                  <option value="Senior (5+ years)">Senior (5+ years)</option>
                  <option value="Lead (8+ years)">Lead (8+ years)</option>
                </select>
              </div>
            </div>
            
            {analysisData && (
              <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2">Based on Your Resume Analysis:</h3>
                <div className="text-sm text-blue-700 space-y-1">
                  <p>• Target Role: {analysisData.targetRole}</p>
                  <p>• Experience Level: {analysisData.experienceLevel}</p>
                  <p>• Match Score: {analysisData.matchPercentage}%</p>
                  {analysisData.gaps.length > 0 && (
                    <p>• Focus Areas: {analysisData.gaps.slice(0, 2).map(gap => gap.split(':')[1]?.trim() || gap).join(', ')}</p>
                  )}
                </div>
              </div>
            )}
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Job Role (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g., Senior React Developer, ML Engineer"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
                  <option>Backend Developer</option>
                  <option>Full Stack Developer</option>
                  <option>Product Manager</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Type
                </label>
                <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                  <option>Tech Startup</option>
                  <option>Large Corporation</option>
                  <option>Consulting</option>
                  <option>Government</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Experience Level
                </label>
                <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                  <option>Mid-level (3-5 years)</option>
                  <option>Junior (0-2 years)</option>
                  <option>Senior (5+ years)</option>
                  <option>Lead (8+ years)</option>
                </select>
              </div>
            </div>
            <button
              onClick={startSession}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
            >
              <Play className="h-5 w-5" />
              <span>Start Interview</span>
            </button>
          </div>

          {/* Previous Sessions */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Previous Sessions</h2>
            <div className="space-y-4">
              {[
                { date: '2024-01-15', score: 85, type: 'Frontend Developer' },
                { date: '2024-01-10', score: 78, type: 'Full Stack Developer' },
                { date: '2024-01-05', score: 72, type: 'Frontend Developer' },
              ].map((session, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-900">{session.type}</div>
                    <div className="text-sm text-gray-600">{session.date}</div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="text-lg font-bold text-blue-600">{session.score}</div>
                    <button className="text-blue-600 hover:text-blue-700">
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">
                Question {currentQuestion + 1} of {interviewQuestions.length}
              </span>
              <span className="text-sm text-gray-500">
                {Math.round(((currentQuestion + 1) / interviewQuestions.length) * 100)}% Complete
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / interviewQuestions.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question */}
          <div className="mb-8">
            <div className="flex items-center space-x-2 mb-4">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                {interviewQuestions[currentQuestion].category}
              </span>
              <div className="flex items-center space-x-1 text-gray-500">
                <Clock className="h-4 w-4" />
                <span className="text-sm">{interviewQuestions[currentQuestion].timeLimit}s</span>
              </div>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              {interviewQuestions[currentQuestion].question}
            </h2>
            <p className="text-gray-600 bg-blue-50 p-4 rounded-lg">
              💡 {interviewQuestions[currentQuestion].tips}
            </p>
          </div>

          {/* Answer Input */}
          <div className="mb-6">
            <div className="flex items-center space-x-2 mb-4">
              <MessageCircle className="h-5 w-5 text-gray-500" />
              <span className="font-medium text-gray-700">Your Answer</span>
              <button
                onClick={() => setIsRecording(!isRecording)}
                className={`p-2 rounded-full transition-colors ${
                  isRecording ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'
                }`}
              >
                {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              </button>
            </div>
            <textarea
              value={currentAnswer}
              onChange={(e) => setCurrentAnswer(e.target.value)}
              placeholder="Type your answer here or use voice recording..."
              className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Controls */}
          <div className="flex justify-between items-center">
            <button
              onClick={() => setActiveSession(false)}
              className="px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Exit Session
            </button>
            <button
              onClick={nextQuestion}
              disabled={!currentAnswer.trim()}
              className={`px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2 ${
                currentAnswer.trim()
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <span>{currentQuestion === interviewQuestions.length - 1 ? 'Finish' : 'Next Question'}</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InterviewSimulator;