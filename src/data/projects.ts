import { DEFAULT_LANG, SUPPORTED_LANGS, type Lang } from '../i18n/config';

export interface Project {
  name: string;
  demoLink: string;
  tags?: string[];
  description?: string | Record<Lang, string>;
  postLink?: string;
  demoLinkRel?: string;
  [key: string]: any;
}

const projectsData: Project[] = [
  {
    name: 'CI energy feedback hook',
    description: {
      en: 'Prototype hook that captures per-build power deltas from energy-aware runners and posts signals to chat.',
      it: 'Hook sperimentale che raccoglie i delta di consumo per build da runner energy-aware e invia i segnali in chat.',
    },
    demoLink: 'https://aneggi.github.io/projects/ci-energy-feedback',
    tags: ['DevOps', 'Energy'],
  },
  {
    name: 'Telemetry sandbox',
    description: {
      en: 'Sandbox to explore combining latency, reliability, and energy metrics for real-time services.',
      it: 'Sandbox per combinare metriche di latenza, affidabilita ed energia nei servizi real-time.',
    },
    demoLink: 'https://aneggi.github.io/projects/telemetry-sandbox',
    tags: ['Real-time', 'Research'],
  },
];

function resolveLang(lang: Lang = DEFAULT_LANG) {
  return SUPPORTED_LANGS.includes(lang) ? lang : DEFAULT_LANG;
}

export function getProjects(lang: Lang = DEFAULT_LANG) {
  const targetLang = resolveLang(lang);
  return projectsData.map((project) => {
    const description =
      typeof project.description === 'object'
        ? project.description[targetLang] || project.description[DEFAULT_LANG]
        : project.description;

    return {
      ...project,
      description,
    };
  });
}
