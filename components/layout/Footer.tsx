'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

export default function Footer() {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');

  const navLinks = [
    { key: 'services', href: '#services' },
    { key: 'club', href: '#club' },
    { key: 'about', href: '#about' },
    { key: 'pricing', href: '#pricing' },
  ] as const;

  return (
    <footer id="contact" className="grain-overlay relative bg-dark border-t border-cream/10 py-16 px-6 overflow-hidden">
      {/* Decorative Cyrillic */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 font-serif text-8xl md:text-9xl text-cream/5 select-none pointer-events-none whitespace-nowrap">
        До встречи!
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            viewport={{ once: true }}
            className="flex flex-col gap-3"
          >
            <span className="font-serif text-2xl font-bold text-gold">Lena</span>
            <p className="text-muted text-sm">{t('tagline')}</p>
          </motion.div>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
            viewport={{ once: true }}
            className="flex flex-col gap-2"
          >
            {navLinks.map((link) => (
              <a
                key={link.key}
                href={link.href}
                className="text-cream/60 hover:text-gold text-sm transition-colors duration-200"
              >
                {tNav(link.key)}
              </a>
            ))}
          </motion.div>

          {/* Social */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            viewport={{ once: true }}
            className="flex flex-col gap-3"
          >
            <a
              href="https://t.me/UlyaLena"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cream/60 hover:text-gold text-sm transition-colors duration-200"
            >
              {t('telegram')} @UlyaLena
            </a>
            <a
              href="https://t.me/UlyaLena"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cream/60 hover:text-gold text-sm transition-colors duration-200"
            >
              {t('channel')}
            </a>
          </motion.div>
        </div>

        {/* Closing */}
        <div className="border-t border-cream/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <p className="font-serif text-2xl text-cream/30">{t('closing')}</p>
            <p className="text-muted text-xs">{t('closingTranslation')}</p>
          </div>
          <p className="text-cream/30 text-xs">{t('copyright')}</p>
        </div>
      </div>
    </footer>
  );
}
