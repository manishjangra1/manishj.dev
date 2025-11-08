'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';
import { LayoutDashboard, FolderKanban, Code, Briefcase, FileText, Settings, MessageSquare, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { usePathname } from 'next/navigation';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const { colors } = useTheme();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

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
      <div className="flex">
        <aside 
          className="w-64 min-h-screen fixed left-0 top-0 border-r"
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
        <main className="flex-1 ml-64 p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
}

