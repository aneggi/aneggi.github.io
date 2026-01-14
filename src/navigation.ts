import { getPermalink, getBlogPermalink, getAsset } from './utils/permalinks';

export const headerData = {
  links: [
    {
      text: 'About',
      href: '#about',
    },
    {
      text: 'Research',
      href: '#research',
    },
    {
      text: 'Academic',
      href: '#academic',
    },
    {
      text: 'Work',
      href: '#work',
    },
    {
      text: 'Blog',
      href: getBlogPermalink(),
    },
  ],
  actions: [{ text: 'ORCID', href: 'https://orcid.org/0009-0009-3709-5051', target: '_blank' }],
};

export const footerData = {
  links: [
    {
      title: 'Contact',
      links: [
        { text: 'aaneggi@unibz.it', href: 'mailto:aaneggi@unibz.it' },
        { text: 'NOI Techpark B1.4.26', href: '#contact' },
        { text: 'Free University of Bozen-Bolzano', href: '#contact' },
      ],
    },
    {
      title: 'Research',
      links: [
        { text: 'Feedback loops for greener software', href: '#research' },
        { text: 'Real-time systems risk reduction', href: '#research' },
        { text: 'DevOps | Networking | Security', href: '#research' },
      ],
    },
    {
      title: 'Explore',
      links: [
        { text: 'Blog', href: getBlogPermalink() },
        { text: 'About', href: '#about' },
        { text: 'Academic', href: '#academic' },
        { text: 'Work', href: '#work' },
      ],
    },
  ],
  secondaryLinks: [
    { text: 'Terms', href: getPermalink('/terms') },
    { text: 'Privacy Policy', href: getPermalink('/privacy') },
  ],
  socialLinks: [
    { ariaLabel: 'ORCID', icon: 'tabler:hexagon', href: 'https://orcid.org/0009-0009-3709-5051' },
    { ariaLabel: 'Github', icon: 'tabler:brand-github', href: 'https://github.com/aneggi' },
    { ariaLabel: 'RSS', icon: 'tabler:rss', href: getAsset('/rss.xml') },
  ],
  footNote: `
    Built with AstroWind, tailored for Alessandro Aneggi · Content © Alessandro Aneggi.
  `,
};
