import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/sections/Hero';
import StatsStrip from '@/components/sections/StatsStrip';
import Services from '@/components/sections/Services';
import Schedule from '@/components/sections/Schedule';
import WordOfDay from '@/components/sections/WordOfDay';
import Gallery from '@/components/sections/Gallery';
import About from '@/components/sections/About';
import Testimonials from '@/components/sections/Testimonials';
import Pricing from '@/components/sections/Pricing';
import TelegramFAB from '@/components/ui/TelegramFAB';
import Footer from '@/components/layout/Footer';
import {
  getPageSections,
  getSchedule,
  getTestimonials,
  getWords,
} from '@/lib/cms/fetcher';

export const revalidate = 60;

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;

  const [sections, schedule, testimonials, words] = await Promise.all([
    getPageSections(),
    getSchedule(),
    getTestimonials(),
    getWords(),
  ]);

  return (
    <>
      <Navbar locale={locale} />
      <main id="main" className="overflow-x-hidden">
        <Hero sections={sections} locale={locale} />
        <StatsStrip />
        <Services sections={sections} locale={locale} />
        <Schedule schedule={schedule} locale={locale} />
        <WordOfDay words={words} locale={locale} />
        <Gallery />
        <About sections={sections} locale={locale} />
        <Testimonials testimonials={testimonials} locale={locale} />
        <Pricing sections={sections} locale={locale} />
      </main>
      <Footer />
      <TelegramFAB />
    </>
  );
}
