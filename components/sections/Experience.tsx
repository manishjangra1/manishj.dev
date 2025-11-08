'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { IExperience } from '@/lib/models/Experience';
import { format } from 'date-fns';
import Image from 'next/image';

interface ExperienceProps {
  experiences: IExperience[];
}

export default function Experience({ experiences }: ExperienceProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="experience" className="py-20 px-4 bg-gradient-to-b from-slate-800 to-slate-900">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Experience</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-pink-600 mx-auto" />
        </motion.div>

        {experiences.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            className="text-center text-white/60 py-12 min-h-[300px] flex items-center justify-center"
          >
            <div>
              <div className="text-6xl mb-4">💼</div>
              <p className="text-lg">No experience entries yet. Check back soon!</p>
            </div>
          </motion.div>
        ) : (
          <div className="relative">
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-600 to-pink-600 transform md:-translate-x-1/2" />
            
            <div className="space-y-12">
              {experiences.map((exp, i) => (
                <motion.div
                  key={exp._id?.toString() || i}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: i * 0.2, duration: 0.8 }}
                  className={`relative flex items-center ${
                    i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  <div className={`flex-1 ${i % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8'}`}>
                    <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                      <div className="flex items-center gap-4 mb-4">
                        {exp.logo && (
                          <div className="relative w-12 h-12 rounded-lg overflow-hidden">
                            <Image
                              src={exp.logo}
                              alt={exp.company}
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}
                        <div className={i % 2 === 0 ? 'md:text-right' : ''}>
                          <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                          <p className="text-white/70">{exp.company}</p>
                        </div>
                      </div>
                      <p className="text-white/60 text-sm mb-4">
                        {format(new Date(exp.startDate), 'MMM yyyy')} -{' '}
                        {exp.current
                          ? 'Present'
                          : exp.endDate
                          ? format(new Date(exp.endDate), 'MMM yyyy')
                          : 'Present'}
                        {exp.location && ` • ${exp.location}`}
                      </p>
                      <ul className="space-y-2">
                        {exp.description?.map((desc, j) => (
                          <li key={j} className="text-white/80 text-sm flex items-start gap-2">
                            <span className="text-purple-400 mt-1">•</span>
                            <span>{desc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-purple-600 rounded-full border-4 border-slate-900 transform md:-translate-x-1/2" />
                  <div className="flex-1 hidden md:block" />
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

