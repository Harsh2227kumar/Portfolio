
import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="relative z-20 text-center px-4 sm:px-6 lg:px-8">
        <div className="animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-400 via-blue-500 to-green-400 bg-clip-text text-transparent">
              Yash Meshram
            </span>
          </h1>
          <h2 className="text-2xl md:text-3xl text-gray-300 mb-4 animate-fade-in animation-delay-300">
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              DevOps Engineer & Web Development Enthusiast
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-400 mb-8 max-w-2xl mx-auto animate-fade-in animation-delay-500">
            B.Tech Computer Science Student at Symbiosis Institute of Technology, Nagpur
          </p>
          <p className="text-md text-gray-500 mb-12 max-w-xl mx-auto animate-fade-in animation-delay-700">
            Passionate about containerized deployments, CI/CD pipelines, and modern web development
          </p>
          
          <div className="flex justify-center space-x-6 mb-12 animate-fade-in animation-delay-900">
            <a
              href="https://github.com/yashmeshram"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-purple-600 hover:bg-purple-700 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-purple-500/50"
            >
              <Github size={24} />
            </a>
            <a
              href="https://linkedin.com/in/yashmeshram"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-blue-600 hover:bg-blue-700 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/50"
            >
              <Linkedin size={24} />
            </a>
            <a
              href="mailto:yash@example.com"
              className="p-3 bg-green-600 hover:bg-green-700 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-green-500/50"
            >
              <Mail size={24} />
            </a>
          </div>

          <button
            onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-full text-white font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50 animate-fade-in animation-delay-1000"
          >
            Explore My Work
          </button>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-20">
        <div className="w-6 h-10 border-2 border-purple-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-purple-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
