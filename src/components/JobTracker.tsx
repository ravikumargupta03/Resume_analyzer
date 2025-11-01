import React, { useState } from 'react';
import { 
  Plus, 
  Building, 
  Calendar, 
  DollarSign, 
  MapPin,
  ExternalLink,
  Edit3,
  Trash2,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';

interface JobTrackerProps {
  onProgress: (progress: any) => void;
}

interface JobApplication {
  id: string;
  company: string;
  position: string;
  salary: string;
  location: string;
  appliedDate: string;
  status: 'applied' | 'interviewing' | 'offer' | 'rejected';
  notes: string;
  nextStep?: string;
  deadline?: string;
}

const JobTracker: React.FC<JobTrackerProps> = ({ onProgress }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [applications, setApplications] = useState<JobApplication[]>([
    {
      id: '1',
      company: 'Stripe',
      position: 'Senior Frontend Developer',
      salary: '$140,000 - $170,000',
      location: 'San Francisco, CA',
      appliedDate: '2024-01-15',
      status: 'interviewing',
      notes: 'Great company culture. Technical interview scheduled for next week.',
      nextStep: 'System design interview',
      deadline: '2024-01-25'
    },
    {
      id: '2',
      company: 'Airbnb',
      position: 'Frontend Engineer',
      salary: '$130,000 - $160,000',
      location: 'Remote',
      appliedDate: '2024-01-10',
      status: 'applied',
      notes: 'Applied through referral. Waiting for initial response.',
      nextStep: 'Phone screening',
      deadline: '2024-01-20'
    },
    {
      id: '3',
      company: 'Netflix',
      position: 'UI Engineer',
      salary: '$150,000 - $180,000',
      location: 'Los Angeles, CA',
      appliedDate: '2024-01-05',
      status: 'offer',
      notes: 'Received offer! Need to negotiate salary and review benefits.',
      nextStep: 'Salary negotiation',
      deadline: '2024-01-30'
    },
    {
      id: '4',
      company: 'Meta',
      position: 'Frontend Developer',
      salary: '$145,000 - $175,000',
      location: 'Menlo Park, CA',
      appliedDate: '2024-01-01',
      status: 'rejected',
      notes: 'Technical interview went well but they decided to go with another candidate.',
      nextStep: 'Follow up in 6 months'
    }
  ]);

  const [newApplication, setNewApplication] = useState({
    company: '',
    position: '',
    salary: '',
    location: '',
    notes: ''
  });

  const statusColumns = [
    { 
      id: 'applied', 
      title: 'Applied', 
      color: 'bg-blue-100 text-blue-800',
      icon: Clock
    },
    { 
      id: 'interviewing', 
      title: 'Interviewing', 
      color: 'bg-yellow-100 text-yellow-800',
      icon: AlertCircle
    },
    { 
      id: 'offer', 
      title: 'Offer', 
      color: 'bg-green-100 text-green-800',
      icon: CheckCircle
    },
    { 
      id: 'rejected', 
      title: 'Rejected', 
      color: 'bg-red-100 text-red-800',
      icon: XCircle
    }
  ];

  const addApplication = () => {
    if (newApplication.company && newApplication.position) {
      const application: JobApplication = {
        id: Date.now().toString(),
        ...newApplication,
        appliedDate: new Date().toISOString().split('T')[0],
        status: 'applied'
      };
      setApplications([...applications, application]);
      setNewApplication({
        company: '',
        position: '',
        salary: '',
        location: '',
        notes: ''
      });
      setShowAddForm(false);
      onProgress((prev: any) => ({ 
        ...prev, 
        applicationsSubmitted: prev.applicationsSubmitted + 1 
      }));
    }
  };

  const moveApplication = (id: string, newStatus: JobApplication['status']) => {
    setApplications(applications.map(app => 
      app.id === id ? { ...app, status: newStatus } : app
    ));
  };

  const deleteApplication = (id: string) => {
    setApplications(applications.filter(app => app.id !== id));
  };

  const getApplicationsByStatus = (status: JobApplication['status']) => {
    return applications.filter(app => app.status === status);
  };

  const getStatusIcon = (status: JobApplication['status']) => {
    const column = statusColumns.find(col => col.id === status);
    if (column) {
      const Icon = column.icon;
      return <Icon className="h-4 w-4" />;
    }
    return null;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Job Application Tracker</h1>
        <p className="text-xl text-gray-600">
          Organize and track your job applications in one place
        </p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {statusColumns.map(column => {
          const count = getApplicationsByStatus(column.id as JobApplication['status']).length;
          const Icon = column.icon;
          return (
            <div key={column.id} className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${column.color}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">{count}</div>
                  <div className="text-sm text-gray-600">{column.title}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Application Button */}
      <div className="mb-8">
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="h-5 w-5" />
          <span>Add Application</span>
        </button>
      </div>

      {/* Add Application Form */}
      {showAddForm && (
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Add New Application</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company
              </label>
              <input
                type="text"
                value={newApplication.company}
                onChange={(e) => setNewApplication({...newApplication, company: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Google"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Position
              </label>
              <input
                type="text"
                value={newApplication.position}
                onChange={(e) => setNewApplication({...newApplication, position: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Senior Frontend Developer"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Salary Range
              </label>
              <input
                type="text"
                value={newApplication.salary}
                onChange={(e) => setNewApplication({...newApplication, salary: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., ₹12,00,000 - ₹15,00,000"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <input
                type="text"
                value={newApplication.location}
                onChange={(e) => setNewApplication({...newApplication, location: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Bangalore, India"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notes
              </label>
              <textarea
                value={newApplication.notes}
                onChange={(e) => setNewApplication({...newApplication, notes: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 h-20"
                placeholder="Add any notes about this application..."
              />
            </div>
          </div>
          <div className="flex justify-end space-x-3 mt-6">
            <button
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={addApplication}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add Application
            </button>
          </div>
        </div>
      )}

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statusColumns.map(column => (
          <div key={column.id} className="bg-gray-50 rounded-2xl p-4">
            <div className="flex items-center space-x-2 mb-4">
              <div className={`p-2 rounded-lg ${column.color}`}>
                {getStatusIcon(column.id as JobApplication['status'])}
              </div>
              <h2 className="font-semibold text-gray-900">{column.title}</h2>
              <span className="text-sm text-gray-500">
                ({getApplicationsByStatus(column.id as JobApplication['status']).length})
              </span>
            </div>
            
            <div className="space-y-3">
              {getApplicationsByStatus(column.id as JobApplication['status']).map(app => (
                <div key={app.id} className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-900">{app.company}</h3>
                      <p className="text-sm text-gray-600">{app.position}</p>
                    </div>
                    <div className="flex items-center space-x-1">
                      <button 
                        onClick={() => {/* Edit functionality */}}
                        className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                      >
                        <Edit3 className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => deleteApplication(app.id)}
                        className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <DollarSign className="h-4 w-4" />
                      <span>{app.salary}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4" />
                      <span>{app.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4" />
                      <span>Applied {app.appliedDate}</span>
                    </div>
                  </div>
                  
                  {app.notes && (
                    <p className="text-sm text-gray-600 mt-2 p-2 bg-gray-50 rounded">
                      {app.notes}
                    </p>
                  )}
                  
                  {app.nextStep && (
                    <div className="mt-3 p-2 bg-blue-50 rounded text-sm">
                      <span className="font-medium text-blue-800">Next: </span>
                      <span className="text-blue-700">{app.nextStep}</span>
                    </div>
                  )}
                  
                  {app.deadline && (
                    <div className="mt-2 text-xs text-orange-600 flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>Deadline: {app.deadline}</span>
                    </div>
                  )}
                  
                  {/* Status Change Buttons */}
                  <div className="mt-3 flex flex-wrap gap-1">
                    {statusColumns.map(status => {
                      if (status.id !== app.status) {
                        return (
                          <button
                            key={status.id}
                            onClick={() => moveApplication(app.id, status.id as JobApplication['status'])}
                            className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
                          >
                            → {status.title}
                          </button>
                        );
                      }
                      return null;
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobTracker;