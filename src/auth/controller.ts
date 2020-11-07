import { ICustomRequest } from '../util/custom-request';
import { Response, NextFunction } from 'express';
import { signToken } from './auth';
import { IUser } from '../api/user/user-model';
import { config } from '../config/config';

export const signIn = (
  request: ICustomRequest,
  response: Response,
  next: NextFunction
) => {
  const user = request.userRequesting as IUser;
  const token = signToken(user._id);
  response.json({ token, expiresIn: config.expireTime });
};
