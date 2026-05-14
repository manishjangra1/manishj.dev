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
    <div className="absolute inset-0 flex items-center justify-center pl-6 md:pl-24 pr-24 md:pr-40 pointer-events-none pb-32">
      <div className="w-full max-w-5xl pointer-events-auto flex flex-col lg:flex-row gap-12 lg:gap-24 items-center">
        
        {/* Left Side: Info */}
        <div className="flex-1 flex flex-col gap-10">
          <div className="flex flex-col gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3"
            >
              <div className="w-8 h-[1px] bg-accent-blue" />
              <span className="text-[10px] uppercase tracking-[0.4em] text-accent-blue font-mono">
                Connect
              </span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.8 }}
              className="text-5xl md:text-7xl font-black tracking-tighter text-white leading-[0.9] drop-shadow-2xl"
            >
              LET&apos;S WORK <br /> 
              <span className="text-white/20">TOGETHER</span> ON <br /> 
              YOUR NEXT <br /> 
              <span className="text-accent-blue inline-block relative">
                PROJECT.
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ delay: 1, duration: 1 }}
                  className="absolute -bottom-2 left-0 h-1 bg-accent-blue/30 blur-[2px]" 
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
            <a href="mailto:dev.jangramanish@gmail.com" className="flex items-center gap-5 group">
              <div className="w-14 h-14 rounded-2xl glass flex items-center justify-center group-hover:border-accent-blue/50 group-hover:shadow-[0_0_20px_rgba(6,182,212,0.2)] transition-all duration-500">
                <Mail size={20} className="text-white/30 group-hover:text-accent-blue transition-colors duration-500" />
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] uppercase tracking-[0.2em] text-white/20 font-mono mb-1">Inquiries</span>
                <span className="text-lg text-white/50 group-hover:text-white transition-colors duration-500 font-medium">dev.jangramanish@gmail.com</span>
              </div>
            </a>

            <div className="flex items-center gap-5 group">
              <div className="w-14 h-14 rounded-2xl glass flex items-center justify-center group-hover:border-accent-blue/50 transition-all duration-500">
                <MapPin size={20} className="text-white/30 group-hover:text-accent-blue transition-colors duration-500" />
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] uppercase tracking-[0.2em] text-white/20 font-mono mb-1">Presence</span>
                <span className="text-lg text-white/50 group-hover:text-white transition-colors duration-500 font-medium">Chandigarh, India</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Contact Form Card */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="flex-1 w-full max-w-[380px] relative group/card"
        >
          {/* Ambient Card Glow */}
          <div className="absolute -inset-1 bg-gradient-to-r from-accent-blue/20 to-purple-500/20 rounded-[2rem] blur-2xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-1000" />
          
          <div className="relative glass p-6 md:p-8 rounded-[2rem] border-white/5 overflow-hidden shadow-2xl">
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="py-10 flex flex-col items-center text-center gap-4"
                >
                  <div className="w-14 h-14 rounded-full bg-accent-blue/10 flex items-center justify-center relative">
                    <CheckCircle2 size={28} className="text-accent-blue z-10" />
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1.5, opacity: 0 }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="absolute inset-0 border border-accent-blue rounded-full"
                    />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold text-white tracking-tight">Transmission Received</h3>
                    <p className="text-white/40 text-[10px] leading-relaxed font-light">
                      I will respond shortly.
                    </p>
                  </div>
                </motion.div>
              ) : (
                <form key="form" onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="space-y-4">
                    <div className="group/input">
                      <label className="text-[7px] uppercase tracking-[0.2em] text-white/20 font-mono ml-1 mb-1 block group-focus-within/input:text-accent-blue transition-colors">Full Name</label>
                      <input 
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Name"
                        className="w-full bg-white/[0.02] border border-white/5 rounded-lg px-4 py-2 text-[12px] text-white placeholder:text-white/10 focus:outline-none focus:border-accent-blue/30 focus:bg-white/[0.04] transition-all duration-300"
                      />
                    </div>
                    
                    <div className="group/input">
                      <label className="text-[7px] uppercase tracking-[0.2em] text-white/20 font-mono ml-1 mb-1 block group-focus-within/input:text-accent-blue transition-colors">Email Address</label>
                      <input 
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="Email"
                        className="w-full bg-white/[0.02] border border-white/5 rounded-lg px-4 py-2 text-[12px] text-white placeholder:text-white/10 focus:outline-none focus:border-accent-blue/30 focus:bg-white/[0.04] transition-all duration-300"
                      />
                    </div>

                    <div className="group/input">
                      <label className="text-[7px] uppercase tracking-[0.2em] text-white/20 font-mono ml-1 mb-1 block group-focus-within/input:text-accent-blue transition-colors">Your Message</label>
                      <textarea 
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Message"
                        rows={2}
                        className="w-full bg-white/[0.02] border border-white/5 rounded-lg px-4 py-2 text-[12px] text-white placeholder:text-white/10 focus:outline-none focus:border-accent-blue/30 focus:bg-white/[0.04] transition-all duration-300 resize-none"
                      />
                    </div>
                  </div>

                  <motion.button
                    disabled={status === 'submitting'}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full h-10 bg-white text-black rounded-lg font-bold flex items-center justify-center gap-3 group/btn hover:bg-accent-blue hover:text-white transition-all duration-500 disabled:opacity-50 relative overflow-hidden shadow-[0_0_10px_rgba(255,255,255,0.05)] hover:shadow-[0_0_20px_rgba(6,182,212,0.25)]"
                  >
                    {status === 'submitting' ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      <>
                        <span className="uppercase tracking-[0.2em] text-[8px] relative z-10">Send Message</span>
                        <Send size={10} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform duration-500 relative z-10" />
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
