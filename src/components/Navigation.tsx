import React from 'react';
import { 
  Home, 
  FileText, 
  Map, 
  MessageCircle, 
  TrendingUp, 
  Briefcase,
  Sparkles
} from 'lucide-react';

interface NavigationProps {
  activeModule: string;
  onModuleSelect: (module: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeModule, onModuleSelect }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'resume', label: 'Resume Analyzer', icon: FileText },
    { id: 'roadmap', label: 'Learning Roadmap', icon: Map },
    { id: 'interview', label: 'Interview Simulator', icon: MessageCircle },
    { id: 'insights', label: 'Market Insights', icon: TrendingUp },
    { id: 'tracker', label: 'Job Tracker', icon: Briefcase },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-b border-gray-200/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">CareerFlow AI</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onModuleSelect(item.id)}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 group ${
                    activeModule === item.id
                      ? 'bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 shadow-md'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <Icon className={`h-4 w-4 transition-transform duration-300 ${
                    activeModule === item.id ? 'scale-110' : 'group-hover:scale-110'
                  }`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="md:hidden">
            <button className="p-3 rounded-xl hover:bg-gray-100 transition-colors duration-200">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;