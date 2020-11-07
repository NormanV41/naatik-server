import { previewPostModel, IPreviewPost } from './preview-post-model';
import { Response, NextFunction, Request } from 'express';

import { merge } from 'lodash';
import multer = require('multer');
import { ICustomRequest } from '../../util/custom-request';
import { NoElementError } from '../../util/no-element-error';
import { getQueryParams, setFileName } from '../../util/methods';
import { logger } from '../../util/logger';

const storage = multer.diskStorage({
  destination: (request, file, callback) => {
    callback(null, 'public/assets/img/');
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
  previewPostModel.findById(id, (error, previewPost) => {
    if (error) {
      next(error);
      return;
    }
    if (!previewPost) {
      next(new NoElementError());
      return;
    }
    request.previewPost = previewPost;
    next();
  });
};

export const get = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const query = getQueryParams(request);
  logger.log(query.include);
  previewPostModel
    .find(query.filter)
    .sort(query.sort)
    .limit(query.limit as number)
    .populate(query.include)
    .exec()
    .then(
      (previewPosts) => {
        response.json(previewPosts);
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
  response.json(request.previewPost);
};

export const put = (
  request: ICustomRequest,
  response: Response,
  next: NextFunction
) => {
  const previewPost = request.previewPost;
  if (!previewPost) {
    next(new NoElementError());
    return;
  }
  setFileName(request, 'imageFileName');
  merge(previewPost, request.body);
  previewPost.save((error, result) => {
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
  setFileName(request, 'imageFileName');
  previewPostModel.create(request.body).then(
    (previewPost) => {
      response.json(previewPost);
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
  const previewPost = request.previewPost;
  if (!previewPost) {
    next(new NoElementError());
    return;
  }
  previewPost.remove((error, result) => {
    if (error) {
      next(error);
      return;
    }
    response.json(result);
  });
};
