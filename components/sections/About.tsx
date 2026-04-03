'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function About() {
  const t = useTranslations('about');
  const chips = t.raw('chips') as string[];

  return (
    <section id="about" className="bg-cream py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-16">
          {/* Photo with decorative frame */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            viewport={{ once: true }}
            className="flex-shrink-0"
          >
            <div className="relative">
              {/* Offset gold frame */}
              <div className="absolute inset-0 translate-x-3 translate-y-3 border-2 border-gold rounded-2xl" />
              <div className="relative w-72 h-96 rounded-2xl overflow-hidden">
                <Image
                  src="/images/lena-portrait.jpg"
                  alt="Lena"
                  fill
                  className="object-cover object-top"
                />
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            viewport={{ once: true }}
            className="flex flex-col gap-6"
          >
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-dark">
              {t('title')}
            </h2>
            <p className="text-dark/70 leading-relaxed text-base md:text-lg">
              {t('body')}
            </p>
            <div className="flex flex-wrap gap-2">
              {chips.map((chip, i) => (
                <span
                  key={i}
                  className="bg-wine/10 text-wine rounded-full px-4 py-2 text-sm font-medium"
                >
                  {chip}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
