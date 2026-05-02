import { createClient } from '@/lib/supabase/server';
import {
  fallbackSections,
  fallbackSchedule,
  fallbackTestimonials,
  fallbackWords,
} from './fallback-data';
import type { PageSection, ScheduleSession, Testimonial, WordOfDay } from '@/types/cms';

export async function getPageSections(): Promise<PageSection[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('lena_page_sections')
      .select('*')
      .eq('published', true)
      .order('section_key');
    if (error) throw error;
    if (!data?.length) throw new Error('Empty');
    return data as PageSection[];
  } catch {
    return fallbackSections;
  }
}

export async function getSchedule(): Promise<ScheduleSession[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('lena_schedule_sessions')
      .select('*')
      .order('sort_order');
    if (error) throw error;
    if (!data?.length) throw new Error('Empty');
    return data as ScheduleSession[];
  } catch {
    return fallbackSchedule;
  }
}

export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('lena_testimonials')
      .select('*')
      .order('sort_order');
    if (error) throw error;
    if (!data?.length) throw new Error('Empty');
    return data as Testimonial[];
  } catch {
    return fallbackTestimonials;
  }
}

export async function getWords(): Promise<WordOfDay[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('lena_words')
      .select('*')
      .order('sort_order');
    if (error) throw error;
    if (!data?.length) throw new Error('Empty');
    return data as WordOfDay[];
  } catch {
    return fallbackWords;
  }
}
