import { getSafePrompt } from 'shared';
import { StyleType } from 'shared';
import { IFusionBrainGenerationResult } from 'shared';

export class FusionBrainService {
  private static readonly BASE_URL = 'https://api-key.fusionbrain.ai/key/api/v1/';

  private apiKey: string;
  private secretKey: string;
  private pipelineId: string | null = null;

  constructor(apiKey: string, secretKey: string) {
    this.apiKey = apiKey;
    this.secretKey = secretKey;
  }

  public async generateImageByPrompt(
    userPrompt: string,
    userNegativePrompt: string | null,
    userStyle?: StyleType
  ): Promise<IFusionBrainGenerationResult> {
    if (!this.pipelineId) {
      this.pipelineId = await this.getPipelineId();
    }

    const isAvailable = await this.checkServiceAvailability();
    if (!isAvailable) {
      throw new Error('FusionBrain Image Generation service is currently unavailable');
    }

    const prompt = getSafePrompt('image', userPrompt);

    const formData = new FormData();
    formData.append(
      'params',
      new Blob(
        [
          JSON.stringify({
            type: 'GENERATE',
            style: userStyle || 'DEFAULT',
            width: 1024,
            height: 1024,
            numImages: 1,
            negativePromptDecoder: userNegativePrompt || '',
            generateParams: { query: prompt }
          })
        ],
        { type: 'application/json' }
      )
    );
    formData.append('pipeline_id', this.pipelineId);

    const response = await fetch(`${FusionBrainService.BASE_URL}pipeline/run`, {
      method: 'POST',
      headers: {
        'X-Key': `Key ${this.apiKey}`,
        'X-Secret': `Secret ${this.secretKey}`
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
        'X-Secret': `Secret ${this.secretKey}`
      }
    });

    return (await response.json())[0].id;
  }

  private async waitForImage(uuid: string, timeout: number | undefined = 30): Promise<IFusionBrainGenerationResult> {
    for (let i = 0; i < timeout; i++) {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const status = await fetch(`${FusionBrainService.BASE_URL}pipeline/status/${uuid}`, {
        headers: {
          'X-Key': `Key ${this.apiKey}`,
          'X-Secret': `Secret ${this.secretKey}`
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

  private async checkServiceAvailability(): Promise<boolean> {
    if (!this.pipelineId) {
      this.pipelineId = await this.getPipelineId();
    }

    try {
      const response = await fetch(`${FusionBrainService.BASE_URL}pipeline/${this.pipelineId}/availability`, {
        headers: {
          'X-Key': `Key ${this.apiKey}`,
          'X-Secret': `Secret ${this.secretKey}`
        }
      });

      const data = await response.json();
      return data.pipeline_status !== 'DISABLED_BY_QUEUE';
    } catch (error) {
      console.error('Failed to check FusionBrain Image Generation service availability:', error);
      return false;
    }
  }
}
