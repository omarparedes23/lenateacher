'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface GalleryItemProps {
  src: string;
  label: string;
  className?: string;
  delay?: number;
}

function GalleryItem({ src, label, className = '', delay = 0 }: GalleryItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      viewport={{ once: true }}
      className={`relative overflow-hidden rounded-2xl group cursor-default ${className}`}
    >
      <Image
        src={src}
        alt={label}
        fill
        className="object-cover"
        style={{ filter: 'saturate(0.7) sepia(0.15)' }}
      />

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-dark/0 group-hover:bg-dark/60 transition-colors duration-300 flex items-end p-4">
        <p className="text-cream text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
          {label}
        </p>
      </div>
    </motion.div>
  );
}

export default function Gallery() {
  const t = useTranslations('gallery');
  const loc = t.raw('locations') as Record<string, string>;

  return (
    <section className="bg-cream py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-dark mb-3">
            {t('title')}
          </h2>
          <p className="text-muted">{t('subtitle')}</p>
        </motion.div>

        {/* Asymmetric grid */}
        <div
          className="grid gap-4"
          style={{
            gridTemplateColumns: 'repeat(3, 1fr)',
            gridTemplateRows: 'auto auto',
            gridTemplateAreas: `
              "cafe1 cafe1 cafe2"
              "outdoor outdoor group"
            `,
          }}
        >
          <div style={{ gridArea: 'cafe1' }}>
            <GalleryItem src="/images/club-cafe-1.jpg" label={loc.cafe1} className="h-56 md:h-72" delay={0} />
          </div>
          <div style={{ gridArea: 'cafe2' }}>
            <GalleryItem src="/images/club-cafe-2.jpg" label={loc.cafe2} className="h-56 md:h-72" delay={0.1} />
          </div>
          <div style={{ gridArea: 'outdoor' }}>
            <GalleryItem src="/images/club-outdoor.jpg" label={loc.outdoor} className="h-56 md:h-72" delay={0.2} />
          </div>
          <div style={{ gridArea: 'group' }}>
            <GalleryItem src="/images/club-group.jpg" label={loc.group} className="h-56 md:h-72" delay={0.3} />
          </div>
        </div>
      </div>
    </section>
  );
}
