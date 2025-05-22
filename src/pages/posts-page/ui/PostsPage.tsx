import { Layout } from '@consta/uikit/Layout';

import { generatePostListsData } from 'shared';
import { PostsList } from 'widgets';

// TODO: Pagination
export const PostsPage = () => {
  const postsListData = generatePostListsData();

  return (
    <Layout className="container">
      <PostsList postsListData={postsListData} />
    </Layout>
  );
};
