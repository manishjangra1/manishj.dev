'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import Image from 'next/image';
import { useExperienceStore } from '@/lib/store/experience-store';
import { X, Sparkles, Globe, Terminal, Copy, Check, Code2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const CodeBlock = ({ children, className }: { children: any, className?: string }) => {
  const [copied, setCopied] = useState(false);
  const language = className ? className.replace(/language-/, '') : 'code';

  const onCopy = () => {
    navigator.clipboard.writeText(String(children).replace(/\n$/, ''));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group relative my-8 overflow-hidden rounded-xl bg-graphite-900 border border-white/[0.05] shadow-2xl">
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/[0.05] bg-white/[0.02]">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-2 h-2 rounded-full bg-accent-amber/20" />
            <div className="w-2 h-2 rounded-full bg-accent-amber/20" />
            <div className="w-2 h-2 rounded-full bg-accent-amber/20" />
          </div>
          <span className="text-[9px] uppercase tracking-[0.3em] text-foreground/20 font-mono ml-3">
            Source // {language}
          </span>
        </div>
        <button 
          onClick={onCopy}
          className="p-1.5 hover:bg-white/[0.05] rounded-md transition-all text-foreground/30 hover:text-accent-amber"
        >
          {copied ? <Check size={14} className="text-accent-amber" /> : <Copy size={14} />}
        </button>
      </div>
      <div className="p-6 overflow-x-auto font-mono text-[13px] leading-relaxed text-foreground/75 scrollbar-hide">
        <code className="block whitespace-pre">{children}</code>
      </div>
    </div>
  );
};

const ProjectDetails: React.FC = () => {
  const { isProjectDetailsOpen, setProjectDetailsOpen, selectedProject, setGuideMessage } = useExperienceStore();
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Use MotionValues with Spring physics for high-end smoothness
  const rawScrollValue = useMotionValue(0);
  const scrollValue = useSpring(rawScrollValue, {
    damping: 25,
    stiffness: 120,
    mass: 0.5
  });

  // Transform values for buttery-smooth header collapse
  const headerHeight = useTransform(scrollValue, [0, 300], [400, 100]);
  const imageOpacity = useTransform(scrollValue, [0, 200], [1, 0]);
  const titleScale = useTransform(scrollValue, [0, 300], [1, 0.8]);
  const stickyTitleOpacity = useTransform(scrollValue, [200, 300], [0, 1]);
  const heroContentOpacity = useTransform(scrollValue, [0, 150], [1, 0]);
  
  // Dynamically position the close button to stay centered in both states
  const closeButtonTop = useTransform(scrollValue, [0, 300], [40, 26]);
  
  // Sidebar transform values
  const sidebarIconsY = useTransform(scrollValue, [200, 300], [20, 0]);
  const sidebarIconsHeight = useTransform(scrollValue, [200, 300], [0, 48]);
  const sidebarIconsMargin = useTransform(scrollValue, [200, 300], [0, 40]);
  
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const currentScroll = e.currentTarget.scrollTop;
    rawScrollValue.set(currentScroll);
    setIsCollapsed(currentScroll > 200);
  };

  useEffect(() => {
    if (isProjectDetailsOpen && selectedProject) {
      setGuideMessage(`Initiating deep-dive into ${selectedProject.title}. Analyzing architecture and technical specifications.`);
    }
    // Reset scroll when modal opens
    if (isProjectDetailsOpen && containerRef.current) {
      containerRef.current.scrollTop = 0;
      rawScrollValue.set(0);
      setIsCollapsed(false);
    }
  }, [isProjectDetailsOpen, selectedProject, setGuideMessage, rawScrollValue]);

  if (!selectedProject) return null;

  return (
    <AnimatePresence>
      {isProjectDetailsOpen && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 md:p-12 overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setProjectDetailsOpen(false)}
            className="absolute inset-0 bg-background/95 backdrop-blur-3xl"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1, y: 20 }}
            className="relative w-full max-w-7xl h-full max-h-[92vh] glass rounded-[3rem] overflow-hidden flex flex-col border-white/[0.05] shadow-[0_0_120px_rgba(0,0,0,0.8)]"
          >
            {/* Top-Right Persistent Close Button */}
            <motion.button
              style={{ top: closeButtonTop }}
              onClick={() => setProjectDetailsOpen(false)}
              className="absolute right-10 w-12 h-12 rounded-full glass flex items-center justify-center text-foreground/30 hover:text-accent-amber transition-all hover:bg-white/[0.02] group z-50 pointer-events-auto"
            >
              <X size={20} className="group-hover:rotate-90 transition-transform duration-700" />
            </motion.button>

            {/* Dynamic Sticky Header */}
            <motion.div 
              style={{ height: headerHeight }}
              className="relative w-full shrink-0 z-20 overflow-hidden bg-background border-b border-white/[0.05]"
            >
              {/* Background Image with Parallax/Fade */}
              <motion.div style={{ opacity: imageOpacity }} className="absolute inset-0">
                {selectedProject.image && (
                  <Image 
                    src={selectedProject.image} 
                    alt={selectedProject.title} 
                    fill
                    className="object-cover scale-105" 
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
                <div className="absolute inset-0 bg-accent-amber/[0.02] mix-blend-overlay" />
              </motion.div>
              
              {/* Sticky Bar Content (Visible when collapsed) */}
              <div className="absolute inset-0 flex items-center justify-start px-12 md:px-16 pointer-events-none">
                <motion.div 
                  style={{ opacity: stickyTitleOpacity }}
                  className="flex items-center gap-6"
                >
                  <div className="w-1 h-6 bg-accent-amber shadow-[0_0_10px_rgba(214,168,106,0.4)]" />
                  <div className="flex flex-col">
                    <h2 className="text-xl font-bold text-foreground tracking-tight leading-none">{selectedProject.title.toUpperCase()}</h2>
                    <span className="text-[9px] uppercase tracking-[0.3em] text-foreground/20 font-mono mt-2">Architecture / Active</span>
                  </div>
                </motion.div>
              </div>

              {/* Large Hero Content (Visible when expanded) */}
              <motion.div 
                style={{ 
                  opacity: heroContentOpacity,
                  scale: titleScale
                }}
                className="absolute bottom-12 left-12 right-12 flex flex-col gap-8"
              >
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-4">
                    <Terminal className="text-accent-amber" size={14} />
                    <span className="text-[10px] uppercase tracking-[0.6em] text-accent-amber font-mono">Project Specification // Deep-Dive</span>
                  </div>
                  <h2 className="text-5xl md:text-8xl font-bold tracking-tight text-foreground uppercase leading-[0.85]">
                    {selectedProject.title}
                  </h2>
                </div>

                <div className="flex gap-6">
                  {selectedProject.liveUrl && (
                    <a href={selectedProject.liveUrl} target="_blank" className="glass px-10 py-4 rounded-xl flex items-center gap-4 text-foreground hover:border-accent-amber/30 transition-all group pointer-events-auto overflow-hidden relative">
                      <Globe size={16} className="text-accent-amber group-hover:rotate-12 transition-transform" />
                      <span className="text-[11px] font-bold tracking-[0.3em] uppercase">Launch Production</span>
                      <div className="absolute inset-0 bg-accent-amber/[0.03] opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  )}
                  {selectedProject.githubUrl && (
                    <a href={selectedProject.githubUrl} target="_blank" className="glass px-10 py-4 rounded-xl flex items-center gap-4 text-foreground hover:border-accent-amber/30 transition-all group pointer-events-auto overflow-hidden relative">
                      <Code2 size={16} className="text-accent-amber" />
                      <span className="text-[11px] font-bold tracking-[0.3em] uppercase">Sector Codebase</span>
                      <div className="absolute inset-0 bg-accent-amber/[0.03] opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  )}
                </div>
              </motion.div>
            </motion.div>

            {/* Scrollable Content Engine */}
            <div 
              ref={containerRef}
              onScroll={handleScroll}
              className="flex-1 overflow-y-auto scrollbar-hide px-8 md:px-24 pt-12 pb-32"
            >
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-24">
                
                {/* Main Content (Markdown Engine) */}
                <div className="lg:col-span-3">
                  <div className="prose prose-invert max-w-none 
                    prose-h1:text-3xl prose-h1:font-bold prose-h1:tracking-tight prose-h1:mb-8 prose-h1:text-foreground
                    prose-h2:text-2xl prose-h2:font-semibold prose-h2:tracking-tight prose-h2:mt-16 prose-h2:mb-6 prose-h2:text-foreground/90
                    prose-h3:text-xl prose-h3:font-medium prose-h3:mt-10 prose-h3:mb-4 prose-h3:text-foreground/80
                    prose-p:text-foreground/60 prose-p:leading-relaxed prose-p:mb-6 prose-p:text-[16px] prose-p:font-light
                    prose-li:text-foreground/60 prose-li:mb-2 prose-li:text-[16px] prose-li:font-light
                    prose-strong:text-accent-amber prose-strong:font-semibold
                    prose-ul:list-none prose-ul:ml-0
                  ">
                    <ReactMarkdown 
                      remarkPlugins={[remarkGfm]}
                      components={{
                        p: ({ children }) => <div className="mb-8 leading-relaxed text-foreground/65 font-light">{children}</div>,
                        li: ({ children }) => (
                          <div className="flex gap-4 mb-3 text-foreground/65 font-light">
                            <span className="text-accent-amber/30">/</span>
                            <span>{children}</span>
                          </div>
                        ),
                        code({ node, inline, className, children, ...props }: any) {
                          return !inline ? (
                            <CodeBlock className={className}>{children}</CodeBlock>
                          ) : (
                            <code className="bg-white/[0.03] border border-white/[0.05] px-2 py-0.5 rounded text-accent-amber font-mono text-[13px]" {...props}>
                              {children}
                            </code>
                          )
                        }
                      }}
                    >
                      {selectedProject.content || selectedProject.description}
                    </ReactMarkdown>
                  </div>
                </div>

                {/* Technical Specifications Sidebar */}
                <div className="lg:sticky lg:top-4 h-fit">
                  {/* Collapsed State Quick Actions */}
                  <motion.div 
                    style={{ 
                      opacity: stickyTitleOpacity,
                      y: sidebarIconsY,
                      height: sidebarIconsHeight,
                      marginBottom: sidebarIconsMargin
                    }}
                    className="flex gap-4 overflow-hidden"
                  >
                    {selectedProject.liveUrl && (
                      <a 
                        href={selectedProject.liveUrl} 
                        target="_blank" 
                        className="w-12 h-12 rounded-full glass border border-white/[0.05] flex items-center justify-center text-foreground/30 hover:text-accent-amber hover:border-accent-amber/30 transition-all duration-700 backdrop-blur-xl"
                      >
                        <Globe size={18} />
                      </a>
                    )}
                    {selectedProject.githubUrl && (
                      <a 
                        href={selectedProject.githubUrl} 
                        target="_blank" 
                        className="w-12 h-12 rounded-full glass border border-white/[0.05] flex items-center justify-center text-foreground/30 hover:text-accent-amber hover:border-accent-amber/30 transition-all duration-700 backdrop-blur-xl"
                      >
                        <Code2 size={18} />
                      </a>
                    )}
                  </motion.div>

                  <div className="space-y-8">
                    <div className="flex items-center gap-4">
                      <div className="h-[1px] w-8 bg-accent-amber/30" />
                      <span className="text-[9px] uppercase tracking-[0.4em] text-foreground/30 font-mono">Specification</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map(tech => (
                        <span key={tech} className="px-5 py-2.5 rounded-lg bg-white/[0.02] border border-white/[0.05] text-[10px] font-bold tracking-widest text-foreground/40 uppercase hover:border-accent-amber/20 hover:text-foreground/70 transition-all duration-500 cursor-default">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>

  );
};

export default ProjectDetails;
