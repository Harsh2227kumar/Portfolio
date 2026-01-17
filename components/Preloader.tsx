import React from 'react';

const Preloader = () => {
  return (
    <div className="fixed inset-0 bg-gray-900 flex items-center justify-center z-50">
      <div className="text-center">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mb-8"></div>
          <div className="absolute inset-0 w-20 h-20 border-4 border-pink-500 border-b-transparent rounded-full animate-spin animation-delay-150"></div>
        </div>
        <div className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
          Loading Portfolio...
        </div>
        <div className="mt-4 flex justify-center space-x-1">
          <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce animation-delay-75"></div>
          <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce animation-delay-150"></div>
        </div>
      </div>
    </div>
  );
};

export default Preloader; 