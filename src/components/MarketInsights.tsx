import React, { useState } from 'react';
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  MapPin, 
  Briefcase,
  Star,
  Filter,
  Search
} from 'lucide-react';

const MarketInsights: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState('Frontend Developer');
  const [selectedLocation, setSelectedLocation] = useState('San Francisco, CA');

  const marketData = {
    'Frontend Developer': {
      averageSalary: 125000,
      salaryRange: { min: 95000, max: 165000 },
      demand: 'High',
      growth: '+15%',
      openings: 2847,
      topSkills: ['React', 'TypeScript', 'JavaScript', 'CSS', 'Node.js'],
      topCompanies: ['Google', 'Meta', 'Netflix', 'Stripe', 'Airbnb'],
      experience: {
        'Junior (0-2 years)': { salary: 85000, openings: 850 },
        'Mid-level (3-5 years)': { salary: 125000, openings: 1200 },
        'Senior (5+ years)': { salary: 165000, openings: 797 }
      }
    },
    'Backend Developer': {
      averageSalary: 135000,
      salaryRange: { min: 105000, max: 180000 },
      demand: 'Very High',
      growth: '+22%',
      openings: 3254,
      topSkills: ['Python', 'Java', 'AWS', 'Docker', 'PostgreSQL'],
      topCompanies: ['Amazon', 'Microsoft', 'Uber', 'Spotify', 'Palantir'],
      experience: {
        'Junior (0-2 years)': { salary: 95000, openings: 980 },
        'Mid-level (3-5 years)': { salary: 135000, openings: 1450 },
        'Senior (5+ years)': { salary: 180000, openings: 824 }
      }
    },
    'Full Stack Developer': {
      averageSalary: 130000,
      salaryRange: { min: 100000, max: 170000 },
      demand: 'High',
      growth: '+18%',
      openings: 2156,
      topSkills: ['React', 'Node.js', 'Python', 'MongoDB', 'AWS'],
      topCompanies: ['Shopify', 'Square', 'Twilio', 'Figma', 'Notion'],
      experience: {
        'Junior (0-2 years)': { salary: 90000, openings: 650 },
        'Mid-level (3-5 years)': { salary: 130000, openings: 980 },
        'Senior (5+ years)': { salary: 170000, openings: 526 }
      }
    }
  };

  const currentData = marketData[selectedRole as keyof typeof marketData];

  const salaryTrends = [
    { year: '2020', salary: currentData.averageSalary * 0.85 },
    { year: '2021', salary: currentData.averageSalary * 0.9 },
    { year: '2022', salary: currentData.averageSalary * 0.95 },
    { year: '2023', salary: currentData.averageSalary * 1.0 },
    { year: '2024', salary: currentData.averageSalary * 1.05 }
  ];

  const formatSalary = (salary: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(salary);
  };

  const getDemandColor = (demand: string) => {
    switch (demand) {
      case 'Very High': return 'bg-green-100 text-green-800';
      case 'High': return 'bg-blue-100 text-blue-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Market Insights</h1>
        <p className="text-xl text-gray-600">
          Real-time labor market data to inform your career decisions
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center space-x-2">
            <Briefcase className="h-5 w-5 text-gray-500" />
            <select 
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option>Frontend Developer</option>
              <option>Backend Developer</option>
              <option>Full Stack Developer</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="h-5 w-5 text-gray-500" />
            <select 
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option>San Francisco, CA</option>
              <option>New York, NY</option>
              <option>Seattle, WA</option>
              <option>Austin, TX</option>
            </select>
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Filter className="h-4 w-4" />
            <span>Apply Filters</span>
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center space-x-3 mb-3">
            <DollarSign className="h-8 w-8 text-green-600" />
            <div>
              <h3 className="font-semibold text-gray-900">Average Salary</h3>
              <p className="text-2xl font-bold text-gray-900">{formatSalary(currentData.averageSalary)}</p>
            </div>
          </div>
          <p className="text-sm text-gray-600">
            Range: {formatSalary(currentData.salaryRange.min)} - {formatSalary(currentData.salaryRange.max)}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center space-x-3 mb-3">
            <TrendingUp className="h-8 w-8 text-blue-600" />
            <div>
              <h3 className="font-semibold text-gray-900">Market Demand</h3>
              <span className={`px-2 py-1 rounded-full text-sm font-medium ${getDemandColor(currentData.demand)}`}>
                {currentData.demand}
              </span>
            </div>
          </div>
          <p className="text-sm text-gray-600">Growth: {currentData.growth} YoY</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center space-x-3 mb-3">
            <Briefcase className="h-8 w-8 text-purple-600" />
            <div>
              <h3 className="font-semibold text-gray-900">Open Positions</h3>
              <p className="text-2xl font-bold text-gray-900">{currentData.openings.toLocaleString()}</p>
            </div>
          </div>
          <p className="text-sm text-gray-600">In {selectedLocation}</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center space-x-3 mb-3">
            <Users className="h-8 w-8 text-orange-600" />
            <div>
              <h3 className="font-semibold text-gray-900">Competition</h3>
              <p className="text-2xl font-bold text-gray-900">Medium</p>
            </div>
          </div>
          <p className="text-sm text-gray-600">3.2 applicants per job</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Salary by Experience */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Salary by Experience Level</h2>
          <div className="space-y-4">
            {Object.entries(currentData.experience).map(([level, data]) => (
              <div key={level} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium text-gray-900">{level}</div>
                  <div className="text-sm text-gray-600">{data.openings} openings</div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-blue-600">{formatSalary(data.salary)}</div>
                  <div className="text-sm text-gray-600">median</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Skills */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Most In-Demand Skills</h2>
          <div className="space-y-3">
            {currentData.topSkills.map((skill, index) => (
              <div key={skill} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="flex items-center justify-center w-6 h-6 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
                    {index + 1}
                  </span>
                  <span className="font-medium text-gray-900">{skill}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span className="text-sm text-gray-600">{95 - index * 5}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Companies */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Top Hiring Companies</h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {currentData.topCompanies.map((company, index) => (
            <div key={company} className="text-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-bold text-lg">{company.charAt(0)}</span>
              </div>
              <div className="font-medium text-gray-900">{company}</div>
              <div className="text-sm text-gray-600">{Math.floor(Math.random() * 50) + 10} openings</div>
            </div>
          ))}
        </div>
      </div>

      {/* Salary Trends */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Salary Trends (2020-2024)</h2>
        <div className="space-y-4">
          {salaryTrends.map((trend, index) => (
            <div key={trend.year} className="flex items-center space-x-4">
              <span className="w-12 text-sm text-gray-600">{trend.year}</span>
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(trend.salary / currentData.averageSalary) * 100}%` }}
                />
              </div>
              <span className="text-sm font-medium text-gray-900 w-20 text-right">
                {formatSalary(trend.salary)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarketInsights;