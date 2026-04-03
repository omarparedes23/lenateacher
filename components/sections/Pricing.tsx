'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

export default function Pricing() {
  const t = useTranslations('pricing');

  const cards = [
    {
      title: t('card1Title'),
      price: t('card1Price'),
      ideal: t('card1Ideal'),
      popular: false,
    },
    {
      title: t('card2Title'),
      price: t('card2Price'),
      ideal: t('card2Ideal'),
      popular: true,
    },
    {
      title: t('card3Title'),
      price: t('card3Price'),
      ideal: t('card3Ideal'),
      popular: false,
    },
  ];

  return (
    <section id="pricing" className="bg-cream py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-dark mb-3">
            {t('title')}
          </h2>
          <p className="text-muted">{t('subtitle')}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.15, ease: 'easeOut' }}
              viewport={{ once: true }}
              className={`relative bg-white rounded-2xl p-8 flex flex-col gap-4 ${
                card.popular ? 'ring-2 ring-gold shadow-xl md:scale-105' : 'shadow-sm'
              }`}
            >
              {card.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-gold text-dark text-xs font-bold px-4 py-1.5 rounded-full whitespace-nowrap">
                    {t('popular')}
                  </span>
                </div>
              )}

              <h3 className="font-serif text-xl font-bold text-dark">{card.title}</h3>
              <p className="font-serif text-4xl font-bold text-gold">{card.price}</p>
              <p className="text-muted text-sm">{card.ideal}</p>

              <a
                href="https://t.me/UlyaLena"
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-4 inline-flex items-center justify-center px-6 py-3 rounded-full font-semibold transition-colors duration-200 ${
                  card.popular
                    ? 'bg-gold text-dark hover:bg-gold/90'
                    : 'border border-gold text-gold hover:bg-gold/10'
                }`}
              >
                {t('cta')}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
