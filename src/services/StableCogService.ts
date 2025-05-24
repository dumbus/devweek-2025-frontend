import { getSafePrompt } from 'shared';
import { StyleType } from 'shared';

export interface IStableCogGenerationResult {
  imageBase64: string;
  remainingCredits?: number; //Оставшееся количество генераций (кредитов)
}

export class StableCogService {
  private static readonly BASE_URL = 'https://api.stablecog.com/v1/image/generation/create';

  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  public async generateImageByPrompt(
    userPrompt: string,
    userNegativePrompt: string | null = '',
    styleType: StyleType = 'DEFAULT'
  ): Promise<IStableCogGenerationResult> {
    const prompt = getSafePrompt('image', userPrompt, styleType);

    const requestBody = {
      prompt,
      negative_prompt: userNegativePrompt,
      width: 1024,
      height: 1024,
      num_outputs: 1
    };

    const response = await fetch(StableCogService.BASE_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      throw new Error(`StableCog Image Generation request failed: ${response.status}`);
    }

    const data = await response.json();
    const imageUrl = data.outputs[0].image_url;

    const imageResponse = await fetch(imageUrl);
    const imageBlob = await imageResponse.blob();

    const base64 = await this.convertBlobToBase64(imageBlob);

    return {
      imageBase64: base64,
      remainingCredits: data.remaining_credits ?? undefined
    };
  }

  //Метод преобразования ибо делал компоненту по примеру но в FusionBrain сразу приходит base64 а тут нет
  //Хз, в доках не нашёл как получить сразу base64, и дипсись ответил мне также
  // поэтому сначала делаем fetch по imageUrl, чтобы получить Blob,
  // а потом конвертируем Blob в base64 через FileReader.
  // Я люблю капусту
  private async convertBlobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }
}
