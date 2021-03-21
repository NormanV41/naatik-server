import { userModel, IUser } from './user-model';
import { ICustomRequest } from '../../util/custom-request';
import { NextFunction } from 'connect';
import { NoElementError } from '../../util/no-element-error';
import { Response, Request } from 'express';
import { merge } from 'lodash';
import { signToken } from '../../auth/auth';

export const param = (
  request: ICustomRequest,
  response: Response,
  next: NextFunction,
  id: string
) => {
  userModel.findById(id, '-password', undefined, (error, user) => {
    if (error) {
      next(error);
      return;
    }
    if (!user) {
      next(new NoElementError());
      return;
    }
    request.userRequested = user;
    next();
  });
};

export const get = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  userModel.find({}, '-password', undefined, (error, users) => {
    if (error) {
      next(error);
      return;
    }
    response.json(users);
  });
};

export const getOne = (
  request: ICustomRequest,
  response: Response,
  next: NextFunction
) => {
  response.json(request.userRequested);
};

export const put = (
  request: ICustomRequest,
  response: Response,
  next: NextFunction
) => {
  const user = request.userRequested as IUser;
  merge<IUser, any>(user, request.body);
  user.save((error, result) => {
    if (error) {
      next(error);
      return;
    }
    response.json(result.deletePassword());
  });
};

export const post = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const newUserModel = new userModel(request.body);
  newUserModel.save().then(
    (user) => {
      const token = signToken(user._id);
      response.json({ token });
    },
    (error) => {
      next(error);
    }
  );
};

export const del = (
  request: ICustomRequest,
  response: Response,
  next: NextFunction
) => {
  const user = request.userRequested as IUser;
  user.remove(undefined, (error, result) => {
    if (error) {
      next(error);
      return;
    }
    response.json(result);
  });
};

export const me = (
  request: ICustomRequest,
  response: Response,
  next: NextFunction
) => {
  response.json(request.userRequesting);
};
