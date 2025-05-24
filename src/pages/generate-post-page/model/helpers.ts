import { StyleType } from 'shared';
import { MIN_PROMPT_LENGTH } from './constants';

import abstractImage from 'assets/abstractImage.png';
import animeImage from 'assets/animeImage.jpg';
import defaultImage from 'assets/defaultImage.png';
import detailedImage from 'assets/detailedImage.png';

export const getImageByStyleId = (style: StyleType) => {
  if (style === 'KANDINSKY') return abstractImage;
  if (style === 'ANIME') return animeImage;
  if (style === 'DEFAULT') return defaultImage;
  if (style === 'UHD') return detailedImage;

  return defaultImage;
};

export const checkIsValidPrompt = (prompt: string | null): boolean => !!prompt && prompt.length >= MIN_PROMPT_LENGTH;
