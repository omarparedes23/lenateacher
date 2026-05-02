CREATE TABLE IF NOT EXISTS lena_page_sections (
  section_key TEXT PRIMARY KEY,
  title_es TEXT NOT NULL DEFAULT '',
  title_en TEXT NOT NULL DEFAULT '',
  body_es TEXT NOT NULL DEFAULT '',
  body_en TEXT NOT NULL DEFAULT '',
  published BOOLEAN DEFAULT true,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS lena_schedule_sessions (
  id SERIAL PRIMARY KEY,
  club TEXT CHECK (club IN ('english', 'russian')) NOT NULL,
  day_es TEXT NOT NULL,
  day_en TEXT NOT NULL,
  time TEXT NOT NULL,
  location TEXT NOT NULL DEFAULT '',
  level TEXT NOT NULL DEFAULT '',
  sort_order INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS lena_testimonials (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  flag TEXT NOT NULL DEFAULT '',
  country_es TEXT NOT NULL DEFAULT '',
  country_en TEXT NOT NULL DEFAULT '',
  text_es TEXT NOT NULL,
  text_en TEXT NOT NULL,
  sort_order INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS lena_words (
  id SERIAL PRIMARY KEY,
  cyrillic TEXT NOT NULL,
  phonetic TEXT NOT NULL,
  translation_es TEXT NOT NULL,
  translation_en TEXT NOT NULL,
  emoji TEXT NOT NULL DEFAULT '',
  sort_order INT DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_schedule_sort ON lena_schedule_sessions(sort_order);
CREATE INDEX IF NOT EXISTS idx_testimonials_sort ON lena_testimonials(sort_order);
CREATE INDEX IF NOT EXISTS idx_words_sort ON lena_words(sort_order);

ALTER TABLE lena_page_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE lena_schedule_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE lena_testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE lena_words ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read" ON lena_page_sections;
CREATE POLICY "Allow public read" ON lena_page_sections FOR SELECT USING (true);
DROP POLICY IF EXISTS "Allow auth write" ON lena_page_sections;
CREATE POLICY "Allow auth write" ON lena_page_sections FOR ALL USING (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "Allow public read schedule" ON lena_schedule_sessions;
CREATE POLICY "Allow public read schedule" ON lena_schedule_sessions FOR SELECT USING (true);
DROP POLICY IF EXISTS "Allow auth write schedule" ON lena_schedule_sessions;
CREATE POLICY "Allow auth write schedule" ON lena_schedule_sessions FOR ALL USING (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "Allow public read testimonials" ON lena_testimonials;
CREATE POLICY "Allow public read testimonials" ON lena_testimonials FOR SELECT USING (true);
DROP POLICY IF EXISTS "Allow auth write testimonials" ON lena_testimonials;
CREATE POLICY "Allow auth write testimonials" ON lena_testimonials FOR ALL USING (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "Allow public read words" ON lena_words;
CREATE POLICY "Allow public read words" ON lena_words FOR SELECT USING (true);
DROP POLICY IF EXISTS "Allow auth write words" ON lena_words;
CREATE POLICY "Allow auth write words" ON lena_words FOR ALL USING (auth.uid() IS NOT NULL);
