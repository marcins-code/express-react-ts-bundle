import React from 'react';
import { ThemeProvider } from 'styled-components';
import { ThemeMixer } from '../themes/ThemeMixer';
import { PageContext } from '../context';
import GlobalStyle from '../themes/GlobalStyle';
import { useAppSettings } from '../hooks/useAppSettings';

type Props = {
    children: React.ReactNode;
};
const GlobalTemplate: React.FC<Props> = ({ children }) => {
  const pageInitSettings = {
    appTheme: 'dark',
  };

  const { appTheme, appThemeHandler } = useAppSettings(pageInitSettings);
  const theme = ThemeMixer(appTheme, pageInitSettings);
  console.log(theme);
  return (
    <PageContext.Provider
      value={{ appTheme, appThemeHandler }}
    >
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <>{children}</>
      </ThemeProvider>
    </PageContext.Provider>
  );
};

export default GlobalTemplate;
