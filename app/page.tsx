'use client';

import React, { useState } from 'react';
import { Cpu, Smartphone, Globe, ExternalLink, Mail, MessageCircle, X, Layers, ArrowUpRight, Menu, MapPin, Phone } from 'lucide-react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring, Variants } from 'framer-motion';

// --- 3D Interactive Tilt Wrapper Component ---
function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d",
      }}
      className={`[perspective:1000px] ${className}`}
    >
      <div style={{ transform: "translateZ(25px)" }}>
        {children}
      </div>
    </motion.div>
  );
}

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Explicitly Typed Animation Variants (Fixes Vercel Build Error)
  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans relative overflow-hidden selection:bg-red-500 selection:text-white">

      {/* Floating Animated Red Glow Elements */}
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-red-600/20 blur-[140px] rounded-full pointer-events-none" 
      />
      <motion.div 
        animate={{ scale: [1, 1.3, 1], opacity: [0.05, 0.15, 0.05] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-red-600/10 blur-[130px] rounded-full pointer-events-none" 
      />

      {/* Navbar with Responsive Menu */}
      <nav className="max-w-6xl mx-auto flex flex-col px-6 py-5 border-b border-slate-900 sticky top-0 bg-slate-950/80 backdrop-blur-md z-50">
        <div className="flex justify-between items-center w-full">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xl font-bold tracking-wider text-slate-100 flex items-center gap-2 cursor-pointer"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"></span>
            SWEN<span className="text-red-500">.DEV</span>
          </motion.h1>

          {/* Desktop Nav */}
          <ul className="hidden md:flex gap-8 text-sm text-slate-400 font-medium">
            <li><a href="#about" className="hover:text-red-400 transition-colors">About</a></li>
            <li><a href="#skills" className="hover:text-red-400 transition-colors">Skills</a></li>
            <li><a href="#projects" className="hover:text-red-400 transition-colors">Projects</a></li>
            <li><a href="#contact" className="hover:text-red-400 transition-colors">Contact</a></li>
          </ul>

          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsModalOpen(true)}
              className="neon-button px-4 py-2 rounded-lg text-xs md:text-sm font-semibold cursor-pointer shadow-lg shadow-red-500/10"
            >
              Let's Talk
            </motion.button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-slate-300 hover:text-red-400 p-2 focus:outline-none"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Dropdown */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden pt-4 border-t border-slate-900 mt-3 flex flex-col gap-3 overflow-hidden"
            >
              <a href="#about" onClick={() => setIsMobileMenuOpen(false)} className="text-slate-300 hover:text-red-400 py-1.5 text-sm font-medium transition-colors">About</a>
              <a href="#skills" onClick={() => setIsMobileMenuOpen(false)} className="text-slate-300 hover:text-red-400 py-1.5 text-sm font-medium transition-colors">Skills</a>
              <a href="#projects" onClick={() => setIsMobileMenuOpen(false)} className="text-slate-300 hover:text-red-400 py-1.5 text-sm font-medium transition-colors">Projects</a>
              <a href="#contact" onClick={() => setIsMobileMenuOpen(false)} className="text-slate-300 hover:text-red-400 py-1.5 text-sm font-medium transition-colors">Contact</a>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section id="about" className="max-w-5xl mx-auto px-6 pt-16 pb-16 text-center relative z-10 flex flex-col items-center">

        {/* Profile Picture with Hover Effect */}
        <motion.div 
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, type: 'spring' }}
          className="relative w-40 h-40 md:w-48 md:h-48 mb-8 flex items-center justify-center group"
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-600 via-amber-500 via-rose-500 to-purple-600 animate-[spin_4s_linear_infinite] blur-md opacity-80 group-hover:opacity-100 transition-opacity"></div>
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-600 via-amber-500 via-rose-500 to-purple-600 animate-[spin_4s_linear_infinite]"></div>
          <div className="relative w-[93%] h-[93%] rounded-full overflow-hidden bg-slate-950 border-2 border-slate-950 flex items-center justify-center">
            <img
              src="/profile.jpeg"
              alt="Swen Akash"
              className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-500"
            />
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-950/40 border border-red-500/30 text-red-400 text-xs font-semibold mb-6"
        >
          <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
          Available for IoT & Full-Stack Projects
        </motion.div>

        {/* 3D Animated Outline Neon Title */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-4xl md:text-7xl font-black tracking-tight mb-6 leading-tight grid grid-cols-1 place-items-center text-center relative"
        >
          <span 
            className="col-start-1 row-start-1 neon-stroke-outline select-none pointer-events-none" 
            aria-hidden="true"
          >
            Building Intelligent Systems & Modern Apps.
          </span>
          <span className="col-start-1 row-start-1 neon-stroke-fill">
            Building Intelligent Systems & Modern Apps.
          </span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-slate-400 text-base md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Hi, I'm <strong className="text-slate-200">Swen Akash</strong>. A Full Stack IoT & Mobile Developer specializing in real-time tracking systems, embedded hardware, and high-performance web solutions.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row justify-center gap-4 w-full sm:w-auto"
        >
          <motion.a 
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            href="#projects" className="neon-button px-8 py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-red-500/20"
          >
            Explore Work <ArrowUpRight className="w-4 h-4" />
          </motion.a>
          <motion.a 
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            href="https://www.linkedin.com/in/swen-akash/" target="_blank" rel="noopener noreferrer" className="px-8 py-3.5 rounded-xl font-semibold border border-slate-800 hover:border-slate-700 bg-slate-900/50 hover:bg-slate-900 text-slate-300 flex items-center justify-center gap-2 transition-all"
          >
            <svg className="w-4 h-4 text-red-400 fill-current" viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.72a1.47 1.47 0 1 0 0 2.94 1.47 1.47 0 0 0 0-2.94z" /></svg> LinkedIn Profile
          </motion.a>
        </motion.div>

        {/* Quick Stats Grid with 3D Tilt */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto mt-16 text-left w-full"
        >
          <motion.div variants={fadeInUp}>
            <TiltCard>
              <div className="bg-slate-900/40 backdrop-blur-md p-5 rounded-xl border border-slate-800 hover:border-red-500/50 transition-all shadow-lg hover:shadow-red-500/10">
                <h3 className="text-3xl font-extrabold text-red-500 mb-1">10+</h3>
                <p className="text-xs text-slate-400 font-medium">Projects Built</p>
              </div>
            </TiltCard>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <TiltCard>
              <div className="bg-slate-900/40 backdrop-blur-md p-5 rounded-xl border border-slate-800 hover:border-red-500/50 transition-all shadow-lg hover:shadow-red-500/10">
                <h3 className="text-3xl font-extrabold text-red-500 mb-1">IoT & Mobile</h3>
                <p className="text-xs text-slate-400 font-medium">Core Specialization</p>
              </div>
            </TiltCard>
          </motion.div>

          <motion.div variants={fadeInUp} className="col-span-2 md:col-span-1">
            <TiltCard>
              <div className="bg-slate-900/40 backdrop-blur-md p-5 rounded-xl border border-slate-800 hover:border-red-500/50 transition-all shadow-lg hover:shadow-red-500/10">
                <h3 className="text-3xl font-extrabold text-red-500 mb-1">Real-Time</h3>
                <p className="text-xs text-slate-400 font-medium">Tracking Systems</p>
              </div>
            </TiltCard>
          </motion.div>
        </motion.div>
      </section>

      {/* Featured Projects with 3D Tilt */}
      <section id="projects" className="max-w-6xl mx-auto px-6 py-16">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-10"
        >
          <Layers className="text-red-500 w-6 h-6 animate-pulse" />
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Featured Projects</h2>
        </motion.div>

        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 gap-6"
        >
          {/* Took Bus Pro Card */}
          <motion.div variants={fadeInUp}>
            <TiltCard>
              <div className="bg-slate-900/40 backdrop-blur-md p-8 rounded-2xl border border-slate-800 hover:border-red-500/60 transition-all shadow-xl hover:shadow-red-500/10 flex flex-col justify-between group relative overflow-hidden min-h-[260px]">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span className="p-3 bg-red-950/50 border border-red-500/30 rounded-xl text-red-400 group-hover:scale-110 transition-transform">
                      <Smartphone className="w-6 h-6" />
                    </span>
                    <span className="text-xs px-3 py-1 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/30 font-medium">
                      Live Product
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-red-400 transition-colors">Took Bus Pro</h3>
                  <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                    Real-time public transport and logistics tracking mobile application with seat booking and live GPS monitoring.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 text-xs font-mono text-slate-400">
                  <span className="bg-slate-950 px-3 py-1 rounded-md border border-slate-800">Flutter</span>
                  <span className="bg-slate-950 px-3 py-1 rounded-md border border-slate-800">IoT GPS</span>
                  <span className="bg-slate-950 px-3 py-1 rounded-md border border-slate-800">GCP</span>
                </div>
              </div>
            </TiltCard>
          </motion.div>

          {/* A/L Paper Notes Platform Card */}
          <motion.div variants={fadeInUp}>
            <TiltCard>
              <div className="bg-slate-900/40 backdrop-blur-md p-8 rounded-2xl border border-slate-800 hover:border-red-500/60 transition-all shadow-xl hover:shadow-red-500/10 flex flex-col justify-between group min-h-[260px]">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span className="p-3 bg-red-950/50 border border-red-500/30 rounded-xl text-red-400 group-hover:scale-110 transition-transform">
                      <Globe className="w-6 h-6" />
                    </span>
                    <span className="text-xs px-3 py-1 rounded-full bg-amber-950 text-amber-400 border border-amber-500/30 font-medium">
                      In Development
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-red-400 transition-colors">A/L Paper Notes Platform</h3>
                  <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                    Comprehensive past paper explanations, step-by-step MCQ solutions, and model notes tailored for Sri Lankan A/L students.
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex flex-wrap gap-2 text-xs font-mono text-slate-400">
                    <span className="bg-slate-950 px-3 py-1 rounded-md border border-slate-800">Next.js</span>
                    <span className="bg-slate-950 px-3 py-1 rounded-md border border-slate-800">PostgreSQL</span>
                  </div>
                  <a href="#projects" className="text-xs text-red-400 hover:text-red-300 font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Preview <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </TiltCard>
          </motion.div>
        </motion.div>
      </section>

      {/* Tech Stack Animated Grid */}
      <section id="skills" className="max-w-6xl mx-auto px-6 py-16 border-t border-slate-900">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl font-bold mb-8 text-center"
        >
          Tech Stack & Tools
        </motion.h2>

        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          <motion.div variants={fadeInUp}>
            <TiltCard>
              <div className="p-4 bg-slate-900/30 rounded-xl border border-slate-800 hover:border-red-500/40 text-center transition-colors">
                <Cpu className="w-6 h-6 text-red-500 mx-auto mb-2" />
                <h4 className="font-semibold text-sm">Embedded Systems</h4>
                <p className="text-xs text-slate-500 mt-1">ESP32, Arduino, Custom Sensors</p>
              </div>
            </TiltCard>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <TiltCard>
              <div className="p-4 bg-slate-900/30 rounded-xl border border-slate-800 hover:border-red-500/40 text-center transition-colors">
                <Smartphone className="w-6 h-6 text-red-500 mx-auto mb-2" />
                <h4 className="font-semibold text-sm">Mobile Dev</h4>
                <p className="text-xs text-slate-500 mt-1">Flutter, React Native</p>
              </div>
            </TiltCard>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <TiltCard>
              <div className="p-4 bg-slate-900/30 rounded-xl border border-slate-800 hover:border-red-500/40 text-center transition-colors">
                <Globe className="w-6 h-6 text-red-500 mx-auto mb-2" />
                <h4 className="font-semibold text-sm">Backend & APIs</h4>
                <p className="text-xs text-slate-500 mt-1">Python, PHP, SQL</p>
              </div>
            </TiltCard>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <TiltCard>
              <div className="p-4 bg-slate-900/30 rounded-xl border border-slate-800 hover:border-red-500/40 text-center transition-colors">
                <Layers className="w-6 h-6 text-red-500 mx-auto mb-2" />
                <h4 className="font-semibold text-sm">Cloud & Web</h4>
                <p className="text-xs text-slate-500 mt-1">Next.js, GCP, Tailwind</p>
              </div>
            </TiltCard>
          </motion.div>
        </motion.div>
      </section>

      {/* Modern Multi-Column Footer */}
      <footer id="contact" className="border-t border-slate-900 bg-slate-950/90 pt-16 pb-8 relative z-10">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Column 1: Brand & Bio */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold tracking-wider text-slate-100 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"></span>
              SWEN<span className="text-red-500">.DEV</span>
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Full Stack IoT & Mobile Developer crafting real-time tracking systems, custom embedded hardware, and high-performance web applications.
            </p>
            <div className="flex gap-3 pt-2">
              <a href="https://github.com/swenakash" target="_blank" rel="noopener noreferrer" className="p-2.5 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-red-400 rounded-lg border border-slate-800 transition-colors">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" /></svg>
              </a>
              <a href="https://www.linkedin.com/in/swen-akash/" target="_blank" rel="noopener noreferrer" className="p-2.5 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-red-400 rounded-lg border border-slate-800 transition-colors">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.72a1.47 1.47 0 1 0 0 2.94 1.47 1.47 0 0 0 0-2.94z" /></svg>
              </a>
              <a href="mailto:swenakash@gmail.com" className="p-2.5 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-red-400 rounded-lg border border-slate-800 transition-colors">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-slate-200 font-semibold text-base mb-4 border-l-2 border-red-500 pl-2">Quick Links</h4>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li><a href="#about" className="hover:text-red-400 transition-colors flex items-center gap-1.5"><span className="text-red-500">›</span> About Me</a></li>
              <li><a href="#skills" className="hover:text-red-400 transition-colors flex items-center gap-1.5"><span className="text-red-500">›</span> Tech Stack</a></li>
              <li><a href="#projects" className="hover:text-red-400 transition-colors flex items-center gap-1.5"><span className="text-red-500">›</span> Featured Projects</a></li>
              <li><button onClick={() => setIsModalOpen(true)} className="hover:text-red-400 transition-colors flex items-center gap-1.5 text-left cursor-pointer"><span className="text-red-500">›</span> Get in Touch</button></li>
            </ul>
          </div>

          {/* Column 3: Specializations */}
          <div>
            <h4 className="text-slate-200 font-semibold text-base mb-4 border-l-2 border-red-500 pl-2">Specializations</h4>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li className="hover:text-slate-200 transition-colors">IoT & Embedded Hardware</li>
              <li className="hover:text-slate-200 transition-colors">Real-Time GPS Tracking</li>
              <li className="hover:text-slate-200 transition-colors">Flutter & React Native</li>
              <li className="hover:text-slate-200 transition-colors">Full-Stack Web Development</li>
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h4 className="text-slate-200 font-semibold text-base mb-4 border-l-2 border-red-500 pl-2">Contact Info</h4>
            <ul className="space-y-3 text-slate-400 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span>Horana / Colombo, Sri Lanka</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-red-500 shrink-0" />
                <a href="mailto:swenakash@gmail.com" className="hover:text-red-400 transition-colors">swenakash@gmail.com</a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-red-500 shrink-0" />
                <a href="https://wa.me/94788987132" target="_blank" rel="noopener noreferrer" className="hover:text-red-400 transition-colors">+94 78 898 7132</a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright Bar */}
        <div className="max-w-6xl mx-auto px-6 pt-6 border-t border-slate-900 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© 2026 SWEN.DEV. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Designed & Developed by <span className="text-slate-300 font-semibold">Swen Akash</span>
          </p>
        </div>
      </footer>

      {/* Animated Contact Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="relative w-full max-w-sm bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl text-white"
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-xl font-bold mb-1 text-slate-100">Let's Connect!</h3>
              <p className="text-slate-400 text-xs mb-6">Choose your preferred way to contact me:</p>

              <div className="flex flex-col gap-3">
                <motion.a
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  href="https://wa.me/94788987132?text=Hi%20Swen,%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20connect!"
                  target="_blank" rel="noopener noreferrer" onClick={() => setIsModalOpen(false)}
                  className="flex items-center gap-4 p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 hover:border-emerald-500 hover:bg-emerald-500/20 transition group"
                >
                  <div className="p-2.5 bg-emerald-500/20 rounded-lg text-emerald-400 group-hover:scale-110 transition-transform">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-semibold text-emerald-400 text-sm">WhatsApp</h4>
                    <p className="text-[11px] text-slate-400">Send a quick direct message</p>
                  </div>
                </motion.a>

                <motion.a
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  href="mailto:swenakash@gmail.com?subject=Portfolio%20Inquiry%20-%20Swen.dev"
                  onClick={() => setIsModalOpen(false)}
                  className="flex items-center gap-4 p-3.5 rounded-xl bg-blue-500/10 border border-blue-500/30 hover:border-blue-500 hover:bg-blue-500/20 transition group"
                >
                  <div className="p-2.5 bg-blue-500/20 rounded-lg text-blue-400 group-hover:scale-110 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-semibold text-blue-400 text-sm">Direct Email</h4>
                    <p className="text-[11px] text-slate-400">Send an email to my inbox</p>
                  </div>
                </motion.a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}