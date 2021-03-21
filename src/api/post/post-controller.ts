import multer = require('multer');
import { Response, NextFunction, Request } from 'express';
import { postModel, IPost } from './post-model';
import { merge } from 'lodash';
import { ICustomRequest } from '../../util/custom-request';
import { NoElementError } from '../../util/no-element-error';
import { logger } from '../../util/logger';
import { previewPostModel } from '../preview-post/preview-post-model';
import { config } from '../../config/config';

const storage = multer.diskStorage({
  destination: (request, file, callback) => {
    callback(null, config.appRoot + 'public/assets/img/');
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
  logger.log(id);
  postModel
    .findById(id)
    .populate({ path: 'preview', populate: 'author' })
    .exec((error, postDocument) => {
      if (error) {
        next(error);
        return;
      }
      if (!postDocument) {
        next(new NoElementError());
        return;
      }
      request.post = postDocument;
      next();
    });
};

export const get = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  postModel.find().then(
    (posts) => {
      response.json(posts);
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
  response.json(request.post);
};

export const put = (
  request: ICustomRequest,
  response: Response,
  next: NextFunction
) => {
  const postDocument = request.post;
  if (!postDocument) {
    next(new NoElementError());
    return;
  }
  let array: string[] = [];
  if (request.file) {
    array = request.file.path.split('/');
  }
  if (array.length > 1) {
    request.body.headerImage = array[array.length - 1];
  }
  merge(postDocument, request.body);
  postDocument.save((error, result) => {
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
  const array = request.file.path.split('/');
  request.body.headerImage = array[array.length - 1];
  request.body.content = 'SIN EDITAR!!';
  logger.log(request.body);
  postModel.create(request.body).then(
    (postDocument) => {
      previewPostModel.findById(
        postDocument.preview,
        undefined,
        undefined,
        (errorFindingPreview, preview) => {
          if (errorFindingPreview) {
            handleErrorAfterPostWasCreated(
              errorFindingPreview,
              response,
              'post was saved but preview-post was not updated'
            );
            return;
          }
          if (!preview) {
            handleErrorAfterPostWasCreated(
              new NoElementError(),
              response,
              'post was saved but preview-post was not updated because preview was undefined'
            );
            return;
          }
          merge(preview, { post: postDocument._id });
          preview.save((error, result) => {
            if (error) {
              handleErrorAfterPostWasCreated(
                error,
                response,
                'post was saved but preview-post was not updated'
              );
              return;
            }
            response.json({ post: postDocument, preview: result });
          });
        }
      );
    },
    (error) => {
      logger.log(request.body.preview);
      next(error);
    }
  );
};

export const del = (
  request: ICustomRequest,
  response: Response,
  next: NextFunction
) => {
  const postDocument = request.post;
  if (!postDocument) {
    next(new NoElementError());
    return;
  }
  postDocument.remove(undefined, (error, result) => {
    if (error) {
      next(error);
      return;
    }
    response.json(result);
  });
};

const handleErrorAfterPostWasCreated = (
  error: any,
  response: Response,
  message: string
) => {
  logger.error(error);
  response.status(409);
  response.send({
    message,
    error
  });
};
