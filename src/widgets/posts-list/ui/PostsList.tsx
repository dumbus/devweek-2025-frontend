import { Grid, GridItem } from '@consta/uikit/Grid';

import { PostsListItem } from 'entities';

import { IPostsList } from '../model/types';

import styles from './PostsList.module.scss';

export const PostsList = ({ postsListData }: IPostsList) => {
  const { data } = postsListData;

  return (
    <Grid cols={3} gap="3xl" className={styles.grid}>
      {data.map((item) => {
        return (
          <GridItem col={1} key={item.id}>
            <PostsListItem postsListItemData={item} isDataLoading={false} />
          </GridItem>
        );
      })}
    </Grid>
  );
};
