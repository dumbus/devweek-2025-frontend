import { IPostsListData, ISinglePostData } from 'shared/types';

import { NEWS_PER_PAGE } from 'shared/constants';
import { mockPostListData, mockSinglePostData } from 'shared/data';

export const generatePostListsData = (page: number): Promise<IPostsListData> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const startIndex = (page - 1) * NEWS_PER_PAGE;
      const endIndex = startIndex + NEWS_PER_PAGE;

      const paginatedData = mockPostListData.slice(startIndex, endIndex);

      const totalPaginatedPages = Math.ceil(mockPostListData.length / NEWS_PER_PAGE);

      resolve({
        data: paginatedData,
        totalPages: totalPaginatedPages
      });
    }, 500);
  });
};

export const generateSinglePostData = (id: string | number): Promise<ISinglePostData> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const numberId = Number(id);

      const currentPostData = mockSinglePostData[numberId - 1];

      resolve({
        ...currentPostData
      });
    }, 500);
  });
};
