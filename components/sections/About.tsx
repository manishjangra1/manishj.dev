'use client';

import Section from '../Section';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <Section id="about" className="relative">
      <div className="asymmetrical-grid gap-y-20">
        <div className="col-span-12 md:col-span-6">
          <span className="label">The Persona</span>
          <h2 className="mt-6 mb-12">Driven by <span className="text-accent">Aesthetics</span> & Efficiency.</h2>
          
          <div className="flex flex-col gap-8 max-w-lg">
            <p className="body">
              Hello, I&apos;m Manish. I build digital products that bridge the gap between complex engineering and intuitive human experiences. My approach is rooted in minimalism, where every line of code and every pixel serves a purpose.
            </p>
            <p className="body opacity-60">
              With a deep focus on performance and interaction design, I help brands and startups create memorable digital identities that stand out in a crowded landscape.
            </p>
          </div>
        </div>

        <div className="col-span-12 md:col-span-5 md:col-start-8 flex flex-col justify-center">
          <div className="grid grid-cols-2 gap-x-8 gap-y-12">
            <MetricItem label="Experience" value="5+" suffix="Years" />
            <MetricItem label="Projects" value="40+" suffix="Completed" />
            <MetricItem label="Philosophy" value="Less" suffix="Is More" />
            <MetricItem label="Timezone" value="IST" suffix="GMT+5:30" />
          </div>
          
          <div className="mt-16 pt-8 border-t border-foreground/10">
            <blockquote className="italic text-xl opacity-80 leading-relaxed">
              &ldquo;Design is not just what it looks like and feels like. Design is how it works.&rdquo;
            </blockquote>
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute right-0 bottom-0 w-1/3 h-[1px] bg-gradient-to-r from-transparent to-accent/20" />
      <div className="absolute right-0 bottom-0 w-[1px] h-1/3 bg-gradient-to-b from-transparent to-accent/20" />
    </Section>
  );
}

function MetricItem({ label, value, suffix }: { label: string; value: string; suffix: string }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="label text-[10px]">{label}</span>
      <div className="flex flex-col">
        <span className="text-4xl font-bold font-display">{value}</span>
        <span className="text-xs opacity-40 uppercase tracking-widest">{suffix}</span>
      </div>
    </div>
  );
}
