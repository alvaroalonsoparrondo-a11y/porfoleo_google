import { MetadataRoute } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: ['/', '/es/', '/en/', '/ca/', '/contact', '/experience', '/IA', '/projects', '/tecnologies'],
      disallow: ['/api/', '/_next/', '/private/', '/admin/'],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
