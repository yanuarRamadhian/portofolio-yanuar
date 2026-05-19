import React from 'react';
import { AnimatePresence, motion as m } from 'framer-motion';
import { X, ExternalLink, ShieldCheck, Flame, Zap } from 'lucide-react';
import { useApp } from '../AppContext';

const CaseStudyModal = ({ isOpen, onClose, project }) => {
  const { t } = useApp();

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
        >
          {/* Backdrop click close */}
          <div className="absolute inset-0 cursor-zoom-out" onClick={onClose} />

          {/* Modal Panel */}
          <m.div
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl border-2 border-black dark:border-zinc-700 bg-white dark:bg-zinc-900 text-black dark:text-white p-6 md:p-8 shadow-2xl z-10"
          >
            {/* Header */}
            <div className="flex justify-between items-start gap-4 pb-4 border-b border-zinc-200 dark:border-zinc-800">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-500 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">
                  {project.role}
                </span>
                <h3 className="text-xl sm:text-2xl font-black mt-2 tracking-tight">
                  {project.name}
                </h3>
              </div>
              <button
                onClick={onClose}
                className="p-1 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Performance Metrics Row */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 my-6">
              {project.metrics.map((metric, idx) => {
                const icons = [<Zap size={16} />, <Flame size={16} />, <ShieldCheck size={16} />];
                return (
                  <div
                    key={idx}
                    className="flex flex-col sm:flex-row items-center gap-2 p-2 sm:p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/50 justify-center text-center sm:text-left"
                  >
                    <span className="text-emerald-500">{icons[idx % icons.length]}</span>
                    <span className="font-mono text-[9px] sm:text-xs font-bold uppercase tracking-tight text-zinc-700 dark:text-zinc-300">
                      {metric}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Core Narrative Sections */}
            <div className="space-y-6 text-sm sm:text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
              {/* Problem */}
              <div>
                <h4 className="font-bold text-xs uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-1.5">
                  {t.projects.problem}
                </h4>
                <p>{project.problem}</p>
              </div>

              {/* Solution */}
              <div>
                <h4 className="font-bold text-xs uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-1.5">
                  {t.projects.solution}
                </h4>
                <p>{project.solution}</p>
              </div>

              {/* Impact */}
              <div>
                <h4 className="font-bold text-xs uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-1.5">
                  {t.projects.impact}
                </h4>
                <p>{project.impact}</p>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="flex gap-3 justify-end items-center mt-8 pt-4 border-t border-zinc-200 dark:border-zinc-800">
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 font-bold text-xs uppercase hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              >
                {t.projects.close_btn}
              </button>
              <button
                onClick={() => alert("Launching live project site demo simulation!")}
                className="flex items-center gap-2 px-5 py-2.5 bg-black text-white dark:bg-white dark:text-black rounded-xl font-bold text-xs uppercase border border-black dark:border-white hover:opacity-90 transition-all shadow-md"
              >
                <span>{t.projects.visit_btn}</span>
                <ExternalLink size={14} />
              </button>
            </div>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  );
};

export default CaseStudyModal;
