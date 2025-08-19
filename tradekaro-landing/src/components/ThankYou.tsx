import React from 'react';

const ThankYou: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white max-w-lg mx-auto flex items-center justify-center min-h-screen px-4 scroll-smooth font-poppins leading-relaxed">
      <div className="bg-gradient-to-br from-white via-gray-50 to-blue-50 p-8 rounded-3xl shadow-2xl border border-gray-100 text-center space-y-8 w-full max-w-md relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-400 to-green-600 opacity-10 rounded-full -translate-y-16 translate-x-16 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-500 opacity-10 rounded-full translate-y-12 -translate-x-12 animate-pulse"></div>

        {/* Success Animation Container */}
        <div className="flex justify-center relative z-10">
          <div className="relative">
            {/* Animated Success Circle */}
            <div className="w-24 h-24 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg animate-pulse">
              <svg
                className="h-12 w-12 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="3"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            {/* Decorative Rings */}
            <div className="absolute inset-0 border-4 border-green-300 rounded-full animate-ping opacity-30"></div>
            <div className="absolute -inset-2 border-2 border-green-200 rounded-full animate-pulse opacity-20"></div>
          </div>
        </div>

        {/* Success Message */}
        <div className="space-y-4 relative z-10">
          <h1 className="text-4xl font-bold text-gray-800 leading-tight">
            🎉 <span className="gradient-text">Registration Successful!</span>
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Welcome to the <span className="font-semibold text-blue-600">TradeKaro</span> family! 
            <br />
            Your trading journey begins now.
          </p>
        </div>

        {/* Benefits Section */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-2xl border border-blue-100 relative z-10">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">✨ What's Next?</h3>
          <div className="text-sm text-gray-600 space-y-3">
            <p className="flex items-center space-x-2">
              <span>📧</span>
              <span>Check your email for login details</span>
            </p>
            <p className="flex items-center space-x-2">
              <span></span>
              <span>Start with zero brokerage trading</span>
            </p>
            <p className="flex items-center space-x-2">
              <span>🚀</span>
              <span>Access 500+ products instantly</span>
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="space-y-4 relative z-10">
          <a
            href="https://tradekaro.theplatformapi.com/auth-pages/create-account/step1"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-blue-300 btn-modern"
          >
            🏠 Continue to Platform
          </a>
          
          <div className="text-xs text-gray-500 mt-3 flex items-center justify-center space-x-4">
            <span className="flex items-center space-x-1">
              <span>⚡</span>
              <span>Platform opens in new window</span>
            </span>
            <span className="w-px h-4 bg-gray-300"></span>
            <span className="flex items-center space-x-1">
              <span>🔒</span>
              <span>100% Secure Access</span>
            </span>
          </div>
        </div>

        {/* Social Proof */}
        <div className="pt-4 border-t border-gray-200 relative z-10">
          <p className="text-sm text-gray-600">
            🎯 Join <span className="font-bold text-green-600 animate-pulse">1,22,69,096+</span> successful traders
          </p>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
