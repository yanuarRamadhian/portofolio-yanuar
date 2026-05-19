import React from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useState } from 'react';
import { ArrowUp } from 'lucide-react';
import MagneticWrapper from './MagneticWrapper';

export default function BackToTop() {
  const { scrollYProgress } = useScroll();
  const [isVisible, setIsVisible] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Show button when user has scrolled past 15% of the page
    if (latest > 0.15) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  });

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.5 }}
      animate={{ 
        opacity: isVisible ? 1 : 0, 
        y: isVisible ? 0 : 50,
        scale: isVisible ? 1 : 0.5,
        pointerEvents: isVisible ? 'auto' : 'none'
      }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="fixed bottom-6 right-6 z-50"
    >
      <MagneticWrapper>
        <button
          onClick={scrollToTop}
          className="w-12 h-12 bg-black text-white dark:bg-white dark:text-black border-2 border-black dark:border-white rounded-xl shadow-[4px_4px_0px_0px_rgba(16,185,129,1)] dark:shadow-[4px_4px_0px_0px_rgba(16,185,129,1)] flex items-center justify-center hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0px_0px_rgba(16,185,129,1)] transition-all duration-200 group"
          aria-label="Back to top"
        >
          <ArrowUp size={20} className="group-hover:animate-bounce" />
        </button>
      </MagneticWrapper>
    </motion.div>
  );
}
