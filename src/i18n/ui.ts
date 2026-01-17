import { DEFAULT_LANG, SUPPORTED_LANGS, type Lang } from './config';

const ui = {
  en: {
    languageToggleLabel: 'Language',
    menu: {
      about: 'About',
      posts: 'Posts',
      publications: 'Publications',
      projects: 'Projects',
      tags: 'Tags',
    },
    home: {
      greeting: 'Ciao, I am',
      latestPost: 'Latest post',
      latestPublication: 'Latest publication',
      recentPosts: 'Recent Posts',
      recentPublications: 'Recent Publications',
      allPosts: 'All posts »',
      allPublications: 'All publications »',
    },
    about: {
      focusTitle: 'What I am focused on',
      educationTitle: 'Education & milestones',
      connectTitle: 'Connect',
      locationPrefix: 'Based in',
      reachPrefix: 'Reach me at',
      orcidLabel: 'ORCID',
      orcidPrefix: 'or find my',
    },
    posts: {
      title: 'Writing',
      description: 'Articles published on this blog.',
      articlesHeading: 'Articles',
    },
    projects: {
      title: 'Projects & experiments',
      lead: 'Prototypes that explore feedback loops, telemetry, and sustainable software.',
      description: 'Prototypes and experiments around energy-aware DevOps and real-time telemetry.',
    },
    publications: {
      title: 'Publications',
      description: 'Research outputs, talks, and papers.',
    },
    tags: {
      title: 'All Tags',
      description: 'Tags across posts and publications.',
    },
    tagDetail: {
      titlePrefix: 'All content tagged with',
      descriptionPrefix: 'Posts and publications tagged with',
      articlesHeading: 'Articles',
      publicationsHeading: 'Publications',
      empty: 'No content found for this tag.',
    },
    toc: 'On This Page',
    aboutAuthor: {
      title: 'About the Author',
      summary:
        'Bolzano-based PhD researcher working on power-aware DevOps and sustainable software. Sharing notes on how to surface energy signals in developer workflows.',
      contact: 'Reach out at',
      orcidLabel: 'ORCID',
    },
    blogPost: {
      updatedOn: 'Updated on',
      publishedOn: 'Published on',
    },
    projectCard: {
      article: 'Article',
      demo: 'Demo',
      stars: 'stars',
    },
  },
  it: {
    languageToggleLabel: 'Lingua',
    menu: {
      about: 'Chi sono',
      posts: 'Articoli',
      publications: 'Pubblicazioni',
      projects: 'Progetti',
      tags: 'Tag',
    },
    home: {
      greeting: 'Ciao, sono',
      latestPost: 'Ultimo articolo',
      latestPublication: 'Ultima pubblicazione',
      recentPosts: 'Articoli recenti',
      recentPublications: 'Pubblicazioni recenti',
      allPosts: 'Tutti gli articoli »',
      allPublications: 'Tutte le pubblicazioni »',
    },
    about: {
      focusTitle: 'Su cosa mi concentro',
      educationTitle: 'Formazione e tappe',
      connectTitle: 'Contatti',
      locationPrefix: 'Base a',
      reachPrefix: 'Scrivimi a',
      orcidLabel: 'ORCID',
      orcidPrefix: "oppure trovi l'",
    },
    posts: {
      title: 'Scritti',
      description: 'Articoli pubblicati qui.',
      articlesHeading: 'Articoli',
    },
    projects: {
      title: 'Progetti ed esperimenti',
      lead: 'Prototipi che esplorano feedback loop, telemetria e software sostenibile.',
      description: 'Progetti ed esperimenti su DevOps attento all energia e telemetria real-time.',
    },
    publications: {
      title: 'Pubblicazioni',
      description: 'Risultati di ricerca, talk e paper.',
    },
    tags: {
      title: 'Tutti i tag',
      description: 'Tag di articoli e pubblicazioni.',
    },
    tagDetail: {
      titlePrefix: 'Contenuti con il tag',
      descriptionPrefix: 'Articoli e pubblicazioni con il tag',
      articlesHeading: 'Articoli',
      publicationsHeading: 'Pubblicazioni',
      empty: 'Nessun contenuto per questo tag.',
    },
    toc: 'In questa pagina',
    aboutAuthor: {
      title: 'Chi scrive',
      summary:
        'Dottorando a Bolzano: lavoro su DevOps attento ai consumi e software sostenibile. Condivido come portare segnali energetici nei flussi di sviluppo.',
      contact: 'Scrivimi a',
      orcidLabel: 'ORCID',
    },
    blogPost: {
      updatedOn: 'Aggiornato il',
      publishedOn: 'Pubblicato il',
    },
    projectCard: {
      article: 'Articolo',
      demo: 'Demo',
      stars: 'stelle',
    },
  },
};

export type UiCopy = typeof ui.en;

export function getUiCopy(lang: Lang = DEFAULT_LANG): UiCopy {
  const selected = SUPPORTED_LANGS.includes(lang) ? lang : DEFAULT_LANG;
  return ui[selected];
}
