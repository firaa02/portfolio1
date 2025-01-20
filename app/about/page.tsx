'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Code, BookOpen, GraduationCap, Menu, X } from 'lucide-react';

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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
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

  const NavLink = ({ item }: { item: string }) => (
    <Link
      href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
      className={`relative py-2 ${
        item === 'About' ? 'text-blue-400' : 'text-gray-300 hover:text-white'
      } transition-colors duration-300 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 after:bg-blue-400 after:transition-all hover:after:w-full`}
      onClick={() => setIsMenuOpen(false)}
    >
      {item}
    </Link>
  );

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-gray-900/90 backdrop-blur-lg shadow-lg' : 'bg-transparent'
      } border-b border-gray-800`}>
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent hover:opacity-80 transition-opacity">
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
              className="md:hidden p-2 hover:bg-gray-800 rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden absolute top-full left-0 right-0 bg-gray-900/90 backdrop-blur-lg border-b border-gray-800 py-4">
              <div className="flex flex-col space-y-4 px-6">
                {navItems.map((item) => (
                  <NavLink key={item} item={item} />
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* About Hero Section */}
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/3">
              <div className="relative">
                <div className="w-80 h-80 rounded-full overflow-hidden border-4 border-blue-500/30 mx-auto group">
                  <div className="absolute inset-0 bg-gradient-to-b from-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <Image
                    src="/images/profile.jpg"
                    alt="Foto Profil Alfira"
                    width={500}
                    height={500}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    priority
                  />
                </div>
                <div className="absolute -z-10 inset-0 blur-3xl bg-blue-500/20 rounded-full"></div>
              </div>
            </div>
            <div className="lg:w-2/3">
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  Alfira
                </span>
              </h1>
              <div className="space-y-4 text-xl text-gray-300 mb-8">
                <p>
                  <span className="font-semibold text-blue-400">NIM:</span> 2215051053
                </p>
                <p>
                  <span className="font-semibold text-blue-400">Asal:</span> Medan
                </p>
                <p>
                  <span className="font-semibold text-blue-400">Tanggal Lahir:</span> 02 Mei 2002
                </p>
                <p className="mt-6">
                  Mahasiswa Teknik Informatika yang passionate dalam pengembangan web dan teknologi modern.
                  Fokus pada frontend development dengan keahlian dalam React dan Next.js.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 bg-gray-800/50 backdrop-blur-sm px-4 py-2 rounded-lg border border-gray-700 hover:border-blue-500/50 transition-all duration-300">
                  <Code size={20} className="text-blue-400" />
                  <span>Frontend Development</span>
                </div>
                <div className="flex items-center gap-2 bg-gray-800/50 backdrop-blur-sm px-4 py-2 rounded-lg border border-gray-700 hover:border-blue-500/50 transition-all duration-300">
                  <BookOpen size={20} className="text-blue-400" />
                  <span>Continuous Learning</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-24 bg-gray-800/30 backdrop-blur-sm border-t border-b border-gray-800">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-4 text-center">Skills</h2>
          <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
            Technologies and tools I work with regularly
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {skills.map((skill, index) => (
              <div 
                key={index} 
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 text-center border border-gray-700 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10"
              >
                <span className="text-xl font-semibold text-blue-400">{skill}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-4 text-center">Experience</h2>
          <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
            My professional journey and projects
          </p>
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <div 
                key={index} 
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10"
              >
                <h3 className="text-xl font-bold text-blue-400">{exp.title}</h3>
                <p className="text-gray-300">{exp.company} - {exp.period}</p>
                <ul className="mt-4 space-y-2">
                  {exp.description.map((desc, i) => (
                    <li key={i} className="text-gray-300 flex items-start">
                      <span className="text-blue-400 mr-2">•</span>
                      {desc}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="py-24 bg-gray-800/30 backdrop-blur-sm border-t border-gray-800">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-4 text-center flex items-center justify-center gap-2">
            <GraduationCap className="text-blue-400" />
            Education
          </h2>
          <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
            My academic journey and achievements
          </p>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 mb-12 border border-gray-700 hover:border-blue-500/50 transition-all duration-300">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-4">
              <div>
                <h3 className="text-2xl font-bold text-blue-400">Teknik Informatika</h3>
                <p className="text-xl text-gray-300">Universitas Pendidikan Ganesha</p>
              </div>
              <p className="text-gray-400">2022 - Present</p>
            </div>
            <p className="text-gray-300">{education[0].description}</p>
          </div>

          {/* Semester Timeline */}
          <div className="space-y-8 mt-16">
            {semesterDetails.map((sem, index) => (
              <div 
                key={index} 
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10"
              >
                <h3 className="text-xl font-bold text-blue-400">{sem.semester}</h3>
                <ul className="mt-4 space-y-2">
                  {sem.activities.map((activity, i) => (
                    <li key={i} className="text-gray-300 flex items-start">
                      <span className="text-blue-400 mr-2">•</span>
                      {activity}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;