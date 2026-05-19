import React from 'react';
import { motion } from 'framer-motion';

export default function GlitchText({ text, className = '' }) {
  // A subtle typewriter reveal combined with a stagger
  const letters = Array.from(text);

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.1 * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.8,
      filter: "blur(4px)",
    },
  };

  return (
    <motion.h1
      className={`relative inline-block ${className}`}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          variants={child}
          className="inline-block text-zinc-900 dark:text-zinc-50 hover:text-emerald-500 transition-colors duration-200"
          style={{ 
            // Handle spaces properly so words don't collapse
            marginRight: letter === ' ' ? '0.25em' : '0' 
          }}
          whileHover={{ 
            scale: 1.1, 
          }}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </motion.h1>
  );
}
