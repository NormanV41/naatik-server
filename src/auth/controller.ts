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
  const oneDayInMilliSeconds = 24 * 60 * 60 * 1000;
  const expires = new Date(Date.now() + oneDayInMilliSeconds);
  const shouldBeSecure = config.env === config.prod;
  response
    .cookie('access_token', `Bearer ${token}`, {
      secure: shouldBeSecure,
      expires
    })
    .status(201)
    .send();
};
