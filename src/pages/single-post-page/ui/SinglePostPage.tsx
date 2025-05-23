import { useEffect, useState } from 'react';

import { Layout } from '@consta/uikit/Layout';
import { useParams } from 'react-router-dom';

import { generateSinglePostData } from 'shared';
import { ISinglePostData } from 'shared';
import { SinglePost } from 'widgets';

export const SinglePostPage = () => {
  const { id: postId } = useParams();

  const [data, setData] = useState<ISinglePostData | null>(null);

  useEffect(() => {
    const currentPostId = Number(postId);
    const postData = generateSinglePostData(currentPostId);

    setData(postData);
  }, [postId]);

  return <Layout className="container">{data && <SinglePost data={data} />}</Layout>;
};
