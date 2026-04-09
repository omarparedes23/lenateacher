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

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;

  return (
    <>
      <Navbar locale={locale} />
      <main id="main" className="overflow-x-hidden">
        <Hero />
        <StatsStrip />
        <Services />
        <Schedule />
        <WordOfDay locale={locale} />
        <Gallery />
        <About />
        <Testimonials />
        <Pricing />
      </main>
      <Footer />
      <TelegramFAB />
    </>
  );
}
