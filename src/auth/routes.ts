import { Router } from 'express';
import { verifyUSer } from './auth';
import { signIn } from './controller';

const signInRouter = Router();

signInRouter.post('/signin', verifyUSer(), signIn);

export default signInRouter;
