import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isPointer, setIsPointer] = useState(false);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 400, mass: 0.2 };
  const ringSpringConfig = { damping: 30, stiffness: 300, mass: 0.5 };
  
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);
  
  const ringXSpring = useSpring(cursorX, ringSpringConfig);
  const ringYSpring = useSpring(cursorY, ringSpringConfig);
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      
      const el = document.elementFromPoint(e.clientX, e.clientY);
      if (el) {
        const computedStyle = window.getComputedStyle(el);
        const clickable = 
          computedStyle.cursor === 'pointer' || 
          computedStyle.cursor === 'zoom-in' ||
          el.tagName.toLowerCase() === 'button' || 
          el.tagName.toLowerCase() === 'a' ||
          el.closest('button') || 
          el.closest('a');
        setIsPointer(!!clickable);
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [cursorX, cursorY]);
  
  return (
    <>
      {/* Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2.5 h-2.5 bg-emerald-500 rounded-full pointer-events-none z-[9999] hidden md:block shadow-[0_0_10px_rgba(16,185,129,0.8)]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isPointer ? 0.5 : 1
        }}
      />
      {/* Ring */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 border-2 border-black dark:border-white rounded-full pointer-events-none z-[9998] hidden md:block"
        style={{
          x: ringXSpring,
          y: ringYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isPointer ? 1.5 : 1,
          backgroundColor: isPointer ? 'rgba(16, 185, 129, 0.15)' : 'transparent',
          borderColor: isPointer ? 'rgba(16, 185, 129, 0.8)' : 'rgba(0, 0, 0, 0.3)' // Uses dark theme dynamically via index.css if possible, but hardcoded fallback is fine. Let's use currentColor equivalent or fixed.
        }}
      />
    </>
  );
}
