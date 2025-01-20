'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Github, Linkedin, Mail, Terminal, Code, Globe, BookOpen, Menu, X, ArrowRight, ExternalLink } from 'lucide-react';

interface Skill {
  name: string;
  icon: React.ReactNode;
  description: string;
}

interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
}

const Homepage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Handle scroll for navbar transparency and animations
  useEffect(() => {
    setIsVisible(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  const featuredProjects: Project[] = [
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

  const navItems = ['Home', 'About', 'Projects', 'Contact'];
  const socialLinks = [
    { icon: <Github size={28} />, href: "https://github.com/yourusername", label: "GitHub" },
    { icon: <Linkedin size={28} />, href: "https://linkedin.com/in/yourusername", label: "LinkedIn" },
    { icon: <Mail size={28} />, href: "mailto:your.email@example.com", label: "Email" }
  ];

  const NavLink = ({ item }: { item: string }) => (
    <Link
      href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
      className={`relative py-2 ${
        item === 'Home' ? 'text-blue-400' : 'text-gray-300 hover:text-white'
      } transition-all duration-500 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 after:bg-blue-400 after:transition-all after:duration-500 hover:after:w-full transform hover:scale-105`}
      onClick={() => setIsMenuOpen(false)}
    >
      {item}
    </Link>
  );

  const ProjectCard = ({ project }: { project: Project }) => (
    <div className={`transform transition-all duration-700 opacity-0 translate-y-8 ${isVisible ? 'opacity-100 translate-y-0' : ''}`}>
      <Link 
        href={project.link}
        className="group bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700 hover:border-blue-500/50 transition-all duration-500 hover:shadow-lg hover:shadow-blue-500/10 transform hover:scale-105"
      >
        <div className="relative h-56 overflow-hidden">
          <Image 
            src={project.image} 
            alt={project.title} 
            width={600} 
            height={300} 
            className="w-full h-full object-cover transform transition-all duration-700 group-hover:scale-110 group-hover:rotate-2" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end justify-end p-4">
            <ExternalLink className="text-white transform rotate-45 group-hover:rotate-0 transition-transform duration-500" size={24} />
          </div>
        </div>
        <div className="p-6">
          <h3 className="text-xl font-bold mb-3 group-hover:text-blue-400 transition-colors duration-500">
            {project.title}
          </h3>
          <p className="text-gray-400 mb-6 line-clamp-2 group-hover:text-gray-300 transition-colors duration-500">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag, index) => (
              <span 
                key={index}
                className="px-3 py-1 bg-gray-700/50 text-blue-400 rounded-lg text-sm border border-gray-600 transform transition-all duration-300 hover:scale-105 hover:border-blue-500/50"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </div>
  );

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled ? 'bg-gray-900/90 backdrop-blur-xl shadow-lg' : 'bg-transparent'
      } border-b border-gray-800`}>
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent hover:opacity-80 transition-all duration-500 transform hover:scale-105">
              Portfolio.
            </Link>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <NavLink key={item} item={item} />
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 hover:bg-gray-800 rounded-lg transition-all duration-300 transform hover:scale-105"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} className="animate-spin-once" /> : <Menu size={24} className="animate-pulse" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden absolute top-full left-0 right-0 bg-gray-900/90 backdrop-blur-xl border-b border-gray-800 py-4 animate-slideDown">
              <div className="flex flex-col space-y-4 px-6">
                {navItems.map((item) => (
                  <NavLink key={item} item={item} />
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          <div className={`flex flex-col lg:flex-row items-center justify-between gap-16 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <div className="lg:w-1/2 text-center lg:text-left">
              <div className="mb-6 inline-block animate-bounce">
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold mb-8">
                <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-purple-500 bg-clip-text text-transparent inline-block transform hover:scale-105 transition-transform duration-500">
                  I&apos;m Alfira.
                </span>
                <br />
                <span className="mt-4 block text-4xl lg:text-6xl transform hover:translate-x-2 transition-transform duration-500">
                  Frontend Developer
                </span>
              </h1>
              <p className="text-xl text-gray-300 mb-12 max-w-2xl leading-relaxed transform hover:translate-x-2 transition-transform duration-500">
                Passionate about creating beautiful and functional web applications
                with modern technologies. Specializing in React, Next.js, and responsive design.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
                <Link 
                  href="/projects" 
                  className="group bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 px-8 py-4 rounded-xl font-medium transition-all duration-500 text-lg inline-flex items-center gap-2 hover:shadow-lg hover:shadow-blue-500/20 transform hover:scale-105"
                >
                  View Projects
                  <ArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
                <Link 
                  href="/contact" 
                  className="group border-2 border-blue-500 hover:bg-blue-500/10 px-8 py-4 rounded-xl font-medium transition-all duration-500 text-lg flex items-center gap-2 transform hover:scale-105"
                >
                  Contact Me
                  <Mail className="group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
            </div>
            <div className="lg:w-1/2">
              <div className="relative">
                <div className="w-80 h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-blue-500/30 mx-auto relative group transform hover:rotate-6 transition-all duration-700">
                  <div className="absolute inset-0 bg-gradient-to-b from-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <Image 
                    src="/images/profile.jpg" 
                    alt="Alfira" 
                    width={500} 
                    height={500} 
                    className="w-full h-full object-cover transform transition-all duration-700 group-hover:scale-110" 
                    priority 
                  />
                </div>
                <div className="absolute -z-10 inset-0 blur-3xl bg-blue-500/20 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-24 bg-gray-800/30 backdrop-blur-sm border-t border-b border-gray-800">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-4 transform hover:scale-105 transition-transform duration-500">
            My Expertise
          </h2>
          <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
            Leveraging modern technologies and best practices to create exceptional digital experiences.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {skills.map((skill, index) => (
              <div 
                key={index}
                className={`group bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700 hover:border-blue-500/50 transition-all duration-500 hover:shadow-lg hover:shadow-blue-500/10 transform hover:scale-105 opacity-0 translate-y-8 ${
                  isVisible ? 'animate-fadeInUp opacity-100 translate-y-0' : ''
                }`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="text-blue-400 mb-6 transform group-hover:scale-110 transition-transform duration-500">
                  {skill.icon}
                </div>
                <h3 className="text-xl font-bold mb-4 group-hover:text-blue-400 transition-colors duration-500">
                  {skill.name}
                </h3>
                <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-500">
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
          <h2 className="text-4xl font-bold text-center mb-4 transform hover:scale-105 transition-transform duration-500">
            Featured Projects
          </h2>
          <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
            A selection of my recent work showcasing my expertise in web development.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project, index) => (
              <ProjectCard key={index} project={project} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link 
              href="/projects"
              className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors duration-500 transform hover:scale-105 group"
            >
              View All Projects
              <ArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-gray-800/30 backdrop-blur-sm border-t border-gray-800">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4 transform hover:scale-105 transition-transform duration-500">
            Get In Touch
          </h2>
          <p className="text-gray-400 mb-12 max-w-2xl mx-auto">
            Feel free to reach out for collaborations or just a friendly hello!
          </p>
          <div className="flex justify-center gap-8">
            {socialLinks.map((social, index) => (
              <Link
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-2 transform hover:scale-105 transition-all duration-500"
              >
                <span className="p-4 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 
                               group-hover:border-blue-500/50 text-gray-400 group-hover:text-blue-400 
                               transition-all duration-500 transform group-hover:rotate-6">
                  {social.icon}
                </span>
                <span className="text-sm text-gray-400 group-hover:text-blue-400 transition-colors duration-300">
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
          <div className="flex flex-col items-center gap-4">
            <Link 
              href="/" 
              className="text-xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 
                         bg-clip-text text-transparent hover:opacity-80 transition-all 
                         duration-500 transform hover:scale-105"
            >
              Portfolio.
            </Link>
            <div className="flex gap-6">
              {navItems.map((item) => (
                <Link
                  key={item}
                  href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                  className="text-gray-400 hover:text-blue-400 transition-colors duration-300 
                             transform hover:scale-105"
                >
                  {item}
                </Link>
              ))}
            </div>
            <div className="w-24 h-px bg-gray-700 my-6 transform hover:scale-x-150 transition-transform duration-500"></div>
            <p className="text-sm transform hover:translate-y-1 transition-transform duration-300">
              &copy; {new Date().getFullYear()} Alfira. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default Homepage;