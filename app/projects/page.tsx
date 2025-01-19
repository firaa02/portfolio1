'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Github, ExternalLink, Search, Code, Layout, Database, Smartphone, Globe, Menu, X } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  category: string;
  githubUrl?: string;
  liveUrl?: string;
}

const ProjectsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const categories = [
    { id: 'all', label: 'All Projects', icon: Layout },
    { id: 'web', label: 'Web Apps', icon: Globe },
    { id: 'mobile', label: 'Mobile Apps', icon: Smartphone },
    { id: 'backend', label: 'Backend', icon: Database },
  ];

  const projects: Project[] = [
    {
      id: 1,
      title: "Personal Portfolio Website",
      description: "A modern portfolio website built with Next.js and Tailwind CSS. Features dynamic routing, responsive design, and smooth animations.",
      image: "/api/placeholder/800/600",
      tags: ["Next.js", "React", "Tailwind CSS"],
      category: "web",
      githubUrl: "https://github.com/yourusername/portfolio",
      liveUrl: "https://your-portfolio.com"
    },
    {
      id: 2,
      title: "E-Commerce Dashboard",
      description: "Admin dashboard for managing e-commerce platform. Includes inventory management, order tracking, and analytics.",
      image: "/api/placeholder/800/600",
      tags: ["React", "Node.js", "MongoDB"],
      category: "web",
      githubUrl: "https://github.com/yourusername/ecommerce"
    },
    {
      id: 3,
      title: "Weather Mobile App",
      description: "Cross-platform mobile app that provides real-time weather information and forecasts using OpenWeather API.",
      image: "/api/placeholder/800/600",
      tags: ["React Native", "APIs", "Mobile"],
      category: "mobile",
      githubUrl: "https://github.com/yourusername/weather-app"
    },
    {
      id: 4,
      title: "REST API Service",
      description: "Backend service providing RESTful APIs for a social media platform. Includes authentication, post management, and user profiles.",
      image: "/api/placeholder/800/600",
      tags: ["Node.js", "Express", "MongoDB"],
      category: "backend",
      githubUrl: "https://github.com/yourusername/api-service"
    }
  ];

  const filteredProjects = projects.filter(project => {
    const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

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
                    item === 'Projects' ? 'text-blue-400' : 'text-gray-300 hover:text-white'
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
                      item === 'Projects' ? 'text-blue-400' : 'text-gray-300 hover:text-white'
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

      {/* Projects Header */}
      <section className="pt-32 pb-12">
        <div className="container mx-auto px-6">
          <h1 className="text-5xl lg:text-6xl font-bold text-center mb-8 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
            My Projects
          </h1>
          <p className="text-xl text-gray-300 text-center max-w-3xl mx-auto leading-relaxed">
            A collection of my latest projects, showcasing my skills in web development, 
            mobile apps, and backend services.
          </p>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-8 items-center justify-between">
            {/* Search Bar */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-800/50 backdrop-blur-sm rounded-2xl pl-12 pr-4 py-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all border border-gray-700 hover:border-gray-600"
              />
            </div>
            
            {/* Category Filters */}
            <div className="flex flex-wrap gap-4 justify-center">
              {categories.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setSelectedCategory(id)}
                  className={`flex items-center gap-3 px-6 py-4 rounded-xl transition-all
                    ${selectedCategory === id 
                      ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25' 
                      : 'bg-gray-800/50 backdrop-blur-sm text-gray-300 hover:bg-gray-700/50 border border-gray-700 hover:border-gray-600'}`}
                >
                  <Icon size={20} />
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div 
                key={project.id} 
                className="group relative bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700 hover:border-gray-600 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10"
              >
                {/* Project Image */}
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  {/* Overlay with Links */}
                  <div className="absolute inset-0 bg-gray-900/80 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="absolute inset-0 flex items-center justify-center gap-6">
                      {project.githubUrl && (
                        <a 
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-4 bg-gray-800/80 rounded-full hover:bg-gray-700 transition-colors transform hover:scale-110 duration-300"
                        >
                          <Github size={24} />
                        </a>
                      )}
                      {project.liveUrl && (
                        <a 
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-4 bg-gray-800/80 rounded-full hover:bg-gray-700 transition-colors transform hover:scale-110 duration-300"
                        >
                          <ExternalLink size={24} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Project Info */}
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                    {project.title}
                  </h3>
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, index) => (
                      <span 
                        key={index}
                        className="px-4 py-2 bg-gray-700/50 backdrop-blur-sm rounded-lg text-sm text-blue-400 border border-gray-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
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

export default ProjectsPage;