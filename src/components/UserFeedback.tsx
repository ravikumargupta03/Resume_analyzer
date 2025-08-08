import React, { useState } from 'react';
import { 
  MessageSquare, 
  Send, 
  CheckCircle, 
  Star,
  Mail,
  User,
  MessageCircle,
  Heart,
  Lightbulb,
  Bug,
  Zap
} from 'lucide-react';

const UserFeedback: React.FC = () => {
  const [feedbackData, setFeedbackData] = useState({
    name: '',
    email: '',
    category: '',
    rating: 0,
    message: '',
    improvements: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [hoveredStar, setHoveredStar] = useState(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFeedbackData({
      ...feedbackData,
      [e.target.name]: e.target.value
    });
  };

  const handleStarClick = (rating: number) => {
    setFeedbackData({ ...feedbackData, rating });
  };

  const sendFeedbackEmail = async (feedback: typeof feedbackData) => {
    try {
      // In a real implementation, this would call your backend API
      console.log('Sending feedback email to:', feedback.email);
      console.log('Feedback data:', feedback);
      
      // Simulate email sending
      const emailContent = {
        to: feedback.email,
        subject: `Thank you for your feedback - CareerFlow AI`,
        body: `
          Dear ${feedback.name},
          
          Thank you for taking the time to provide feedback on CareerFlow AI!
          
          Your Feedback Summary:
          - Category: ${feedback.category}
          - Rating: ${feedback.rating}/5 stars
          - Message: ${feedback.message}
          ${feedback.improvements ? `- Suggestions: ${feedback.improvements}` : ''}
          
          We truly value your input and will use it to improve our platform.
          
          Best regards,
          The CareerFlow AI Team
        `
      };
      
      // Here you would typically make an API call to your backend
      // await fetch('/api/send-feedback-email', { method: 'POST', body: JSON.stringify(emailContent) });
      
      return true;
    } catch (error) {
      console.error('Failed to send feedback email:', error);
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackData.name || !feedbackData.email || !feedbackData.message || feedbackData.rating === 0) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate submission delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Send email notification
    await sendFeedbackEmail(feedbackData);
    
    setIsSubmitted(true);
    setIsSubmitting(false);
    
    // Reset form after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFeedbackData({
        name: '',
        email: '',
        category: '',
        rating: 0,
        message: '',
        improvements: ''
      });
    }, 5000);
  };

  if (isSubmitted) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full mb-6 shadow-lg animate-bounce">
            <CheckCircle className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Thank You for Your Feedback!
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Your feedback has been submitted successfully and a confirmation email has been sent to {feedbackData.email}
          </p>
          <div className="card max-w-md mx-auto">
            <div className="flex items-center justify-center space-x-2 text-green-600 dark:text-green-400">
              <Heart className="h-5 w-5 fill-current" />
              <span className="font-medium">We appreciate your input!</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl mb-6 shadow-lg animate-float">
          <MessageSquare className="h-10 w-10 text-white" />
        </div>
        <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-900 via-purple-900 to-pink-900 dark:from-gray-100 dark:via-purple-300 dark:to-pink-300 bg-clip-text text-transparent mb-6">
          Share Your Feedback
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Help us improve CareerFlow AI by sharing your experience, suggestions, and ideas for new features.
        </p>
      </div>

      {/* Feedback Categories */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {[
          { icon: Lightbulb, title: 'Feature Ideas', color: 'from-yellow-500 to-orange-500' },
          { icon: Bug, title: 'Bug Reports', color: 'from-red-500 to-pink-500' },
          { icon: Zap, title: 'Performance', color: 'from-blue-500 to-purple-500' },
          { icon: Heart, title: 'General', color: 'from-green-500 to-emerald-500' }
        ].map((category, index) => {
          const Icon = category.icon;
          return (
            <div key={index} className="card p-4 text-center hover:scale-105 transition-transform duration-300">
              <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${category.color} rounded-xl mb-3 shadow-lg`}>
                <Icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white">{category.title}</h3>
            </div>
          );
        })}
      </div>

      {/* Feedback Form */}
      <div className="card">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Submit Your Feedback</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                <User className="inline h-4 w-4 mr-1" />
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                value={feedbackData.name}
                onChange={handleInputChange}
                required
                className="input-field"
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                <Mail className="inline h-4 w-4 mr-1" />
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={feedbackData.email}
                onChange={handleInputChange}
                required
                className="input-field"
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              <MessageCircle className="inline h-4 w-4 mr-1" />
              Feedback Category *
            </label>
            <select
              name="category"
              value={feedbackData.category}
              onChange={handleInputChange}
              required
              className="input-field"
            >
              <option value="">Select a category</option>
              <option value="feature-request">Feature Request</option>
              <option value="bug-report">Bug Report</option>
              <option value="performance">Performance Issue</option>
              <option value="ui-ux">UI/UX Feedback</option>
              <option value="general">General Feedback</option>
              <option value="suggestion">Suggestion</option>
            </select>
          </div>

          {/* Star Rating */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Overall Rating *
            </label>
            <div className="flex items-center space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => handleStarClick(star)}
                  onMouseEnter={() => setHoveredStar(star)}
                  onMouseLeave={() => setHoveredStar(0)}
                  className="p-1 transition-transform duration-200 hover:scale-110"
                >
                  <Star
                    className={`h-8 w-8 transition-colors duration-200 ${
                      star <= (hoveredStar || feedbackData.rating)
                        ? 'text-yellow-500 fill-current'
                        : 'text-gray-300 dark:text-gray-600'
                    }`}
                  />
                </button>
              ))}
              <span className="ml-3 text-sm text-gray-600 dark:text-gray-400">
                {feedbackData.rating > 0 && `${feedbackData.rating}/5 stars`}
              </span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Your Feedback *
            </label>
            <textarea
              name="message"
              value={feedbackData.message}
              onChange={handleInputChange}
              required
              rows={5}
              className="input-field resize-none"
              placeholder="Share your thoughts, experiences, or report any issues..."
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Suggestions for Improvement
            </label>
            <textarea
              name="improvements"
              value={feedbackData.improvements}
              onChange={handleInputChange}
              rows={3}
              className="input-field resize-none"
              placeholder="What features or improvements would you like to see?"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting || !feedbackData.name || !feedbackData.email || !feedbackData.message || feedbackData.rating === 0}
            className={`w-full py-4 px-6 rounded-2xl font-semibold text-lg transition-all duration-300 shadow-lg ${
              isSubmitting || !feedbackData.name || !feedbackData.email || !feedbackData.message || feedbackData.rating === 0
                ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 hover:shadow-xl hover:scale-105'
            }`}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center space-x-3">
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                <span>Submitting Feedback...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center space-x-3">
                <Send className="h-5 w-5" />
                <span>Submit Feedback</span>
              </div>
            )}
          </button>
        </form>
      </div>

      {/* Additional Info */}
      <div className="mt-8 text-center">
        <p className="text-gray-600 dark:text-gray-400">
          Your feedback will be sent to your email address for confirmation. We typically respond within 24-48 hours.
        </p>
      </div>
    </div>
  );
};

export default UserFeedback;