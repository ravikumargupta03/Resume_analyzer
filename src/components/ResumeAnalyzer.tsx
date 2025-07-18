import React, { useState } from 'react';
import { 
  Upload, 
  FileText, 
  Target, 
  TrendingUp, 
  CheckCircle, 
  AlertCircle,
  Star,
  Award,
  BookOpen,
  Clock,
  X
} from 'lucide-react';

interface ResumeAnalyzerProps {
  onProgress: (progress: any) => void;
}

const ResumeAnalyzer: React.FC<ResumeAnalyzerProps> = ({ onProgress }) => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [targetRole, setTargetRole] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [uploadError, setUploadError] = useState('');

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileUpload = (file: File) => {
    setUploadError('');
    
    // Validate file type
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
      setUploadError('Please upload a PDF, DOC, or DOCX file.');
      return;
    }
    
    // Validate file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      setUploadError('File size must be less than 10MB.');
      return;
    }
    
    setUploadedFile(file);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0]);
    }
  };

  const removeFile = () => {
    setUploadedFile(null);
    setUploadError('');
  };

  const analyzeResume = async () => {
    if (!uploadedFile || !targetRole) return;
    
    setIsAnalyzing(true);
    
    // Simulate analysis process
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      setAnalysisComplete(true);
      onProgress((prev: any) => ({ 
        ...prev, 
        resumeAnalyzed: true 
      }));
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const mockAnalysisResults = {
    matchPercentage: 78,
    strengths: [
      'Strong React and TypeScript experience',
      'Good understanding of modern web development',
      'Experience with testing frameworks',
      'Knowledge of version control systems'
    ],
    gaps: [
      'Limited Node.js backend experience',
      'No experience with cloud platforms (AWS/Azure)',
      'Missing system design knowledge',
      'Limited experience with microservices'
    ],
    recommendations: [
      'Complete a Node.js course to strengthen backend skills',
      'Learn AWS fundamentals and get certified',
      'Study system design patterns and scalability',
      'Build a full-stack project with microservices'
    ]
  };

  if (analysisComplete) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl mb-4 shadow-lg">
            <CheckCircle className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent mb-4">
            Resume Analysis Complete
          </h1>
          <p className="text-xl text-gray-600">
            Here's your detailed skill gap analysis and recommendations
          </p>
        </div>

        {/* Match Score */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 mb-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-6 shadow-lg">
              <span className="text-4xl font-bold text-white">{mockAnalysisResults.matchPercentage}%</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Job Match Score</h2>
            <p className="text-gray-600">Your resume matches {mockAnalysisResults.matchPercentage}% of the requirements for {targetRole}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Strengths */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-2xl">
                <Star className="h-6 w-6 text-green-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Your Strengths</h2>
            </div>
            <div className="space-y-4">
              {mockAnalysisResults.strengths.map((strength, index) => (
                <div key={index} className="flex items-start space-x-3 p-4 bg-green-50 rounded-2xl">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 leading-relaxed">{strength}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Skill Gaps */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-2xl">
                <Target className="h-6 w-6 text-orange-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Skill Gaps</h2>
            </div>
            <div className="space-y-4">
              {mockAnalysisResults.gaps.map((gap, index) => (
                <div key={index} className="flex items-start space-x-3 p-4 bg-orange-50 rounded-2xl">
                  <AlertCircle className="h-5 w-5 text-orange-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 leading-relaxed">{gap}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-2xl">
              <BookOpen className="h-6 w-6 text-blue-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Recommended Actions</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockAnalysisResults.recommendations.map((recommendation, index) => (
              <div key={index} className="p-6 bg-blue-50 rounded-2xl hover:bg-blue-100 transition-colors duration-200">
                <div className="flex items-start space-x-3">
                  <div className="flex items-center justify-center w-6 h-6 bg-blue-600 text-white rounded-full text-sm font-bold flex-shrink-0">
                    {index + 1}
                  </div>
                  <span className="text-gray-700 leading-relaxed">{recommendation}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
          <button
            onClick={() => {
              setAnalysisComplete(false);
              setUploadedFile(null);
              setTargetRole('');
            }}
            className="px-8 py-4 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-2xl font-semibold hover:from-gray-700 hover:to-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Analyze Another Resume
          </button>
          <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl">
            onClick={() => onProgress((prev: any) => ({ 
              ...prev, 
              roadmapCreated: true,
              analysisData: {
                targetRole,
                gaps: mockAnalysisResults.gaps,
                recommendations: mockAnalysisResults.recommendations,
                matchPercentage: mockAnalysisResults.matchPercentage
              }
            }))}
            Create Learning Roadmap
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-6 shadow-lg">
          <FileText className="h-8 w-8 text-white" />
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent mb-4">
          Resume Skill Gap Analyzer
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Upload your resume and get instant feedback on how well it matches your target role, plus personalized recommendations to improve your chances
        </p>
      </div>

      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
        {/* File Upload Section */}
        <div className="mb-8">
          <label className="block text-lg font-semibold text-gray-900 mb-4">
            Upload Your Resume
          </label>
          
          {!uploadedFile ? (
            <div
              className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${
                dragActive 
                  ? 'border-blue-500 bg-blue-50 scale-105' 
                  : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileInputChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="space-y-4">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl">
                  <Upload className="h-8 w-8 text-blue-600" />
                </div>
                <div>
                  <p className="text-xl font-semibold text-gray-900 mb-2">
                    Drop your resume here, or click to browse
                  </p>
                  <p className="text-gray-600">
                    Supports PDF, DOC, and DOCX files up to 10MB
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
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
                  className="p-2 text-gray-400 hover:text-red-600 transition-colors duration-200"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
          )}
          
          {uploadError && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl">
              <p className="text-red-700 text-sm">{uploadError}</p>
            </div>
          )}
        </div>

        {/* Target Role Selection */}
        <div className="mb-8">
          <label className="block text-lg font-semibold text-gray-900 mb-4">
            Target Role
          </label>
          <select
            value={targetRole}
            onChange={(e) => setTargetRole(e.target.value)}
            className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 text-gray-900 bg-white"
          >
            <option value="">Select your target role...</option>
            <option value="Frontend Developer">Frontend Developer</option>
            <option value="Backend Developer">Backend Developer</option>
            <option value="Full Stack Developer">Full Stack Developer</option>
            <option value="DevOps Engineer">DevOps Engineer</option>
            <option value="Data Scientist">Data Scientist</option>
            <option value="Product Manager">Product Manager</option>
            <option value="UI/UX Designer">UI/UX Designer</option>
          </select>
        </div>

        {/* Analyze Button */}
        <div className="text-center">
          <button
            onClick={analyzeResume}
            disabled={!uploadedFile || !targetRole || isAnalyzing}
            className={`px-12 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 shadow-lg ${
              uploadedFile && targetRole && !isAnalyzing
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 hover:shadow-xl hover:scale-105'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {isAnalyzing ? (
              <div className="flex items-center space-x-3">
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                <span>Analyzing Resume...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <TrendingUp className="h-5 w-5" />
                <span>Analyze My Resume</span>
              </div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResumeAnalyzer;