import { MetadataRoute } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

const locales = ['es', 'en', 'ca'] as const;

const routes = [
  { path: '', changeFrequency: 'daily' as const, priority: 1.0 },
  { path: '/contact', changeFrequency: 'monthly' as const, priority: 0.8 },
  { path: '/experience', changeFrequency: 'monthly' as const, priority: 0.8 },
  { path: '/IA', changeFrequency: 'monthly' as const, priority: 0.7 },
  { path: '/projects', changeFrequency: 'weekly' as const, priority: 0.9 },
  { path: '/tecnologies', changeFrequency: 'monthly' as const, priority: 0.7 },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const route of routes) {
      entries.push({
        url: `${siteUrl}/${locale}${route.path}`,
        lastModified: new Date().toISOString(),
        changeFrequency: route.changeFrequency,
        priority: route.priority,
      });
    }
  }

  return entries;
}
