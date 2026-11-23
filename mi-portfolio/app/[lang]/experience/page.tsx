import { getDictionary } from "@/lib/dictonary";
import { generatePageMetadata } from "@/lib/metadata";

type Locale = "es" | "en" | "ca";

interface ExperienceRole {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  logo?: string;
  description: string;
  achievements: string[];
  technologies: string[];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  return generatePageMetadata({
    title: dict.metadata.experience.title,
    description: dict.metadata.experience.description,
    path: '/experience',
    locale: lang as Locale,
  });
}

export default async function ExperiencePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  const roles = dict.experience.roles as ExperienceRole[];

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 space-y-10">
      {/* Header Section */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">{dict.experience.title}</h1>
        <p className="text-text-muted">{dict.experience.subtitle}</p>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-0 md:left-8 top-0 bottom-0 w-px bg-border"></div>

        {/* Experience cards */}
        <div className="space-y-12">
          {roles.map((role, index) => (
            <div key={role.id} className="relative pl-8 md:pl-20">
              {/* Timeline dot */}
              <div className="absolute left-[-4px] md:left-[28px] top-2 w-3 h-3 rounded-full bg-blue-600 ring-4 ring-background"></div>

              {/* Card */}
              <div className="border border-border rounded-2xl p-6 md:p-8 bg-header-bg shadow-sm hover:shadow-md transition-shadow">
                {/* Header: Company, Role, Dates */}
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      {/* Company logo placeholder */}
                      <div className="w-12 h-12 bg-border rounded-lg flex items-center justify-center text-foreground font-bold text-sm shrink-0">
                        {role.company.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <h2 className="text-xl font-semibold text-foreground">{role.role}</h2>
                        <p className="text-sm text-text-muted">{role.company}</p>
                      </div>
                    </div>
                  </div>

                  {/* Dates */}
                  <div className="text-sm text-text-muted md:text-right">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>
                        {role.startDate} - {role.endDate === "Present" || role.endDate === "Presente" || role.endDate === "Present" ? dict.experience.present : role.endDate}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-foreground mb-4">{role.description}</p>

                {/* Achievements */}
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wide">
                    {dict.experience.achievements}
                  </h3>
                  <ul className="space-y-2">
                    {role.achievements.map((achievement, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                        <span className="text-blue-600 mt-1">▪</span>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technologies */}
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wide">
                    {dict.experience.technologies}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {role.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-medium rounded-full border border-blue-200 dark:border-blue-800"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="border border-border rounded-2xl p-8 bg-header-bg shadow-sm text-center">
        <h3 className="text-xl font-semibold text-foreground mb-2">
          {lang === "es" ? "¿Quieres trabajar juntos?" : lang === "en" ? "Want to work together?" : "Vols treballar junts?"}
        </h3>
        <p className="text-text-muted mb-4">
          {lang === "es" ? "Siempre estoy abierto a nuevas oportunidades y proyectos interesantes." : lang === "en" ? "I'm always open to new opportunities and interesting projects." : "Sempre estic obert a noves oportunitats i projectes interessants."}
        </p>
        <a
          href={`/${lang}/contact`}
          className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
        >
          {lang === "es" ? "Contactar" : lang === "en" ? "Get in touch" : "Contactar"}
        </a>
      </div>
    </div>
  );
}
