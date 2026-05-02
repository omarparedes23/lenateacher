'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import type { ScheduleSession } from '@/types/cms';

interface ScheduleProps {
  schedule: ScheduleSession[];
  locale: string;
}

const levelStyles: Record<string, string> = {
  basic: 'bg-cream/15 text-cream border border-cream/40',
  intermediate: 'bg-gold/25 text-gold border border-gold/50',
  advanced: 'bg-wine/30 text-rose-300 border border-wine/50',
};

interface SessionCardProps {
  session: ScheduleSession;
  locale: string;
}

function SessionCard({ session, locale }: SessionCardProps) {
  const day = locale === 'en' ? session.day_en : session.day_es;

  return (
    <motion.div
      whileHover={{ scale: 1.02, borderColor: 'var(--color-gold)' }}
      style={{ borderColor: 'rgba(201,168,76,0.25)' }}
      className="border rounded-xl p-5 flex items-center justify-between gap-4 bg-white/[0.07] cursor-default"
    >
      <div className="flex flex-col gap-1">
        <p className="text-cream font-semibold text-sm">{day}</p>
        <p className="text-cream/55 text-sm">{session.time} · {session.location}</p>
      </div>
      <span className={`text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap ${levelStyles[session.level] || levelStyles.basic}`}>
        {session.level}
      </span>
    </motion.div>
  );
}

function ClubSection({
  title,
  sessions,
  delay,
  locale,
}: {
  title: string;
  sessions: ScheduleSession[];
  delay: number;
  locale: string;
}) {
  const xOffset = delay < 0.2 ? -40 : 40;

  return (
    <motion.div
      initial={{ opacity: 0, x: xOffset }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      viewport={{ once: true }}
      className="flex flex-col gap-4"
    >
      <h3 className="font-serif text-2xl font-bold text-gold">{title}</h3>
      <div className="flex flex-col gap-3">
        {sessions.map((session) => (
          <SessionCard key={session.id} session={session} locale={locale} />
        ))}
      </div>
    </motion.div>
  );
}

export default function Schedule({ schedule, locale }: ScheduleProps) {
  const t = useTranslations('schedule');

  const englishSessions = schedule.filter((s) => s.club === 'english');
  const russianSessions = schedule.filter((s) => s.club === 'russian');

  return (
    <section id="club" className="grain-overlay relative bg-dark py-20 px-6">
      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-cream mb-4">
            {t('title')}
          </h2>
          <p className="text-muted max-w-xl mx-auto">{t('subtitle')}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <ClubSection
            title={t('englishClub')}
            sessions={englishSessions}
            delay={0.1}
            locale={locale}
          />
          <ClubSection
            title={t('russianClub')}
            sessions={russianSessions}
            delay={0.25}
            locale={locale}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="mt-12 text-center flex flex-col items-center gap-4"
        >
          <p className="text-muted text-sm">{t('footnote')}</p>
          <a
            href="https://t.me/UlyaLena"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-gold text-dark font-semibold px-8 py-3 rounded-full hover:bg-gold/90 transition-colors duration-200"
          >
            {t('cta')}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
