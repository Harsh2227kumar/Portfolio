import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const Skills = () => {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const skillBoxesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Initialize refs array
    skillBoxesRef.current = skillBoxesRef.current.slice(0, skillCategories.length);

    // Create animation for each skill box
    skillBoxesRef.current.forEach((box, index) => {
      if (!box) return;

      gsap.fromTo(box,
        {
          opacity: 0,
          y: 50,
          scale: 0.9
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: box,
            start: "top bottom-=100",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const skillCategories = [
    {
      title: "DevOps Tools",
      icon: "🛠️",
      color: "from-purple-500 to-blue-500",
      skills: [
        { name: "Docker", level: 85 },
        { name: "Kubernetes", level: 75 },
        { name: "Jenkins", level: 80 },
        { name: "Terraform", level: 70 },
        { name: "Git", level: 90 }
      ]
    },
    {
      title: "Web Development",
      icon: "🌐",
      color: "from-blue-500 to-cyan-500",
      skills: [
        { name: "React.js", level: 85 },
        { name: "JavaScript", level: 90 },
        { name: "HTML/CSS", level: 95 },
        { name: "Flask", level: 80 },
        { name: "Tailwind CSS", level: 85 }
      ]
    },
    {
      title: "Programming",
      icon: "💻",
      color: "from-cyan-500 to-green-500",
      skills: [
        { name: "Python", level: 90 },
        { name: "SQL", level: 85 },
        { name: "Tkinter", level: 75 }
      ]
    },
    {
      title: "Networking & Security",
      icon: "🔒",
      color: "from-green-500 to-purple-500",
      skills: [
        { name: "TCP/IP", level: 80 },
        { name: "Network Security", level: 75 },
        { name: "Ethical Hacking", level: 70 },
        { name: "Cybersecurity", level: 75 }
      ]
    }
  ];

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Technical Skills
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto"></div>
          <p className="text-gray-400 mt-6 text-lg">
            Hover over each skill to see my proficiency level
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <div
              key={categoryIndex}
              ref={el => skillBoxesRef.current[categoryIndex] = el}
              className="bg-gray-900/60 p-8 rounded-2xl border border-gray-700 hover:border-purple-500/50 transition-all duration-500 backdrop-blur-sm"
            >
              <div className="flex items-center mb-8">
                <div className={`text-3xl mr-4 p-3 rounded-full bg-gradient-to-r ${category.color} bg-opacity-20`}>
                  {category.icon}
                </div>
                <h3 className="text-2xl font-bold text-white">{category.title}</h3>
              </div>

              <div className="grid gap-6">
                {category.skills.map((skill, skillIndex) => (
                  <div
                    key={skillIndex}
                    className="group cursor-pointer"
                    onMouseEnter={() => setHoveredSkill(`${categoryIndex}-${skillIndex}`)}
                    onMouseLeave={() => setHoveredSkill(null)}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-gray-300 font-medium text-lg group-hover:text-white transition-colors duration-300">
                        {skill.name}
                      </span>
                      <div className={`px-3 py-1 rounded-full text-sm font-bold transition-all duration-300 ${
                        hoveredSkill === `${categoryIndex}-${skillIndex}` 
                          ? `bg-gradient-to-r ${category.color} text-white` 
                          : 'bg-gray-700 text-gray-300'
                      }`}>
                        {skill.level}%
                      </div>
                    </div>
                    
                    <div className="relative">
                      <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
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
                      
                      {hoveredSkill === `${categoryIndex}-${skillIndex}` && (
                        <div className="absolute top-0 left-0 w-full h-full">
                          <div
                            className="h-full bg-white/20 rounded-full animate-pulse"
                            style={{ width: `${skill.level}%` }}
                          ></div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-4 bg-gray-900/60 px-8 py-4 rounded-full border border-gray-700">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce"></div>
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-3 h-3 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
            <span className="text-gray-400">Always learning and improving</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
