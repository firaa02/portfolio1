'use client';

import Image from 'next/image';
import React from 'react';
import Link from 'next/link';

import { Code, BookOpen, GraduationCap } from 'lucide-react';

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

const AboutPage: React.FC = () => {
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

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white w-full">
      {/* Navigation */}
      <nav className="fixed w-full bg-gray-900/80 backdrop-blur-sm z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-xl font-bold hover:text-blue-400 transition-colors">
              Portfolio.
            </Link>
            <div className="hidden md:flex space-x-12">
              <Link href="/" className="hover:text-blue-400 transition-colors">
                Home
              </Link>
              <Link href="/about" className="text-blue-400 transition-colors">
                About
              </Link>
              <Link href="/projects" className="hover:text-blue-400 transition-colors">
                Projects
              </Link>
              <Link href="/contact" className="hover:text-blue-400 transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* About Hero Section */}
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/3">
              <div className="rounded-full overflow-hidden w-80 h-80 mx-auto border-4 border-blue-500/30">
                <Image
                  src="/images/profile.jpg"
                  alt="Foto Profil Alfira"
                  width={320}
                  height={320}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="lg:w-2/3">
              <h1 className="text-4xl lg:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                Alfira
              </h1>
              <div className="space-y-4 text-xl text-gray-300 mb-8">
                <p><span className="font-semibold text-blue-400">NIM:</span> 2215051053</p>
                <p><span className="font-semibold text-blue-400">Asal:</span> Medan</p>
                <p><span className="font-semibold text-blue-400">Tanggal Lahir:</span> 02 Mei 2002</p>
                <p className="mt-6">
                  Mahasiswa Teknik Informatika yang passionate dalam pengembangan web dan teknologi modern.
                  Fokus pada frontend development dengan keahlian dalam React dan Next.js.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-lg">
                  <Code size={20} className="text-blue-400" />
                  <span>Frontend Development</span>
                </div>
                <div className="flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-lg">
                  <BookOpen size={20} className="text-blue-400" />
                  <span>Continuous Learning</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section dengan Timeline Semester */}
      <section className="py-20 bg-gray-800/50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 flex items-center gap-4">
            <GraduationCap className="text-blue-400" />
            Education
          </h2>
          
          {/* Main Education Card */}
          <div className="bg-gray-800 rounded-xl p-8 mb-12">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-4">
              <div>
                <h3 className="text-2xl font-bold text-blue-400">Teknik Informatika</h3>
                <p className="text-xl text-gray-300">Universitas Pendidikan Ganesha</p>
              </div>
              <p className="text-gray-400">2022 - Present</p>
            </div>
          </div>

          {/* Semester Timeline */}
          <div className="space-y-8 mt-12">
            {semesterDetails.map((sem, index) => (
              <div key={index} className="bg-gray-800/50 rounded-xl p-8 hover:bg-gray-800 transition-colors">
                <h3 className="text-xl font-bold text-blue-400 mb-4">{sem.semester}</h3>
                <ul className="grid gap-3">
                  {sem.activities.map((activity, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-blue-400 mt-1">•</span>
                      <span className="text-gray-300">{activity}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12">Skills</h2>
          <ul>
            {skills.map((skill, index) => (
              <li key={index} className="text-gray-300">{skill}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 text-center text-gray-400">
        <div className="container mx-auto px-6">
          <p className="text-lg">&copy; 2025 Alfira. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
};

export default AboutPage;
