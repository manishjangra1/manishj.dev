'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import ThemeSelector from './ThemeSelector';
import { useTheme } from '@/contexts/ThemeContext';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { colors } = useTheme();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle hash navigation when page loads (e.g., when navigating from another page)
  useEffect(() => {
    if (pathname === '/' && window.location.hash) {
      const hash = window.location.hash;
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          const navHeight = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - navHeight;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 100);
    }
  }, [pathname]);

  const navLinks = [
    { href: '#about', label: 'About' },
    { href: '#skills', label: 'Skills' },
    { href: '#projects', label: 'Projects' },
    { href: '#experience', label: 'Experience' },
    { href: '#blog', label: 'Blog' },
    { href: '#contact', label: 'Contact' },
  ];

  const handleMobileNavClick = (href: string) => {
    // Close the menu first
    setIsMobileMenuOpen(false);
    
    // If not on home page, navigate to home page with hash
    if (pathname !== '/') {
      router.push(`/${href}`);
      return;
    }
    
    // Wait for menu to close, then scroll to section
    setTimeout(() => {
      const element = document.querySelector(href);
      if (element) {
        const navHeight = 80; // Height of navigation bar
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - navHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 100);
  };

  const handleDesktopNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // If not on home page, navigate to home page with hash
    if (pathname !== '/') {
      e.preventDefault();
      router.push(`/${href}`);
      return;
    }
    
    // On home page, handle smooth scrolling with offset
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const navHeight = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'backdrop-blur-lg border-b'
          : 'bg-transparent'
      }`}
      style={{
        backgroundColor: isScrolled ? colors.navBg : 'transparent',
        borderColor: isScrolled ? colors.navBorder : 'transparent',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link 
            href="/" 
            className="text-xl font-bold transition-colors"
            style={{ color: colors.textPrimary }}
          >
            Welcome!
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleDesktopNavClick(e, link.href)}
                className="text-sm font-medium transition-colors hover:opacity-100"
                style={{ 
                  color: colors.textSecondary,
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = colors.textPrimary}
                onMouseLeave={(e) => e.currentTarget.style.color = colors.textSecondary}
              >
                {link.label}
              </a>
            ))}
            <div className="h-6 w-px mx-2" style={{ backgroundColor: colors.navBorder }} />
            <ThemeSelector />
          </div>

          <div className="flex items-center gap-3 md:hidden">
            <ThemeSelector />
            <button
              className="transition-colors"
              style={{ color: colors.textPrimary }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden backdrop-blur-lg border-t"
            style={{
              backgroundColor: colors.navBg,
              borderColor: colors.navBorder,
            }}
          >
            <div className="px-4 py-6 space-y-3">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleMobileNavClick(link.href);
                  }}
                  className="block w-full text-left py-2 text-base font-medium transition-colors"
                  style={{ color: colors.textSecondary }}
                  onMouseEnter={(e) => e.currentTarget.style.color = colors.textPrimary}
                  onMouseLeave={(e) => e.currentTarget.style.color = colors.textSecondary}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

