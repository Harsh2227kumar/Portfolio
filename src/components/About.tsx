
import React from 'react';
import { User, Code, Settings } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-800/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            About Me
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white mb-4">Professional Summary</h3>
            <p className="text-gray-300 leading-relaxed">
              I am a passionate and proactive DevOps and Web Development Enthusiast currently pursuing a B.Tech in Computer Science at Symbiosis Institute of Technology, Nagpur. With multiple hands-on experiences across technical internships and hackathon organizations, I've built a solid foundation in DevOps, Web Development, Networking, and Cybersecurity.
            </p>
            <p className="text-gray-300 leading-relaxed">
              My initiative to contribute both technically and organizationally at an early stage of my career is commendable, with experience in containerized deployments, CI/CD pipelines, and modern web development frameworks.
            </p>
          </div>

          <div className="grid gap-6">
            <div className="bg-gray-700/50 p-6 rounded-lg border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 hover:scale-105">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-purple-600 rounded-lg mr-4">
                  <Settings size={24} />
                </div>
                <h4 className="text-xl font-semibold">DevOps Engineering</h4>
              </div>
              <p className="text-gray-300">
                Docker, Kubernetes, Jenkins, Terraform, CI/CD Pipelines
              </p>
            </div>

            <div className="bg-gray-700/50 p-6 rounded-lg border border-blue-500/20 hover:border-blue-500/50 transition-all duration-300 hover:scale-105">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-blue-600 rounded-lg mr-4">
                  <Code size={24} />
                </div>
                <h4 className="text-xl font-semibold">Web Development</h4>
              </div>
              <p className="text-gray-300">
                React.js, Flask, HTML5, CSS3, JavaScript, Tailwind CSS
              </p>
            </div>

            <div className="bg-gray-700/50 p-6 rounded-lg border border-green-500/20 hover:border-green-500/50 transition-all duration-300 hover:scale-105">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-green-600 rounded-lg mr-4">
                  <User size={24} />
                </div>
                <h4 className="text-xl font-semibold">Leadership</h4>
              </div>
              <p className="text-gray-300">
                Hackathon Organization, Team Leadership, Documentation
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
