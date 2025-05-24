import classNames from 'classnames';

import { Layout } from '@consta/uikit/Layout';

import { PostsList } from 'widgets';

export const PostsPage = () => {
  return (
    <Layout className={classNames('container', 'containerBlock')}>
      <PostsList />
    </Layout>
  );
};
