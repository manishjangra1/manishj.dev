'use client';

import { motion } from 'framer-motion';

export default function Contact() {
  return (
    <section id="contact" className="flex flex-col gap-12 pt-20 pb-0">
      <div className="flex flex-col mb-[48px]">
        <h2 className="flex flex-col">
          <span>Let's Work</span>
          <span className="h1-grey">Together</span>
        </h2>
      </div>

      <form className="flex flex-col gap-8 max-w-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-white/30 ml-2">Name</label>
            <input 
              type="text" 
              placeholder="Your Name"
              className="bg-[#1A1A1A] border border-white/5 rounded-2xl px-6 py-4 text-white placeholder:text-white/10 outline-none focus:border-[#FF5F2E] transition-colors"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-white/30 ml-2">Email</label>
            <input 
              type="email" 
              placeholder="Your@email.com"
              className="bg-[#1A1A1A] border border-white/5 rounded-2xl px-6 py-4 text-white placeholder:text-white/10 outline-none focus:border-[#FF5F2E] transition-colors"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-white/30 ml-2">Budget</label>
          <div className="relative">
            <select className="w-full bg-[#1A1A1A] border border-white/5 rounded-2xl px-6 py-4 text-white/50 outline-none appearance-none focus:border-[#FF5F2E] transition-colors">
              <option>Select...</option>
              <option>$1,000 - $5,000</option>
              <option>$5,000 - $10,000</option>
              <option>$10,000+</option>
            </select>
            <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none opacity-30">
              <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L6 6L11 1" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-white/30 ml-2">Message</label>
          <textarea 
            placeholder="Message"
            rows={4}
            className="bg-[#1A1A1A] border border-white/5 rounded-2xl px-6 py-4 text-white placeholder:text-white/10 outline-none focus:border-[#FF5F2E] transition-colors resize-none"
          />
        </div>

        <button 
          type="submit"
          className="bg-[#FF5F2E] text-white py-5 rounded-2xl font-black uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-orange-500/10"
        >
          Submit
        </button>
      </form>
    </section>
  );
}
