'use client';

import { useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useMotionValue, useTransform, animate, useInView } from 'framer-motion';

function useCounter(end: number, duration: number = 2) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, end, { duration });
      return controls.stop;
    }
  }, [isInView, end, duration, count]);

  return { ref, rounded };
}

interface StatItemProps {
  value: number;
  suffix?: string;
  label: string;
}

function StatItem({ value, suffix = '', label }: StatItemProps) {
  const { ref, rounded } = useCounter(value);

  return (
    <div ref={ref} className="flex flex-col items-center gap-2">
      <div className="font-serif text-5xl md:text-6xl font-bold text-gold">
        <motion.span>{rounded}</motion.span>
        {suffix}
      </div>
      <p className="text-cream/70 text-sm md:text-base text-center">{label}</p>
    </div>
  );
}

export default function StatsStrip() {
  const t = useTranslations('stats');

  const stats = [
    { value: 80, suffix: '+', label: t('members') },
    { value: 6, suffix: '', label: t('experience') },
    { value: 3, suffix: '', label: t('languages') },
  ];

  return (
    <section className="grain-overlay relative bg-wine py-16">
      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', ease: [0.34, 1.56, 0.64, 1], delay: i * 0.15 }}
              viewport={{ once: true }}
            >
              <StatItem value={stat.value} suffix={stat.suffix} label={stat.label} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
