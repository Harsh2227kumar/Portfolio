
import React from 'react';
import { Github, Star } from 'lucide-react';
import { useGSAP } from '../hooks/useGSAP';

const Projects = () => {
  const containerRef = useGSAP();

  const projects = [
    {
      title: "Incident Management System",
      description: "A comprehensive ticket tracking system with role-based access, email notifications, and workflow automation built for ELEVATE LABS.",
      tech: ["Flask", "Docker", "SQLite", "SMTP", "Bootstrap"],
      github: "https://github.com/username/Incident-Management-Public",
      features: ["Role-based access control", "Ticket lifecycle tracking", "Email notifications", "User authentication"],
      color: "purple"
    },
    {
      title: "Hack4Maha Website",
      description: "Frontend development for a major hackathon event, focusing on user experience and responsive design.",
      tech: ["React.js", "Tailwind CSS", "JavaScript", "Git"],
      github: "#",
      features: ["Responsive design", "Event management", "User registration", "Modern UI/UX"],
      color: "blue"
    },
    {
      title: "CodeHunt Platform",
      description: "Modular web components and interfaces for a coding competition platform with team collaboration features.",
      tech: ["React.js", "Tailwind CSS", "Git", "JavaScript"],
      github: "#",
      features: ["Team collaboration", "Responsive components", "Version control workflow", "Modern architecture"],
      color: "green"
    }
    
    // Future Projects - Uncomment when ready to add more projects
    /*
    ,{
      title: "E-Commerce Dashboard",
      description: "A comprehensive admin dashboard for managing online store operations with real-time analytics and inventory management.",
      tech: ["React.js", "Node.js", "MongoDB", "Express.js", "Chart.js"],
      github: "#",
      features: ["Real-time analytics", "Inventory management", "Order tracking", "Customer management"],
      color: "orange"
    },
    {
      title: "Task Management App",
      description: "A collaborative task management application with team features, deadline tracking, and progress visualization.",
      tech: ["Vue.js", "Firebase", "Vuex", "TypeScript", "PWA"],
      github: "#",
      features: ["Team collaboration", "Deadline tracking", "Progress visualization", "Offline support"],
      color: "indigo"
    },
    {
      title: "Weather Forecast App",
      description: "A modern weather application with location-based forecasts, interactive maps, and weather alerts.",
      tech: ["React Native", "Weather API", "Redux", "Maps SDK", "Push Notifications"],
      github: "#",
      features: ["Location-based forecasts", "Interactive maps", "Weather alerts", "Cross-platform"],
      color: "cyan"
    },
    {
      title: "Social Media Analytics",
      description: "A comprehensive analytics platform for social media management with engagement tracking and content scheduling.",
      tech: ["Angular", "D3.js", "Python", "Django", "PostgreSQL"],
      github: "#",
      features: ["Engagement tracking", "Content scheduling", "Analytics dashboard", "Multi-platform support"],
      color: "pink"
    },
    {
      title: "Learning Management System",
      description: "An educational platform with course management, progress tracking, and interactive learning modules.",
      tech: ["Next.js", "Prisma", "PostgreSQL", "Stripe", "WebRTC"],
      github: "#",
      features: ["Course management", "Progress tracking", "Video streaming", "Payment integration"],
      color: "teal"
    },
    {
      title: "IoT Device Monitor",
      description: "A real-time monitoring system for IoT devices with data visualization and alert management.",
      tech: ["React.js", "MQTT", "InfluxDB", "Grafana", "Docker"],
      github: "#",
      features: ["Real-time monitoring", "Data visualization", "Alert management", "Device control"],
      color: "amber"
    }
    */
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      purple: "from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 border-purple-500/20 hover:border-purple-500/50",
      blue: "from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 border-blue-500/20 hover:border-blue-500/50",
      green: "from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 border-green-500/20 hover:border-green-500/50"
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <section ref={containerRef} id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="gsap-text text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Key Projects
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto"></div>
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
                  <h4 className="text-sm font-semibold text-purple-400 mb-2">Key Features:</h4>
                  <ul className="space-y-1">
                    {project.features.map((feature, i) => (
                      <li key={i} className="text-gray-300 text-sm flex items-start">
                        <span className="text-purple-400 mr-2">•</span>
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
                        className="px-3 py-1 bg-gray-700 text-purple-400 rounded-full text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-4">
                  <a
                    href={project.github}
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
