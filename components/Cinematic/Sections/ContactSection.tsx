'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, MapPin, ArrowRight } from 'lucide-react';

const ContactSection: React.FC = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center p-24 pointer-events-none">
      <div className="w-full max-w-4xl pointer-events-auto flex flex-col md:flex-row gap-24">
        
        {/* Left Side: Info */}
        <div className="flex-1 flex flex-col gap-12">
          <div className="flex flex-col gap-4">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[10px] uppercase tracking-[0.5em] text-accent-blue font-mono"
            >
              Get in Touch
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-6xl font-extrabold tracking-tighter text-white"
            >
              LET&apos;S BUILD <br /> SOMETHING <br /> EXTRAORDINARY.
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col gap-6"
          >
            <a href="mailto:manish@example.com" className="flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-full glass flex items-center justify-center group-hover:border-accent-blue transition-all">
                <Mail size={18} className="text-white/40 group-hover:text-white transition-colors" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-widest text-white/20 font-mono">Email</span>
                <span className="text-lg text-white/60 group-hover:text-white transition-colors">manish@example.com</span>
              </div>
            </a>

            <div className="flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-full glass flex items-center justify-center">
                <MapPin size={18} className="text-white/40" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-widest text-white/20 font-mono">Location</span>
                <span className="text-lg text-white/60">Earth, Solar System</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Quick Form Placeholder or CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="flex-1 glass p-8 rounded-3xl flex flex-col justify-between border-accent-blue/10"
        >
          <div className="flex flex-col gap-6">
            <h3 className="text-xl font-semibold text-white">Quick Message</h3>
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-widest text-white/20 font-mono ml-1">Your Name</label>
                <div className="w-full h-[1px] bg-white/10" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-widest text-white/20 font-mono ml-1">Your Email</label>
                <div className="w-full h-[1px] bg-white/10" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-widest text-white/20 font-mono ml-1">The Mission</label>
                <div className="w-full h-[40px] bg-white/5 rounded-lg border border-white/5" />
              </div>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full mt-8 bg-white text-black py-4 rounded-xl font-bold flex items-center justify-center gap-2 group overflow-hidden relative"
          >
            <span className="relative z-10 uppercase tracking-tighter">Initiate Transmission</span>
            <Send size={16} className="relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactSection;
