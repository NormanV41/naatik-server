import { Router } from 'express';
import { get, post, upload, errorHandler } from './img-controller';
import { checkUser } from '../../auth/auth';

const imgRouter = Router();

imgRouter.route('/').post(checkUser, upload.single('upload'), post);

imgRouter.route('/:fileName').get(get);

imgRouter.use(errorHandler);

export default imgRouter;
