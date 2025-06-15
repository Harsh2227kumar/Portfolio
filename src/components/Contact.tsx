import React, { useState } from 'react';
import { Mail, Linkedin, Github, User } from 'lucide-react';
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
  const containerRef = useGSAP();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section ref={containerRef} id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-800/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="gsap-text text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Get In Touch
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto"></div>
          <p className="gsap-text text-gray-300 mt-6 text-lg">
            Let's discuss opportunities and collaborations
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="gsap-text text-2xl font-bold text-white mb-6">Let's Connect</h3>
              <p className="gsap-text text-gray-300 leading-relaxed mb-8">
                I'm always interested in new opportunities, whether that's a full-time role, 
                freelance project, or just to chat about technology and development.
              </p>
            </div>

            <div className="space-y-6">
              <div className="gsap-card flex items-center space-x-4 p-4 bg-gray-700/50 rounded-lg border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300">
                <div className="p-3 bg-purple-600 rounded-lg">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-white">Email</h4>
                  <p className="text-gray-300">your.email@example.com</p>
                </div>
              </div>

              <div className="gsap-card flex items-center space-x-4 p-4 bg-gray-700/50 rounded-lg border border-blue-500/20 hover:border-blue-500/50 transition-all duration-300">
                <div className="p-3 bg-blue-600 rounded-lg">
                  <Linkedin size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-white">LinkedIn</h4>
                  <p className="text-gray-300">linkedin.com/in/yourprofile</p>
                </div>
              </div>

              <div className="gsap-card flex items-center space-x-4 p-4 bg-gray-700/50 rounded-lg border border-green-500/20 hover:border-green-500/50 transition-all duration-300">
                <div className="p-3 bg-green-600 rounded-lg">
                  <Github size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-white">GitHub</h4>
                  <p className="text-gray-300">github.com/yourusername</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="gsap-card bg-gray-700/50 p-8 rounded-lg border border-gray-600">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name" className="text-white">Name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="mt-2 bg-gray-800 border-gray-600 text-white focus:border-purple-500"
                />
              </div>

              <div>
                <Label htmlFor="email" className="text-white">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="mt-2 bg-gray-800 border-gray-600 text-white focus:border-purple-500"
                />
              </div>

              <div>
                <Label htmlFor="message" className="text-white">Message</Label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="mt-2 w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white focus:border-purple-500 focus:outline-none"
                  placeholder="Tell me about your project or opportunity..."
                />
              </div>

              <Button
                type="submit"
                className="gsap-button w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
              >
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
