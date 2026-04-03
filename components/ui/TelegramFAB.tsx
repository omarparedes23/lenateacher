'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';

function TelegramIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
    </svg>
  );
}

export default function TelegramFAB() {
  const t = useTranslations('fab');
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setVisible(latest > 600);
  });

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <div className="relative">
            {/* Tooltip */}
            <AnimatePresence>
              {hovered && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  transition={{ duration: 0.15 }}
                  className="absolute bottom-16 right-0 bg-dark text-cream text-xs px-3 py-1.5 rounded-lg whitespace-nowrap shadow-lg"
                >
                  {t('tooltip')}
                </motion.div>
              )}
            </AnimatePresence>

            <a
              href="https://t.me/UlyaLena"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t('tooltip')}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              className="flex items-center justify-center w-14 h-14 bg-gold text-dark rounded-full shadow-lg hover:bg-gold/90 transition-colors duration-200"
            >
              <TelegramIcon />
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
