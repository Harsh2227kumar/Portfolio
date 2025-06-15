
import React from 'react';

const Skills = () => {
  const skillCategories = [
    {
      title: "DevOps Tools",
      icon: "🛠️",
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
      skills: [
        { name: "Python", level: 90 },
        { name: "SQL", level: 85 },
        { name: "Tkinter", level: 75 }
      ]
    },
    {
      title: "Networking & Security",
      icon: "🔒",
      skills: [
        { name: "TCP/IP", level: 80 },
        { name: "Network Security", level: 75 },
        { name: "Ethical Hacking", level: 70 },
        { name: "Cybersecurity", level: 75 }
      ]
    }
  ];

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-800/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Technical Skills
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, index) => (
            <div
              key={index}
              className="bg-gray-700/50 p-6 rounded-lg border border-gray-600 hover:border-purple-500/50 transition-all duration-300"
            >
              <div className="flex items-center mb-6">
                <span className="text-2xl mr-3">{category.icon}</span>
                <h3 className="text-xl font-bold text-white">{category.title}</h3>
              </div>

              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex}>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-300">{skill.name}</span>
                      <span className="text-purple-400">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-600 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
