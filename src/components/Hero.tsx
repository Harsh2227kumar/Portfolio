
import React, { useEffect, useRef } from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();
    
    // Initial animations
    tl.fromTo(titleRef.current, 
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" }
    )
    .fromTo(subtitleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
      "-=0.8"
    )
    .fromTo(descriptionRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      "-=0.6"
    )
    .fromTo(socialRef.current?.children,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.6, stagger: 0.1, ease: "back.out(1.7)" },
      "-=0.4"
    )
    .fromTo(buttonRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      "-=0.3"
    );

    // Scroll animations
    gsap.to(heroRef.current, {
      yPercent: -50,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section id="home" ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
        <div>
          <h1 ref={titleRef} className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-400 via-blue-500 to-green-400 bg-clip-text text-transparent">
              Yash Meshram
            </span>
          </h1>
          <h2 ref={subtitleRef} className="text-2xl md:text-3xl text-gray-300 mb-4">
            <span className="bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">
              DevOps Engineer & Web Development Enthusiast
            </span>
          </h2>
          <p ref={descriptionRef} className="text-lg md:text-xl text-gray-400 mb-8 max-w-3xl mx-auto">
            B.Tech Computer Science Student at Symbiosis Institute of Technology, Nagpur
            <br />
            <span className="text-purple-300">Passionate about containerized deployments, CI/CD pipelines, and modern web development</span>
          </p>
          
          <div ref={socialRef} className="flex justify-center space-x-6 mb-12">
            <a
              href="https://github.com/yashmeshram04"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-purple-600 hover:bg-purple-700 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-purple-500/50 group"
            >
              <Github size={24} className="group-hover:rotate-12 transition-transform duration-300" />
            </a>
            <a
              href="https://linkedin.com/in/yashmeshram"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-blue-600 hover:bg-blue-700 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/50 group"
            >
              <Linkedin size={24} className="group-hover:rotate-12 transition-transform duration-300" />
            </a>
            <a
              href="mailto:yash.meshram@example.com"
              className="p-3 bg-green-600 hover:bg-green-700 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-green-500/50 group"
            >
              <Mail size={24} className="group-hover:rotate-12 transition-transform duration-300" />
            </a>
          </div>

          <button
            ref={buttonRef}
            onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-full text-white font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50 relative overflow-hidden group"
          >
            <span className="relative z-10">Explore My Journey</span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-purple-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-purple-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
