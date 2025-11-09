'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { LayoutDashboard, FolderKanban, Code, Briefcase, FileText, Settings, MessageSquare, LogOut, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { usePathname } from 'next/navigation';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const { colors } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  if (status === 'loading') {
    return (
      <div 
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: colors.background }}
      >
        <div style={{ color: colors.textPrimary }}>Loading...</div>
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
    <div 
      className="min-h-screen"
      style={{ backgroundColor: colors.background }}
    >
      {/* Mobile Header */}
      <div 
        className="lg:hidden fixed top-0 left-0 right-0 z-40 border-b flex items-center justify-between p-4 backdrop-blur-lg"
        style={{
          backgroundColor: colors.navBg,
          borderColor: colors.navBorder,
        }}
      >
        <h1 
          className="text-lg font-bold"
          style={{ color: colors.textPrimary }}
        >
          Admin Panel
        </h1>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-lg transition-colors"
          style={{
            color: colors.textPrimary,
            backgroundColor: isMobileMenuOpen ? colors.cardBorder : 'transparent',
          }}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden fixed inset-0 bg-black/50 z-30"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="lg:hidden fixed left-0 top-0 bottom-0 w-64 z-40 border-r overflow-y-auto backdrop-blur-lg"
              style={{
                backgroundColor: colors.navBg,
                borderColor: colors.navBorder,
              }}
            >
              <div className="p-6 border-b pt-20" style={{ borderColor: colors.navBorder }}>
                <h1 
                  className="text-xl font-bold"
                  style={{ color: colors.textPrimary }}
                >
                  Admin Panel
                </h1>
                <p 
                  className="text-sm mt-2"
                  style={{ color: colors.textSecondary }}
                >
                  {session.user?.email}
                </p>
              </div>
              <nav className="p-4 space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all border"
                      style={{
                        backgroundColor: isActive ? colors.cardBorder : 'transparent',
                        borderColor: isActive ? colors.gradientFrom : 'transparent',
                        color: isActive ? colors.textPrimary : colors.textSecondary,
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.backgroundColor = colors.cardBorder;
                          e.currentTarget.style.color = colors.textPrimary;
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.backgroundColor = 'transparent';
                          e.currentTarget.style.color = colors.textSecondary;
                        }
                      }}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="text-sm font-medium">{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
              <div className="p-4 pt-0">
                <button
                  onClick={() => signOut({ callbackUrl: '/login' })}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all border"
                  style={{
                    backgroundColor: 'transparent',
                    borderColor: colors.cardBorder,
                    color: colors.textSecondary,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = colors.cardBorder;
                    e.currentTarget.style.color = colors.textPrimary;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = colors.textSecondary;
                  }}
                >
                  <LogOut className="w-5 h-5" />
                  <span className="text-sm font-medium">Sign Out</span>
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <aside 
        className="hidden lg:block w-64 min-h-screen fixed left-0 top-0 border-r"
        style={{
          backgroundColor: colors.cardBg,
          borderColor: colors.cardBorder,
        }}
      >
        <div className="p-6 border-b" style={{ borderColor: colors.cardBorder }}>
          <h1 
            className="text-xl font-bold"
            style={{ color: colors.textPrimary }}
          >
            Admin Panel
          </h1>
          <p 
            className="text-sm mt-2"
            style={{ color: colors.textSecondary }}
          >
            {session.user?.email}
          </p>
        </div>
        <nav className="p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all border"
                style={{
                  backgroundColor: isActive ? colors.cardBorder : 'transparent',
                  borderColor: isActive ? colors.gradientFrom : 'transparent',
                  color: isActive ? colors.textPrimary : colors.textSecondary,
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = colors.cardBorder;
                    e.currentTarget.style.color = colors.textPrimary;
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = colors.textSecondary;
                  }
                }}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="absolute bottom-4 left-4 right-4">
          <button
            onClick={() => signOut({ callbackUrl: '/login' })}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all border"
            style={{
              backgroundColor: 'transparent',
              borderColor: colors.cardBorder,
              color: colors.textSecondary,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = colors.cardBorder;
              e.currentTarget.style.color = colors.textPrimary;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = colors.textSecondary;
            }}
          >
            <LogOut className="w-5 h-5" />
            <span className="text-sm font-medium">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64 pt-20 lg:pt-8 p-4 sm:p-6 lg:p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
}

