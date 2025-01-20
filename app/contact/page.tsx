'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Github, Linkedin, Mail, MapPin, Phone, Send, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ContactPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setFormStatus('success');
    setFormData({ name: '', email: '', subject: '', message: '' });
    
    // Reset success status after 3 seconds
    setTimeout(() => setFormStatus('idle'), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

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

  const NavLink = ({ item }: { item: string }) => {
    return (
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link
          href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
          className={`relative py-2 ${
            item === 'Contact' ? 'text-blue-400' : 'text-gray-300 hover:text-white'
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

      {/* Contact Header */}
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
            Get in Touch
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-300 text-center max-w-3xl mx-auto leading-relaxed"
          >
            Have a question or want to work together? Feel free to reach out!
          </motion.p>
        </div>
      </motion.section>

      {/* Contact Info and Form */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="py-12"
      >
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div
              variants={containerVariants}
              className="space-y-12"
            >
              {/* Contact Methods */}
              <motion.div
                variants={containerVariants}
                className="space-y-8"
              >
                {[
                  { icon: <Mail size={24} />, title: "Email", content: "contact@yourdomain.com", href: "mailto:contact@yourdomain.com" },
                  { icon: <MapPin size={24} />, title: "Location", content: "Jakarta, Indonesia" },
                  { icon: <Phone size={24} />, title: "Phone", content: "+62 (123) 456-7890", href: "tel:+1234567890" }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    whileHover={{ scale: 1.05 }}
                    className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700 hover:border-blue-500/50 transition-all duration-300 group"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-blue-500/10 rounded-lg text-blue-400 group-hover:scale-110 transition-transform">
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-400 transition-colors">
                          {item.title}
                        </h3>
                        {item.href ? (
                          <a href={item.href} className="text-gray-300 hover:text-blue-400 transition-colors">
                            {item.content}
                          </a>
                        ) : (
                          <p className="text-gray-300">{item.content}</p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Social Links */}
              <motion.div variants={itemVariants}>
                <h3 className="text-xl font-semibold mb-6">Connect with me</h3>
                <motion.div
                  variants={containerVariants}
                  className="flex gap-4"
                >
                  {[
                    { icon: <Github size={20} />, href: "https://github.com/yourusername", label: "GitHub" },
                    { icon: <Linkedin size={20} />, href: "https://linkedin.com/in/yourusername", label: "LinkedIn" },
                    { icon: <Mail size={20} />, href: "mailto:your.email@example.com", label: "Email" }
                  ].map((social, index) => (
                    <motion.a
                      key={index}
                      variants={itemVariants}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-4 bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700 hover:border-blue-500/50 text-gray-400 hover:text-blue-400 transition-all duration-300"
                      aria-label={social.label}
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              variants={itemVariants}
              className="bg-gray-800/30 backdrop-blur-sm p-8 rounded-xl border border-gray-700"
            >
              <h2 className="text-2xl font-bold mb-6">Send me a message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                {[
                  { label: "Your Name", type: "text", id: "name", placeholder: "John Doe" },
                  { label: "Email Address", type: "email", id: "email", placeholder: "john@example.com" },
                  { label: "Subject", type: "text", id: "subject", placeholder: "Project Inquiry" }
                ].map((field) => (
                  <motion.div
                    key={field.id}
                    variants={itemVariants}
                  >
                    <label htmlFor={field.id} className="block text-sm font-medium text-gray-300 mb-2">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      id={field.id}
                      name={field.id}
                      value={formData[field.id as keyof typeof formData]}
                      onChange={handleChange}
                      required
                      className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder={field.placeholder}
                    />
                  </motion.div>
                ))}

                <motion.div variants={itemVariants}>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                    placeholder="Your message here..."
                  />
                </motion.div>

                <motion.button
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={formStatus === 'submitting'}
                  className={`w-full py-4 px-6 rounded-lg font-medium text-lg flex items-center justify-center gap-2 transition-all duration-300
                    ${formStatus === 'success'
                      ? 'bg-green-500 hover:bg-green-600'
                      : 'bg-blue-500 hover:bg-blue-600'
                    }`}
                >
                  {formStatus === 'submitting' ? (
                    <span className="flex items-center gap-2">
                      Sending...
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    </span>
                  ) : formStatus === 'success' ? (
                    <span className="flex items-center gap-2">
                      Sent Successfully
                      <Check size={20} />
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      Send Message
                      <Send size={20} />
                    </span>
                  )}
                </motion.button>
              </form>
            </motion.div>
          </div>
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
          <motion.p variants={itemVariants} className="text-lg">
            &copy; {new Date().getFullYear()} Alfira. All rights reserved.
          </motion.p>
        </div>
      </motion.footer>
    </main>
  );
};

export default ContactPage;