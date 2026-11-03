import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import { Router, Network, Server, BarChart3, Globe, Code2 } from 'lucide-react';
import { useApp } from '../AppContext';

const badgeThemes = {
  emerald: {
    border: 'border-emerald-500/40 hover:border-emerald-400',
    iconBox: 'bg-emerald-500/15 text-emerald-500 dark:text-emerald-400',
    dot: 'bg-emerald-500',
    ping: 'bg-emerald-400',
    glow: 'hover:shadow-[0_0_25px_rgba(16,185,129,0.45)]',
  },
  blue: {
    border: 'border-sky-500/40 hover:border-sky-400',
    iconBox: 'bg-sky-500/15 text-sky-500 dark:text-sky-400',
    dot: 'bg-sky-500',
    ping: 'bg-sky-400',
    glow: 'hover:shadow-[0_0_25px_rgba(14,165,233,0.45)]',
  },
  amber: {
    border: 'border-amber-500/40 hover:border-amber-400',
    iconBox: 'bg-amber-500/15 text-amber-500 dark:text-amber-400',
    dot: 'bg-amber-500',
    ping: 'bg-amber-400',
    glow: 'hover:shadow-[0_0_25px_rgba(245,158,11,0.45)]',
  },
  rose: {
    border: 'border-rose-500/40 hover:border-rose-400',
    iconBox: 'bg-rose-500/15 text-rose-500 dark:text-rose-400',
    dot: 'bg-rose-500',
    ping: 'bg-rose-400',
    glow: 'hover:shadow-[0_0_25px_rgba(244,63,94,0.45)]',
  },
  purple: {
    border: 'border-purple-500/40 hover:border-purple-400',
    iconBox: 'bg-purple-500/15 text-purple-500 dark:text-purple-400',
    dot: 'bg-purple-500',
    ping: 'bg-purple-400',
    glow: 'hover:shadow-[0_0_25px_rgba(168,85,247,0.45)]',
  },
  orange: {
    border: 'border-orange-500/40 hover:border-orange-400',
    iconBox: 'bg-orange-500/15 text-orange-500 dark:text-orange-400',
    dot: 'bg-orange-500',
    ping: 'bg-orange-400',
    glow: 'hover:shadow-[0_0_25px_rgba(249,115,22,0.45)]',
  },
};

function OrbitalChip({ icon: Icon, label, color, onHoverStart, onHoverEnd }) {
  const theme = badgeThemes[color] || badgeThemes.emerald;

  return (
    <motion.div
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
      whileHover={{ scale: 1.15, y: -3 }}
      whileTap={{ scale: 0.95 }}
      className={`flex items-center gap-2.5 px-3.5 py-1.5 rounded-2xl select-none backdrop-blur-md bg-white/90 dark:bg-zinc-950/90 border-2 transition-all duration-300 shadow-md cursor-pointer ${theme.border} ${theme.glow}`}
    >
      {/* Tech Icon Container */}
      <div className={`p-1.5 rounded-xl border border-black/5 dark:border-white/10 ${theme.iconBox}`}>
        <Icon size={14} className="stroke-[2.5]" />
      </div>

      {/* Pulsing Status LED */}
      <span className="relative flex h-2 w-2">
        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${theme.ping}`} />
        <span className={`relative inline-flex rounded-full h-2 w-2 ${theme.dot}`} />
      </span>

      {/* Chip Name */}
      <span className="font-mono text-[11px] font-black uppercase tracking-wider text-zinc-900 dark:text-zinc-100 whitespace-nowrap">
        {label}
      </span>
    </motion.div>
  );
}

export default function TechOrbit() {
  const { t } = useApp();
  const isPausedRef = useRef(false);

  // Dynamic responsive radius that strictly guarantees clearance from center title & buttons
  const [radii, setRadii] = useState({ rx: 520, ry: 215 });

  const badges = [
    { icon: Router, label: t.hero.pills[0], color: 'emerald' },      // MikroTik
    { icon: Network, label: t.hero.pills[1], color: 'blue' },         // Networking
    { icon: Server, label: t.hero.pills[2], color: 'amber' },        // IT Support
    { icon: BarChart3, label: t.hero.pills[3], color: 'rose' },      // Data Analysis
    { icon: Globe, label: t.hero.pills[4], color: 'purple' },        // WordPress
    { icon: Code2, label: t.hero.pills[5], color: 'orange' },        // Laravel
  ];

  // Motion values for all 6 chips
  const motionValues = useRef(
    badges.map(() => ({
      x: useMotionValue(0),
      y: useMotionValue(0),
    }))
  ).current;

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      // Rx must be >= 510 to stay safely outside "YANUAR RAMADHIAN S."
      const safeRx = Math.max(510, Math.min(w * 0.42, 600));
      // Ry must be >= 210 to stay safely outside CTA buttons and top tag
      const safeRy = Math.max(210, Math.min(h * 0.32, 245));
      setRadii({ rx: safeRx, ry: safeRy });
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    let animId;
    let currentAngle = 0;
    let lastTime = performance.now();

    const tick = (currentTime) => {
      const delta = currentTime - lastTime;
      lastTime = currentTime;

      if (!isPausedRef.current) {
        // Smooth continuous 60s full revolution
        currentAngle = (currentAngle + delta * 0.0001) % (Math.PI * 2);

        // Update all 6 badges evenly spaced (60deg / Math.PI/3 apart)
        badges.forEach((_, i) => {
          const itemAngle = currentAngle + (i * Math.PI) / 3;
          motionValues[i].x.set(radii.rx * Math.cos(itemAngle));
          motionValues[i].y.set(radii.ry * Math.sin(itemAngle));
        });
      }

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [radii]);

  const handleHoverStart = () => {
    isPausedRef.current = true;
  };

  const handleHoverEnd = () => {
    isPausedRef.current = false;
  };

  return (
    <div className="absolute inset-0 z-10 pointer-events-none hidden md:flex items-center justify-center overflow-hidden">
      {/* Ambient Core Cosmic Glow */}
      <div className="absolute w-[500px] h-[300px] rounded-full bg-emerald-500/5 dark:bg-emerald-500/10 blur-3xl pointer-events-none" />

      {/* SVG ORBITAL PATH */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ overflow: 'visible' }}
      >
        <ellipse
          cx="50%"
          cy="50%"
          rx={radii.rx}
          ry={radii.ry}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="6 8"
          className="text-emerald-500/25 dark:text-emerald-400/20"
        />
      </svg>

      {/* 6 UNIFIED EVENLY SPACED ORBITAL CHIPS */}
      {badges.map((badge, idx) => (
        <motion.div
          key={idx}
          style={{ x: motionValues[idx].x, y: motionValues[idx].y }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
        >
          <OrbitalChip
            icon={badge.icon}
            label={badge.label}
            color={badge.color}
            onHoverStart={handleHoverStart}
            onHoverEnd={handleHoverEnd}
          />
        </motion.div>
      ))}
    </div>
  );
}
