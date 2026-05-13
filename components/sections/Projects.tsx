'use client';

import { useData } from '@/contexts/DataContext';
import Section from '../Section';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ExternalLink, Github } from 'lucide-react';

export default function Projects() {
  const { projects } = useData();

  return (
    <Section id="projects" className="bg-transparent">
      <div className="mb-20">
        <span className="label">Selected Works</span>
        <h2 className="mt-4">Featured <span className="text-accent italic">Stories</span></h2>
      </div>

      <div className="flex flex-col gap-40">
        {projects.map((project: any, index: number) => (
          <ProjectItem key={project._id} project={project} index={index} />
        ))}
      </div>
    </Section>
  );
}

function ProjectItem({ project, index }: { project: any; index: number }) {
  const isEven = index % 2 === 0;

  return (
    <div className={`asymmetrical-grid gap-12 items-center ${isEven ? '' : 'md:flex-row-reverse'}`}>
      <div className={`col-span-12 md:col-span-7 ${isEven ? 'md:order-1' : 'md:order-2 md:col-start-6'}`}>
        <motion.div 
          whileHover={{ scale: 0.98 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative aspect-[16/10] overflow-hidden rounded-sm bg-foreground/5 group"
        >
          {project.image ? (
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-[1.5s] group-hover:scale-110"
            />
          ) : (
             <div className="w-full h-full flex items-center justify-center opacity-20 h1">
               0{index + 1}
             </div>
          )}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </motion.div>
      </div>

      <div className={`col-span-12 md:col-span-4 ${isEven ? 'md:order-2 md:col-start-9' : 'md:order-1 md:col-start-1'}`}>
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <span className="text-accent font-mono text-sm">0{index + 1}</span>
            <div className="h-[1px] flex-1 bg-foreground/10" />
          </div>
          
          <h3 className="h2">{project.title}</h3>
          
          <p className="body text-sm line-clamp-4">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mt-2">
            {project.technologies?.slice(0, 4).map((tech: string) => (
              <span key={tech} className="text-[10px] px-2 py-1 rounded-full border border-foreground/10 uppercase tracking-tighter opacity-60">
                {tech}
              </span>
            ))}
          </div>

          <div className="flex gap-6 mt-4">
            {project.liveUrl && (
              <a 
                href={project.liveUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest hover:text-accent transition-colors group"
              >
                View Project <ExternalLink size={12} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
            )}
            {project.githubUrl && (
              <a 
                href={project.githubUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest hover:text-accent transition-colors"
              >
                Source <Github size={12} />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
