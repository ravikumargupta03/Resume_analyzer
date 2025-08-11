import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import ResumeAnalyzer from './components/ResumeAnalyzer';
import LearningRoadmap from './components/LearningRoadmap';
import InterviewSimulator from './components/InterviewSimulator';
import MarketInsights from './components/MarketInsights';
import JobTracker from './components/JobTracker';
import ContactUs from './components/ContactUs';
import Navigation from './components/Navigation';
import AIJobChatbot from './components/AIJobChatbot';
import UserFeedback from './components/UserFeedback';
import VideoInterview from './components/VideoInterview';

function App() {
  const [activeModule, setActiveModule] = useState('dashboard');
  const [darkMode, setDarkMode] = useState(false);
  const [userProgress, setUserProgress] = useState({
    resumeAnalyzed: false,
    roadmapCreated: false,
    interviewsCompleted: 0,
    applicationsSubmitted: 0,
    skillsLearned: 0,
    recentAchievements: []
  });

  // Dark mode effect
  React.useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);
  // Listen for navigation events
  React.useEffect(() => {
    const handleNavigateToRoadmap = () => {
      setActiveModule('roadmap');
    };
    
    window.addEventListener('navigate-to-roadmap', handleNavigateToRoadmap);
    
    return () => {
      window.removeEventListener('navigate-to-roadmap', handleNavigateToRoadmap);
    };
  }, []);

  const renderActiveModule = () => {
    switch (activeModule) {
      case 'dashboard':
        return <Dashboard userProgress={userProgress} onModuleSelect={setActiveModule} darkMode={darkMode} />;
      case 'resume':
        return <ResumeAnalyzer onProgress={setUserProgress} />;
      case 'roadmap':
        return <LearningRoadmap onProgress={setUserProgress} analysisData={userProgress.analysisData} />;
      case 'interview':
        return <InterviewSimulator onProgress={setUserProgress} analysisData={userProgress.analysisData} />;
      case 'insights':
        return <MarketInsights />;
      case 'tracker':
        return <JobTracker onProgress={setUserProgress} />;
      case 'contact':
        return <ContactUs />;
      case 'feedback':
        return <UserFeedback />;
      case 'video-interview':
        return <VideoInterview onProgress={setUserProgress} analysisData={userProgress.analysisData} />;
      default:
        return <Dashboard userProgress={userProgress} onModuleSelect={setActiveModule} darkMode={darkMode} />;
    }
  };

  return (
    <div className={`min-h-screen transition-all duration-300 ${
      darkMode 
        ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900' 
        : 'bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50'
    }`}>
      <Navigation 
        activeModule={activeModule} 
        onModuleSelect={setActiveModule}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
      />
      <main className="pt-20">
        {renderActiveModule()}
      </main>
      <AIJobChatbot />
    </div>
  );
}

export default App;