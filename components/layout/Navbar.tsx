'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  locale: string;
}

export default function Navbar({ locale }: NavbarProps) {
  const t = useTranslations('nav');
  const currentLocale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const switchLocale = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  const navLinks = [
    { key: 'services', href: '#services' },
    { key: 'club', href: '#club' },
    { key: 'about', href: '#about' },
    { key: 'pricing', href: '#pricing' },
    { key: 'contact', href: '#contact' },
  ] as const;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-dark/90 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          className="font-serif text-xl font-bold text-gold tracking-wide"
        >
          Lena
        </a>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.key}>
              <a
                href={link.href}
                className="text-sm text-cream/80 hover:text-gold transition-colors duration-200"
              >
                {t(link.key)}
              </a>
            </li>
          ))}
        </ul>

        {/* Locale switcher + hamburger */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 text-sm">
            <button
              onClick={() => switchLocale('es')}
              className={`px-2 py-1 rounded transition-colors ${
                currentLocale === 'es'
                  ? 'text-gold font-semibold'
                  : 'text-cream/60 hover:text-cream'
              }`}
            >
              ES
            </button>
            <span className="text-cream/30">|</span>
            <button
              onClick={() => switchLocale('en')}
              className={`px-2 py-1 rounded transition-colors ${
                currentLocale === 'en'
                  ? 'text-gold font-semibold'
                  : 'text-cream/60 hover:text-cream'
              }`}
            >
              EN
            </button>
          </div>

          {/* Hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span
              className={`block w-6 h-0.5 bg-cream transition-transform ${
                mobileOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-cream transition-opacity ${
                mobileOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-cream transition-transform ${
                mobileOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile panel */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-dark/95 backdrop-blur-md border-t border-cream/10"
          >
            <ul className="flex flex-col py-4">
              {navLinks.map((link) => (
                <li key={link.key}>
                  <a
                    href={link.href}
                    className="block px-6 py-3 text-cream/80 hover:text-gold hover:bg-cream/5 transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    {t(link.key)}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
