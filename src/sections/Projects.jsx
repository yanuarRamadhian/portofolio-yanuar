import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useApp } from '../AppContext';
import CaseStudyModal from '../components/CaseStudyModal';

export default function Projects({ projectsRef }) {
  const { t, language } = useApp();
  const [selectedProject, setSelectedProject] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenCaseStudy = (project) => {
    setSelectedProject(project);
    setModalOpen(true);
  };

  return (
    <>
      <section id="projects" ref={projectsRef} className="border-y-2 border-black dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900/50 py-20 transition-colors scroll-mt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">

          {/* Section Heading */}
          <div className="flex flex-col items-center text-center mb-16">
            <span className="font-mono text-[10px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-2">
              MY PORTFOLIO
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight uppercase">
              {t.projects.title}
            </h2>
            <div className="h-1.5 w-12 bg-black dark:bg-white mt-4 rounded-full" />
          </div>

          {/* Projects List */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {t.projects.list.map((project) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="rounded-2xl border-2 border-black dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden flex flex-col justify-between shadow-md hover:shadow-xl transition-all"
              >
                <div>
                  {/* Decorative Mockup image */}
                  <div className="h-44 sm:h-48 w-full border-b-2 border-black dark:border-zinc-800 relative bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080801a_1px,transparent_1px),linear-gradient(to_bottom,#8080801a_1px,transparent_1px)] bg-[size:16px_16px]" />

                    {/* Unique design elements depending on project */}
                    {project.id === 1 && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                        <div className="w-3/4 h-24 bg-white dark:bg-zinc-950 rounded-lg border-2 border-black shadow-lg p-2 flex flex-col justify-between font-mono text-[7px]">
                          <div className="flex justify-between items-center border-b pb-1">
                            <span className="font-bold text-rose-500">📊 SALES PORTAL</span>
                            <span className="bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 px-1 py-0.25 rounded text-[6px]">v1.0</span>
                          </div>
                          <div className="flex gap-1 items-end h-8">
                            <div className="w-2.5 h-6 bg-rose-500 border border-black rounded-t" />
                            <div className="w-2.5 h-8 bg-zinc-800 dark:bg-white border border-black rounded-t" />
                            <div className="w-2.5 h-4 bg-rose-300 border border-black rounded-t" />
                            <div className="w-2.5 h-7 bg-rose-500 border border-black rounded-t" />
                            <div className="w-2.5 h-5 bg-zinc-800 dark:bg-white border border-black rounded-t" />
                          </div>
                          <div className="flex justify-between text-[6px] text-zinc-400">
                            <span>Revenue: $12.4K</span>
                            <span>+14.2%</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {project.id === 2 && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                        <div className="w-3/4 h-24 bg-white dark:bg-zinc-950 rounded-lg border-2 border-black shadow-lg p-2.5 flex flex-col justify-between font-mono text-[7px]">
                          <div className="flex justify-between items-center border-b pb-1.5">
                            <span className="font-bold text-blue-500">👥 CRM ACTIVE</span>
                            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
                          </div>
                          <div className="space-y-1 my-1">
                            <div className="flex items-center gap-1">
                              <div className="w-2.5 h-2.5 rounded-full bg-blue-500 border border-black" />
                              <div className="flex-1 h-1.5 bg-zinc-100 dark:bg-zinc-900 rounded border" />
                            </div>
                            <div className="flex items-center gap-1">
                              <div className="w-2.5 h-2.5 rounded-full bg-amber-500 border border-black" />
                              <div className="flex-1 h-1.5 bg-zinc-100 dark:bg-zinc-900 rounded border" />
                            </div>
                          </div>
                          <div className="h-2.5 bg-black text-white dark:bg-white dark:text-black rounded flex items-center justify-center text-[6px] font-black">
                            MANAGE LEADS
                          </div>
                        </div>
                      </div>
                    )}

                    {project.id === 3 && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                        <div className="w-3/4 h-24 bg-zinc-950 rounded-lg border-2 border-white/20 shadow-lg p-2.5 flex flex-col justify-between font-mono text-[7px] text-white">
                          <div className="flex justify-between items-center border-b border-zinc-800 pb-1">
                            <span className="font-black text-emerald-400">⚡ MIKROTIK RB4011</span>
                            <span className="text-[6px] text-emerald-400 font-bold">ONLINE</span>
                          </div>
                          <div className="flex justify-between items-center my-1.5">
                            <div className="flex flex-col gap-0.5">
                              <span className="text-zinc-500 text-[6px]">ISP1 (Main)</span>
                              <span className="text-emerald-400 font-bold">Active 50M</span>
                            </div>
                            <span className="text-zinc-600">◀ PCC ▶</span>
                            <div className="flex flex-col gap-0.5 text-right">
                              <span className="text-zinc-500 text-[6px]">ISP2 (Backup)</span>
                              <span className="text-emerald-400 font-bold">Active 50M</span>
                            </div>
                          </div>
                          <div className="h-2 bg-zinc-900 rounded-full overflow-hidden border border-zinc-800">
                            <div className="h-full bg-emerald-500 w-4/5 animate-pulse" />
                          </div>
                        </div>
                      </div>
                    )}

                    {project.id === 4 && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                        <div className="w-3/4 h-24 bg-white dark:bg-zinc-950 rounded-lg border-2 border-black shadow-lg overflow-hidden flex flex-col font-mono text-[7px]">
                          <div className="bg-zinc-100 dark:bg-zinc-900 border-b-2 border-black px-2 py-1 flex items-center justify-between">
                            <div className="flex gap-0.5">
                              <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                              <div className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
                              <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                            </div>
                            <span className="text-[5px] text-zinc-400 font-bold truncate max-w-[60px]">wp-admin/index.php</span>
                            <div className="w-2.5 h-2.5 rounded bg-sky-500 flex items-center justify-center text-white text-[5px] font-black">W</div>
                          </div>
                          <div className="flex-1 p-2 flex flex-col justify-between">
                            <div className="flex gap-1.5">
                              <div className="w-1/3 h-10 border border-dashed border-zinc-300 dark:border-zinc-800 rounded flex items-center justify-center text-[5px] text-zinc-400">
                                Elementor
                              </div>
                              <div className="flex-1 space-y-1.5">
                                <div className="h-2 bg-zinc-100 dark:bg-zinc-900 rounded" />
                                <div className="h-2 bg-zinc-100 dark:bg-zinc-900 rounded" />
                                <div className="h-2 bg-zinc-100 dark:bg-zinc-900 rounded" />
                              </div>
                            </div>
                            <div className="h-2.5 bg-black text-white dark:bg-white dark:text-black rounded flex items-center justify-center text-[5px] font-black">
                              PAGE BUILDER ACTIVE
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {project.id === 5 && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                        <div className="w-3/4 h-24 bg-white dark:bg-zinc-950 rounded-lg border-2 border-black shadow-lg p-2 flex flex-col justify-between font-mono text-[7px]">
                          <div className="flex justify-between items-center border-b pb-1.5">
                            <span className="font-bold text-amber-500">📹 NAS & CCTV STATUS</span>
                            <span className="bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 px-1 py-0.25 rounded text-[5px] font-black">PCQ QOS</span>
                          </div>
                          <div className="flex gap-2">
                            <div className="flex-1 border border-dashed border-zinc-300 dark:border-zinc-800 rounded p-1 flex flex-col justify-around text-[5px]">
                              <span className="text-zinc-400">CCTV Bandwidth</span>
                              <span className="font-bold text-emerald-500">10 Mbps Constant</span>
                            </div>
                            <div className="w-12 border border-dashed border-zinc-300 dark:border-zinc-800 rounded p-1 flex flex-col justify-around text-[5px] text-center">
                              <span className="text-zinc-400">NAS Traffic</span>
                              <span className="font-bold text-blue-500">Shaped</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="absolute bottom-2 left-2 flex gap-1">
                      {project.metrics.slice(0, 1).map((m, idx) => (
                        <span key={idx} className="bg-black text-white dark:bg-white dark:text-black font-mono text-[8px] font-black uppercase px-2 py-0.5 rounded border border-black dark:border-white">
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-emerald-500">
                      {project.role}
                    </span>
                    <h3 className="text-lg font-black tracking-tight mt-1 mb-2 text-zinc-900 dark:text-white uppercase">
                      {project.name}
                    </h3>
                    <p className="text-xs sm:text-sm leading-relaxed text-zinc-500 dark:text-zinc-400 font-medium">
                      {project.desc}
                    </p>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="p-5 pt-0">
                  <button
                    onClick={() => handleOpenCaseStudy(project)}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border-2 border-black dark:border-zinc-700 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-black dark:text-white font-bold text-xs uppercase rounded-xl transition-all shadow"
                  >
                    <span>{t.projects.view_btn}</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* Case Study Modal Popup component */}
      <CaseStudyModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        project={selectedProject}
      />
    </>
  );
}
