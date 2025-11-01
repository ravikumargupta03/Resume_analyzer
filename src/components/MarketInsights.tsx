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
  const [selectedLocation, setSelectedLocation] = useState('Bangalore, India');
  const [customRole, setCustomRole] = useState('');

  // Dynamic market data based on location and role
  const getLocationMultiplier = (location: string) => {
    const multipliers: { [key: string]: number } = {
      'Bangalore, India': 1.0,
      'Mumbai, India': 1.15,
      'Delhi NCR, India': 1.1,
      'Hyderabad, India': 0.95,
      'Chennai, India': 0.9,
      'Pune, India': 0.85,
      'Kolkata, India': 0.8,
      'Ahmedabad, India': 0.75,
      'Remote (India)': 0.9,
      'San Francisco, CA': 2.8,
      'New York, NY': 2.5,
      'London, UK': 2.2,
      'Singapore': 1.8,
      'Dubai, UAE': 1.6
    };
    return multipliers[location] || 1.0;
  };

  const getDemandByLocation = (location: string) => {
    const demands: { [key: string]: string } = {
      'Bangalore, India': 'Very High',
      'Mumbai, India': 'Very High',
      'Delhi NCR, India': 'High',
      'Hyderabad, India': 'High',
      'Chennai, India': 'High',
      'Pune, India': 'Medium',
      'Kolkata, India': 'Medium',
      'Ahmedabad, India': 'Medium',
      'Remote (India)': 'Very High',
      'San Francisco, CA': 'Very High',
      'New York, NY': 'Very High',
      'London, UK': 'High',
      'Singapore': 'High',
      'Dubai, UAE': 'Medium'
    };
    return demands[location] || 'Medium';
  };

  const getOpeningsByLocation = (baseOpenings: number, location: string) => {
    const locationFactors: { [key: string]: number } = {
      'Bangalore, India': 2.5,
      'Mumbai, India': 2.0,
      'Delhi NCR, India': 1.8,
      'Hyderabad, India': 1.5,
      'Chennai, India': 1.3,
      'Pune, India': 1.2,
      'Kolkata, India': 0.8,
      'Ahmedabad, India': 0.7,
      'Remote (India)': 3.0,
      'San Francisco, CA': 1.2,
      'New York, NY': 1.1,
      'London, UK': 0.9,
      'Singapore': 0.8,
      'Dubai, UAE': 0.6
    };
    return Math.round(baseOpenings * (locationFactors[location] || 1.0));
  };

  const marketData = {
    'Frontend Developer': {
      averageSalary: Math.round(800000 * getLocationMultiplier(selectedLocation)), // Base salary in INR
      salaryRange: { min: 600000, max: 1200000 },
      demand: getDemandByLocation(selectedLocation),
      growth: '+15%',
      openings: getOpeningsByLocation(2847, selectedLocation),
      topSkills: ['React', 'TypeScript', 'JavaScript', 'CSS', 'Node.js'],
      topCompanies: selectedLocation.includes('India') 
        ? ['TCS', 'Infosys', 'Wipro', 'Flipkart', 'Swiggy'] 
        : ['Google', 'Meta', 'Netflix', 'Stripe', 'Airbnb'],
      experience: {
        'Junior (0-2 years)': { 
          salary: Math.round(500000 * getLocationMultiplier(selectedLocation)), 
          openings: getOpeningsByLocation(850, selectedLocation) 
        },
        'Mid-level (3-5 years)': { 
          salary: Math.round(800000 * getLocationMultiplier(selectedLocation)), 
          openings: getOpeningsByLocation(1200, selectedLocation) 
        },
        'Senior (5+ years)': { 
          salary: Math.round(1200000 * getLocationMultiplier(selectedLocation)), 
          openings: getOpeningsByLocation(797, selectedLocation) 
        }
      }
    },
    'Backend Developer': {
      averageSalary: Math.round(900000 * getLocationMultiplier(selectedLocation)),
      salaryRange: { min: 700000, max: 1400000 },
      demand: getDemandByLocation(selectedLocation),
      growth: '+22%',
      openings: getOpeningsByLocation(3254, selectedLocation),
      topSkills: ['Python', 'Java', 'AWS', 'Docker', 'PostgreSQL'],
      topCompanies: selectedLocation.includes('India') 
        ? ['Amazon', 'Microsoft', 'Paytm', 'Zomato', 'BYJU\'S'] 
        : ['Amazon', 'Microsoft', 'Uber', 'Spotify', 'Palantir'],
      experience: {
        'Junior (0-2 years)': { 
          salary: Math.round(600000 * getLocationMultiplier(selectedLocation)), 
          openings: getOpeningsByLocation(980, selectedLocation) 
        },
        'Mid-level (3-5 years)': { 
          salary: Math.round(900000 * getLocationMultiplier(selectedLocation)), 
          openings: getOpeningsByLocation(1450, selectedLocation) 
        },
        'Senior (5+ years)': { 
          salary: Math.round(1400000 * getLocationMultiplier(selectedLocation)), 
          openings: getOpeningsByLocation(824, selectedLocation) 
        }
      }
    },
    'Full Stack Developer': {
      averageSalary: Math.round(850000 * getLocationMultiplier(selectedLocation)),
      salaryRange: { min: 650000, max: 1300000 },
      demand: getDemandByLocation(selectedLocation),
      growth: '+18%',
      openings: getOpeningsByLocation(2156, selectedLocation),
      topSkills: ['React', 'Node.js', 'Python', 'MongoDB', 'AWS'],
      topCompanies: selectedLocation.includes('India') 
        ? ['Razorpay', 'Freshworks', 'Ola', 'PhonePe', 'Myntra'] 
        : ['Shopify', 'Square', 'Twilio', 'Figma', 'Notion'],
      experience: {
        'Junior (0-2 years)': { 
          salary: Math.round(550000 * getLocationMultiplier(selectedLocation)), 
          openings: getOpeningsByLocation(650, selectedLocation) 
        },
        'Mid-level (3-5 years)': { 
          salary: Math.round(850000 * getLocationMultiplier(selectedLocation)), 
          openings: getOpeningsByLocation(980, selectedLocation) 
        },
        'Senior (5+ years)': { 
          salary: Math.round(1300000 * getLocationMultiplier(selectedLocation)), 
          openings: getOpeningsByLocation(526, selectedLocation) 
        }
      }
    },
    'DevOps Engineer': {
      averageSalary: Math.round(1000000 * getLocationMultiplier(selectedLocation)),
      salaryRange: { min: 800000, max: 1500000 },
      demand: getDemandByLocation(selectedLocation),
      growth: '+25%',
      openings: getOpeningsByLocation(1890, selectedLocation),
      topSkills: ['AWS', 'Docker', 'Kubernetes', 'Jenkins', 'Terraform'],
      topCompanies: selectedLocation.includes('India') 
        ? ['Amazon', 'Microsoft', 'Google', 'Jio', 'Airtel'] 
        : ['Amazon', 'Microsoft', 'Google', 'Netflix', 'Uber'],
      experience: {
        'Junior (0-2 years)': { 
          salary: Math.round(700000 * getLocationMultiplier(selectedLocation)), 
          openings: getOpeningsByLocation(450, selectedLocation) 
        },
        'Mid-level (3-5 years)': { 
          salary: Math.round(1000000 * getLocationMultiplier(selectedLocation)), 
          openings: getOpeningsByLocation(890, selectedLocation) 
        },
        'Senior (5+ years)': { 
          salary: Math.round(1500000 * getLocationMultiplier(selectedLocation)), 
          openings: getOpeningsByLocation(550, selectedLocation) 
        }
      }
    },
    'Data Scientist': {
      averageSalary: Math.round(1100000 * getLocationMultiplier(selectedLocation)),
      salaryRange: { min: 900000, max: 1600000 },
      demand: getDemandByLocation(selectedLocation),
      growth: '+20%',
      openings: getOpeningsByLocation(1650, selectedLocation),
      topSkills: ['Python', 'R', 'SQL', 'Machine Learning', 'TensorFlow'],
      topCompanies: selectedLocation.includes('India') 
        ? ['Google', 'Microsoft', 'Flipkart', 'Ola', 'Nykaa'] 
        : ['Google', 'Meta', 'Netflix', 'Uber', 'Airbnb'],
      experience: {
        'Junior (0-2 years)': { 
          salary: Math.round(800000 * getLocationMultiplier(selectedLocation)), 
          openings: getOpeningsByLocation(380, selectedLocation) 
        },
        'Mid-level (3-5 years)': { 
          salary: Math.round(1100000 * getLocationMultiplier(selectedLocation)), 
          openings: getOpeningsByLocation(780, selectedLocation) 
        },
        'Senior (5+ years)': { 
          salary: Math.round(1600000 * getLocationMultiplier(selectedLocation)), 
          openings: getOpeningsByLocation(490, selectedLocation) 
        }
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
    const isIndianLocation = selectedLocation.includes('India');
    return new Intl.NumberFormat(isIndianLocation ? 'en-IN' : 'en-US', {
      style: 'currency',
      currency: isIndianLocation ? 'INR' : 'USD',
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
              <option value="Frontend Developer">Frontend Developer</option>
              <option value="Backend Developer">Backend Developer</option>
              <option value="Full Stack Developer">Full Stack Developer</option>
              <option value="DevOps Engineer">DevOps Engineer</option>
              <option value="Data Scientist">Data Scientist</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <Search className="h-5 w-5 text-gray-500" />
            <input
              type="text"
              placeholder="Custom role (e.g., ML Engineer)"
              value={customRole}
              onChange={(e) => setCustomRole(e.target.value)}
              className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="h-5 w-5 text-gray-500" />
            <select 
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <optgroup label="🇮🇳 India">
                <option value="Bangalore, India">Bangalore, India</option>
                <option value="Mumbai, India">Mumbai, India</option>
                <option value="Delhi NCR, India">Delhi NCR, India</option>
                <option value="Hyderabad, India">Hyderabad, India</option>
                <option value="Chennai, India">Chennai, India</option>
                <option value="Pune, India">Pune, India</option>
                <option value="Kolkata, India">Kolkata, India</option>
                <option value="Ahmedabad, India">Ahmedabad, India</option>
                <option value="Remote (India)">Remote (India)</option>
              </optgroup>
              <optgroup label="🌍 International">
                <option value="San Francisco, CA">San Francisco, CA</option>
                <option value="New York, NY">New York, NY</option>
                <option value="London, UK">London, UK</option>
                <option value="Singapore">Singapore</option>
                <option value="Dubai, UAE">Dubai, UAE</option>
              </optgroup>
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