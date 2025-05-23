import { BASE_PROMPTS, MAX_PROMPT_LENGTH, IMAGE_STYLES } from 'shared';
import { PromptType, StyleType } from 'shared';

export const getPromptFromArticle = (promptType: PromptType, title: string, article: string) => {
  let prompt = '';

  if (promptType === 'image') {
    prompt = `${BASE_PROMPTS[promptType]} Название статьи: ${title}. Статья: ${article}`;
  }

  if (promptType === 'text') {
    prompt = `${BASE_PROMPTS[promptType]} Название статьи: ${title}. Статья: ${article}`;
  }

  return prompt.length > MAX_PROMPT_LENGTH[promptType]
    ? prompt.substring(0, MAX_PROMPT_LENGTH[promptType] - 3) + '...'
    : prompt;
};

export const getSafePrompt = (promptType: PromptType, userPrompt: string, additionalStyle?: StyleType) => {
  let prompt = userPrompt;

  if (promptType === 'text' && userPrompt.length >= 100) {
    prompt += 'Не используй языки разметки вроде Markdown, выводи только обычный текст, допустимы смайлики (эмодзи).';
  }

  if (promptType === 'image' && additionalStyle) {
    const style = IMAGE_STYLES.find((item) => item.id === additionalStyle)?.label || 'Стандартный стиль';

    prompt = `Для генерации картинки используй ${style}.` + prompt;
  }

  return prompt.length > MAX_PROMPT_LENGTH[promptType]
    ? prompt.substring(0, MAX_PROMPT_LENGTH[promptType] - 3) + '...'
    : prompt;
};
