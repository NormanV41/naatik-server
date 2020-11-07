import { decodeToken, getFreshUser } from '../../auth/auth';
import { Router } from 'express';
import { param, upload, post, getOne, put, del } from './post-controller';

const checkUser = [decodeToken(), getFreshUser()];

const postRouter = Router();

postRouter.param('id', param);

postRouter.route('/').post(checkUser, upload.single('detailImage'), post);

postRouter
  .route('/:id')
  .get(getOne)
  .put(checkUser, upload.single('detailImage'), put)
  .delete(checkUser, del);

export default postRouter;
