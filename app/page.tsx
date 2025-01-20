'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Github, Linkedin, Mail, Terminal, Code, Globe, BookOpen, Menu, X, ArrowRight, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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

  useEffect(() => {
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

  const NavLink = ({ item }: { item: string }) => {
    return (
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link
          href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
          className={`relative py-2 ${
            item === 'Home' ? 'text-blue-400' : 'text-gray-300 hover:text-white'
          } transition-colors duration-300 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 after:bg-blue-400 after:transition-all hover:after:w-full`}
          onClick={() => setIsMenuOpen(false)}
        >
          {item}
        </Link>
      </motion.div>
    );
  };

  const ProjectCard = ({ project }: { project: Project }) => (
    <motion.div
      variants={itemVariants}
      whileHover={{ scale: 1.05 }}
      className="transform transition-all duration-300"
    >
      <Link 
        href={project.link}
        className="group bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700 hover:border-blue-500/50 transition-all duration-500 hover:shadow-lg hover:shadow-blue-500/10"
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
    </motion.div>
  );

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
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
              {navItems.map((item) => (
                <NavLink key={item} item={item} />
              ))}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="md:hidden p-2 hover:bg-gray-800 rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
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
                  {navItems.map((item) => (
                    <NavLink key={item} item={item} />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="pt-32 pb-20"
      >
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
            <motion.div
              variants={containerVariants} 
              className="lg:w-1/2 text-center lg:text-left"
            >
              <motion.h1
                variants={itemVariants}
                className="text-5xl lg:text-7xl font-bold mb-8"
              >
                <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-purple-500 bg-clip-text text-transparent inline-block">
                  I&apos;m Alfira.
                </span>
                <br />
                <span className="mt-4 block text-4xl lg:text-6xl">
                  Frontend Developer
                </span>
              </motion.h1>
              <motion.p
                variants={itemVariants}
                className="text-xl text-gray-300 mb-12 max-w-2xl leading-relaxed"
              >
                Passionate about creating beautiful and functional web applications
                with modern technologies. Specializing in React, Next.js, and responsive design.
              </motion.p>
              <motion.div
                variants={containerVariants}
                className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start"
              >
                <motion.div variants={itemVariants}>
                  <Link 
                    href="/projects" 
                    className="group bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 px-8 py-4 rounded-xl font-medium transition-all duration-500 text-lg inline-flex items-center gap-2 hover:shadow-lg hover:shadow-blue-500/20"
                  >
                    View Projects
                    <ArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </motion.div>
                <motion.div variants={itemVariants}>
                  <Link 
                    href="/contact" 
                    className="group border-2 border-blue-500 hover:bg-blue-500/10 px-8 py-4 rounded-xl font-medium transition-all duration-500 text-lg flex items-center gap-2"
                  >
                    Contact Me
                    <Mail className="group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
            <motion.div
              variants={itemVariants}
              className="lg:w-1/2"
            >
              <motion.div
                className="relative"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="w-80 h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-blue-500/30 mx-auto relative group">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-b from-blue-500/20 to-transparent"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  />
                  <Image 
                    src="/images/profile.jpg" 
                    alt="Alfira" 
                    width={500} 
                    height={500} 
                    className="w-full h-full object-cover transform transition-all duration-700 group-hover:scale-110" 
                    priority 
                  />
                </div>
                <motion.div
                  className="absolute -z-10 inset-0 blur-3xl bg-blue-500/20 rounded-full"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.8, 0.5]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Skills Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="py-24 bg-gray-800/30 backdrop-blur-sm border-t border-b border-gray-800"
      >
        <div className="container mx-auto px-6">
          <motion.h2
            variants={itemVariants}
            className="text-4xl font-bold text-center mb-4"
          >
            My Expertise
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-gray-400 text-center mb-16 max-w-2xl mx-auto"
          >
            Leveraging modern technologies and best practices to create exceptional digital experiences.
          </motion.p>
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
{skills.map((skill, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)"
                }}
                className="group bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700 hover:border-blue-500/50 transition-all duration-500 hover:shadow-lg hover:shadow-blue-500/10"
              >
                <motion.div 
                  className="text-blue-400 mb-6"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {skill.icon}
                </motion.div>
                <h3 className="text-xl font-bold mb-4 group-hover:text-blue-400 transition-colors duration-500">
                  {skill.name}
                </h3>
                <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-500">
                  {skill.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Featured Projects */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="py-24"
      >
        <div className="container mx-auto px-6">
          <motion.h2
            variants={itemVariants}
            className="text-4xl font-bold text-center mb-4"
          >
            Featured Projects
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-gray-400 text-center mb-16 max-w-2xl mx-auto"
          >
            A selection of my recent work showcasing my expertise in web development.
          </motion.p>
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {featuredProjects.map((project, index) => (
              <ProjectCard key={index} project={project} />
            ))}
          </motion.div>
          <motion.div
            variants={itemVariants}
            className="text-center mt-12"
          >
            <Link 
              href="/projects"
              className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors duration-500 transform hover:scale-105 group"
            >
              View All Projects
              <ArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="py-24 bg-gray-800/30 backdrop-blur-sm border-t border-gray-800"
      >
        <div className="container mx-auto px-6 text-center">
          <motion.h2
            variants={itemVariants}
            className="text-4xl font-bold mb-4"
          >
            Get In Touch
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-gray-400 mb-12 max-w-2xl mx-auto"
          >
            Feel free to reach out for collaborations or just a friendly hello!
          </motion.p>
          <motion.div
            variants={containerVariants}
            className="flex justify-center gap-8"
          >
            {socialLinks.map((social, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center gap-2"
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
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="py-12 text-center text-gray-400 border-t border-gray-800"
      >
        <div className="container mx-auto px-6">
          <motion.div
            variants={containerVariants}
            className="flex flex-col items-center gap-4"
          >
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
            >
              <Link 
                href="/" 
                className="text-xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 
                           bg-clip-text text-transparent hover:opacity-80 transition-all 
                           duration-500"
              >
                Portfolio.
              </Link>
            </motion.div>
            <motion.div
              variants={containerVariants}
              className="flex gap-6"
            >
              {navItems.map((item) => (
                <motion.div
                  key={item}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                >
                  <Link
                    href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                    className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
                  >
                    {item}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
            <motion.div
              variants={itemVariants}
              className="w-24 h-px bg-gray-700 my-6"
            />
            <motion.p
              variants={itemVariants}
              className="text-sm"
            >
              &copy; {new Date().getFullYear()} Alfira. All rights reserved.
            </motion.p>
          </motion.div>
        </div>
      </motion.footer>

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

export default Homepage;