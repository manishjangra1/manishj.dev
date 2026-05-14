'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Send, MapPin, CheckCircle2, Loader2 } from 'lucide-react';

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus('submitting');
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('Form Submitted:', {
      ...formData,
      read: false,
      createdAt: new Date().toISOString()
    });

    setStatus('success');
    setFormData({ name: '', email: '', message: '' });
    
    setTimeout(() => setStatus('idle'), 5000);
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center px-12 md:px-32 pointer-events-none pb-32">
      <div className="w-full max-w-5xl pointer-events-auto flex flex-col lg:flex-row gap-12 lg:gap-24 items-center">
        
        {/* Left Side: Info */}
        <div className="flex-1 flex flex-col gap-10">
          <div className="flex flex-col gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3"
            >
              <div className="w-8 h-[1px] bg-accent-amber/40" />
              <span className="text-[10px] uppercase tracking-[0.4em] text-accent-amber font-mono">
                Connect
              </span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.8 }}
              className="text-5xl md:text-7xl font-bold tracking-tight text-foreground leading-[0.9]"
            >
              LET&apos;S WORK <br /> 
              <span className="text-foreground/10">TOGETHER</span> ON <br /> 
              YOUR NEXT <br /> 
              <span className="text-accent-amber inline-block relative">
                PROJECT.
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ delay: 1, duration: 1 }}
                  className="absolute -bottom-2 left-0 h-[1px] bg-accent-amber/30 blur-[1px]" 
                />
              </span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col gap-8"
          >
            <a href="mailto:dev.jangramanish@gmail.com" className="flex items-center gap-6 group">
              <div className="w-14 h-14 rounded-2xl glass flex items-center justify-center group-hover:border-accent-amber/30 group-hover:shadow-[0_0_20px_rgba(214,168,106,0.1)] transition-all duration-700">
                <Mail size={20} className="text-foreground/30 group-hover:text-accent-amber transition-colors duration-500" />
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] uppercase tracking-[0.3em] text-foreground/20 font-mono mb-1">Inquiries</span>
                <span className="text-lg text-foreground/50 group-hover:text-foreground transition-colors duration-500 font-medium">dev.jangramanish@gmail.com</span>
              </div>
            </a>

            <div className="flex items-center gap-6 group">
              <div className="w-14 h-14 rounded-2xl glass flex items-center justify-center group-hover:border-accent-amber/30 transition-all duration-700">
                <MapPin size={20} className="text-foreground/30 group-hover:text-accent-amber transition-colors duration-500" />
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] uppercase tracking-[0.3em] text-foreground/20 font-mono mb-1">Presence</span>
                <span className="text-lg text-foreground/50 group-hover:text-foreground transition-colors duration-500 font-medium">Chandigarh, India</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Contact Form Card */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="flex-1 w-full max-w-[380px] relative group/card"
        >
          {/* Ambient Card Glow */}
          <div className="absolute -inset-1 bg-accent-amber/[0.03] rounded-[2rem] blur-2xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-1000" />
          
          <div className="relative glass p-6 md:p-10 rounded-[2rem] border-white/[0.05] overflow-hidden shadow-2xl">
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="py-10 flex flex-col items-center text-center gap-4"
                >
                  <div className="w-14 h-14 rounded-full bg-accent-amber/10 flex items-center justify-center relative">
                    <CheckCircle2 size={24} className="text-accent-amber z-10" />
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1.5, opacity: 0 }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="absolute inset-0 border border-accent-amber rounded-full"
                    />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-base font-bold text-foreground tracking-tight">Transmission Received</h3>
                    <p className="text-foreground/40 text-[10px] leading-relaxed font-light">
                      The Architect will respond shortly.
                    </p>
                  </div>
                </motion.div>
              ) : (
                <form key="form" onSubmit={handleSubmit} className="flex flex-col gap-6">
                  <div className="space-y-5">
                    <div className="group/input">
                      <label className="text-[7px] uppercase tracking-[0.4em] text-foreground/20 font-mono ml-1 mb-2 block group-focus-within/input:text-accent-amber transition-colors">Sector // Identifier</label>
                      <input 
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="NAME"
                        className="w-full bg-white/[0.01] border border-white/[0.05] rounded-lg px-4 py-3 text-[11px] text-foreground placeholder:text-foreground/10 focus:outline-none focus:border-accent-amber/20 focus:bg-white/[0.03] transition-all duration-500 tracking-wider"
                      />
                    </div>
                    
                    <div className="group/input">
                      <label className="text-[7px] uppercase tracking-[0.4em] text-foreground/20 font-mono ml-1 mb-2 block group-focus-within/input:text-accent-amber transition-colors">Sector // Communication</label>
                      <input 
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="EMAIL"
                        className="w-full bg-white/[0.01] border border-white/[0.05] rounded-lg px-4 py-3 text-[11px] text-foreground placeholder:text-foreground/10 focus:outline-none focus:border-accent-amber/20 focus:bg-white/[0.03] transition-all duration-500 tracking-wider"
                      />
                    </div>

                    <div className="group/input">
                      <label className="text-[7px] uppercase tracking-[0.4em] text-foreground/20 font-mono ml-1 mb-2 block group-focus-within/input:text-accent-amber transition-colors">Sector // Message</label>
                      <textarea 
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="MESSAGE"
                        rows={2}
                        className="w-full bg-white/[0.01] border border-white/[0.05] rounded-lg px-4 py-3 text-[11px] text-foreground placeholder:text-foreground/10 focus:outline-none focus:border-accent-amber/20 focus:bg-white/[0.03] transition-all duration-500 resize-none tracking-wider"
                      />
                    </div>
                  </div>

                  <motion.button
                    disabled={status === 'submitting'}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full h-12 glass rounded-lg font-bold flex items-center justify-center gap-3 group/btn hover:border-accent-amber/30 transition-all duration-700 disabled:opacity-50 relative overflow-hidden"
                  >
                    {status === 'submitting' ? (
                      <Loader2 size={16} className="animate-spin text-accent-amber" />
                    ) : (
                      <>
                        <span className="uppercase tracking-[0.3em] text-[8px] text-foreground relative z-10 group-hover/btn:text-accent-amber transition-colors">Initialize Message</span>
                        <Send size={10} className="text-foreground/40 group-hover/btn:text-accent-amber transition-colors relative z-10" />
                        <div className="absolute inset-0 bg-accent-amber/[0.02] opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default ContactSection;
