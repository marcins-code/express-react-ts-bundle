import React from 'react';
import { ThemeProvider } from 'styled-components';
import { ThemeMixer } from '../themes/ThemeMixer';
import { PageContext } from '../context';
import GlobalStyle from '../themes/GlobalStyle';
import { useAppSettings } from '../hooks/useAppSettings';
import SettingsPanel from '../components/organisms/SettingsPanel/SettingsPanel';

type Props = {
    children: React.ReactNode;
};

const GlobalTemplate: React.FC<Props> = ({ children }) => {
  const pageInitSettings = {
    appTheme: 'dark',
    appLanguage: 'pl',
    navPosition: 'menu-top',
    isAdminPage: false,
  };

  const {
    appTheme,
    appThemeHandler,
    appLanguage,
    langSwitcherHandler,
    navPosition,
    navPositionHandler,
    isMobile,
    rememberSettings,
    rememberSettingsHandler,
    isAdminPage,
  } = useAppSettings(pageInitSettings);

  const theme = ThemeMixer(appTheme, pageInitSettings);
  return (
    <PageContext.Provider
      value={{
        appTheme,
        appThemeHandler,
        appLanguage,
        langSwitcherHandler,
        navPosition,
        navPositionHandler,
        isMobile,
        rememberSettings,
        rememberSettingsHandler,
        isAdminPage,
      }}
    >

      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <SettingsPanel />
        <>{children}</>
      </ThemeProvider>
    </PageContext.Provider>
  );
};

export default GlobalTemplate;
