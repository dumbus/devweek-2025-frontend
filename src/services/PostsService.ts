import { IRawPostsListData, IRawPostsListItemData, IRawSinglePostData } from 'shared';
import { IPostsListData, IPostListItemData, ISinglePostData } from 'shared';

export class PostsService {
  private _apiBaseUrl: string;
  private _fetchOptions: RequestInit;

  constructor() {
    this._apiBaseUrl = 'https://devweek-2025.ru/posts';
    this._fetchOptions = {
      method: 'GET'
    };
  }

  getResource = async (url: string) => {
    const response = await fetch(url, this._fetchOptions);

    if (!response.ok) {
      throw new Error(`Could not fetch ${url}, status: ${response.status}`);
    }

    return await response.json();
  };

  getPosts = async (page: number): Promise<IPostsListData> => {
    const raw: IRawPostsListData = await this.getResource(`${this._apiBaseUrl}?page=${page}`);

    const transformed = this._transformPostsData(raw.data);

    return {
      data: transformed,
      totalPages: raw.totalPages
    };
  };

  getPostById = async (postId: number): Promise<ISinglePostData> => {
    const raw: IRawSinglePostData = await this.getResource(`${this._apiBaseUrl}/${postId}`);

    const transformed = this._transformSinglePostData(raw);

    return transformed;
  };

  _transformPostsData = (rawPostsData: IRawPostsListItemData[]): IPostListItemData[] => {
    return rawPostsData.map((rawData) => {
      return {
        id: rawData.id,
        title: rawData.title,
        date: new Date(rawData.date),
        previewImageUrl: rawData.image_link,
        originLink: rawData.origin_link
      };
    });
  };

  _transformSinglePostData = (rawSinglePostData: IRawSinglePostData): ISinglePostData => {
    return {
      id: rawSinglePostData.id,
      title: rawSinglePostData.title,
      date: new Date(rawSinglePostData.date),
      description: rawSinglePostData.text,
      previewImageUrl: rawSinglePostData.image_link,
      sourceUrl: rawSinglePostData.origin_link,
      source: rawSinglePostData.author,
      tag: 'Аналитика' // TODO: Получить с сервера актуальные, сейчас хардкод
    };
  };
}
