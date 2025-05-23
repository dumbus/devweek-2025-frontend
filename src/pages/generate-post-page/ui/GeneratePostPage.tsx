import { useState } from 'react';
import classNames from 'classnames';

import { Button } from '@consta/uikit/Button';
import { Layout } from '@consta/uikit/Layout';
import { Text } from '@consta/uikit/Text';
import { TextField } from '@consta/uikit/TextField';
import { Select } from '@consta/uikit/Select';
import { SkeletonBrick, SkeletonText } from '@consta/uikit/Skeleton';

import { IconDownload } from '@consta/icons/IconDownload';
import { IconPicture } from '@consta/icons/IconPicture';
import { IconRevert } from '@consta/icons/IconRevert';

import { OpenRouterTextService } from 'services/OpenRouterService';
import { FusionBrainService } from 'services/FusionBrainService';

import { IMAGE_STYLES, MIN_PROMPT_LENGTH } from '../model/constants';
import { getImageByStyleId } from '../model/helpers';
import { StyleItem } from '../model/types';

import styles from './GeneratePostPage.module.scss';

// TODO: Разнести код по компонентам
export const GeneratePostPage = () => {
  const [imageStyle, setImageStyle] = useState<StyleItem | null>(IMAGE_STYLES[0]);
  const [imageNegativePrompt, seImagetNegativePrompt] = useState<string | null>(null);
  const [imagePrompt, setImagePrompt] = useState<string | null>(null);
  const [textPrompt, setTextPrompt] = useState<string | null>(null);

  const [isImagePromptAlert, setIsImagePromptAlert] = useState(false);
  const [isTextPromptAlert, setIsTextPromptAlert] = useState(false);

  const [isImageLoading, setIsImageLoading] = useState(false);
  const [isTextLoading, setIsTextLoading] = useState(false);

  const [generatedImageUrl, setGeneratedImageUrl] = useState('');
  const [generatedText, setGeneratedText] = useState('');

  const handleImageStyleChange = (value: StyleItem | null) => {
    setImageStyle(value);
  };

  const handleImageNegativePromptChange = (value: string | null) => {
    seImagetNegativePrompt(value);
  };

  const handleImagePromptChange = (value: string | null) => {
    setImagePrompt(value);
  };

  const handleTextPromptChange = (value: string | null) => {
    setTextPrompt(value);
  };

  const handleTextGeneration = async () => {
    if (textPrompt && textPrompt.length >= MIN_PROMPT_LENGTH) {
      setGeneratedText('');
      setIsTextLoading(true);
      setIsTextPromptAlert(false);

      try {
        const openRouterTextService = new OpenRouterTextService(
          import.meta.env.VITE_OPENROUTER_AUTH_KEY,
          window.location.href,
          'devweeks-2025'
        );

        const result = await openRouterTextService.generateTextFromPrompt(textPrompt);

        setGeneratedText(result);
      } catch (err) {
        // TODO: Error Handling
        console.error('OpenRouter Error:', err);
      } finally {
        setIsTextLoading(false);
      }
    } else {
      setIsTextPromptAlert(true);
    }
  };

  const handleImageGeneration = async () => {
    if (imagePrompt && imagePrompt.length >= MIN_PROMPT_LENGTH) {
      setGeneratedImageUrl('');
      setIsImageLoading(true);
      setIsImagePromptAlert(false);

      try {
        const fusionBrainService = new FusionBrainService(
          import.meta.env.VITE_FUSIONBRAIN_API_KEY,
          import.meta.env.VITE_FUSIONBRAIN_SECRET_KEY
        );

        const { imageBase64 } = await fusionBrainService.generateImageByPrompt(
          imagePrompt,
          imageNegativePrompt,
          imageStyle?.id
        );
        const imageUrl = `data:image/png;base64,${imageBase64}`;

        setGeneratedImageUrl(imageUrl);
      } catch (err) {
        // TODO: Error Handling
        console.error('FusionBrain Error:', err);
      } finally {
        setIsImageLoading(false);
      }
    } else {
      setIsImagePromptAlert(true);
    }
  };

  const handleDownload = (base64Image: string) => {
    const link = document.createElement('a');

    link.href = base64Image;
    link.download = 'generated.png';
    link.click();
  };

  const isContentGenerated = generatedText && generatedImageUrl;

  const showGenerationBlock = isTextLoading || isImageLoading || generatedText || generatedImageUrl;

  console.log(isTextLoading);

  return (
    <Layout className="container">
      <Layout direction="column" className={styles.wrapper}>
        <Text view="brand" size="2xl" weight="bold" lineHeight="xs">
          Генерация поста с помощью ИИ
        </Text>

        <Layout direction="column" className={styles.settings}>
          <Layout className={styles.imageSettings}>
            <Layout direction="column" className={styles.imageSettings__inputs}>
              <Select
                label="Стиль изображения"
                items={IMAGE_STYLES}
                value={imageStyle}
                onChange={handleImageStyleChange}
              />

              <TextField
                label="Негативный промпт"
                placeholder="Чего нужно избегать при генерации"
                caption="Пример: яркие цвета, кислотность"
                maxLength={50}
                value={imageNegativePrompt}
                onChange={handleImageNegativePromptChange}
              />
            </Layout>

            <Layout direction="column" className={styles.imageSettings__preview}>
              <Text view="secondary" size="m" lineHeight="xs">
                Пример изображения
              </Text>

              {imageStyle && <img src={getImageByStyleId(imageStyle.id)} alt="Пример для демонстрации стиля" />}
            </Layout>
          </Layout>

          <Layout className={styles.textFieldSettings}>
            <TextField
              label="Промпт для изображения"
              placeholder="Подробное описание изображения"
              type="textarea"
              cols={500}
              rows={10}
              value={imagePrompt}
              onChange={handleImagePromptChange}
              status={isImagePromptAlert ? 'alert' : undefined}
              caption={isImagePromptAlert ? `Промпт должен содержать не менее ${MIN_PROMPT_LENGTH} символов` : ''}
            />

            <TextField
              label="Промпт для текста"
              placeholder="Подробное описание текста"
              type="textarea"
              cols={500}
              rows={10}
              value={textPrompt}
              onChange={handleTextPromptChange}
              status={isTextPromptAlert ? 'alert' : undefined}
              caption={isTextPromptAlert ? `Промпт должен содержать не менее ${MIN_PROMPT_LENGTH} символов` : ''}
            />
          </Layout>
        </Layout>

        {!showGenerationBlock && (
          <Button
            className={classNames(styles.button, styles.button_centered)}
            label="Сгенерировать пост"
            iconLeft={IconPicture}
            onClick={() => {
              handleTextGeneration();
              handleImageGeneration();
            }}
          />
        )}

        {showGenerationBlock && (
          <>
            <Text view="brand" size="xl" weight="bold" lineHeight="xs">
              Результаты генерации
            </Text>

            <Layout className={styles.generation}>
              {generatedImageUrl && (
                <img
                  className={styles.generation__image}
                  src={generatedImageUrl}
                  alt="Сгенерированная иллюстрация для поста"
                />
              )}
              {isImageLoading && !generatedImageUrl && (
                <SkeletonBrick className={styles.generation__image} height={500} width={500} />
              )}

              <Layout direction="column" className={styles.generation__side}>
                {generatedText && <Text size="l">{generatedText}</Text>}
                {isTextLoading && !generatedText && <SkeletonText rows={5} fontSize="xl" lineHeight="xs" />}

                {isContentGenerated && (
                  <>
                    <Button
                      className={classNames(styles.button, styles.button_wide)}
                      label="Перегенерировать пост"
                      iconLeft={IconRevert}
                      onClick={() => {
                        handleTextGeneration();
                        handleImageGeneration();
                      }}
                    />

                    <Button
                      className={classNames(styles.button, styles.button_wide)}
                      label="Скачать картинку"
                      iconLeft={IconDownload}
                      onClick={() => {
                        handleDownload(generatedImageUrl);
                      }}
                    />
                  </>
                )}
              </Layout>
            </Layout>
          </>
        )}
      </Layout>
    </Layout>
  );
};
