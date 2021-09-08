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
    path: '/admin/article',
    exact: true,
  },
  { name_en: 'Types', name_pl: 'Typy', path: '/admin/article-types' },
  { name_en: 'Glossary', name_pl: 'Słowniczek', path: '/admin/glossary' },
];

export const settingsPanelItems = {
  pl: {
    chooseLang: 'Wybierz język',
    chooseTheme: 'Wybierz motyw strony',
    chooseLayout: 'Wybierz układ menu',
    chooseSidebarTheme: 'Wybierz motyw menu bocznego',
    rememberSettings: 'Zapamiętaj ustawienia',
  },
  en: {
    chooseLang: 'Choose language',
    chooseTheme: 'Choose theme',
    chooseLayout: 'Choose page layout',
    chooseSidebarTheme: 'Choose sidebar theme',
    rememberSettings: 'Remember settings',
  },
};
