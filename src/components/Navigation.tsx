import React from 'react';
import { 
  Home, 
  FileText, 
  Map, 
  MessageCircle, 
  TrendingUp, 
  Briefcase,
  Sparkles,
  Mail,
  Moon,
  Sun
} from 'lucide-react';

interface NavigationProps {
  activeModule: string;
  onModuleSelect: (module: string) => void;
  darkMode?: boolean;
  onToggleDarkMode?: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ 
  activeModule, 
  onModuleSelect, 
  darkMode = false, 
  onToggleDarkMode 
}) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'resume', label: 'Resume Analyzer', icon: FileText },
    { id: 'roadmap', label: 'Learning Roadmap', icon: Map },
    { id: 'interview', label: 'Interview Simulator', icon: MessageCircle },
    { id: 'insights', label: 'Market Insights', icon: TrendingUp },
    { id: 'tracker', label: 'Job Tracker', icon: Briefcase },
    { id: 'contact', label: 'Contact Us', icon: Mail },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b shadow-lg transition-all duration-300 ${
      darkMode 
        ? 'bg-gray-900/95 border-gray-700/50' 
        : 'bg-white/95 border-gray-200/50'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">CareerFlow AI</span>
              <div className={`text-xs font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Your AI Career Companion
              </div>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onModuleSelect(item.id)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-300 group relative ${
                    activeModule === item.id
                      ? darkMode
                        ? 'bg-gradient-to-r from-blue-900/50 to-purple-900/50 text-blue-300 shadow-md'
                        : 'bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 shadow-md'
                      : darkMode
                        ? 'text-gray-300 hover:text-white hover:bg-gray-800'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                  {activeModule === item.id && (
                    <div className={`absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full ${
                      darkMode ? 'bg-blue-400' : 'bg-blue-600'
                    }`}></div>
                  )}
                </button>
              );
            })}
            
            {/* Dark Mode Toggle */}
            {onToggleDarkMode && (
              <button
                onClick={onToggleDarkMode}
                className={`p-3 rounded-xl transition-all duration-300 ml-2 ${
                  darkMode
                    ? 'text-yellow-400 hover:bg-gray-800 hover:text-yellow-300'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
                title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
            )}
          </div>

          <div className="md:hidden">
            <button className={`p-3 rounded-xl transition-colors duration-200 ${
              darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
            }`}>
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