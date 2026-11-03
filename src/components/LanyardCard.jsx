import React, { useEffect, useRef, useState } from 'react';
import { RotateCw, Maximize2, ShieldCheck, Cpu, Wifi, Lock } from 'lucide-react';
import profileImg from '../assets/profile.jpeg';

export default function LanyardCard({ onZoomPhoto, language }) {
  const containerRef = useRef(null);
  const svgPathRef = useRef(null);
  const svgStitchRef = useRef(null);
  const clipGroupRef = useRef(null);
  const cardWrapperRef = useRef(null);
  const cardInnerRef = useRef(null);
  const glareRef = useRef(null);

  const [isDragging, setIsDragging] = useState(false);

  // Physics state stored in ref for 60fps zero-re-render performance
  const phys = useRef({
    // Rope nodes (Verlet integration)
    nodes: [],
    numNodes: 16,
    segmentLen: 8.5,
    anchorX: 500,
    anchorY: 0,

    // Card position offset from rest
    cardX: 500,
    cardY: 136,
    vx: 0,
    vy: 0,

    // 3D Rotation angles (degrees)
    rotX: 0,
    rotY: 0,
    rotZ: 0,
    vRotX: 0,
    vRotY: 0,
    vRotZ: 0,
    targetRotYBase: 0, // Increments by 180 or 360 for full 360 spins

    // Drag interaction tracking
    dragging: false,
    lastPointerX: 0,
    lastPointerY: 0,
    pointerOffsetX: 0,
    pointerOffsetY: 0,
  });

  // Initialize rope nodes
  useEffect(() => {
    const p = phys.current;
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      p.anchorX = rect.width / 2;
      p.cardX = rect.width / 2;
    }
    p.nodes = [];
    for (let i = 0; i < p.numNodes; i++) {
      p.nodes.push({
        x: p.anchorX,
        y: i * p.segmentLen,
        oldX: p.anchorX,
        oldY: i * p.segmentLen,
      });
    }
  }, []);

  // Main 60FPS Physics & 3D Transform Loop
  useEffect(() => {
    let animId;

    const updatePhysics = () => {
      const p = phys.current;
      const container = containerRef.current;
      if (container) {
        const rect = container.getBoundingClientRect();
        p.anchorX = rect.width / 2;
      }

      const restX = p.anchorX;
      const restY = p.numNodes * p.segmentLen;

      if (!p.dragging) {
        // Spring force pulling card back to equilibrium below anchor
        const dx = restX - p.cardX;
        const dy = restY - p.cardY;

        // Pendulum spring + gravity
        p.vx = (p.vx + dx * 0.045) * 0.88;
        p.vy = (p.vy + dy * 0.065 + 0.4) * 0.86;

        p.cardX += p.vx;
        p.cardY += p.vy;

        // Gentle idle breathing / 3D float when at rest
        const time = performance.now() * 0.002;
        const idleSway = Math.sin(time) * 4.5;

        // Rotational spring physics (allows full 360+ rotation around targetRotYBase)
        const targetY = p.targetRotYBase + p.vx * 2.2 + idleSway;
        const targetX = -p.vy * 1.6;
        const targetZ = (p.cardX - restX) * -0.14;

        p.vRotY = (p.vRotY + (targetY - p.rotY) * 0.08) * 0.82;
        p.vRotX = (p.vRotX + (targetX - p.rotX) * 0.1) * 0.82;
        p.vRotZ = (p.vRotZ + (targetZ - p.rotZ) * 0.1) * 0.82;

        p.rotY += p.vRotY;
        p.rotX += p.vRotX;
        p.rotZ += p.vRotZ;
      }

      // Update Verlet Rope Nodes
      if (p.nodes.length > 0) {
        // Pin first node to top ceiling anchor
        p.nodes[0].x = p.anchorX;
        p.nodes[0].y = 0;

        for (let i = 1; i < p.numNodes; i++) {
          const n = p.nodes[i];
          const vx = (n.x - n.oldX) * 0.92;
          const vy = (n.y - n.oldY) * 0.92;
          n.oldX = n.x;
          n.oldY = n.y;
          n.x += vx;
          n.y += vy + 0.5; // Rope gravity
        }

        // Pin last node to card top clasp
        const lastIdx = p.numNodes - 1;
        p.nodes[lastIdx].x = p.cardX;
        p.nodes[lastIdx].y = p.cardY;

        // Solve distance constraints (relaxation iterations for flexible taut/slack rope)
        for (let iter = 0; iter < 7; iter++) {
          p.nodes[0].x = p.anchorX;
          p.nodes[0].y = 0;
          p.nodes[lastIdx].x = p.cardX;
          p.nodes[lastIdx].y = p.cardY;

          for (let i = 0; i < p.numNodes - 1; i++) {
            const n1 = p.nodes[i];
            const n2 = p.nodes[i + 1];
            const dx = n2.x - n1.x;
            const dy = n2.y - n1.y;
            const dist = Math.sqrt(dx * dx + dy * dy) || 0.001;
            const diff = (dist - p.segmentLen) / dist;

            if (i !== 0) {
              n1.x += dx * diff * 0.5;
              n1.y += dy * diff * 0.5;
            }
            if (i + 1 !== lastIdx) {
              n2.x -= dx * diff * 0.5;
              n2.y -= dy * diff * 0.5;
            }
          }
        }

        // Build smooth quadratic bezier SVG path through rope nodes
        let d = `M ${p.nodes[0].x} ${p.nodes[0].y}`;
        for (let i = 1; i < p.numNodes - 1; i++) {
          const xc = (p.nodes[i].x + p.nodes[i + 1].x) / 2;
          const yc = (p.nodes[i].y + p.nodes[i + 1].y) / 2;
          d += ` Q ${p.nodes[i].x} ${p.nodes[i].y}, ${xc} ${yc}`;
        }
        d += ` L ${p.nodes[lastIdx].x} ${p.nodes[lastIdx].y}`;

        if (svgPathRef.current) svgPathRef.current.setAttribute('d', d);
        if (svgStitchRef.current) svgStitchRef.current.setAttribute('d', d);

        // Position metallic clip at the bottom of the rope
        if (clipGroupRef.current) {
          const prevNode = p.nodes[lastIdx - 2] || p.nodes[0];
          const angle =
            Math.atan2(p.cardX - prevNode.x, p.cardY - prevNode.y) *
            (-180 / Math.PI);
          clipGroupRef.current.setAttribute(
            'transform',
            `translate(${p.cardX}, ${p.cardY}) rotate(${angle * 0.35}) scale(1.35)`
          );
        }
      }

      // Apply 3D hardware-accelerated transform to the ID card
      if (cardWrapperRef.current) {
        cardWrapperRef.current.style.transform = `translate3d(${p.cardX}px, ${p.cardY}px, 0px)`;
      }
      if (cardInnerRef.current) {
        cardInnerRef.current.style.transform = `translate(-50%, 0%) rotateZ(${p.rotZ.toFixed(
          2
        )}deg) rotateX(${p.rotX.toFixed(2)}deg) rotateY(${p.rotY.toFixed(2)}deg)`;
      }

      // Dynamic holographic glare shift
      if (glareRef.current) {
        const glareX = 50 + Math.sin((p.rotY * Math.PI) / 180) * 40;
        const glareY = 50 + Math.sin((p.rotX * Math.PI) / 180) * 40;
        glareRef.current.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(16,185,129,0.28), transparent 65%)`;
      }

      animId = requestAnimationFrame(updatePhysics);
    };

    animId = requestAnimationFrame(updatePhysics);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Pointer Down: Grab the lanyard card
  const handlePointerDown = (e) => {
    // Ignore if clicking action buttons inside card
    if (e.target.closest('[data-no-drag]')) return;

    const p = phys.current;
    p.dragging = true;
    setIsDragging(true);

    p.lastPointerX = e.clientX;
    p.lastPointerY = e.clientY;
    p.pointerOffsetX = e.clientX - p.cardX;
    p.pointerOffsetY = e.clientY - p.cardY;

    e.currentTarget.setPointerCapture(e.pointerId);
  };

  // Pointer Move: Pull rope & rotate 360 in 3D across full width
  const handlePointerMove = (e) => {
    const p = phys.current;
    if (!p.dragging) return;

    const deltaX = e.clientX - p.lastPointerX;
    const deltaY = e.clientY - p.lastPointerY;
    p.lastPointerX = e.clientX;
    p.lastPointerY = e.clientY;

    // Move card position with wide full-width elastic freedom
    const rawX = e.clientX - p.pointerOffsetX;
    const rawY = e.clientY - p.pointerOffsetY;

    const maxStretchX = 320;
    const maxStretchY = 180;
    const restY = p.numNodes * p.segmentLen;

    const clampedX =
      p.anchorX +
      Math.max(-maxStretchX, Math.min(maxStretchX, rawX - p.anchorX));
    const clampedY = Math.max(40, Math.min(restY + maxStretchY, rawY));

    p.vx = clampedX - p.cardX;
    p.vy = clampedY - p.cardY;
    p.cardX = clampedX;
    p.cardY = clampedY;

    // Horizontal drag spins the card 360 degrees smoothly!
    p.rotY += deltaX * 1.4;
    p.vRotY = deltaX * 1.1;

    // Vertical drag tilts the card in 3D
    p.rotX = Math.max(-45, Math.min(45, p.rotX - deltaY * 0.55));
    p.rotZ = (p.cardX - p.anchorX) * -0.15;
  };

  // Pointer Up: Release card & snap Nearest 180/360 face with momentum
  const handlePointerUp = (e) => {
    const p = phys.current;
    if (!p.dragging) return;
    p.dragging = false;
    setIsDragging(false);

    // Project momentum to nearest 180-degree face so user can flip front/back or spin 360!
    const projectedY = p.rotY + p.vRotY * 6;
    p.targetRotYBase = Math.round(projectedY / 180) * 180;

    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // Ignore if not captured
    }
  };

  // Trigger a full 180/360 spin on button click
  const handleSpin360 = (e) => {
    e.stopPropagation();
    const p = phys.current;
    p.targetRotYBase += 180;
    p.vRotY += 18;
    p.vy -= 4.5; // Little upward hop
  };

  return (
    <div
      ref={containerRef}
      className="w-full min-h-[630px] sm:min-h-[670px] flex flex-col items-center justify-between relative overflow-visible select-none py-2"
      style={{ perspective: '1400px' }}
    >
      {/* Top Ceiling Mount Bracket (Frameless floating anchor) */}
      <div className="relative z-20 flex flex-col items-center">
        <div className="w-16 h-4 bg-zinc-900 dark:bg-zinc-800 border-2 border-black dark:border-zinc-500 rounded-full shadow-lg flex items-center justify-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-mono text-[8px] font-black text-zinc-300 uppercase tracking-widest">
            MOUNT
          </span>
        </div>
      </div>

      {/* Flexible Verlet Rope SVG Layer */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible">
        <defs>
          <linearGradient id="strapGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#18181b" />
            <stop offset="50%" stopColor="#27272a" />
            <stop offset="100%" stopColor="#09090b" />
          </linearGradient>
        </defs>

        {/* Outer Lanyard Strap (Thicker for larger scale) */}
        <path
          ref={svgPathRef}
          d="M 500 0 L 500 136"
          fill="none"
          stroke="url(#strapGrad)"
          strokeWidth="18"
          strokeLinecap="round"
        />

        {/* Emerald Center Stitch Line on Lanyard */}
        <path
          ref={svgStitchRef}
          d="M 500 0 L 500 136"
          fill="none"
          stroke="#10b981"
          strokeWidth="2.5"
          strokeDasharray="6 6"
          strokeLinecap="round"
        />

        {/* Metallic Lobster Clasp & Badge Holder Ring */}
        <g ref={clipGroupRef} transform="translate(500, 136) scale(1.35)">
          {/* Strap end clamp */}
          <rect
            x="-9"
            y="-8"
            width="18"
            height="8"
            rx="2"
            fill="#52525b"
            stroke="#000"
            strokeWidth="1.5"
          />
          {/* Metal ring */}
          <circle
            cx="0"
            cy="2"
            r="5"
            fill="none"
            stroke="#a1a1aa"
            strokeWidth="2.5"
          />
          {/* Badge slot clip */}
          <rect
            x="-6"
            y="5"
            width="12"
            height="11"
            rx="2"
            fill="#d4d4d8"
            stroke="#000"
            strokeWidth="1.5"
          />
        </g>
      </svg>

      {/* 3D Interactive ID Card Wrapper */}
      <div
        ref={cardWrapperRef}
        className="absolute top-0 left-0 z-20 pointer-events-none"
        style={{
          willChange: 'transform',
          transformStyle: 'preserve-3d',
        }}
      >
        <div
          ref={cardInnerRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className={`w-[300px] sm:w-[340px] h-[435px] sm:h-[470px] relative pointer-events-auto touch-none ${
            isDragging ? 'cursor-grabbing' : 'cursor-grab'
          }`}
          style={{
            transformStyle: 'preserve-3d',
            transformOrigin: '50% 0%',
            willChange: 'transform',
          }}
        >
          {/* ================= FRONT FACE OF ID CARD ================= */}
          <div
            className="absolute inset-0 rounded-3xl border-[3px] border-black dark:border-zinc-600 bg-white dark:bg-zinc-950 shadow-[0_28px_60px_rgba(0,0,0,0.5)] p-5 flex flex-col justify-between overflow-hidden"
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
            }}
          >
            {/* Dynamic Holographic Glare Overlay */}
            <div
              ref={glareRef}
              className="absolute inset-0 pointer-events-none z-20 mix-blend-overlay transition-opacity"
            />

            {/* Top Lanyard Slot Punch Hole */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-3.5 rounded-full bg-zinc-200 dark:bg-zinc-800 border-2 border-black/40 dark:border-white/20 mb-3.5 shadow-inner" />

              {/* Header Bar */}
              <div className="w-full flex items-center justify-between px-1 mb-2.5">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-mono text-[11px] sm:text-xs font-black uppercase tracking-widest text-zinc-600 dark:text-zinc-300">
                    STAFF PASS
                  </span>
                </div>
                <span className="font-mono text-[11px] sm:text-xs font-black px-2.5 py-0.5 rounded-md bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                  ID-04011
                </span>
              </div>
            </div>

            {/* Profile Photo Frame (Large & Clear) */}
            <div className="relative w-full h-56 sm:h-64 rounded-2xl border-2 border-black dark:border-zinc-700 overflow-hidden group/img bg-zinc-900 shadow-md">
              <img
                src={profileImg}
                alt="Yanuar Ramadhian Lanyard ID"
                draggable={false}
                className="w-full h-full object-cover filter grayscale contrast-125 group-hover/img:grayscale-0 transition-all duration-300 select-none pointer-events-none"
              />
              {/* Quick Zoom Button */}
              <button
                type="button"
                data-no-drag="true"
                onClick={(e) => {
                  e.stopPropagation();
                  onZoomPhoto();
                }}
                title={language === 'id' ? 'Perbesar Foto' : 'Zoom Photo'}
                className="absolute bottom-2.5 right-2.5 z-30 p-2 rounded-xl bg-black/75 text-white hover:bg-emerald-500 hover:text-black transition-colors border border-white/25 shadow-lg cursor-pointer"
              >
                <Maximize2 size={15} />
              </button>
            </div>

            {/* Identity Details */}
            <div className="text-center mt-2">
              <h4 className="font-black text-lg sm:text-xl tracking-tight uppercase text-zinc-900 dark:text-white leading-tight">
                YANUAR RAMADHIAN S.
              </h4>
              <p className="font-mono text-[11px] sm:text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mt-1">
                IT SUPPORT & DATA ANALYST
              </p>
            </div>

            {/* Bottom Barcode & Email Footer */}
            <div className="pt-2.5 border-t border-zinc-200 dark:border-zinc-800 flex flex-col items-center gap-1.5">
              {/* Simulated Vector Barcode */}
              <div className="flex items-center justify-center gap-[3px] h-4 w-full px-3 opacity-80">
                {[2, 1, 3, 1, 2, 1, 4, 1, 2, 2, 1, 3, 1, 2, 1, 3, 2, 1, 3, 2].map(
                  (w, idx) => (
                    <span
                      key={idx}
                      className="h-full bg-zinc-900 dark:bg-zinc-200"
                      style={{ width: `${w * 2.5}px` }}
                    />
                  )
                )}
              </div>
              <div className="flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-mono text-[10px] sm:text-[11px] font-bold text-emerald-600 dark:text-emerald-400 tracking-tight">
                  ramadhian1999@gmail.com
                </span>
              </div>
            </div>
          </div>

          {/* ================= BACK FACE OF ID CARD (180 DEG) ================= */}
          <div
            className="absolute inset-0 rounded-3xl border-[3px] border-black dark:border-zinc-600 bg-zinc-900 text-white shadow-[0_28px_60px_rgba(0,0,0,0.5)] p-5 flex flex-col justify-between overflow-hidden"
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
            }}
          >
            {/* Top Slot Hole & Magnetic Stripe */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-3.5 rounded-full bg-zinc-800 border-2 border-white/20 mb-3.5 shadow-inner" />
              <div className="w-[120%] -mx-6 h-10 bg-black border-y border-zinc-700 my-1 shadow-inner" />
            </div>

            {/* Security Clearance Info */}
            <div className="space-y-3 text-left px-1">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-black text-emerald-400 uppercase flex items-center gap-1.5">
                  <ShieldCheck size={16} /> ACCESS CLEARANCE
                </span>
                <span className="font-mono text-[10px] px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                  LEVEL 4
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-2.5 font-mono text-[11px] text-zinc-200">
                <div className="flex items-center gap-2.5">
                  <Wifi size={14} className="text-emerald-400 shrink-0" />
                  <span className="truncate">MikroTik Core Router Admin</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Cpu size={14} className="text-sky-400 shrink-0" />
                  <span className="truncate">Database & Server Operations</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Lock size={14} className="text-amber-400 shrink-0" />
                  <span className="truncate">Network Infrastructure Security</span>
                </div>
              </div>

              <p className="font-mono text-[9.5px] leading-relaxed text-zinc-400">
                This credential grants full administrative access to core routing,
                load balancing, and enterprise analytics systems.
              </p>
            </div>

            {/* Simulated Cyber QR Code & Signature */}
            <div className="flex items-center justify-between px-1 pt-3 border-t border-zinc-800">
              <div className="text-left space-y-0.5">
                <p className="font-mono text-[9px] text-zinc-400 uppercase tracking-wider">
                  AUTHORIZED SIGNATURE
                </p>
                <p className="font-serif italic text-base text-emerald-400 font-bold">
                  Yanuar Ramadhian S.
                </p>
                <p className="font-mono text-[9px] text-zinc-500">
                  VALID THRU: 12 / 2030
                </p>
              </div>

              {/* Larger Pixel QR */}
              <div className="w-16 h-16 p-1.5 rounded-xl bg-white grid grid-cols-5 grid-rows-5 gap-[1.5px] shadow-md">
                {[
                  1, 1, 1, 0, 1,
                  1, 0, 1, 1, 0,
                  1, 1, 1, 0, 1,
                  0, 1, 0, 1, 1,
                  1, 0, 1, 1, 1,
                ].map((cell, i) => (
                  <div
                    key={i}
                    className={cell ? 'bg-black' : 'bg-transparent'}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Floating Interactive Controls Pill */}
      <div className="relative z-20 mt-auto pt-4 flex items-center justify-center gap-4">
        <div className="px-4 py-2 rounded-full bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-black/15 dark:border-zinc-700 shadow-sm flex items-center gap-3">
          <span className="font-mono text-[10px] sm:text-xs font-bold text-zinc-600 dark:text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
            🖐️ {language === 'id' ? 'Tarik & Putar 360°' : 'Drag & Spin 360°'}
          </span>

          <button
            type="button"
            onClick={handleSpin360}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black text-white dark:bg-white dark:text-black font-mono text-[10px] sm:text-xs font-black uppercase tracking-wider hover:opacity-90 active:scale-95 transition-all shadow cursor-pointer"
          >
            <RotateCw size={12} />
            <span>{language === 'id' ? 'Putar Kartu' : 'Flip 180°'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
