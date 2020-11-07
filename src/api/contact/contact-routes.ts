import { Router } from 'express';
import { post } from './contact-controller';

const contactRouter = Router();

contactRouter.route('/').post(post);

export default contactRouter;
