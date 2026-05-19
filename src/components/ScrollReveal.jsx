import React from 'react';
import { motion } from 'framer-motion';

export default function ScrollReveal({ children, delay = 0, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        type: "spring", 
        stiffness: 100, 
        damping: 20,
        delay: delay
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
