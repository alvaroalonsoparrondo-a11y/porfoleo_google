import Link from 'next/link';
import { getDictionary } from '@/lib/dictonary';
import { generatePageMetadata } from '@/lib/metadata';

type Locale = 'es' | 'en' | 'ca';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  return generatePageMetadata({
    title: dict.metadata.home.title,
    description: dict.metadata.home.description,
    path: '',
    locale: lang as Locale,
  });
}

export default async function NotFound({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  return (
    <div className="min-h-[calc(100vh-56px)] flex flex-col items-center justify-center p-6">
      {/* Google-style error icon */}
      <div className="mb-4">
        <svg
          className="w-16 h-16 text-red-400"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
        </svg>
      </div>

      <h1 className="text-3xl font-bold text-foreground mb-2">
        {lang === 'es' ? 'No se encontraron resultados' : lang === 'en' ? 'No results found' : 'No s\'han trobat resultats'}
      </h1>
      <p className="text-text-muted text-lg mb-8">
        {lang === 'es' ? 'La página que buscas no existe.' : lang === 'en' ? 'The page you are looking for does not exist.' : 'La pàgina que cerques no existeix.'}
      </p>

      {/* Navigation links */}
      <div className="space-y-3">
        <Link
          href={`/${lang}`}
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1H6a1 1 0 00-1 1v10a1 1 0 01-1-1H3a1 1 0 00-1 1V6a1 1 0 011-1h2a1 1 0 001-1m0 0l3-3m-3 3l3 3"
            />
          </svg>
          {lang === 'es' ? 'Volver al Inicio' : lang === 'en' ? 'Back to Home' : 'Tornar a l\'Inici'}
        </Link>

        <Link
          href={`/${lang}/projects`}
          className="inline-flex items-center gap-2 px-6 py-3 bg-header-bg border border-border hover:bg-input-bg text-foreground font-medium rounded-lg transition-colors duration-200"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
            />
          </svg>
          {lang === 'es' ? 'Ver Proyectos' : lang === 'en' ? 'View Projects' : 'Veure Projectes'}
        </Link>
      </div>

      {/* Search bar style */}
      <div className="mt-12 w-full max-w-2xl">
        <div className="relative">
          <input
            type="text"
            placeholder={lang === 'es' ? 'Buscar en el portfolio...' : lang === 'en' ? 'Search in portfolio...' : 'Cercar al portfolio...'}
            className="w-full h-[46px] pl-6 pr-24 border border-input-border bg-input-bg rounded-full text-base focus:outline-none focus:ring-1 focus:ring-blue-300 focus:border-blue-300 transition-all shadow-sm hover:shadow-md text-foreground"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted cursor-pointer">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
