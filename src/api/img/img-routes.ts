import { Router } from 'express';
import { get, post, upload, errorHandler } from './img-controller';
import { decodeToken, getFreshUser } from '../../auth/auth';

const checkUser = [decodeToken(), getFreshUser()];

const imgRouter = Router();

imgRouter.route('/').post(checkUser, upload.single('upload'), post);

imgRouter.route('/:fileName').get(get);

imgRouter.use(errorHandler);

export default imgRouter;
