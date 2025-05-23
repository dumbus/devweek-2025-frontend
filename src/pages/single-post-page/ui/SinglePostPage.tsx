import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';

import { Layout } from '@consta/uikit/Layout';
import { useParams } from 'react-router-dom';

import { SinglePost } from 'widgets';

export const SinglePostPage = () => {
  const navigate = useNavigate();
  const { id: postId } = useParams();

  const [currentId, setCurrentId] = useState('');

  useEffect(() => {
    const currentPostId = Number(postId);
    setCurrentId(postId || '');

    if (!currentPostId || isNaN(currentPostId)) {
      navigate('/404');
    }
  }, [postId, navigate]);

  return <Layout className={classNames('container', 'containerBlock')}>{<SinglePost postId={currentId} />}</Layout>;
};
