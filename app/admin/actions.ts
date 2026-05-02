'use server';

import { revalidatePath } from 'next/cache';
import { createAdminClient } from '@/lib/supabase/admin';
import type { PageSection, ScheduleSession, Testimonial, WordOfDay } from '@/types/cms';

export async function savePageSections(sections: PageSection[]) {
  const supabase = createAdminClient();
  for (const section of sections) {
    const { error } = await supabase
      .from('lena_page_sections')
      .upsert({
        section_key: section.section_key,
        title_es: section.title_es,
        title_en: section.title_en,
        body_es: section.body_es,
        body_en: section.body_en,
        published: section.published,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'section_key' });
    if (error) throw new Error(`Failed to save ${section.section_key}: ${error.message}`);
  }
  revalidatePath('/[locale]', 'page');
  return { success: true };
}

export async function saveSchedule(sessions: ScheduleSession[]) {
  const supabase = createAdminClient();
  for (const session of sessions) {
    const { error } = await supabase
      .from('lena_schedule_sessions')
      .upsert({
        id: session.id,
        club: session.club,
        day_es: session.day_es,
        day_en: session.day_en,
        time: session.time,
        location: session.location,
        level: session.level,
        sort_order: session.sort_order,
      }, { onConflict: 'id' });
    if (error) throw new Error(`Failed to save session ${session.id}: ${error.message}`);
  }
  revalidatePath('/[locale]', 'page');
  return { success: true };
}

export async function deleteSchedule(ids: number[]) {
  const supabase = createAdminClient();
  const { error } = await supabase
    .from('lena_schedule_sessions')
    .delete()
    .in('id', ids);
  if (error) throw new Error(`Failed to delete sessions: ${error.message}`);
  revalidatePath('/[locale]', 'page');
  return { success: true };
}

export async function saveTestimonials(testimonials: Testimonial[]) {
  const supabase = createAdminClient();
  for (const t of testimonials) {
    const { error } = await supabase
      .from('lena_testimonials')
      .upsert({
        id: t.id,
        name: t.name,
        flag: t.flag,
        country_es: t.country_es,
        country_en: t.country_en,
        text_es: t.text_es,
        text_en: t.text_en,
        sort_order: t.sort_order,
      }, { onConflict: 'id' });
    if (error) throw new Error(`Failed to save testimonial ${t.id}: ${error.message}`);
  }
  revalidatePath('/[locale]', 'page');
  return { success: true };
}

export async function deleteTestimonials(ids: number[]) {
  const supabase = createAdminClient();
  const { error } = await supabase
    .from('lena_testimonials')
    .delete()
    .in('id', ids);
  if (error) throw new Error(`Failed to delete testimonials: ${error.message}`);
  revalidatePath('/[locale]', 'page');
  return { success: true };
}

export async function saveWords(words: WordOfDay[]) {
  const supabase = createAdminClient();
  for (const word of words) {
    const { error } = await supabase
      .from('lena_words')
      .upsert({
        id: word.id,
        cyrillic: word.cyrillic,
        phonetic: word.phonetic,
        translation_es: word.translation_es,
        translation_en: word.translation_en,
        emoji: word.emoji,
        sort_order: word.sort_order,
      }, { onConflict: 'id' });
    if (error) throw new Error(`Failed to save word ${word.id}: ${error.message}`);
  }
  revalidatePath('/[locale]', 'page');
  return { success: true };
}

export async function deleteWords(ids: number[]) {
  const supabase = createAdminClient();
  const { error } = await supabase
    .from('lena_words')
    .delete()
    .in('id', ids);
  if (error) throw new Error(`Failed to delete words: ${error.message}`);
  revalidatePath('/[locale]', 'page');
  return { success: true };
}
