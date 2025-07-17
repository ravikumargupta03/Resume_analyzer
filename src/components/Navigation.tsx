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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <Sparkles className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">CareerFlow AI</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onModuleSelect(item.id)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    activeModule === item.id
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="md:hidden">
            <button className="p-2 rounded-lg hover:bg-gray-100">
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