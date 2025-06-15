
import React from 'react';
import { User, Code, Settings, Award, Shield } from 'lucide-react';
import { useGSAP } from '../hooks/useGSAP';

const About = () => {
  const containerRef = useGSAP();

  const certifications = [
    { name: "AWS Cloud Practitioner", issuer: "Amazon Web Services", year: "2024", level: "Professional" },
    { name: "Docker Certified Associate", issuer: "Docker Inc.", year: "2024", level: "Professional" },
    { name: "Kubernetes Administrator", issuer: "Cloud Native Computing Foundation", year: "2023", level: "Expert" },
    { name: "React Development", issuer: "Meta", year: "2023", level: "Intermediate" },
    { name: "DevOps Foundation", issuer: "DevOps Institute", year: "2023", level: "Foundation" },
    { name: "Python Programming", issuer: "Python Institute", year: "2022", level: "Intermediate" }
  ];

  return (
    <section ref={containerRef} id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 via-purple-900/20 to-blue-900/20 relative overflow-hidden">
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
            <div className="gsap-card bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm p-8 rounded-3xl border border-purple-500/20 hover:border-purple-500/40 transition-all duration-500">
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
          <div className="space-y-6">
            <div className="gsap-card bg-gradient-to-br from-purple-900/30 to-purple-800/30 backdrop-blur-sm p-6 rounded-2xl border border-purple-500/30 hover:border-purple-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/20">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-purple-600 rounded-xl mr-4 gsap-button">
                  <Settings size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white">DevOps Engineering</h4>
                  <p className="text-purple-200 text-sm">Infrastructure & Automation</p>
                </div>
              </div>
              <p className="text-gray-300 mb-3 text-sm">
                Expertise in containerized deployments, CI/CD pipelines, and cloud infrastructure management.
              </p>
              <div className="flex flex-wrap gap-2">
                {['Docker', 'Kubernetes', 'Jenkins', 'Terraform', 'AWS'].map((tech) => (
                  <span key={tech} className="px-2 py-1 bg-purple-600/30 text-purple-200 rounded-full text-xs">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="gsap-card bg-gradient-to-br from-blue-900/30 to-blue-800/30 backdrop-blur-sm p-6 rounded-2xl border border-blue-500/30 hover:border-blue-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/20">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-blue-600 rounded-xl mr-4 gsap-button">
                  <Code size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white">Web Development</h4>
                  <p className="text-blue-200 text-sm">Full-Stack Solutions</p>
                </div>
              </div>
              <p className="text-gray-300 mb-3 text-sm">
                Building modern, responsive web applications with cutting-edge technologies.
              </p>
              <div className="flex flex-wrap gap-2">
                {['React.js', 'TypeScript', 'Node.js', 'Tailwind CSS', 'Flask'].map((tech) => (
                  <span key={tech} className="px-2 py-1 bg-blue-600/30 text-blue-200 rounded-full text-xs">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="gsap-card bg-gradient-to-br from-red-900/30 to-red-800/30 backdrop-blur-sm p-6 rounded-2xl border border-red-500/30 hover:border-red-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-red-500/20">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-red-600 rounded-xl mr-4 gsap-button">
                  <Shield size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white">Cyber Security</h4>
                  <p className="text-red-200 text-sm">Security & Protection</p>
                </div>
              </div>
              <p className="text-gray-300 mb-3 text-sm">
                Implementing security measures and protecting systems from cyber threats.
              </p>
              <div className="flex flex-wrap gap-2">
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
            <h4 className="text-2xl font-bold text-white mb-4">
              Ready to collaborate?
            </h4>
            <p className="text-gray-300 mb-6 max-w-md">
              Let's build something amazing together with cutting-edge technology and innovative solutions.
            </p>
            <a
              href="#contact"
              className="gsap-button inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-full text-white font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25"
            >
              Let's Connect
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
