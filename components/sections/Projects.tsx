'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { IProject } from '@/lib/models/Project';
import { ExternalLink, Github } from 'lucide-react';
import Image from 'next/image';
import { useTheme } from '@/contexts/ThemeContext';

interface ProjectsProps {
  projects: IProject[];
}

export default function Projects({ projects }: ProjectsProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [filter, setFilter] = useState<string>('all');
  const { colors } = useTheme();

  const allTechnologies = Array.from(
    new Set(projects.flatMap((p) => p.technologies || []))
  );

  const filteredProjects =
    filter === 'all'
      ? projects
      : projects.filter((p) => p.technologies?.includes(filter));

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
            <div className="flex flex-wrap gap-3 justify-center">
              <motion.button
                onClick={() => setFilter('all')}
                className="px-5 py-2.5 rounded-xl text-sm font-medium transition-all border"
                style={{
                  background: filter === 'all' 
                    ? `linear-gradient(to right, ${colors.gradientFrom}, ${colors.gradientTo})`
                    : colors.cardBg,
                  borderColor: filter === 'all' ? 'transparent' : colors.cardBorder,
                  color: colors.textPrimary,
                }}
                onMouseEnter={(e) => {
                  if (filter !== 'all') {
                    e.currentTarget.style.backgroundColor = colors.cardBorder;
                  }
                }}
                onMouseLeave={(e) => {
                  if (filter !== 'all') {
                    e.currentTarget.style.backgroundColor = colors.cardBg;
                  }
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                All
              </motion.button>
              {allTechnologies.map((tech) => (
                <motion.button
                  key={tech}
                  onClick={() => setFilter(tech)}
                  className="px-5 py-2.5 rounded-xl text-sm font-medium transition-all border"
                  style={{
                    background: filter === tech 
                      ? `linear-gradient(to right, ${colors.gradientFrom}, ${colors.gradientTo})`
                      : colors.cardBg,
                    borderColor: filter === tech ? 'transparent' : colors.cardBorder,
                    color: colors.textPrimary,
                  }}
                  onMouseEnter={(e) => {
                    if (filter !== tech) {
                      e.currentTarget.style.backgroundColor = colors.cardBorder;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (filter !== tech) {
                      e.currentTarget.style.backgroundColor = colors.cardBg;
                    }
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {tech}
                </motion.button>
              ))}
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
                className="group relative backdrop-blur-lg rounded-2xl overflow-hidden border transition-all"
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
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
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
                      >
                        <Github className="w-5 h-5" style={{ color: colors.textPrimary }} />
                      </a>
                    )}
                  </div>
                </div>
                <div className="p-6">
                  <h3 
                    className="text-xl font-bold mb-3"
                    style={{ color: colors.textPrimary }}
                  >
                    {project.title}
                  </h3>
                  <p 
                    className="mb-4 line-clamp-3 text-sm leading-relaxed"
                    style={{ color: colors.textSecondary }}
                  >
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
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
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
