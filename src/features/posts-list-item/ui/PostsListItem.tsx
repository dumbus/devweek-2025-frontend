import { Layout } from '@consta/uikit/Layout';
import { SkeletonBrick, SkeletonText } from '@consta/uikit/Skeleton';
import { Text } from '@consta/uikit/Text';

import postImageTemplate from 'assets/postPreviewTemplate.png';

import { dateFormatter } from 'shared';

import { IPostsListItem } from '../model/types';

import styles from './PostsListItem.module.scss';

export const PostsListItem = ({ postsListItemData, isDataLoading }: IPostsListItem) => {
  const { date, title, previewImageUrl } = postsListItemData;

  return (
    <Layout direction="column" className={styles.card}>
      {isDataLoading ? (
        <SkeletonBrick height={260} />
      ) : (
        <img className={styles.card__image} src={previewImageUrl || postImageTemplate} alt="Картинка для новости" />
      )}

      <Layout direction="column" className={styles.card__text}>
        {isDataLoading ? (
          <SkeletonText rows={4} fontSize="xl" lineHeight="xs" />
        ) : (
          <Text className={styles.card__title} view="brand" size="xl" weight="bold" lineHeight="xs">
            {title}
          </Text>
        )}

        {isDataLoading ? <SkeletonText rows={1} fontSize="m" /> : <Text>{dateFormatter.format(date)}</Text>}
      </Layout>
    </Layout>
  );
};
