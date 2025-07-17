import React, { useState } from 'react';
import { 
  Upload, 
  FileText, 
  CheckCircle, 
  AlertCircle, 
  TrendingUp,
  Target,
  BookOpen,
  Clock,
  X
} from 'lucide-react';

interface ResumeAnalyzerProps {
  onProgress: (progress: any) => void;
}

const ResumeAnalyzer: React.FC<ResumeAnalyzerProps> = ({ onProgress }) => {
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [targetRole, setTargetRole] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (!allowedTypes.includes(file.type)) {
      alert('Please upload a PDF, DOC, or DOCX file.');
      return;
    }

    if (file.size > maxSize) {
      alert('File size must be less than 10MB.');
      return;
    }

    setUploadedFile(file);
  };

  const removeFile = () => {
    setUploadedFile(null);
  };
  const analyzeResume = () => {
    if (!uploadedFile) {
      alert('Please upload your resume first.');
      return;
    }
    if (!targetRole.trim()) {
      alert('Please enter your target job title.');
      return;
    }

    setAnalyzing(true);
    setTimeout(() => {
      setAnalysisComplete(true);
      setAnalyzing(false);
      onProgress((prev: any) => ({ ...prev, resumeAnalyzed: true }));
    }, 3000);
  };

  const skillsData = [
    { skill: 'React', current: 85, required: 90, gap: 5 },
    { skill: 'TypeScript', current: 70, required: 85, gap: 15 },
    { skill: 'Node.js', current: 60, required: 80, gap: 20 },
    { skill: 'System Design', current: 40, required: 75, gap: 35 },
    { skill: 'Testing', current: 45, required: 70, gap: 25 },
  ];

  const recommendations = [
    {
      title: 'Complete TypeScript Mastery Course',
      description: 'Bridge the 15% gap in TypeScript proficiency',
      duration: '2 weeks',
      priority: 'high',
      icon: BookOpen
    },
    {
      title: 'Build Full-Stack Project',
      description: 'Demonstrate Node.js and system design skills',
      duration: '3 weeks',
      priority: 'high',
      icon: Target
    },
    {
      title: 'Practice Unit Testing',
      description: 'Learn Jest and React Testing Library',
      duration: '1 week',
      priority: 'medium',
      icon: CheckCircle
    },
  ];

  if (analyzing) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Analyzing Your Resume</h2>
          <p className="text-gray-600">Please wait while we evaluate your skills and experience...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-6 shadow-lg">
          <FileText className="h-8 w-8 text-white" />
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent mb-4">Resume & Skill Gap Analyzer</h1>
        <p className="text-xl text-gray-600 leading-relaxed">
          Get instant feedback on your resume and discover what skills you need to land your dream job
        </p>
      </div>

      {!analysisComplete ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
            <div className="flex items-center space-x-3 mb-6">
              <Upload className="h-6 w-6 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-900">Upload Your Resume</h2>
            </div>
            {!uploadedFile ? (
              <div
                className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 cursor-pointer group ${
                  dragActive 
                    ? 'border-blue-500 bg-blue-50 scale-105' 
                    : 'border-gray-300 hover:border-blue-500 hover:bg-blue-50 hover:scale-102'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => document.getElementById('file-input')?.click()}
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 transition-all duration-300 ${
                  dragActive ? 'bg-blue-500 text-white scale-110' : 'bg-gray-100 text-gray-400 group-hover:bg-blue-100 group-hover:text-blue-500'
                }`}>
                  <Upload className="h-8 w-8" />
                </div>
                <p className="text-gray-900 font-semibold mb-2 text-lg">
                  {dragActive ? 'Drop your resume here' : 'Drop your resume here or click to browse'}
                </p>
                <p className="text-sm text-gray-500">Supports PDF, DOC, DOCX files • Max 10MB</p>
                <input
                  id="file-input"
                  type="file"
                  className="hidden"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileInput}
                />
              </div>
            ) : (
              <div className="border-2 border-green-300 bg-green-50 rounded-2xl p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-xl">
                      <FileText className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{uploadedFile.name}</p>
                      <p className="text-sm text-gray-600">
                        {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={removeFile}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <div className="mt-4 flex items-center space-x-2 p-3 bg-green-100 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-sm text-green-700 font-medium">Resume uploaded successfully</span>
                </div>
              </div>
            )}
            
            <button 
              onClick={() => document.getElementById('file-input')?.click()}
              className={`w-full mt-6 py-4 px-6 rounded-xl font-semibold transition-all duration-300 ${
                uploadedFile 
                  ? 'bg-gray-600 text-white hover:bg-gray-700 hover:scale-105' 
                  : 'bg-blue-600 text-white hover:bg-blue-700 hover:scale-105'
              }`}
            >
              {uploadedFile ? 'Change Resume' : 'Browse Files'}
            </button>
          </div>

          {/* Target Role Section */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
            <div className="flex items-center space-x-3 mb-6">
              <Target className="h-6 w-6 text-purple-600" />
              <h2 className="text-xl font-semibold text-gray-900">Target Role</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Job Title
                </label>
                <input
                  type="text"
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  placeholder="e.g., Senior Frontend Developer"
                  className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Company Type
                </label>
                <select className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white">
                  <option>SaaS Startup</option>
                  <option>Enterprise</option>
                  <option>Consulting</option>
                  <option>E-commerce</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Experience Level
                </label>
                <select className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white">
                  <option>Mid-level (3-5 years)</option>
                  <option>Junior (0-2 years)</option>
                  <option>Senior (5+ years)</option>
                  <option>Lead/Principal (8+ years)</option>
                </select>
              </div>
            </div>
            <button 
              onClick={analyzeResume}
              className={`w-full mt-8 py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 ${
                uploadedFile && targetRole.trim()
                  ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 hover:scale-105 shadow-lg hover:shadow-xl'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
              disabled={!uploadedFile || !targetRole.trim()}
            >
              🚀 Analyze Match
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Match Score */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
            <div className="text-center mb-8">
              <div className="relative inline-flex items-center justify-center w-32 h-32 mb-6">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
                <div className="relative flex items-center justify-center w-28 h-28 bg-white rounded-full shadow-lg">
                  <span className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">78%</span>
                </div>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Resume Match Score</h2>
              <p className="text-lg text-gray-600">Strong match with room for improvement</p>
              <div className="inline-flex items-center space-x-2 mt-4 px-4 py-2 bg-green-100 text-green-800 rounded-full">
                <CheckCircle className="h-4 w-4" />
                <span className="font-medium">Above Average</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-2xl mb-4">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">12</div>
                <div className="text-sm text-gray-600 font-medium">Matching Skills</div>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-100 rounded-2xl mb-4">
                  <AlertCircle className="h-8 w-8 text-yellow-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">5</div>
                <div className="text-sm text-gray-600 font-medium">Skills to Improve</div>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-2xl mb-4">
                  <TrendingUp className="h-8 w-8 text-red-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">3</div>
                <div className="text-sm text-gray-600 font-medium">Missing Skills</div>
              </div>
            </div>
          </div>

          {/* Skills Breakdown */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Skills Analysis</h2>
            <div className="space-y-6">
              {skillsData.map((skill, index) => (
                <div key={index} className="space-y-3 p-4 bg-gray-50 rounded-2xl">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-gray-900 text-lg">{skill.skill}</span>
                    <span className="text-sm text-gray-600 font-medium">{skill.current}% / {skill.required}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${skill.current}%` }}
                    />
                  </div>
                  {skill.gap > 0 && (
                    <div className="flex items-center space-x-2">
                      <div className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                        Gap: {skill.gap}%
                      </div>
                      <span className="text-sm text-red-600 font-medium">Action needed</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Recommended Actions</h2>
            <div className="space-y-6">
              {recommendations.map((rec, index) => {
                const Icon = rec.icon;
                return (
                  <div key={index} className="flex items-start space-x-6 p-6 bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl hover:from-blue-50 hover:to-purple-50 transition-all duration-300 cursor-pointer group">
                    <div className={`p-2 rounded-lg ${
                      rec.priority === 'high' ? 'bg-red-100 text-red-600' : 'bg-yellow-100 text-yellow-600'
                    }`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 text-lg mb-2">{rec.title}</h3>
                      <p className="text-gray-600 mb-3 leading-relaxed">{rec.description}</p>
                      <div className="flex items-center space-x-4 text-sm">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span className="font-medium">{rec.duration}</span>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          rec.priority === 'high' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {rec.priority.toUpperCase()} PRIORITY
                        </span>
                      </div>
                    </div>
                    <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeAnalyzer;