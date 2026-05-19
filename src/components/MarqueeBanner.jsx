import React from 'react';

export default function MarqueeBanner() {
  const words = [
    "🚀 AVAILABLE FOR HIRE",
    "⚡ MARI BERKOLABORASI",
    "💻 IT SUPPORT SPECIALIST",
    "📊 DATA ANALYST",
    "🌐 WEB OPTIMIZATION"
  ];

  // Duplicate the array to ensure it always overflows the screen width properly for smooth looping
  const duplicatedWords = [...words, ...words, ...words, ...words, ...words, ...words];

  return (
    <div className="relative w-full overflow-hidden border-y-4 border-black dark:border-zinc-800 bg-emerald-400 dark:bg-emerald-500 py-5 flex items-center shadow-[0_8px_0_0_rgba(0,0,0,1)] dark:shadow-[0_8px_0_0_rgba(0,0,0,1)] z-10 my-16 transform -rotate-2 scale-105">
      {/* Replaced motion.div with a CSS-animated div for buttery smooth GPU compositing */}
      <div className="flex whitespace-nowrap animate-marquee">
        {duplicatedWords.map((word, i) => (
          <span key={i} className="mx-8 text-black font-black text-xl md:text-2xl uppercase tracking-widest flex items-center gap-8 drop-shadow-md select-none">
            {word}
            {/* Brutalist separator dot */}
            <span className="w-3 h-3 bg-black transform rotate-45 block" />
          </span>
        ))}
      </div>
    </div>
  );
}
