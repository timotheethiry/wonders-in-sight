import { MetadataRoute } from 'next';
import { themes } from '../data/themes';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://wonders-in-sight.vercel.app';

  // 1. Pages statiques de base
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/a-propos`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/mentions-legales`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
  ];

  // 2. Récupération dynamique des thèmes depuis Contentful (à adapter selon ton setup)
  const themesSlugs = themes.map(theme => theme.slug); 
  const themePages = themesSlugs.map((slug) => ({
    url: `${baseUrl}/theme/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  return [...staticPages, ...themePages];
}