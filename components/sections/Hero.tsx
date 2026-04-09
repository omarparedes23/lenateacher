'use client';

import { useTranslations } from 'next-intl';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

const CYRILLIC_LETTERS = ['Р', 'У', 'С', 'С', 'К', 'И', 'Й'];

const letterPositions = [
  { top: '10%', left: '5%' },
  { top: '25%', left: '15%' },
  { top: '60%', left: '8%' },
  { top: '75%', left: '20%' },
  { top: '15%', left: '75%' },
  { top: '50%', left: '85%' },
  { top: '80%', left: '70%' },
];

const letterSpeeds = [0.1, 0.2, 0.15, 0.25, 0.12, 0.18, 0.22];

export default function Hero() {
  const t = useTranslations('hero');
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });

  const titleLines = t('title').split('\n');

  return (
    <section
      ref={ref}
      className="grain-overlay relative min-h-screen bg-dark flex items-center overflow-hidden"
    >
      {/* Decorative Cyrillic letters */}
      {CYRILLIC_LETTERS.map((letter, i) => (
        <ParallaxLetter
          key={`${letter}-${i}`}
          letter={letter}
          position={letterPositions[i]}
          speed={letterSpeeds[i]}
          scrollYProgress={scrollYProgress}
        />
      ))}

      {/* Portrait photo — mobile: full background, desktop: right panel */}
      <div className="absolute inset-0 md:inset-auto md:right-0 md:top-0 md:w-96 md:h-full">
        <Image
          src="/images/lena-portrait.jpg"
          alt="Lena"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Mobile overlay: dark so text is readable */}
        <div className="absolute inset-0 bg-dark/60 md:hidden" />
        {/* Desktop overlay: fade to left */}
        <div className="absolute inset-0 hidden md:block bg-gradient-to-l from-transparent via-dark/20 to-dark" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h1 className="font-serif text-5xl md:text-7xl font-bold text-cream leading-tight mb-6">
            {titleLines.map((line, i) => (
              <span key={i}>
                {line}
                {i < titleLines.length - 1 && <br />}
              </span>
            ))}
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="text-muted text-lg md:text-xl max-w-xl mb-10"
        >
          {t('subtitle')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <a
            href="https://t.me/UlyaLena"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-gold text-dark font-semibold px-8 py-4 rounded-full hover:bg-gold/90 transition-colors duration-200"
          >
            {t('ctaPrimary')}
          </a>
          <a
            href="#services"
            className="border border-gold/40 text-gold hover:border-gold hover:bg-gold/10 transition-colors duration-200 px-8 py-3 rounded-full font-semibold inline-flex items-center justify-center"
          >
            {t('ctaSecondary')} →
          </a>
        </motion.div>

        {/* Bounce chevron */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gold/60"
          aria-hidden="true"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </motion.div>
      </div>
    </section>
  );
}

function ParallaxLetter({
  letter,
  position,
  speed,
  scrollYProgress,
}: {
  letter: string;
  position: { top: string; left: string };
  speed: number;
  scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress'];
}) {
  const y = useTransform(scrollYProgress, [0, 1], ['0%', `${speed * 100}%`]);

  return (
    <motion.span
      style={{ top: position.top, left: position.left, y }}
      className="absolute font-serif text-8xl md:text-9xl text-cream/[0.18] select-none pointer-events-none"
    >
      {letter}
    </motion.span>
  );
}
