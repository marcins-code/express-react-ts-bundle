import { rgba } from 'polished';
import { commonColors } from './commonCollors';
import { backgroundImages } from './backgroundImages';

const commonSchemes = {
  globalBackgroundImage: backgroundImages.ironGrip,
  globalBackgroundColor: rgba(commonColors.black, 0.95),
  ironGrip: backgroundImages.ironGrip,
};

export const commonColorsAndSchemes = { ...commonSchemes, ...commonColors };
