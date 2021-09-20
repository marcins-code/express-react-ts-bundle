import React from 'react';

interface PageContextTypes {
  appTheme: string;
  appThemeHandler(event: React.MouseEvent<HTMLButtonElement>): void | undefined;
  appLanguage: 'pl' | 'en';
  langSwitcherHandler(event: React.ChangeEvent<HTMLInputElement>): void | undefined;
  navPosition: string;
  navPositionHandler(event: React.ChangeEvent<HTMLInputElement>): void | undefined;
  rememberSettings: boolean;
  isMobile: boolean;
  rememberSettingsHandler(event: React.ChangeEvent<HTMLInputElement>): void | undefined;
  isAdminPage: boolean,
}

export const PageContext = React.createContext<PageContextTypes>({
  appTheme: 'dark',
  appThemeHandler: () => {},
  appLanguage: 'pl',
  langSwitcherHandler: () => {},
  navPosition: 'menu-top',
  navPositionHandler: () => {},
  isMobile: false,
  rememberSettings: false,
  rememberSettingsHandler: () => {},
  isAdminPage: false,
});
