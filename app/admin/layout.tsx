'use client';

import { SessionProvider, useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { LayoutDashboard, FolderKanban, Code, Briefcase, FileText, Settings, MessageSquare, LogOut, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { usePathname } from 'next/navigation';
import { DataProvider } from '@/contexts/DataContext';
import { cn } from '@/lib/utils';

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  // Close mobile menu when pathname changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-bg)] text-[var(--color-text)]">
        <div className="flex items-center gap-3 font-mono text-sm">
          <span className="w-2 h-2 bg-[var(--color-text)] animate-pulse rounded-none" />
          <span>Loading admin panel...</span>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const navItems = [
    { href: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { href: '/admin/projects', icon: FolderKanban, label: 'Projects' },
    { href: '/admin/skills', icon: Code, label: 'Skills' },
    { href: '/admin/experience', icon: Briefcase, label: 'Experience' },
    { href: '/admin/blog', icon: FileText, label: 'Blog' },
    { href: '/admin/contact', icon: MessageSquare, label: 'Messages' },
    { href: '/admin/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[var(--color-bg)] text-[var(--color-text)] select-none">
      {/* Mobile Top Header Bar */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-40 h-14 bg-[var(--color-bg)]/90 backdrop-blur-md border-b border-[var(--color-border)] px-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="w-6 h-6 bg-[var(--color-surface)] border border-[var(--color-border-strong)] flex items-center justify-center font-mono font-bold text-[11px] rounded-none">
            MJ
          </span>
          <span className="font-semibold text-sm tracking-tight">Admin Console</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 border border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)] rounded-none text-xs"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? '☀' : '☾'}
          </button>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 border border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)] rounded-none"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="lg:hidden fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 28, stiffness: 240 }}
              className="lg:hidden fixed left-0 top-0 bottom-0 w-72 z-50 bg-[var(--color-card)] border-r border-[var(--color-border)] flex flex-col justify-between p-5 overflow-y-auto"
            >
              <div className="flex flex-col gap-6 pt-2">
                <div className="flex items-center justify-between pb-4 border-b border-[var(--color-border)]">
                  <div>
                    <h2 className="font-bold text-sm">Portfolio Management</h2>
                    <p className="text-[12px] font-mono text-[var(--color-text-muted)] truncate max-w-[180px]">
                      {session.user?.email}
                    </p>
                  </div>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-1.5 border border-[var(--color-border)] hover:bg-[var(--color-surface)] rounded-none"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <nav className="flex flex-col gap-1.5">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href || (item.href !== '/admin/dashboard' && pathname.startsWith(item.href));
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                          'flex items-center gap-3 px-3.5 py-2.5 rounded-none text-sm font-medium transition-colors border',
                          isActive
                            ? 'bg-[var(--color-surface)] border-[var(--color-border-strong)] text-[var(--color-text)]'
                            : 'border-transparent text-[var(--color-text-secondary)] hover:bg-[var(--color-surface)] hover:text-[var(--color-text)]'
                        )}
                      >
                        <Icon className="w-4 h-4 shrink-0" />
                        <span>{item.label}</span>
                      </Link>
                    );
                  })}
                </nav>
              </div>

              <div className="pt-4 border-t border-[var(--color-border)] flex flex-col gap-2">
                <Link
                  href="/"
                  target="_blank"
                  className="flex items-center justify-between px-3.5 py-2 text-xs font-mono border border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)] rounded-none"
                >
                  <span>View Live Site</span>
                  <span>↗</span>
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: '/login' })}
                  className="flex items-center justify-center gap-2 px-3.5 py-2 text-xs font-medium border border-red-500/30 text-red-500 hover:bg-red-500/10 rounded-none transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Persistent Sidebar */}
      <aside className="hidden lg:flex flex-col justify-between w-64 h-screen fixed left-0 top-0 z-30 bg-[var(--color-card)] border-r border-[var(--color-border)] p-6 select-none">
        <div className="flex flex-col gap-6">
          {/* Header & Brand */}
          <div className="flex items-center justify-between pb-5 border-b border-[var(--color-border)]">
            <div className="flex items-center gap-2.5">
              <span className="w-7 h-7 bg-[var(--color-surface)] border border-[var(--color-border-strong)] flex items-center justify-center font-mono font-bold text-xs rounded-none">
                MJ
              </span>
              <div>
                <h1 className="font-bold text-sm tracking-tight leading-tight">Admin Console</h1>
                <p className="text-[11px] font-mono text-[var(--color-text-muted)] truncate max-w-[130px]">
                  {session.user?.email}
                </p>
              </div>
            </div>
            <button
              onClick={toggleTheme}
              className="p-1.5 border border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)] rounded-none text-xs"
              title="Toggle theme"
            >
              {theme === 'dark' ? '☀' : '☾'}
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="flex flex-col gap-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || (item.href !== '/admin/dashboard' && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 px-3.5 py-2.5 rounded-none text-sm font-medium transition-colors border',
                    isActive
                      ? 'bg-[var(--color-surface)] border-[var(--color-border-strong)] text-[var(--color-text)] shadow-xs'
                      : 'border-transparent text-[var(--color-text-secondary)] hover:bg-[var(--color-surface)] hover:text-[var(--color-text)]'
                  )}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-[var(--color-border)] flex flex-col gap-2.5">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3.5 py-2 text-xs font-mono border border-[var(--color-border)] bg-[var(--color-surface)]/50 hover:bg-[var(--color-surface-hover)] rounded-none text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors"
          >
            <span>Live Portfolio</span>
            <span>↗</span>
          </Link>
          <button
            onClick={() => signOut({ callbackUrl: '/login' })}
            className="flex items-center justify-center gap-2 px-3.5 py-2 text-xs font-medium border border-red-500/30 text-red-500 hover:bg-red-500/10 rounded-none transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 lg:ml-64 pt-16 lg:pt-0 min-h-screen overflow-y-auto">
        <div className="p-4 sm:p-6 lg:p-10 max-w-6xl mx-auto">
          <DataProvider>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              {children}
            </motion.div>
          </DataProvider>
        </div>
      </main>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </SessionProvider>
  );
}


