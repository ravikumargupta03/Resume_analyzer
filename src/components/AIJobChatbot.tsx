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
  const [conversationContext, setConversationContext] = useState<string[]>([]);

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
        company: 'Flipkart',
        location: 'Bangalore, India',
        salary: '₹15,00,000 - ₹25,00,000',
        url: 'https://www.flipkartcareers.com',
        match: 95,
        skills: ['React', 'TypeScript', 'JavaScript']
      },
      {
        title: 'Full Stack Engineer',
        company: 'Swiggy',
        location: 'Bangalore, India',
        salary: '₹12,00,000 - ₹18,00,000',
        url: 'https://careers.swiggy.com',
        match: 88,
        skills: ['React', 'Node.js', 'GraphQL']
      },
      {
        title: 'Backend Developer',
        company: 'Razorpay',
        location: 'Bangalore, India',
        salary: '₹14,00,000 - ₹20,00,000',
        url: 'https://razorpay.com/jobs',
        match: 82,
        skills: ['Python', 'AWS', 'Microservices']
      },
      {
        title: 'DevOps Engineer',
        company: 'Paytm',
        location: 'Noida, India',
        salary: '₹10,00,000 - ₹16,00,000',
        url: 'https://amazon.jobs',
        match: 78,
        skills: ['AWS', 'Docker', 'Kubernetes']
      },
      {
        title: 'Data Scientist',
        company: 'Ola',
        location: 'Bangalore, India',
        salary: '₹16,00,000 - ₹22,00,000',
        url: 'https://www.olacabs.com/careers',
        match: 85,
        skills: ['Python', 'Machine Learning', 'SQL']
      },
      {
        title: 'React Developer',
        company: 'Zomato',
        location: 'Gurgaon, India',
        salary: '₹8,00,000 - ₹14,00,000',
        url: 'https://www.zomato.com/careers',
        match: 90,
        skills: ['React', 'Redux', 'JavaScript']
      },
      {
        title: 'Software Engineer',
        company: 'BYJU\'S',
        location: 'Bangalore, India',
        salary: '₹12,00,000 - ₹18,00,000',
        url: 'https://byjus.com/careers',
        match: 87,
        skills: ['React', 'Node.js', 'MongoDB']
      }
    ];

    // Filter jobs based on keywords
    let filteredJobs = jobDatabase;
    
    if (keywords.includes('frontend') || keywords.includes('react')) {
      filteredJobs = jobDatabase.filter(job => 
        job.title.toLowerCase().includes('frontend') || 
        job.title.toLowerCase().includes('react') ||
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
    } else if (keywords.includes('full stack') || keywords.includes('fullstack')) {
      filteredJobs = jobDatabase.filter(job => 
        job.title.toLowerCase().includes('full stack') || job.title.toLowerCase().includes('engineer')
      );
    }

    return filteredJobs.slice(0, 3); // Return top 3 matches
  };

  const generateBotResponse = (userMessage: string): string => {
    const keywords = userMessage.toLowerCase();
    const context = conversationContext.join(' ').toLowerCase();
    
    // Context-aware responses
    if (context.includes('salary') && (keywords.includes('negotiate') || keywords.includes('negotiation'))) {
      return "For salary negotiation in India: 1) Research market rates on platforms like Glassdoor and AmbitionBox, 2) Highlight your unique skills and achievements, 3) Consider the complete package (salary + benefits + ESOPs), 4) Be prepared to justify your ask with concrete examples, 5) Timing is key - negotiate after receiving the offer. Indian companies often have 10-20% negotiation room.";
    }
    
    if (context.includes('interview') && (keywords.includes('prepare') || keywords.includes('preparation'))) {
      return "For Indian tech interviews: 1) Practice coding on HackerRank/LeetCode, 2) Prepare for system design (especially for senior roles), 3) Know your resume inside-out, 4) Research the company's products and recent news, 5) Prepare questions about growth, learning opportunities, and team structure. Many Indian companies focus heavily on problem-solving and cultural fit.";
    }
    
    // Location-specific responses
    if (keywords.includes('bangalore') || keywords.includes('bengaluru')) {
      return "Bangalore is India's Silicon Valley! It has the highest concentration of tech jobs with companies like Flipkart, Swiggy, Razorpay, and global offices of Google, Microsoft, Amazon. Average salaries are 15-20% higher than other Indian cities. Here are some opportunities:";
    }
    
    if (keywords.includes('mumbai')) {
      return "Mumbai has a growing tech scene with fintech companies like Paytm, PhonePe, and many startups. It's also home to traditional IT companies and has good opportunities in e-commerce. Here are relevant positions:";
    }
    
    if (keywords.includes('delhi') || keywords.includes('ncr') || keywords.includes('gurgaon') || keywords.includes('noida')) {
      return "Delhi NCR has major tech hubs in Gurgaon and Noida with companies like Paytm, Zomato, OYO, and many MNCs. The region offers diverse opportunities across different tech domains:";
    }
    
    // Greeting responses
    if (keywords.includes('hello') || keywords.includes('hi')) {
      const greetings = [
        "Hello! I'm your AI career assistant. I can help you find jobs in India's booming tech market. What role are you looking for?",
        "Hi there! Ready to explore exciting career opportunities? Tell me about your dream job or skills!",
        "Namaste! I'm here to help you navigate India's tech job market. What position interests you?"
      ];
      return greetings[Math.floor(Math.random() * greetings.length)];
    }
    
    // Salary-related responses
    if (keywords.includes('salary') || keywords.includes('pay')) {
      return "Indian tech salaries have grown significantly! Bangalore and Mumbai offer the highest packages. For freshers: ₹3-8L, Mid-level: ₹8-20L, Senior: ₹20L+. What's your experience level and preferred location?";
    }
    
    // Remote work responses
    if (keywords.includes('remote')) {
      return "Remote work is booming in India! Many companies now offer hybrid/remote options, especially post-COVID. Startups and product companies are most flexible. What's your technical expertise?";
    }
    
    // Role-specific responses with more variety
    if (keywords.includes('frontend') || keywords.includes('react')) {
      const responses = [
        "Frontend development is hot in India! React developers are especially in demand. Companies like Flipkart, Swiggy are actively hiring:",
        "Great choice! Frontend roles in India focus heavily on React, Next.js, and TypeScript. Here are some exciting opportunities:",
        "Frontend development offers excellent growth in India's product companies. Check out these React positions:"
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }
    
    if (keywords.includes('backend') || keywords.includes('python')) {
      const responses = [
        "Backend development is crucial for India's growing fintech and e-commerce sectors. Here are some Python/Java opportunities:",
        "Excellent! Backend engineers are highly valued, especially with microservices experience. Check these roles:",
        "Backend development offers great career growth in India. Many companies need scalable solutions:"
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }
    
    if (keywords.includes('devops') || keywords.includes('aws')) {
      return "DevOps is exploding in India! With digital transformation, companies need cloud experts. AWS/Azure skills are highly valued. Here are some opportunities:";
    }
    
    if (keywords.includes('data') || keywords.includes('machine learning')) {
      return "Data Science and ML are huge in India! Companies like Flipkart, Ola, Swiggy need data experts for personalization and analytics. Here are some roles:";
    }
    
    if (keywords.includes('startup') || keywords.includes('startups')) {
      return "Indian startup ecosystem is thriving! Startups offer equity, faster growth, and diverse experience. Bangalore, Mumbai, Delhi have the most opportunities. Here are some startup roles:";
    }
    
    if (keywords.includes('experience') || keywords.includes('fresher') || keywords.includes('entry level')) {
      return "For freshers in India: Focus on product-based companies, build strong GitHub profile, contribute to open source, and practice coding. Many companies have dedicated fresher programs:";
    }
    
    if (keywords.includes('help') || keywords.includes('how')) {
      return "I can help you with: 🔍 Job search in Indian companies, 💰 Salary insights, 📍 Location-specific advice, 🎯 Role recommendations, 📝 Interview tips, and 🚀 Career guidance. What would you like to know?";
    }
    
    // Default responses with more variety
    const defaultResponses = [
      "Based on your interests, I found some relevant opportunities in India's tech market:",
      "Here are some exciting positions that match your profile:",
      "I've curated these opportunities from India's top tech companies:"
    ];
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
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
    
    // Update conversation context
    setConversationContext(prev => [...prev.slice(-4), inputText]); // Keep last 5 messages for context
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
                  placeholder="Ask about jobs in India, salaries, interview tips..."
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