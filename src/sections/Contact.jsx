import React, { useState } from 'react';
import { Mail, Copy, Check, ChevronDown, ArrowRight } from 'lucide-react';
import { useApp } from '../AppContext';

const Github = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const Linkedin = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const Instagram = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const Whatsapp = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);

export default function Contact({ contactRef, triggerToast }) {
  const { t, language } = useApp();
  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Copy Email to Clipboard
  const handleCopyEmail = () => {
    navigator.clipboard.writeText('ramadhian1999@gmail.com');
    setCopied(true);
    triggerToast(language === 'id' ? 'Email berhasil disalin!' : 'Email copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  // Form Submission Mockup
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) {
      triggerToast(language === 'id' ? 'Harap isi semua kolom wajib!' : 'Please fill all required fields!');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      triggerToast(t.contact.success);
      setFormState({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 1500);
  };

  return (
    <section id="contact" ref={contactRef} className="border-t-2 border-black dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900/50 py-20 transition-colors scroll-mt-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">

        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="font-mono text-[10px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-2">
            WANT TO COLLABORATE?
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight uppercase">
            {t.contact.title}
          </h2>
          <div className="h-1.5 w-12 bg-black dark:bg-white mt-4 rounded-full" />
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-start">

          {/* Left Column: Cards details */}
          <div className="md:col-span-2 space-y-6">

            {/* Email brutalist card */}
            <div className="p-6 rounded-2xl border-2 border-black dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-md hover:shadow-lg transition-all">
              <div className="flex items-center gap-3 mb-4 text-emerald-500">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                  <Mail size={20} />
                </div>
                <div>
                  <span className="font-mono text-[9px] font-bold uppercase text-zinc-400">
                    {language === 'id' ? 'KIRIM EMAIL' : 'EMAIL ME'}
                  </span>
                  <h4 className="font-black text-sm uppercase tracking-tight text-zinc-900 dark:text-white">
                    Direct Email
                  </h4>
                </div>
              </div>

              <div className="flex items-center justify-between gap-2 p-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl font-mono text-xs sm:text-sm font-bold shadow-inner">
                <span className="truncate">ramadhian1999@gmail.com</span>
                <button
                  onClick={handleCopyEmail}
                  className="p-2 rounded-lg border border-black/10 dark:border-white/10 hover:bg-zinc-200 dark:hover:bg-zinc-800 active:scale-95 transition-all text-zinc-500 dark:text-zinc-400"
                  title="Copy Email"
                >
                  {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                </button>
              </div>
            </div>

            {/* Social card wrapper */}
            <div className="p-6 rounded-2xl border-2 border-black dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-md hover:shadow-lg transition-all">
              <h4 className="font-black text-sm uppercase tracking-tight text-zinc-900 dark:text-white mb-4">
                {language === 'id' ? 'Media Sosial' : 'Social Networks'}
              </h4>

              <div className="grid grid-cols-2 gap-3">
                {/* GitHub */}
                <a
                  href="https://github.com/yanuarRamadhian"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-black dark:hover:border-white hover:bg-zinc-50 dark:hover:bg-zinc-950/50 font-mono text-xs font-bold transition-all shadow-sm"
                >
                  <Github size={16} />
                  <span>GITHUB</span>
                </a>
                {/* LinkedIn */}
                <a
                  href="https://linkedin.com/in/yanuarramadhian"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-blue-500 dark:hover:border-blue-400 hover:bg-blue-500/5 font-mono text-xs font-bold transition-all shadow-sm"
                >
                  <Linkedin size={16} className="text-blue-500" />
                  <span>LINKEDIN</span>
                </a>
                {/* Instagram */}
                <a
                  href="https://instagram.com/yanuar_ramadhian"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-rose-500 dark:hover:border-rose-400 hover:bg-rose-500/5 font-mono text-xs font-bold transition-all shadow-sm"
                >
                  <Instagram size={16} className="text-rose-500" />
                  <span>INSTAGRAM</span>
                </a>
                {/* WhatsApp */}
                <a
                  href="https://wa.me/6282282245228"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-emerald-500 dark:hover:border-emerald-400 hover:bg-emerald-500/5 font-mono text-xs font-bold transition-all shadow-sm"
                >
                  <Whatsapp size={16} className="text-emerald-500" />
                  <span>WHATSAPP</span>
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Contact form box */}
          <div className="md:col-span-3 p-6 sm:p-8 rounded-2xl border-2 border-black dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-md">
            <h3 className="text-xl font-black uppercase tracking-tight text-zinc-900 dark:text-white mb-6">
              {t.contact.form_title}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name */}
                <div className="flex flex-col">
                  <label className="font-bold font-mono text-[10px] uppercase text-zinc-400 dark:text-zinc-500 mb-1.5">
                    {t.contact.name_placeholder} <span className="text-red-500">*</span>
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="John Doe"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className="px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white font-medium text-sm transition-all"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col">
                  <label className="font-bold font-mono text-[10px] uppercase text-zinc-400 dark:text-zinc-500 mb-1.5">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    required
                    type="email"
                    placeholder="john@example.com"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    className="px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white font-medium text-sm transition-all"
                  />
                </div>
              </div>

              {/* Subject */}
              <div className="flex flex-col">
                <label className="font-bold font-mono text-[10px] uppercase text-zinc-400 dark:text-zinc-500 mb-1.5">
                  {t.contact.subject_placeholder}
                </label>
                <div className="relative">
                  <select
                    value={formState.subject}
                    onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white font-medium text-sm appearance-none transition-all cursor-pointer"
                  >
                    <option value="" disabled>{language === 'id' ? '--- Pilih Subjek ---' : '--- Choose Subject ---'}</option>
                    {t.contact.subjects.map((subj) => (
                      <option key={subj} value={subj}>{subj}</option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-zinc-400">
                    <ChevronDown size={16} />
                  </div>
                </div>
              </div>

              {/* Message */}
              <div className="flex flex-col">
                <label className="font-bold font-mono text-[10px] uppercase text-zinc-400 dark:text-zinc-500 mb-1.5">
                  {t.contact.message_placeholder} <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder={t.contact.message_placeholder}
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  className="px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white font-medium text-sm transition-all resize-none"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-black text-white dark:bg-white dark:text-black rounded-xl font-bold text-xs uppercase hover:opacity-90 transition-all shadow-md flex items-center justify-center gap-2"
              >
                <span>{isSubmitting ? t.contact.sending : t.contact.send_btn}</span>
                <ArrowRight size={14} />
              </button>

              {/* Success Alert */}
              {submitSuccess && (
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold text-xs uppercase rounded-xl text-center">
                  {t.contact.success}
                </div>
              )}

            </form>

          </div>

        </div>
      </div>
    </section>
  );
}
