import React from 'react';
import { motion } from 'framer-motion';

const colorThemes = {
  emerald: {
    border: 'border-emerald-500/30 hover:border-emerald-400',
    iconBox: 'bg-emerald-500/15 text-emerald-500 dark:text-emerald-400',
    dot: 'bg-emerald-500',
    ping: 'bg-emerald-400',
    glow: 'hover:shadow-[0_0_25px_rgba(16,185,129,0.3)]',
  },
  blue: {
    border: 'border-sky-500/30 hover:border-sky-400',
    iconBox: 'bg-sky-500/15 text-sky-500 dark:text-sky-400',
    dot: 'bg-sky-500',
    ping: 'bg-sky-400',
    glow: 'hover:shadow-[0_0_25px_rgba(14,165,233,0.3)]',
  },
  amber: {
    border: 'border-amber-500/30 hover:border-amber-400',
    iconBox: 'bg-amber-500/15 text-amber-500 dark:text-amber-400',
    dot: 'bg-amber-500',
    ping: 'bg-amber-400',
    glow: 'hover:shadow-[0_0_25px_rgba(245,158,11,0.3)]',
  },
  rose: {
    border: 'border-rose-500/30 hover:border-rose-400',
    iconBox: 'bg-rose-500/15 text-rose-500 dark:text-rose-400',
    dot: 'bg-rose-500',
    ping: 'bg-rose-400',
    glow: 'hover:shadow-[0_0_25px_rgba(244,63,94,0.3)]',
  },
  purple: {
    border: 'border-purple-500/30 hover:border-purple-400',
    iconBox: 'bg-purple-500/15 text-purple-500 dark:text-purple-400',
    dot: 'bg-purple-500',
    ping: 'bg-purple-400',
    glow: 'hover:shadow-[0_0_25px_rgba(168,85,247,0.3)]',
  },
  orange: {
    border: 'border-orange-500/30 hover:border-orange-400',
    iconBox: 'bg-orange-500/15 text-orange-500 dark:text-orange-400',
    dot: 'bg-orange-500',
    ping: 'bg-orange-400',
    glow: 'hover:shadow-[0_0_25px_rgba(249,115,22,0.3)]',
  },
};

const FloatingBadge = ({
  children,
  icon: Icon,
  label,
  color = 'emerald',
  className = '',
  style = {},
  duration = 4,
  delay = 0,
}) => {
  const theme = colorThemes[color] || colorThemes.emerald;
  const content = label || children;

  return (
    <motion.div
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.35}
      dragTransition={{ bounceStiffness: 350, bounceDamping: 18 }}
      whileHover={{ scale: 1.08, y: -4, cursor: 'grab' }}
      whileTap={{ scale: 0.95, cursor: 'grabbing' }}
      animate={{
        y: [0, -10, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      className={`absolute pointer-events-auto flex items-center gap-2.5 px-3.5 py-2 rounded-2xl select-none backdrop-blur-md bg-white/80 dark:bg-zinc-950/80 border-2 transition-all duration-300 shadow-md ${theme.border} ${theme.glow} ${className}`}
      style={style}
    >
      {/* Icon Capsule */}
      {Icon && (
        <div className={`p-1.5 rounded-xl border border-black/5 dark:border-white/10 ${theme.iconBox}`}>
          <Icon size={14} className="stroke-[2.5]" />
        </div>
      )}

      {/* Pulsing Status LED */}
      <span className="relative flex h-2 w-2">
        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${theme.ping}`} />
        <span className={`relative inline-flex rounded-full h-2 w-2 ${theme.dot}`} />
      </span>

      {/* Label */}
      <span className="font-mono text-[11px] font-black uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
        {content}
      </span>
    </motion.div>
  );
};

export default FloatingBadge;
