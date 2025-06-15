
import React from 'react';
import { GraduationCap, Calendar, MapPin, Award, BookOpen, Users, Trophy, Star } from 'lucide-react';
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
      gpa: "8.5/10",
      highlights: [
        "Specialized in DevOps and Cloud Computing",
        "Active member of Technical Society",
        "Led multiple hackathon teams",
        "Published research on containerization"
      ],
      skills: ["Data Structures", "Algorithms", "System Design", "Database Management", "Software Engineering"],
      projects: 12,
      certifications: 8,
      gradient: "from-purple-500 to-blue-600"
    },
    {
      degree: "Higher Secondary Certificate",
      institution: "Delhi Public School",
      location: "Nagpur, Maharashtra", 
      duration: "2020 - 2022",
      status: "Completed",
      gpa: "95.2%",
      highlights: [
        "Science Stream with Computer Science",
        "School Topper in Mathematics",
        "Head of Computer Club",
        "Winner of Inter-school Programming Contest"
      ],
      skills: ["Mathematics", "Physics", "Chemistry", "Computer Science", "English"],
      projects: 6,
      certifications: 3,
      gradient: "from-green-500 to-emerald-600"
    }
  ];

  const achievements = [
    { icon: Trophy, title: "Academic Excellence", count: "95%+", desc: "Consistent high performance" },
    { icon: Award, title: "Certifications", count: "11+", desc: "Industry recognized credentials" },
    { icon: BookOpen, title: "Projects", count: "18+", desc: "Hands-on learning experiences" },
    { icon: Users, title: "Leadership", count: "5+", desc: "Teams led successfully" }
  ];

  const certifications = [
    { name: "AWS Cloud Practitioner", issuer: "Amazon Web Services", year: "2024", level: "Professional" },
    { name: "Docker Certified Associate", issuer: "Docker Inc.", year: "2024", level: "Professional" },
    { name: "Kubernetes Administrator", issuer: "Cloud Native Computing Foundation", year: "2023", level: "Expert" },
    { name: "React Development", issuer: "Meta", year: "2023", level: "Intermediate" },
    { name: "DevOps Foundation", issuer: "DevOps Institute", year: "2023", level: "Foundation" },
    { name: "Python Programming", issuer: "Python Institute", year: "2022", level: "Intermediate" }
  ];

  return (
    <section ref={containerRef} id="education" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 via-indigo-900/20 to-purple-900/30 relative overflow-hidden">
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
            A continuous pursuit of knowledge, growth, and academic excellence
          </p>
        </div>

        {/* Achievement Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {achievements.map((achievement, index) => (
            <div key={index} className="gsap-card bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm p-6 rounded-2xl border border-gray-700/30 hover:border-purple-500/40 transition-all duration-500 text-center group hover:scale-105">
              <div className="p-4 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl mx-auto mb-4 w-fit group-hover:rotate-12 transition-transform duration-300">
                <achievement.icon size={28} className="text-white" />
              </div>
              <div className="text-3xl font-bold text-white mb-2 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                {achievement.count}
              </div>
              <h4 className="text-lg font-semibold text-white mb-1">{achievement.title}</h4>
              <p className="text-gray-400 text-sm">{achievement.desc}</p>
            </div>
          ))}
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
                <div className={`gsap-card bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm p-8 rounded-3xl border border-gray-700/30 hover:border-purple-500/40 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/20`}>
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
                      <p className="text-gray-400 text-sm">GPA/Score</p>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="bg-purple-600/20 p-4 rounded-xl text-center">
                      <div className="text-2xl font-bold text-purple-300">{edu.projects}</div>
                      <p className="text-purple-200 text-sm">Projects</p>
                    </div>
                    <div className="bg-blue-600/20 p-4 rounded-xl text-center">
                      <div className="text-2xl font-bold text-blue-300">{edu.certifications}</div>
                      <p className="text-blue-200 text-sm">Certificates</p>
                    </div>
                    <div className="bg-green-600/20 p-4 rounded-xl text-center">
                      <div className="text-2xl font-bold text-green-300">{edu.highlights.length}</div>
                      <p className="text-green-200 text-sm">Achievements</p>
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                        <Star size={20} className="mr-2 text-yellow-400" />
                        Key Highlights
                      </h4>
                      <ul className="space-y-2">
                        {edu.highlights.map((highlight, idx) => (
                          <li key={idx} className="text-gray-300 flex items-start">
                            <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                        <BookOpen size={20} className="mr-2 text-blue-400" />
                        Core Subjects
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {edu.skills.map((skill, idx) => (
                          <span key={idx} className="px-3 py-1 bg-gray-700/50 text-gray-300 rounded-full text-sm border border-gray-600/30">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Certifications Section */}
        <div className="gsap-card bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm p-10 rounded-3xl border border-gray-700/30 mb-16">
          <h3 className="gsap-text text-3xl font-bold text-center text-white mb-12 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Certifications & Credentials
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <div key={index} className="gsap-card bg-gray-800/40 backdrop-blur-sm p-6 rounded-2xl border border-gray-700/30 hover:border-purple-500/30 transition-all duration-300 hover:bg-gray-800/60 group">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg group-hover:scale-110 transition-transform duration-300">
                    <Award size={24} className="text-white" />
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    cert.level === 'Expert' ? 'bg-red-600/30 text-red-300' :
                    cert.level === 'Professional' ? 'bg-purple-600/30 text-purple-300' :
                    cert.level === 'Intermediate' ? 'bg-blue-600/30 text-blue-300' :
                    'bg-green-600/30 text-green-300'
                  }`}>
                    {cert.level}
                  </span>
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">{cert.name}</h4>
                <p className="text-gray-400 text-sm mb-2">{cert.issuer}</p>
                <p className="text-gray-500 text-sm">{cert.year}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="gsap-text text-center">
          <div className="inline-block p-8 bg-gradient-to-r from-purple-900/30 to-blue-900/30 backdrop-blur-sm rounded-3xl border border-purple-500/30">
            <GraduationCap size={48} className="mx-auto mb-4 text-purple-400" />
            <h4 className="text-2xl font-bold text-white mb-4">
              Continuous Learning Journey
            </h4>
            <p className="text-gray-300 mb-6 max-w-md">
              Always eager to learn new technologies and expand my knowledge horizons
            </p>
            <a
              href="#contact"
              className="gsap-button inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-full text-white font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25"
            >
              Let's Discuss
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
