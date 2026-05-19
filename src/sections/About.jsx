import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileDown, GraduationCap, Layers, X } from 'lucide-react';
import { useApp } from '../AppContext';
import ScrollReveal from '../components/ScrollReveal';
import MagneticWrapper from '../components/MagneticWrapper';
import profileImg from '../assets/profile.jpeg';

export default function About({ aboutRef, triggerToast }) {
  const { t, language } = useApp();
  const [isProfileZoomed, setIsProfileZoomed] = useState(false);

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

  return (
    <>
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
            <div className="h-full p-6 rounded-2xl border-2 border-black dark:border-zinc-800 bg-zinc-150 dark:bg-zinc-900/50 flex flex-col items-center justify-center text-center relative overflow-hidden group shadow-md transition-colors">
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
            </div>
          </ScrollReveal>

          {/* Card 3: Education */}
          <ScrollReveal delay={0.15}>
            <div className="p-6 rounded-2xl border-2 border-black dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-md hover:shadow-lg transition-all flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-[9px] font-black uppercase px-2.5 py-1 bg-zinc-100 dark:bg-zinc-800 border border-black dark:border-zinc-700 rounded-lg">
                  {language === 'id' ? 'PENDIDIKAN' : 'EDUCATION'}
                </span>
                <GraduationCap size={20} className="text-zinc-400" />
              </div>
              <div>
                <h4 className="font-black text-sm sm:text-base mb-1 uppercase text-zinc-900 dark:text-white tracking-tight">
                  {t.about.edu_title}
                </h4>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 font-bold mb-3 font-mono">
                  {t.about.edu_date}
                </p>
                <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed">
                  {t.about.edu_desc}
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Card 4: Workflow details */}
          <ScrollReveal delay={0.2} className="md:col-span-2">
            <div className="p-6 rounded-2xl border-2 border-black dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900/50 shadow-md hover:shadow-lg transition-colors flex flex-col justify-between md:flex-row md:items-center gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <Layers size={18} className="text-emerald-500" />
                  <h4 className="font-black text-sm sm:text-base uppercase text-zinc-900 dark:text-white tracking-tight">
                    {t.about.workflow_title}
                  </h4>
                </div>
                <p className="text-xs sm:text-sm leading-relaxed text-zinc-500 dark:text-zinc-400 font-medium">
                  {t.about.workflow_desc}
                </p>
              </div>
            </div>
          </ScrollReveal>

        </div>
      </section>

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
    </>
  );
}
