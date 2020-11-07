import { decodeToken, getFreshUser } from '../../auth/auth';
import { Router } from 'express';
import {
  param,
  get,
  upload,
  post,
  getOne,
  put,
  del
} from './author-controller';

const checkUser = [decodeToken(), getFreshUser()];

const authorRouter = Router();

authorRouter.param('id', param);

authorRouter
  .route('/')
  .get(get)
  .post(checkUser, upload.single('thumbnail'), post);

authorRouter
  .route('/:id')
  .get(getOne)
  .put(checkUser, upload.single('thumbnail'), put)
  .delete(checkUser, del);

export default authorRouter;
