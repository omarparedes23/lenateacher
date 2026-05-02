import { getTestimonials } from '@/lib/cms/fetcher';
import TestimonialsClient from '@/components/admin/TestimonialsClient';

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials();
  return <TestimonialsClient testimonials={testimonials} />;
}
