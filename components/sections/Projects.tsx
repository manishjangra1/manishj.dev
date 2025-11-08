'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { IProject } from '@/lib/models/Project';
import { ExternalLink, Github, Sparkles, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from '@/contexts/ThemeContext';

interface ProjectsProps {
  projects: IProject[];
  showAll?: boolean;
}

export default function Projects({ projects, showAll = false }: ProjectsProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [filter, setFilter] = useState<string>('all');
  const filterScrollRef = useRef<HTMLDivElement>(null);
  const { colors } = useTheme();

  const allTechnologies = Array.from(
    new Set(projects.flatMap((p) => p.technologies || []))
  );

  const scrollFilters = (direction: 'left' | 'right') => {
    if (filterScrollRef.current) {
      const scrollAmount = 200;
      filterScrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  // Filter projects based on technology
  let filteredProjects =
    filter === 'all'
      ? projects
      : projects.filter((p) => p.technologies?.includes(filter));

  // On home page: if no filter, show featured projects; if filter applied, show first 6
  if (!showAll) {
    if (filter === 'all') {
      filteredProjects = projects.filter((p) => p.featured);
    } else {
      filteredProjects = filteredProjects.slice(0, 6);
    }
  }

  const hasMoreProjects = !showAll && (
    (filter === 'all' && projects.filter((p) => p.featured).length < projects.length) ||
    (filter !== 'all' && projects.filter((p) => p.technologies?.includes(filter)).length > 6)
  );

  return (
    <section 
      id="projects" 
      className="py-24 px-6 sm:px-8 lg:px-12"
      style={{ backgroundColor: colors.background }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 
            className="text-4xl md:text-5xl font-bold mb-6"
            style={{ color: colors.textPrimary }}
          >
            Projects
          </h2>
          <div 
            className="w-24 h-1 mx-auto mb-10 rounded-full"
            style={{ 
              background: `linear-gradient(to right, ${colors.gradientFrom}, ${colors.gradientTo})`
            }}
          />
          
          {allTechnologies.length > 0 && (
            <div className="relative max-w-4xl mx-auto">
              {/* Left scroll button */}
              <motion.button
                onClick={() => scrollFilters('left')}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full backdrop-blur-lg border transition-all hidden md:flex items-center justify-center"
                style={{
                  backgroundColor: colors.cardBg,
                  borderColor: colors.cardBorder,
                  color: colors.textPrimary,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = colors.cardBorder;
                  e.currentTarget.style.borderColor = colors.gradientFrom;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = colors.cardBg;
                  e.currentTarget.style.borderColor = colors.cardBorder;
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Scroll filters left"
              >
                <ChevronLeft className="w-5 h-5" />
              </motion.button>

              {/* Left gradient fade overlay */}
              <div
                className="absolute left-12 md:left-16 top-0 bottom-0 w-20 pointer-events-none hidden md:block"
                style={{
                  background: `linear-gradient(to right, ${colors.background}, transparent)`,
                  zIndex: 15,
                }}
              />

              {/* Wrapper to clip overflow */}
              <div className="relative overflow-hidden px-12 md:px-16">

                {/* Scrollable filter container */}
                <div
                  ref={filterScrollRef}
                  className="flex gap-3 overflow-x-auto scrollbar-hide py-2"
                  style={{
                    WebkitOverflowScrolling: 'touch',
                  }}
                >
                <motion.button
                  onClick={() => setFilter('all')}
                  className="px-6 py-3 rounded-full text-sm font-semibold transition-all border whitespace-nowrap shrink-0"
                  style={{
                    background: filter === 'all' 
                      ? `linear-gradient(to right, ${colors.gradientFrom}, ${colors.gradientTo})`
                      : colors.cardBg,
                    borderColor: filter === 'all' ? 'transparent' : colors.cardBorder,
                    color: filter === 'all' ? '#fff' : colors.textPrimary,
                    boxShadow: filter === 'all' 
                      ? `0 4px 15px ${colors.gradientFrom}40`
                      : 'none',
                  }}
                  onMouseEnter={(e) => {
                    if (filter !== 'all') {
                      e.currentTarget.style.backgroundColor = colors.cardBorder;
                      e.currentTarget.style.borderColor = colors.gradientFrom;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (filter !== 'all') {
                      e.currentTarget.style.backgroundColor = colors.cardBg;
                      e.currentTarget.style.borderColor = colors.cardBorder;
                    }
                  }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.3 }}
                >
                  All
                </motion.button>
                {allTechnologies.map((tech, index) => (
                  <motion.button
                    key={tech}
                    onClick={() => setFilter(tech)}
                    className="px-6 py-3 rounded-full text-sm font-semibold transition-all border whitespace-nowrap shrink-0"
                    style={{
                      background: filter === tech 
                        ? `linear-gradient(to right, ${colors.gradientFrom}, ${colors.gradientTo})`
                        : colors.cardBg,
                      borderColor: filter === tech ? 'transparent' : colors.cardBorder,
                      color: filter === tech ? '#fff' : colors.textPrimary,
                      boxShadow: filter === tech 
                        ? `0 4px 15px ${colors.gradientFrom}40`
                        : 'none',
                    }}
                    onMouseEnter={(e) => {
                      if (filter !== tech) {
                        e.currentTarget.style.backgroundColor = colors.cardBorder;
                        e.currentTarget.style.borderColor = colors.gradientFrom;
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (filter !== tech) {
                        e.currentTarget.style.backgroundColor = colors.cardBg;
                        e.currentTarget.style.borderColor = colors.cardBorder;
                      }
                    }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    {tech}
                  </motion.button>
                ))}
                </div>
              </div>

              {/* Right gradient fade overlay */}
              <div
                className="absolute right-12 md:right-16 top-0 bottom-0 w-20 pointer-events-none hidden md:block"
                style={{
                  background: `linear-gradient(to left, ${colors.background}, transparent)`,
                  zIndex: 15,
                }}
              />

              {/* Right scroll button */}
              <motion.button
                onClick={() => scrollFilters('right')}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full backdrop-blur-lg border transition-all hidden md:flex items-center justify-center"
                style={{
                  backgroundColor: colors.cardBg,
                  borderColor: colors.cardBorder,
                  color: colors.textPrimary,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = colors.cardBorder;
                  e.currentTarget.style.borderColor = colors.gradientFrom;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = colors.cardBg;
                  e.currentTarget.style.borderColor = colors.cardBorder;
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Scroll filters right"
              >
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </div>
          )}
        </motion.div>

        {filteredProjects.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            className="text-center py-12 min-h-[300px] flex items-center justify-center"
            style={{ color: colors.textSecondary }}
          >
            <div>
              <div className="text-6xl mb-4">🚀</div>
              <p className="text-lg">
                {projects.length === 0
                  ? 'No projects to display yet. Check back soon!'
                  : `No projects found matching "${filter}".`}
              </p>
            </div>
          </motion.div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredProjects.map((project, i) => (
              <motion.div
                key={project._id?.toString() || i}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.8 }}
                className="group relative backdrop-blur-lg rounded-2xl overflow-hidden border transition-all cursor-pointer"
                style={{
                  backgroundColor: colors.cardBg,
                  borderColor: colors.cardBorder,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = colors.gradientFrom;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = colors.cardBorder;
                }}
              >
                <Link
                  href={`/projects/${project._id}`}
                  className="absolute inset-0 z-10"
                  aria-label={`View details for ${project.title}`}
                />
                <div 
                  className="relative h-48"
                  style={{
                    background: `linear-gradient(to bottom right, ${colors.gradientFrom}20, ${colors.gradientTo}20)`,
                  }}
                >
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-4xl">
                      🚀
                    </div>
                  )}
                  {project.isCurrentlyWorking && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute top-3 right-3 px-3 py-1.5 rounded-full backdrop-blur-lg border flex items-center gap-1.5 shadow-lg"
                      style={{
                        background: `linear-gradient(to right, ${colors.gradientFrom}, ${colors.gradientTo})`,
                        borderColor: colors.cardBorder,
                      }}
                    >
                      <Sparkles className="w-3.5 h-3.5 text-white animate-pulse" />
                      <span className="text-xs font-semibold text-white">Working On</span>
                    </motion.div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div 
                    className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-20"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 backdrop-blur-lg rounded-xl border transition-colors"
                        style={{
                          backgroundColor: colors.cardBg,
                          borderColor: colors.cardBorder,
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = colors.cardBorder;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = colors.cardBg;
                        }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink className="w-5 h-5" style={{ color: colors.textPrimary }} />
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 backdrop-blur-lg rounded-xl border transition-colors"
                        style={{
                          backgroundColor: colors.cardBg,
                          borderColor: colors.cardBorder,
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = colors.cardBorder;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = colors.cardBg;
                        }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Github className="w-5 h-5" style={{ color: colors.textPrimary }} />
                      </a>
                    )}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <h3 
                      className="text-xl font-bold"
                      style={{ color: colors.textPrimary }}
                    >
                      {project.title}
                    </h3>
                    {project.isCurrentlyWorking && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{
                          opacity: [1, 0.7, 1],
                          scale: [1, 1.2, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className="w-2 h-2 rounded-full"
                        style={{
                          background: `linear-gradient(to right, ${colors.gradientFrom}, ${colors.gradientTo})`,
                        }}
                      />
                    )}
                  </div>
                  <p 
                    className="mb-4 line-clamp-3 text-sm leading-relaxed"
                    style={{ color: colors.textSecondary }}
                  >
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies?.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1.5 text-xs rounded-xl border font-medium"
                        style={{
                          backgroundColor: colors.cardBg,
                          borderColor: colors.cardBorder,
                          color: colors.textSecondary,
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies && project.technologies.length > 3 && (
                      <span 
                        className="px-3 py-1.5 text-xs rounded-xl border font-medium"
                        style={{
                          backgroundColor: colors.cardBg,
                          borderColor: colors.cardBorder,
                          color: colors.textSecondary,
                        }}
                      >
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-end">
                    <span 
                      className="transition-colors font-medium text-sm"
                      style={{ color: colors.textSecondary }}
                      onMouseEnter={(e) => e.currentTarget.style.color = colors.gradientFrom}
                      onMouseLeave={(e) => e.currentTarget.style.color = colors.textSecondary}
                    >
                      Read more →
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {hasMoreProjects && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-center mt-12"
          >
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all border"
              style={{
                background: `linear-gradient(to right, ${colors.gradientFrom}, ${colors.gradientTo})`,
                borderColor: 'transparent',
                color: '#fff',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              View All Projects
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}
