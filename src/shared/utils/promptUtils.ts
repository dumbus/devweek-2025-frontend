import { BASE_PROMPTS, MAX_PROMPT_LENGTH } from 'shared';
import { PromptType } from 'shared';

export const getPromptFromArticle = (promptType: PromptType, article: string) => {
  const prompt = `${BASE_PROMPTS[promptType]} Статья: ${article}`;

  return prompt.length > MAX_PROMPT_LENGTH ? prompt.substring(0, MAX_PROMPT_LENGTH - 3) + '...' : prompt;
};

export const getSafePrompt = (promptType: PromptType, userPrompt: string) => {
  let prompt = userPrompt;

  if (promptType === 'text' && userPrompt.length >= 100) {
    prompt += 'Не используй языки разметки вроде Markdown, выводи только обычный текст, допустимы смайлики (эмодзи).';
  }

  return prompt.length > MAX_PROMPT_LENGTH ? prompt.substring(0, MAX_PROMPT_LENGTH - 3) + '...' : prompt;
};
