import React, { useState } from 'react';
import { Mail, Linkedin, Github, User, Send, MapPin, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useGSAP } from '../hooks/useGSAP';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const containerRef = useGSAP();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('Form submitted:', formData);
    setFormData({ name: '', email: '', message: '' });
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactMethods = [
    {
      icon: Mail,
      title: "Email",
      value: "harsh2227official@gmail.com",
      link: "mailto:harsh2227official@gmail.com",
      color: "from-orange-500 to-red-500",
      bgColor: "bg-orange-600",
      hoverColor: "hover:bg-orange-700"
    },
    {
      icon: Linkedin,
      title: "LinkedIn",
      value: "linkedin.com/in/harshkumar", // Placeholder: Please update with actual LinkedIn URL
      link: "#", // Placeholder
      color: "from-pink-500 to-red-500",
      bgColor: "bg-pink-600",
      hoverColor: "hover:bg-pink-700"
    },
    {
      icon: Github,
      title: "GitHub",
      value: "github.com/harsh2227kumar",
      link: "https://github.com/harsh2227kumar",
      color: "from-gray-500 to-gray-700",
      bgColor: "bg-gray-600",
      hoverColor: "hover:bg-gray-700"
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+91 94056 77894",
      link: "tel:+919405677894",
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-600",
      hoverColor: "hover:bg-green-700"
    }
  ];

  return (
    <section ref={containerRef} id="contact" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">

      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="gsap-text inline-block">
            <h2 className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-orange-400 via-pink-400 to-yellow-400 bg-clip-text text-transparent">
              Get In Touch
            </h2>
          </div>
          <div className="gsap-text w-32 h-1.5 bg-gradient-to-r from-orange-500 via-pink-500 to-yellow-500 mx-auto mb-8 rounded-full"></div>
          <p className="gsap-text text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Ready to bring your ideas to life? Let's collaborate and create something amazing together.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Contact Methods - Left Side */}
          <div className="lg:col-span-2 space-y-8">
            <div className="gsap-text">
              <h3 className="text-3xl font-bold text-white mb-6 bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">
                Let's Connect
              </h3>
              <p className="text-gray-300 leading-relaxed text-lg mb-8">
                I'm always excited to discuss new opportunities, innovative projects, or just chat about the latest in technology and development.
              </p>
            </div>

            {/* Contact Cards */}
            <div className="space-y-4">
              {contactMethods.map((method, index) => (
                <a
                  key={index}
                  href={method.link}
                  target={method.link.startsWith('http') ? '_blank' : '_self'}
                  rel={method.link.startsWith('http') ? 'noopener noreferrer' : ''}
                  className="gsap-card group block"
                >
                  <div className="relative p-6 bg-gray-800/40 backdrop-blur-sm rounded-2xl border border-gray-700/50 hover:border-gray-600 transition-all duration-500 hover:shadow-2xl hover:shadow-orange-500/20 hover:bg-gray-800/60">
                    <div className="flex items-center space-x-5">
                      <div className={`p-4 ${method.bgColor} ${method.hoverColor} rounded-xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                        <method.icon size={28} className="text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-white text-lg mb-1 group-hover:text-orange-300 transition-colors">
                          {method.title}
                        </h4>
                        <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                          {method.value}
                        </p>
                      </div>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full flex items-center justify-center">
                          <Send size={16} className="text-white" />
                        </div>
                      </div>
                    </div>
                    {/* Gradient border effect */}
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${method.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500 -z-10`}></div>
                  </div>
                </a>
              ))}
            </div>

            {/* Location Card */}
            <div className="gsap-card bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-sm p-6 rounded-2xl border border-gray-700/50">
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 bg-gradient-to-r from-orange-600 to-pink-600 rounded-lg">
                  <MapPin size={24} className="text-white" />
                </div>
                <h4 className="text-xl font-semibold text-white">Location</h4>
              </div>
              <p className="text-gray-300">
                Nagpur, Maharashtra, India
              </p>
              <p className="text-gray-400 text-sm mt-2">
                Open to remote work & relocation
              </p>
            </div>
          </div>

          {/* Contact Form - Right Side */}
          <div className="lg:col-span-3">
            <div className="gsap-card bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm p-8 lg:p-10 rounded-3xl border border-gray-700/50 shadow-2xl">
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-white mb-3">Send Message</h3>
                <p className="text-gray-400">Fill out the form below and I'll get back to you as soon as possible.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-white font-medium">
                      Full Name *
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Your full name"
                      className="bg-gray-900/50 border-gray-600 text-white placeholder:text-gray-500 focus:border-orange-500 focus:ring-orange-500/20 h-12 rounded-xl transition-all duration-300"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white font-medium">
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="your.email@example.com"
                      className="bg-gray-900/50 border-gray-600 text-white placeholder:text-gray-500 focus:border-orange-500 focus:ring-orange-500/20 h-12 rounded-xl transition-all duration-300"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-white font-medium">
                    Message *
                  </Label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Tell me about your project, ideas, or just say hello..."
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-xl text-white placeholder:text-gray-500 focus:border-orange-500 focus:ring-orange-500/20 focus:outline-none transition-all duration-300 resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="gsap-button w-full h-14 bg-gradient-to-r from-orange-600 via-pink-600 to-green-600 hover:from-orange-700 hover:via-pink-700 hover:to-green-700 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Sending...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Send size={20} />
                      <span>Send Message</span>
                    </div>
                  )}
                </Button>
              </form>

              <div className="mt-8 p-4 bg-orange-500/10 border border-orange-500/20 rounded-xl">
                <p className="text-orange-300 text-sm">
                  💡 <strong>Quick tip:</strong> Include details about your project timeline and budget for faster response!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;