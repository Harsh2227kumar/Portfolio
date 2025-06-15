
import React from 'react';
import { GraduationCap, Calendar, MapPin, BookOpen } from 'lucide-react';
import { useGSAP } from '../hooks/useGSAP';

const Education = () => {
  const containerRef = useGSAP();

  const educationData = [
    {
      degree: "B.Tech in Computer Science",
      institution: "Symbiosis Institute of Technology",
      location: "Nagpur, Maharashtra",
      duration: "2022 - 2026",
      status: "Pursuing",
      gpa: "8.5/10 CGPA",
      coreSubjects: ["Data Structures & Algorithms", "Database Management Systems", "Computer Networks", "Operating Systems", "Software Engineering", "Web Technologies", "Object Oriented Programming", "Machine Learning"]
    },
    {
      degree: "Higher Secondary Certificate",
      institution: "Delhi Public School",
      location: "Nagpur, Maharashtra", 
      duration: "2020 - 2022",
      status: "Completed",
      gpa: "95.2%",
      coreSubjects: ["Mathematics", "Physics", "Chemistry", "Computer Science", "English"]
    }
  ];

  return (
    <section ref={containerRef} id="education" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="gsap-card absolute -top-40 -right-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="gsap-card absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="gsap-card absolute top-1/4 right-1/4 w-64 h-64 bg-green-500/5 rounded-full blur-2xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="gsap-text inline-block mb-6">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-green-400 bg-clip-text text-transparent">
              Education Journey
            </h2>
          </div>
          <div className="gsap-text w-32 h-1.5 bg-gradient-to-r from-purple-500 via-blue-500 to-green-500 mx-auto mb-6 rounded-full"></div>
          <p className="gsap-text text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Academic foundation built through dedicated learning and excellence
          </p>
        </div>

        {/* Education Cards - Horizontal Layout */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {educationData.map((edu, index) => (
            <div key={index} className="gsap-timeline-item">
              <div className="gsap-card bg-gray-800/10 backdrop-blur-sm p-6 rounded-2xl border border-gray-700/20 hover:border-purple-500/30 transition-all duration-500 hover:shadow-xl hover:shadow-purple-500/10 h-full">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-bold text-white mb-2">{edu.degree}</h3>
                    <p className="text-lg text-gray-300 mb-2">{edu.institution}</p>
                    <div className="flex flex-col gap-2 text-gray-400 text-sm">
                      <div className="flex items-center">
                        <MapPin size={14} className="mr-2" />
                        {edu.location}
                      </div>
                      <div className="flex items-center">
                        <Calendar size={14} className="mr-2" />
                        {edu.duration}
                      </div>
                      <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium w-fit ${
                        edu.status === 'Pursuing' 
                          ? 'bg-green-600/20 text-green-300' 
                          : 'bg-blue-600/20 text-blue-300'
                      }`}>
                        {edu.status}
                      </div>
                    </div>
                  </div>
                  <div className="text-right ml-4">
                    <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                      {edu.gpa}
                    </div>
                    <p className="text-gray-400 text-xs">Performance</p>
                  </div>
                </div>

                {/* Core Subjects */}
                <div>
                  <h4 className="text-base font-semibold text-white mb-3 flex items-center">
                    <BookOpen size={16} className="mr-2 text-blue-400" />
                    Core Subjects
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {edu.coreSubjects.map((subject, idx) => (
                      <span key={idx} className="px-2 py-1 bg-gradient-to-r from-purple-600/15 to-blue-600/15 text-gray-300 rounded-full text-xs border border-purple-500/20 hover:border-purple-500/40 transition-colors duration-300">
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
