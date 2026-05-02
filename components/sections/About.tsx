'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Image from 'next/image';
import type { PageSection } from '@/types/cms';

interface AboutProps {
  sections: PageSection[];
  locale: string;
}

export default function About({ sections, locale }: AboutProps) {
  const t = useTranslations('about');
  const chips = t.raw('chips') as string[];

  const aboutSection = sections.find((s) => s.section_key === 'about');
  const title = aboutSection
    ? locale === 'en'
      ? aboutSection.title_en
      : aboutSection.title_es
    : t('title');
  const body = aboutSection
    ? locale === 'en'
      ? aboutSection.body_en
      : aboutSection.body_es
    : t('body');

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
              <div className="absolute inset-0 translate-x-4 translate-y-4 border-[3px] border-gold rounded-2xl" />
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
              {title}
            </h2>
            <p className="text-dark/70 leading-relaxed text-base md:text-lg">
              {body}
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
            <a
              href="https://t.me/UlyaLena"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-gold/40 text-gold hover:border-gold hover:bg-gold/10 transition-colors duration-200 px-8 py-3 rounded-full font-semibold inline-flex items-center justify-center"
            >
              {t('cta')}
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
