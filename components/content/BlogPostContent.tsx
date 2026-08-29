'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ArrowLeft, ArrowRight, Check, Copy, Share2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { PublicBlogPostDetail } from '@/lib/content/getPublicBlogData';

export interface BlogPostContentProps {
  post: PublicBlogPostDetail;
}

interface TocItem {
  id: string;
  text: string;
  level: number;
}

function CodeBlock({ language, code }: { language?: string; code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const displayLang = language ? language.replace('language-', '').toUpperCase() : 'CODE';

  return (
    <div className="my-6 border border-[var(--color-border)] bg-[var(--color-card)] rounded-none shadow-sm w-full min-w-0 max-w-full overflow-hidden">
      {/* Code Header Bar */}
      <div className="flex items-center justify-between px-3 sm:px-4 py-2 border-b border-[var(--color-border)] bg-[var(--color-surface)]/60">
        <span className="font-mono text-[11px] font-semibold text-[var(--color-text-muted)] tracking-wider">
          {displayLang}
        </span>
        <button
          type="button"
          onClick={handleCopy}
          className={cn(
            'inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono transition-all rounded-none border',
            copied
              ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-500'
              : 'border-[var(--color-border)] hover:border-[var(--color-border-strong)] text-[var(--color-text-secondary)] hover:text-[var(--color-text)] bg-[var(--color-bg)]'
          )}
        >
          {copied ? (
            <>
              <Check className="w-3 h-3" />
              <span>COPIED</span>
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" />
              <span>COPY</span>
            </>
          )}
        </button>
      </div>

      {/* Code Content (Scoped horizontal scroll) */}
      <div className="p-3 sm:p-5 overflow-x-auto w-full max-w-full text-[12px] sm:text-[13.5px] leading-relaxed font-mono text-[var(--color-text)] overscroll-x-contain">
        <pre className="m-0 whitespace-pre overflow-x-auto w-max min-w-full font-mono text-[12px] sm:text-[13.5px]">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}

export function BlogPostContent({ post }: BlogPostContentProps) {
  const [copiedLink, setCopiedLink] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');

  // Extract headings for Table of Contents
  const toc: TocItem[] = React.useMemo(() => {
    const items: TocItem[] = [];
    const lines = (post.content || '').split('\n');

    for (const line of lines) {
      if (line.startsWith('## ')) {
        const text = line.replace('## ', '').trim();
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        items.push({ id, text, level: 2 });
      } else if (line.startsWith('### ')) {
        const text = line.replace('### ', '').trim();
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        items.push({ id, text, level: 3 });
      }
    }
    return items;
  }, [post.content]);

  // Strip duplicate top-level # title from content if it matches article title
  const cleanedContent = React.useMemo(() => {
    let content = post.content || '';
    const trimmed = content.trim();
    if (trimmed.startsWith('# ')) {
      const firstLineEnd = trimmed.indexOf('\n');
      if (firstLineEnd !== -1) {
        content = trimmed.substring(firstLineEnd).trim();
      }
    }
    return content;
  }, [post.content]);

  // Intersection observer to highlight active TOC heading
  useEffect(() => {
    const headings = document.querySelectorAll('article h2, article h3');
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
            break;
          }
        }
      },
      { rootMargin: '-80px 0px -60% 0px' }
    );

    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, [cleanedContent]);

  const handleCopyShareLink = async () => {
    if (typeof window !== 'undefined') {
      try {
        await navigator.clipboard.writeText(window.location.href);
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2000);
      } catch {
        // Ignore
      }
    }
  };

  const formattedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start w-full min-w-0">
      {/* Sticky Left Sidebar on Desktop (4 cols on Desktop, hidden on mobile) */}
      <div className="hidden lg:flex lg:col-span-4 flex-col gap-6 sticky top-24 self-start min-w-0">
        {/* Table of Contents Card */}
        {toc.length > 0 && (
          <div className="bg-[var(--color-card)] border border-[var(--color-border)] p-6 rounded-none shadow-sm">
            <span className="font-mono text-[11px] font-semibold text-[var(--color-text-muted)] tracking-wider uppercase block pb-3 mb-4 border-b border-[var(--color-border)]">
              Article Outline
            </span>
            <nav className="flex flex-col gap-1.5" aria-label="Table of contents">
              {toc.map((item, idx) => {
                const isActive = activeSection === item.id;
                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={cn(
                      'flex items-center justify-between text-[13px] py-1.5 px-2 transition-all rounded-none',
                      item.level === 3 && 'pl-4 text-[12px]',
                      isActive
                        ? 'bg-[var(--color-surface)] text-[var(--color-text)] font-semibold border-l-2 border-[var(--color-text)]'
                        : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface)]/50'
                    )}
                  >
                    <span className="truncate pr-2">{item.text}</span>
                    {item.level === 2 && (
                      <span className="font-mono text-[10px] text-[var(--color-text-muted)] shrink-0">
                        0{idx + 1}
                      </span>
                    )}
                  </a>
                );
              })}
            </nav>
          </div>
        )}

        {/* Article Meta Details Card */}
        <div className="bg-[var(--color-card)] border border-[var(--color-border)] p-6 rounded-none shadow-sm flex flex-col gap-4">
          <span className="font-mono text-[11px] font-semibold text-[var(--color-text-muted)] tracking-wider uppercase block pb-2 border-b border-[var(--color-border)]">
            Article Details
          </span>

          <div className="flex flex-col gap-3 text-[12px] font-mono text-[var(--color-text-secondary)]">
            {formattedDate && (
              <div className="flex items-center justify-between">
                <span className="text-[var(--color-text-muted)]">Published</span>
                <span className="text-[var(--color-text)]">{formattedDate}</span>
              </div>
            )}
            <div className="flex items-center justify-between">
              <span className="text-[var(--color-text-muted)]">Reading Time</span>
              <span className="text-[var(--color-text)]">{post.readTime}</span>
            </div>
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-col gap-1.5 pt-2 border-t border-[var(--color-border)]/60">
                <span className="text-[var(--color-text-muted)]">Tags</span>
                <div className="flex flex-wrap gap-1.5">
                  {post.tags.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 text-[10px] font-mono bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-secondary)]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Share Article Link Button */}
          <div className="pt-3 border-t border-[var(--color-border)]">
            <button
              type="button"
              onClick={handleCopyShareLink}
              className={cn(
                'w-full flex items-center justify-center gap-2 py-2 px-3 text-[12px] font-mono transition-all border rounded-none font-medium',
                copiedLink
                  ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-500'
                  : 'bg-[var(--color-surface)] border-[var(--color-border-strong)] text-[var(--color-text)] hover:bg-[var(--color-surface-hover)]'
              )}
            >
              {copiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>LINK COPIED</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5" />
                  <span>SHARE ARTICLE</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Prose Content Column (8 cols on Desktop, Full Width on Mobile) */}
      <div className="lg:col-span-8 w-full min-w-0 max-w-full overflow-hidden flex flex-col">
        {/* Markdown Rendered Article Box */}
        <div className="border border-[var(--color-border)] bg-[var(--color-card)] p-4 sm:p-8 md:p-12 rounded-none shadow-sm w-full min-w-0 max-w-full overflow-hidden">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h2: ({ children }) => {
                const text = String(children);
                const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                const h2Items = toc.filter((item) => item.level === 2);
                const h2ItemIndex = h2Items.findIndex((item) => item.id === id);
                const numStr =
                  h2ItemIndex !== -1
                    ? h2ItemIndex + 1 < 10
                      ? `0${h2ItemIndex + 1}`
                      : `${h2ItemIndex + 1}`
                    : '';

                return (
                  <h2
                    id={id}
                    className="scroll-mt-24 pt-8 pb-3 mb-6 border-b border-[var(--color-border)] first:pt-0 text-xl sm:text-2xl font-bold tracking-tight text-[var(--color-text)] block"
                  >
                    {numStr && (
                      <span className="font-mono text-[11px] font-semibold text-[var(--color-text-muted)] tracking-wider uppercase block mb-1">
                        {numStr} // SECTION
                      </span>
                    )}
                    <span>{children}</span>
                  </h2>
                );
              },
              h3: ({ children }) => {
                const text = String(children);
                const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                return (
                  <h3
                    id={id}
                    className="scroll-mt-24 text-base sm:text-lg font-bold text-[var(--color-text)] mt-6 mb-2 tracking-tight block"
                  >
                    {children}
                  </h3>
                );
              },
              p: ({ children }) => (
                <p className="text-[15px] sm:text-[16px] text-[var(--color-text-secondary)] leading-[1.75] mb-5 text-pretty break-words [overflow-wrap:anywhere]">
                  {children}
                </p>
              ),
              ul: ({ children }) => (
                <ul className="space-y-2 mb-5 pl-1">
                  {children}
                </ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal pl-5 space-y-2 mb-5 text-[15px] sm:text-[16px] text-[var(--color-text-secondary)] leading-[1.75]">
                  {children}
                </ol>
              ),
              li: ({ children }) => (
                <li className="flex items-start gap-2.5 text-[15px] sm:text-[16px] text-[var(--color-text-secondary)] leading-[1.75]">
                  <span className="mt-[9px] shrink-0 w-1.5 h-1.5 bg-[var(--color-text-muted)] rounded-none" />
                  <span className="break-words [overflow-wrap:anywhere]">{children}</span>
                </li>
              ),
              blockquote: ({ children }) => (
                <blockquote className="border-l-2 border-[var(--color-text)] bg-[var(--color-surface)]/50 p-4 sm:p-5 my-6 font-mono text-[13px] sm:text-[14px] text-[var(--color-text)] leading-relaxed rounded-none break-words [overflow-wrap:anywhere]">
                  {children}
                </blockquote>
              ),
              pre: ({ children }) => (
                <div className="w-full max-w-full min-w-0 overflow-x-auto my-4 overscroll-x-contain">
                  {children}
                </div>
              ),
              code: ({ className, children, ...props }) => {
                const isInline = !className;
                const match = /language-(\w+)/.exec(className || '');
                const codeString = String(children).replace(/\n$/, '');

                if (isInline) {
                  return (
                    <code className="px-1.5 py-0.5 font-mono text-[12px] sm:text-[13px] bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] rounded-none font-medium break-all [overflow-wrap:anywhere]">
                      {children}
                    </code>
                  );
                }

                return (
                  <CodeBlock
                    language={match ? match[1] : undefined}
                    code={codeString}
                  />
                );
              },
              table: ({ children }) => (
                <div className="w-full max-w-full min-w-0 overflow-x-auto my-6 border border-[var(--color-border)] overscroll-x-contain">
                  <table className="w-full text-left font-mono text-[13px]">
                    {children}
                  </table>
                </div>
              ),
              thead: ({ children }) => (
                <thead className="bg-[var(--color-surface)] border-b border-[var(--color-border)] text-[var(--color-text)]">
                  {children}
                </thead>
              ),
              th: ({ children }) => (
                <th className="p-3 font-semibold text-[12px] uppercase tracking-wider whitespace-nowrap">
                  {children}
                </th>
              ),
              td: ({ children }) => (
                <td className="p-3 border-b border-[var(--color-border)]/60 text-[var(--color-text-secondary)]">
                  {children}
                </td>
              ),
            }}
          >
            {cleanedContent}
          </ReactMarkdown>
        </div>

        {/* Next & Previous Article Pager */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full min-w-0 max-w-full">
          {post.prevPost ? (
            <Link
              href={`/blog/${post.prevPost.slug}`}
              className="p-5 sm:p-6 bg-[var(--color-card)] border border-[var(--color-border)] hover:border-[var(--color-border-strong)] transition-all rounded-none flex flex-col justify-between group shadow-sm min-w-0"
            >
              <div className="flex items-center gap-1.5 font-mono text-[11px] text-[var(--color-text-muted)] uppercase tracking-wider mb-2">
                <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
                <span>Previous Note</span>
              </div>
              <span className="font-bold text-[14px] text-[var(--color-text)] line-clamp-2 leading-snug group-hover:underline underline-offset-2">
                {post.prevPost.title}
              </span>
            </Link>
          ) : (
            <div className="hidden sm:block" />
          )}

          {post.nextPost ? (
            <Link
              href={`/blog/${post.nextPost.slug}`}
              className="p-5 sm:p-6 bg-[var(--color-card)] border border-[var(--color-border)] hover:border-[var(--color-border-strong)] transition-all rounded-none flex flex-col justify-between items-end text-right group shadow-sm min-w-0"
            >
              <div className="flex items-center gap-1.5 font-mono text-[11px] text-[var(--color-text-muted)] uppercase tracking-wider mb-2">
                <span>Next Note</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
              <span className="font-bold text-[14px] text-[var(--color-text)] line-clamp-2 leading-snug group-hover:underline underline-offset-2">
                {post.nextPost.title}
              </span>
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default BlogPostContent;
