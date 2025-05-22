import { Layout } from '@consta/uikit/Layout';
import { SkeletonBrick, SkeletonText } from '@consta/uikit/Skeleton';
import { Text } from '@consta/uikit/Text';

import { IPostsListItem } from '../model/types';

import styles from './PostsListItem.module.scss';

export const PostsListItem = ({ postsListItemData, isDataLoading }: IPostsListItem) => {
  const { date, title, previewImageUrl } = postsListItemData;

  return (
    <Layout direction="column" className={styles.card}>
      {isDataLoading ? (
        <SkeletonBrick height={260} />
      ) : (
        <img className={styles.card__image} src={previewImageUrl} alt="Картинка для новости" />
      )}

      <Layout direction="column" className={styles.card__text}>
        {isDataLoading ? (
          <SkeletonText rows={4} fontSize="xl" lineHeight="xs" />
        ) : (
          <Text className={styles.card__title} view="brand" size="xl" weight="bold" lineHeight="xs">
            {title}
          </Text>
        )}

        {isDataLoading ? <SkeletonText rows={1} fontSize="m" /> : <Text>{date}</Text>}
      </Layout>
    </Layout>
  );
};
