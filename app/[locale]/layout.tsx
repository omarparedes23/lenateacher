import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { MotionConfig } from 'framer-motion';
import type { Metadata, Viewport } from 'next';
import '../globals.css';

const BASE_URL = 'https://profelena.ru';


type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export const viewport: Viewport = {
  themeColor: '#1A1A1A',
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });

  const canonicalPath = locale === 'es' ? BASE_URL + '/' : `${BASE_URL}/${locale}`;
  const ogLocale = locale === 'es' ? 'es_ES' : 'en_US';
  const alternateLocale = locale === 'es' ? 'en_US' : 'es_ES';
  // OG image URL: default locale uses root path (no prefix), other locales use /{locale}/opengraph-image
  const ogImageUrl = locale === 'es' ? `${BASE_URL}/opengraph-image` : `${BASE_URL}/${locale}/opengraph-image`;

  return {
    metadataBase: new URL(BASE_URL),
    title: { default: t('title'), template: '%s | Profe Lena' },
    description: t('description'),
    keywords: t('keywords'),
    authors: [{ name: 'Lena', url: BASE_URL }],
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
    alternates: {
      canonical: canonicalPath,
      languages: {
        es: BASE_URL + '/',
        en: BASE_URL + '/en',
        'x-default': BASE_URL + '/',
      },
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: canonicalPath,
      siteName: 'Profe Lena',
      locale: ogLocale,
      alternateLocale: [alternateLocale],
      type: 'website',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: t('ogImageAlt'),
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      images: [ogImageUrl],
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as 'es' | 'en')) {
    notFound();
  }

  const [messages, t, tFaq, tSchema] = await Promise.all([
    getMessages(),
    getTranslations({ locale, namespace: 'meta' }),
    getTranslations({ locale, namespace: 'faq' }),
    getTranslations({ locale, namespace: 'schema' }),
  ]);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ProfessionalService',
        name: 'Profe Lena',
        description: tSchema('serviceDescription'),
        url: BASE_URL,
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Moscow',
          addressCountry: 'RU',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 55.7558,
          longitude: 37.6173,
        },
        priceRange: '$$',
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Russian Language Services',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Russian Lesson 30 min',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Russian Lesson 1 hour',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Russian Lesson Intensive 1.5–2 hours',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Live Language Party',
              },
            },
          ],
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '5',
          reviewCount: '3',
          bestRating: '5',
          worstRating: '1',
        },
        review: [
          {
            '@type': 'Review',
            author: { '@type': 'Person', name: 'Carlos M.' },
            reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
            reviewBody:
              'I started from scratch and in 3 months I could already ask for directions on the Moscow metro. Lena makes Russian feel less scary.',
          },
          {
            '@type': 'Review',
            author: { '@type': 'Person', name: 'Sarah K.' },
            reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
            reviewBody:
              'The conversation club completely changed my experience in Moscow. I went from tourist to feeling at home.',
          },
          {
            '@type': 'Review',
            author: { '@type': 'Person', name: 'Ana P.' },
            reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
            reviewBody:
              'The club took away my fear of speaking. I also met amazing people from all over the world. Totally recommended!',
          },
        ],
        areaServed: [
          { '@type': 'City', name: 'Moscow' },
          { '@type': 'Country', name: 'Russia' },
          'Online — worldwide',
        ],
        availableLanguage: ['Spanish', 'English', 'Russian'],
        sameAs: ['https://t.me/UlyaLena'],
      },
      {
        '@type': 'Person',
        name: 'Lena',
        jobTitle: tSchema('jobTitle'),
        url: BASE_URL,
        sameAs: ['https://t.me/UlyaLena'],
        worksFor: {
          '@type': 'Organization',
          name: 'Profe Lena',
          url: BASE_URL,
        },
      },
      {
        '@type': 'Course',
        name: 'Russian Language Individual Classes',
        description: tSchema('serviceDescription'),
        provider: {
          '@type': 'Person',
          name: 'Lena',
          url: BASE_URL,
        },
        hasCourseInstance: [
          {
            '@type': 'CourseInstance',
            courseMode: 'online',
          },
          {
            '@type': 'CourseInstance',
            courseMode: 'onsite',
            location: {
              '@type': 'Place',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Moscow',
                addressCountry: 'RU',
              },
            },
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: tFaq('q1'),
            acceptedAnswer: { '@type': 'Answer', text: tFaq('a1') },
          },
          {
            '@type': 'Question',
            name: tFaq('q2'),
            acceptedAnswer: { '@type': 'Answer', text: tFaq('a2') },
          },
          {
            '@type': 'Question',
            name: tFaq('q3'),
            acceptedAnswer: { '@type': 'Answer', text: tFaq('a3') },
          },
          {
            '@type': 'Question',
            name: tFaq('q4'),
            acceptedAnswer: { '@type': 'Answer', text: tFaq('a4') },
          },
          {
            '@type': 'Question',
            name: tFaq('q5'),
            acceptedAnswer: { '@type': 'Answer', text: tFaq('a5') },
          },
        ],
      },
    ],
  };

  return (
    <html lang={locale} className="dark" style={{ colorScheme: 'dark' }}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans bg-dark text-cream">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <NextIntlClientProvider messages={messages}>
          <MotionConfig reducedMotion="user">
            {children}
          </MotionConfig>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
