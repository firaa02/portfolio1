'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Code, BookOpen, GraduationCap, Menu, X, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Experience {
  title: string;
  company: string;
  period: string;
  description: string[];
}

interface Education {
  degree: string;
  school: string;
  period: string;
  description: string;
}

interface SemesterDetail {
  semester: string;
  activities: string[];
}

const AboutPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = ['hero', 'skills', 'experience', 'education'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const experiences: Experience[] = [
    {
      title: "Frontend Developer",
      company: "Freelance",
      period: "2023 - Present",
      description: [
        "Developing modern web applications using Next.js",
        "Creating responsive and user-friendly interfaces",
        "Implementing SEO best practices"
      ]
    }
  ];

  const education: Education[] = [
    {
      degree: "Teknik Informatika",
      school: "Universitas Pendidikan Ganesha",
      period: "2022 - Present",
      description: "Focusing on web development, software engineering, and computer science fundamentals."
    }
  ];

  const semesterDetails: SemesterDetail[] = [
    {
      semester: "Semester 1",
      activities: [
        "Dasar-dasar pemrograman",
        "Algoritma dan pemecahan masalah",
        "Pengenalan teknologi informasi",
        "Matematika diskrit"
      ]
    },
    {
      semester: "Semester 2",
      activities: [
        "Struktur data dan algoritma",
        "Pemrograman berorientasi objek",
        "Database management",
        "Web development basics"
      ]
    },
    {
      semester: "Semester 3",
      activities: [
        "Framework development",
        "Backend programming",
        "Software engineering principles",
        "API development"
      ]
    },
    {
      semester: "Semester 4",
      activities: [
        "Mobile app development",
        "Cloud computing",
        "System analysis and design",
        "Web security"
      ]
    },
    {
      semester: "Semester 5",
      activities: [
        "Advanced web development",
        "Full-stack development",
        "Project management",
        "UI/UX design principles"
      ]
    }
  ];

  const skills = [
    "HTML & CSS", "JavaScript", "TypeScript", "React",
    "Next.js", "Tailwind CSS", "Git", "Node.js"
  ];

  const navItems = ['Home', 'About', 'Projects', 'Contact'];

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

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const NavLink = ({ item }: { item: string }) => {
    const sectionId = item.toLowerCase();
    const isActive = activeSection === sectionId;
  

    return (
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link
          href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
          className={`relative py-2 ${
            item === 'About' ? 'text-blue-400' : 'text-gray-300 hover:text-white'
          } transition-colors duration-300 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 after:bg-blue-400 after:transition-all hover:after:w-full`}
          onClick={() => setIsMenuOpen(false)}
        >
          {item}
        </Link>
      </motion.div>
    );
  };

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

      {/* About Header */}
      <motion.section
        id="hero"
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
            About Me
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-300 text-center max-w-3xl mx-auto leading-relaxed"
          >
            A passionate Software Engineering student specializing in frontend development
            and modern web technologies.
          </motion.p>
        </div>
      </motion.section>

      {/* About Overview Section */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="py-12 border-t border-b border-gray-800/50"
      >
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-start gap-16">
            {/* Profile Photo Column */}
            <motion.div
              className="lg:w-1/3 lg:sticky lg:top-32"
              variants={itemVariants}
            >
              <motion.div
                className="relative"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="w-80 h-80 rounded-full overflow-hidden border-4 border-blue-500/30 mx-auto group">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-b from-blue-500/20 to-transparent"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  />
                  <Image
                    src="/images/profile.jpg"
                    alt="Foto Profil Alfira"
                    width={500}
                    height={500}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
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

              {/* Name and Title */}
              <motion.div className="text-center mt-8">
                <motion.h2
                  variants={itemVariants}
                  className="text-3xl font-bold mb-2"
                >
                  <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                    Alfira
                  </span>
                </motion.h2>
                <motion.p
                  variants={itemVariants}
                  className="text-gray-400"
                >
                  Frontend Developer
                </motion.p>
              </motion.div>
            </motion.div>

            {/* Details Column */}
            <motion.div
              className="lg:w-2/3 space-y-8"
              variants={containerVariants}
            >
              {/* Personal Information */}
              <motion.div
                variants={itemVariants}
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700 hover:border-blue-500/50 transition-all duration-300"
              >
                <h3 className="text-2xl font-bold text-blue-400 mb-6">Personal Information</h3>
                <div className="space-y-4 text-xl">
                  <motion.p variants={itemVariants} className="flex items-center">
                    <span className="font-semibold text-blue-400 w-32">NIM:</span>
                    <span className="text-gray-300">2215051053</span>
                  </motion.p>
                  <motion.p variants={itemVariants} className="flex items-center">
                    <span className="font-semibold text-blue-400 w-32">Asal:</span>
                    <span className="text-gray-300">Medan</span>
                  </motion.p>
                  <motion.p variants={itemVariants} className="flex items-center">
                    <span className="font-semibold text-blue-400 w-32">Tanggal Lahir:</span>
                    <span className="text-gray-300">02 Mei 2002</span>
                  </motion.p>
                </div>
              </motion.div>

              {/* Professional Summary */}
              <motion.div
                variants={itemVariants}
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700 hover:border-blue-500/50 transition-all duration-300"
              >
                <h3 className="text-2xl font-bold text-blue-400 mb-6">About Me</h3>
                <motion.p variants={itemVariants} className="text-gray-300 text-lg leading-relaxed">
                  Mahasiswa Teknik Informatika yang passionate dalam pengembangan web dan teknologi modern.
                  Fokus pada frontend development dengan keahlian dalam React dan Next.js.
                </motion.p>
                {/* Skill Tags */}
                <motion.div
                  variants={containerVariants}
                  className="flex flex-wrap gap-4 mt-6"
                >
                  <motion.div
                    variants={itemVariants}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 bg-gray-800/50 backdrop-blur-sm px-4 py-2 rounded-lg border border-gray-700 hover:border-blue-500/50 transition-all duration-300"
                  >
                    <Code size={20} className="text-blue-400" />
                    <span>Frontend Development</span>
                  </motion.div>
                  <motion.div
                    variants={itemVariants}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 bg-gray-800/50 backdrop-blur-sm px-4 py-2 rounded-lg border border-gray-700 hover:border-blue-500/50 transition-all duration-300"
                  >
                    <BookOpen size={20} className="text-blue-400" />
                    <span>Continuous Learning</span>
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Skills Section */}
      <motion.section
        id="skills"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="py-24 bg-gray-800/30 backdrop-blur-sm border-b border-gray-800"
      >
        <div className="container mx-auto px-6">
          <motion.h2
            variants={itemVariants}
            className="text-4xl font-bold mb-4 text-center"
          >
            Skills
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-gray-400 text-center mb-16 max-w-2xl mx-auto"
          >
            Technologies and tools I work with regularly
          </motion.p>
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)"
                }}
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 text-center border border-gray-700 hover:border-blue-500/50 transition-all duration-300"
              >
                <span className="text-xl font-semibold text-blue-400">{skill}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Experience Section */}
      <motion.section
        id="experience"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="py-24 border-b border-gray-800"
      >
        <div className="container mx-auto px-6">
          <motion.h2
            variants={itemVariants}
            className="text-4xl font-bold mb-4 text-center"
          >
            Experience
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-gray-400 text-center mb-16 max-w-2xl mx-auto"
          >
            My professional journey and projects
          </motion.p>
          <motion.div
            variants={containerVariants}
            className="space-y-8"
          >
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 0 30px rgba(59, 130, 246, 0.2)"
                }}
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700 hover:border-blue-500/50 transition-all duration-300"
              >
                <h3 className="text-xl font-bold text-blue-400">{exp.title}</h3>
                <p className="text-gray-300">{exp.company} - {exp.period}</p>
                <motion.ul className="mt-4 space-y-2">
                  {exp.description.map((desc, i) => (
                    <motion.li
                      key={i}
                      variants={itemVariants}
                      className="text-gray-300 flex items-start"
                    >
                      <ChevronRight className="text-blue-400 mr-2 mt-1" size={16} />
                      {desc}
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Education Section */}
      <motion.section
        id="education"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="py-24 bg-gray-800/30 backdrop-blur-sm"
      >
        <div className="container mx-auto px-6">
          <motion.h2
            variants={itemVariants}
            className="text-4xl font-bold mb-4 text-center flex items-center justify-center gap-2"
          >
            <GraduationCap className="text-blue-400" />
            Education
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-gray-400 text-center mb-16 max-w-2xl mx-auto"
          >
            My academic journey and achievements
          </motion.p>
          <motion.div
            variants={itemVariants}
            whileHover={{
              scale: 1.02,
              boxShadow: "0 0 30px rgba(59, 130, 246, 0.2)"
            }}
            className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 mb-12 border border-gray-700 hover:border-blue-500/50 transition-all duration-300"
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-4">
              <div>
                <h3 className="text-2xl font-bold text-blue-400">{education[0].degree}</h3>
                <p className="text-xl text-gray-300">{education[0].school}</p>
              </div>
              <p className="text-gray-400">{education[0].period}</p>
            </div>
            <p className="text-gray-300">{education[0].description}</p>
          </motion.div>

          {/* Semester Timeline */}
          <motion.div
            variants={containerVariants}
            className="space-y-8 mt-16"
          >
            {semesterDetails.map((sem, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 0 30px rgba(59, 130, 246, 0.2)"
                }}
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700 hover:border-blue-500/50 transition-all duration-300"
              >
                <h3 className="text-xl font-bold text-blue-400">{sem.semester}</h3>
                <motion.ul className="mt-4 space-y-2">
                  {sem.activities.map((activity, i) => (
                    <motion.li
                      key={i}
                      variants={itemVariants}
                      className="text-gray-300 flex items-start"
                    >
                      <ChevronRight className="text-blue-400 mr-2 mt-1" size={16} />
                      {activity}
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>
            ))}
          </motion.div>
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

export default AboutPage;