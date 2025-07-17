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
}

const InterviewSimulator: React.FC<InterviewSimulatorProps> = ({ onProgress }) => {
  const [activeSession, setActiveSession] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [sessionComplete, setSessionComplete] = useState(false);
  const [answers, setAnswers] = useState<string[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState('');

  const interviewQuestions = [
    {
      category: 'Behavioral',
      question: 'Tell me about a time when you had to work with a difficult team member.',
      tips: 'Use the STAR method (Situation, Task, Action, Result) to structure your response.',
      timeLimit: 120
    },
    {
      category: 'Technical',
      question: 'Explain the difference between useEffect and useLayoutEffect in React.',
      tips: 'Focus on timing, performance implications, and when to use each.',
      timeLimit: 90
    },
    {
      category: 'Problem Solving',
      question: 'How would you optimize the performance of a React application?',
      tips: 'Mention specific techniques like memoization, code splitting, and lazy loading.',
      timeLimit: 150
    },
    {
      category: 'Behavioral',
      question: 'Describe a project you\'re particularly proud of.',
      tips: 'Highlight your technical contributions and the impact of your work.',
      timeLimit: 120
    },
    {
      category: 'Technical',
      question: 'What are the key considerations for implementing authentication in a web application?',
      tips: 'Cover security best practices, token management, and user experience.',
      timeLimit: 180
    }
  ];

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
    const scores = {
      clarity: Math.floor(Math.random() * 20) + 80,
      technical: Math.floor(Math.random() * 15) + 75,
      communication: Math.floor(Math.random() * 25) + 70,
      overall: Math.floor(Math.random() * 20) + 75
    };
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
                <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                  <option>Frontend Developer</option>
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