
import React from 'react';
import { User, Code, Settings, Award, Shield, ExternalLink } from 'lucide-react';
import { useGSAP } from '../hooks/useGSAP';

const About = () => {
  const containerRef = useGSAP();

  const certifications = [
    { 
      name: "Windows Essential: A Hand's-on Workshop", 
      issuer: "Microsoft Learn Student Ambassadors", 
      year: "Sep 2024", 
      level: "Professional",
      skills: ["Windows", "Windows 10", "Microsoft Azure", "Virtualization", "VMware", "VirtualBox"],
      hasCredential: true,
      credentialUrl: "#" // Replace with actual URL when available
    },
    { 
      name: "Networking Basics", 
      issuer: "Cisco", 
      year: "Aug 2024", 
      level: "Professional",
      skills: ["Network Security", "TCP/IP", "IPv4", "IPv6", "Cisco Networking", "OSI Model"],
      hasCredential: true,
      credentialUrl: "#" // Replace with actual URL when available
    },
    { 
      name: "Cyber Security Awareness Programme", 
      issuer: "NIELIT", 
      year: "Jul 2024", 
      level: "Foundation",
      skills: ["Cybersecurity", "Cybersecurity Tools", "Cybersecurity Law", "Phishing", "Information Security"],
      hasCredential: true,
      credentialUrl: "#" // Replace with actual URL when available
    },
    { 
      name: "SQL Basic", 
      issuer: "HackerRank", 
      year: "Jun 2024", 
      level: "Intermediate",
      skills: ["SQL", "Database Management", "Query Optimization"],
      hasCredential: true,
      credentialUrl: "#" // Replace with actual HackerRank URL
    },
    { 
      name: "SQL (Intermediate)", 
      issuer: "HackerRank", 
      year: "Jun 2024", 
      level: "Intermediate",
      skills: ["SQL", "Advanced Queries", "Database Design", "Data Analysis"],
      hasCredential: true,
      credentialId: "5546df6bf89b",
      credentialUrl: "#" // Replace with actual HackerRank URL
    },
    { 
      name: "Hackietainment Advanced Batch", 
      issuer: "Hackietainment", 
      year: "Mar 2023", 
      level: "Expert",
      skills: ["SQL", "Ethical Hacking", "Penetration Testing", "Networking", "Cybersecurity"],
      hasCredential: true,
      credentialId: "ca29e19b-b4e7-46b6-9289-93163b9e260d",
      credentialUrl: "#" // Replace with actual URL
    },
    { 
      name: "Python AI", 
      issuer: "HCL GUVI", 
      year: "Apr 2021", 
      level: "Intermediate",
      skills: ["Artificial Intelligence (AI)", "Python (Programming Language)", "Machine Learning", "Data Science"],
      hasCredential: true,
      credentialId: "ujSA6191668e3931t9",
      credentialUrl: "#" // Replace with actual GUVI URL
    }
  ];

  return (
    <section ref={containerRef} id="about" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="gsap-card absolute -top-40 -right-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="gsap-card absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="gsap-card absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-green-500/5 rounded-full blur-2xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-20">
          <div className="gsap-text inline-block mb-8">
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-green-400 bg-clip-text text-transparent">
              About Me
            </h2>
          </div>
          <div className="gsap-text w-32 h-1.5 bg-gradient-to-r from-purple-500 via-blue-500 to-green-500 mx-auto mb-8 rounded-full"></div>
          <p className="gsap-text text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Passionate DevOps and Web Development Enthusiast crafting innovative solutions
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left Side - Story */}
          <div className="space-y-8">
            <div className="gsap-card bg-gray-800/20 backdrop-blur-sm p-8 rounded-3xl border border-purple-500/20 hover:border-purple-500/40 transition-all duration-500">
              <h3 className="gsap-text text-3xl font-bold text-white mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                My Journey
              </h3>
              <p className="gsap-text text-gray-300 leading-relaxed mb-6">
                I am a passionate and proactive DevOps and Web Development Enthusiast currently pursuing a B.Tech in Computer Science at Symbiosis Institute of Technology, Nagpur. My journey has been driven by curiosity and a relentless pursuit of excellence.
              </p>
              <p className="gsap-text text-gray-300 leading-relaxed">
                With multiple hands-on experiences across technical internships and hackathon organizations, I've built a solid foundation in DevOps, Web Development, Networking, and Cybersecurity. My initiative to contribute both technically and organizationally sets me apart.
              </p>
            </div>
          </div>

          {/* Right Side - Expertise Cards */}
          <div className="space-y-4">
            <div className="gsap-card bg-purple-900/10 backdrop-blur-sm p-4 rounded-xl border border-purple-500/30 hover:border-purple-500/50 transition-all duration-500 hover:shadow-lg hover:shadow-purple-500/20">
              <div className="flex items-center mb-3">
                <div className="p-2 bg-purple-600 rounded-lg mr-3 gsap-button">
                  <Settings size={20} />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white">DevOps Engineering</h4>
                  <p className="text-purple-200 text-xs">Infrastructure & Automation</p>
                </div>
              </div>
              <p className="text-gray-300 mb-2 text-sm">
                Expertise in containerized deployments, CI/CD pipelines, and cloud infrastructure management.
              </p>
              <div className="flex flex-wrap gap-1">
                {['Docker', 'Kubernetes', 'Jenkins', 'Terraform', 'AWS'].map((tech) => (
                  <span key={tech} className="px-2 py-1 bg-purple-600/30 text-purple-200 rounded-full text-xs">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="gsap-card bg-blue-900/10 backdrop-blur-sm p-4 rounded-xl border border-blue-500/30 hover:border-blue-500/50 transition-all duration-500 hover:shadow-lg hover:shadow-blue-500/20">
              <div className="flex items-center mb-3">
                <div className="p-2 bg-blue-600 rounded-lg mr-3 gsap-button">
                  <Code size={20} />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white">Web Development</h4>
                  <p className="text-blue-200 text-xs">Full-Stack Solutions</p>
                </div>
              </div>
              <p className="text-gray-300 mb-2 text-sm">
                Building modern, responsive web applications with cutting-edge technologies.
              </p>
              <div className="flex flex-wrap gap-1">
                {['React.js', 'TypeScript', 'Node.js', 'Tailwind CSS', 'Flask'].map((tech) => (
                  <span key={tech} className="px-2 py-1 bg-blue-600/30 text-blue-200 rounded-full text-xs">
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
                  <h4 className="text-lg font-bold text-white">Cyber Security</h4>
                  <p className="text-red-200 text-xs">Security & Protection</p>
                </div>
              </div>
              <p className="text-gray-300 mb-2 text-sm">
                Implementing security measures and protecting systems from cyber threats.
              </p>
              <div className="flex flex-wrap gap-1">
                {['Network Security', 'Ethical Hacking', 'Penetration Testing', 'Security Audits'].map((skill) => (
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
          <h3 className="gsap-text text-3xl font-bold text-center text-white mb-12 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Licenses & Certifications
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <div key={index} className="gsap-card bg-gray-800/10 backdrop-blur-sm p-6 rounded-2xl border border-gray-700/20 hover:border-purple-500/30 transition-all duration-300 hover:bg-gray-800/20 group">
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
                <p className="text-gray-500 text-sm mb-3">{cert.year}</p>
                
                {cert.credentialId && (
                  <p className="text-xs text-gray-400 mb-3">ID: {cert.credentialId}</p>
                )}
                
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
                    className="w-full mt-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg text-sm font-medium hover:from-purple-700 hover:to-blue-700 transition-all duration-300 flex items-center justify-center gap-2 group"
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
