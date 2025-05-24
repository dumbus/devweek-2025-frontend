import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
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
import { StableCogService } from 'services/StableCogService';

import { CustomError } from 'features';
import { getPromptFromArticle } from 'shared';
import { ErrorType, IStyleItem } from 'shared';
import { IMAGE_STYLES } from 'shared';

import { MIN_PROMPT_LENGTH } from '../model/constants';
import { getImageByStyleId, checkIsValidPrompt } from '../model/helpers';

import styles from './GeneratePostPage.module.scss';

// TODO: Разнести код по компонентам (backlog)
export const GeneratePostPage = () => {
  const location = useLocation();

  const [imageStyle, setImageStyle] = useState<IStyleItem | null>(IMAGE_STYLES[0]);
  const [imageNegativePrompt, seImagetNegativePrompt] = useState<string | null>(null);
  const [imagePrompt, setImagePrompt] = useState<string | null>(null);
  const [textPrompt, setTextPrompt] = useState<string | null>(null);

  const [isImagePromptAlert, setIsImagePromptAlert] = useState(false);
  const [isTextPromptAlert, setIsTextPromptAlert] = useState(false);

  const [isImageLoading, setIsImageLoading] = useState(false);
  const [isTextLoading, setIsTextLoading] = useState(false);

  const [generatedImageUrl, setGeneratedImageUrl] = useState('');
  const [generatedText, setGeneratedText] = useState('');

  const [error, setError] = useState<ErrorType | null>(null);

  useEffect(() => {
    const title = location.state?.title;
    const article = location.state?.article;

    if (title && article) {
      const customImagePrompt = getPromptFromArticle('image', title, article);
      const customTextPrompt = getPromptFromArticle('text', title, article);

      setImagePrompt(customImagePrompt);
      setTextPrompt(customTextPrompt);
    }
  }, [location.state]);

  // Functions to change state

  const handleImageStyleChange = (value: IStyleItem | null) => {
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
        const result = await generateTextWithFallback(textPrompt);
        setGeneratedText(result);
      } catch {
        setError('generation-error');
      } finally {
        setIsTextLoading(false);
      }
    } else {
      setIsTextPromptAlert(true);
    }
  };

  const handleImageGeneration = async () => {
    if (!checkIsValidPrompt(imagePrompt)) {
      setIsImagePromptAlert(true);
      return;
    }

    resetGenerationState();

    try {
      await generateImageWithFallback();
    } catch {
      setError('generation-error');
    } finally {
      setIsImageLoading(false);
    }
  };

  const resetGenerationState = () => {
    setGeneratedImageUrl('');
    setIsImageLoading(true);
    setIsImagePromptAlert(false);
  };

  // Functions to generate images with different Services

  const generateWithFusionBrain = async () => {
    const fusionBrainService = new FusionBrainService(
      import.meta.env.VITE_FUSIONBRAIN_API_KEY,
      import.meta.env.VITE_FUSIONBRAIN_SECRET_KEY
    );

    const { imageBase64 } = await fusionBrainService.generateImageByPrompt(
      imagePrompt!,
      imageNegativePrompt,
      imageStyle?.id
    );

    setGeneratedImageUrl(`data:image/png;base64,${imageBase64}`);
  };

  const generateWithStableCog = async () => {
    const stableCogService = new StableCogService(import.meta.env.VITE_STABLECOG_SECRET_KEY);

    const { imageBase64 } = await stableCogService.generateImageByPrompt(
      imagePrompt!,
      imageNegativePrompt,
      imageStyle?.id
    );

    setGeneratedImageUrl(imageBase64);
  };

  // Functions to generate text with different API keys

  const generateTextWithMainKey = async (prompt: string) => {
    const openRouterTextService = new OpenRouterTextService(
      import.meta.env.VITE_OPENROUTER_AUTH_KEY_MAIN,
      window.location.href,
      'devweek-2025-new'
    );

    return await openRouterTextService.generateTextFromPrompt(prompt);
  };

  const generateTextWithFallbackKey = async (prompt: string) => {
    const openRouterTextService = new OpenRouterTextService(
      import.meta.env.VITE_OPENROUTER_AUTH_KEY_FALLBACK,
      window.location.href,
      'devweek-2025'
    );

    return await openRouterTextService.generateTextFromPrompt(prompt);
  };

  // Functions to call content generation functions with Fallback

  const generateImageWithFallback = async () => {
    try {
      await generateWithFusionBrain();
    } catch {
      await generateWithStableCog();
    }
  };

  const generateTextWithFallback = async (prompt: string) => {
    try {
      return await generateTextWithMainKey(prompt);
    } catch (error) {
      console.error('Error with main key:', error);

      try {
        return await generateTextWithFallbackKey(prompt);
      } catch (error) {
        console.error('Error with fallback key:', error);
        throw new Error('Both keys failed');
      }
    }
  };

  // Function to download image
  const handleDownload = (base64Image: string) => {
    const link = document.createElement('a');

    link.href = base64Image;
    link.download = 'generated.png';
    link.click();
  };

  const isContentGenerated = generatedText && generatedImageUrl;

  const showGenerationBlock = isTextLoading || isImageLoading || generatedText || generatedImageUrl || error;
  const showGenerationContent = showGenerationBlock && !error;

  const regenerateButton = (
    <Button
      className={classNames(styles.button, styles.button_wide)}
      label="Перегенерировать пост"
      iconLeft={IconRevert}
      onClick={() => {
        handleTextGeneration();
        handleImageGeneration();
      }}
    />
  );

  return (
    <Layout className={classNames('container', 'containerBlock', styles.topWrapper)}>
      <Layout direction="column" className={styles.wrapper}>
        <Text view="brand" size="2xl" weight="bold" lineHeight="xs" className={styles.title}>
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
                className={styles.input}
              />

              <TextField
                label="Негативный промпт"
                placeholder="Чего нужно избегать при генерации"
                caption="Пример: яркие цвета, кислотность"
                maxLength={50}
                value={imageNegativePrompt}
                onChange={handleImageNegativePromptChange}
                className={styles.input}
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
              cols={900}
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
              cols={4500}
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
              {error && <CustomError errorType={error} customButton={regenerateButton} />}

              {showGenerationContent && (
                <>
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
                    {isContentGenerated && (
                      <Layout className={styles.generation__buttons}>
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
                      </Layout>
                    )}

                    {generatedText && (
                      <Text className={styles.generation__text} size="l">
                        {generatedText}
                      </Text>
                    )}
                    {isTextLoading && !generatedText && <SkeletonText rows={5} fontSize="xl" lineHeight="xs" />}
                  </Layout>
                </>
              )}
            </Layout>
          </>
        )}
      </Layout>
    </Layout>
  );
};
