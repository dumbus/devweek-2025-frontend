import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Grid, GridItem } from '@consta/uikit/Grid';
import { Layout } from '@consta/uikit/Layout';
import { Pagination } from '@consta/uikit/Pagination';
import { Text } from '@consta/uikit/Text';

import { generatePostListsData } from 'shared';

import { PostsService } from 'services/PostsService';

import { PostsListItem, CustomLoader, CustomError } from 'features';
import { IPostListItemData, ErrorType } from 'shared';

import styles from './PostsList.module.scss';

export const PostsList = () => {
  const [listData, setListData] = useState<IPostListItemData[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);

  const [isDataLoading, setIsDataLoading] = useState(true);
  const [error, setError] = useState<ErrorType | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [usingMockData, setUsingMockData] = useState(false);

  useEffect(() => {
    setIsDataLoading(true);
    setError(null);
    setErrorMessage(null);

    const fetchPosts = async () => {
      try {
        // Try to get posts data from real API
        const postsService = new PostsService();
        const { data, totalPages } = await postsService.getPosts(page);

        setListData(data);
        setTotalPages(totalPages);
        setUsingMockData(false);

        if (!data.length) {
          setError('empty-data');
        }
      } catch (error) {
        // If real API is unavailable, get mock data
        try {
          const { data, totalPages } = await generatePostListsData(page);

          setListData(data);
          setTotalPages(totalPages);
          setUsingMockData(true);

          if (!data.length) {
            setError('empty-data');
          } else {
            setError(null);
          }
        } catch {
          setError('default');
          setErrorMessage(
            error instanceof Error
              ? `${error.message} (используются тестовые данные)`
              : 'Ошибка при загрузке данных (используются тестовые данные)'
          );
          setListData([]);
          setUsingMockData(false);
        }
      } finally {
        setIsDataLoading(false);
      }
    };

    fetchPosts();
  }, [page]);

  const hasContent = !isDataLoading && !error && listData && listData.length;

  return (
    <Layout className={styles.wrapper}>
      {isDataLoading && <CustomLoader />}
      {error && <CustomError errorType={error} message={errorMessage} hasReturnButton={false} />}

      {hasContent && (
        <Layout direction="column" className={styles.list}>
          <Text view="brand" size="3xl" weight="bold" lineHeight="xs" className={styles.list__title}>
            Список актуальных новостей
          </Text>

          {usingMockData && (
            <Text view="warning" size="m">
              Внимание: используются тестовые данные, так как сервер недоступен
            </Text>
          )}

          <Grid
            cols={1}
            gap="3xl"
            className={styles.grid}
            breakpoints={{
              577: {
                cols: 2,
                gap: 'xl'
              },
              993: {
                cols: 3
              }
            }}
          >
            {listData.map((item) => {
              return (
                <Link to={`/posts/${item.id}`} key={item.id}>
                  <GridItem col={1}>
                    <PostsListItem postsListItemData={item} isDataLoading={false} />
                  </GridItem>
                </Link>
              );
            })}
          </Grid>

          <Pagination
            className={styles.pagination}
            value={page}
            onChange={setPage}
            items={totalPages}
            size="l"
            visibleCount={5}
            showFirstPage
            showLastPage
          />
        </Layout>
      )}
    </Layout>
  );
};
