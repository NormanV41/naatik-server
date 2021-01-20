import multer = require('multer');
import { ICustomRequest } from '../../util/custom-request';
import { Response, NextFunction, Request } from 'express';
import { authorModel } from './author-model';
import { NoElementError } from '../../util/no-element-error';
import { logger } from '../../util/logger';
import { setFileName } from '../../util/methods';
import { merge } from 'lodash';
import { config } from '../../config/config';

const storage = multer.diskStorage({
  destination: (request, file, callback) => {
    callback(null, config.appRoot+'public/assets/img/');
  },
  filename: (request, file, callback) => {
    const name = new Date().toJSON() + file.originalname;
    callback(null, name);
  }
});

export const upload = multer({ storage });

export const param = (
  request: ICustomRequest,
  response: Response,
  next: NextFunction,
  id: string
) => {
  authorModel.findById(id,undefined,undefined, (error, author) => {
    if (error) {
      next(error);
      return;
    }
    if (!author) {
      next(new NoElementError());
      return;
    }
    request.author = author;
    next();
  });
};

export const get = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  authorModel.find().then(
    (authors) => {
      response.json(authors);
    },
    (error) => {
      next(error);
      return;
    }
  );
};

export const getOne = (
  request: ICustomRequest,
  response: Response,
  next: NextFunction
) => {
  response.json(request.author);
};

export const put = (
  request: ICustomRequest,
  response: Response,
  next: NextFunction
) => {
  const author = request.author;
  if (!author) {
    next(new NoElementError());
    return;
  }
  setFileName(request, 'image');
  merge(author, request.body);
  author.save((error, result) => {
    if (error) {
      next(error);
      return;
    }
    response.json(result);
  });
};

export const post = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  setFileName(request, 'image');
  authorModel.create(request.body).then(
    (author) => {
      response.json(author);
    },
    (error) => {
      logger.error(error);
      next(error);
    }
  );
};

export const del = (
  request: ICustomRequest,
  response: Response,
  next: NextFunction
) => {
  const author = request.author;
  if (!author) {
    next(new NoElementError());
    return;
  }
  author.remove(undefined,(error, result) => {
    if (error) {
      next(error);
      return;
    }
  });
};
