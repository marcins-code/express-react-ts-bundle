interface IObjectKeys {
 pl: { [key: string]: string | number;};
  en: { [key: string]: string | number;}
}

export const settingsPanelItems:IObjectKeys = {
  pl: {
    chooseLanguage: 'Wybierz język',
    chooseTheme: 'Wybierz motyw strony',
    chooseLayout: 'Wybierz układ menu',
    chooseSidebarTheme: 'Wybierz motyw menu bocznego',
    rememberSettingsPH: 'Zapamiętaj ustawienia',
  },
  en: {
    chooseLanguage: 'Choose language',
    chooseTheme: 'Choose theme',
    chooseLayout: 'Choose page layout',
    chooseSidebarTheme: 'Choose sidebar theme',
    rememberSettingsPH: 'Remember settings',
  },
};
