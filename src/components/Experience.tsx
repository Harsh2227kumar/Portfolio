
import React, { useState } from 'react';
import { Briefcase, Calendar, MapPin, TrendingUp, Zap } from 'lucide-react';
import { useGSAP } from '../hooks/useGSAP';

const Experience = () => {
  const [hoveredExp, setHoveredExp] = useState<number | null>(null);
  const containerRef = useGSAP();

  const experiences = [
    {
      title: "DevOps Engineer",
      company: "ELEVATE LABS",
      period: "Jun 2025 – Present",
      type: "Internship",
      description: [
        "Working on containerized deployments using Docker and orchestration with Kubernetes",
        "Building CI/CD pipelines using Jenkins and Git",
        "Infrastructure as Code with Terraform",
        "Contributed to an Incident Management System, enhancing ticket lifecycle workflows and user authentication with Flask"
      ],
      color: "from-purple-500 to-pink-500",
      level: 4,
      icon: <Zap className="w-6 h-6" />
    },
    {
      title: "Co-Lead of Documentation & Web Developer",
      company: "Hack4Maha",
      period: "Apr 2025 – Present",
      type: "Volunteer",
      description: [
        "Oversaw and maintained event-related documents, improving clarity and accessibility",
        "Contributed to the event's frontend using modern frameworks and tools"
      ],
      color: "from-blue-500 to-cyan-500",
      level: 3,
      icon: <TrendingUp className="w-6 h-6" />
    },
    {
      title: "Lead of Hacker's Experience & Web Developer",
      company: "Hack4Brahma",
      period: "Mar 2025 – Present",
      type: "Volunteer",
      description: [
        "Led initiatives to enhance hacker onboarding and engagement",
        "Designed and maintained web interfaces using HTML, CSS, JS, and version control with Git/GitHub"
      ],
      color: "from-green-500 to-emerald-500",
      level: 2,
      icon: <MapPin className="w-6 h-6" />
    },
    {
      title: "Web Developer",
      company: "CodeHunt",
      period: "Oct 2024 – Feb 2025",
      type: "Project",
      description: [
        "Built responsive and modular web components using React.js and Tailwind CSS",
        "Focused on team-based collaboration and version control workflows"
      ],
      color: "from-orange-500 to-red-500",
      level: 1,
      icon: <Briefcase className="w-6 h-6" />
    }
  ];

  const GrowthGlass = ({ level, color }: { level: number, color: string }) => {
    const waterHeight = (level / 4) * 80; // Changed from 100 to 80 so level 4 doesn't completely fill
    
    return (
      <div className="relative w-3 h-6 mx-auto"> {/* Made even smaller: w-5 h-8 -> w-3 h-6 */}
        {/* Glass Container */}
        <div className="absolute inset-0 border-2 border-gray-400 rounded-b-lg bg-transparent opacity-80">
          {/* Water */}
          <div 
            className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t ${color} rounded-b-lg transition-all duration-1000 ease-out`}
            style={{ height: `${waterHeight}%` }}
          >
            {/* Floating animation bubbles */}
            <div className="relative h-full overflow-hidden">
              <div className="absolute w-0.5 h-0.5 bg-white/30 rounded-full animate-ping" style={{ left: '20%', animationDelay: '0s', animationDuration: '2s' }}></div>
              <div className="absolute w-0.5 h-0.5 bg-white/40 rounded-full animate-ping" style={{ left: '70%', animationDelay: '0.5s', animationDuration: '2.5s' }}></div>
              <div className="absolute w-0.5 h-0.5 bg-white/30 rounded-full animate-ping" style={{ left: '45%', animationDelay: '1s', animationDuration: '3s' }}></div>
              
              {/* Water surface wave animation */}
              <div className="absolute top-0 left-0 w-full h-0.5 bg-white/20 animate-pulse"></div>
            </div>
          </div>
        </div>
        
        {/* Glass reflection effect */}
        <div className="absolute inset-y-0 left-0 w-0.5 bg-gradient-to-b from-white/40 to-transparent rounded-l-lg"></div>
      </div>
    );
  };

  return (
    <section ref={containerRef} id="experience" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Growth Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-green-500 to-cyan-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-20 h-20 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <h2 className="gsap-text text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Growth Journey
            </h2>
          </div>
          <p className="gsap-text text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Every step forward is a step toward achieving something bigger and better than your current situation
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Growth Tree Layout */}
        <div className="relative">
          {/* Main Growth Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-purple-500 via-blue-500 via-green-500 to-orange-500 rounded-full opacity-60"></div>
          
          {/* Growth Rings */}
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 border-4 border-gray-600 rounded-full bg-gray-900"
              style={{ top: `${20 + i * 25}%` }}
            ></div>
          ))}

          <div className="space-y-16">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className={`gsap-timeline-item relative flex items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                } group`}
                onMouseEnter={() => setHoveredExp(index)}
                onMouseLeave={() => setHoveredExp(null)}
              >
                {/* Central Growth Node */}
                <div className="absolute left-1/2 transform -translate-x-1/2 z-20">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${exp.color} p-1 transition-all duration-500 ${
                    hoveredExp === index ? 'scale-125 shadow-2xl' : 'scale-100'
                  }`}>
                    <div className="w-full h-full bg-gray-900 rounded-full flex items-center justify-center text-white">
                      {exp.icon}
                    </div>
                  </div>
                  
                  {/* Growth Level Glass Indicator */}
                  <div className="absolute -top-2 -right-2">
                    <div className={`w-5 h-7 rounded-lg bg-gray-800/20 backdrop-blur-sm border border-gray-600/30 flex items-end justify-center p-1 ${
                      hoveredExp === index ? 'scale-110' : 'scale-100'
                    } transition-all duration-300`}>
                      <GrowthGlass level={exp.level} color={exp.color} />
                    </div>
                  </div>
                </div>

                {/* Experience Card */}
                <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:pr-16' : 'md:pl-16'}`}>
                  <div className={`gsap-card relative transition-all duration-500 transform ${
                    hoveredExp === index ? 'scale-105 -translate-y-2' : 'scale-100'
                  }`}>
                    {/* Card Background with Gradient Border */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${exp.color} rounded-2xl opacity-0 transition-opacity duration-500 ${
                      hoveredExp === index ? 'opacity-100' : ''
                    }`}></div>
                    
                    <div className="relative bg-gray-900/90 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 hover:border-transparent transition-all duration-500">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-3">
                            <span className={`px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r ${exp.color} text-white shadow-lg`}>
                              {exp.type}
                            </span>
                            <div className="flex items-center text-gray-400 text-sm">
                              <Calendar className="w-4 h-4 mr-1" />
                              {exp.period}
                            </div>
                          </div>
                          
                          <h3 className="text-2xl font-bold text-white mb-2 leading-tight">
                            {exp.title}
                          </h3>
                          <h4 className={`text-lg font-semibold bg-gradient-to-r ${exp.color} bg-clip-text text-transparent`}>
                            {exp.company}
                          </h4>
                        </div>
                      </div>

                      {/* Achievements */}
                      <div className="space-y-3">
                        {exp.description.map((achievement, i) => (
                          <div key={i} className="flex items-start space-x-3 group/item">
                            <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${exp.color} mt-2 transition-all duration-300 group-hover/item:scale-150`}></div>
                            <p className="text-gray-300 leading-relaxed flex-1 group-hover/item:text-white transition-colors duration-300">
                              {achievement}
                            </p>
                          </div>
                        ))}
                      </div>

                      {/* Removed the duplicate Growth Indicator section */}
                    </div>
                  </div>
                </div>

                {/* Side Growth Branches */}
                <div className={`hidden md:block absolute ${
                  index % 2 === 0 ? 'left-1/2 ml-8' : 'right-1/2 mr-8'
                } top-1/2 transform -translate-y-1/2`}>
                  <div className={`w-16 h-0.5 bg-gradient-to-r ${exp.color} opacity-60 transition-all duration-500 ${
                    hoveredExp === index ? 'opacity-100 scale-x-150' : ''
                  }`}></div>
                </div>
              </div>
            ))}
          </div>

          {/* Future Growth Indicator */}
          <div className="text-center mt-20">
            <div className="inline-flex items-center space-x-4 bg-gray-900/60 backdrop-blur-sm px-8 py-6 rounded-2xl border border-gray-700">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce"></div>
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-3 h-3 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
              <span className="text-gray-300 font-medium">The journey continues...</span>
              <TrendingUp className="w-5 h-5 text-purple-400" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
