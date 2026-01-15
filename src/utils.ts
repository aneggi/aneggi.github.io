export const slugify = (input: string) => {
	if (!input) return '';

	// make lower case and trim
	var slug = input.toLowerCase().trim();

	// remove accents from charaters
	slug = slug.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

	// replace invalid chars with spaces
	slug = slug.replace(/[^a-z0-9\s-]/g, ' ').trim();

	// replace multiple spaces or hyphens with a single hyphen
	slug = slug.replace(/[\s-]+/g, '-');

	return slug;
};

export const unslugify = (slug: string) =>
	slug.replace(/\-/g, ' ').replace(/\w\S*/g, (text) => text.charAt(0).toUpperCase() + text.slice(1).toLowerCase());

export const kFormatter = (num: number) => {
	return Math.abs(num) > 999 ? (Math.sign(num) * (Math.abs(num) / 1000)).toFixed(1) + 'k' : Math.sign(num) * Math.abs(num);
};

/**
 * Assigns a stable color class to a tag based on its string.
 */
export const tagColorClass = (tag: string) => {
  const palette = [
    'bg-sky-100 text-sky-800 border-sky-200 dark:bg-sky-900/50 dark:text-sky-100 dark:border-sky-700',
    'bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/50 dark:text-emerald-100 dark:border-emerald-700',
    'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/50 dark:text-amber-100 dark:border-amber-700',
    'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/50 dark:text-purple-100 dark:border-purple-700',
    'bg-rose-100 text-rose-800 border-rose-200 dark:bg-rose-900/50 dark:text-rose-100 dark:border-rose-700',
  ];
  const hash = tag.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return palette[hash % palette.length];
};
