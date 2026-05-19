import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../AppContext';

// Coder Avatar with typing hands animation
export const CoderAvatar = () => {
  return (
    <div className="relative w-8 h-8 flex items-center justify-center bg-zinc-100 dark:bg-zinc-800 rounded-full border border-black dark:border-zinc-700 overflow-hidden shadow-inner">
      <svg viewBox="0 0 64 64" className="w-6 h-6">
        <style>
          {`
            @keyframes typeLeft {
              0%, 100% { transform: translateY(0px) rotate(0deg); }
              50% { transform: translateY(-4px) rotate(-10deg); }
            }
            @keyframes typeRight {
              0%, 100% { transform: translateY(0px) rotate(0deg); }
              50% { transform: translateY(-3px) rotate(15deg); }
            }
            .hand-l { animation: typeLeft 0.25s infinite ease-in-out; transform-origin: 20px 48px; }
            .hand-r { animation: typeRight 0.2s infinite ease-in-out; transform-origin: 44px 48px; }
          `}
        </style>
        {/* Head */}
        <circle cx="32" cy="24" r="12" fill="#F43F5E" />
        {/* Hair / Cap */}
        <path d="M20 20c0-6 6-8 12-8s12 2 12 8S38 18 32 18s-12 2-12 2z" fill="#000" />
        {/* Glasses */}
        <rect x="23" y="22" width="8" height="5" rx="1" fill="none" stroke="#fff" strokeWidth="2" />
        <rect x="33" y="22" width="8" height="5" rx="1" fill="none" stroke="#fff" strokeWidth="2" />
        <line x1="31" y1="24" x2="33" y2="24" stroke="#fff" strokeWidth="2" />
        {/* Body */}
        <path d="M16 52c0-8 6-12 16-12s16 4 16 12z" fill="#3B82F6" />
        {/* Hands typing */}
        <circle cx="24" cy="46" r="4" fill="#F43F5E" className="hand-l" />
        <circle cx="40" cy="46" r="4" fill="#F43F5E" className="hand-r" />
      </svg>
    </div>
  );
};

// Sleeping Ghost with bobbing and Zzz floating particles
export const SleepingGhost = () => {
  return (
    <div className="relative flex items-center gap-1">
      <div className="w-8 h-8 flex items-center justify-center relative">
        <svg viewBox="0 0 64 64" className="w-6 h-6 animate-bounce" style={{ animationDuration: '3s' }}>
          <style>
            {`
              @keyframes sleepWiggle {
                0%, 100% { transform: translateY(0px) rotate(0deg); }
                50% { transform: translateY(-2px) rotate(3deg); }
              }
              .ghost-body { animation: sleepWiggle 2s infinite ease-in-out; }
            `}
          </style>
          {/* Ghost Shape */}
          <path
            d="M16 48c0-12 6-24 16-24s16 12 16 24c0 0-4-3-8-3s-4 3-8 3-4-3-8-3-8 3-8 3z"
            fill="#E2E8F0"
            className="ghost-body"
          />
          {/* Eyes closed */}
          <path d="M26 38c1-1 3-1 4 0" stroke="#475569" strokeWidth="2" fill="none" />
          <path d="M34 38c1-1 3-1 4 0" stroke="#475569" strokeWidth="2" fill="none" />
        </svg>
      </div>
      <div className="relative h-6 w-4">
        <style>
          {`
            @keyframes zFloat {
              0% { opacity: 0; transform: translate(0px, 10px) scale(0.5); }
              50% { opacity: 1; transform: translate(3px, -2px) scale(1); }
              100% { opacity: 0; transform: translate(6px, -15px) scale(0.8); }
            }
            .z1 { animation: zFloat 3s infinite ease-in-out; }
            .z2 { animation: zFloat 3s infinite ease-in-out; animation-delay: 1s; }
            .z3 { animation: zFloat 3s infinite ease-in-out; animation-delay: 2s; }
          `}
        </style>
        <span className="absolute text-[8px] font-bold text-slate-400 dark:text-zinc-500 z1">Z</span>
        <span className="absolute text-[10px] font-bold text-slate-400 dark:text-zinc-500 z2" style={{ left: '4px', top: '-4px' }}>Z</span>
        <span className="absolute text-[7px] font-bold text-slate-400 dark:text-zinc-500 z3" style={{ left: '8px', top: '-8px' }}>z</span>
      </div>
    </div>
  );
};

// Walking Ghosts that walk across the footer canvas horizontally and are fully interactive
export const WalkingGhosts = () => {
  const { language } = useApp();
  
  const [ghosts, setGhosts] = useState([
    {
      id: 1,
      name: 'MikroTik',
      color: '#10B981', // Emerald
      x: 15,
      direction: 'right',
      state: 'walking', // 'walking', 'sleeping'
      speed: 0.12,
      bubble: null,
      accessory: null,
      isBouncing: false,
      idleTime: 0,
      bubbleTimer: 0
    },
    {
      id: 2,
      name: 'React',
      color: '#3B82F6', // Blue
      x: 45,
      direction: 'left',
      state: 'walking',
      speed: 0.08,
      bubble: null,
      accessory: null,
      isBouncing: false,
      idleTime: 0,
      bubbleTimer: 0
    },
    {
      id: 3,
      name: 'Data Analyst',
      color: '#F43F5E', // Rose
      x: 75,
      direction: 'right',
      state: 'walking',
      speed: 0.10,
      bubble: null,
      accessory: null,
      isBouncing: false,
      idleTime: 0,
      bubbleTimer: 0
    }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setGhosts((prevGhosts) =>
        prevGhosts.map((ghost) => {
          if (ghost.state === 'sleeping') {
            const nextIdle = ghost.idleTime + 1;
            // 0.5% chance to wake up automatically after 8 seconds (200 ticks)
            if (nextIdle > 200 && Math.random() < 0.005) {
              return {
                ...ghost,
                state: 'walking',
                idleTime: 0,
                bubble: language === 'id' ? 'Hoam! 🥱' : 'Yawn! 🥱',
                bubbleTimer: 1
              };
            }
            return { ...ghost, idleTime: nextIdle };
          }

          // Walking logic
          let nextX = ghost.x + (ghost.direction === 'right' ? ghost.speed : -ghost.speed);
          let nextDir = ghost.direction;

          if (nextX >= 95) {
            nextX = 95;
            nextDir = 'left';
          } else if (nextX <= 5) {
            nextX = 5;
            nextDir = 'right';
          }

          const nextIdle = ghost.idleTime + 1;
          
          // Check sleep chance: if walking idle time exceeds 10 seconds (250 ticks)
          if (nextIdle > 250 && Math.random() < 0.005 && !ghost.bubble) {
            return {
              ...ghost,
              state: 'sleeping',
              idleTime: 0,
              x: nextX,
              direction: nextDir,
              bubbleTimer: 0
            };
          }

          // Handle speech bubble timing independently
          let nextBubble = ghost.bubble;
          let nextAccessory = ghost.accessory;
          let nextBubbleTimer = ghost.bubble ? (ghost.bubbleTimer || 0) + 1 : 0;

          if (ghost.bubble && nextBubbleTimer > 60) { // 60 ticks * 40ms = 2.4 seconds
            nextBubble = null;
            nextAccessory = null;
            nextBubbleTimer = 0;
          }

          return {
            ...ghost,
            x: nextX,
            direction: nextDir,
            idleTime: nextIdle,
            bubble: nextBubble,
            accessory: nextAccessory,
            bubbleTimer: nextBubbleTimer
          };
        })
      );
    }, 40); // ~25 fps

    return () => clearInterval(interval);
  }, [language]);

  const handleGhostClick = (id) => {
    setGhosts((prevGhosts) =>
      prevGhosts.map((ghost) => {
        if (ghost.id !== id) return ghost;

        // Trigger bounce
        const nextBounce = true;

        if (ghost.state === 'sleeping') {
          // Wake up!
          return {
            ...ghost,
            state: 'walking',
            isBouncing: nextBounce,
            idleTime: 0,
            bubble: language === 'id' ? 'Huh! Siapa itu? 😮' : 'Huh! Who is that? 😮',
            accessory: '🖐️',
            bubbleTimer: 1
          };
        }

        // Random interactive messages and icons based on ghost type
        let bubbleText = '';
        let acc = '';

        const rand = Math.random();
        if (ghost.name === 'MikroTik') {
          if (language === 'id') {
            if (rand < 0.25) { bubbleText = 'MikroTik RB4011 online! 📡'; acc = '⚡'; }
            else if (rand < 0.5) { bubbleText = 'PCC Load Balancing aktif! ⚖️'; acc = '📈'; }
            else if (rand < 0.75) { bubbleText = 'Ping lancar jaya: 8ms! ⚡'; acc = '✔️'; }
            else { bubbleText = 'Bandwidth aman terkendali! 📈'; acc = '🛡️'; }
          } else {
            if (rand < 0.25) { bubbleText = 'MikroTik RB4011 online! 📡'; acc = '⚡'; }
            else if (rand < 0.5) { bubbleText = 'PCC Load Balancing active! ⚖️'; acc = '📈'; }
            else if (rand < 0.75) { bubbleText = 'Ping stable: 8ms! ⚡'; acc = '✔️'; }
            else { bubbleText = 'Queue Tree bandwidth shaped! 📈'; acc = '🛡️'; }
          }
        } else if (ghost.name === 'React') {
          if (language === 'id') {
            if (rand < 0.25) { bubbleText = 'React 19 ngebut banget! ⚛️'; acc = '🚀'; }
            else if (rand < 0.5) { bubbleText = 'Framer Motion mulus pol! 🎢'; acc = '✨'; }
            else if (rand < 0.75) { bubbleText = 'Kode rapi, hati tenang! 💻'; acc = '✔️'; }
            else { bubbleText = 'Ayo buat website keren! 🚀'; acc = '🔥'; }
          } else {
            if (rand < 0.25) { bubbleText = 'React 19 is super fast! ⚛️'; acc = '🚀'; }
            else if (rand < 0.5) { bubbleText = 'Framer Motion is so smooth! 🎢'; acc = '✨'; }
            else if (rand < 0.75) { bubbleText = 'Clean code, happy life! 💻'; acc = '✔️'; }
            else { bubbleText = 'Let\'s build something cool! 🚀'; acc = '🔥'; }
          }
        } else if (ghost.name === 'Data Analyst') {
          if (language === 'id') {
            if (rand < 0.25) { bubbleText = 'Menganalisis basis data... 📊'; acc = '🔍'; }
            else if (rand < 0.5) { bubbleText = 'Akurasi data 99.9%! 🎯'; acc = '📈'; }
            else if (rand < 0.75) { bubbleText = 'Kueri SQL dioptimalkan! 🗄️'; acc = '✔️'; }
            else { bubbleText = 'Data entry selesai cepat! 📝'; acc = '✨'; }
          } else {
            if (rand < 0.25) { bubbleText = 'Analyzing database... 📊'; acc = '🔍'; }
            else if (rand < 0.5) { bubbleText = '99.9% Data Accuracy! 🎯'; acc = '📈'; }
            else if (rand < 0.75) { bubbleText = 'SQL query optimized! 🗄️'; acc = '✔️'; }
            else { bubbleText = 'Data entry completed! 📝'; acc = '✨'; }
          }
        }

        return {
          ...ghost,
          isBouncing: nextBounce,
          idleTime: 0, // Reset walking idle timer when clicked
          bubble: bubbleText,
          accessory: acc,
          bubbleTimer: 1
        };
      })
    );

    // Reset bounce state after animation runs
    setTimeout(() => {
      setGhosts((prevGhosts) =>
        prevGhosts.map((ghost) =>
          ghost.id === id ? { ...ghost, isBouncing: false } : ghost
        )
      );
    }, 500);
  };

  return (
    <div className="relative w-full h-16 border-t-2 border-dashed border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 flex items-center transition-colors">
      <style>
        {`
          @keyframes wiggleLegs {
            0%, 100% { d: path("M16 48c0-12 6-24 16-24s16 12 16 24c0 0-4-3-8-3s-4 3-8 3-4-3-8-3-8 3-8 3z"); }
            50% { d: path("M16 48c0-12 6-24 16-24s16 12 16 24c0 0-4 1-8 1s-4-4-8-4-4 4-8 4-8-1-8-1z"); }
          }
          .ghost-legs {
            animation: wiggleLegs 0.25s infinite ease-in-out;
          }
        `}
      </style>

      {ghosts.map((ghost) => {
        const isFlipped = ghost.direction === 'left';
        
        return (
          <motion.div
            key={ghost.id}
            className="absolute cursor-pointer select-none flex flex-col items-center z-10"
            style={{ left: `${ghost.x}%` }}
            animate={{ 
              y: ghost.isBouncing ? -24 : 0
            }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 15 
            }}
            onClick={() => handleGhostClick(ghost.id)}
          >
            {/* Interactive Speech Bubble */}
            <AnimatePresence>
              {ghost.bubble && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: 10 }}
                  className="absolute -top-14 bg-white dark:bg-zinc-900 border-2 border-black dark:border-zinc-700 text-black dark:text-white px-2.5 py-1 rounded-xl text-[9px] font-black font-mono shadow-md whitespace-nowrap z-25 flex items-center gap-1"
                >
                  <span>{ghost.bubble}</span>
                  {/* Bubble arrow */}
                  <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2 h-2 bg-white dark:bg-zinc-900 border-r-2 border-b-2 border-black dark:border-zinc-700 rotate-45" />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Accessory Badge */}
            <AnimatePresence>
              {ghost.accessory && (
                <motion.div
                  initial={{ scale: 0, y: 10 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-20 -right-2 bg-amber-400 text-black border-2 border-black rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-black shadow-md z-30"
                >
                  {ghost.accessory}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Sleeping indicator */}
            {ghost.state === 'sleeping' && (
              <div 
                className="absolute -top-8 bg-white dark:bg-zinc-900 border-2 border-black dark:border-zinc-700 px-1.5 py-0.5 rounded-lg text-[8px] font-black font-mono shadow flex gap-0.5 items-center z-20"
              >
                <span>Z</span>
                <span className="animate-bounce" style={{ animationDelay: '0s' }}>z</span>
                <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>z</span>
              </div>
            )}

            {/* Visual Mascot rendering */}
            <div className="flex items-center gap-1.5">
              <svg 
                viewBox="0 0 64 64" 
                className="w-8 h-8 drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)]"
                style={{ transform: isFlipped ? 'scaleX(-1)' : 'none', transition: 'transform 0.2s ease-in-out' }}
              >
                <path className="ghost-legs" fill={ghost.color} />
                <circle cx="26" cy="34" r="3" fill="#fff" />
                <circle cx="28" cy="34" r="1.5" fill="#000" />
                <circle cx="38" cy="34" r="3" fill="#fff" />
                <circle cx="40" cy="34" r="1.5" fill="#000" />
              </svg>
              
              {/* Skill Pill Label */}
              <span 
                className="text-white font-mono text-[8px] font-black px-2 py-0.5 rounded-md border-2 border-black shadow-sm"
                style={{ 
                  backgroundColor: ghost.color
                }}
              >
                {ghost.name}
              </span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};
