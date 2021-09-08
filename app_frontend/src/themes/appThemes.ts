import { complement, darken } from 'polished';
import { commonColors } from './commonCollors';
import { backgroundImages } from './backgroundImages';

export const darkTheme = {
  themeName: 'dark',
  appBackgroundImage: backgroundImages.blackOrchid,
  appBackgroundColor: commonColors.dark,
  appBoxShadowColor: 'rgba(0,0,0,.9)',
  menuBackgroundImage: backgroundImages.debutLight,
  menuTextShadow:
        '0px 0px 0 rgb(135, 135, 135), 1px 1px 0 rgb(24, 24, 24), 1px 1px 0 rgb(-86, -86, -86)',
  color: commonColors.grey200,
  primary: commonColors.blue,
  secondary: complement(commonColors.blue),
  success: commonColors.green,
  info: commonColors.cyan,
  danger: commonColors.red,
  warning: commonColors.yellow,
};

export const lightTheme = {
  themeName: 'light',
  appBackgroundImage: backgroundImages.textile,
  appBackgroundColor: commonColors.light,
  appBoxShadowColor: 'rgba(20,20,20,.9)',
  menuBackgroundImage: backgroundImages.blackPaper,
  menuTextShadow:
        '0px 0px 0 rgb(235, 235, 235), 1px 1px 0 rgb(174,174, 174), 1px 1px 0 rgb(-86, -86, -86)',
  color: commonColors.grey800,
  primary: commonColors.cyan,
  secondary: complement(commonColors.cyan),
  success: commonColors.green,
  info: commonColors.cyan,
  danger: commonColors.red,
  warning: commonColors.yellow,
};

export const chocolateTheme = {
  themeName: 'chocolate',
  appBackgroundImage: backgroundImages.blackOrchid,
  appBackgroundColor: commonColors.chocolate,
  appBoxShadowColor: 'rgba(0,0,0,.9)',
  menuBackgroundImage: backgroundImages.debutLight,
  menuTextShadow:
        '0px 0px 0 rgb(135, 135, 135), 1px 1px 0 rgb(24, 24, 24), 1px 1px 0 rgb(-86, -86, -86)',
  color: commonColors.grey200,
  primary: commonColors.teal,
  secondary: darken(0.3, complement(commonColors.teal)),
  success: commonColors.green,
  info: commonColors.cyan,
  danger: commonColors.red,
  warning: commonColors.yellow,
};
