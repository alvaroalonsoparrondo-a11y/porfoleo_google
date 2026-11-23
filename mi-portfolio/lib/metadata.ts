import { Metadata } from 'next';

type Locale = 'es' | 'en' | 'ca';

interface MetadataParams {
  title: string;
  description: string;
  path: string;
  locale: Locale;
  ogImage?: string;
  type?: 'website' | 'article' | 'profile';
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export function generatePageMetadata({
  title,
  description,
  path,
  locale,
  ogImage = '/og-image.jpg',
  type = 'website',
}: MetadataParams): Metadata {
  const fullTitle = `${title} | Norbert Aguilera`;
  const url = `${siteUrl}/${locale}${path}`;

  // Language alternates
  const languages: Record<string, string> = {
    es: `${siteUrl}/es${path}`,
    en: `${siteUrl}/en${path}`,
    ca: `${siteUrl}/ca${path}`,
    'x-default': `${siteUrl}/es${path}`,
  };

  return {
    title: fullTitle,
    description,
    alternates: {
      canonical: url,
      languages,
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: 'Norbert Aguilera Portfolio',
      images: [
        {
          url: `${siteUrl}${ogImage}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: locale === 'ca' ? 'ca_ES' : locale === 'es' ? 'es_ES' : 'en_US',
      type,
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [`${siteUrl}${ogImage}`],
      creator: '@norbertaguilera',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}
