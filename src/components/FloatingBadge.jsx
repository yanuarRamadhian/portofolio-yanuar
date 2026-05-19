import React from 'react';
import { motion } from 'framer-motion';

const FloatingBadge = ({ children, className = '', style = {} }) => {
  return (
    <motion.div
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.4}
      dragTransition={{ bounceStiffness: 400, bounceDamping: 15 }}
      whileHover={{ scale: 1.1, cursor: 'grab' }}
      whileTap={{ scale: 0.95, cursor: 'grabbing' }}
      animate={{
        y: [0, -10, 0],
      }}
      transition={{
        duration: 3 + Math.random() * 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={`absolute px-4 py-2 rounded-full font-bold text-xs uppercase tracking-wider select-none shadow-md z-20 cursor-grab ${className}`}
      style={style}
    >
      {children}
    </motion.div>
  );
};

export default FloatingBadge;
