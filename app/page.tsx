'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Github, Linkedin, Mail, Terminal, Code, Globe, BookOpen, Menu, X, ArrowRight, ExternalLink } from 'lucide-react';

interface Skill {
  name: string;
  icon: React.ReactNode;
  description: string;
}

const Homepage: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const skills: Skill[] = [
    { 
      name: 'Frontend Development', 
      icon: <Code size={24} />,
      description: 'Building responsive and interactive user interfaces with React, Next.js, and modern CSS frameworks.'
    },
    { 
      name: 'Backend Development', 
      icon: <Terminal size={24} />,
      description: 'Creating robust server-side applications using Node.js, Express, and various databases.'
    },
    { 
      name: 'Web Design', 
      icon: <Globe size={24} />,
      description: 'Crafting beautiful and intuitive user experiences with a focus on accessibility and modern design principles.'
    },
    { 
      name: 'Technical Writing', 
      icon: <BookOpen size={24} />,
      description: 'Documenting complex technical concepts and creating comprehensive guides for developers.'
    }
  ];

  const featuredProjects = [
    {
      title: "E-Commerce Platform",
      description: "A full-featured online shopping platform with real-time inventory management and secure payment processing.",
      image: "/api/placeholder/600/300",
      tags: ["Next.js", "Node.js", "MongoDB"],
      link: "/projects/1"
    },
    {
      title: "Task Management App",
      description: "Collaborative project management tool with real-time updates and team communication features.",
      image: "/api/placeholder/600/300",
      tags: ["React", "Firebase", "Tailwind"],
      link: "/projects/2"
    },
    {
      title: "Portfolio Website",
      description: "Modern and responsive portfolio website showcasing projects and skills with dynamic content management.",
      image: "/api/placeholder/600/300",
      tags: ["Next.js", "Tailwind", "Framer"],
      link: "/projects/3"
    }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Navigation */}
      <nav className="fixed w-full bg-gray-900/90 backdrop-blur-lg border-b border-gray-800 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              Portfolio.
            </Link>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              {['Home', 'About', 'Projects', 'Contact'].map((item) => (
                <Link
                  key={item}
                  href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                  className={`relative py-2 ${
                    item === 'Home' ? 'text-blue-400' : 'text-gray-300 hover:text-white'
                  } transition-colors duration-300 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 after:bg-blue-400 after:transition-all hover:after:w-full`}
                >
                  {item}
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 hover:bg-gray-800 rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden absolute top-full left-0 right-0 bg-gray-900/90 backdrop-blur-lg border-b border-gray-800 py-4">
              <div className="flex flex-col space-y-4 px-6">
                {['Home', 'About', 'Projects', 'Contact'].map((item) => (
                  <Link
                    key={item}
                    href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                    className={`${
                      item === 'Home' ? 'text-blue-400' : 'text-gray-300 hover:text-white'
                    } transition-colors duration-300`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
            <div className="lg:w-1/2 text-center lg:text-left">
              <div className="mb-6 inline-block">
                <span className="px-4 py-2 bg-blue-500/10 text-blue-400 rounded-full text-sm">
                  Available for hire
                </span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold mb-8">
                <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                I&apos;m Alfira.
                </span>
                <br />
                <span className="mt-4 block text-4xl lg:text-6xl">
                  Frontend Developer
                </span>
              </h1>
              <p className="text-xl text-gray-300 mb-12 max-w-2xl leading-relaxed">
                Passionate about creating beautiful and functional web applications
                with modern technologies. Specializing in React, Next.js, and responsive design.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
                <Link 
                  href="/projects" 
                  className="group bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 px-8 py-4 rounded-xl font-medium transition-all duration-300 text-lg inline-flex items-center gap-2"
                >
                  View Projects
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link 
                  href="/contact" 
                  className="group border-2 border-blue-500 hover:bg-blue-500/10 px-8 py-4 rounded-xl font-medium transition-all duration-300 text-lg flex items-center gap-2"
                >
                  Contact Me
                  <Mail className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
            <div className="lg:w-1/2">
              <div className="relative">
                <div className="w-80 h-80 lg:w-[500px] lg:h-[500px] rounded-full overflow-hidden border-4 border-blue-500/30 mx-auto relative group">
                  <div className="absolute inset-0 bg-gradient-to-b from-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <Image 
  src="/images/profile.jpg" 
  alt="Alfira" 
  width={500} 
  height={500} 
  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" 
/>
                </div>
                <div className="absolute -z-10 inset-0 blur-3xl bg-blue-500/20 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-24 bg-gray-800/30 backdrop-blur-sm border-t border-b border-gray-800">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-4">
            My Expertise
          </h2>
          <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
            Leveraging modern technologies and best practices to create exceptional digital experiences.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skills.map((skill, index) => (
  <div 
    key={index}
    className="group bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10"
  >
    <div className="text-blue-400 mb-6 transform group-hover:scale-110 transition-transform duration-300">
      {skill.icon}
    </div>
    <h3 className="text-xl font-bold mb-4 group-hover:text-blue-400 transition-colors">
      {skill.name}
    </h3>
    <p className="text-gray-400 leading-relaxed">
      {skill.description}
    </p>
  </div>

            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-4">
            Featured Projects
          </h2>
          <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
            A selection of my recent work showcasing my expertise in web development.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project, index) => (
              <Link 
                href={project.link}
                key={index}
                className="group bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10"
              >
                <div className="relative h-56 overflow-hidden">
                  <Image 
  src={project.image} 
  alt={project.title} 
  width={600} 
  height={300} 
  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" 
/>
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-end p-4">
                    <ExternalLink className="text-white" size={24} />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 mb-6 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, tagIndex) => (
                      <span 
                        key={tagIndex}
                        className="px-3 py-1 bg-gray-700/50 text-blue-400 rounded-lg text-sm border border-gray-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link 
              href="/projects"
              className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
            >
              View All Projects
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-gray-800/30 backdrop-blur-sm border-t border-gray-800">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">Get In Touch</h2>
          <p className="text-gray-400 mb-12 max-w-2xl mx-auto">
            Feel free to reach out for collaborations or just a friendly hello!
          </p>
          <div className="flex justify-center gap-8">
            {[
              { icon: <Github size={28} />, href: "https://github.com/yourusername", label: "GitHub" },
              { icon: <Linkedin size={28} />, href: "https://linkedin.com/in/yourusername", label: "LinkedIn" },
              { icon: <Mail size={28} />, href: "mailto:your.email@example.com", label: "Email" }
            ].map((social, index) => (
              <Link
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-2"
              >
                <span className="p-4 bg-gray-800/50 rounded-xl border border-gray-700 group-hover:border-blue-500/50 text-gray-400 group-hover:text-blue-400 transition-all duration-300">
                  {social.icon}
                </span>
                <span className="text-sm text-gray-400 group-hover:text-blue-400 transition-colors">
                  {social.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 text-center text-gray-400 border-t border-gray-800">
        <div className="container mx-auto px-6">
          <p className="text-lg">&copy; 2025 Alfira. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
};

export default Homepage;