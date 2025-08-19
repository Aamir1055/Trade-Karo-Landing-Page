import React, { useState, useEffect } from 'react';
import RegistrationForm from './components/RegistrationForm';
import TestimonialCard from './components/TestimonialCard';
import './App.css';


// Enhanced Video Player Component
const VideoPlayer = ({ num, index }: { num: number; index: number }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const videoRef = React.useRef<HTMLVideoElement>(null);
  
  const togglePlay = () => {
    const video = videoRef.current;
    if (video) {
      if (isPlaying) {
        video.pause();
        setIsPlaying(false);
      } else {
        setIsLoading(true);
        video.currentTime = 0;
        video.play().then(() => {
          setIsPlaying(true);
          setIsLoading(false);
        }).catch(() => {
          console.log('Video play failed');
          setIsLoading(false);
        });
      }
    }
  };
  
  const getVideoTitle = (num: number) => {
    const titles = [
      "📊 Market Analysis Basics",
      "💰 Zero Brokerage Benefits", 
      "📈 Technical Trading Tips",
      "🚀 Live Trading Session"
    ];
    return titles[num - 1] || `Trading Video ${num}`;
  };
  
  const getVideoDescription = (num: number) => {
    const descriptions = [
      "Learn market fundamentals",
      "Save thousands on fees",
      "Master chart patterns", 
      "Real-time trading demo"
    ];
    return descriptions[num - 1] || "Educational content";
  };
  
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 relative cursor-pointer group border border-gray-200 hover:border-primary hover:scale-[1.02] transform">
      {/* Video Container */}
      <div className="relative w-full h-44 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden" onClick={togglePlay}>
        {/* Enhanced Thumbnail with Gradient Overlay */}
        <img 
          src={`/reels${num}-thumbnail.jpg`}
          alt={getVideoTitle(num)}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            const parent = target.parentElement;
            if (parent) {
              parent.style.background = 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)';
              parent.innerHTML += `<div class="absolute inset-0 flex items-center justify-center text-white font-bold text-lg">${getVideoTitle(num)}</div>`;
            }
          }}
        />
        
        {/* Video Element */}
        <video 
          ref={videoRef}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${isPlaying ? 'opacity-100 z-20' : 'opacity-0 z-0'}`}
          preload="metadata"
          playsInline
          muted
          loop
          onEnded={() => setIsPlaying(false)}
          onLoadStart={() => setIsLoading(false)}
        >
          <source src={`/reels${num}.mp4`} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Enhanced Play Button Overlay */}
        <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${isPlaying ? 'bg-gradient-to-t from-black/20 via-transparent to-transparent' : 'bg-gradient-to-t from-black/60 via-black/30 to-transparent'}`}>
          <div className={`bg-gradient-to-br from-white to-gray-100 rounded-full shadow-2xl hover:shadow-3xl hover:scale-125 transition-all duration-300 flex items-center justify-center border-4 border-white/20 backdrop-blur-sm ${!isPlaying ? 'w-20 h-20 opacity-95' : isLoading ? 'w-16 h-16 opacity-90' : 'w-14 h-14 opacity-80 group-hover:opacity-100'}`}>
            {isLoading ? (
              <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin"></div>
            ) : isPlaying ? (
              <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
              </svg>
            ) : (
              <svg className="w-7 h-7 text-primary ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            )}
          </div>
        </div>
        
        {/* Video Duration Badge */}
        <div className="absolute top-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
          {num === 1 ? '2:34' : num === 2 ? '3:12' : num === 3 ? '4:18' : '3:45'}
        </div>
        
        {/* Video Number Badge */}
        <div className="absolute top-3 left-3 bg-primary text-white text-xs font-bold w-8 h-8 rounded-full flex items-center justify-center shadow-lg">
          {num}
        </div>
      </div>
      
      {/* Enhanced Video Info */}
      <div className="p-4 bg-gradient-to-b from-white to-gray-50">
        <h4 className="font-bold text-gray-800 text-sm mb-1 leading-tight group-hover:text-primary transition-colors duration-300">
          {getVideoTitle(num)}
        </h4>
        <p className="text-gray-600 text-xs mb-3">
          {getVideoDescription(num)}
        </p>
        
        {/* Engagement Stats */}
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center space-x-1">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 12l-6-6 1.41-1.41L10 9.17l4.59-4.58L16 6l-6 6z"/>
            </svg>
            <span>{Math.floor(Math.random() * 50 + 20)}K views</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              <span className="text-red-500">❤️</span>
              <span>{Math.floor(Math.random() * 5 + 2)}K</span>
            </div>
            <div className="flex items-center space-x-1">
              <span>📤</span>
              <span>{Math.floor(Math.random() * 100 + 50)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function App() {
  const [showCTA, setShowCTA] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = React.useRef(null);
  const [currentSkill, setCurrentSkill] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const watchSection = document.getElementById('watchLearnSection');
      if (watchSection) {
        const rect = watchSection.getBoundingClientRect();
        setShowCTA(rect.top <= 0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToForm = () => {
    document.getElementById('registernowform')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-dark text-white max-w-md mx-auto scroll-smooth font-inter leading-relaxed min-h-screen relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-4 -right-4 w-96 h-96 bg-primary opacity-20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-8 -left-8 w-80 h-80 bg-secondary opacity-15 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-accent opacity-10 rounded-full blur-3xl animate-bounce-soft"></div>
      </div>
      
      {/* Facebook Pixel */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '747030238057682');
            fbq('track', 'PageView');
          `
        }}
      />
      
      {/* Banner Section */}
      <section className="w-full relative overflow-hidden animate-slideInUp">
        <div className="absolute inset-0 bg-hero-gradient opacity-30"></div>
        
        <button onClick={scrollToForm} className="relative w-full block transition-transform duration-300 hover:scale-[1.02]">
          <img
            src="/eng.jpg"
            alt="Learn to Trade Banner"
            className="w-full object-cover rounded-b-3xl shadow-premium-lg"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent opacity-40 rounded-b-3xl"></div>
        </button>
      </section>

      {/* Registration Form */}
      <RegistrationForm />

      {/* Enhanced Benefits Section */}
      <section className="px-2 py-16 mt-8" id="watchLearnSection">
        <div className="bg-gradient-to-br from-white via-gray-50 to-white rounded-2xl shadow-premium-lg p-4 sm:p-6 mx-auto max-w-sm border border-gray-200 relative overflow-hidden">
          {/* Background Decoration */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary opacity-3 rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-secondary opacity-3 rounded-full blur-xl"></div>
          
          {/* Enhanced Section Header */}
          <div className="text-center mb-8 relative z-10">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full mb-4 shadow-lg">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z"/>
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              🏆 Why Choose TradeKaro?
            </h2>
            <p className="text-sm text-gray-600 mb-4 font-medium px-2">
              Advanced trading platform with unmatched benefits
            </p>
            <div className="w-16 h-1 bg-gradient-to-r from-primary via-secondary to-warning mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-2 gap-3 relative z-10">
            {/* Zero Brokerage */}
            <div className="group text-center p-3 rounded-xl bg-gradient-to-br from-blue-50 via-white to-blue-50 border border-blue-200 hover:border-primary hover:shadow-lg transition-all duration-300 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary-light opacity-0 group-hover:opacity-3 transition-opacity duration-300"></div>
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-light text-white rounded-lg flex items-center justify-center mx-auto mb-2 shadow-md group-hover:scale-105 transition-transform duration-300">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 7V9C15 10.65 13.65 12 12 12C10.35 12 9 10.65 9 9V7L3 7V9C3 14.55 7.45 19 13 19V21H11V23H13H15V21H13V19C18.55 19 23 14.55 23 9H21Z"/>
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800 text-xs mb-1 leading-tight">Zero Fees</h3>
              <p className="text-gray-600 text-xs leading-tight">Save ₹1000s</p>
            </div>
            
            {/* High Leverage */}
            <div className="group text-center p-3 rounded-xl bg-gradient-to-br from-green-50 via-white to-green-50 border border-green-200 hover:border-secondary hover:shadow-lg transition-all duration-300 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-secondary to-secondary-light opacity-0 group-hover:opacity-3 transition-opacity duration-300"></div>
              <div className="w-10 h-10 bg-gradient-to-br from-secondary to-secondary-light text-white rounded-lg flex items-center justify-center mx-auto mb-2 shadow-md group-hover:scale-105 transition-transform duration-300">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16 6L18.29 8.29L13.41 13.17L9.41 9.17L2 16.59L3.41 18L9.41 12L13.41 16L19.71 9.71L22 12V6H16Z"/>
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800 text-xs mb-1 leading-tight">High Margin</h3>
              <p className="text-gray-600 text-xs leading-tight">500X Power</p>
            </div>
            
            {/* Rewards */}
            <div className="group text-center p-3 rounded-xl bg-gradient-to-br from-purple-50 via-white to-purple-50 border border-purple-200 hover:border-accent hover:shadow-lg transition-all duration-300 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-accent to-accent-light opacity-0 group-hover:opacity-3 transition-opacity duration-300"></div>
              <div className="w-10 h-10 bg-gradient-to-br from-accent to-accent-light text-white rounded-lg flex items-center justify-center mx-auto mb-2 shadow-md group-hover:scale-105 transition-transform duration-300">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z"/>
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800 text-xs mb-1 leading-tight">Rewards</h3>
              <p className="text-gray-600 text-xs leading-tight">Earn More</p>
            </div>
            
            {/* 24/7 Support */}
            <div className="group text-center p-3 rounded-xl bg-gradient-to-br from-indigo-50 via-white to-indigo-50 border border-indigo-200 hover:border-primary hover:shadow-lg transition-all duration-300 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary-light opacity-0 group-hover:opacity-3 transition-opacity duration-300"></div>
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-light text-white rounded-lg flex items-center justify-center mx-auto mb-2 shadow-md group-hover:scale-105 transition-transform duration-300">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12S6.48 22 12 22 22 17.52 22 12 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z"/>
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800 text-xs mb-1 leading-tight">24/7 Help</h3>
              <p className="text-gray-600 text-xs leading-tight">Expert Care</p>
            </div>
            
            {/* Secure */}
            <div className="group text-center p-3 rounded-xl bg-gradient-to-br from-teal-50 via-white to-teal-50 border border-teal-200 hover:border-secondary hover:shadow-lg transition-all duration-300 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-secondary to-secondary-light opacity-0 group-hover:opacity-3 transition-opacity duration-300"></div>
              <div className="w-10 h-10 bg-gradient-to-br from-secondary to-secondary-light text-white rounded-lg flex items-center justify-center mx-auto mb-2 shadow-md group-hover:scale-105 transition-transform duration-300">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1ZM10 17L6 13L7.41 11.59L10 14.17L16.59 7.58L18 9L10 17Z"/>
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800 text-xs mb-1 leading-tight">Secure</h3>
              <p className="text-gray-600 text-xs leading-tight">100% Safe</p>
            </div>
            
            {/* Quick Setup */}
            <div className="group text-center p-3 rounded-xl bg-gradient-to-br from-orange-50 via-white to-orange-50 border border-orange-200 hover:border-warning hover:shadow-lg transition-all duration-300 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-warning to-warning-light opacity-0 group-hover:opacity-3 transition-opacity duration-300"></div>
              <div className="w-10 h-10 bg-gradient-to-br from-warning to-warning-light text-white rounded-lg flex items-center justify-center mx-auto mb-2 shadow-md group-hover:scale-105 transition-transform duration-300">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13 10V3L4 14H11L11 21L20 10H13Z"/>
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800 text-xs mb-1 leading-tight">Quick Start</h3>
              <p className="text-gray-600 text-xs leading-tight">60 Seconds</p>
            </div>
          </div>
          
          {/* Bottom CTA */}
          <div className="mt-12 text-center relative z-10">
            <div className="bg-gradient-to-r from-primary to-secondary text-white py-4 px-8 rounded-2xl inline-block shadow-premium">
              <p className="font-bold text-lg">🔥 Join 1.2M+ traders already earning with TradeKaro!</p>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Watch & Learn Section */}
      <section className="px-4 py-16 animate-slideInLeft relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-dark via-gray-900 to-dark opacity-80"></div>
        <div className="absolute top-10 left-10 w-32 h-32 bg-primary opacity-10 rounded-full blur-2xl animate-float"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 bg-secondary opacity-10 rounded-full blur-xl animate-float-delayed"></div>
        
        <div className="relative z-10">
          {/* Enhanced Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary via-secondary to-warning rounded-full mb-6 shadow-glow animate-pulse-soft">
              <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
            <h3 className="text-4xl font-bold gradient-text mb-4">
              🎬 Watch & Master Trading
            </h3>
            <p className="text-gray-300 text-lg mb-6 font-medium px-4">Learn from real market experts with interactive video lessons</p>
            <div className="w-24 h-1 bg-gradient-to-r from-primary via-secondary to-warning mx-auto rounded-full shadow-glow"></div>
            
            {/* Stats Row */}
            <div className="flex items-center justify-center space-x-8 mt-8 text-center">
              <div className="flex flex-col items-center">
                <div className="text-2xl font-bold text-white mb-1">4</div>
                <div className="text-xs text-gray-400 font-medium">Expert Videos</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-2xl font-bold text-white mb-1">15K+</div>
                <div className="text-xs text-gray-400 font-medium">Students</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-2xl font-bold text-white mb-1">4.9★</div>
                <div className="text-xs text-gray-400 font-medium">Rating</div>
              </div>
            </div>
          </div>
          
          {/* Enhanced Video Grid Container */}
          <div className="max-w-sm mx-auto bg-white/5 backdrop-blur-lg rounded-3xl p-6 border border-white/10 shadow-2xl">
            {/* Grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <VideoPlayer num={1} index={0} />
              <VideoPlayer num={2} index={1} />
              <VideoPlayer num={3} index={2} />
              <VideoPlayer num={4} index={3} />
            </div>
            
            {/* Enhanced Video Info */}
            <div className="text-center space-y-4">
              <div className="bg-gradient-to-r from-primary/20 via-secondary/20 to-warning/20 rounded-2xl p-4 border border-white/10">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <span className="text-white font-bold text-sm">Complete Trading Masterclass</span>
                </div>
                <p className="text-gray-300 text-xs leading-relaxed">
                  4 comprehensive videos covering market analysis, zero brokerage benefits, technical strategies, and live trading sessions
                </p>
              </div>
              
              {/* Course Features */}
              <div className="grid grid-cols-3 gap-3 text-xs">
                <div className="bg-white/10 rounded-lg p-3 text-center">
                  <div className="text-lg mb-1">⏱️</div>
                  <div className="text-white font-semibold">12+ Min</div>
                  <div className="text-gray-400">Duration</div>
                </div>
                <div className="bg-white/10 rounded-lg p-3 text-center">
                  <div className="text-lg mb-1">🎯</div>
                  <div className="text-white font-semibold">Practical</div>
                  <div className="text-gray-400">Approach</div>
                </div>
                <div className="bg-white/10 rounded-lg p-3 text-center">
                  <div className="text-lg mb-1">📱</div>
                  <div className="text-white font-semibold">Mobile</div>
                  <div className="text-gray-400">Optimized</div>
                </div>
              </div>
              
              {/* Call to Action */}
              <div className="bg-gradient-to-r from-primary to-secondary text-white py-3 px-6 rounded-xl text-center">
                <div className="text-sm font-bold">🚀 Start your trading journey today!</div>
                <div className="text-xs mt-1 opacity-90">Watch, learn, and earn with zero brokerage</div>
              </div>
            </div>
          </div>
          
          {/* Additional Features */}
          <div className="mt-8 text-center">
            <div className="inline-flex items-center space-x-6 bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-3 border border-white/20">
              <div className="flex items-center space-x-2">
                <span className="text-green-400">✓</span>
                <span className="text-white text-sm font-medium">HD Quality</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-green-400">✓</span>
                <span className="text-white text-sm font-medium">Subtitles</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-green-400">✓</span>
                <span className="text-white text-sm font-medium">Replay</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Master These Skills Section */}
      <section className="px-4 py-12 relative">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-dark via-dark-light to-dark opacity-50"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary opacity-5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-secondary opacity-5 rounded-full blur-3xl animate-float-delayed"></div>
        
        <div className="max-w-md mx-auto relative z-10">
          {/* Enhanced Section Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary via-secondary to-warning rounded-full mb-4 shadow-glow animate-pulse-soft">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 3L1 9L12 15L21 10.09V17H23V9M5 13.18V17.18L12 21L19 17.18V13.18L12 17L5 13.18Z"/>
              </svg>
            </div>
            <h3 className="text-3xl font-extrabold gradient-text mb-4">
              🎯 Master These Skills
            </h3>
            <p className="text-gray-300 text-base mb-6 font-medium leading-relaxed px-2">
              Transform from beginner to expert trader with our comprehensive curriculum
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-primary via-secondary to-warning mx-auto rounded-full shadow-glow"></div>
          </div>
          
          {/* Single Skill Carousel */}
          <div className="relative max-w-sm mx-auto">
            {/* Skill Container */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-premium-lg relative overflow-hidden">
              {/* Background Decoration */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-primary opacity-5 rounded-full blur-xl"></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-secondary opacity-5 rounded-full blur-lg"></div>
              
              {/* Current Skill Content */}
              <div className="relative z-10">
                {currentSkill === 0 && (
                  <div>
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-light rounded-xl flex items-center justify-center mr-4 shadow-lg">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M3 13H11V3H3V13ZM3 21H11V15H3V21ZM13 21H21V11H13V21ZM13 3V9H21V3H13Z"/>
                        </svg>
                      </div>
                      <h4 className="text-lg font-bold text-gray-900">📊 Market Fundamentals</h4>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed font-medium mb-4">
                      Master stock market basics, economic indicators, and understand how professional trading works in real markets with live examples.
                    </p>
                    <div className="text-primary font-semibold text-xs bg-primary bg-opacity-10 p-2 rounded-lg">✓ Economic Analysis ✓ Market Structure ✓ Trading Psychology</div>
                  </div>
                )}
                
                {currentSkill === 1 && (
                  <div>
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-secondary to-secondary-light rounded-xl flex items-center justify-center mr-4 shadow-lg">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M16 6L18.29 8.29L13.41 13.17L9.41 9.17L2 16.59L3.41 18L9.41 12L13.41 16L19.71 9.71L22 12V6H16Z"/>
                        </svg>
                      </div>
                      <h4 className="text-lg font-bold text-gray-900">📈 Technical Analysis</h4>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed font-medium mb-4">
                      Read charts like a pro and identify profitable trading opportunities using advanced technical indicators and pattern recognition.
                    </p>
                    <div className="text-secondary font-semibold text-xs bg-secondary bg-opacity-10 p-2 rounded-lg">✓ Chart Patterns ✓ Technical Indicators ✓ Price Action</div>
                  </div>
                )}
                
                {currentSkill === 2 && (
                  <div>
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-accent to-accent-light rounded-xl flex items-center justify-center mr-4 shadow-lg">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1Z"/>
                        </svg>
                      </div>
                      <h4 className="text-lg font-bold text-gray-900">🛡️ Risk Management</h4>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed font-medium mb-4">
                      Protect your capital with advanced risk management strategies, position sizing, and learn safe trading practices.
                    </p>
                    <div className="text-accent font-semibold text-xs bg-accent bg-opacity-10 p-2 rounded-lg">✓ Stop Loss Strategies ✓ Position Sizing ✓ Capital Protection</div>
                  </div>
                )}
                
                {currentSkill === 3 && (
                  <div>
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-warning to-warning-light rounded-xl flex items-center justify-center mr-4 shadow-lg">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12S6.48 22 12 22 22 17.52 22 12 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z"/>
                        </svg>
                      </div>
                      <h4 className="text-lg font-bold text-gray-900">🔴 Live Trading Sessions</h4>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed font-medium mb-4">
                      Join interactive live sessions with market experts, ask questions in real-time, and see professional trading in action.
                    </p>
                    <div className="text-warning font-semibold text-xs bg-warning bg-opacity-10 p-2 rounded-lg">✓ Real-time Trading ✓ Expert Guidance ✓ Q&A Sessions</div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Navigation Arrows */}
            <button 
              onClick={() => setCurrentSkill(currentSkill > 0 ? currentSkill - 1 : 3)}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-primary text-white p-2 rounded-full shadow-lg hover:bg-primary-light transition-all duration-300 hover:scale-110"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button 
              onClick={() => setCurrentSkill(currentSkill < 3 ? currentSkill + 1 : 0)}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-white p-2 rounded-full shadow-lg hover:bg-primary-light transition-all duration-300 hover:scale-110"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            
            {/* Skill Indicators */}
            <div className="flex justify-center space-x-2 mt-4">
              {[0, 1, 2, 3].map((index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSkill(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentSkill === index 
                      ? 'bg-primary shadow-lg scale-125' 
                      : 'bg-white bg-opacity-30 hover:bg-opacity-50'
                  }`}
                />
              ))}
            </div>
            
            {/* Skill Counter */}
            <div className="text-center mt-3">
              <span className="text-gray-300 text-sm font-medium">
                {currentSkill + 1} of 4 • Professional Skills
              </span>
            </div>
          </div>
          
          {/* Bottom Stats */}
          <div className="mt-8 text-center">
            <div className="bg-gradient-to-r from-primary via-secondary to-warning text-white py-3 px-6 rounded-2xl inline-block shadow-premium-lg">
              <p className="font-bold text-sm">🎓 Complete curriculum • 50+ hours • Expert mentorship</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="px-4 py-12 mt-8 mx-4 relative animate-slideInUp">
        {/* Premium Background */}
        <div className="absolute inset-0 bg-glass backdrop-blur-2xl rounded-3xl border border-white border-opacity-10"></div>
        <div className="absolute inset-0 bg-primary-gradient opacity-5 rounded-3xl"></div>
        
        <div className="relative z-10">
          <div className="text-center mb-10">
            <div className="animate-float mb-6">
              <img src="/trustpilotlogo.png" className="mx-auto w-6/12 opacity-90 filter brightness-110" alt="Trustpilot" />
            </div>
            <h3 className="text-4xl font-bold gradient-text mb-4">
              ⭐ Trusted by Traders (4.8/5)
            </h3>
            <p className="text-gray-300 text-lg mb-6">Join thousands of successful traders</p>
            <div className="w-20 h-1 bg-warning-gradient mx-auto rounded-full shadow-warning"></div>
          </div>
          
          <div className="space-y-8">
            <TestimonialCard 
              content="Incredible platform! The zero brokerage feature saved me thousands. The RM support is outstanding - they guide you through every trade. I've been consistently profitable since joining TradeKaro!"
              author="Vishal Pawar"
            />
            <TestimonialCard 
              content="As a beginner, I was scared of trading. But TradeKaro's step-by-step guidance and demo account helped me learn safely. Now I'm making consistent profits!"
              author="Sridharan Krishnamoorthi"
            />
          </div>
        </div>
      </section>

      {/* Spacer for Fixed CTA */}
      <section className="pb-48">
        <p></p>
      </section>

      {/* Fixed Bottom CTA */}
      <section className={`fixed bottom-0 left-0 right-0 transition-transform duration-500 z-50 ${showCTA ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="max-w-md mx-auto px-4">
          {/* Premium CTA Container */}
          <div className="bg-glass-strong backdrop-blur-2xl rounded-t-3xl border-t-4 border-secondary shadow-premium-lg relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 bg-primary-gradient opacity-10 animate-pulse"></div>
            <div className="absolute -top-2 -right-2 w-20 h-20 bg-secondary opacity-20 rounded-full blur-xl animate-float"></div>
            <div className="absolute -bottom-2 -left-2 w-16 h-16 bg-accent opacity-15 rounded-full blur-lg animate-float-delayed"></div>
            
            {/* Content */}
            <div className="relative z-10 py-6">
              {/* Irresistible CTA Button */}
              <button
                onClick={scrollToForm}
                className="w-full magnetic-btn bg-primary-gradient text-white font-bold py-5 px-6 rounded-2xl text-lg shadow-premium-lg cta-pulse relative overflow-hidden group"
              >
                {/* Button Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                
                <div className="flex items-center justify-center space-x-3 relative z-10">
                  <span className="animate-bounce-soft">🚀</span>
                  <span className="font-extrabold tracking-wide">START TRADING NOW!</span>
                  <svg
                    className="w-6 h-6 text-white animate-bounce-soft"
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
              </button>
              
              {/* Social Proof */}
              <div className="mt-4 text-center">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-warning text-lg animate-pulse" style={{animationDelay: `${i * 0.1}s`}}>⭐</span>
                    ))}
                  </div>
                  <span className="text-sm font-semibold text-gray-700">4.8/5 Rating</span>
                </div>
                
                <p className="font-medium text-gray-800 text-sm">
                  <span className="font-extrabold text-primary animate-pulse text-lg">🔥 1,22,69,096+ </span>
                  <span className="text-gray-600">traders already earning!</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
