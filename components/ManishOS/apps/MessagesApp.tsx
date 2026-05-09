'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOS } from '@/contexts/OSContext';
import { Send, User, Mail, MessageSquare, ShieldCheck, CheckCircle2 } from 'lucide-react';

const MessagesApp: React.FC = () => {
  const { resolvedTheme } = useOS();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <div className={`h-full flex transition-colors duration-500 ${
      resolvedTheme === 'dark' ? 'bg-zinc-950/80 text-white' : 'bg-white/80 text-zinc-900'
    }`}>
      {/* Sidebar - Info */}
      <div className={`w-1/3 border-r p-6 space-y-8 transition-colors duration-500 hidden md:block ${
        resolvedTheme === 'dark' ? 'border-white/10' : 'border-black/5'
      }`}>
        <div className="space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] opacity-40">Contact Status</h3>
          <div className="flex items-center gap-2 text-sm text-blue-500">
            <ShieldCheck className="w-4 h-4" />
            <span className="font-medium">Secure Connection</span>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] opacity-40">Notice</h3>
          <div className={`p-4 rounded-2xl border text-xs leading-relaxed ${
            resolvedTheme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/5'
          }`}>
            Feel free to reach out for collaborations or just to say hello. I typically respond within 24-48 hours.
          </div>
        </div>

        <div className="pt-8">
          <div className="w-full aspect-square rounded-3xl border-2 border-dashed border-current/10 flex items-center justify-center opacity-20">
            <MessageSquare className="w-12 h-12" />
          </div>
        </div>
      </div>
      
      {/* Main Form Area */}
      <div className="flex-1 p-8 md:p-12 overflow-y-auto custom-scrollbar">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="max-w-xl mx-auto space-y-10"
        >
          <header className="space-y-2">
            <motion.h2 variants={itemVariants} className="text-3xl font-bold tracking-tight">Contact Me</motion.h2>
            <motion.p variants={itemVariants} className="text-sm opacity-50">Send me a message and I'll get back to you as soon as possible.</motion.p>
          </header>

          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div variants={itemVariants} className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest opacity-60 flex items-center gap-2">
                <User className="w-3 h-3" />
                Full Name
              </label>
              <input 
                required
                type="text"
                placeholder="Enter your name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={`w-full px-5 py-4 rounded-2xl border outline-none transition-all focus:ring-2 focus:ring-blue-500/50 ${
                  resolvedTheme === 'dark' 
                    ? 'bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:bg-white/10' 
                    : 'bg-black/5 border-black/10 text-zinc-900 placeholder:text-zinc-400 focus:bg-white'
                }`}
              />
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest opacity-60 flex items-center gap-2">
                <Mail className="w-3 h-3" />
                Email Address
              </label>
              <input 
                required
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={`w-full px-5 py-4 rounded-2xl border outline-none transition-all focus:ring-2 focus:ring-blue-500/50 ${
                  resolvedTheme === 'dark' 
                    ? 'bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:bg-white/10' 
                    : 'bg-black/5 border-black/10 text-zinc-900 placeholder:text-zinc-400 focus:bg-white'
                }`}
              />
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest opacity-60 flex items-center gap-2">
                <MessageSquare className="w-3 h-3" />
                Your Message
              </label>
              <textarea 
                required
                rows={5}
                placeholder="Write your message here..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className={`w-full px-5 py-4 rounded-2xl border outline-none transition-all focus:ring-2 focus:ring-blue-500/50 resize-none ${
                  resolvedTheme === 'dark' 
                    ? 'bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:bg-white/10' 
                    : 'bg-black/5 border-black/10 text-zinc-900 placeholder:text-zinc-400 focus:bg-white'
                }`}
              />
            </motion.div>

            <motion.div variants={itemVariants} className="pt-4">
              <button 
                type="submit"
                disabled={status === 'sending' || status === 'success'}
                className={`w-full py-5 rounded-2xl font-bold uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3 transition-all relative overflow-hidden group shadow-xl ${
                  status === 'success' 
                    ? 'bg-emerald-500 text-white'
                    : status === 'error'
                      ? 'bg-red-500 text-white'
                      : 'bg-blue-600 text-white hover:bg-blue-500 active:scale-[0.98]'
                }`}
              >
                <AnimatePresence mode="wait">
                  {status === 'sending' ? (
                    <motion.div 
                      key="sending"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center gap-2"
                    >
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </motion.div>
                  ) : status === 'success' ? (
                    <motion.div 
                      key="success"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      Message Sent
                    </motion.div>
                  ) : (
                    <motion.div 
                      key="idle"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2"
                    >
                      <Send className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                      Send Message
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
              {status === 'error' && (
                <p className="text-center text-xs text-red-500 mt-4 font-bold uppercase tracking-widest">
                  Failed to send message. Please try again.
                </p>
              )}
            </motion.div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default MessagesApp;
