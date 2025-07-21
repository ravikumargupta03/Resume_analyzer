import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageCircle, 
  Send, 
  Bot, 
  User, 
  Briefcase, 
  MapPin, 
  DollarSign,
  ExternalLink,
  X,
  Minimize2,
  Maximize2
} from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  jobRecommendations?: JobRecommendation[];
}

interface JobRecommendation {
  title: string;
  company: string;
  location: string;
  salary: string;
  url: string;
  match: number;
  skills: string[];
}

const AIJobChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm your AI job search assistant. I can help you find job opportunities based on your skills and preferences. What kind of role are you looking for?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateJobRecommendations = (userMessage: string): JobRecommendation[] => {
    // Simple keyword matching for demo purposes
    const keywords = userMessage.toLowerCase();
    
    const jobDatabase = [
      {
        title: 'Senior Frontend Developer',
        company: 'Google',
        location: 'Mountain View, CA',
        salary: '$150,000 - $200,000',
        url: 'https://careers.google.com',
        match: 95,
        skills: ['React', 'TypeScript', 'JavaScript']
      },
      {
        title: 'Full Stack Engineer',
        company: 'Meta',
        location: 'Menlo Park, CA',
        salary: '$140,000 - $180,000',
        url: 'https://careers.meta.com',
        match: 88,
        skills: ['React', 'Node.js', 'GraphQL']
      },
      {
        title: 'Backend Developer',
        company: 'Netflix',
        location: 'Los Gatos, CA',
        salary: '$130,000 - $170,000',
        url: 'https://jobs.netflix.com',
        match: 82,
        skills: ['Python', 'AWS', 'Microservices']
      },
      {
        title: 'DevOps Engineer',
        company: 'Amazon',
        location: 'Seattle, WA',
        salary: '$120,000 - $160,000',
        url: 'https://amazon.jobs',
        match: 78,
        skills: ['AWS', 'Docker', 'Kubernetes']
      },
      {
        title: 'Data Scientist',
        company: 'Uber',
        location: 'San Francisco, CA',
        salary: '$135,000 - $175,000',
        url: 'https://uber.com/careers',
        match: 85,
        skills: ['Python', 'Machine Learning', 'SQL']
      }
    ];

    // Filter jobs based on keywords
    let filteredJobs = jobDatabase;
    
    if (keywords.includes('frontend') || keywords.includes('react')) {
      filteredJobs = jobDatabase.filter(job => 
        job.title.toLowerCase().includes('frontend') || 
        job.skills.some(skill => skill.toLowerCase().includes('react'))
      );
    } else if (keywords.includes('backend') || keywords.includes('python')) {
      filteredJobs = jobDatabase.filter(job => 
        job.title.toLowerCase().includes('backend') || 
        job.skills.some(skill => skill.toLowerCase().includes('python'))
      );
    } else if (keywords.includes('devops') || keywords.includes('aws')) {
      filteredJobs = jobDatabase.filter(job => 
        job.title.toLowerCase().includes('devops') || 
        job.skills.some(skill => skill.toLowerCase().includes('aws'))
      );
    } else if (keywords.includes('data') || keywords.includes('machine learning')) {
      filteredJobs = jobDatabase.filter(job => 
        job.title.toLowerCase().includes('data') || 
        job.skills.some(skill => skill.toLowerCase().includes('machine'))
      );
    }

    return filteredJobs.slice(0, 3); // Return top 3 matches
  };

  const generateBotResponse = (userMessage: string): string => {
    const keywords = userMessage.toLowerCase();
    
    if (keywords.includes('hello') || keywords.includes('hi')) {
      return "Hello! I'm here to help you find your next great job opportunity. What type of role interests you?";
    }
    
    if (keywords.includes('salary') || keywords.includes('pay')) {
      return "I can help you find roles with competitive salaries! What's your target salary range and preferred location?";
    }
    
    if (keywords.includes('remote')) {
      return "Great! Remote work is very popular. I'll focus on remote-friendly positions. What's your technical background?";
    }
    
    if (keywords.includes('frontend') || keywords.includes('react')) {
      return "Excellent! Frontend development is in high demand. I found some great React and frontend positions for you:";
    }
    
    if (keywords.includes('backend') || keywords.includes('python')) {
      return "Perfect! Backend development offers great opportunities. Here are some Python and backend roles that match your interests:";
    }
    
    if (keywords.includes('devops') || keywords.includes('aws')) {
      return "DevOps is a fantastic field! I found some excellent cloud and DevOps positions:";
    }
    
    if (keywords.includes('data') || keywords.includes('machine learning')) {
      return "Data science is booming! Here are some exciting data and ML opportunities:";
    }
    
    if (keywords.includes('help') || keywords.includes('how')) {
      return "I can help you find jobs by analyzing your skills and preferences. Just tell me what kind of role you're looking for, your preferred location, or any specific technologies you work with!";
    }
    
    return "Based on your interests, I found some relevant opportunities for you:";
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI processing delay
    setTimeout(() => {
      const botResponse = generateBotResponse(inputText);
      const jobRecommendations = generateJobRecommendations(inputText);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date(),
        jobRecommendations: jobRecommendations.length > 0 ? jobRecommendations : undefined
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-50 flex items-center justify-center animate-bounce"
      >
        <MessageCircle className="h-6 w-6" />
      </button>
    );
  }

  return (
    <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
      isMinimized ? 'w-80 h-16' : 'w-96 h-[600px]'
    }`}>
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 h-full flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <Bot className="h-4 w-4" />
            </div>
            <div>
              <h3 className="font-semibold">AI Job Assistant</h3>
              <p className="text-xs opacity-90">Find your next opportunity</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-1 hover:bg-white/20 rounded transition-colors"
            >
              {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-white/20 rounded transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
                    <div className={`flex items-center space-x-2 mb-1 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                      {message.sender === 'bot' && (
                        <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                          <Bot className="h-3 w-3 text-white" />
                        </div>
                      )}
                      {message.sender === 'user' && (
                        <div className="w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center">
                          <User className="h-3 w-3 text-white" />
                        </div>
                      )}
                    </div>
                    <div className={`p-3 rounded-2xl ${
                      message.sender === 'user' 
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      <p className="text-sm">{message.text}</p>
                    </div>
                    
                    {/* Job Recommendations */}
                    {message.jobRecommendations && (
                      <div className="mt-3 space-y-2">
                        {message.jobRecommendations.map((job, index) => (
                          <div key={index} className="bg-white border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow">
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex-1">
                                <h4 className="font-semibold text-gray-900 text-sm">{job.title}</h4>
                                <p className="text-gray-600 text-xs">{job.company}</p>
                              </div>
                              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                                {job.match}% match
                              </span>
                            </div>
                            
                            <div className="space-y-1 text-xs text-gray-600">
                              <div className="flex items-center space-x-1">
                                <MapPin className="h-3 w-3" />
                                <span>{job.location}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <DollarSign className="h-3 w-3" />
                                <span>{job.salary}</span>
                              </div>
                            </div>
                            
                            <div className="flex flex-wrap gap-1 mt-2">
                              {job.skills.map((skill, skillIndex) => (
                                <span key={skillIndex} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                                  {skill}
                                </span>
                              ))}
                            </div>
                            
                            <a
                              href={job.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-xs mt-2 transition-colors"
                            >
                              <span>Apply Now</span>
                              <ExternalLink className="h-3 w-3" />
                            </a>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <Bot className="h-3 w-3 text-white" />
                    </div>
                    <div className="bg-gray-100 p-3 rounded-2xl">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about jobs, skills, or career advice..."
                  className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputText.trim() || isTyping}
                  className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AIJobChatbot;