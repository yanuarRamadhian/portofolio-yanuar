import React, { useRef } from 'react';

export default function InteractiveGrid() {
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    const container = containerRef.current;
    if (!container) return;
    
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    container.style.setProperty('--mouse-x', `${x}px`);
    container.style.setProperty('--mouse-y', `${y}px`);
  };

  const handleMouseEnter = () => {
    const container = containerRef.current;
    if (container) {
      container.style.setProperty('--mouse-opacity', '1');
    }
  };

  const handleMouseLeave = () => {
    const container = containerRef.current;
    if (container) {
      container.style.setProperty('--mouse-opacity', '0');
    }
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="absolute inset-0 w-full h-full pointer-events-auto"
      style={{
        '--mouse-x': '0px',
        '--mouse-y': '0px',
        '--mouse-opacity': '0',
      }}
    >
      {/* Base Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px]" />
      
      {/* Spotlight that follows mouse - Powered by native CSS custom properties */}
      <div
        className="absolute inset-0 z-0 mix-blend-screen transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(16,185,129,0.15), transparent 40%)`,
          opacity: 'var(--mouse-opacity)',
        }}
      />
    </div>
  );
}
