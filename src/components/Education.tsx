
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
        <div className="text-center mb-20">
          <div className="gsap-text inline-block mb-8">
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-green-400 bg-clip-text text-transparent">
              Education Journey
            </h2>
          </div>
          <div className="gsap-text w-32 h-1.5 bg-gradient-to-r from-purple-500 via-blue-500 to-green-500 mx-auto mb-8 rounded-full"></div>
          <p className="gsap-text text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Academic foundation built through dedicated learning and excellence
          </p>
        </div>

        {/* Education Timeline */}
        <div className="space-y-12 mb-20">
          {educationData.map((edu, index) => (
            <div key={index} className="gsap-timeline-item relative">
              {/* Timeline Connector */}
              {index < educationData.length - 1 && (
                <div className="absolute left-8 top-32 w-0.5 h-32 bg-gradient-to-b from-purple-500 to-blue-500 z-0"></div>
              )}
              
              {/* Timeline Node */}
              <div className="absolute left-6 top-8 w-4 h-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full border-4 border-gray-900 z-10"></div>
              
              {/* Content Card */}
              <div className="ml-20">
                <div className="gsap-card bg-gray-800/20 backdrop-blur-sm p-8 rounded-3xl border border-gray-700/30 hover:border-purple-500/40 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/20">
                  {/* Header */}
                  <div className="flex flex-wrap items-start justify-between mb-6">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{edu.degree}</h3>
                      <p className="text-xl text-gray-300 mb-2">{edu.institution}</p>
                      <div className="flex flex-wrap items-center gap-4 text-gray-400">
                        <div className="flex items-center">
                          <MapPin size={16} className="mr-2" />
                          {edu.location}
                        </div>
                        <div className="flex items-center">
                          <Calendar size={16} className="mr-2" />
                          {edu.duration}
                        </div>
                        <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                          edu.status === 'Pursuing' 
                            ? 'bg-green-600/30 text-green-300' 
                            : 'bg-blue-600/30 text-blue-300'
                        }`}>
                          {edu.status}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                        {edu.gpa}
                      </div>
                      <p className="text-gray-400 text-sm">Performance</p>
                    </div>
                  </div>

                  {/* Core Subjects */}
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                      <BookOpen size={20} className="mr-2 text-blue-400" />
                      Core Subjects
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {edu.coreSubjects.map((subject, idx) => (
                        <span key={idx} className="px-3 py-2 bg-gradient-to-r from-purple-600/20 to-blue-600/20 text-gray-300 rounded-full text-sm border border-purple-500/30 hover:border-purple-500/50 transition-colors duration-300">
                          {subject}
                        </span>
                      ))}
                    </div>
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
