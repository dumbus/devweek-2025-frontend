export interface IPostsListData {
  data: IPostListItemData[];
  totalPages: number;
}

export interface IPostListItemData {
  id: number;
  title: string;
  date: string;
  previewImageUrl: string;
  originLink: string;
}

export interface ISinglePostData {
  id: number;
  title: string;
  date: string;
  tag: string;
  source: string;
  sourceUrl: string;
  description: string;
  previewImageUrl: string;
}
