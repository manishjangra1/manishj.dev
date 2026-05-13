'use client';

import Section from '../Section';
import { motion } from 'framer-motion';
import { Mail, ArrowUpRight } from 'lucide-react';

export default function Contact() {
  return (
    <Section id="contact" className="relative border-t border-foreground/5 py-40">
      <div className="asymmetrical-grid gap-y-20">
        <div className="col-span-12 md:col-span-7">
          <span className="label">Get in Touch</span>
          <h2 className="mt-6 mb-12">Let&apos;s build something <span className="text-accent italic">extraordinary</span> together.</h2>
          
          <div className="flex flex-col gap-12">
            <a 
              href="mailto:hello@manishj.dev" 
              className="group flex items-center gap-6"
            >
              <div className="w-16 h-16 rounded-full border border-foreground/10 flex items-center justify-center group-hover:bg-accent group-hover:border-accent transition-all duration-500">
                <Mail className="group-hover:text-white transition-colors" />
              </div>
              <div className="flex flex-col">
                <span className="label text-[10px]">Email Me</span>
                <span className="text-2xl font-medium">hello@manishj.dev</span>
              </div>
            </a>

            <div className="flex flex-wrap gap-12 mt-12">
              <SocialLink label="Twitter" href="https://twitter.com" />
              <SocialLink label="LinkedIn" href="https://linkedin.com" />
              <SocialLink label="GitHub" href="https://github.com" />
            </div>
          </div>
        </div>

        <div className="col-span-12 md:col-span-4 md:col-start-9 flex flex-col justify-end">
          <p className="body text-sm opacity-40 mb-8">
            Currently available for select freelance opportunities and full-time creative roles. Based in India, working worldwide.
          </p>
          <div className="h-[1px] w-full bg-foreground/10 mb-8" />
          <div className="flex justify-between items-center">
            <span className="label">Local Time</span>
            <span className="text-sm font-mono">{new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })} IST</span>
          </div>
        </div>
      </div>
    </Section>
  );
}

function SocialLink({ label, href }: { label: string; href: string }) {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className="group flex items-center gap-2"
    >
      <span className="label group-hover:text-foreground transition-colors">{label}</span>
      <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
    </a>
  );
}
