'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import type { PageSection } from '@/types/cms';

interface ServicesProps {
  sections: PageSection[];
  locale: string;
}

function BookIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  );
}

function DocumentIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  );
}

function PeopleIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

interface ServiceCard {
  title: string;
  items: string[];
  footer: string | null;
}

interface ServicesBody {
  cards: ServiceCard[];
}

export default function Services({ sections, locale }: ServicesProps) {
  const t = useTranslations('services');

  const servicesSection = sections.find((s) => s.section_key === 'services');
  const title = servicesSection
    ? locale === 'en'
      ? servicesSection.title_en
      : servicesSection.title_es
    : t('title');

  let cards: ServiceCard[];
  try {
    const body = servicesSection
      ? locale === 'en'
        ? servicesSection.body_en
        : servicesSection.body_es
      : '';
    const parsed: ServicesBody = body ? JSON.parse(body) : null;
    cards = parsed?.cards ?? [];
  } catch {
    // Fallback to messages if JSON parse fails
    cards = [
      {
        title: t('card1Title'),
        items: t.raw('card1Items') as string[],
        footer: t('card1Formats'),
      },
      {
        title: t('card2Title'),
        items: t.raw('card2Items') as string[],
        footer: null,
      },
      {
        title: t('card3Title'),
        items: t.raw('card3Items') as string[],
        footer: null,
      },
    ];
  }

  const icons = [<BookIcon key="book" />, <DocumentIcon key="doc" />, <PeopleIcon key="people" />];

  return (
    <section id="services" className="bg-cream py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="font-serif text-4xl md:text-5xl font-bold text-dark text-center mb-14"
        >
          {title}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.15, ease: 'easeOut' }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, boxShadow: '0 20px 40px rgba(0,0,0,0.15)' }}
              className="bg-white border border-gold/40 shadow-md rounded-2xl p-8 flex flex-col gap-4 cursor-default transition-shadow duration-300"
            >
              <div className="text-wine">{icons[i]}</div>
              <h3 className="font-serif text-2xl font-bold text-dark">{card.title}</h3>
              <ul className="flex flex-col gap-2">
                {card.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-2 text-dark/70 text-sm">
                    <span className="text-gold mt-0.5">✦</span>
                    {item}
                  </li>
                ))}
              </ul>
              {card.footer && (
                <p className="mt-auto pt-4 border-t border-gold/20 text-xs text-muted">{card.footer}</p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
