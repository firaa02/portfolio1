'use client';

import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Github, ExternalLink, Search, Layout, Database, Smartphone, Globe, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  const navVariants = {
    hidden: { y: -100 },
    visible: {
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20
      }
    }
  };

  const NavLink = ({ item }: { item: string }) => (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Link
        href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
        className={`relative py-2 ${
          item === 'Projects' ? 'text-blue-400' : 'text-gray-300 hover:text-white'
        } transition-colors duration-300 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 after:bg-blue-400 after:transition-all hover:after:w-full`}
      >
        {item}
      </Link>
    </motion.div>
  );

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Navigation */}
      <motion.nav
        initial="hidden"
        animate="visible"
        variants={navVariants}
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled ? 'bg-gray-900/90 backdrop-blur-lg shadow-lg' : 'bg-transparent'
        } border-b border-gray-800`}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                Portfolio.
              </Link>
            </motion.div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              {['Home', 'About', 'Projects', 'Contact'].map((item) => (
                <NavLink key={item} item={item} />
              ))}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="md:hidden p-2 hover:bg-gray-800 rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="md:hidden absolute top-full left-0 right-0 bg-gray-900/90 backdrop-blur-lg border-b border-gray-800 py-4"
              >
                <div className="flex flex-col space-y-4 px-6">
                  {['Home', 'About', 'Projects', 'Contact'].map((item) => (
                    <NavLink key={item} item={item} />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>

      {/* Projects Header */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="pt-32 pb-12"
      >
        <div className="container mx-auto px-6">
          <motion.h1
            variants={itemVariants}
            className="text-5xl lg:text-6xl font-bold text-center mb-8 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent"
          >
            My Projects
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-300 text-center max-w-3xl mx-auto leading-relaxed"
          >
            A collection of my latest projects, showcasing my skills in web development, 
            mobile apps, and backend services.
          </motion.p>
        </div>
      </motion.section>

      {/* Search and Filter */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="py-8"
      >
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-8 items-center justify-between">
            {/* Search Bar */}
            <motion.div
              variants={itemVariants}
              className="relative w-full md:w-96"
            >
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-800/50 backdrop-blur-sm rounded-2xl pl-12 pr-4 py-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all border border-gray-700 hover:border-gray-600"
              />
            </motion.div>
            
            {/* Category Filters */}
            <motion.div
              variants={containerVariants}
              className="flex flex-wrap gap-4 justify-center"
            >
              {categories.map(({ id, label, icon: Icon }) => (
                <motion.button
                  key={id}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(id)}
                  className={`flex items-center gap-3 px-6 py-4 rounded-xl transition-all
                    ${selectedCategory === id 
                      ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25' 
                      : 'bg-gray-800/50 backdrop-blur-sm text-gray-300 hover:bg-gray-700/50 border border-gray-700 hover:border-gray-600'}`}
                >
                  <Icon size={20} />
                  {label}
                </motion.button>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Projects Grid */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="py-12"
      >
        <div className="container mx-auto px-6">
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence>
              {filteredProjects.map((project) => (
                <motion.div
                  layout
                  key={project.id}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, y: 20 }}
                  className="group relative bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700 hover:border-gray-600 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10"
                >
                  {/* Project Image with Hover Effect */}
                  <div className="relative h-56 overflow-hidden">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Image
                        src={project.image}
                        alt={project.title}
                        width={500}
                        height={500}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"
                    />
                  </div>
                  
                  {/* Project Details */}
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="mt-2 text-gray-300">{project.description}</p>
                    
                    {/* Tags with Animation */}
                    <motion.div
                      variants={containerVariants}
                      className="mt-4 flex flex-wrap gap-3"
                    >
                      {project.tags.map((tag) => (
                        <motion.span
                          key={tag}
                          whileHover={{ scale: 1.05 }}
                          className="bg-gray-700 px-3 py-1 rounded-full text-sm text-gray-300"
                        >
                          {tag}
                        </motion.span>
                      ))}
                    </motion.div>

                    {/* GitHub and Live Links */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      className="absolute bottom-4 right-4 flex gap-4"
                    >
                      {project.githubUrl && (
                        <motion.a
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-gray-800 p-2 rounded-full"
                        >
                          <Github size={24} className="text-gray-300 hover:text-blue-400" />
                        </motion.a>
                      )}
                      {project.liveUrl && (
                        <motion.a
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-gray-800 p-2 rounded-full"
                        >
                          <ExternalLink size={24} className="text-gray-300 hover:text-blue-400" />
                        </motion.a>
                      )}
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* No Results Message */}
          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-gray-400 text-xl">
                No projects found matching your criteria. Try adjusting your search or filters.
              </p>
            </motion.div>
          )}
        </div>
      </motion.section>

      {/* Back to Top Button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: isScrolled ? 1 : 0 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 bg-blue-500 p-3 rounded-full shadow-lg shadow-blue-500/25 text-white z-50"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </motion.button>
    </main>
  );
};

export default ProjectsPage;