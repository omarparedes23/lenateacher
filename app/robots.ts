import { headers } from 'next/headers';
import type { MetadataRoute } from 'next';

const CANONICAL_HOST = 'profelena.ru';
const BASE_URL = 'https://profelena.ru';

export default async function robots(): Promise<MetadataRoute.Robots> {
  const headersList = await headers();
  const host = headersList.get('host') ?? '';
  const isCanonical = host === CANONICAL_HOST || host === `www.${CANONICAL_HOST}`;

  if (!isCanonical) {
    return {
      rules: { userAgent: '*', disallow: '/' },
    };
  }

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
