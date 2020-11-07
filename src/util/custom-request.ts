import { Request } from 'express';
import { IPreviewPost } from '../api/preview-post/preview-post-model';
import { IUser } from '../api/user/user-model';
import { IVideoCarousel } from '../api/video-carousel/model';
import { IPost } from '../api/post/post-model';
import { IAuthor } from '../api/author/author-model';
export interface ICustomRequest extends Request {
  previewPost?: IPreviewPost;
  userRequested?: IUser;
  userRequesting?: IUser;
  user?: { _id: string };
  videoCarousel?: IVideoCarousel;
  post?: IPost;
  author?: IAuthor;
}
