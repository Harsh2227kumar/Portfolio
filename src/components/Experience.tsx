import React, { useState } from 'react';

import { Briefcase, Calendar, MapPin, TrendingUp, Zap } from 'lucide-react';

import { useGSAP } from '../hooks/useGSAP';

const Experience = () => {
  const [hoveredExp, setHoveredExp] = useState<number | null>(null);
  const containerRef = useGSAP();

  const experiences = [
    {
      title: "DevOps Intern",
      company: "Elevate Labs",
      period: "Jun 2025 – Jul 2025",
      type: "Internship",
      description: [
        "Built a Dockerized Flask app with RBAC, REST APIs, and automated email alerts, cutting incident resolution time by 30%",
        "Automated multi-cloud deployments on GCP and DigitalOcean using Terraform and shell scripts, reducing deployment time by 40%",
        "Set up Jenkins CI/CD pipelines for containerized apps, ensuring reliable multi-cloud deployments",
        "Created scalable, maintainable IaC templates with best practices for version control"
      ],
      color: "from-orange-500 to-pink-500", // Changed from purple to orange, pink
      icon: <Zap className="w-6 h-6" />
    },
    {
      title: "Lead, Hacker's Experience Team & Web Developer",
      company: "Hack4Maha & Hack4Brahma Hackathon",
      period: "Apr 2025 – Oct 2025",
      type: "Volunteer",
      description: [
        "Managed engagement and logistics for 500+ participants, optimizing mentorship sessions and event experience",
        "Built and deployed the official hackathon website with React.js and Tailwind CSS, ensuring responsive design and smooth UX",
        "Collaborated with cross-functional teams to deliver a seamless and successful event experience"
      ],
      color: "from-pink-500 to-red-500", // Changed from blue to pink, red
      icon: <TrendingUp className="w-6 h-6" />
    },
    {
      title: "Campus Ambassador",
      company: "Unstop",
      period: "Sep 2025 – Present",
      type: "Volunteer",
      description: [
        "Promoting student participation in hackathons, coding competitions, and technical events across campus",
        "Building community engagement and facilitating networking opportunities for students in tech competitions"
      ],
      color: "from-green-500 to-emerald-500", // Green can remain or be shifted to a different warm tone like yellow-orange
      icon: <MapPin className="w-6 h-6" />
    }
  ];

  return (
    <section ref={containerRef} id="experience" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Growth Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-20 h-20 bg-gradient-to-r from-pink-500 to-red-500 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <h2 className="gsap-text text-5xl md:text-6xl font-bold bg-gradient-to-r from-orange-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
              Growth Journey
            </h2>
          </div>
          <p className="gsap-text text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Every step forward is a step toward achieving something bigger and better than your current situation
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-orange-500 via-pink-500 to-red-500 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Growth Tree Layout */}
        <div className="relative">
          {/* Main Growth Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-orange-500 via-pink-500 via-yellow-500 to-red-500 rounded-full opacity-60"></div>
          
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
                </div>

                {/* Experience Card */}
                {/* INCREASED WIDTH: md:w-5/12 -> md:w-6/12 */}
                <div className={`w-full md:w-6/12 ${index % 2 === 0 ? 'md:pr-16' : 'md:pl-16'}`}>
                  <div className={`gsap-card relative transition-all duration-500 transform ${
                    hoveredExp === index ? 'scale-105 -translate-y-2' : 'scale-100'
                  }`}>
                    {/* Card Background with Gradient Border */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${exp.color} rounded-2xl opacity-0 transition-opacity duration-500 ${
                      hoveredExp === index ? 'opacity-100' : ''
                    }`}></div>
                    
                    {/* REDUCED PADDING: p-8 -> p-6 */}
                    <div className="relative bg-gray-900/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 hover:border-transparent transition-all duration-500">
                      {/* Header */}
                      {/* REDUCED MARGIN: mb-6 -> mb-4 */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-3">
                            {/* REDUCED PADDING: px-4 py-2 -> px-3 py-1 */}
                            <span className={`px-3 py-1 rounded-full text-sm font-semibold bg-gradient-to-r ${exp.color} text-white shadow-lg`}>
                              {exp.type}
                            </span>
                            <div className="flex items-center text-gray-400 text-sm">
                              <Calendar className="w-4 h-4 mr-1" />
                              {exp.period}
                            </div>
                          </div>
                          
                          {/* REDUCED FONT SIZE: text-2xl -> text-xl */}
                          <h3 className="text-xl font-bold text-white mb-2 leading-tight">
                            {exp.title}
                          </h3>
                          {/* REDUCED FONT SIZE: text-lg -> text-base */}
                          <h4 className={`text-base font-semibold bg-gradient-to-r ${exp.color} bg-clip-text text-transparent`}>
                            {exp.company}
                          </h4>
                        </div>
                      </div>

                      {/* Achievements */}
                      {/* REDUCED SPACING: space-y-3 -> space-y-2 */}
                      <div className="space-y-2">
                        {exp.description.map((achievement, i) => (
                          <div key={i} className="flex items-start space-x-3 group/item">
                            <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${exp.color} mt-2 transition-all duration-300 group-hover/item:scale-150`}></div>
                            <p className="text-gray-300 leading-relaxed flex-1 group-hover/item:text-white transition-colors duration-300 text-sm">
                              {achievement}
                            </p>
                          </div>
                        ))}
                      </div>
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
                <div className="w-3 h-3 bg-orange-500 rounded-full animate-bounce"></div>
                <div className="w-3 h-3 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
              <span className="text-gray-300 font-medium">The journey continues...</span>
              <TrendingUp className="w-5 h-5 text-orange-400" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;