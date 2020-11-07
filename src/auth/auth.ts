import expressJwt = require('express-jwt');
import { sign } from 'jsonwebtoken';
import { config } from '../config/config';
import { userModel } from '../api/user/user-model';
import { Request, Response, NextFunction } from 'express';
import { ICustomRequest } from '../util/custom-request';
import { logger } from '../util/logger';

const checkToken = expressJwt({ secret: config.secrets.jwt });

export const decodeToken = () => {
  return (request: Request, response: Response, next: NextFunction) => {
    if (request.query && request.query.hasOwnProperty('acces_token')) {
      request.headers.authorization = 'Bearer ' + request.query.acces_token;
    }
    checkToken(request, response, next);
  };
};

export const getFreshUser = () => {
  return (request: ICustomRequest, response: Response, next: NextFunction) => {
    const user = request.user as { _id: string };
    userModel.findById(user._id, '-password', (error, userDocument) => {
      if (error) {
        next(error);
        return;
      }
      if (!userDocument) {
        response.status(401).send('Unauthorized');
        return;
      }
      request.userRequesting = userDocument;
      next();
    });
  };
};

export const verifyUSer = () => {
  return (request: ICustomRequest, response: Response, next: NextFunction) => {
    const username: string | undefined = request.body.username;
    const password: string | undefined = request.body.password;
    if (!username || !password) {
      response.status(400).send('You need a username and password');
      return;
    }
    userModel.findOne({ username }, (error, user) => {
      if (error) {
        next(error);
        return;
      }
      if (!user) {
        response.status(401).send('No user with the given username');
        return;
      }
      if (!user.authenticate(password)) {
        response.status(401).send('Wrong password');
        return;
      }
      request.userRequesting = user;
      next();
    });
  };
};

export const signToken = (id: string) => {
  return sign({ _id: id }, config.secrets.jwt, {
    expiresIn: config.expireTime
  });
};

export const unAuthorizedErrorHandler = (
  error: any,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  logger.error(error);
  if (error.name === 'UnauthorizedError') {
    response.status(401).send('Invalid token');
    return;
  }
  next(error);
};
