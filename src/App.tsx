import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import ResumeAnalyzer from './components/ResumeAnalyzer';
import LearningRoadmap from './components/LearningRoadmap';
import InterviewSimulator from './components/InterviewSimulator';
import MarketInsights from './components/MarketInsights';
import JobTracker from './components/JobTracker';
import ContactUs from './components/ContactUs';
import Navigation from './components/Navigation';

function App() {
  const [activeModule, setActiveModule] = useState('dashboard');
  const [userProgress, setUserProgress] = useState({
    resumeAnalyzed: false,
    roadmapCreated: false,
    interviewsCompleted: 0,
    applicationsSubmitted: 0,
    skillsLearned: 0
  });

  const renderActiveModule = () => {
    switch (activeModule) {
      case 'dashboard':
        return <Dashboard userProgress={userProgress} onModuleSelect={setActiveModule} />;
      case 'resume':
        return <ResumeAnalyzer onProgress={setUserProgress} />;
      case 'roadmap':
        return <LearningRoadmap onProgress={setUserProgress} analysisData={userProgress.analysisData} />;
      case 'interview':
        return <InterviewSimulator onProgress={setUserProgress} />;
      case 'insights':
        return <MarketInsights />;
      case 'tracker':
        return <JobTracker onProgress={setUserProgress} />;
      case 'contact':
        return <ContactUs />;
      default:
        return <Dashboard userProgress={userProgress} onModuleSelect={setActiveModule} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <Navigation activeModule={activeModule} onModuleSelect={setActiveModule} />
      <main className="pt-20">
        {renderActiveModule()}
      </main>
    </div>
  );
}

export default App;