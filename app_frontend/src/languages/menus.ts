export const mainMenuItems = [
  {
    name_en: 'homepage',
    name_pl: 'homepage',
    path: '/',
    exact: true,
  },
  { name_en: 'categories', name_pl: 'kategorie', path: '/categories' },
  { name_en: 'series', name_pl: 'serie', path: '/series' },
  { name_en: 'glossary', name_pl: 'słowniczek', path: '/glossary' },
  { name_en: 'contact', name_pl: 'kontakt', path: '/contact' },
];

export const adminMenuItems = [
  {
    name_en: 'articles',
    name_pl: 'artykuły',
    path: '/administration',
    exact: true,
  },
  { name_en: 'Types', name_pl: 'Typy', path: '/administration/article-types' },
  { name_en: 'Glossary', name_pl: 'Słowniczek', path: '/administration/glossary' },
];
