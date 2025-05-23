export interface IPostsListData {
  data: IPostListItemData[];
  totalPages: number;
}

export interface IPostListItemData {
  id: number;
  title: string;
  date: Date;
  previewImageUrl: string;
  originLink: string;
}

export interface ISinglePostData {
  id: number;
  title: string;
  date: Date;
  tag: string;
  source: string;
  sourceUrl: string;
  description: string;
  previewImageUrl: string;
}
