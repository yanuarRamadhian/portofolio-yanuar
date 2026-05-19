import React, { useState, useEffect, useRef } from 'react';
import { useApp } from './AppContext';
import {
  Menu,
  X,
  Mail,
  Copy,
  Check,
  FileDown,
  ArrowRight,
  Sun,
  Moon,
  ChevronDown,
  Sparkles,
  Layers,
  GraduationCap,
  Globe
} from 'lucide-react';

const Github = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const Linkedin = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const Instagram = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const Whatsapp = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';

// Component imports
import CodeTicker from './components/CodeTicker';
import FloatingBadge from './components/FloatingBadge';
import TimelineFolder from './components/TimelineFolder';
import CaseStudyModal from './components/CaseStudyModal';
import { CoderAvatar, SleepingGhost, WalkingGhosts } from './components/AnimatedCharacters';
import profileImg from './assets/profile.jpeg';
import CustomCursor from './components/CustomCursor';
import NoiseOverlay from './components/NoiseOverlay';
import MarqueeBanner from './components/MarqueeBanner';
import MagneticWrapper from './components/MagneticWrapper';
import ScrollReveal from './components/ScrollReveal';
import InteractiveGrid from './components/InteractiveGrid';
import GlitchText from './components/GlitchText';
import BackToTop from './components/BackToTop';

