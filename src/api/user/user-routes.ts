import { Router } from 'express';
import { param, get, post, getOne, put, del, me } from './user-controller';
import { decodeToken, getFreshUser } from '../../auth/auth';

const checkUser = [decodeToken(), getFreshUser()];

const userRouter = Router();

userRouter.param('id', param);

userRouter.get('/me', checkUser, me);

userRouter
  .route('/')
  .get(checkUser, get)
  .post(checkUser, post);

userRouter
  .route('/:id')
  .get(checkUser, getOne)
  .put(checkUser, put)
  .delete(checkUser, del);

export default userRouter;
