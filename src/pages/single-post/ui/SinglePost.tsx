import { useEffect, useState } from 'react';

import { IconBackward } from '@consta/icons/IconBackward';
import { IconOpenInNew } from '@consta/icons/IconOpenInNew';
import { Badge } from '@consta/uikit/Badge';
import { Button } from '@consta/uikit/Button';
import { Grid, GridItem } from '@consta/uikit/Grid';
import { Layout } from '@consta/uikit/Layout';
import { Tag } from '@consta/uikit/Tag';
import { Text } from '@consta/uikit/Text';

import { useNavigate, useParams } from 'react-router-dom';

// import { OpenRouterTextService } from 'services/OpenRouterService';
// import { FusionBrainService } from 'services/FusionBrainService';
import { generateSinglePostData } from 'shared';
import { ISinglePostData } from 'shared';

import styles from './SinglePost.module.scss';

// TODO: Button "Generate" -> Open Page with generation settings and results
// TODO: Loader & Error Handling
export const SinglePost = () => {
  const navigate = useNavigate();
  const { id: postId } = useParams();

  const [data, setData] = useState<ISinglePostData | null>(null);

  useEffect(() => {
    const currentPostId = Number(postId);
    const postData = generateSinglePostData(currentPostId);

    setData(postData);
  }, [postId]);

  // const [imgUrl, setImgUrl] = useState('');

  // const handleClick = async () => {
  //   if (!data) return;

  //   try {
  //     const openRouterTextService = new OpenRouterTextService(
  //       import.meta.env.VITE_OPENROUTER_AUTH_KEY,
  //       window.location.href,
  //       'devweeks-2025'
  //     );

  //     const response = await openRouterTextService.generateTextFromDescription(data.description);
  //     console.log(response);
  //   } catch (err) {
  //     console.error('OpenRouter Error:', err);
  //   }
  // };

  // const handleClick = async () => {
  //   if (!data) return;

  //   try {
  //     const fusionBrainService = new FusionBrainService(import.meta.env.VITE_FUSIONBRAIN_API_KEY, import.meta.env.VITE_FUSIONBRAIN_SECRET_KEY);

  //     const { imageBase64 } = await fusionBrainService.generateImageByDescription(data.description);
  //     const imageUrl = `data:image/png;base64,${imageBase64}`;

  //     setImgUrl(imageUrl);
  //   } catch (err) {
  //     console.error('FusionBrain Error:', err);
  //   }
  // }

  return (
    <Layout className="container">
      {data && (
        <Grid cols={5} colGap="2xl" rowGap="xl" className={styles.post}>
          <GridItem col={2}>
            <img className={styles.post__image} src={data.previewImageUrl} alt="Картинка для новости" />
          </GridItem>

          <GridItem col={3} className={styles.post__info}>
            <Text view="brand" size="2xl" weight="bold" lineHeight="xs">
              {data.title}
            </Text>

            <Layout direction="column" className={styles.post__infoAbout}>
              <Layout className={styles.post__tag}>
                <Text size="l">Тег новости: </Text>
                <Badge status="system" size="m" label={data.tag} />
                {/* TODO: Функция для определения status по тегу */}
              </Layout>

              <Layout className={styles.post__date}>
                <Text size="l">Дата публикации: </Text>
                <Tag mode="info" size="l" label={data.date} />
              </Layout>

              <Layout className={styles.post__source}>
                <Text size="l">Источник: </Text>
                <Tag mode="info" size="l" label={data.source} />
              </Layout>

              <Layout direction="column">
                <Text size="l">Полный текст новости доступен по ссылке:</Text>
                <Text size="l">
                  <a href={data.sourceUrl} className={styles.post__link} target="_blank" rel="noreferrer">
                    {data.sourceUrl}
                  </a>
                </Text>
              </Layout>
            </Layout>

            <Layout className={styles.post__buttons}>
              <Button
                className={styles.post__button}
                label="Вернуться на главную"
                iconLeft={IconBackward}
                view="ghost"
                onClick={() => {
                  navigate('/posts');
                }}
              />
              <Button className={styles.post__button} label="Перейти к генерации" iconLeft={IconOpenInNew} />
            </Layout>
          </GridItem>

          <GridItem col={5}>
            <Text view="brand" size="xl" weight="bold" lineHeight="xs">
              Краткое содержание новости:
            </Text>

            <Text size="l" className={styles.post__description}>
              {data.description}
            </Text>
          </GridItem>
        </Grid>
      )}
    </Layout>
  );
};
