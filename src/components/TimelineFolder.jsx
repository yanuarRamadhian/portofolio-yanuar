import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Folder, FolderOpen } from 'lucide-react';
import { useApp } from '../AppContext';

const TimelineFolder = ({ year, title, images = [] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useApp();

  const handleToggle = () => setIsOpen(!isOpen);

  // Position profiles for fanning out cards
  const fanStyles = [
    { rotate: -15, x: -80, y: -60, scale: 0.95 },
    { rotate: 5, x: 80, y: -70, scale: 1.05 },
    { rotate: -5, x: 0, y: -110, scale: 1.0 }
  ];

  return (
    <div className="relative flex flex-col items-center mt-4 mb-8">
      {/* Folder Trigger Button */}
      <motion.button
        onClick={handleToggle}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`flex items-center gap-3 px-5 py-3 rounded-xl border-2 font-bold text-xs uppercase tracking-wider transition-colors z-30 shadow-md ${
          isOpen
            ? 'bg-black text-white border-black dark:bg-white dark:text-black dark:border-white'
            : 'bg-white text-black border-black dark:bg-zinc-900 dark:text-white dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800'
        }`}
      >
        {isOpen ? <FolderOpen size={18} className="text-emerald-500 animate-pulse" /> : <Folder size={18} />}
        <span>{t.journey.click_info} ({year})</span>
      </motion.button>

      {/* Fanning Cards Container */}
      <div className="relative w-full flex justify-center items-center h-0">
        <AnimatePresence>
          {isOpen && (
            <>
              {images.map((imgUrl, index) => {
                const style = fanStyles[index % fanStyles.length];
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.5, x: 0, y: 0, rotate: 0 }}
                    animate={{
                      opacity: 1,
                      scale: style.scale,
                      x: style.x,
                      y: style.y,
                      rotate: style.rotate,
                    }}
                    exit={{ opacity: 0, scale: 0.5, x: 0, y: 0, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 120, damping: 14, delay: index * 0.05 }}
                    className="absolute w-32 h-20 sm:w-40 sm:h-28 rounded-lg overflow-hidden border-2 border-black dark:border-white shadow-xl bg-zinc-100 dark:bg-zinc-850 z-20 cursor-zoom-in"
                    whileHover={{ scale: 1.25, zIndex: 50, rotate: 0 }}
                  >
                    <img
                      src={imgUrl}
                      alt={`${title} milestone photo ${index + 1}`}
                      className="w-full h-full object-cover filter grayscale contrast-125 hover:grayscale-0 transition-all duration-300"
                    />
                  </motion.div>
                );
              })}
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TimelineFolder;
