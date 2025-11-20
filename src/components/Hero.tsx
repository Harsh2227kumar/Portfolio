import React, { useEffect } from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import { useGSAP } from '../hooks/useGSAP';

const Hero = () => {
  const containerRef = useGSAP();

  return (
    <section ref={containerRef} id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="relative z-20 text-center px-4 sm:px-6 lg:px-8">
        <div>
          <h1 className="gsap-hero-title text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-orange-400 via-pink-500 to-yellow-400 bg-clip-text text-transparent">
              Harsh Kumar
            </span>
          </h1>
          <h2 className="gsap-hero-subtitle text-2xl md:text-3xl text-gray-300 mb-4">
            <span className="bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">
              DevOps Engineer & Web Development Enthusiast
            </span>
          </h2>
          <p className="gsap-text text-lg md:text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            B.Tech Computer Science Engineering Student
          </p>
          <p className="gsap-text text-md text-gray-500 mb-12 max-w-xl mx-auto">
            Passionate about containerized deployments, CI/CD pipelines, and modern web development
          </p>
          
          <div className="flex justify-center space-x-6 mb-12">
            <a
              href="https://github.com/harsh2227kumar"
              target="_blank"
              rel="noopener noreferrer"
              className="gsap-button p-3 bg-orange-600 hover:bg-orange-700 rounded-full transition-all duration-300"
            >
              <Github size={24} />
            </a>
            <a
              href="https://www.linkedin.com/in/harsh-2227-kumar/" // Placeholder: Update with actual LinkedIn URL
              target="_blank"
              rel="noopener noreferrer"
              className="gsap-button p-3 bg-pink-600 hover:bg-pink-700 rounded-full transition-all duration-300"
            >
              <Linkedin size={24} />
            </a>
            <a
              href="mailto:harsh2227official@gmail.com"
              className="gsap-button p-3 bg-green-600 hover:bg-green-700 rounded-full transition-all duration-300"
            >
              <Mail size={24} />
            </a>
          </div>

          <button
            onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
            className="gsap-button px-8 py-4 bg-gradient-to-r from-orange-600 to-pink-600 hover:from-orange-700 hover:to-pink-700 rounded-full text-white font-semibold transition-all duration-300"
          >
            Explore My Work
          </button>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-20">
        <div className="w-6 h-10 border-2 border-orange-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-orange-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;