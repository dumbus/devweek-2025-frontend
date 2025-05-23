import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';

import { Layout } from '@consta/uikit/Layout';
import { useParams } from 'react-router-dom';

import { generateSinglePostData } from 'shared';
import { ISinglePostData } from 'shared';
import { SinglePost } from 'widgets';

export const SinglePostPage = () => {
  const navigate = useNavigate();
  const { id: postId } = useParams();

  const [data, setData] = useState<ISinglePostData | null>(null);

  useEffect(() => {
    const currentPostId = Number(postId);

    if (isNaN(currentPostId)) {
      navigate('/404');
    } else {
      const postData = generateSinglePostData(currentPostId);
      setData(postData);
    }
  }, [postId, navigate]);

  return <Layout className={classNames('container', 'containerBlock')}>{data && <SinglePost data={data} />}</Layout>;
};
