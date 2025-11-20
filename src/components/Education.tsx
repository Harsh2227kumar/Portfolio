import React from 'react';
import { GraduationCap, Calendar, MapPin, BookOpen } from 'lucide-react';
import { useGSAP } from '../hooks/useGSAP';

const Education = () => {
  const containerRef = useGSAP();

  const educationData = [
    { 
      degree: "B.Tech in Computer Science Engineering",
      institution: "Symbiosis Institute of Technology",
      location: "Nagpur, Maharashtra",
      duration: "Aug 2024 - May 2028",
      status: "Pursuing",
      gpa: "7.8/10 CGPA",
      coreSubjects: ["Data Structures & Algorithms", "Operating Systems", "Design & Analysis of Algorithms", "Object-Oriented Programming (Java)", "Database Management Systems", "Computer Networks", "Software Engineering", "Web Technologies", "Machine Learning"]
    },
    // Note: Assuming two more entries will be added here to fill the three columns for the desired layout.
    // Placeholder 1:
    {
      degree: "HSC (Class 12th)",
      institution: "City Public School, Nagpur",
      location: "Nagpur, Maharashtra",
      duration: "2022",
      status: "Completed",
      gpa: "95.2%",
      coreSubjects: ["Physics", "Chemistry", "Mathematics", "Computer Science", "English"]
    },
    // Placeholder 2:
    {
      degree: "SSC (Class 10th)",
      institution: "State Board, Nagpur",
      location: "Nagpur, Maharashtra",
      duration: "2020",
      status: "Completed",
      gpa: "92%",
      coreSubjects: ["Science", "Social Science", "Mathematics", "English", "Hindi"]
    }
  ];

  return (
    <section ref={containerRef} id="education" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">

        <div className="gsap-card absolute top-1/4 right-1/4 w-64 h-64 bg-yellow-500/5 rounded-full blur-2xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="gsap-text inline-block mb-6">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-400 via-pink-400 to-yellow-400 bg-clip-text text-transparent">
              Education Journey
            </h2>
          </div>
          <div className="gsap-text w-32 h-1.5 bg-gradient-to-r from-orange-500 via-pink-500 to-yellow-500 mx-auto mb-6 rounded-full"></div>
          <p className="gsap-text text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Academic foundation built through dedicated learning and excellence
          </p>
        </div>

        {/* Education Cards - GRID Layout (3 columns on large screens) */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto">
          {educationData.map((edu, index) => (
            <div 
              key={index} 
              className="gsap-timeline-item"
            >
              <div className="gsap-card bg-gray-800/10 backdrop-blur-sm p-4 rounded-xl border border-gray-700/20 hover:border-orange-500/30 transition-all duration-500 hover:shadow-xl hover:shadow-orange-500/10 h-full">
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1 min-w-0">
                    {/* Reduced to text-lg */}
                    <h3 className="text-lg font-bold text-white mb-1">{edu.degree}</h3>
                    {/* Reduced to text-base */}
                    <p className="text-base text-gray-300 mb-2">{edu.institution}</p>
                    <div className="flex flex-col gap-1 text-gray-400 text-sm">
                      <div className="flex items-center">
                        <MapPin size={14} className="mr-2" />
                        {edu.location}
                      </div>
                      <div className="flex items-center">
                        <Calendar size={14} className="mr-2" />
                        {edu.duration}
                      </div>
                      <div className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium w-fit mt-1 ${
                        edu.status === 'Pursuing' 
                          ? 'bg-green-600/20 text-green-300' 
                          : 'bg-pink-600/20 text-pink-300'
                      }`}>
                        {edu.status}
                      </div>
                    </div>
                  </div>
                  <div className="text-right ml-4">
                    {/* Reduced to text-xl */}
                    <div className="text-xl font-bold bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">
                      {edu.gpa}
                    </div>
                    <p className="text-gray-400 text-xs">Performance</p>
                  </div>
                </div>

                {/* Core Subjects */}
                <div>
                  {/* Reduced margin */}
                  <h4 className="text-base font-semibold text-white mb-2 flex items-center pt-2 border-t border-gray-700/50 mt-3">
                    <BookOpen size={14} className="mr-2 text-pink-400" />
                    Core Subjects
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {/* Reduced skill tag size */}
                    {edu.coreSubjects.slice(0, 4).map((subject, idx) => (
                      <span key={idx} className="px-2 py-0.5 bg-gradient-to-r from-orange-600/15 to-pink-600/15 text-gray-300 rounded-full text-xs border border-orange-500/20 hover:border-orange-500/40 transition-colors duration-300">
                        {subject}
                      </span>
                    ))}
                    {edu.coreSubjects.length > 4 && (
                      <span className="px-2 py-0.5 bg-gray-700/30 text-gray-400 rounded-full text-xs">
                        +{edu.coreSubjects.length - 4} more
                      </span>
                    )}
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