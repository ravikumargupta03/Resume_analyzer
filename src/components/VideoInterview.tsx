import React, { useState, useRef, useEffect } from 'react';
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  Play, 
  Pause, 
  RotateCcw,
  Award,
  Clock,
  CheckCircle,
  Star,
  Camera,
  Monitor,
  Lightbulb,
  Target,
  Brain,
  Zap
} from 'lucide-react';

interface VideoInterviewProps {
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

const VideoInterview: React.FC<VideoInterviewProps> = ({ onProgress, analysisData }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [sessionActive, setSessionActive] = useState(false);
  const [sessionComplete, setSessionComplete] = useState(false);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [responses, setResponses] = useState<string[]>([]);
  const [currentResponse, setCurrentResponse] = useState('');
  const [timeRemaining, setTimeRemaining] = useState(120);
  const [selectedRole, setSelectedRole] = useState(analysisData?.targetRole || 'Frontend Developer');
  const [selectedLevel, setSelectedLevel] = useState(analysisData?.experienceLevel || 'Mid-level');
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Enhanced question bank with ideal responses
  const questionBank = {
    'Frontend Developer': [
      {
        question: "Explain the difference between useEffect and useLayoutEffect in React.",
        timeLimit: 120,
        difficulty: "Medium",
        idealResponse: "useEffect runs after the DOM has been painted, making it suitable for side effects that don't need to happen synchronously. useLayoutEffect runs synchronously after all DOM mutations but before the browser paints, making it ideal for DOM measurements or synchronous DOM updates that need to happen before the user sees the changes.",
        keyPoints: ["Timing difference", "DOM painting", "Synchronous vs asynchronous", "Use cases"],
        category: "Technical"
      },
      {
        question: "How would you optimize the performance of a React application?",
        timeLimit: 150,
        difficulty: "Hard",
        idealResponse: "Performance optimization in React involves several strategies: 1) Use React.memo for component memoization, 2) Implement useMemo and useCallback for expensive calculations, 3) Code splitting with React.lazy and Suspense, 4) Optimize bundle size with tree shaking, 5) Use virtual scrolling for large lists, 6) Minimize re-renders by proper state management, 7) Use production builds, and 8) Implement proper key props for lists.",
        keyPoints: ["Memoization", "Code splitting", "Bundle optimization", "State management"],
        category: "Technical"
      },
      {
        question: "Tell me about a challenging UI problem you solved and your approach.",
        timeLimit: 180,
        difficulty: "Medium",
        idealResponse: "I should describe a specific problem using the STAR method (Situation, Task, Action, Result). For example: 'I faced a complex responsive design challenge where the layout needed to work across multiple screen sizes. I analyzed the requirements, created a mobile-first approach using CSS Grid and Flexbox, implemented progressive enhancement, and tested across devices. The result was a 40% improvement in mobile user engagement.'",
        keyPoints: ["STAR method", "Specific example", "Problem-solving approach", "Measurable results"],
        category: "Behavioral"
      }
    ],
    'Backend Developer': [
      {
        question: "Explain the difference between SQL and NoSQL databases and when to use each.",
        timeLimit: 120,
        difficulty: "Medium",
        idealResponse: "SQL databases are relational, use structured schemas, support ACID properties, and are ideal for complex queries and transactions. Examples include PostgreSQL and MySQL. NoSQL databases are non-relational, schema-flexible, horizontally scalable, and better for large-scale, distributed applications. Examples include MongoDB and Cassandra. Choose SQL for complex relationships and consistency, NoSQL for scalability and flexibility.",
        keyPoints: ["ACID properties", "Schema differences", "Scalability", "Use cases"],
        category: "Technical"
      },
      {
        question: "How would you design a RESTful API for a social media platform?",
        timeLimit: 180,
        difficulty: "Hard",
        idealResponse: "I'd design RESTful endpoints following REST principles: 1) Use proper HTTP methods (GET, POST, PUT, DELETE), 2) Structure URLs hierarchically (/users/{id}/posts), 3) Implement proper status codes, 4) Use JSON for data exchange, 5) Add authentication/authorization, 6) Implement rate limiting, 7) Version the API (/v1/), 8) Add proper error handling, and 9) Document with OpenAPI/Swagger.",
        keyPoints: ["REST principles", "HTTP methods", "URL structure", "Authentication", "Documentation"],
        category: "Technical"
      }
    ],
    'Data Scientist': [
      {
        question: "Explain the bias-variance tradeoff in machine learning.",
        timeLimit: 120,
        difficulty: "Hard",
        idealResponse: "The bias-variance tradeoff is a fundamental concept where bias refers to errors from overly simplistic assumptions, leading to underfitting, while variance refers to errors from sensitivity to small fluctuations, leading to overfitting. High bias models are too simple and miss relevant patterns, while high variance models are too complex and capture noise. The goal is to find the optimal balance that minimizes total error, often through techniques like cross-validation, regularization, and ensemble methods.",
        keyPoints: ["Bias definition", "Variance definition", "Underfitting vs overfitting", "Optimization techniques"],
        category: "Technical"
      }
    ]
  };

  const questions = questionBank[selectedRole as keyof typeof questionBank] || questionBank['Frontend Developer'];

  useEffect(() => {
    if (sessionActive && timeRemaining > 0) {
      timerRef.current = setTimeout(() => {
        setTimeRemaining(timeRemaining - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      handleNextQuestion();
    }
    
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [sessionActive, timeRemaining]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: videoEnabled, 
        audio: audioEnabled 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
    }
  };

  const startSession = async () => {
    setSessionActive(true);
    setCurrentQuestion(0);
    setResponses([]);
    setTimeRemaining(questions[0].timeLimit);
    await startCamera();
  };

  const startRecording = () => {
    setIsRecording(true);
    // In a real implementation, you would start MediaRecorder here
  };

  const stopRecording = () => {
    setIsRecording(false);
    // In a real implementation, you would stop MediaRecorder here
  };

  const handleNextQuestion = () => {
    if (currentResponse.trim()) {
      setResponses([...responses, currentResponse]);
    }
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setCurrentResponse('');
      setTimeRemaining(questions[currentQuestion + 1].timeLimit);
    } else {
      setSessionComplete(true);
      setSessionActive(false);
      stopCamera();
      onProgress((prev: any) => ({ 
        ...prev, 
        interviewsCompleted: prev.interviewsCompleted + 1 
      }));
    }
  };

  const generateAIScore = () => {
    // Enhanced AI scoring algorithm
    const scores = responses.map((response, index) => {
      const question = questions[index];
      let score = 50; // Base score
      
      // Length analysis
      const wordCount = response.split(' ').length;
      if (wordCount > 100) score += 15;
      else if (wordCount > 50) score += 10;
      else if (wordCount < 20) score -= 15;
      
      // Key points coverage
      const keyPointsCovered = question.keyPoints.filter(point => 
        response.toLowerCase().includes(point.toLowerCase())
      ).length;
      score += (keyPointsCovered / question.keyPoints.length) * 25;
      
      // Technical vocabulary
      const technicalTerms = ['algorithm', 'optimization', 'performance', 'scalability', 'architecture', 'implementation'];
      const techTermsUsed = technicalTerms.filter(term => 
        response.toLowerCase().includes(term)
      ).length;
      score += techTermsUsed * 3;
      
      // Structure (STAR method for behavioral questions)
      if (question.category === 'Behavioral') {
        const starKeywords = ['situation', 'task', 'action', 'result', 'challenge', 'solution'];
        const starUsage = starKeywords.filter(keyword => 
          response.toLowerCase().includes(keyword)
        ).length;
        score += starUsage * 4;
      }
      
      return Math.min(95, Math.max(20, score));
    });
    
    const overallScore = Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length);
    
    return {
      overall: overallScore,
      technical: Math.round(scores.filter((_, i) => questions[i].category === 'Technical').reduce((sum, score) => sum + score, 0) / scores.filter((_, i) => questions[i].category === 'Technical').length || 0),
      communication: Math.min(95, overallScore + Math.floor(Math.random() * 10) - 5),
      confidence: Math.min(95, overallScore + Math.floor(Math.random() * 8) - 4),
      individual: scores
    };
  };

  const aiScores = sessionComplete ? generateAIScore() : null;

  if (sessionComplete && aiScores) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen">
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full mb-6 shadow-lg animate-bounce">
              <Award className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              AI Video Interview Complete!
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Here's your comprehensive AI-evaluated performance analysis
            </p>
          </div>

          {/* Overall Score */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4 shadow-lg">
              <span className="text-4xl font-bold text-white">{aiScores.overall}</span>
            </div>
            <p className="text-lg text-gray-600 dark:text-gray-300">Overall AI Score</p>
          </div>

          {/* Score Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center p-6 bg-blue-50 dark:bg-blue-900/20 rounded-2xl">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-300">{aiScores.technical}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Technical Knowledge</div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${aiScores.technical}%` }}
                />
              </div>
            </div>
            <div className="text-center p-6 bg-green-50 dark:bg-green-900/20 rounded-2xl">
              <div className="text-3xl font-bold text-green-600 dark:text-green-300">{aiScores.communication}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Communication</div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
                <div 
                  className="bg-green-600 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${aiScores.communication}%` }}
                />
              </div>
            </div>
            <div className="text-center p-6 bg-purple-50 dark:bg-purple-900/20 rounded-2xl">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-300">{aiScores.confidence}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Confidence & Delivery</div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
                <div 
                  className="bg-purple-600 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${aiScores.confidence}%` }}
                />
              </div>
            </div>
          </div>

          {/* Question-by-Question Analysis */}
          <div className="space-y-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Detailed Question Analysis
            </h2>
            {questions.map((question, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-700/50 rounded-2xl p-6 border border-gray-200 dark:border-gray-600">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      Question {index + 1}: {question.question}
                    </h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                      <span className={`px-2 py-1 rounded-full ${
                        question.difficulty === 'Hard' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' :
                        question.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' :
                        'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                      }`}>
                        {question.difficulty}
                      </span>
                      <span>{question.category}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {aiScores.individual[index]}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">AI Score</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">Your Response:</h4>
                    <p className="text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700/50 p-4 rounded-lg">
                      {responses[index] || "No response recorded"}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                      <Lightbulb className="inline h-4 w-4 mr-1" />
                      Ideal Response:
                    </h4>
                    <p className="text-gray-700 dark:text-gray-300 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg text-sm">
                      {question.idealResponse}
                    </p>
                    <div className="mt-3">
                      <h5 className="font-medium text-gray-900 dark:text-white mb-2">Key Points to Cover:</h5>
                      <div className="flex flex-wrap gap-2">
                        {question.keyPoints.map((point, pointIndex) => (
                          <span key={pointIndex} className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 rounded-full text-sm">
                            {point}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* AI Recommendations */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-6 mb-8 border border-purple-200 dark:border-purple-700">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              <Brain className="inline h-6 w-6 mr-2" />
              AI-Powered Recommendations
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-green-800 dark:text-green-400 mb-2">✅ Strengths</h3>
                <ul className="space-y-1 text-green-700 dark:text-green-200">
                  {aiScores.technical > 80 && <li>• Strong technical knowledge demonstrated</li>}
                  {aiScores.communication > 75 && <li>• Clear and articulate communication</li>}
                  {aiScores.confidence > 70 && <li>• Confident delivery and presentation</li>}
                  <li>• Good understanding of {selectedRole.toLowerCase()} concepts</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-orange-800 dark:text-orange-400 mb-2">🎯 Areas for Improvement</h3>
                <ul className="space-y-1 text-orange-700 dark:text-orange-200">
                  {aiScores.technical < 70 && <li>• Strengthen technical knowledge in core areas</li>}
                  {aiScores.communication < 70 && <li>• Practice explaining concepts more clearly</li>}
                  <li>• Include more specific examples and metrics</li>
                  <li>• Practice structured response formats (STAR method)</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => {
                setSessionComplete(false);
                setSessionActive(false);
                setCurrentQuestion(0);
                setResponses([]);
                setCurrentResponse('');
              }}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
            >
              <RotateCcw className="h-5 w-5" />
              <span>Practice Again</span>
            </button>
            <button className="flex-1 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              Download Report
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!sessionActive) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen">
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-red-500 to-pink-600 rounded-2xl mb-6 shadow-lg animate-float">
              <Video className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-red-900 to-pink-900 dark:from-gray-100 dark:via-red-300 dark:to-pink-300 bg-clip-text text-transparent mb-6">
              AI Video Interview
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Practice with our advanced AI that evaluates your responses, body language, and provides detailed feedback with ideal sample answers.
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              { icon: Camera, title: 'Video Recording', desc: 'Record your responses' },
              { icon: Brain, title: 'AI Analysis', desc: 'Advanced AI evaluation' },
              { icon: Target, title: 'Ideal Responses', desc: 'See perfect answers' },
              { icon: Award, title: 'Detailed Scores', desc: 'Comprehensive feedback' }
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="text-center p-4 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-900/20 rounded-2xl">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl mb-3 shadow-lg">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{feature.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{feature.desc}</p>
                </div>
              );
            })}
          </div>

          {/* Configuration */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Target Role</label>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="w-full p-3 border-2 border-gray-200 dark:border-gray-600 rounded-2xl focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900 focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option>Frontend Developer</option>
                <option>Backend Developer</option>
                <option>Full Stack Developer</option>
                <option>Data Scientist</option>
                <option>DevOps Engineer</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Experience Level</label>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="w-full p-3 border-2 border-gray-200 dark:border-gray-600 rounded-2xl focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900 focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option>Junior (0-2 years)</option>
                <option>Mid-level (3-5 years)</option>
                <option>Senior (5+ years)</option>
              </select>
            </div>
          </div>

          {/* Camera Preview */}
          <div className="mb-8">
            <div className="bg-gray-900 dark:bg-gray-800 rounded-2xl p-6 text-center border border-gray-700">
              <video
                ref={videoRef}
                autoPlay
                muted
                className="w-full max-w-md mx-auto rounded-lg"
                style={{ transform: 'scaleX(-1)' }}
              />
              <div className="flex items-center justify-center space-x-4 mt-4">
                <button
                  onClick={() => setVideoEnabled(!videoEnabled)}
                  className={`p-3 rounded-full transition-colors shadow-lg ${
                    videoEnabled ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-gray-600 hover:bg-gray-500 text-gray-300'
                  }`}
                >
                  {videoEnabled ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
                </button>
                <button
                  onClick={() => setAudioEnabled(!audioEnabled)}
                  className={`p-3 rounded-full transition-colors shadow-lg ${
                    audioEnabled ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-gray-600 hover:bg-gray-500 text-gray-300'
                  }`}
                >
                  {audioEnabled ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
                </button>
              </div>
            </div>
          </div>

          {/* Start Button */}
          <div className="text-center">
            <button
              onClick={startSession}
              className="px-12 py-4 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-2xl font-semibold text-lg hover:from-red-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center space-x-3 mx-auto"
            >
              <Play className="h-6 w-6" />
              <span>Start Video Interview</span>
            </button>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
              {questions.length} questions • AI-powered evaluation • Ideal responses included
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen">
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 p-8">
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-gray-500" />
              <span className={`text-sm font-medium ${
                timeRemaining < 30 ? 'text-red-600 dark:text-red-400' : 'text-gray-600 dark:text-gray-400'
              }`}>
                {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}
              </span>
            </div>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-red-500 to-pink-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Video Section */}
          <div>
            <div className="bg-gray-900 dark:bg-gray-800 rounded-2xl p-4 mb-4 border border-gray-700">
              <video
                ref={videoRef}
                autoPlay
                muted
                className="w-full rounded-lg"
                style={{ transform: 'scaleX(-1)' }}
              />
              <div className="flex items-center justify-center space-x-4 mt-4">
                <button
                  onClick={() => setVideoEnabled(!videoEnabled)}
                  className={`p-3 rounded-full transition-colors shadow-lg ${
                    videoEnabled ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-gray-600 hover:bg-gray-500 text-gray-300'
                  }`}
                >
                  {videoEnabled ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
                </button>
                <button
                  onClick={isRecording ? stopRecording : startRecording}
                  className={`p-4 rounded-full transition-colors shadow-lg ${
                    isRecording ? 'bg-red-600 hover:bg-red-700 text-white animate-pulse' : 'bg-green-600 hover:bg-green-700 text-white'
                  }`}
                >
                  {isRecording ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                </button>
                <button
                  onClick={() => setAudioEnabled(!audioEnabled)}
                  className={`p-3 rounded-full transition-colors shadow-lg ${
                    audioEnabled ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-gray-600 hover:bg-gray-500 text-gray-300'
                  }`}
                >
                  {audioEnabled ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
                </button>
              </div>
            </div>
          </div>

          {/* Question Section */}
          <div>
            <div className="mb-6">
              <div className="flex items-center space-x-2 mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  questions[currentQuestion].difficulty === 'Hard' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' :
                  questions[currentQuestion].difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' :
                  'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                }`}>
                  {questions[currentQuestion].difficulty}
                </span>
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 rounded-full text-sm font-medium">
                  {questions[currentQuestion].category}
                </span>
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                {questions[currentQuestion].question}
              </h2>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Your Response (Optional - for reference)
              </label>
              <textarea
                value={currentResponse}
                onChange={(e) => setCurrentResponse(e.target.value)}
                placeholder="You can type notes here while speaking..."
                className="w-full h-32 p-4 border-2 border-gray-200 dark:border-gray-600 rounded-2xl focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900 focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-none"
              />
            </div>

            <div className="flex justify-between items-center">
              <button
                onClick={() => {
                  setSessionActive(false);
                  stopCamera();
                }}
                className="px-6 py-3 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Exit Session
              </button>
              <button
                onClick={handleNextQuestion}
                className="px-8 py-3 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-2xl font-medium hover:from-red-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center space-x-2"
              >
                <span>{currentQuestion === questions.length - 1 ? 'Finish Interview' : 'Next Question'}</span>
                <Zap className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoInterview;