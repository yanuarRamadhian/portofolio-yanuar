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

// Walking Pac-Man & Glitch Bugs: Concept 3 - Cyberpunk IT Network Optimizer
export const WalkingGhosts = () => {
  const { language } = useApp();

  // Network metrics
  const [packetsProcessed, setPacketsProcessed] = useState(4820);
  const [bandwidthGbps, setBandwidthGbps] = useState(1.2);
  const [isOverclocked, setIsOverclocked] = useState(false);
  const [overclockTimer, setOverclockTimer] = useState(0);

  // Network flow phase: 'normal' (glitches disrupt network) | 'overclock' (optimizer patches glitches)
  const [networkPhase, setNetworkPhase] = useState('normal');

  // Pac-Man (Cyber Network Optimizer Bot)
  const [optimizer, setOptimizer] = useState({
    x: 40,
    direction: 'right',
    bubble: null,
    bubbleTimer: 0,
    isBouncing: false,
  });

  // Fiber Optic Data Packets along the floor
  const initialPackets = Array.from({ length: 24 }, (_, i) => ({
    id: i,
    x: 4 + i * 4,
    type: i % 2 === 0 ? '1' : '0',
    isFiberNode: i === 2 || i === 21,
    eaten: false,
  }));
  const [packets, setPackets] = useState(initialPackets);

  // Floating network diagnostic log pops
  const [networkLogs, setNetworkLogs] = useState([]);

  // Glitch Bugs (The System Obstacles)
  const [glitchBugs, setGlitchBugs] = useState([
    {
      id: 1,
      name: 'Packet Loss',
      label: 'PACKET LOSS',
      color: '#EF4444', // Red
      x: 12,
      direction: 'right',
      state: 'active', // 'active' | 'resolved' | 'patched'
      speed: 0.14,
      bubble: null,
      bubbleTimer: 0,
      isBouncing: false,
    },
    {
      id: 2,
      name: 'High Latency',
      label: 'HIGH PING',
      color: '#3B82F6', // Blue
      x: 22,
      direction: 'right',
      state: 'active',
      speed: 0.12,
      bubble: null,
      bubbleTimer: 0,
      isBouncing: false,
    },
    {
      id: 3,
      name: 'Memory Leak',
      label: 'MEM LEAK',
      color: '#A855F7', // Purple
      x: 32,
      direction: 'right',
      state: 'active',
      speed: 0.15,
      bubble: null,
      bubbleTimer: 0,
      isBouncing: false,
    },
  ]);

  // Overclock timer countdown
  useEffect(() => {
    if (overclockTimer > 0) {
      const timer = setTimeout(() => {
        setOverclockTimer((t) => t - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (overclockTimer === 0 && isOverclocked) {
      setIsOverclocked(false);
      setNetworkPhase('normal');
      setBandwidthGbps(1.2);
    }
  }, [overclockTimer, isOverclocked]);

  // Main network simulation loop (25 fps)
  useEffect(() => {
    const loop = setInterval(() => {
      // 1. Move Network Optimizer Bot
      setOptimizer((prev) => {
        let nextX = prev.x;
        let nextDir = prev.direction;
        let nextBubble = prev.bubble;
        let nextBubbleTimer = prev.bubble ? prev.bubbleTimer + 1 : 0;

        if (prev.bubble && nextBubbleTimer > 50) {
          nextBubble = null;
          nextBubbleTimer = 0;
        }

        if (networkPhase === 'normal') {
          nextDir = 'right';
          nextX += 0.22;

          // Reached end of line: captures 10G Fiber node!
          if (nextX >= 94) {
            nextX = 94;
            setNetworkPhase('overclock');
            setIsOverclocked(true);
            setOverclockTimer(10);
            setBandwidthGbps(10.0);
            nextBubble = '🚀 10G FIBER OVERCLOCK!';
            nextBubbleTimer = 1;

            // Turn bugs into resolved state!
            setGlitchBugs((prevBugs) =>
              prevBugs.map((bug) => ({
                ...bug,
                state: 'resolved',
                direction: 'left',
                bubble: 'PATCH INCOMING! ⚠️',
                bubbleTimer: 1,
              }))
            );
          }
        } else {
          // Overclock Phase: Optimizer sweeps back left, patching all bugs
          nextDir = 'left';
          nextX -= 0.28;

          if (nextX <= 6) {
            nextX = 6;
            setNetworkPhase('normal');
            setIsOverclocked(false);
            setBandwidthGbps(1.2);
            // Respawn packets
            setPackets(initialPackets);
            // Reset bugs to active
            setGlitchBugs((prevBugs, idx) =>
              prevBugs.map((b, i) => ({
                ...b,
                state: 'active',
                direction: 'right',
                x: 6 + i * 9,
                bubble: null,
                bubbleTimer: 0,
              }))
            );
          }
        }

        return {
          ...prev,
          x: nextX,
          direction: nextDir,
          bubble: nextBubble,
          bubbleTimer: nextBubbleTimer,
        };
      });

      // 2. Move Glitch Bugs
      setGlitchBugs((prevBugs) =>
        prevBugs.map((bug) => {
          let nextX = bug.x;
          let nextState = bug.state;
          let nextDir = bug.direction;
          let nextBubble = bug.bubble;
          let nextBubbleTimer = bug.bubble ? bug.bubbleTimer + 1 : 0;

          if (bug.bubble && nextBubbleTimer > 50) {
            nextBubble = null;
            nextBubbleTimer = 0;
          }

          if (networkPhase === 'normal') {
            nextDir = 'right';
            nextX += 0.22;
          } else {
            // Bugs flee left from optimizer
            nextDir = 'left';
            nextX -= nextState === 'patched' ? 0.45 : 0.2;
            if (nextX <= 4) nextX = 4;
          }

          return {
            ...bug,
            x: nextX,
            direction: nextDir,
            state: nextState,
            bubble: nextBubble,
            bubbleTimer: nextBubbleTimer,
          };
        })
      );

      // 3. Process Data Packets
      setPackets((prevPackets) =>
        prevPackets.map((p) => {
          if (!p.eaten && Math.abs(p.x - optimizer.x) < 2.5) {
            setPacketsProcessed((count) => count + (p.isFiberNode ? 50 : 1));
            return { ...p, eaten: true };
          }
          return p;
        })
      );

      // 4. Optimizer patches a resolved bug!
      if (networkPhase === 'overclock') {
        setGlitchBugs((prevBugs) =>
          prevBugs.map((bug) => {
            if (bug.state === 'resolved' && Math.abs(bug.x - optimizer.x) < 3.2) {
              setPacketsProcessed((count) => count + 100);
              const logText =
                bug.name === 'Packet Loss'
                  ? '🛡️ Zero Packet Loss!'
                  : bug.name === 'High Latency'
                  ? '⚡ Ping 1ms Fixed!'
                  : '🧹 RAM Leak Cleared!';

              setNetworkLogs((logs) => [
                ...logs,
                { id: Date.now() + Math.random(), x: bug.x, text: logText },
              ]);

              return {
                ...bug,
                state: 'patched',
                bubble: 'PATCHED ✔️',
                bubbleTimer: 1,
              };
            }
            return bug;
          })
        );
      }
    }, 40);

    return () => clearInterval(loop);
  }, [networkPhase, optimizer.x]);

  // Clean network logs after 1.5s
  useEffect(() => {
    if (networkLogs.length > 0) {
      const timeout = setTimeout(() => {
        setNetworkLogs((logs) => logs.slice(1));
      }, 1500);
      return () => clearTimeout(timeout);
    }
  }, [networkLogs]);

  // Click on the track to inject a Ping Test ⚡
  const handleTrackClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = ((e.clientX - rect.left) / rect.width) * 100;

    setPacketsProcessed((c) => c + 25);
    setNetworkLogs((logs) => [
      ...logs,
      { id: Date.now(), x: clickX, text: '📡 PING 8ms OK' },
    ]);
  };

  // Click on Optimizer Bot
  const handleOptimizerClick = () => {
    setOptimizer((prev) => ({
      ...prev,
      isBouncing: true,
      bubble:
        language === 'id'
          ? 'Netwatch: 100% Link Uptime! 🟢'
          : 'Netwatch: 100% Link Uptime! 🟢',
      bubbleTimer: 1,
    }));
    setTimeout(() => {
      setOptimizer((prev) => ({ ...prev, isBouncing: false }));
    }, 500);
  };

  // Click on a Bug for diagnostic hotfix
  const handleBugClick = (id) => {
    setGlitchBugs((prev) =>
      prev.map((b) => {
        if (b.id !== id) return b;
        let text = '';
        if (b.name === 'Packet Loss') {
          text = 'PCC Rule: Traffic rerouted! ⚖️';
        } else if (b.name === 'High Latency') {
          text = 'Queue Tree QoS active! 📈';
        } else {
          text = 'SQL Index re-optimized! 💾';
        }
        return {
          ...b,
          isBouncing: true,
          bubble: text,
          bubbleTimer: 1,
        };
      })
    );
    setTimeout(() => {
      setGlitchBugs((prev) =>
        prev.map((b) => (b.id === id ? { ...b, isBouncing: false } : b))
      );
    }, 500);
  };

  return (
    <div
      onClick={handleTrackClick}
      className="relative w-full h-20 border-t-2 border-emerald-500/40 dark:border-emerald-500/30 bg-zinc-950 font-mono flex items-center overflow-hidden transition-colors cursor-crosshair select-none"
      title="Click anywhere to inject Ping Test 📡"
    >
      {/* Laser Fiber Glow Track */}
      <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-gradient-to-r from-emerald-500/30 via-emerald-400 to-sky-500/30 shadow-[0_0_8px_#10b981]" />

      {/* Cyberpunk CSS animations */}
      <style>
        {`
          @keyframes chompUpper {
            0%, 100% { transform: rotate(0deg); }
            50% { transform: rotate(-35deg); }
          }
          @keyframes chompLower {
            0%, 100% { transform: rotate(0deg); }
            50% { transform: rotate(35deg); }
          }
          .cyber-upper {
            animation: chompUpper 0.16s infinite ease-in-out;
            transform-origin: 32px 32px;
          }
          .cyber-lower {
            animation: chompLower 0.16s infinite ease-in-out;
            transform-origin: 32px 32px;
          }
          @keyframes glitchJitter {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-2px); }
          }
          .bug-glitch {
            animation: glitchJitter 0.2s infinite ease-in-out;
          }
        `}
      </style>

      {/* Terminal HUD System Console */}
      <div className="absolute top-1.5 left-4 right-4 z-20 flex items-center justify-between font-mono text-[9px] font-black tracking-widest pointer-events-none">
        <div className="flex items-center gap-3">
          <span className="text-emerald-400 flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            NETWATCH: ONLINE
          </span>
          <span className="text-zinc-400 hidden sm:inline">
            BANDWIDTH: <span className="text-yellow-400 font-bold">{bandwidthGbps.toFixed(1)} Gbps</span>
          </span>
          <span className="text-zinc-500 hidden md:inline">
            PACKETS: {String(packetsProcessed).padStart(5, '0')}
          </span>
        </div>

        <div className="text-[8px] uppercase tracking-wider px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400">
          {networkPhase === 'normal' ? '🟢 NORMAL TRAFFIC' : '⚡ OVERCLOCK ACTIVE'}
        </div>
      </div>

      {/* Floating Network Diagnostic Toasts */}
      {networkLogs.map((log) => (
        <motion.div
          key={log.id}
          initial={{ opacity: 1, y: 0, scale: 0.8 }}
          animate={{ opacity: 0, y: -26, scale: 1.2 }}
          transition={{ duration: 1.2 }}
          className="absolute font-mono text-[9px] font-black text-emerald-300 bg-zinc-900/90 border border-emerald-500/40 px-2 py-0.5 rounded shadow-[0_0_10px_rgba(16,185,129,0.3)] z-35 pointer-events-none whitespace-nowrap"
          style={{ left: `${log.x}%`, top: '15%' }}
        >
          {log.text}
        </motion.div>
      ))}

      {/* Fiber Optic Binary / TCP Packets */}
      {packets.map((p) => {
        if (p.eaten) return null;
        return (
          <div
            key={p.id}
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 pointer-events-none font-mono"
            style={{ left: `${p.x}%` }}
          >
            {p.isFiberNode ? (
              <span className="relative flex items-center justify-center">
                <span className="animate-ping absolute inline-flex h-4 w-4 rounded-full bg-cyan-400 opacity-60" />
                <span className="text-[8px] font-black bg-cyan-500 text-black px-1 rounded shadow-[0_0_10px_#06b6d4]">
                  10G
                </span>
              </span>
            ) : (
              <span className="text-[8px] font-bold text-emerald-400/70 select-none shadow-[0_0_4px_rgba(16,185,129,0.8)]">
                {p.type}
              </span>
            )}
          </div>
        );
      })}

      {/* NETWORK OPTIMIZER (Cyber Pac-Bot) */}
      <motion.div
        onClick={(e) => {
          e.stopPropagation();
          handleOptimizerClick();
        }}
        className={`absolute cursor-pointer select-none flex flex-col items-center z-25 transition-all ${
          isOverclocked
            ? 'filter drop-shadow-[0_0_12px_rgba(16,185,129,0.9)]'
            : 'filter drop-shadow-[0_0_8px_rgba(250,204,21,0.6)]'
        }`}
        style={{ left: `${optimizer.x}%` }}
        animate={{ y: optimizer.isBouncing ? -20 : 0 }}
        transition={{ type: 'spring', stiffness: 350, damping: 15 }}
      >
        {/* Diagnostic Bubble */}
        <AnimatePresence>
          {optimizer.bubble && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 10 }}
              className="absolute -top-12 bg-emerald-400 text-black border-2 border-black px-2 py-0.5 rounded-xl text-[9px] font-black font-mono shadow-md whitespace-nowrap z-30"
            >
              <span>{optimizer.bubble}</span>
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-emerald-400 border-r-2 border-b-2 border-black rotate-45" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Vector Cyber Pac-Bot */}
        <div
          className="transition-transform duration-200"
          style={{
            transform: optimizer.direction === 'left' ? 'scaleX(-1)' : 'scaleX(1)',
          }}
        >
          <svg viewBox="0 0 64 64" className="w-8 h-8">
            {/* Upper Jaw with Circuit Visor */}
            <path
              d="M32 32 L56 32 A24 24 0 0 0 8 32 Z"
              fill={isOverclocked ? '#10B981' : '#FACC15'}
              className="cyber-upper"
            />
            {/* Lower Jaw */}
            <path
              d="M32 32 L8 32 A24 24 0 0 0 56 32 Z"
              fill={isOverclocked ? '#10B981' : '#FACC15'}
              className="cyber-lower"
            />
            {/* Cyber Visor Eye */}
            <rect x="24" y="16" width="8" height="3" rx="1.5" fill="#000" />
            <rect x="25" y="16.5" width="6" height="2" rx="1" fill="#06B6D4" />
          </svg>
        </div>
      </motion.div>

      {/* GLITCH BUGS SQUAD */}
      {glitchBugs.map((bug) => {
        const isFlipped = bug.direction === 'left';
        const isResolved = bug.state === 'resolved';
        const isPatched = bug.state === 'patched';

        return (
          <motion.div
            key={bug.id}
            onClick={(e) => {
              e.stopPropagation();
              handleBugClick(bug.id);
            }}
            className="absolute cursor-pointer select-none flex flex-col items-center z-20"
            style={{ left: `${bug.x}%` }}
            animate={{ y: bug.isBouncing ? -20 : 0 }}
            transition={{ type: 'spring', stiffness: 350, damping: 15 }}
          >
            {/* Bug Speech Bubble */}
            <AnimatePresence>
              {bug.bubble && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: 10 }}
                  className="absolute -top-12 bg-zinc-900 border-2 border-zinc-700 text-white px-2 py-0.5 rounded-xl text-[9px] font-black font-mono shadow-md whitespace-nowrap z-30"
                >
                  <span>{bug.bubble}</span>
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-zinc-900 border-r-2 border-b-2 border-zinc-700 rotate-45" />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Bug Mascot Rendering */}
            <div className="flex items-center gap-1.5">
              <svg
                viewBox="0 0 64 64"
                className="w-8 h-8 drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)] bug-glitch"
                style={{
                  transform: isFlipped ? 'scaleX(-1)' : 'none',
                  transition: 'transform 0.2s ease-in-out',
                }}
              >
                {!isPatched && (
                  <path
                    d="M16 48c0-12 6-24 16-24s16 12 16 24c0 0-4-3-8-3s-4 3-8 3-4-3-8-3-8 3-8 3z"
                    fill={isResolved ? '#059669' : bug.color}
                  />
                )}

                {/* Bug Face Eyes */}
                {isResolved ? (
                  // Resolved Green Face
                  <>
                    <circle cx="26" cy="32" r="3" fill="#fff" />
                    <circle cx="26" cy="32" r="1.5" fill="#10B981" />
                    <circle cx="38" cy="32" r="3" fill="#fff" />
                    <circle cx="38" cy="32" r="1.5" fill="#10B981" />
                    <path d="M25 40 Q32 44 39 40" stroke="#fff" strokeWidth="2" fill="none" />
                  </>
                ) : (
                  // Glitch Bug Eyes
                  <>
                    <rect x="22" y="31" width="8" height="6" fill="#000" />
                    <rect x="24" y="32" width="4" height="4" fill="#fff" />
                    <rect x="34" y="31" width="8" height="6" fill="#000" />
                    <rect x="36" y="32" width="4" height="4" fill="#fff" />
                  </>
                )}
              </svg>

              {/* Bug Label Badge */}
              {!isPatched && (
                <span
                  className="text-white font-mono text-[8px] font-black px-2 py-0.5 rounded border border-black shadow transition-colors"
                  style={{
                    backgroundColor: isResolved ? '#059669' : bug.color,
                  }}
                >
                  {isResolved ? 'RESOLVED' : bug.label}
                </span>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};



