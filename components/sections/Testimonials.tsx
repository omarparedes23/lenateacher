'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import type { Testimonial } from '@/types/cms';

interface TestimonialsProps {
  testimonials: Testimonial[];
  locale: string;
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

export default function Testimonials({ testimonials, locale }: TestimonialsProps) {
  const t = useTranslations('testimonials');

  return (
    <section className="grain-overlay relative bg-dark py-20 px-6">
      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="font-serif text-4xl md:text-5xl font-bold text-cream text-center mb-14"
        >
          {t('title')}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8" style={{ perspective: 1000 }}>
          {testimonials.map((item, i) => {
            const text = locale === 'en' ? item.text_en : item.text_es;
            const country = locale === 'en' ? item.country_en : item.country_es;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, rotateX: 15 }}
                whileInView={{ opacity: 1, rotateX: 0 }}
                transition={{ duration: 0.6, delay: i * 0.15, ease: 'easeOut' }}
                viewport={{ once: true }}
                className="relative bg-cream rounded-2xl p-8"
              >
                {/* Decorative quote mark */}
                <span className="absolute top-4 left-6 font-serif text-8xl text-gold/40 leading-none select-none">
                  &ldquo;
                </span>

                <p className="relative z-10 text-dark/70 leading-relaxed mb-4 pt-6">
                  {text}
                </p>

                <p className="text-gold text-sm mb-4">★★★★★</p>

                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-wine flex items-center justify-center text-cream font-bold text-sm flex-shrink-0">
                    {getInitials(item.name)}
                  </div>
                  <div>
                    <p className="font-semibold text-dark text-sm">{item.name}</p>
                    <p className="text-muted text-xs">
                      {item.flag} {country}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
