import React, { useState } from 'react';
import { useGSAP } from '../hooks/useGSAP';

// Note: Assuming useGSAP is defined in hooks/useGSAP.tsx as used in other components.

const Skills = () => {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const containerRef = useGSAP(); // Use GSAP container for fade-in effect

  const skillCategories = [
    {
      title: "DevOps Tools & Cloud",
      icon: "🛠️",
      color: "from-orange-500 to-pink-500",
      skills: [
        { name: "Docker", level: 85 },
        { name: "Kubernetes", level: 75 },
        { name: "Jenkins", level: 80 },
        { name: "Terraform", level: 70 },
        { name: "Git", level: 90 }
      ]
    },
    {
      title: "Web Development & Frameworks",
      icon: "🌐",
      color: "from-pink-500 to-red-500",
      skills: [
        { name: "React.js", level: 85 },
        { name: "JavaScript", level: 90 },
        { name: "HTML/CSS", level: 95 },
        { name: "Flask", level: 80 },
        { name: "Tailwind CSS", level: 85 }
      ]
    },
    {
      title: "Programming Languages & Core",
      icon: "💻",
      color: "from-yellow-500 to-orange-500",
      skills: [
        { name: "Python", level: 90 },
        { name: "Java", level: 80 },
        { name: "C", level: 75 },
        { name: "SQL", level: 85 },
        { name: "Bash/Shell Scripting", level: 80 }
      ]
    },
    {
      title: "Databases & Workflow",
      icon: "⚙️",
      color: "from-red-500 to-orange-500",
      skills: [
        { name: "MySQL", level: 85 },
        { name: "PostgreSQL", level: 75 },
        { name: "MongoDB", level: 70 },
        { name: "REST APIs", level: 85 },
        { name: "Linux", level: 80 }
      ]
    }
  ];

  return (
    <section ref={containerRef} id="skills" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="gsap-text text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">
            Technical Skills Matrix
          </h2>
          <div className="gsap-text w-24 h-1 bg-gradient-to-r from-orange-500 to-pink-500 mx-auto"></div>
          <p className="gsap-text text-gray-400 mt-6 text-lg max-w-2xl mx-auto">
            A specialized overview of technical proficiencies across key domains.
          </p>
        </div>

        {/* New Compact Grid Layout (Skill Matrix) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category, categoryIndex) => (
            <div
              key={categoryIndex}
              className="gsap-card bg-gray-800/60 p-4 rounded-xl border border-gray-700 hover:border-orange-500/50 transition-all duration-500 backdrop-blur-sm shadow-lg hover:shadow-orange-500/10"
            >
              {/* Category Header */}
              <div className="flex flex-col items-start mb-4">
                <div className={`text-2xl mb-1`}>
                  {category.icon}
                </div>
                <h3 className={`text-lg font-bold bg-gradient-to-r ${category.color} bg-clip-text text-transparent border-b border-gray-700/50 w-full pb-2`}>
                  {category.title}
                </h3>
              </div>

              {/* Skills List with Compact Progress Bars */}
              <div className="grid gap-3">
                {category.skills.map((skill, skillIndex) => (
                  <div
                    key={skillIndex}
                    className="group cursor-pointer py-1"
                    onMouseEnter={() => setHoveredSkill(`${categoryIndex}-${skillIndex}`)}
                    onMouseLeave={() => setHoveredSkill(null)}
                  >
                    <div className="flex items-center justify-between mb-1">
                      {/* Reduced size and color contrast for primary reading */}
                      <span className="text-gray-300 font-medium text-sm group-hover:text-white transition-colors duration-300">
                        {skill.name}
                      </span>
                      <div className={`px-2 rounded-full text-xs font-semibold transition-all duration-300 ${
                        hoveredSkill === `${categoryIndex}-${skillIndex}` 
                          ? `bg-gradient-to-r ${category.color} text-white` 
                          : 'bg-gray-700 text-gray-300'
                      }`}>
                        {skill.level}%
                      </div>
                    </div>
                    
                    {/* Compact Progress Bar (h-2) */}
                    <div className="relative w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-1000 ease-out bg-gradient-to-r ${category.color} ${
                          hoveredSkill === `${categoryIndex}-${skillIndex}` ? 'animate-pulse' : ''
                        }`}
                        style={{ 
                          width: hoveredSkill === `${categoryIndex}-${skillIndex}` ? `${skill.level}%` : '0%',
                          transition: hoveredSkill === `${categoryIndex}-${skillIndex}` ? 'width 1s ease-out' : 'width 0.3s ease-out'
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Future Growth Indicator */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-4 bg-gray-900/60 px-8 py-4 rounded-full border border-gray-700">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-orange-500 rounded-full animate-bounce"></div>
              <div className="w-3 h-3 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
            <span className="text-gray-400">Continuous skill acquisition is ongoing.</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;