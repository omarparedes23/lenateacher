'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

interface Session {
  day: string;
  time: string;
  location: string | null;
  level: 'basic' | 'intermediate' | 'advanced';
}

const englishClubSessions: Session[] = [
  { day: 'Martes / Tuesday', time: '19:00', location: 'Московский', level: 'intermediate' },
  { day: 'Sábado / Saturday', time: '11:30', location: 'Московский', level: 'basic' },
  { day: 'Viernes / Friday', time: '11:30', location: 'Новаторская', level: 'intermediate' },
];

const russianClubSessions: Session[] = [
  { day: 'Miércoles / Wednesday', time: '13:30', location: 'Лубянка', level: 'basic' },
  { day: 'Viernes / Friday', time: '13:00', location: null, level: 'intermediate' },
  { day: 'Domingo / Sunday', time: '14:00', location: 'Новаторская', level: 'advanced' },
];

const levelStyles: Record<Session['level'], string> = {
  basic: 'bg-green-100 text-green-800',
  intermediate: 'bg-amber-50 text-amber-700 border border-amber-300',
  advanced: 'bg-rose-50 text-rose-800 border border-rose-300',
};

function SessionCard({ session, tbc }: { session: Session; tbc: string }) {
  const levelLabel = session.level;

  return (
    <motion.div
      whileHover={{ scale: 1.02, borderColor: '#C9A84C' }}
      className="border border-cream/20 rounded-xl p-5 flex items-center justify-between gap-4 bg-dark/50 transition-colors duration-200 cursor-default"
    >
      <div className="flex flex-col gap-1">
        <p className="text-cream font-semibold text-sm">{session.day}</p>
        <p className="text-muted text-sm">{session.time} · {session.location ?? tbc}</p>
      </div>
      <span className={`text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap ${levelStyles[session.level]}`}>
        {levelLabel}
      </span>
    </motion.div>
  );
}

function ClubSection({
  title,
  sessions,
  tbc,
  delay,
}: {
  title: string;
  sessions: Session[];
  tbc: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      viewport={{ once: true }}
      className="flex flex-col gap-4"
    >
      <h3 className="font-serif text-2xl font-bold text-gold">{title}</h3>
      <div className="flex flex-col gap-3">
        {sessions.map((session, i) => (
          <SessionCard key={i} session={session} tbc={tbc} />
        ))}
      </div>
    </motion.div>
  );
}

export default function Schedule() {
  const t = useTranslations('schedule');

  return (
    <section id="club" className="bg-dark py-20 px-6">
      <div className="max-w-5xl mx-auto">
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
            sessions={englishClubSessions}
            tbc={t('tbc')}
            delay={0.1}
          />
          <ClubSection
            title={t('russianClub')}
            sessions={russianClubSessions}
            tbc={t('tbc')}
            delay={0.25}
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
