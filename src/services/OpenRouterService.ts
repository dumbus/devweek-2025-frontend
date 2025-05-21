import { IOpenRouterModel, IOpenRouterRequest, IOpenRouterResponse } from 'shared';

import { getTextPromptFromArticle } from 'shared';

export class OpenRouterTextService {
  private static readonly BASE_URL = 'https://openrouter.ai/api/v1/chat/completions';
  private static readonly MODELS: IOpenRouterModel[] = [
    'google/gemma-3n-e4b-it:free',
    'deepseek/deepseek-prover-v2:free',
    'meta-llama/llama-3.3-8b-instruct:free',
  ];

  private apiKey: string;
  private siteUrl: string;
  private siteName: string;

  constructor(apiKey: string, siteUrl: string, siteName: string) {
    this.apiKey = apiKey;
    this.siteUrl = siteUrl;
    this.siteName = siteName;
  }

  public async getPostTextFromArticle(article: string): Promise<string> {
    const response = await this.getResponse(article);

    return this.extractMessageContent(response);
  }

  private async getResponse(article: string): Promise<IOpenRouterResponse> {
    const prompt = getTextPromptFromArticle(article);

    for (const model of OpenRouterTextService.MODELS) {
      try {
        const response = await this.tryGetResponseWithModel(prompt, model);
        return response;
      } catch (error) {
        console.warn(`Failed with model ${model}:`, error);
      }
    }

    throw new Error('All models failed');
  }

  private async tryGetResponseWithModel(prompt: string, model: IOpenRouterModel): Promise<IOpenRouterResponse> {
    const headers: Record<string, string> = {
      'Authorization': `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json',
    };

    if (this.siteUrl) {
      headers['HTTP-Referer'] = this.siteUrl;
    }

    if (this.siteName) {
      headers['X-Title'] = this.siteName;
    }

    const requestBody: IOpenRouterRequest = {
      model,
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ]
    };

    const response = await fetch(OpenRouterTextService.BASE_URL, {
      method: 'POST',
      headers,
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.error?.message || `Request failed with status ${response.status}`);
    }

    return response.json();
  }

  private extractMessageContent(response: IOpenRouterResponse): string {
    if (!response.choices || response.choices.length === 0) {
      throw new Error('No choices in response');
    }
    
    const firstChoice = response.choices[0];
    if (!firstChoice.message || !firstChoice.message.content) {
      throw new Error('No message content in response');
    }
    
    return firstChoice.message.content;
  }
}
