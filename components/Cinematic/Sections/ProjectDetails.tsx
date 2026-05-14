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
    <div className="group relative my-8 overflow-hidden rounded-xl bg-[#0a0a0a] border border-white/5 shadow-2xl">
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/5 bg-white/5">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/20" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/20" />
          </div>
          <span className="text-[10px] uppercase tracking-widest text-white/30 font-mono ml-2">
            {language}
          </span>
        </div>
        <button 
          onClick={onCopy}
          className="p-1.5 hover:bg-white/10 rounded-md transition-colors text-white/30 hover:text-white"
        >
          {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
        </button>
      </div>
      <div className="p-5 overflow-x-auto font-mono text-sm leading-relaxed text-white/80 scrollbar-hide">
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
  const headerHeight = useTransform(scrollValue, [0, 300], [400, 80]);
  const imageOpacity = useTransform(scrollValue, [0, 200], [1, 0]);
  const titleScale = useTransform(scrollValue, [0, 300], [1, 0.8]);
  const stickyTitleOpacity = useTransform(scrollValue, [200, 300], [0, 1]);
  const heroContentOpacity = useTransform(scrollValue, [0, 150], [1, 0]);
  
  // Dynamically position the close button to stay centered in both states
  const closeButtonTop = useTransform(scrollValue, [0, 300], [32, 16]);
  const closeButtonSize = useTransform(scrollValue, [0, 300], [48, 48]);
  
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const currentScroll = e.currentTarget.scrollTop;
    rawScrollValue.set(currentScroll);
    setIsCollapsed(currentScroll > 200);
  };

  useEffect(() => {
    if (isProjectDetailsOpen && selectedProject) {
      setGuideMessage(`Viewing project: ${selectedProject.title}. Explore the technical specifications and architecture.`);
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
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 md:p-8 overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setProjectDetailsOpen(false)}
            className="absolute inset-0 bg-black/90 backdrop-blur-3xl"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 20 }}
            className="relative w-full max-w-7xl h-full max-h-[92vh] glass rounded-[2.5rem] overflow-hidden flex flex-col border-white/10 shadow-[0_0_120px_rgba(0,0,0,0.8)]"
          >
            {/* Top-Right Persistent Close Button */}
            <motion.button
              style={{ top: closeButtonTop }}
              onClick={() => setProjectDetailsOpen(false)}
              className="absolute right-8 w-12 h-12 rounded-full glass flex items-center justify-center text-white/40 hover:text-white transition-all hover:bg-white/10 group z-50 pointer-events-auto shadow-xl"
            >
              <X size={24} className="group-hover:rotate-90 transition-transform duration-500" />
            </motion.button>

            {/* Dynamic Sticky Header */}
            <motion.div 
              style={{ height: headerHeight }}
              className="relative w-full shrink-0 z-20 overflow-hidden bg-[#030303] border-b border-white/5"
            >
              {/* Background Image with Parallax/Fade */}
              <motion.div style={{ opacity: imageOpacity }} className="absolute inset-0">
                {selectedProject.image && (
                  <Image 
                    src={selectedProject.image} 
                    alt={selectedProject.title} 
                    fill
                    className="object-cover" 
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-[#030303]/60 to-transparent" />
              </motion.div>
              
              {/* Sticky Bar Content (Visible when collapsed) */}
              <div className="absolute inset-0 flex items-center justify-start px-8 md:px-12 pointer-events-none">
                <motion.div 
                  style={{ opacity: stickyTitleOpacity }}
                  className="flex items-center gap-4"
                >
                  <div className="w-1 h-6 bg-accent-blue rounded-full" />
                  <div className="flex flex-col">
                    <h2 className="text-xl font-bold text-white tracking-tighter leading-none">{selectedProject.title}</h2>
                  </div>
                </motion.div>
              </div>

              {/* Large Hero Content (Visible when expanded) */}
              <motion.div 
                style={{ 
                  opacity: heroContentOpacity,
                  scale: titleScale
                }}
                className="absolute bottom-12 left-12 right-12 flex flex-col gap-6"
              >
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3">
                    <Sparkles className="text-accent-blue" size={14} />
                    <span className="text-[10px] uppercase tracking-[0.5em] text-accent-blue font-mono">Architectural Deep-Dive</span>
                  </div>
                  <h2 className="text-5xl md:text-8xl font-black tracking-tighter text-white uppercase leading-[0.85]">
                    {selectedProject.title}
                  </h2>
                </div>

                <div className="flex gap-4">
                  {selectedProject.liveUrl && (
                    <a href={selectedProject.liveUrl} target="_blank" className="glass px-8 py-3.5 rounded-2xl flex items-center gap-3 text-white hover:bg-white hover:text-black transition-all group pointer-events-auto">
                      <Globe size={18} className="group-hover:rotate-12 transition-transform" />
                      <span className="text-[11px] font-bold tracking-widest uppercase">Launch Production</span>
                    </a>
                  )}
                  {selectedProject.githubUrl && (
                    <a href={selectedProject.githubUrl} target="_blank" className="glass px-8 py-3.5 rounded-2xl flex items-center gap-3 text-white hover:bg-accent-blue transition-all group pointer-events-auto">
                      <Terminal size={18} />
                      <span className="text-[11px] font-bold tracking-widest uppercase">View Repository</span>
                    </a>
                  )}
                </div>
              </motion.div>
            </motion.div>

            {/* Scrollable Content Engine */}
            <div 
              ref={containerRef}
              onScroll={handleScroll}
              className="flex-1 overflow-y-auto scrollbar-hide px-8 md:px-20 py-16"
            >
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-20">
                
                {/* Main Content (Markdown Engine) */}
                <div className="lg:col-span-3">
                  <div className="prose prose-invert max-w-none 
                    prose-h1:text-2xl prose-h1:font-bold prose-h1:tracking-tight prose-h1:mb-6 prose-h1:text-white
                    prose-h2:text-xl prose-h2:font-semibold prose-h2:tracking-tight prose-h2:mt-12 prose-h2:mb-4 prose-h2:text-white/90
                    prose-h3:text-lg prose-h3:font-medium prose-h3:mt-8 prose-h3:mb-3 prose-h3:text-white/80
                    prose-p:text-white/50 prose-p:leading-relaxed prose-p:mb-4 prose-p:text-[15px]
                    prose-li:text-white/50 prose-li:mb-1 prose-li:text-[15px]
                    prose-strong:text-accent-blue prose-strong:font-semibold
                    prose-ul:list-disc prose-ul:ml-4
                  ">
                    <ReactMarkdown 
                      remarkPlugins={[remarkGfm]}
                      components={{
                        p: ({ children }) => <div className="mb-6 leading-relaxed text-white/60">{children}</div>,
                        code({ node, inline, className, children, ...props }: any) {
                          return !inline ? (
                            <CodeBlock className={className}>{children}</CodeBlock>
                          ) : (
                            <code className="bg-white/10 px-1.5 py-0.5 rounded text-accent-blue font-mono text-sm" {...props}>
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
                <div className="space-y-12 lg:sticky lg:top-0 h-fit">
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="h-[1px] w-6 bg-accent-blue/30" />
                      <span className="text-[9px] uppercase tracking-[0.4em] text-white/30 font-mono">Frameworks</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map(tech => (
                        <span key={tech} className="px-4 py-2 rounded-xl bg-white/[0.03] border border-white/5 text-[10px] font-bold tracking-widest text-white/40 uppercase hover:border-accent-blue/30 hover:text-white transition-all cursor-default">
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
