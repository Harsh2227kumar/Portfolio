import React from 'react';
import { Github, Star } from 'lucide-react';
import { useGSAP } from '../hooks/useGSAP';

const Projects = () => {
  const containerRef = useGSAP();

  const projects = [
    {
      title: "Multi-Cloud Auto Deployment (GCP + DigitalOcean)",
      description: "Deployed scalable NGINX web servers across Google Cloud Platform (GCP) and DigitalOcean using Terraform, ensuring consistent and automated multi-cloud infrastructure provisioning.",
      tech: ["Terraform", "GCP", "DigitalOcean", "NGINX", "Bash/Shell", "SSH"],
      github: "https://github.com/Harsh2227kumar/Multi-Cloud-Deployment-Terraform/", // Placeholder: GitHub URL not provided
      features: [
        "Provisioned and configured Ubuntu VMs on GCP and DigitalOcean using modular Terraform configuration.",
        "Automated NGINX installation and custom web content deployment using a single, idempotent setup script.",
        "Connected via SSH using Terraform's `connection` block and `remote-exec` for secure server initialization.",
        "Implemented Infrastructure as Code (IaC) best practices for secure and repeatable deployments."
      ],
      color: "orange-pink"
    },
    {
      title: "Incident Management System",
      description: "A comprehensive ticket tracking system with role-based access, email notifications, and workflow automation built for ELEVATE LABS.",
      tech: ["Flask", "Docker", "SQLite", "SMTP", "Bootstrap"],
      github: "https://github.com/harsh2227kumar/Incident-Management-Public",
      features: ["Role-based access control", "Ticket lifecycle tracking", "Email notifications", "User authentication"],
      color: "orange" // Mapped from original 'purple'
    },
    {
      title: "Hack4Maha Website",
      description: "Frontend development for a major hackathon event, focusing on user experience and responsive design.",
      tech: ["React.js", "Tailwind CSS", "JavaScript", "Git"],
      github: "https://hack4maha.live/",
      features: ["Responsive design", "Event management", "User registration", "Modern UI/UX"],
      color: "pink" // Mapped from original 'blue'
    }
    
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      "orange-pink": "from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 border-orange-500/20 hover:border-orange-500/50",
      "orange": "from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 border-orange-500/20 hover:border-orange-500/50",
      "pink": "from-pink-500 to-red-400 hover:from-pink-600 hover:to-red-500 border-pink-500/20 hover:border-pink-500/50",
      "yellow-orange": "from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 border-yellow-500/20 hover:border-yellow-500/50"
    };
    return colors[color as keyof typeof colors] || colors["orange-pink"];
  };

  return (
    <section ref={containerRef} id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="gsap-text text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">
            Key Projects
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-pink-500 mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className={`gsap-project-card gsap-card bg-gray-800/50 rounded-lg border ${getColorClasses(project.color)} transition-all duration-300 group`}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white">{project.title}</h3>
                  <Star className="text-yellow-400" size={20} />
                </div>

                <p className="text-gray-300 mb-4 leading-relaxed">
                  {project.description}
                </p>

                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-orange-400 mb-2">Key Features:</h4>
                  <ul className="space-y-1">
                    {project.features.map((feature, i) => (
                      <li key={i} className="text-gray-300 text-sm flex items-start">
                        <span className="text-orange-400 mr-2">•</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-gray-700 text-orange-400 rounded-full text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-4">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center px-4 py-2 bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 rounded-lg transition-all duration-300 hover:scale-105"
                  >
                    <Github size={16} className="mr-2" />
                    <span className="text-sm">View Code</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;