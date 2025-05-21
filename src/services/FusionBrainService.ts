import { getPromptFromArticle } from 'shared';

import { IFusionBrainGenerationResult } from 'shared';

// TODO: Обработать случаи, когда сервис недоступен (возвращает pipeline_status вместо uuid)
export class FusionBrainService {
  private static readonly BASE_URL = 'https://api-key.fusionbrain.ai/key/api/v1/';

  private apiKey: string;
  private secretKey: string;
  private pipelineId: string | null = null;

  constructor(apiKey: string, secretKey: string) {
    this.apiKey = apiKey;
    this.secretKey = secretKey;
  }

  public async generateImageByDescription(article: string): Promise<IFusionBrainGenerationResult> {
    if (!this.pipelineId) {
      this.pipelineId = await this.getPipelineId();
    }

    const prompt = getPromptFromArticle('image', article);

    const formData = new FormData();
    formData.append('params', new Blob([JSON.stringify({
        type: 'GENERATE',
        width: 1024,
        height: 1024,
        numImages: 1,
        generateParams: { query: prompt }
      })], { type: 'application/json' }));
    formData.append('pipeline_id', this.pipelineId);

    const response = await fetch(`${FusionBrainService.BASE_URL}pipeline/run`, {
      method: 'POST',
      headers: {
        'X-Key': `Key ${this.apiKey}`,
        'X-Secret': `Secret ${this.secretKey}`,
      },
      body: formData
    });

    if (!response.ok) {
      throw new Error(`FusionBrain Image Generation request failed: ${response.status}`);
    }

    const { uuid } = await response.json();

    return this.waitForImage(uuid);
  }

  private async getPipelineId(): Promise<string> {
    const response = await fetch(`${FusionBrainService.BASE_URL}pipelines`, {
      headers: {
        'X-Key': `Key ${this.apiKey}`,
        'X-Secret': `Secret ${this.secretKey}`,
      }
    });

    return (await response.json())[0].id;
  }

  private async waitForImage(uuid: string, timeout: number | undefined = 30): Promise<IFusionBrainGenerationResult> {
    for (let i = 0; i < timeout; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000));

      const status = await fetch(`${FusionBrainService.BASE_URL}pipeline/status/${uuid}`, {
        headers: {
          'X-Key': `Key ${this.apiKey}`,
          'X-Secret': `Secret ${this.secretKey}`,
        }
      });

      const data = await status.json();

      if (data.status === 'DONE') {
        return {
          imageBase64: data.result.files[0],
          censored: data.result.censored
        };
      }
      if (data.status === 'FAIL') {
        throw new Error(data.errorDescription || 'FusionBrain Image Generation failed');
      }
    }

    throw new Error('FusionBrain Image Generation timeout');
  }
}