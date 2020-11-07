import { ICustomRequest } from '../../util/custom-request';
import { Response, NextFunction, Request } from 'express';
import { videoCarouselModel, IVideoCarousel } from './model';
import { NoElementError } from '../../util/no-element-error';
import { merge } from 'lodash';
import { logger } from '../../util/logger';
import { getQueryParams } from '../../util/methods';

export const param = (
  request: ICustomRequest,
  response: Response,
  next: NextFunction,
  id: string
) => {
  videoCarouselModel.findById(id, (error, videoCarousel) => {
    if (error) {
      next(error);
      return;
    }
    if (!videoCarousel) {
      next(new NoElementError());
      return;
    }
    request.videoCarousel = videoCarousel;
    next();
  });
};

export const get = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const query = getQueryParams(request);
  videoCarouselModel
    .find(query.filter)
    .sort(query.sort)
    .limit(query.limit as number)
    .then(
      (videoCarousels) => {
        response.json(videoCarousels);
      },
      (error) => {
        next(error);
      }
    );
};

export const getOne = (
  request: ICustomRequest,
  response: Response,
  next: NextFunction
) => {
  response.json(request.videoCarousel);
};

export const put = (
  request: ICustomRequest,
  response: Response,
  next: NextFunction
) => {
  const videoCarousel = request.videoCarousel as IVideoCarousel;
  merge<IVideoCarousel, any>(videoCarousel, request.body);
  videoCarousel.save((error, result) => {
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
  videoCarouselModel.create(request.body).then(
    (videoCarousel) => {
      response.json(videoCarousel);
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
  const videoCarousel = request.videoCarousel as IVideoCarousel;
  videoCarousel.remove((error, result) => {
    if (error) {
      next(error);
      return;
    }
    response.json(result);
  });
};
