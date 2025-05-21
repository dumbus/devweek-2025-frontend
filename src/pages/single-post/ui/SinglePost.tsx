import { useEffect, useState } from 'react';

import { Button } from '@consta/uikit/Button';
import { Grid, GridItem } from '@consta/uikit/Grid';
import { Layout } from '@consta/uikit/Layout';
import { Tag } from '@consta/uikit/Tag';
import { Text } from '@consta/uikit/Text';

import { useParams } from 'react-router-dom';

import { OpenRouterTextService } from 'services/OpenRouterService';
import { generateSinglePostData } from 'shared';
import { ISinglePostData } from 'shared';

import styles from './SinglePost.module.scss';

// TODO: Button "Generate" (generate image)
// TODO: Popover with settings for generation
// TODO: Loader & Error Handling
export const SinglePost = () => {
  const { id: postId } = useParams();

  const [data, setData] = useState<ISinglePostData | null>(null);

  useEffect(() => {
    const currentPostId = Number(postId);
    const postData = generateSinglePostData(currentPostId);

    setData(postData);
  }, [postId]);

  const handleClick = async () => {
    if (!data) return;

    try {
      const openRouterTextService = new OpenRouterTextService(
        import.meta.env.VITE_OPENROUTER_AUTH_KEY,
        window.location.href,
        'devweeks-2025'
      );

      const response = await openRouterTextService.getPostTextFromArticle(data.description);
      console.log(response);
    } catch (err) {
      console.error('Ошибка при запросе к OpenRouter:', err);
    }
  };

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
              <Layout className={styles.post__date}>
                <Text size="l">Дата публикации новости: </Text>
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

            <Button label="Сгенерировать" onClick={handleClick} />
          </GridItem>

          <GridItem col={5}>
            <Text size="l">{data.description}</Text>
          </GridItem>
        </Grid>
      )}
    </Layout>
  );
};
