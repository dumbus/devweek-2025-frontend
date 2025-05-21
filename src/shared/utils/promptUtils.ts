import { BASE_PROMPTS, MAX_PROMPT_LENGTH } from 'shared';
import { IPromptType } from 'shared';

export const getPromptFromArticle = ( promptType: IPromptType, article: string) => {
  const prompt = `${BASE_PROMPTS[promptType]} Статья: ${article}`;

  return prompt.length > MAX_PROMPT_LENGTH ? prompt.substring(0, MAX_PROMPT_LENGTH - 3) + '...' : prompt;
};
