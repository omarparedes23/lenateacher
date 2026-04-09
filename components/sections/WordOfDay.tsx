'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';

interface Word {
  cyrillic: string;
  phonetic: string;
  translation_es: string;
  translation_en: string;
  emoji: string;
}

const words: Word[] = [
  { cyrillic: 'привет', phonetic: 'pri-VET', translation_es: 'hola', translation_en: 'hello', emoji: '👋' },
  { cyrillic: 'спасибо', phonetic: 'spa-SI-ba', translation_es: 'gracias', translation_en: 'thank you', emoji: '🙏' },
  { cyrillic: 'пожалуйста', phonetic: 'pa-ZHAL-sta', translation_es: 'por favor', translation_en: 'please', emoji: '✨' },
  { cyrillic: 'красивый', phonetic: 'kra-SI-viy', translation_es: 'hermoso', translation_en: 'beautiful', emoji: '😍' },
  { cyrillic: 'душа', phonetic: 'du-SHA', translation_es: 'alma', translation_en: 'soul', emoji: '💫' },
  { cyrillic: 'судьба', phonetic: 'sud-BA', translation_es: 'destino', translation_en: 'destiny', emoji: '🌟' },
  { cyrillic: 'белый', phonetic: 'BE-liy', translation_es: 'blanco', translation_en: 'white', emoji: '🤍' },
  { cyrillic: 'зима', phonetic: 'zi-MA', translation_es: 'invierno', translation_en: 'winter', emoji: '❄️' },
  { cyrillic: 'любовь', phonetic: 'lyu-BOV', translation_es: 'amor', translation_en: 'love', emoji: '❤️' },
  { cyrillic: 'друг', phonetic: 'DRUK', translation_es: 'amigo', translation_en: 'friend', emoji: '🤝' },
  { cyrillic: 'Москва', phonetic: 'Mosk-VA', translation_es: 'Moscú', translation_en: 'Moscow', emoji: '🏛️' },
  { cyrillic: 'улица', phonetic: 'U-li-tsa', translation_es: 'calle', translation_en: 'street', emoji: '🚶' },
  { cyrillic: 'вкусно', phonetic: 'VKUS-na', translation_es: 'delicioso', translation_en: 'delicious', emoji: '😋' },
  { cyrillic: 'интересно', phonetic: 'in-te-RES-na', translation_es: 'interesante', translation_en: 'interesting', emoji: '🤔' },
  { cyrillic: 'конечно', phonetic: 'ka-NESH-na', translation_es: 'por supuesto', translation_en: 'of course', emoji: '👌' },
];

interface WordOfDayProps {
  locale: string;
}

export default function WordOfDay({ locale }: WordOfDayProps) {
  const t = useTranslations('word');
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [key, setKey] = useState(0);

  useEffect(() => {
    setCurrentIndex(Math.floor(Math.random() * words.length));
  }, []);

  const handleNewWord = () => {
    setCurrentIndex((prev) => {
      let next: number;
      do {
        next = Math.floor(Math.random() * words.length);
      } while (next === prev && words.length > 1);
      return next;
    });
    setKey((k) => k + 1);
  };

  const word = currentIndex !== null ? words[currentIndex] : null;
  const translation = word
    ? locale === 'en'
      ? word.translation_en
      : word.translation_es
    : null;

  return (
    <section className="grain-overlay relative bg-dark py-20 px-6">
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-cream mb-3">
            {t('title')}
          </h2>
          <p className="text-muted">{t('subtitle')}</p>
        </motion.div>

        <AnimatePresence mode="wait">
          {word && (
            <motion.div
              key={key}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="flex flex-col items-center gap-4 overflow-hidden w-full"
            >
              <span className="text-4xl text-gold">✦</span>
              <p
                className="font-serif text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-bold text-gold leading-none max-w-full overflow-hidden"
                style={{ wordBreak: 'break-word' }}
              >
                {word.cyrillic}
              </p>
              <div className="flex flex-col gap-1 text-center">
                <p className="text-muted text-sm">
                  <span className="text-cream/40 mr-2">{t('phonetic')}:</span>
                  [{word.phonetic}]
                </p>
                <p className="text-cream text-xl font-semibold">
                  <span className="text-cream/40 text-sm mr-2">{t('translation')}:</span>
                  {translation}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleNewWord}
          className="mt-10 border border-gold/40 text-gold hover:border-gold hover:bg-gold/10 transition-colors duration-200 px-8 py-3 rounded-full font-semibold inline-flex items-center justify-center"
        >
          {t('newWord')} ↻
        </motion.button>
      </div>
    </section>
  );
}
