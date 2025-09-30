import classNames from 'classnames';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { IconBackward } from '@consta/icons/IconBackward';
import { IconOpenInNew } from '@consta/icons/IconOpenInNew';

import { Button } from '@consta/uikit/Button';
import { Grid, GridItem } from '@consta/uikit/Grid';
import { Layout } from '@consta/uikit/Layout';
import { Tag } from '@consta/uikit/Tag';
import { Text } from '@consta/uikit/Text';

import { CustomError } from 'features';
import { CustomLoader } from 'features';

import { PostsService } from 'services/PostsService';

import { ErrorType, ISinglePostData } from 'shared';
import { dateFormatter } from 'shared';

import postImageTemplate from 'assets/postPreviewTemplate.png';

import { ISinglePost } from '../model/types';

import styles from './SinglePost.module.scss';

import { generateSinglePostData } from 'shared';

export const SinglePost = ({ postId }: ISinglePost) => {
  const navigate = useNavigate();

  const [postData, setPostData] = useState<ISinglePostData | null>(null);

  const [isDataLoading, setIsDataLoading] = useState(true);
  const [error, setError] = useState<ErrorType | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [usingMockData, setUsingMockData] = useState(false);

  useEffect(() => {
    if (postId) {
      const fetchPost = async () => {
        setIsDataLoading(true);
        setError(null);
        setErrorMessage(null);
        setUsingMockData(false);

        const id = Number(postId);
        let apiError: Error | null = null;

        // Try to get posts data from real API
        try {
          const postsService = new PostsService();
          const data = await postsService.getPostById(id);

          console.log(data);

          setPostData(data);

          if (!data) {
            setError('empty-data');
          }

          return; // successful request, return to main flow
        } catch (error) {
          apiError = error instanceof Error ? error : new Error(String(error));
        }

        // If real API is unavailable, get mock data
        try {
          const mockData = await generateSinglePostData(id);

          setPostData(mockData);
          setUsingMockData(true);

          if (!mockData) {
            setError('empty-data');
          }
        } catch {
          setError('default');
          setErrorMessage(
            apiError
              ? `${apiError.message}. Тестовые данные недоступны`
              : 'Ошибка при загрузке данных. Тестовые данные недоступны'
          );
          setPostData(null);
        }
      };

      fetchPost()
        .catch(() => {
          setError('default');
          setErrorMessage('Неизвестная ошибка при загрузке данных');
        })
        .finally(() => {
          setIsDataLoading(false);
        });
    }
  }, [postId]);

  const hasContent = !isDataLoading && !error && postData;

  return (
    <Layout className={classNames('container', styles.wrapper)}>
      {isDataLoading && <CustomLoader />}
      {error && <CustomError errorType={error} message={errorMessage} hasReturnButton />}

      {hasContent && (
        <Grid cols={5} colGap="2xl" rowGap="xl" className={styles.post}>
          {usingMockData && (
            <GridItem col={5}>
              <Text view="warning" size="m">
                Внимание: используются тестовые данные, так как сервер недоступен
              </Text>
            </GridItem>
          )}

          <GridItem col={2}>
            <img
              className={styles.post__image}
              src={postData.previewImageUrl || postImageTemplate}
              alt="Картинка для новости"
            />
          </GridItem>

          <GridItem col={3} className={styles.post__info}>
            <Text view="brand" size="2xl" weight="bold" lineHeight="xs" className={styles.post__title}>
              {postData.title}
            </Text>

            <Layout direction="column" className={styles.post__infoAbout}>
              {/* <Layout className={styles.post__tag}>
                <Text size="l">Тег новости: </Text>
                <Badge status="system" size="m" label={postData.tag} />
              </Layout> */}

              <Layout className={styles.post__date}>
                <Text size="l">Дата публикации: </Text>
                <Tag mode="info" size="l" label={dateFormatter.format(postData.date)} />
              </Layout>

              <Layout className={styles.post__source}>
                <Text size="l">Источник: </Text>
                <Tag mode="info" size="l" label={postData.source} />
              </Layout>

              <Layout direction="column">
                <Text size="l">Полный текст новости доступен по ссылке:</Text>
                <Text size="l">
                  <a href={postData.sourceUrl} className={styles.post__link} target="_blank" rel="noreferrer">
                    {postData.sourceUrl}
                  </a>
                </Text>
              </Layout>
            </Layout>

            <Layout direction="column" className={styles.post__buttons}>
              <Button
                className={styles.post__button}
                label="Вернуться на главную"
                iconLeft={IconBackward}
                view="ghost"
                onClick={() => {
                  navigate('/posts');
                }}
              />
              <Button
                className={styles.post__button}
                label="Перейти к генерации"
                iconLeft={IconOpenInNew}
                onClick={() => {
                  navigate('/posts/generation', { state: { article: postData.description, title: postData.title } });
                }}
              />
            </Layout>
          </GridItem>

          <GridItem col={5}>
            <Text view="brand" size="xl" weight="bold" lineHeight="xs">
              Краткое содержание новости:
            </Text>

            <Text size="l" className={styles.post__description}>
              {postData.description}
            </Text>
          </GridItem>
        </Grid>
      )}
    </Layout>
  );
};
