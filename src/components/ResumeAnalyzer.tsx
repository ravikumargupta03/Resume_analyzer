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
  X,
  Brain,
  Zap
} from 'lucide-react';

interface ResumeAnalyzerProps {
  onProgress: (progress: any) => void;
}

interface AnalysisResult {
  matchPercentage: number;
  strengths: string[];
  gaps: string[];
  recommendations: string[];
  skillsFound: string[];
  experienceLevel: string;
  industryMatch: number;
}

const ResumeAnalyzer: React.FC<ResumeAnalyzerProps> = ({ onProgress }) => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [targetRole, setTargetRole] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [analysisResults, setAnalysisResults] = useState<AnalysisResult | null>(null);

  // Job requirements database
  const jobRequirements = {
    'Frontend Developer': {
      requiredSkills: ['React', 'JavaScript', 'HTML', 'CSS', 'TypeScript'],
      preferredSkills: ['Redux', 'Next.js', 'Webpack', 'Jest', 'Git'],
      experienceAreas: ['UI/UX', 'responsive design', 'performance optimization'],
      seniority: {
        junior: { minYears: 0, maxYears: 2 },
        mid: { minYears: 2, maxYears: 5 },
        senior: { minYears: 5, maxYears: 10 }
      }
    },
    'Backend Developer': {
      requiredSkills: ['Node.js', 'Python', 'Java', 'SQL', 'API'],
      preferredSkills: ['AWS', 'Docker', 'MongoDB', 'Redis', 'Microservices'],
      experienceAreas: ['database design', 'system architecture', 'API development'],
      seniority: {
        junior: { minYears: 0, maxYears: 2 },
        mid: { minYears: 2, maxYears: 5 },
        senior: { minYears: 5, maxYears: 10 }
      }
    },
    'Full Stack Developer': {
      requiredSkills: ['React', 'Node.js', 'JavaScript', 'SQL', 'Git'],
      preferredSkills: ['TypeScript', 'AWS', 'Docker', 'MongoDB', 'Redux'],
      experienceAreas: ['full-stack development', 'database design', 'deployment'],
      seniority: {
        junior: { minYears: 0, maxYears: 2 },
        mid: { minYears: 2, maxYears: 5 },
        senior: { minYears: 5, maxYears: 10 }
      }
    },
    'DevOps Engineer': {
      requiredSkills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Linux'],
      preferredSkills: ['Terraform', 'Jenkins', 'Monitoring', 'Ansible', 'Python'],
      experienceAreas: ['infrastructure', 'automation', 'monitoring'],
      seniority: {
        junior: { minYears: 1, maxYears: 3 },
        mid: { minYears: 3, maxYears: 6 },
        senior: { minYears: 6, maxYears: 10 }
      }
    },
    'Data Scientist': {
      requiredSkills: ['Python', 'SQL', 'Machine Learning', 'Statistics', 'Pandas'],
      preferredSkills: ['TensorFlow', 'PyTorch', 'R', 'Tableau', 'Spark'],
      experienceAreas: ['data analysis', 'machine learning', 'statistical modeling'],
      seniority: {
        junior: { minYears: 0, maxYears: 2 },
        mid: { minYears: 2, maxYears: 5 },
        senior: { minYears: 5, maxYears: 10 }
      }
    },
    'Product Manager': {
      requiredSkills: ['Product Strategy', 'Analytics', 'User Research', 'Agile', 'Roadmapping'],
      preferredSkills: ['SQL', 'A/B Testing', 'Wireframing', 'Stakeholder Management', 'Market Research'],
      experienceAreas: ['product development', 'user experience', 'market analysis'],
      seniority: {
        junior: { minYears: 1, maxYears: 3 },
        mid: { minYears: 3, maxYears: 6 },
        senior: { minYears: 6, maxYears: 10 }
      }
    },
    'UI/UX Designer': {
      requiredSkills: ['Figma', 'Adobe Creative Suite', 'User Research', 'Prototyping', 'Wireframing'],
      preferredSkills: ['Sketch', 'InVision', 'HTML/CSS', 'Design Systems', 'Usability Testing'],
      experienceAreas: ['user interface design', 'user experience', 'design thinking'],
      seniority: {
        junior: { minYears: 0, maxYears: 2 },
        mid: { minYears: 2, maxYears: 5 },
        senior: { minYears: 5, maxYears: 10 }
      }
    },
    'Mobile Developer': {
      requiredSkills: ['React Native', 'Swift', 'Kotlin', 'iOS', 'Android'],
      preferredSkills: ['Flutter', 'Xamarin', 'Firebase', 'App Store', 'Mobile UI'],
      experienceAreas: ['mobile development', 'app deployment', 'mobile UI/UX'],
      seniority: {
        junior: { minYears: 0, maxYears: 2 },
        mid: { minYears: 2, maxYears: 5 },
        senior: { minYears: 5, maxYears: 10 }
      }
    },
    'Machine Learning Engineer': {
      requiredSkills: ['Python', 'TensorFlow', 'PyTorch', 'Machine Learning', 'Deep Learning'],
      preferredSkills: ['MLOps', 'Kubernetes', 'Docker', 'AWS SageMaker', 'Model Deployment'],
      experienceAreas: ['model development', 'ML pipeline', 'model deployment'],
      seniority: {
        junior: { minYears: 1, maxYears: 3 },
        mid: { minYears: 3, maxYears: 6 },
        senior: { minYears: 6, maxYears: 10 }
      }
    },
    'Cybersecurity Specialist': {
      requiredSkills: ['Network Security', 'Penetration Testing', 'CISSP', 'Firewall', 'Incident Response'],
      preferredSkills: ['Ethical Hacking', 'SIEM', 'Compliance', 'Risk Assessment', 'Forensics'],
      experienceAreas: ['security assessment', 'threat analysis', 'security implementation'],
      seniority: {
        junior: { minYears: 1, maxYears: 3 },
        mid: { minYears: 3, maxYears: 6 },
        senior: { minYears: 6, maxYears: 10 }
      }
    }
  };

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

  // Simulate resume text extraction and analysis
  const extractResumeContent = async (file: File): Promise<string> => {
    // In a real implementation, you would use a PDF/DOC parser
    // For simulation, we'll generate different content based on file name and size
    const fileName = file.name.toLowerCase();
    const fileSize = file.size;
    
    // Simulate different resume contents based on file characteristics
    const resumeVariations = [
      `John Doe
      Software Engineer with 3 years of experience
      Skills: React, JavaScript, Node.js, Python, SQL, Git, AWS
      Experience: Frontend Developer at TechCorp (2021-2024)
      Built responsive web applications using React and TypeScript
      Implemented REST APIs using Node.js and Express
      Education: BS Computer Science`,
      
      `Jane Smith
      Senior Full Stack Developer with 5 years of experience
      Skills: React, Angular, Vue.js, Node.js, Python, Django, PostgreSQL, Docker, Kubernetes
      Experience: Senior Developer at StartupXYZ (2019-2024)
      Led team of 4 developers, architected microservices
      Deployed applications on AWS with CI/CD pipelines
      Education: MS Software Engineering`,
      
      `Mike Johnson
      Junior Developer with 1 year of experience
      Skills: HTML, CSS, JavaScript, React, Git
      Experience: Junior Developer at WebAgency (2023-2024)
      Developed landing pages and simple web applications
      Collaborated with design team on UI implementation
      Education: Bootcamp Graduate`,
      
      `Sarah Wilson
      DevOps Engineer with 4 years of experience
      Skills: AWS, Docker, Kubernetes, Jenkins, Terraform, Python, Linux, Monitoring
      Experience: DevOps Engineer at CloudTech (2020-2024)
      Managed infrastructure for 50+ microservices
      Implemented CI/CD pipelines reducing deployment time by 60%
      Education: BS Information Technology`,
      
      `Alex Chen
      Data Scientist with 2 years of experience
      Skills: Python, R, SQL, Machine Learning, TensorFlow, Pandas, Tableau
      Experience: Data Analyst at DataCorp (2022-2024)
      Built predictive models improving customer retention by 25%
      Created dashboards and reports for executive team
      Education: MS Data Science`
    ];
    
    // Select variation based on file characteristics
    const index = (fileName.charCodeAt(0) + fileSize) % resumeVariations.length;
    return resumeVariations[index];
  };

  const analyzeResume = async () => {
    if (!uploadedFile || !targetRole) return;
    
    setIsAnalyzing(true);
    
    try {
      // Simulate file processing delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Extract resume content
      const resumeText = await extractResumeContent(uploadedFile);
      
      // Get job requirements
      const jobReqs = jobRequirements[targetRole as keyof typeof jobRequirements];
      if (!jobReqs) {
        throw new Error('Invalid target role');
      }
      
      // Analyze skills
      const foundSkills = [...jobReqs.requiredSkills, ...jobReqs.preferredSkills].filter(skill =>
        resumeText.toLowerCase().includes(skill.toLowerCase())
      );
      
      const requiredSkillsFound = jobReqs.requiredSkills.filter(skill =>
        resumeText.toLowerCase().includes(skill.toLowerCase())
      );
      
      const missingRequiredSkills = jobReqs.requiredSkills.filter(skill =>
        !resumeText.toLowerCase().includes(skill.toLowerCase())
      );
      
      const missingPreferredSkills = jobReqs.preferredSkills.filter(skill =>
        !resumeText.toLowerCase().includes(skill.toLowerCase())
      );
      
      // Calculate match percentage
      const requiredMatch = (requiredSkillsFound.length / jobReqs.requiredSkills.length) * 70;
      const preferredMatch = (foundSkills.filter(skill => 
        jobReqs.preferredSkills.includes(skill)
      ).length / jobReqs.preferredSkills.length) * 30;
      
      const matchPercentage = Math.round(requiredMatch + preferredMatch);
      
      // Determine experience level
      const experienceYears = resumeText.match(/(\d+)\s*years?\s*of\s*experience/i);
      const years = experienceYears ? parseInt(experienceYears[1]) : 0;
      
      let experienceLevel = 'Junior';
      if (years >= jobReqs.seniority.senior.minYears) experienceLevel = 'Senior';
      else if (years >= jobReqs.seniority.mid.minYears) experienceLevel = 'Mid-level';
      
      // Generate strengths
      const strengths = [];
      if (requiredSkillsFound.length > 0) {
        strengths.push(`Strong foundation in ${requiredSkillsFound.slice(0, 3).join(', ')}`);
      }
      if (years > 0) {
        strengths.push(`${years} years of relevant experience in the field`);
      }
      if (foundSkills.some(skill => jobReqs.preferredSkills.includes(skill))) {
        strengths.push(`Experience with preferred technologies like ${foundSkills.filter(skill => 
          jobReqs.preferredSkills.includes(skill)
        ).slice(0, 2).join(', ')}`);
      }
      if (resumeText.toLowerCase().includes('team') || resumeText.toLowerCase().includes('led')) {
        strengths.push('Demonstrated leadership and teamwork experience');
      }
      
      // Generate skill gaps
      const gaps = [];
      if (missingRequiredSkills.length > 0) {
        gaps.push(`Missing critical skills: ${missingRequiredSkills.slice(0, 3).join(', ')}`);
      }
      if (missingPreferredSkills.length > 2) {
        gaps.push(`Limited experience with: ${missingPreferredSkills.slice(0, 3).join(', ')}`);
      }
      if (years < jobReqs.seniority.mid.minYears) {
        gaps.push('Could benefit from more hands-on project experience');
      }
      if (!resumeText.toLowerCase().includes('project') && !resumeText.toLowerCase().includes('built')) {
        gaps.push('Portfolio could showcase more completed projects');
      }
      
      // Generate recommendations
      const recommendations = [];
      if (missingRequiredSkills.length > 0) {
        recommendations.push(`Learn ${missingRequiredSkills[0]} through online courses and practice projects`);
      }
      if (missingPreferredSkills.length > 0) {
        recommendations.push(`Gain experience with ${missingPreferredSkills[0]} to stand out from other candidates`);
      }
      if (years < 2) {
        recommendations.push('Build 2-3 portfolio projects demonstrating your skills');
      }
      recommendations.push(`Practice ${targetRole.toLowerCase()} interview questions and technical challenges`);
      
      const results: AnalysisResult = {
        matchPercentage,
        strengths: strengths.length > 0 ? strengths : ['Professional resume format and structure'],
        gaps: gaps.length > 0 ? gaps : ['Consider adding more specific technical details'],
        recommendations: recommendations.length > 0 ? recommendations : ['Continue building relevant experience'],
        skillsFound: foundSkills,
        experienceLevel,
        industryMatch: Math.round(matchPercentage * 0.8)
      };
      
      setAnalysisResults(results);
      setAnalysisComplete(true);
      
      onProgress((prev: any) => ({ 
        ...prev, 
        resumeAnalyzed: true,
        analysisData: {
          targetRole,
          gaps: results.gaps,
          recommendations: results.recommendations,
          matchPercentage: results.matchPercentage,
          skillsFound: results.skillsFound,
          experienceLevel: results.experienceLevel
        }
      }));
      
    } catch (error) {
      console.error('Analysis failed:', error);
      setUploadError('Analysis failed. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  if (analysisComplete && analysisResults) {
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
            Here's your detailed analysis for <span className="font-semibold text-blue-600">{targetRole}</span>
          </p>
        </div>

        {/* Match Score */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4 shadow-lg">
                <span className="text-4xl font-bold text-white">{analysisResults.matchPercentage}%</span>
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Job Match Score</h2>
              <p className="text-gray-600">Overall compatibility with {targetRole}</p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full mb-4 shadow-lg">
                <span className="text-4xl font-bold text-white">{analysisResults.skillsFound.length}</span>
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Skills Matched</h2>
              <p className="text-gray-600">Relevant skills found in your resume</p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-r from-orange-500 to-red-600 rounded-full mb-4 shadow-lg">
                <span className="text-2xl font-bold text-white">{analysisResults.experienceLevel}</span>
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Experience Level</h2>
              <p className="text-gray-600">Based on your background</p>
            </div>
          </div>
        </div>

        {/* Skills Found */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-2xl">
              <Brain className="h-6 w-6 text-blue-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Skills Found in Your Resume</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {analysisResults.skillsFound.map((skill, index) => (
              <span key={index} className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full font-medium">
                {skill}
              </span>
            ))}
            {analysisResults.skillsFound.length === 0 && (
              <p className="text-gray-600">No specific technical skills detected. Consider adding more technical details to your resume.</p>
            )}
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
              {analysisResults.strengths.map((strength, index) => (
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
              <h2 className="text-xl font-bold text-gray-900">Areas for Improvement</h2>
            </div>
            <div className="space-y-4">
              {analysisResults.gaps.map((gap, index) => (
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
            <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-2xl">
              <BookOpen className="h-6 w-6 text-purple-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Personalized Recommendations</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {analysisResults.recommendations.map((recommendation, index) => (
              <div key={index} className="p-6 bg-purple-50 rounded-2xl hover:bg-purple-100 transition-colors duration-200">
                <div className="flex items-start space-x-3">
                  <div className="flex items-center justify-center w-6 h-6 bg-purple-600 text-white rounded-full text-sm font-bold flex-shrink-0">
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
              setAnalysisResults(null);
            }}
            className="px-8 py-4 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-2xl font-semibold hover:from-gray-700 hover:to-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Analyze Another Resume
          </button>
          <button 
            onClick={() => {
              onProgress((prev: any) => ({ 
                ...prev, 
                roadmapCreated: true,
                analysisData: {
                  targetRole,
                  gaps: analysisResults.gaps,
                  recommendations: analysisResults.recommendations,
                  matchPercentage: analysisResults.matchPercentage,
                  skillsFound: analysisResults.skillsFound,
                  experienceLevel: analysisResults.experienceLevel
                }
              }));
              // Navigate to roadmap after a short delay
              setTimeout(() => {
                window.dispatchEvent(new CustomEvent('navigate-to-roadmap'));
              }, 100);
            }}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
          >
            <Zap className="h-5 w-5" />
            <span>Create Learning Roadmap</span>
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
          AI Resume Analyzer
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Upload your resume and get instant, personalized feedback on how well it matches your target role, plus actionable recommendations to improve your chances
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
          <div className="space-y-4">
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
              <option value="Mobile Developer">Mobile Developer</option>
              <option value="Machine Learning Engineer">Machine Learning Engineer</option>
              <option value="Cybersecurity Specialist">Cybersecurity Specialist</option>
            </select>
            
            <div className="relative">
              <input
                type="text"
                placeholder="Or enter a custom role (e.g., Senior React Developer, AI Engineer)"
                className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 text-gray-900 bg-white"
                onChange={(e) => {
                  if (e.target.value.trim()) {
                    setTargetRole(e.target.value.trim());
                  }
                }}
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
            </div>
            
            {targetRole && !Object.keys(jobRequirements).includes(targetRole) && (
              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-xl">
                <p className="text-yellow-800 text-sm">
                  <strong>Custom Role:</strong> We'll analyze your resume against general software development requirements. 
                  For more specific analysis, select a predefined role.
                </p>
              </div>
            )}
          </div>
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
                <Brain className="h-5 w-5" />
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