'use client';

import { useTranslations } from 'next-intl';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

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

      {/* Photo placeholder */}
      <div className="absolute right-0 top-0 w-80 md:w-96 h-full bg-gray-200/10 hidden md:block">
        <div className="w-full h-full bg-gradient-to-l from-gray-800/50 to-transparent" />
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
            className="inline-flex items-center justify-center text-cream border border-cream/30 px-8 py-4 rounded-full hover:border-gold hover:text-gold transition-colors duration-200"
          >
            {t('ctaSecondary')} →
          </a>
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
      className="absolute font-serif text-8xl md:text-9xl text-cream/10 select-none pointer-events-none"
    >
      {letter}
    </motion.span>
  );
}
