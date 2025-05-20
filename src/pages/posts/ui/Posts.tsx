import { Layout } from '@consta/uikit/Layout';

import { generatePostListsData } from 'shared';
import { PostsList } from 'widgets';

export const Posts = () => {
  const postsListData = generatePostListsData();

  return (
    <Layout className="container">
      <PostsList postsListData={postsListData} />
    </Layout>
  );
};
