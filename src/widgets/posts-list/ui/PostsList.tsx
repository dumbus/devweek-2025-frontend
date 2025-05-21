import { Grid, GridItem } from '@consta/uikit/Grid';
import { PostsListItem } from 'entities';
import { Link } from 'react-router-dom';

import { IPostsList } from '../model/types';

import styles from './PostsList.module.scss';

// TODO: Loader & Error Handling
export const PostsList = ({ postsListData }: IPostsList) => {
  const { data } = postsListData;

  return (
    <Grid cols={3} gap="3xl" className={styles.grid}>
      {data.map((item) => {
        return (
          <Link to={`/posts/${item.id}`} key={item.id}>
            <GridItem col={1}>
              <PostsListItem postsListItemData={item} isDataLoading={false} />
            </GridItem>
          </Link>
        );
      })}
    </Grid>
  );
};
