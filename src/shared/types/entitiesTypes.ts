export interface IPostsListData {
  data: IPostListItemData[];
  totalResults: number;
}

export interface IPostListItemData {
  id: number;
  title: string;
  date: string;
  previewImageUrl: string;
}

export interface ISinglePostData {
  id: number;
  title: string;
  date: string;
  previewImageUrl: string;
  source: string;
  sourceUrl: string;
  description: string;
}
