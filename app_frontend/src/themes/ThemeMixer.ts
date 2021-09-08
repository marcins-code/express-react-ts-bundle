import { chocolateTheme, darkTheme, lightTheme } from './appThemes';
import { commonColorsAndSchemes } from './collorSchemes';

export const ThemeMixer = (appTheme:any, initSettings:any) => {
  let theme;
  switch (appTheme) {
    case 'dark': {
      theme = { ...commonColorsAndSchemes, ...darkTheme };
      break;
    }

    case 'light': {
      theme = { ...commonColorsAndSchemes, ...lightTheme };
      break;
    }

    case 'chocolate': {
      theme = { ...commonColorsAndSchemes, ...chocolateTheme };
      break;
    }

    default:
      theme = { ...commonColorsAndSchemes, ...initSettings.appTheme };
  }

  // console.log(theme);

  return theme;
};
