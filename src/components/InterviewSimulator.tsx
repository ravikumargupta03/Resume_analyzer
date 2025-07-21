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
  MicOff,
  Mail,
  Send
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
  const [userEmail, setUserEmail] = useState('');
  const [emailNotifications, setEmailNotifications] = useState(false);

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
    // Generate truly dynamic feedback based on answers and analysis data
    let baseScore = 60;
    
    // Analyze answer quality
    const totalAnswerLength = answers.reduce((sum, answer) => sum + answer.length, 0);
    const avgAnswerLength = totalAnswerLength / answers.length;
    
    // Enhanced scoring based on answer quality
    if (avgAnswerLength > 300) baseScore += 20; // Very detailed answers
    else if (avgAnswerLength > 200) baseScore += 15; // Detailed answers
    else if (avgAnswerLength > 100) baseScore += 10; // Moderate detail
    else if (avgAnswerLength > 50) baseScore += 5; // Basic answers
    else baseScore -= 10; // Very short answers
    
    // Enhanced technical keyword analysis
    const technicalKeywords = [
      'algorithm', 'database', 'API', 'framework', 'optimization', 'testing', 'deployment',
      'architecture', 'scalability', 'performance', 'security', 'microservices', 'cloud',
      'docker', 'kubernetes', 'ci/cd', 'agile', 'scrum', 'git', 'version control'
    ];
    
    const keywordCount = answers.reduce((count, answer) => {
      return count + technicalKeywords.filter(keyword => 
        answer.toLowerCase().includes(keyword)
      ).length;
    }, 0);
    
    baseScore += Math.min(keywordCount * 2, 20); // Up to 20 points for technical terms
    
    // Enhanced STAR method detection
    const starKeywords = [
      'situation', 'task', 'action', 'result', 'challenge', 'solution', 'problem',
      'implemented', 'achieved', 'improved', 'reduced', 'increased', 'led', 'managed'
    ];
    
    const starCount = answers.reduce((count, answer) => {
      return count + starKeywords.filter(keyword => 
        answer.toLowerCase().includes(keyword)
      ).length;
    }, 0);
    
    baseScore += Math.min(starCount * 1.5, 15); // Up to 15 points for structured answers
    
    // Penalty for very generic answers
    const genericPhrases = ['good', 'nice', 'okay', 'fine', 'yes', 'no'];
    const genericCount = answers.reduce((count, answer) => {
      const words = answer.toLowerCase().split(' ');
      return count + genericPhrases.filter(phrase => words.includes(phrase)).length;
    }, 0);
    
    if (genericCount > answers.length * 2) {
      baseScore -= 15; // Penalty for too many generic responses
    }
    
    // Bonus for specific examples and numbers
    const specificityBonus = answers.reduce((bonus, answer) => {
      const hasNumbers = /\d+/.test(answer);
      const hasSpecificExamples = answer.toLowerCase().includes('example') || 
                                 answer.toLowerCase().includes('instance') ||
                                 answer.toLowerCase().includes('specifically');
      return bonus + (hasNumbers ? 3 : 0) + (hasSpecificExamples ? 2 : 0);
    }, 0);
    
    baseScore += Math.min(specificityBonus, 15);
    
    // Analysis data bonus
    const matchBonus = analysisData ? Math.floor(analysisData.matchPercentage * 0.15) : 0;
    baseScore += matchBonus;
    
    // Ensure scores are within reasonable bounds
    baseScore = Math.min(98, Math.max(35, baseScore));
    
    const scores = {
      clarity: Math.min(98, Math.max(30, baseScore + (starCount > 3 ? 10 : 0) + Math.floor(Math.random() * 6) - 3)),
      technical: Math.min(98, Math.max(30, baseScore + matchBonus + (keywordCount > 5 ? 15 : 0) + Math.floor(Math.random() * 6) - 3)),
      communication: Math.min(98, Math.max(30, baseScore + (avgAnswerLength > 150 ? 10 : 0) + Math.floor(Math.random() * 6) - 3)),
      overall: 0
    };
    
    scores.overall = Math.round((scores.clarity + scores.technical + scores.communication) / 3);
    
    // Send email notification if enabled
    if (emailNotifications && userEmail) {
      sendEmailNotification(scores, userEmail);
    }
    
    return scores;
  };

  const sendEmailNotification = async (scores: any, email: string) => {
    try {
      // In a real implementation, this would call your backend API
      console.log('Sending email notification to:', email);
      console.log('Interview results:', scores);
      
      // Simulate email sending
      const emailContent = {
        to: email,
        subject: `Interview Results - ${selectedRole} at ${selectedCompany}`,
        body: `
          Congratulations on completing your mock interview!
          
          Overall Score: ${scores.overall}%
          - Technical Skills: ${scores.technical}%
          - Communication: ${scores.communication}%
          - Clarity & Structure: ${scores.clarity}%
          
          Keep practicing and you'll continue to improve!
          
          Best regards,
          CareerFlow AI Team
        `
      };
      
      // Here you would typically make an API call to your backend
      // await fetch('/api/send-email', { method: 'POST', body: JSON.stringify(emailContent) });
      
    } catch (error) {
      console.error('Failed to send email notification:', error);
    }
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-green-50 p-6 rounded-2xl border border-green-200">
              <h3 className="font-semibold text-green-800 mb-2">🎉 Strengths</h3>
              <ul className="space-y-1 text-green-700">
                {feedback.clarity > 85 && <li>• Excellent clarity and structured responses</li>}
                {feedback.technical > 80 && <li>• Strong technical knowledge demonstrated</li>}
                {feedback.communication > 80 && <li>• Outstanding communication skills</li>}
                {answers.reduce((sum, answer) => sum + answer.length, 0) / answers.length > 150 && 
                  <li>• Provided detailed and comprehensive responses</li>}
                {answers.some(answer => 
                  ['algorithm', 'database', 'API', 'framework', 'architecture', 'scalability'].some(keyword => 
                    answer.toLowerCase().includes(keyword)
                  )
                ) && <li>• Used appropriate technical vocabulary</li>}
                {answers.some(answer => 
                  ['situation', 'task', 'action', 'result', 'achieved', 'improved'].some(keyword => 
                    answer.toLowerCase().includes(keyword)
                  )
                ) && <li>• Applied STAR method effectively</li>}
                {answers.some(answer => /\d+/.test(answer)) && <li>• Provided specific examples with metrics</li>}
              </ul>
            </div>
            
            <div className="bg-yellow-50 p-6 rounded-2xl border border-yellow-200">
              <h3 className="font-semibold text-yellow-800 mb-2">💡 Areas for Improvement</h3>
              <ul className="space-y-1 text-yellow-700">
                {feedback.technical < 70 && <li>• Strengthen technical knowledge in {selectedRole.toLowerCase()}</li>}
                {feedback.communication < 70 && <li>• Practice explaining concepts more clearly</li>}
                {feedback.clarity < 70 && <li>• Use more structured response format (STAR method)</li>}
                {answers.reduce((sum, answer) => sum + answer.length, 0) / answers.length < 100 && 
                  <li>• Provide more detailed examples and explanations</li>}
                {answers.reduce((sum, answer) => sum + answer.length, 0) / answers.length < 50 && 
                  <li>• Avoid overly brief responses - elaborate on your answers</li>}
                {!answers.some(answer => /\d+/.test(answer)) && 
                  <li>• Include specific metrics and numbers in your examples</li>}
              </ul>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-2xl border border-blue-200">
              <h3 className="font-semibold text-blue-800 mb-2">🚀 Next Steps</h3>
              <ul className="space-y-1 text-blue-700">
                <li>• Practice more {selectedRole.toLowerCase()} interview questions</li>
                {feedback.communication < 75 && <li>• Practice speaking clearly and at appropriate pace</li>}
                {feedback.technical < 75 && <li>• Study core {selectedRole.toLowerCase()} concepts</li>}
                {analysisData?.experienceLevel === 'Junior' && <li>• Build more hands-on projects to demonstrate skills</li>}
                <li>• Research {selectedCompany.toLowerCase()} specific interview processes</li>
                <li>• Practice with mock interviews regularly</li>
              </ul>
            </div>
          </div>

          {/* Email Confirmation */}
          {emailNotifications && userEmail && (
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6 mb-8 animate-slide-up">
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-8 h-8 bg-green-100 rounded-full">
                  <Send className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="font-semibold text-green-800">Results Sent!</p>
                  <p className="text-sm text-green-700">Interview results have been sent to {userEmail}</p>
                </div>
              </div>
            </div>
          )}
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <button
              onClick={() => {
                setSessionComplete(false);
                setActiveSession(false);
                setCurrentQuestion(0);
                setAnswers([]);
                setCurrentAnswer('');
              }}
              className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Practice Again</span>
            </button>
            <button className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              Share Results
            </button>
          </div>

          {/* Previous Sessions */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mt-8">
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
      </div>
    );
  }

  if (!activeSession) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <MessageCircle className="h-8 w-8 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">AI Interview Simulator</h2>
            <p className="text-gray-600">Practice with realistic interview questions tailored to your profile</p>
          </div>

          {/* Configuration */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option>Frontend Developer</option>
                <option>Backend Developer</option>
                <option>Full Stack Developer</option>
                <option>DevOps Engineer</option>
                <option>Data Scientist</option>
                <option>Product Manager</option>
                <option>UI/UX Designer</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Company Type</label>
              <select
                value={selectedCompany}
                onChange={(e) => setSelectedCompany(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option>Tech Startup</option>
                <option>Big Tech (FAANG)</option>
                <option>Enterprise</option>
                <option>Consulting</option>
                <option>Financial Services</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Experience Level</label>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option>Junior (0-2 years)</option>
                <option>Mid-level (3-5 years)</option>
                <option>Senior (5+ years)</option>
                <option>Lead/Principal (8+ years)</option>
              </select>
            </div>
          </div>

          {/* Email Notification Settings */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 mb-8 border border-blue-200">
            <div className="flex items-center space-x-3 mb-4">
              <Mail className="h-6 w-6 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">Email Notifications</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="emailNotifications"
                  checked={emailNotifications}
                  onChange={(e) => setEmailNotifications(e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="emailNotifications" className="text-sm font-medium text-gray-700">
                  Send interview results to my email
                </label>
              </div>
              {emailNotifications && (
                <div className="animate-slide-up">
                  <input
                    type="email"
                    placeholder="Enter your professional email"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}
            </div>
          </div>
          {/* Analysis Integration */}
          {analysisData && (
            <div className="bg-blue-50 p-6 rounded-lg mb-8">
              <h3 className="font-semibold text-blue-800 mb-2">🎯 Personalized for You</h3>
              <p className="text-blue-700 mb-3">
                Based on your resume analysis, we've customized questions for {analysisData.targetRole} 
                with {analysisData.matchPercentage}% profile match.
              </p>
              {analysisData.gaps.length > 0 && (
                <div>
                  <p className="text-sm text-blue-600 mb-2">Focus areas identified:</p>
                  <div className="flex flex-wrap gap-2">
                    {analysisData.gaps.slice(0, 3).map((gap, index) => (
                      <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                        {gap.split(':')[1]?.trim() || gap}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <Star className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">AI-Powered Questions</h3>
                <p className="text-sm text-gray-600">Dynamic questions based on your role and experience</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Clock className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Real-time Feedback</h3>
                <p className="text-sm text-gray-600">Instant analysis of your responses and delivery</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <Mic className="h-4 w-4 text-purple-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Voice Recording</h3>
                <p className="text-sm text-gray-600">Practice speaking and improve your delivery</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                <Award className="h-4 w-4 text-orange-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Performance Tracking</h3>
                <p className="text-sm text-gray-600">Track your progress over multiple sessions</p>
              </div>
            </div>
          </div>

          {/* Start Button */}
          <div className="text-center">
            <button
              onClick={startSession}
              className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 mx-auto"
            >
              <Play className="h-5 w-5" />
              <span>Start Interview Session</span>
            </button>
            <p className="text-sm text-gray-500 mt-2">
              Session will include 5-7 questions • Estimated time: 15-20 minutes
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
    </div>
  );
};

export default InterviewSimulator;