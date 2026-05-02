export type SectionKey = 'hero' | 'about' | 'pricing' | 'services';

export interface PageSection {
  section_key: SectionKey;
  title_es: string;
  title_en: string;
  body_es: string;
  body_en: string;
  published: boolean;
  updated_at: string;
}

export interface ScheduleSession {
  id: number;
  club: 'english' | 'russian';
  day_es: string;
  day_en: string;
  time: string;
  location: string;
  level: string;
  sort_order: number;
}

export interface Testimonial {
  id: number;
  name: string;
  flag: string;
  country_es: string;
  country_en: string;
  text_es: string;
  text_en: string;
  sort_order: number;
}

export interface WordOfDay {
  id: number;
  cyrillic: string;
  phonetic: string;
  translation_es: string;
  translation_en: string;
  emoji: string;
  sort_order: number;
}
