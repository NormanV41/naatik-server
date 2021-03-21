import { Router } from 'express';
import {
  get,
  param,
  post,
  getOne,
  put,
  del,
  upload
} from './preview-post-controller';
import { checkUser } from '../../auth/auth';

const previewPostRouter = Router();

previewPostRouter.param('id', param);

previewPostRouter
  .route('/')
  .get(get)
  .post(checkUser, upload.single('previewImage'), post);

previewPostRouter
  .route('/:id')
  .get(getOne)
  .put(checkUser, upload.single('previewImage'), put)
  .delete(checkUser, del);

export default previewPostRouter;
