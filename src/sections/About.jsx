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
                  loading="lazy"
                  decoding="async"
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
            <div className="h-full p-6 rounded-2xl border-2 border-black dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-md hover:shadow-lg transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-[9px] font-black uppercase px-2.5 py-1 bg-zinc-100 dark:bg-zinc-800 border border-black dark:border-zinc-700 rounded-lg">
                    {t.about.education}
                  </span>
                  <GraduationCap size={20} className="text-zinc-400" />
                </div>
                <h4 className="font-black text-lg tracking-tight mb-1 text-zinc-900 dark:text-white uppercase leading-tight">
                  {t.about.edu_inst}
                </h4>
                <p className="text-xs font-bold text-zinc-500 dark:text-zinc-400 font-mono mb-4 uppercase">
                  {t.about.edu_major}
                </p>

                <div className="space-y-2 text-xs font-semibold text-zinc-500 dark:text-zinc-400 mb-6 font-mono">
                  <p>✦ {t.about.edu_grad}</p>
                  <p>✦ {t.about.edu_gpa}</p>
                </div>
              </div>

              <div>
                <div className="px-3 py-1.5 bg-black text-white dark:bg-white dark:text-black font-bold text-[9px] sm:text-[10px] tracking-wider uppercase rounded-lg inline-block border border-black dark:border-white shadow">
                  🚀 {t.about.edu_satisfy}
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Card 4: Tech Stack columns */}
          <ScrollReveal delay={0.2}>
            <div className="h-full p-6 rounded-2xl border-2 border-black dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-md hover:shadow-lg transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-4 text-emerald-500">
                  <Layers size={18} />
                  <span className="font-bold text-xs uppercase tracking-widest font-mono text-zinc-400 dark:text-zinc-500">
                    {t.about.tech_title}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs font-bold font-mono">
                  <div>
                    <h5 className="text-[10px] uppercase text-zinc-400 dark:text-zinc-500 mb-2">Systems & Net</h5>
                    <ul className="space-y-1.5 text-zinc-700 dark:text-zinc-300">
                      <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" /> MikroTik</li>
                      <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Networking</li>
                      <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-blue-500" /> IT Support</li>
                      <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-purple-500" /> Troubleshooting</li>
                      <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-slate-500" /> Data Entry</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-[10px] uppercase text-zinc-400 dark:text-zinc-500 mb-2">Web & Analytics</h5>
                    <ul className="space-y-1.5 text-zinc-700 dark:text-zinc-300">
                      <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-sky-400" /> Laravel</li>
                      <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-yellow-500" /> WordPress</li>
                      <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-rose-500" /> MySQL</li>
                      <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-indigo-500" /> Data Analysis</li>
                      <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-zinc-500" /> MS Office</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Card 5: Core Philosophy & Workflow */}
          <ScrollReveal delay={0.25}>
            <div className="h-full p-6 rounded-2xl border-2 border-black dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-md hover:shadow-lg transition-all flex flex-col justify-between">
              <div>
                <h4 className="font-bold text-xs uppercase tracking-widest font-mono text-zinc-400 dark:text-zinc-500 mb-2">
                  {t.about.philosophy_title}
                </h4>
                <p className="text-xs leading-relaxed text-zinc-500 dark:text-zinc-400 font-semibold mb-4">
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
                decoding="async"
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
