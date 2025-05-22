import { useEffect, useState } from 'react';

import { Layout } from '@consta/uikit/Layout';
import { useParams } from 'react-router-dom';

// import { OpenRouterTextService } from 'services/OpenRouterService';
// import { FusionBrainService } from 'services/FusionBrainService';
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

  // const [imgUrl, setImgUrl] = useState('');

  // const handleClick = async () => {
  //   if (!data) return;

  //   try {
  //     const openRouterTextService = new OpenRouterTextService(
  //       import.meta.env.VITE_OPENROUTER_AUTH_KEY,
  //       window.location.href,
  //       'devweeks-2025'
  //     );

  //     const response = await openRouterTextService.generateTextFromDescription(data.description);
  //     console.log(response);
  //   } catch (err) {
  //     console.error('OpenRouter Error:', err);
  //   }
  // };

  // const handleClick = async () => {
  //   if (!data) return;

  //   try {
  //     const fusionBrainService = new FusionBrainService(import.meta.env.VITE_FUSIONBRAIN_API_KEY, import.meta.env.VITE_FUSIONBRAIN_SECRET_KEY);

  //     const { imageBase64 } = await fusionBrainService.generateImageByDescription(data.description);
  //     const imageUrl = `data:image/png;base64,${imageBase64}`;

  //     setImgUrl(imageUrl);
  //   } catch (err) {
  //     console.error('FusionBrain Error:', err);
  //   }
  // }

  return <Layout className="container">{data && <SinglePost data={data} />}</Layout>;
};
