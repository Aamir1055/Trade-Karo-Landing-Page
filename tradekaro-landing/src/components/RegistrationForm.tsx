import React, { useState, useEffect } from 'react';
import { FormData } from '../types';

const RegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fullname: '',
    Mobile: '',
    Language: '',
    Experience: '',
    demoAccount: '',
    market: '',
    utm_source: '',
    utm_medium: '',
    utm_campaign: '',
    utm_term: '',
    utm_content: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showError, setShowError] = useState(false);
  useEffect(() => {
    // Get UTM parameters from URL
    const urlParams = new URLSearchParams(window.location.search);
    const utmData = {
      utm_source: urlParams.get('utm_source') || '',
      utm_medium: urlParams.get('utm_medium') || '',
      utm_campaign: urlParams.get('utm_campaign') || '',
      utm_term: urlParams.get('utm_term') || '',
      utm_content: urlParams.get('utm_content') || '',
    };
    
    setFormData(prev => ({ ...prev, ...utmData }));
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'Mobile') {
      // Phone number formatting logic
      let cleaned = value.replace(/[^0-9+]/g, '');
      
      if (cleaned.startsWith('+91')) {
        cleaned = '+91' + cleaned.slice(3).replace(/[^0-9]/g, '').slice(0, 10);
      } else {
        cleaned = cleaned.replace(/[^0-9]/g, '');
        
        if (cleaned.length === 1 && !/[6-9]/.test(cleaned)) {
          cleaned = '';
        }
        
        cleaned = cleaned.slice(0, 10);
      }
      
      setFormData(prev => ({ ...prev, [name]: cleaned }));
    } else if (name === 'demoAccount') {
      // Clear market field if user changes demo account preference
      setFormData(prev => ({ 
        ...prev, 
        [name]: value,
        market: value === 'Yes' ? prev.market : '' // Clear market if not demo
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }

  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setShowError(false);

    try {
      const response = await fetch('https://webhooks.integrately.com/a/webhooks/6b81c0b612bb4beeab5bd774c15b8b38', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Facebook Pixel tracking
        if (typeof window !== 'undefined' && (window as any).fbq) {
          (window as any).fbq('track', 'Lead');
        }
        window.location.href = '/thankyou.html';
      } else {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error('Form submission failed:', error);
      setShowError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="w-full mt-12 px-3 animate-slideInUp" id="registernowform">
      <div className="max-w-sm mx-auto bg-white rounded-3xl shadow-premium-lg border border-gray-100 overflow-hidden backdrop-blur-sm relative">
        {/* Floating Accent Elements */}
        <div className="absolute -top-2 -right-2 w-20 h-20 bg-gradient-to-br from-primary to-secondary opacity-10 rounded-full blur-xl animate-float"></div>
        <div className="absolute -bottom-3 -left-3 w-16 h-16 bg-gradient-to-tr from-accent to-warning opacity-8 rounded-full blur-lg animate-float-delayed"></div>
        
        {/* Enhanced Modern Header */}
        <div className="bg-gradient-to-br from-primary via-primary-light to-secondary text-white text-center py-8 px-5 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-white opacity-3">
            <div className="absolute inset-0" style={{backgroundImage: 'radial-gradient(circle at 25% 25%, white 1px, transparent 1px), radial-gradient(circle at 75% 75%, white 1px, transparent 1px)', backgroundSize: '15px 15px'}}></div>
          </div>
          
          <div className="relative z-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white bg-opacity-15 rounded-full mb-3 shadow-glow animate-pulse-soft backdrop-blur-sm">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16 6L18.29 8.29L13.41 13.17L9.41 9.17L2 16.59L3.41 18L9.41 12L13.41 16L19.71 9.71L22 12V6H16Z"/>
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-2 tracking-wide leading-tight">🚀 START EARNING TODAY</h2>
            <p className="text-white text-opacity-95 text-sm font-medium mb-3">Join 1.2M+ successful traders worldwide</p>
            <div className="flex items-center justify-center space-x-2">
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-300 text-base animate-pulse" style={{animationDelay: `${i * 0.1}s`}}>⭐</span>
                ))}
              </div>
              <span className="text-xs font-bold text-yellow-200">4.8/5 Trusted</span>
            </div>
          </div>
        </div>
        
        {/* Enhanced Form Content */}
        <div className="p-8 bg-gradient-to-b from-gray-50 to-white">
          {/* Enhanced Special Offer Badge */}
          <div className="bg-gradient-to-r from-warning to-warning-light text-white text-center py-4 px-6 rounded-xl mb-8 shadow-warning relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            <span className="font-bold text-base relative z-10">🎯 LIMITED TIME: Zero Brokerage Forever!</span>
            <div className="text-xs mt-1 font-medium opacity-90">🔥 Save ₹50,000+ annually on trading fees</div>
          </div>
          
          <form className="space-y-6" onSubmit={handleSubmit}>

            {/* Enhanced Form Fields */}
            <div className="space-y-6">
              {/* Full Name Field */}
              <div className="relative group">
                <label className="block text-sm font-bold text-gray-800 mb-3 flex items-center space-x-2">
                  <span>👤</span>
                  <span>Full Name</span>
                </label>
                <input
                  type="text"
                  name="fullname"
                  placeholder="Enter your full name"
                  required
                  value={formData.fullname}
                  onChange={handleInputChange}
                  className="w-full border-3 border-gray-300 rounded-xl px-5 py-4 text-gray-800 bg-white focus:border-primary focus:ring-6 focus:ring-primary focus:ring-opacity-15 transition-all duration-300 text-base font-medium shadow-sm hover:shadow-md group-hover:border-primary-light"
                />
              </div>

              {/* Mobile Field */}
              <div className="relative group">
                <label className="block text-sm font-bold text-gray-800 mb-3 flex items-center space-x-2">
                  <span>📱</span>
                  <span>Mobile Number</span>
                </label>
                <input
                  type="text"
                  name="Mobile"
                  placeholder="Enter your mobile number"
                  required
                  value={formData.Mobile}
                  onChange={handleInputChange}
                  className="w-full border-3 border-gray-300 rounded-xl px-5 py-4 text-gray-800 bg-white focus:border-primary focus:ring-6 focus:ring-primary focus:ring-opacity-15 transition-all duration-300 text-base font-medium shadow-sm hover:shadow-md group-hover:border-primary-light"
                />
              </div>

              {/* Language Field */}
              <div className="relative group">
                <label className="block text-sm font-bold text-gray-800 mb-3 flex items-center space-x-2">
                  <span>🌐</span>
                  <span>Preferred Language</span>
                </label>
                <select
                  name="Language"
                  required
                  value={formData.Language}
                  onChange={handleInputChange}
                  className="w-full border-3 border-gray-300 rounded-xl px-5 py-4 text-gray-800 bg-white focus:border-primary focus:ring-6 focus:ring-primary focus:ring-opacity-15 transition-all duration-300 text-base font-medium appearance-none cursor-pointer shadow-sm hover:shadow-md group-hover:border-primary-light"
                >
                  <option value="">Select your language</option>
                  <option value="Tamil">Tamil (தமிழ்)</option>
                  <option value="Telugu">Telugu (తెలుగు)</option>
                  <option value="Kannada">Kannada (ಕನ್ನಡ)</option>
                  <option value="Malayalam">Malayalam (മലയാളം)</option>
                  <option value="Bengali">Bengali (বাংলা)</option>
                  <option value="Hindi">Hindi (हिन्दी)</option>
                  <option value="English">English</option>
                  <option value="Gujarati">Gujarati (ગુજરાતી)</option>
                  <option value="Punjabi">Punjabi (ਪੰਜਾਬੀ)</option>
                </select>
                <div className="absolute right-5 top-14 transform -translate-y-1/2 text-primary pointer-events-none">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>

              {/* Experience Field */}
              <div className="relative group">
                <label className="block text-sm font-bold text-gray-800 mb-3 flex items-center space-x-2">
                  <span>📊</span>
                  <span>Trading Experience</span>
                </label>
                <select
                  name="Experience"
                  required
                  value={formData.Experience}
                  onChange={handleInputChange}
                  className="w-full border-3 border-gray-300 rounded-xl px-5 py-4 text-gray-800 bg-white focus:border-primary focus:ring-6 focus:ring-primary focus:ring-opacity-15 transition-all duration-300 text-base font-medium appearance-none cursor-pointer shadow-sm hover:shadow-md group-hover:border-primary-light"
                >
                  <option value="">Select your experience level</option>
                  <option value="Beginner">Beginner (New to Trading)</option>
                  <option value="Intermediate">Intermediate (Some Experience)</option>
                  <option value="Advanced">Advanced (Expert Trader)</option>
                </select>
                <div className="absolute right-5 top-14 transform -translate-y-1/2 text-primary pointer-events-none">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>

              {/* Demo Account Field */}
              <div className="relative group">
                <label className="block text-sm font-bold text-gray-800 mb-3 flex items-center space-x-2">
                  <span>🎯</span>
                  <span>Do you want a demo account?</span>
                </label>
                <select
                  name="demoAccount"
                  required
                  value={formData.demoAccount}
                  onChange={handleInputChange}
                  className="w-full border-3 border-gray-300 rounded-xl px-5 py-4 text-gray-800 bg-white focus:border-primary focus:ring-6 focus:ring-primary focus:ring-opacity-15 transition-all duration-300 text-base font-medium appearance-none cursor-pointer shadow-sm hover:shadow-md group-hover:border-primary-light"
                >
                  <option value="">Choose demo account preference</option>
                  <option value="Yes">Yes - I want to practice first</option>
                  <option value="No">No - I want to start live trading</option>
                </select>
                <div className="absolute right-5 top-14 transform -translate-y-1/2 text-primary pointer-events-none">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>

              {/* Market Field - Conditional Display */}
              {formData.demoAccount === 'Yes' && (
                <div className="relative group animate-slideInUp">
                  <label className="block text-sm font-bold text-gray-800 mb-3 flex items-center space-x-2">
                    <span>📈</span>
                    <span>Which market interests you?</span>
                  </label>
                  <select
                    name="market"
                    required
                    value={formData.market}
                    onChange={handleInputChange}
                    className="w-full border-3 border-gray-300 rounded-xl px-5 py-4 text-gray-800 bg-white focus:border-primary focus:ring-6 focus:ring-primary focus:ring-opacity-15 transition-all duration-300 text-base font-medium appearance-none cursor-pointer shadow-sm hover:shadow-md group-hover:border-primary-light"
                  >
                    <option value="">Select your preferred market</option>
                    <option value="Stock Market">📈 Stock Market (Equity Trading)</option>
                    <option value="Forex">💱 Forex (Currency Trading)</option>
                    <option value="Cryptocurrency">₿ Cryptocurrency</option>
                    <option value="Commodities">🥇 Commodities (Gold, Oil, etc.)</option>
                    <option value="Options">📊 Options Trading</option>
                    <option value="Futures">📉 Futures Trading</option>
                  </select>
                  <div className="absolute right-5 top-14 transform -translate-y-1/2 text-primary pointer-events-none">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="mt-2 text-xs text-gray-600 bg-blue-50 p-3 rounded-lg border border-blue-200">
                    💡 <strong>Demo accounts</strong> let you practice with virtual money before risking real funds!
                  </p>
                </div>
              )}


          </div>

            {showError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                <span className="text-sm">Something went wrong. Please try again.</span>
              </div>
            )}

            {/* Enhanced Premium Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-br from-primary via-primary-light to-secondary text-white font-bold py-5 px-8 rounded-2xl hover:shadow-premium-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden group shadow-xl"
            >
              {/* Button Shine Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              
              {isSubmitting ? (
                <div className="flex items-center justify-center space-x-3 relative z-10">
                  <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-lg font-bold">Creating Your Account...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-3 relative z-10">
                  <span className="text-xl animate-bounce-soft">🚀</span>
                  <span className="text-xl font-extrabold tracking-wide">START EARNING TODAY</span>
                  <svg
                    className="w-7 h-7 text-white animate-bounce-soft"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </div>
              )}
            </button>
            
            {/* Trust Indicators */}
            <div className="mt-6 text-center">
              <div className="flex items-center justify-center space-x-6 text-sm text-gray-600 mb-4">
                <div className="flex items-center space-x-1">
                  <svg className="w-4 h-4 text-secondary" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <span>Secure Platform</span>
                </div>
                <div className="flex items-center space-x-1">
                  <svg className="w-4 h-4 text-secondary" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
                  </svg>
                  <span>Instant Setup</span>
                </div>
              </div>
              <p className="text-xs text-gray-500">
                Join <span className="font-semibold text-primary">1.2M+ traders</span> already earning with zero brokerage
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default RegistrationForm;