function App() {
  const { theme, language, toggleTheme, toggleLanguage, t } = useApp();
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [isProfileZoomed, setIsProfileZoomed] = useState(false);

  // Scroll Progress
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Contact Form State
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Live Date State
  const [liveDate, setLiveDate] = useState('');

  // Toast State
  const [toastMessage, setToastMessage] = useState(null);

  // Section Refs for Scroll Spy
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const projectsRef = useRef(null);
  const journeyRef = useRef(null);
  const contactRef = useRef(null);

  // Trigger custom toast
  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Format Live Date dynamically based on selected language
  useEffect(() => {
    const updateDate = () => {
      const today = new Date();
      const locale = language === 'id' ? 'id-ID' : 'en-US';
      const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
      setLiveDate(today.toLocaleDateString(locale, options).toUpperCase());
    };

    updateDate();
    const interval = setInterval(updateDate, 60000); // update every minute
    return () => clearInterval(interval);
  }, [language]);

  // Scroll Spy logic
  useEffect(() => {
    const sections = [
      { id: 'home', ref: homeRef },
      { id: 'about', ref: aboutRef },
      { id: 'projects', ref: projectsRef },
      { id: 'journey', ref: journeyRef },
      { id: 'contact', ref: contactRef },
    ];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        if (section.ref.current) {
          const top = section.ref.current.offsetTop;
          const height = section.ref.current.offsetHeight;

          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Copy Email to Clipboard
  const handleCopyEmail = () => {
    navigator.clipboard.writeText('ramadhian1999@gmail.com');
    setCopied(true);
    triggerToast(language === 'id' ? 'Email berhasil disalin!' : 'Email copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  // Form Submission Mockup
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) {
      triggerToast(language === 'id' ? 'Harap isi semua kolom wajib!' : 'Please fill all required fields!');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      triggerToast(t.contact.success);
      setFormState({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 1500);
  };

  const handleDownloadCV = () => {
    // Show download toast
    triggerToast(
      language === 'id'
        ? 'Mengunduh CV Yanuar Ramadhian...'
        : 'Downloading Yanuar Ramadhian CV...'
    );

    // Trigger physical download from public folder
    const link = document.createElement('a');
    link.href = '/CV_Yanuar_Ramadhian.pdf';
    link.download = 'CV_Yanuar_Ramadhian.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleOpenCaseStudy = (proj) => {
    setSelectedProject(proj);
    setModalOpen(true);
  };

  // Navigation action helper
  const scrollTo = (refId) => {
    // Close the mobile menu first
    setMobileMenuOpen(false);
    
    // Add a slight delay to ensure mobile browsers don't cancel the smooth scroll
    // due to the simultaneous DOM animation / touch event termination.
    setTimeout(() => {
      const el = document.getElementById(refId);
      if (el) {
        // Calculate precise offset considering the 64px (h-16) sticky header
        const yOffset = -64; 
        const y = el.getBoundingClientRect().top + window.scrollY + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 150);
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 font-sans transition-colors duration-300 md:cursor-none">
      <CustomCursor />
      <NoiseOverlay />
      <BackToTop />
      
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-emerald-500 z-[10000] origin-left shadow-[0_2px_10px_rgba(16,185,129,0.5)] hidden md:block"
        style={{ scaleX }}
      />

      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-10 right-6 z-50 px-5 py-3 rounded-xl border-2 border-black dark:border-white bg-white dark:bg-zinc-900 text-black dark:text-white font-bold text-xs uppercase shadow-2xl flex items-center gap-2"
          >
            <Sparkles size={16} className="text-emerald-500 animate-spin-slow" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* STICKY HEADER / NAVIGATION */}
      <header className="sticky top-0 z-40 w-full border-b-2 border-black dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md transition-colors">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex justify-between items-center">

          {/* Logo */}
          <button
            onClick={() => scrollTo('home')}
            className="flex items-center gap-2 font-black text-xl sm:text-2xl tracking-tighter"
          >
            <div className="w-9 h-9 rounded-xl bg-black text-white dark:bg-white dark:text-black flex items-center justify-center font-bold border-2 border-black dark:border-white shadow-md transform hover:rotate-12 transition-transform duration-300">
              Y
            </div>
            <span className="hidden sm:inline-block">YANUAR R.S.</span>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6">
            {['home', 'about', 'projects', 'journey', 'contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollTo(item)}
                className={`font-bold text-xs uppercase tracking-widest relative py-1 transition-colors ${activeSection === item
                  ? 'text-black dark:text-white'
                  : 'text-zinc-400 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200'
                  }`}
              >
                {t.nav[item]}
                {activeSection === item && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-black dark:bg-white"
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Controls (Theme, Lang, Mobile Menu) */}
          <div className="flex items-center gap-2 sm:gap-4">

            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border-2 border-black dark:border-zinc-700 bg-white dark:bg-zinc-900 font-bold text-[10px] tracking-wider uppercase hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors shadow-sm"
              title="Toggle Language"
            >
              <span>{language === 'en' ? '🇺🇸 EN' : '🇮🇩 ID'}</span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg border-2 border-black dark:border-zinc-700 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors shadow-sm"
              title="Toggle Theme"
            >
              {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg border-2 border-black dark:border-zinc-700 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
            >
              {mobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed top-16 left-0 z-30 md:hidden w-full bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md border-b-2 border-black dark:border-zinc-800 shadow-lg transition-colors overflow-hidden"
          >
            <div className="px-4 py-4 flex flex-col gap-4">
              {['home', 'about', 'projects', 'journey', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollTo(item)}
                  className={`w-full text-left py-2 font-bold text-xs uppercase tracking-widest ${activeSection === item ? 'text-emerald-500' : 'text-zinc-500'
                    }`}
                >
                  {t.nav[item]}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO SECTION */}
      <section
        id="home"
        ref={homeRef}
        className="relative min-h-[calc(100vh-4rem)] flex flex-col justify-between overflow-hidden border-b-2 border-black dark:border-zinc-800 pt-12"
      >
        <InteractiveGrid />
        {/* Animated Terminal Code Ticker Backdrop */}
        <CodeTicker />
        {/* Floating spring physics badges - Hidden on mobile, visible on desktop at safe edges */}
        <div className="absolute inset-0 z-20 pointer-events-none hidden md:block">
          <FloatingBadge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20" style={{ top: '15%', left: '8%' }}>
            {t.hero.pills[0]}
          </FloatingBadge>
          <FloatingBadge className="bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20" style={{ top: '15%', right: '8%' }}>
            {t.hero.pills[1]}
          </FloatingBadge>
          <FloatingBadge className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20" style={{ top: '24%', left: '3%' }}>
            {t.hero.pills[2]}
          </FloatingBadge>
          <FloatingBadge className="bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20" style={{ top: '24%', right: '3%' }}>
            {t.hero.pills[3]}
          </FloatingBadge>
          <FloatingBadge className="bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20" style={{ top: '72%', left: '10%' }}>
            {t.hero.pills[4]}
          </FloatingBadge>
          <FloatingBadge className="bg-slate-500/10 text-slate-600 dark:text-slate-400 border border-slate-500/20" style={{ top: '72%', right: '10%' }}>
            {t.hero.pills[5]}
          </FloatingBadge>
        </div>

        {/* Center Main Text */}
        <div className="flex-1 flex flex-col items-center justify-center text-center px-4 sm:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center"
          >
            {/* Tagline */}
            <div className="flex items-center gap-2 mb-3 bg-zinc-200/50 dark:bg-zinc-800/50 px-3 py-1 rounded-lg border border-black/5 dark:border-white/5 font-mono text-[10px] sm:text-xs font-bold tracking-widest text-zinc-500 dark:text-zinc-400">
              <Sparkles size={12} className="text-amber-500 animate-spin-slow" />
              <span>{t.hero.role}</span>
            </div>

            {/* Giant Title */}
            <GlitchText 
              text={t.hero.title} 
              className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter leading-none mb-6" 
            />

            {/* Sub-description CTA */}
            <p className="max-w-md text-xs sm:text-sm text-zinc-400 dark:text-zinc-500 font-mono tracking-tight leading-relaxed mb-8">
              {language === 'id'
                ? 'Membangun solusi perangkat lunak yang andal, efisien, dengan desain piksel-sempurna yang memecahkan masalah nyata.'
                : 'Building reliable, high-performance web systems with pixel-perfect layouts designed to solve actual issues.'}
            </p>

            {/* Button links */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <MagneticWrapper>
                <button
                  onClick={() => scrollTo('projects')}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-black text-white dark:bg-white dark:text-black rounded-xl font-bold text-xs uppercase border-2 border-black dark:border-white hover:opacity-95 transition-all shadow-lg"
                >
                  <span>{language === 'id' ? 'Lihat Proyek' : 'View Projects'}</span>
                  <ArrowRight size={14} />
                </button>
              </MagneticWrapper>
              <MagneticWrapper>
                <button
                  onClick={() => scrollTo('contact')}
                  className="w-full sm:w-auto px-6 py-3 bg-white text-black dark:bg-zinc-900 dark:text-white rounded-xl font-bold text-xs uppercase border-2 border-black dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-850 transition-colors shadow-md"
                >
                  {language === 'id' ? 'Hubungi Saya' : 'Contact Me'}
                </button>
              </MagneticWrapper>
            </div>
          </motion.div>
        </div>

        {/* BOTTOM STATUS BAR */}
        <div className="border-t-2 border-black dark:border-zinc-800 bg-white dark:bg-zinc-950 font-mono text-[9px] sm:text-xs font-bold tracking-wider z-10 transition-colors">
          <div className="max-w-6xl mx-auto px-4 py-3 flex flex-wrap justify-between items-center gap-4">

            {/* Status Item: Open To Work */}
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>{t.hero.status}</span>
            </div>

            {/* Status Item: Jambi, ID */}
            <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400">
              <CoderAvatar />
              <span>{t.hero.location}</span>
            </div>

            {/* Status Item: Dynamic Date with Sleeping Ghost */}
            <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400">
              <SleepingGhost />
              <span>TODAY: {liveDate}</span>
            </div>

            {/* Scroll indicator */}
            <button
              onClick={() => scrollTo('about')}
              className="flex items-center gap-1.5 text-zinc-400 dark:text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300 animate-bounce"
            >
              <span>{t.hero.scroll}</span>
              <ChevronDown size={14} />
            </button>

          </div>
        </div>
      </section>

      {/* Infinite Scrolling Marquee Banner */}
      <MarqueeBanner />

      {/* ABOUT ME SECTION (Bento Grid) */}
      <section id="about" ref={aboutRef} className="max-w-6xl mx-auto px-4 sm:px-6 py-20 scroll-mt-16">

        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="font-mono text-[10px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-2">
            WHO AM I
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight uppercase">
            {t.about.title}
          </h2>
          <div className="h-1.5 w-12 bg-black dark:bg-white mt-4 rounded-full" />
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Card 1: Main Bio (Col-span-2) */}
          <ScrollReveal className="md:col-span-2">
            <div className="h-full p-6 rounded-2xl border-2 border-black dark:border-zinc-800 bg-white dark:bg-zinc-900 flex flex-col justify-between shadow-md transition-all hover:shadow-lg">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
              </div>
              <h3 className="text-xl sm:text-2xl font-black mb-3 text-zinc-900 dark:text-white tracking-tight uppercase">
                {t.about.bio_title}
              </h3>
              <p className="text-sm sm:text-base leading-relaxed text-zinc-500 dark:text-zinc-400 font-medium">
                {t.about.bio_desc}
              </p>
            </div>

            <div className="flex items-center gap-3 mt-8">
              <MagneticWrapper>
                <button
                  onClick={handleDownloadCV}
                  className="flex items-center gap-2 px-5 py-3 bg-black text-white dark:bg-white dark:text-black rounded-xl font-bold text-xs uppercase hover:opacity-90 transition-all shadow"
                >
                  <FileDown size={14} />
                  <span>{t.about.resume_btn}</span>
                </button>
              </MagneticWrapper>
            </div>
          </div>
          </ScrollReveal>

          {/* Card 2: Monochromatic Avatar Grid */}
          <ScrollReveal delay={0.1}>
            <div className="h-full p-6 rounded-2xl border-2 border-black dark:border-zinc-800 bg-zinc-150 dark:bg-zinc-900 flex flex-col items-center justify-center text-center relative overflow-hidden group shadow-md">
            {/* Background grid lines */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

            {/* Avatar container */}
            <div
              onClick={() => setIsProfileZoomed(true)}
              className="w-40 h-40 sm:w-48 sm:h-48 rounded-2xl border-2 border-black dark:border-white overflow-hidden mb-4 relative z-10 shadow-lg group-hover:scale-105 cursor-zoom-in transition-transform duration-300"
            >
              <img
                src={profileImg}
                alt="Yanuar Profile Monochrome portrait"
                className="w-full h-full object-cover filter grayscale contrast-125 hover:grayscale-0 transition-all duration-300"
              />
            </div>

            {/* Stats Tag */}
            <div className="relative z-10 flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-mono text-[9px] font-bold uppercase rounded-full mb-3 shadow-inner">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>ramadhian1999@gmail.com</span>
            </div>

            <MagneticWrapper className="w-full">
              <button
                onClick={() => scrollTo('contact')}
                className="relative z-10 w-full px-4 py-2.5 bg-white text-black dark:bg-zinc-800 dark:text-white border border-black dark:border-zinc-700 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black font-bold text-xs uppercase rounded-xl transition-colors shadow"
              >
                {t.about.hire_btn}
              </button>
            </MagneticWrapper>
          </div>
          </ScrollReveal>

          {/* Card 3: Education Details */}
          <ScrollReveal delay={0.2}>
            <div className="h-full p-6 rounded-2xl border-2 border-black dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-md flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-4 text-emerald-500">
              <GraduationCap size={20} />
              <span className="font-bold text-xs uppercase tracking-widest font-mono text-zinc-400 dark:text-zinc-500">
                {t.about.education}
              </span>
            </div>

            <h4 className="font-black text-lg tracking-tight mb-1 text-zinc-900 dark:text-white">
              {t.about.edu_inst}
            </h4>
            <p className="text-xs font-bold text-zinc-500 dark:text-zinc-400 font-mono mb-4 uppercase">
              {t.about.edu_major}
            </p>

            <div className="space-y-2 text-xs font-semibold text-zinc-500 dark:text-zinc-400 mb-6 font-mono">
              <p>✦ {t.about.edu_grad}</p>
              <p>✦ {t.about.edu_gpa}</p>
            </div>

            <div className="px-3 py-1.5 bg-black text-white dark:bg-white dark:text-black font-bold text-[9px] sm:text-[10px] tracking-wider uppercase rounded-lg inline-block border border-black dark:border-white shadow">
              🚀 {t.about.edu_satisfy}
            </div>
            </div>
          </div>
          </ScrollReveal>

          {/* Card 4: Tech Stack columns */}
          <ScrollReveal delay={0.3}>
            <div className="h-full p-6 rounded-2xl border-2 border-black dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-md">
              <div className="flex items-center gap-2 mb-4 text-blue-500">
              <Layers size={18} />
              <span className="font-bold text-xs uppercase tracking-widest font-mono text-zinc-400 dark:text-zinc-500">
                {t.about.tech_title}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs font-bold font-mono">
              <div>
                <h5 className="text-[10px] uppercase text-zinc-400 dark:text-zinc-500 mb-2">Languages</h5>
                <ul className="space-y-1.5 text-zinc-700 dark:text-zinc-300">
                  <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-orange-500" /> HTML / CSS</li>
                  <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-purple-500" /> PHP (Laravel)</li>
                  <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-yellow-500" /> JavaScript</li>
                  <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-blue-500" /> SQL (MySQL)</li>
                </ul>
              </div>
              <div>
                <h5 className="text-[10px] uppercase text-zinc-400 dark:text-zinc-500 mb-2">Frameworks/Tools</h5>
                <ul className="space-y-1.5 text-zinc-700 dark:text-zinc-300">
                  <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-sky-400" /> React / Next.js</li>
                  <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-teal-500" /> Tailwind CSS</li>
                  <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-rose-500" /> Figma UI/UX</li>
                  <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-neutral-600" /> Git / Postman</li>
                </ul>
              </div>
            </div>
          </div>
          </ScrollReveal>

          {/* Card 5: Core Philosophy & Workflow */}
          <ScrollReveal delay={0.4} className="md:col-span-2">
            <div className="h-full p-6 rounded-2xl border-2 border-black dark:border-zinc-800 bg-white dark:bg-zinc-900 flex flex-col justify-between shadow-md">
              <div>
              <h4 className="font-bold text-xs uppercase tracking-widest font-mono text-zinc-400 dark:text-zinc-500 mb-2">
                {t.about.philosophy_title}
              </h4>
              <p className="text-xs sm:text-sm leading-relaxed text-zinc-500 dark:text-zinc-400 font-medium mb-4">
                {t.about.philosophy_desc}
              </p>
            </div>

            <div className="border-t border-zinc-200 dark:border-zinc-800 pt-4">
              <h5 className="font-bold text-[10px] uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-mono mb-1.5">
                {t.about.workflow_title}
              </h5>
              <p className="text-xs text-zinc-700 dark:text-zinc-300 font-bold font-mono">
                {t.about.workflow_desc}
              </p>
            </div>
            </div>
          </ScrollReveal>

        </div>
      </section>

      {/* SELECTED WORKS / PROJECTS SECTION */}
      <section id="projects" ref={projectsRef} className="border-y-2 border-black dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900/50 py-20 transition-colors scroll-mt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">

          {/* Section Heading */}
          <div className="flex flex-col items-center text-center mb-16">
            <span className="font-mono text-[10px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-2">
              MY PORTFOLIO
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight uppercase">
              {t.projects.title}
            </h2>
            <div className="h-1.5 w-12 bg-black dark:bg-white mt-4 rounded-full" />
          </div>

          {/* Projects List */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {t.projects.list.map((project) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="rounded-2xl border-2 border-black dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden flex flex-col justify-between shadow-md hover:shadow-xl transition-all"
              >
                <div>
                  {/* Decorative Mockup image */}
                  <div className="h-44 sm:h-48 w-full border-b-2 border-black dark:border-zinc-800 relative bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080801a_1px,transparent_1px),linear-gradient(to_bottom,#8080801a_1px,transparent_1px)] bg-[size:16px_16px]" />

                    {/* Unique design elements depending on project */}
                    {project.id === 1 && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                        <div className="w-3/4 h-24 bg-white dark:bg-zinc-950 rounded-lg border-2 border-black shadow-lg p-2 flex flex-col justify-between font-mono text-[7px]">
                          <div className="flex justify-between items-center border-b pb-1">
                            <span className="font-bold text-rose-500">📊 SALES PORTAL</span>
                            <span className="bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 px-1 py-0.25 rounded text-[6px]">v1.0</span>
                          </div>
                          <div className="flex gap-1 items-end h-8">
                            <div className="w-2.5 h-6 bg-rose-500 border border-black rounded-t" />
                            <div className="w-2.5 h-8 bg-zinc-800 dark:bg-white border border-black rounded-t" />
                            <div className="w-2.5 h-4 bg-rose-300 border border-black rounded-t" />
                            <div className="w-2.5 h-7 bg-rose-500 border border-black rounded-t" />
                            <div className="w-2.5 h-5 bg-zinc-800 dark:bg-white border border-black rounded-t" />
                          </div>
                          <div className="flex justify-between text-[6px] text-zinc-400">
                            <span>Revenue: $12.4K</span>
                            <span>+14.2%</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {project.id === 2 && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                        <div className="w-3/4 h-24 bg-white dark:bg-zinc-950 rounded-lg border-2 border-black shadow-lg p-2.5 flex flex-col justify-between font-mono text-[7px]">
                          <div className="flex justify-between items-center border-b pb-1.5">
                            <span className="font-bold text-blue-500">👥 CRM ACTIVE</span>
                            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
                          </div>
                          <div className="space-y-1 my-1">
                            <div className="flex items-center gap-1">
                              <div className="w-2.5 h-2.5 rounded-full bg-blue-500 border border-black" />
                              <div className="flex-1 h-1.5 bg-zinc-100 dark:bg-zinc-900 rounded border" />
                            </div>
                            <div className="flex items-center gap-1">
                              <div className="w-2.5 h-2.5 rounded-full bg-amber-500 border border-black" />
                              <div className="flex-1 h-1.5 bg-zinc-100 dark:bg-zinc-900 rounded border" />
                            </div>
                          </div>
                          <div className="h-2.5 bg-black text-white dark:bg-white dark:text-black rounded flex items-center justify-center text-[6px] font-black">
                            MANAGE LEADS
                          </div>
                        </div>
                      </div>
                    )}

                    {project.id === 3 && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                        <div className="w-3/4 h-24 bg-zinc-950 rounded-lg border-2 border-white/20 shadow-lg p-2.5 flex flex-col justify-between font-mono text-[7px] text-white">
                          <div className="flex justify-between items-center border-b border-zinc-800 pb-1">
                            <span className="font-black text-emerald-400">⚡ MIKROTIK RB4011</span>
                            <span className="text-[6px] text-emerald-400 font-bold">ONLINE</span>
                          </div>
                          <div className="flex justify-between items-center my-1.5">
                            <div className="flex flex-col gap-0.5">
                              <span className="text-zinc-500 text-[6px]">ISP1 (Main)</span>
                              <span className="text-emerald-400 font-bold">Active 50M</span>
                            </div>
                            <span className="text-zinc-600">◀ PCC ▶</span>
                            <div className="flex flex-col gap-0.5 text-right">
                              <span className="text-zinc-500 text-[6px]">ISP2 (Backup)</span>
                              <span className="text-emerald-400 font-bold">Active 50M</span>
                            </div>
                          </div>
                          <div className="h-2 bg-zinc-900 rounded-full overflow-hidden border border-zinc-800">
                            <div className="h-full bg-emerald-500 w-4/5 animate-pulse" />
                          </div>
                        </div>
                      </div>
                    )}

                    {project.id === 4 && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                        <div className="w-3/4 h-24 bg-white dark:bg-zinc-950 rounded-lg border-2 border-black shadow-lg overflow-hidden flex flex-col font-mono text-[7px]">
                          <div className="bg-zinc-100 dark:bg-zinc-900 border-b-2 border-black px-2 py-1 flex items-center justify-between">
                            <div className="flex gap-0.5">
                              <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                              <div className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
                              <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                            </div>
                            <span className="text-[5px] text-zinc-400 font-bold truncate max-w-[60px]">wp-admin/index.php</span>
                            <div className="w-2.5 h-2.5 rounded bg-sky-500 flex items-center justify-center text-white text-[5px] font-black">W</div>
                          </div>
                          <div className="flex-1 p-2 flex flex-col justify-between">
                            <div className="flex gap-1.5">
                              <div className="w-1/3 h-10 border border-dashed border-zinc-300 dark:border-zinc-800 rounded flex items-center justify-center text-[5px] text-zinc-400">
                                Elementor
                              </div>
                              <div className="flex-1 space-y-1.5">
                                <div className="h-2 bg-zinc-100 dark:bg-zinc-900 rounded" />
                                <div className="h-2 bg-zinc-100 dark:bg-zinc-900 rounded" />
                                <div className="h-2 bg-zinc-100 dark:bg-zinc-900 rounded" />
                              </div>
                            </div>
                            <div className="h-2.5 bg-black text-white dark:bg-white dark:text-black rounded flex items-center justify-center text-[5px] font-black">
                              PAGE BUILDER ACTIVE
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {project.id === 5 && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                        <div className="w-3/4 h-24 bg-white dark:bg-zinc-950 rounded-lg border-2 border-black shadow-lg p-2 flex flex-col justify-between font-mono text-[7px]">
                          <div className="flex justify-between items-center border-b pb-1.5">
                            <span className="font-bold text-amber-500">📹 NAS & CCTV STATUS</span>
                            <span className="bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 px-1 py-0.25 rounded text-[5px] font-black">PCQ QOS</span>
                          </div>
                          <div className="flex gap-2">
                            <div className="flex-1 border border-dashed border-zinc-300 dark:border-zinc-800 rounded p-1 flex flex-col justify-around text-[5px]">
                              <span className="text-zinc-400">CCTV Bandwidth</span>
                              <span className="font-bold text-emerald-500">10 Mbps Constant</span>
                            </div>
                            <div className="w-12 border border-dashed border-zinc-300 dark:border-zinc-800 rounded p-1 flex flex-col justify-around text-[5px] text-center">
                              <span className="text-zinc-400">NAS Traffic</span>
                              <span className="font-bold text-blue-500">Shaped</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="absolute bottom-2 left-2 flex gap-1">
                      {project.metrics.slice(0, 1).map((m, idx) => (
                        <span key={idx} className="bg-black text-white dark:bg-white dark:text-black font-mono text-[8px] font-black uppercase px-2 py-0.5 rounded border border-black dark:border-white">
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-emerald-500">
                      {project.role}
                    </span>
                    <h3 className="text-lg font-black tracking-tight mt-1 mb-2 text-zinc-900 dark:text-white uppercase">
                      {project.name}
                    </h3>
                    <p className="text-xs sm:text-sm leading-relaxed text-zinc-500 dark:text-zinc-400 font-medium">
                      {project.desc}
                    </p>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="p-5 pt-0">
                  <button
                    onClick={() => handleOpenCaseStudy(project)}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border-2 border-black dark:border-zinc-700 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-black dark:text-white font-bold text-xs uppercase rounded-xl transition-all shadow"
                  >
                    <span>{t.projects.view_btn}</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* JOURNEY / TIMELINE SECTION */}
      <section id="journey" ref={journeyRef} className="py-20 scroll-mt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">

          {/* Section Heading */}
          <div className="flex flex-col items-center text-center mb-16">
            <span className="font-mono text-[10px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-2">
              MY EXPERIENCE
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight uppercase">
              {t.journey.title}
            </h2>
            <div className="h-1.5 w-12 bg-black dark:bg-white mt-4 rounded-full" />
          </div>

          {/* Timeline Nodes */}
          <div className="relative border-l-2 border-black dark:border-zinc-800 pl-6 sm:pl-8 ml-4 sm:ml-6 space-y-12">

            {t.journey.list.map((journey, idx) => (
              <motion.div
                key={journey.year}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                {/* Year Badge absolute position */}
                <div className="absolute -left-[41px] sm:-left-[49px] top-1.5 w-6 h-6 rounded-full border-2 border-black dark:border-white bg-white dark:bg-zinc-950 flex items-center justify-center font-bold text-[8px] sm:text-[9px] shadow-md">
                  {journey.year}
                </div>

                <div className="p-6 rounded-2xl border-2 border-black dark:border-zinc-850 bg-white dark:bg-zinc-900 shadow-md">
                  <span className="font-mono text-[9px] font-black text-emerald-500 tracking-wider uppercase">
                    MILESTONE
                  </span>
                  <h3 className="text-lg font-black tracking-tight mt-1 mb-2">
                    {journey.title}
                  </h3>
                  <p className="text-xs sm:text-sm leading-relaxed text-zinc-500 dark:text-zinc-400 font-medium">
                    {journey.desc}
                  </p>

                  {/* Interactive Folder element */}
                  <TimelineFolder year={journey.year} title={journey.title} images={journey.images} />
                </div>
              </motion.div>
            ))}

          </div>

        </div>
      </section>

      {/* CONTACT SECTION & FORM */}
      <section id="contact" ref={contactRef} className="border-t-2 border-black dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900/50 py-20 transition-colors scroll-mt-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">

          {/* Section Heading */}
          <div className="flex flex-col items-center text-center mb-16">
            <span className="font-mono text-[10px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-2">
              WANT TO COLLABORATE?
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight uppercase">
              {t.contact.title}
            </h2>
            <div className="h-1.5 w-12 bg-black dark:bg-white mt-4 rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-start">

            {/* Direct Contact Details (Col-span-2) */}
            <div className="md:col-span-2 space-y-6">

              {/* Card: Email copy tool */}
              <div className="p-6 rounded-2xl border-2 border-black dark:border-zinc-800 bg-white dark:bg-zinc-900 flex flex-col justify-between shadow-md">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 flex items-center justify-center mb-4">
                    <Mail size={20} />
                  </div>
                  <h4 className="font-black text-base tracking-tight mb-1">
                    {language === 'id' ? 'Kirim Surel Langsung' : 'Direct Email Address'}
                  </h4>
                  <p className="text-xs font-semibold font-mono text-zinc-400 dark:text-zinc-500 mb-4 select-all">
                    ramadhian1999@gmail.com
                  </p>
                </div>

                <button
                  onClick={handleCopyEmail}
                  className="flex items-center justify-center gap-2 w-full py-2.5 bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-800 dark:hover:bg-zinc-750 border border-black dark:border-zinc-700 text-black dark:text-white font-bold text-xs uppercase rounded-xl transition-all shadow-sm"
                >
                  {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                  <span>{copied ? t.contact.copied : t.contact.copy_btn}</span>
                </button>
              </div>

              {/* Socials buttons bar */}
              <div className="flex gap-3 justify-center">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-12 h-12 rounded-xl bg-white dark:bg-zinc-900 border-2 border-black dark:border-zinc-700 flex items-center justify-center hover:scale-105 transition-all shadow shadow-black"
                  title="LinkedIn"
                >
                  <Linkedin size={20} />
                </a>
                <a
                  href="https://wa.me/6285624208986"
                  target="_blank"
                  rel="noreferrer"
                  className="w-12 h-12 rounded-xl bg-white dark:bg-zinc-900 border-2 border-black dark:border-zinc-700 flex items-center justify-center hover:scale-105 transition-all shadow shadow-black"
                  title="WhatsApp"
                >
                  <Whatsapp size={20} className="text-emerald-500" />
                </a>
                <a
                  href="http://localhost:5174"
                  target="_blank"
                  rel="noreferrer"
                  className="w-12 h-12 rounded-xl bg-white dark:bg-zinc-900 border-2 border-black dark:border-zinc-700 flex items-center justify-center hover:scale-105 transition-all shadow shadow-black"
                  title="Portfolio Website"
                >
                  <Globe size={20} className="text-blue-500" />
                </a>
              </div>

            </div>

            {/* Direct Message Form (Col-span-3) */}
            <form
              onSubmit={handleSubmit}
              className="md:col-span-3 p-6 sm:p-8 rounded-2xl border-2 border-black dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-md space-y-4"
            >

              {/* Name */}
              <div className="flex flex-col">
                <label className="font-bold font-mono text-[10px] uppercase text-zinc-400 dark:text-zinc-500 mb-1.5">
                  {t.contact.name_placeholder} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder={t.contact.name_placeholder}
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  className="px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white font-medium text-sm transition-all"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col">
                <label className="font-bold font-mono text-[10px] uppercase text-zinc-400 dark:text-zinc-500 mb-1.5">
                  {t.contact.email_placeholder} <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder={t.contact.email_placeholder}
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  className="px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white font-medium text-sm transition-all"
                />
              </div>

              {/* Subject Dropdown */}
              <div className="flex flex-col">
                <label className="font-bold font-mono text-[10px] uppercase text-zinc-400 dark:text-zinc-500 mb-1.5">
                  {t.contact.subject_placeholder}
                </label>
                <div className="relative">
                  <select
                    value={formState.subject}
                    onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                    className="w-full appearance-none px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white font-medium text-sm transition-all cursor-pointer"
                  >
                    <option value="" disabled>{language === 'id' ? '--- Pilih Subjek ---' : '--- Choose Subject ---'}</option>
                    {t.contact.subjects.map((subj) => (
                      <option key={subj} value={subj}>{subj}</option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-zinc-400">
                    <ChevronDown size={16} />
                  </div>
                </div>
              </div>

              {/* Message */}
              <div className="flex flex-col">
                <label className="font-bold font-mono text-[10px] uppercase text-zinc-400 dark:text-zinc-500 mb-1.5">
                  {t.contact.message_placeholder} <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder={t.contact.message_placeholder}
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  className="px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white font-medium text-sm transition-all resize-none"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-black text-white dark:bg-white dark:text-black rounded-xl font-bold text-xs uppercase hover:opacity-90 transition-all shadow-md flex items-center justify-center gap-2"
              >
                <span>{isSubmitting ? t.contact.sending : t.contact.send_btn}</span>
                <ArrowRight size={14} />
              </button>

              {/* Success Alert */}
              {submitSuccess && (
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold text-xs uppercase rounded-xl text-center">
                  {t.contact.success}
                </div>
              )}

            </form>

          </div>

        </div>
      </section>

      {/* FOOTER CANVAS WITH WALKING RETRO GHOSTS */}
      <footer className="border-t-2 border-black dark:border-zinc-800 transition-colors">

        {/* Wiggling, leg-moving walking ghosts */}
        <WalkingGhosts />

        <div className="bg-white dark:bg-zinc-950 py-8 px-4 text-center transition-colors">
          <p className="font-mono text-[10px] font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-widest leading-relaxed">
            © 2026 Yanuar Ramadhian Sutiyono. All rights reserved.
          </p>
          <p className="font-mono text-[8px] font-bold text-zinc-300 dark:text-zinc-650 uppercase tracking-wider mt-1">
            Built with React, Vite, Tailwind CSS, & Framer Motion
          </p>
        </div>
      </footer>

      {/* Case Study Modal Popup component */}
      <CaseStudyModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        project={selectedProject}
      />

      {/* Lightbox / Zoomed Profile Modal */}
      <AnimatePresence>
        {isProfileZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsProfileZoomed(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-[90vw] max-h-[80vh] md:max-w-[450px] aspect-square rounded-2xl border-4 border-black dark:border-white overflow-hidden bg-white dark:bg-zinc-900 shadow-2xl flex items-center justify-center cursor-default"
            >
              <img
                src={profileImg}
                alt="Yanuar Profile Zoomed"
                className="w-full h-full object-cover filter contrast-110"
              />
              <button
                onClick={() => setIsProfileZoomed(false)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 text-white hover:bg-black/80 flex items-center justify-center transition-colors border border-white/20"
              >
                <X size={16} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

export default App;
