'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Github, Sparkles, ArrowLeft } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface ProjectDetailsClientProps {
  project: {
    _id: string;
    title: string;
    description: string;
    image: string;
    technologies: string[];
    liveUrl?: string;
    githubUrl?: string;
    isCurrentlyWorking?: boolean;
    content?: string;
  };
}

export default function ProjectDetailsClient({ project }: ProjectDetailsClientProps) {
  const { colors } = useTheme();

  return (
    <article className="min-h-screen pt-20 pb-24 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: colors.background }}>
      <div className="max-w-5xl mx-auto relative">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border transition-all"
            style={{
              backgroundColor: colors.cardBg,
              borderColor: colors.cardBorder,
              color: colors.textPrimary,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = colors.gradientFrom;
              e.currentTarget.style.backgroundColor = colors.cardBorder;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = colors.cardBorder;
              e.currentTarget.style.backgroundColor = colors.cardBg;
            }}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Projects</span>
          </Link>
        </motion.div>

        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            {project.isCurrentlyWorking && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="px-4 py-2 rounded-full backdrop-blur-lg border flex items-center gap-2"
                style={{
                  background: `linear-gradient(to right, ${colors.gradientFrom}, ${colors.gradientTo})`,
                  borderColor: colors.cardBorder,
                }}
              >
                <Sparkles className="w-4 h-4 text-white animate-pulse" />
                <span className="text-sm font-semibold text-white">Currently Working On</span>
              </motion.div>
            )}
          </div>

          <h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            style={{ color: colors.textPrimary }}
          >
            {project.title}
          </h1>

          <p 
            className="text-lg md:text-xl mb-6 leading-relaxed"
            style={{ color: colors.textSecondary }}
          >
            {project.description}
          </p>

          {/* Technologies */}
          {project.technologies && project.technologies.length > 0 && (
            <div className="flex flex-wrap gap-3 mb-6">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 rounded-xl border font-medium text-sm"
                  style={{
                    backgroundColor: colors.cardBg,
                    borderColor: colors.cardBorder,
                    color: colors.textSecondary,
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
        </motion.header>

        {/* Project Image */}
        {project.image && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative w-full h-64 md:h-96 lg:h-[500px] mb-8 rounded-2xl overflow-hidden border"
            style={{
              borderColor: colors.cardBorder,
            }}
          >
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        )}

        {/* Fixed Action Buttons - Bottom Right */}
        {(project.liveUrl || project.githubUrl) && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-50 flex flex-col gap-3 sm:gap-3"
          >
            {project.liveUrl && (
              <motion.a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 sm:gap-2 px-3 py-2.5 sm:px-4 sm:py-2.5 rounded-lg sm:rounded-lg text-sm sm:text-xs font-semibold transition-all border-2 shadow-lg backdrop-blur-lg"
                style={{
                  background: `linear-gradient(135deg, ${colors.gradientFrom}, ${colors.gradientTo})`,
                  borderColor: colors.gradientFrom,
                  color: '#fff',
                  boxShadow: `0 4px 20px ${colors.gradientFrom}40`,
                }}
                whileHover={{ scale: 1.05, x: -5 }}
                whileTap={{ scale: 0.98 }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = `0 8px 30px ${colors.gradientFrom}60`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = `0 4px 20px ${colors.gradientFrom}40`;
                }}
              >
                <ExternalLink className="w-4 h-4 sm:w-3.5 sm:h-3.5 group-hover:rotate-[-15deg] transition-transform" />
                <span className="hidden sm:inline">View Live Demo</span>
                <span className="sm:hidden">Live</span>
              </motion.a>
            )}
            {project.githubUrl && (
              <motion.a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 sm:gap-2 px-3 py-2.5 sm:px-4 sm:py-2.5 rounded-lg sm:rounded-lg text-sm sm:text-xs font-semibold transition-all border-2 backdrop-blur-lg"
                style={{
                  backgroundColor: `${colors.cardBg}CC`,
                  borderColor: colors.cardBorder,
                  color: colors.textPrimary,
                  boxShadow: `0 4px 20px ${colors.cardBorder}30`,
                }}
                whileHover={{ scale: 1.05, x: -5 }}
                whileTap={{ scale: 0.98 }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = colors.gradientTo;
                  e.currentTarget.style.backgroundColor = colors.cardBorder;
                  e.currentTarget.style.boxShadow = `0 8px 30px ${colors.cardBorder}40`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = colors.cardBorder;
                  e.currentTarget.style.backgroundColor = `${colors.cardBg}CC`;
                  e.currentTarget.style.boxShadow = `0 4px 20px ${colors.cardBorder}30`;
                }}
              >
                <Github className="w-4 h-4 sm:w-3.5 sm:h-3.5 group-hover:rotate-12 transition-transform" />
                <span className="hidden sm:inline">View Source Code</span>
                <span className="sm:hidden">Code</span>
              </motion.a>
            )}
          </motion.div>
        )}

        {/* Markdown Content */}
        {project.content && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="prose prose-invert prose-lg max-w-none"
            style={{
              color: colors.textSecondary,
            }}
          >
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({ node, ...props }) => (
                  <h1 
                    style={{ color: colors.textPrimary, borderBottomColor: colors.cardBorder }}
                    className="border-b pb-2 mb-4 mt-8"
                    {...props}
                  />
                ),
                h2: ({ node, ...props }) => (
                  <h2 
                    style={{ color: colors.textPrimary, borderBottomColor: colors.cardBorder }}
                    className="border-b pb-2 mb-4 mt-8"
                    {...props}
                  />
                ),
                h3: ({ node, ...props }) => (
                  <h3 
                    style={{ color: colors.textPrimary }}
                    className="mb-3 mt-6"
                    {...props}
                  />
                ),
                h4: ({ node, ...props }) => (
                  <h4 
                    style={{ color: colors.textPrimary }}
                    className="mb-2 mt-4"
                    {...props}
                  />
                ),
                p: ({ node, ...props }) => (
                  <p 
                    style={{ color: colors.textSecondary }}
                    className="mb-4 leading-relaxed"
                    {...props}
                  />
                ),
                a: ({ node, ...props }) => (
                  <a
                    style={{ color: colors.gradientFrom }}
                    className="hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                    {...props}
                  />
                ),
                code: ({ node, inline, ...props }: any) => {
                  if (inline) {
                    return (
                      <code
                        style={{
                          backgroundColor: colors.cardBg,
                          color: colors.gradientFrom,
                          borderColor: colors.cardBorder,
                        }}
                        className="px-2 py-1 rounded border text-sm"
                        {...props}
                      />
                    );
                  }
                  return (
                    <code
                      style={{
                        backgroundColor: colors.cardBg,
                        borderColor: colors.cardBorder,
                      }}
                      className="block p-4 rounded-lg border overflow-x-auto mb-4"
                      {...props}
                    />
                  );
                },
                pre: ({ node, ...props }) => (
                  <pre
                    style={{
                      backgroundColor: colors.cardBg,
                      borderColor: colors.cardBorder,
                    }}
                    className="p-4 rounded-lg border overflow-x-auto mb-4"
                    {...props}
                  />
                ),
                ul: ({ node, ...props }) => (
                  <ul 
                    style={{ color: colors.textSecondary }}
                    className="list-disc list-inside mb-4 space-y-2"
                    {...props}
                  />
                ),
                ol: ({ node, ...props }) => (
                  <ol 
                    style={{ color: colors.textSecondary }}
                    className="list-decimal list-inside mb-4 space-y-2"
                    {...props}
                  />
                ),
                li: ({ node, ...props }) => (
                  <li 
                    style={{ color: colors.textSecondary }}
                    className="ml-4"
                    {...props}
                  />
                ),
                blockquote: ({ node, ...props }) => (
                  <blockquote
                    style={{
                      borderLeftColor: colors.gradientFrom,
                      backgroundColor: colors.cardBg,
                    }}
                    className="border-l-4 pl-4 py-2 my-4 italic"
                    {...props}
                  />
                ),
                table: ({ node, ...props }) => (
                  <div className="overflow-x-auto mb-4">
                    <table
                      style={{
                        borderColor: colors.cardBorder,
                      }}
                      className="w-full border-collapse border"
                      {...props}
                    />
                  </div>
                ),
                th: ({ node, ...props }) => (
                  <th
                    style={{
                      backgroundColor: colors.cardBg,
                      borderColor: colors.cardBorder,
                      color: colors.textPrimary,
                    }}
                    className="border p-2 text-left font-semibold"
                    {...props}
                  />
                ),
                td: ({ node, ...props }) => (
                  <td
                    style={{
                      borderColor: colors.cardBorder,
                      color: colors.textSecondary,
                    }}
                    className="border p-2"
                    {...props}
                  />
                ),
                hr: ({ node, ...props }) => (
                  <hr
                    style={{
                      borderColor: colors.cardBorder,
                    }}
                    className="my-8"
                    {...props}
                  />
                ),
                img: ({ node, ...props }) => (
                  <img
                    className="rounded-lg my-4 max-w-full h-auto"
                    {...props}
                  />
                ),
              }}
            >
              {project.content}
            </ReactMarkdown>
          </motion.div>
        )}

        {!project.content && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center py-12"
            style={{ color: colors.textSecondary }}
          >
            <p>No additional documentation available for this project.</p>
          </motion.div>
        )}
      </div>
    </article>
  );
}

