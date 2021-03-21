import { checkUser } from '../../auth/auth';
import { Router } from 'express';
import { param, get, post, getOne, put, del } from './controller';

const videoCarouselRouter = Router();

videoCarouselRouter.param('id', param);

videoCarouselRouter
  .route('/')
  .get(get)
  .post(checkUser, post);

videoCarouselRouter
  .route('/:id')
  .get(getOne)
  .put(checkUser, put)
  .delete(checkUser, del);

export default videoCarouselRouter;
