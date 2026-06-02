import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useData, Project } from '@/contexts/DataContext';
import { useExperienceStore } from '@/lib/store/experience-store';
import { ExternalLink, Github, ArrowUpRight, CheckCircle, ChevronDown } from 'lucide-react';

export const ProjectsShowcase: React.FC = () => {
  const { projects } = useData();
  const { setSelectedProject, setProjectDetailsOpen } = useExperienceStore();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };
    checkScreen();
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, []);

  if (!projects || projects.length === 0) return null;

  const handleCardClick = (project: Project) => {
    setSelectedProject(project);
    setProjectDetailsOpen(true);
  };

  const handleToggle = () => {
    if (isExpanded) {
      const element = document.getElementById('projects');
      if (element) {
        const offset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      }
    }
    setIsExpanded(!isExpanded);
  };

  const defaultCount = isLargeScreen ? 5 : 3;
  const visibleProjects = isExpanded ? projects : projects.slice(0, defaultCount);
  const showButton = projects.length > defaultCount;

  return (
    <div className="w-full flex flex-col items-center gap-10">
      <motion.div 
        layout="position"
        className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence>
          {visibleProjects.map((project, index) => {
            // Spotlight the first project as a large Bento card
            const isLarge = index === 0;
            
            return (
              <motion.div
                key={project._id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                onClick={() => handleCardClick(project)}
                className={`bento-card group flex flex-col justify-between min-h-[420px] cursor-pointer relative overflow-hidden ${
                  isLarge ? 'md:col-span-2' : 'md:col-span-1'
                }`}
              >
                
                <div className="relative z-10 space-y-4">
                  {/* Thumbnail Container */}
                  <div className="relative w-full aspect-video rounded-[18px] overflow-hidden border border-border-standard bg-surface-secondary">
                    {/* Fallback content behind image */}
                    <div className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(circle_at_50%_50%,rgba(228,179,99,0.06),transparent_70%)]">
                      <span className="text-foreground/4 font-black text-6xl uppercase tracking-tight select-none">
                        {project.title?.slice(0, 3) || '—'}
                      </span>
                    </div>
                    {project.image && (
                      <Image 
                        src={project.image} 
                        alt={project.title}
                        fill
                        sizes={isLarge ? '(max-width: 768px) 100vw, 800px' : '(max-width: 768px) 100vw, 400px'}
                        className="object-cover group-hover:scale-102 transition-all duration-700 ease-out relative z-1"
                      />
                    )}
                    {/* Live Node status overlay */}
                    <div className="!absolute top-3 left-3 w-fit px-2 py-1 glass border-border-standard rounded-md flex items-center gap-1.5 backdrop-blur-md z-2">
                      <span className={`w-1.5 h-1.5 rounded-full ${project.isCurrentlyWorking ? 'bg-emerald-500 animate-pulse' : 'bg-accent-amber'}`} />
                      <span className="text-[7.5px] font-mono font-bold tracking-widest text-foreground/70 uppercase whitespace-nowrap">
                        {project.isCurrentlyWorking ? 'Active' : 'Completed'}
                      </span>
                    </div>
                  </div>

                  {/* Title & Stats */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between gap-4">
                      <h3 className="text-xl sm:text-2xl font-bold text-foreground uppercase tracking-tight group-hover:text-accent-amber transition-colors truncate">
                        {project.title}
                      </h3>
                      <div className="w-7 h-7 rounded-lg glass border-border-standard flex items-center justify-center text-foreground/45 group-hover:text-accent-amber group-hover:bg-surface-secondary transition-all">
                        <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </div>
                    </div>
                    <p className="text-xs leading-relaxed text-foreground/50 font-light line-clamp-3">
                      {project.description}
                    </p>
                  </div>
                </div>

                {/* Bottom Panel: Tech stack & Source anchors */}
                <div className="relative z-10 pt-6 mt-6 border-t border-border-standard flex items-center justify-between gap-6">
                  <div className="flex flex-wrap gap-1">
                    {project.technologies?.slice(0, 3).map((tech: string) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded bg-surface-secondary border border-border-standard text-[8px] uppercase tracking-wider text-foreground/60 font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies && project.technologies.length > 3 && (
                      <span className="px-1.5 py-0.5 rounded bg-accent-amber/10 border border-accent-amber/25 text-[8px] uppercase tracking-widest text-accent-amber font-mono font-bold">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-4 shrink-0">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-foreground/40 hover:text-accent-amber transition-colors"
                        title="Source code"
                      >
                        <Github size={14} />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-foreground/40 hover:text-accent-amber transition-colors"
                        title="Live demo"
                      >
                        <ExternalLink size={14} />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {showButton && (
        <motion.button
          layout
          onClick={handleToggle}
          className="px-6 h-12 glass hover:bg-surface-secondary/80 text-foreground text-[10px] uppercase font-bold tracking-widest transition-all duration-200 rounded-[20px] cursor-pointer flex items-center justify-center gap-2 shadow-md hover:border-accent-amber/30 active:scale-98"
        >
          <span>{isExpanded ? 'Show Less' : 'Show More Projects'}</span>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown size={14} className="text-accent-amber" />
          </motion.div>
        </motion.button>
      )}
    </div>
  );
};

export default ProjectsShowcase;
