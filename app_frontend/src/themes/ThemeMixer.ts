import { chocolateTheme, darkTheme, lightTheme } from './appThemes';
import { commonColors } from './commonCollors';

export const ThemeMixer = (appTheme:any, initSettings:any) => {
  let theme;
  switch (appTheme) {
    case 'dark': {
      theme = { ...commonColors, ...darkTheme };
      break;
    }

    case 'light': {
      theme = { ...commonColors, ...lightTheme };
      break;
    }

    case 'chocolate': {
      theme = { ...commonColors, ...chocolateTheme };
      break;
    }

    default:
      theme = { ...commonColors, ...initSettings.appTheme };
  }

  return theme;
};
