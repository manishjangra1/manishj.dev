'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { IBlogPost } from '@/lib/models/BlogPost';
import { format } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from '@/contexts/ThemeContext';

interface BlogProps {
  posts: IBlogPost[];
}

export default function Blog({ posts }: BlogProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [searchTerm, setSearchTerm] = useState('');
  const { colors } = useTheme();

  const publishedPosts = posts.filter((p) => p.published);
  const filteredPosts = publishedPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags?.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <section 
      id="blog" 
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
            Blog
          </h2>
          <div 
            className="w-24 h-1 mx-auto mb-10 rounded-full"
            style={{ 
              background: `linear-gradient(to right, ${colors.gradientFrom}, ${colors.gradientTo})`
            }}
          />
          
          <div className="max-w-md mx-auto">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search posts..."
              className="w-full px-5 py-3.5 backdrop-blur-lg border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all"
              style={{
                backgroundColor: colors.cardBg,
                borderColor: colors.cardBorder,
                color: colors.textPrimary,
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = colors.gradientFrom;
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = colors.cardBorder;
              }}
            />
          </div>
        </motion.div>

        {filteredPosts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            className="text-center py-12 min-h-[300px] flex items-center justify-center"
            style={{ color: colors.textSecondary }}
          >
            <div>
              <div className="text-6xl mb-4">📝</div>
              <p className="text-lg">
                {searchTerm
                  ? `No posts found matching "${searchTerm}".`
                  : 'No blog posts yet. Check back soon!'}
              </p>
            </div>
          </motion.div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredPosts.map((post, i) => (
              <motion.div
                key={post._id?.toString() || i}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.8 }}
                className="group backdrop-blur-lg rounded-2xl overflow-hidden border transition-all"
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
                <Link href={`/blog/${post.slug}`}>
                  <div 
                    className="relative h-48"
                    style={{
                      background: `linear-gradient(to bottom right, ${colors.gradientFrom}20, ${colors.gradientTo}20)`,
                    }}
                  >
                    {post.coverImage ? (
                      <Image
                        src={post.coverImage}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-4xl">
                        📝
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.tags?.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1.5 text-xs rounded-xl border font-medium"
                          style={{
                            backgroundColor: colors.cardBg,
                            borderColor: colors.cardBorder,
                            color: colors.textSecondary,
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 
                      className="text-xl font-bold mb-2 transition-colors"
                      style={{ color: colors.textPrimary }}
                      onMouseEnter={(e) => e.currentTarget.style.color = colors.gradientFrom}
                      onMouseLeave={(e) => e.currentTarget.style.color = colors.textPrimary}
                    >
                      {post.title}
                    </h3>
                    <p 
                      className="text-sm mb-4 line-clamp-3 leading-relaxed"
                      style={{ color: colors.textSecondary }}
                    >
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-sm">
                      <span style={{ color: colors.textSecondary }}>
                        {post.publishedAt
                          ? format(new Date(post.publishedAt), 'MMM dd, yyyy')
                          : 'Draft'}
                      </span>
                      <span 
                        className="transition-colors font-medium"
                        style={{ color: colors.textSecondary }}
                        onMouseEnter={(e) => e.currentTarget.style.color = colors.gradientFrom}
                        onMouseLeave={(e) => e.currentTarget.style.color = colors.textSecondary}
                      >
                        Read more →
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
