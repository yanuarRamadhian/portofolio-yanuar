import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../AppContext';
import TimelineFolder from '../components/TimelineFolder';

export default function Journey({ journeyRef }) {
  const { t } = useApp();

  return (
    <section id="journey" ref={journeyRef} className="py-20 scroll-mt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">

        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="font-mono text-[10px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-2">
            MY EXPERIENCE
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight uppercase">
            {t.journey.title}
          </h2>
          <div className="h-1.5 w-12 bg-black dark:bg-white mt-4 rounded-full" />
        </div>

        {/* Timeline Nodes */}
        <div className="relative border-l-2 border-black dark:border-zinc-800 pl-6 sm:pl-8 ml-4 sm:ml-6 space-y-12">

          {t.journey.list.map((journey, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="relative"
            >
              {/* Custom Timeline bullet */}
              <div className="absolute -left-[35px] sm:-left-[43px] top-1.5 w-5 h-5 sm:w-6 sm:h-6 bg-black dark:bg-white border-2 border-black dark:border-zinc-900 rounded-full flex items-center justify-center shadow-sm">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-emerald-500 rounded-full" />
              </div>

              {/* Dynamic wiggling timeline folder card */}
              <TimelineFolder index={idx}>
                {/* Header info */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-3 mb-3">
                  <div>
                    <span className="font-mono text-[9px] font-bold uppercase text-emerald-500">
                      {journey.company}
                    </span>
                    <h3 className="font-black text-sm sm:text-base uppercase tracking-tight text-zinc-900 dark:text-white mt-0.5">
                      {journey.role}
                    </h3>
                  </div>
                  <span className="self-start sm:self-center font-mono text-[8px] sm:text-[10px] font-black uppercase px-2.5 py-1 bg-zinc-100 dark:bg-zinc-800 border border-black dark:border-zinc-700 rounded-lg shadow-sm whitespace-nowrap">
                    {journey.date}
                  </span>
                </div>

                {/* Description details */}
                <p className="text-xs sm:text-sm leading-relaxed text-zinc-500 dark:text-zinc-400 font-medium whitespace-pre-line">
                  {journey.desc}
                </p>
              </TimelineFolder>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
