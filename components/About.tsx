import React from 'react';
import { User, Code, Settings, Award, Shield, ExternalLink } from 'lucide-react';
import { useGSAP } from '../hooks/useGSAP';

const About = () => {
  const containerRef = useGSAP();

  const certifications = [
    {
      name: "DevOps Internship Certificate",
      issuer: "Elevate Labs",
      year: "Jul 2025",
      level: "Professional",
      skills: ["Docker", "Terraform", "Jenkins", "CI/CD", "GCP", "Digital Ocean"],
      hasCredential: true,
      credentialUrl: "https://drive.google.com/file/d/1BFEDKfKpIcAuKLDPLUpSy38N98qz0E3G/view?usp=sharing" // Placeholder
    },
    {
      name: "Red Hat Certified Specialist in Python Programming (AD141 - RHA)",
      issuer: "Red Hat",
      year: "2024",
      level: "Expert",
      skills: ["Python", "Linux", "Scripting", "Automation"],
      hasCredential: true,
      credentialUrl: "https://drive.google.com/file/d/1E5bomX4mh-Mu2i6g1nLGLLzjUeThLvf5/view?usp=sharing" // Placeholder
    },
    {
      name: "Data Structures and Algorithms using Python",
      issuer: "(Various)",
      year: "2024",
      level: "Professional",
      skills: ["Python", "Data Structures", "Algorithms", "Problem Solving"],
      hasCredential: true,
      credentialUrl: "https://drive.google.com/file/d/1N3743EI2kjaGNkTPrFVpL2qcUTMWsHIw/view?usp=sharing" // Placeholder
    },
    {
      name: "Cisco Networking Basics",
      issuer: "Cisco",
      year: "2024",
      level: "Foundation",
      skills: ["Networking", "TCP/IP", "Computer Networks", "Network Security"],
      hasCredential: true,
      credentialUrl: "https://drive.google.com/file/d/1IwkEBHZZMXX3ckIWnE-fu4qhknYnhKgC/view?usp=sharing" // Placeholder
    },
    {
      name: "HackerRank SQL (Intermediate)",
      issuer: "HackerRank",
      year: "2024",
      level: "Intermediate",
      skills: ["SQL", "Database Management", "Query Optimization", "Data Analysis"],
      hasCredential: true,
      credentialUrl: "https://drive.google.com/file/d/1c5PKrI2ozjyXnl_1QlHOP7JP_9Qn33y_/view?usp=sharing" // Placeholder
    }
  ];
  
  return (
    <section ref={containerRef} id="about" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="gsap-card absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-yellow-500/5 rounded-full blur-2xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-20">
          <div className="gsap-text inline-block mb-8">
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-orange-400 via-pink-400 to-yellow-400 bg-clip-text text-transparent">
              About Me
            </h2>
          </div>
          <div className="gsap-text w-32 h-1.5 bg-gradient-to-r from-orange-500 via-pink-500 to-yellow-500 mx-auto mb-8 rounded-full"></div>
          <p className="gsap-text text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Passionate DevOps and Web Development Enthusiast crafting innovative solutions
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left Side - Story */}
          <div className="space-y-8">
            <div className="gsap-card bg-gray-800/20 backdrop-blur-sm p-8 rounded-3xl border border-orange-500/20 hover:border-orange-500/40 transition-all duration-500">
              <h3 className="gsap-text text-3xl font-bold text-white mb-6 bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">
                My Journey
              </h3>
              <p className="gsap-text text-gray-300 leading-relaxed mb-6">
                I am a passionate and proactive DevOps and Web Development Enthusiast currently pursuing a B.Tech in Computer Science Engineering at Symbiosis Institute of Technology, Nagpur. My journey has been driven by curiosity and a relentless pursuit of excellence.
              </p>
              <p className="gsap-text text-gray-300 leading-relaxed">
                With multiple hands-on experiences across technical internships and hackathon organizations, I've built a solid foundation in DevOps, Web Development, Networking, and Cybersecurity, including CI/CD pipelines and infrastructure as code. My initiative to contribute both technically and organizationally sets me apart.
              </p>
            </div>
          </div>

          {/* Right Side - Expertise Cards */}
          <div className="space-y-4">
            <div className="gsap-card bg-orange-900/10 backdrop-blur-sm p-4 rounded-xl border border-orange-500/30 hover:border-orange-500/50 transition-all duration-500 hover:shadow-lg hover:shadow-orange-500/20">
              <div className="flex items-center mb-3">
                <div className="p-2 bg-orange-600 rounded-lg mr-3 gsap-button">
                  <Settings size={20} />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white">DevOps Engineering</h4>
                  <p className="text-orange-200 text-xs">Infrastructure & Automation</p>
                </div>
              </div>
              <p className="text-gray-300 mb-2 text-sm">
                Expertise in containerized deployments, CI/CD pipelines, and cloud infrastructure management.
              </p>
              <div className="flex flex-wrap gap-1">
                {['Docker', 'Terraform', 'Jenkins', 'Kubernetes', 'GCP', 'Azure', 'Digital Ocean'].map((tech) => (
                  <span key={tech} className="px-2 py-1 bg-orange-600/30 text-orange-200 rounded-full text-xs">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="gsap-card bg-pink-900/10 backdrop-blur-sm p-4 rounded-xl border border-pink-500/30 hover:border-pink-500/50 transition-all duration-500 hover:shadow-lg hover:shadow-pink-500/20">
              <div className="flex items-center mb-3">
                <div className="p-2 bg-pink-600 rounded-lg mr-3 gsap-button">
                  <Code size={20} />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white">Web Development</h4>
                  <p className="text-pink-200 text-xs">Full-Stack Solutions</p>
                </div>
              </div>
              <p className="text-gray-300 mb-2 text-sm">
                Building modern, responsive web applications with cutting-edge technologies.
              </p>
              <div className="flex flex-wrap gap-1">
                {['React.js', 'Node.js', 'Flask', 'Express.js', 'Tailwind CSS', 'JavaScript'].map((tech) => (
                  <span key={tech} className="px-2 py-1 bg-pink-600/30 text-pink-200 rounded-full text-xs">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="gsap-card bg-red-900/10 backdrop-blur-sm p-4 rounded-xl border border-red-500/30 hover:border-red-500/50 transition-all duration-500 hover:shadow-lg hover:shadow-red-500/20">
              <div className="flex items-center mb-3">
                <div className="p-2 bg-red-600 rounded-lg mr-3 gsap-button">
                  <Shield size={20} />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white">Core Competencies</h4>
                  <p className="text-red-200 text-xs">Security, Networking & Systems</p>
                </div>
              </div>
              <p className="text-gray-300 mb-2 text-sm">
                Strong foundation in algorithms, system design, and network security.
              </p>
              <div className="flex flex-wrap gap-1">
                {['Networking', 'Web Application Security', 'System Design', 'Linux'].map((skill) => (
                  <span key={skill} className="px-2 py-1 bg-red-600/30 text-red-200 rounded-full text-xs">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Certifications Section */}
        <div className="gsap-card bg-gray-800/5 backdrop-blur-sm p-10 rounded-3xl border border-gray-700/20">
          <h3 className="gsap-text text-3xl font-bold text-center text-white mb-12 bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">
            Licenses & Certifications
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <div key={index} className="gsap-card bg-gray-800/10 backdrop-blur-sm p-6 rounded-2xl border border-gray-700/20 hover:border-orange-500/30 transition-all duration-300 hover:bg-gray-800/20 group">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-3 bg-gradient-to-br from-orange-600 to-pink-600 rounded-lg group-hover:scale-110 transition-transform duration-300">
                        <Award size={24} className="text-white" />
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        cert.level === 'Expert' ? 'bg-red-600/30 text-red-300' :
                        cert.level === 'Professional' ? 'bg-orange-600/30 text-orange-300' :
                        cert.level === 'Intermediate' ? 'bg-pink-600/30 text-pink-300' :
                        'bg-green-600/30 text-green-300'
                      }`}>
                        {cert.level}
                      </span>
                    </div>
                    <h4 className="text-lg font-semibold text-white mb-2">{cert.name}</h4>
                    <p className="text-gray-400 text-sm mb-2">{cert.issuer}</p>
                    <p className="text-gray-500 text-sm mb-3">{cert.year}</p>
                  </div>
                </div>

                {/* Skills */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {cert.skills.slice(0, 3).map((skill, idx) => (
                      <span key={idx} className="px-2 py-1 bg-gray-700/30 text-gray-300 rounded-full text-xs">
                        {skill}
                      </span>
                    ))}
                    {cert.skills.length > 3 && (
                      <span className="px-2 py-1 bg-gray-700/30 text-gray-400 rounded-full text-xs">
                        +{cert.skills.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Visit Certificate Button */}
                {cert.hasCredential && (
                  <button
                    onClick={() => window.open(cert.credentialUrl, '_blank')}
                    className="w-full mt-2 px-4 py-2 bg-gradient-to-r from-orange-600 to-pink-600 text-white rounded-lg text-sm font-medium hover:from-orange-700 hover:to-pink-700 transition-all duration-300 flex items-center justify-center gap-2 group"
                  >
                    Visit Certificate
                    <ExternalLink size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;