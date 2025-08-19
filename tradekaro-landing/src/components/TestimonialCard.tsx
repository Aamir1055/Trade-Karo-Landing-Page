import React from 'react';
import { TestimonialProps } from '../types';

const TestimonialCard: React.FC<TestimonialProps> = ({ content, author }) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg card-hover border border-gray-100 hover:shadow-2xl hover:border-brand-yellow transition-all duration-300">
      <div className="flex items-start mb-4">
        <div className="flex text-yellow-400">
          {[...Array(5)].map((_, i) => (
            <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          ))}
        </div>
      </div>
      <p className="text-gray-700 italic text-sm text-justify leading-relaxed mb-4">
        &ldquo;{content}&rdquo;
      </p>
      <div className="flex items-center">
        <div className="w-8 h-8 bg-gradient-to-r from-brand-yellow to-brand-teal rounded-full flex items-center justify-center text-white font-bold text-xs mr-3">
          {author.split(' ').map(n => n[0]).join('').slice(0, 2)}
        </div>
        <p className="text-right font-semibold text-gray-800 text-sm">
          &ndash; {author}
        </p>
      </div>
    </div>
  );
};

export default TestimonialCard;
