import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Grid, GridItem } from '@consta/uikit/Grid';
import { Layout } from '@consta/uikit/Layout';
import { Pagination } from '@consta/uikit/Pagination';
import { Text } from '@consta/uikit/Text';

import { PostsService } from 'services/PostsService';

import { PostsListItem, CustomLoader, CustomError } from 'features';
// import { generatePostListsData } from 'shared'; // Оставляю на всякий случай
import { IPostListItemData, ErrorType } from 'shared';

import styles from './PostsList.module.scss';

// TODO: Pagination
export const PostsList = () => {
  const [listData, setListData] = useState<IPostListItemData[]>([]);
  const [totalPages, setTotalPages] = useState(0); // TODO: for pagination
  const [page, setPage] = useState(1);

  // console.log(totalPages); // TODO: Убрать

  const [isDataLoading, setIsDataLoading] = useState(true);
  const [error, setError] = useState<ErrorType | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    setIsDataLoading(true);

    const fetchPosts = async () => {
      try {
        const postsService = new PostsService();
        const { data, totalPages } = await postsService.getPosts(page); // Начинаем с первой страницы

        setListData(data);
        setTotalPages(totalPages);

        if (!data.length) {
          setError('empty-data');
        }
      } catch (err) {
        setError('default');
        setErrorMessage(err instanceof Error ? err.message : 'Ошибка при загрузке данных');
        setListData([]);
      } finally {
        setIsDataLoading(false);
      }
    };

    fetchPosts();

    // generatePostListsData()
    //   .then(({ data, totalResults }) => {
    //     setListData(data);
    //     setTotalResults(totalResults);

    //     if (!data.length) {
    //       setError('empty-data');
    //       setErrorMessage(null);
    //     }
    //   })
    //   .catch((err) => {
    //     setError('default');
    //     setErrorMessage(err.message || 'Ошибка при загрузке данных');
    //     setListData([]);
    //   })
    //   .finally(() => {
    //     setIsDataLoading(false);
    //   });
  }, [page]);

  const hasContent = !isDataLoading && !error && listData && listData.length;

  return (
    <Layout className={styles.wrapper}>
      {isDataLoading && <CustomLoader />}
      {error && <CustomError errorType={error} message={errorMessage} hasReturnButton={false} />}

      {hasContent && (
        <Layout direction="column" className={styles.list}>
          <Text view="brand" size="3xl" weight="bold" lineHeight="xs">
            Список актуальных новостей
          </Text>

          <Grid cols={3} gap="3xl" className={styles.grid}>
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
            visibleCount={3}
            showFirstPage
            showLastPage
          />
        </Layout>
      )}
    </Layout>
  );
};
