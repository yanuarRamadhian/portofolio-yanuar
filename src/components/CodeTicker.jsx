import React, { useEffect, useState, useRef } from 'react';

const codeSnippets = [
  "const developer = 'Yanuar Ramadhian Sutiyono';",
  "let current_status = 'OPEN_TO_WORK';",
  "const tech_stack = ['MikroTik', 'Networking', 'IT Support', 'Data Analysis', 'WordPress', 'Laravel', 'MySQL'];",
  "function initializeSystem() { console.log('YANUAR SYSTEM ONLINE'); }",
  "// Connection established to server: PORT 8080",
  "// SYSTEM DIAGNOSTICS: 100% HEALTHY",
  "const location = 'Bandung, Indonesia';",
  "const gpa_satisfaction = 'HIGHLY_SATISFACTORY (GPA: 3.53/4.00)';",
  "// loading portfolio_database.json...",
  "// loading asset_canvas_ghosts.png...",
  "// Language set: EN / ID initialized.",
  "const active_projects = ['MikroTik PCC Load Balancing', 'WordPress Elementor Sites', 'Database Entry Admin'];",
  "// Compilation successful in 24ms.",
  "const theme = localStorage.getItem('theme') || 'dark';",
  "console.log(`Current active theme: ${theme}`);",
  "const contact_details = { email: 'ramadhian1999@gmail.com' };",
];

const CodeTicker = () => {
  const [logs, setLogs] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    // Populate initial logs
    const initial = [];
    for (let i = 0; i < 25; i++) {
      initial.push(codeSnippets[Math.floor(Math.random() * codeSnippets.length)]);
    }
    setLogs(initial);

    const interval = setInterval(() => {
      setLogs((prev) => {
        const next = [...prev.slice(1)];
        next.push(codeSnippets[Math.floor(Math.random() * codeSnippets.length)]);
        return next;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 select-none overflow-hidden pointer-events-none opacity-[0.03] dark:opacity-[0.04] flex flex-col font-mono text-[10px] sm:text-xs leading-relaxed p-4"
    >
      <div className="flex flex-col-reverse justify-end h-full">
        {logs.map((log, idx) => (
          <div
            key={idx}
            className="whitespace-nowrap transition-all duration-1000 transform translate-y-0"
            style={{
              color: idx === logs.length - 1 ? '#10B981' : 'inherit',
              fontWeight: idx === logs.length - 1 ? 'bold' : 'normal',
            }}
          >
            {`> ${log}`}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CodeTicker;
