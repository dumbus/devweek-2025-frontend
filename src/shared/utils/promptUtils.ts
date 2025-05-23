import { BASE_PROMPTS, MAX_PROMPT_LENGTH } from 'shared';
import { PromptType } from 'shared';

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

export const getSafePrompt = (promptType: PromptType, userPrompt: string) => {
  let prompt = userPrompt;

  if (promptType === 'text' && userPrompt.length >= 100) {
    prompt += 'Не используй языки разметки вроде Markdown, выводи только обычный текст, допустимы смайлики (эмодзи).';
  }

  return prompt.length > MAX_PROMPT_LENGTH[promptType]
    ? prompt.substring(0, MAX_PROMPT_LENGTH[promptType] - 3) + '...'
    : prompt;
};
