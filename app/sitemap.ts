import type { MetadataRoute } from 'next';

const BASE_URL = 'https://profelena.ru';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${BASE_URL}/`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
      alternates: {
        languages: {
          es: `${BASE_URL}/`,
          en: `${BASE_URL}/en`,
        },
      },
    },
    {
      url: `${BASE_URL}/en`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
      alternates: {
        languages: {
          es: `${BASE_URL}/`,
          en: `${BASE_URL}/en`,
        },
      },
    },
  ];
}
