export interface Project {
  name: string;
  demoLink: string;
  tags?: string[];
  description?: string;
  postLink?: string;
  demoLinkRel?: string;
  [key: string]: any;
}

export const projects: Project[] = [
  {
    name: 'CI energy feedback hook',
    description: 'Prototype hook that captures per-build power deltas from energy-aware runners and posts signals to chat.',
    demoLink: 'https://aneggi.github.io/projects/ci-energy-feedback',
    tags: ['DevOps', 'Energy'],
  },
  {
    name: 'Telemetry sandbox',
    description: 'Sandbox to explore combining latency, reliability, and energy metrics for real-time services.',
    demoLink: 'https://aneggi.github.io/projects/telemetry-sandbox',
    tags: ['Real-time', 'Research'],
  },
];
