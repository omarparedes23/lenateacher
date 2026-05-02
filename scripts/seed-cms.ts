import { createAdminClient } from '@/lib/supabase/admin';
import {
  fallbackSections,
  fallbackSchedule,
  fallbackTestimonials,
  fallbackWords,
} from '@/lib/cms/fallback-data';

async function seed() {
  const supabase = createAdminClient();

  console.log('Seeding lena_page_sections...');
  for (const section of fallbackSections) {
    const { error } = await supabase.from('lena_page_sections').upsert(section, {
      onConflict: 'section_key',
    });
    if (error) {
      console.error('Error seeding section', section.section_key, error);
      process.exit(1);
    }
  }

  console.log('Seeding lena_schedule_sessions...');
  for (const session of fallbackSchedule) {
    const { error } = await supabase.from('lena_schedule_sessions').upsert(session, {
      onConflict: 'id',
    });
    if (error) {
      console.error('Error seeding schedule', session.id, error);
      process.exit(1);
    }
  }

  console.log('Seeding lena_testimonials...');
  for (const testimonial of fallbackTestimonials) {
    const { error } = await supabase.from('lena_testimonials').upsert(testimonial, {
      onConflict: 'id',
    });
    if (error) {
      console.error('Error seeding testimonial', testimonial.id, error);
      process.exit(1);
    }
  }

  console.log('Seeding lena_words...');
  for (const word of fallbackWords) {
    const { error } = await supabase.from('lena_words').upsert(word, {
      onConflict: 'id',
    });
    if (error) {
      console.error('Error seeding word', word.id, error);
      process.exit(1);
    }
  }

  console.log('Seed complete.');
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
