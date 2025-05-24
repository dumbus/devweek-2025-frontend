export interface IRawPostsListData {
  data: IRawPostsListItemData[];
  totalPages: number;
}

export interface IRawPostsListItemData {
  id: number;
  title: string;
  date: string;
  image_link: string;
  origin_link: string;
}

export interface IRawSinglePostData {
  id: number;
  title: string;
  date: string;
  image_link: string;
  origin_link: string;
  text: string;
  author: string;
}
