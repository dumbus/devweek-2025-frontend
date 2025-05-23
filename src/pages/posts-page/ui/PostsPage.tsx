import classNames from 'classnames';

import { Layout } from '@consta/uikit/Layout';

import { generatePostListsData } from 'shared';
import { PostsList } from 'widgets';

// TODO: Pagination
export const PostsPage = () => {
  const postsListData = generatePostListsData();

  return (
    <Layout className={classNames('container', 'containerBlock')}>
      <PostsList postsListData={postsListData} />
    </Layout>
  );
};
