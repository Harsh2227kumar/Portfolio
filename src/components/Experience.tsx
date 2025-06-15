
import React from 'react';
import { Briefcase } from 'lucide-react';

const Experience = () => {
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
      color: "purple"
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
      color: "blue"
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
      color: "green"
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
      color: "yellow"
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      purple: "border-purple-500 bg-purple-500",
      blue: "border-blue-500 bg-blue-500",
      green: "border-green-500 bg-green-500",
      yellow: "border-yellow-500 bg-yellow-500"
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Experience
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto"></div>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-purple-500 to-blue-500"></div>

          {experiences.map((exp, index) => (
            <div
              key={index}
              className={`relative flex items-center mb-12 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Timeline dot */}
              <div className={`absolute left-2 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 rounded-full border-4 ${getColorClasses(exp.color)} z-10`}></div>

              {/* Content */}
              <div className={`ml-12 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
                <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 hover:border-purple-500/50 transition-all duration-300 hover:scale-105">
                  <div className="flex items-center mb-4">
                    <Briefcase className="mr-3 text-purple-400" size={20} />
                    <span className="px-3 py-1 bg-purple-600/20 text-purple-400 rounded-full text-sm">
                      {exp.type}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-2">{exp.title}</h3>
                  <h4 className="text-lg text-purple-400 mb-2">{exp.company}</h4>
                  <p className="text-gray-400 mb-4">{exp.period}</p>
                  
                  <ul className="space-y-2">
                    {exp.description.map((item, i) => (
                      <li key={i} className="text-gray-300 flex items-start">
                        <span className="text-purple-400 mr-2">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
