import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, ChevronDown } from 'lucide-react';
import { useApp } from '../AppContext';
import InteractiveGrid from '../components/InteractiveGrid';
import CodeTicker from '../components/CodeTicker';
import FloatingBadge from '../components/FloatingBadge';
import GlitchText from '../components/GlitchText';
import MagneticWrapper from '../components/MagneticWrapper';
import { CoderAvatar, SleepingGhost } from '../components/AnimatedCharacters';

export default function Hero({ homeRef, scrollTo }) {
  const { t, language } = useApp();
  const [liveDate, setLiveDate] = useState('');

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

  return (
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
  );
}
