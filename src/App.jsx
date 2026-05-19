import React, { useState, useEffect, useRef } from 'react';
import { useApp } from './AppContext';
import { Menu, X, Sun, Moon, Sparkles } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';

// Component imports
import CustomCursor from './components/CustomCursor';
import NoiseOverlay from './components/NoiseOverlay';
import BackToTop from './components/BackToTop';
import MarqueeBanner from './components/MarqueeBanner';
import { WalkingGhosts } from './components/AnimatedCharacters';

// Section imports
import Hero from './sections/Hero';
import About from './sections/About';
import Projects from './sections/Projects';
import Journey from './sections/Journey';
import Contact from './sections/Contact';

function App() {
  const { theme, language, toggleTheme, toggleLanguage, t } = useApp();
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Scroll Progress Bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Global Toast State
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

  // Navigation action helper (with robust mobile smooth scroll fix!)
  const scrollTo = (refId) => {
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

      {/* MODULAR SECTIONS MOUNT */}
      <Hero homeRef={homeRef} scrollTo={scrollTo} />
      
      <MarqueeBanner />

      <About aboutRef={aboutRef} triggerToast={triggerToast} />

      <Projects projectsRef={projectsRef} />

      <Journey journeyRef={journeyRef} />

      <Contact contactRef={contactRef} triggerToast={triggerToast} />

      {/* FOOTER CANVAS WITH WALKING RETRO GHOSTS */}
      <footer className="border-t-2 border-black dark:border-zinc-800 transition-colors">
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
    </div>
  );
}

export default App;
