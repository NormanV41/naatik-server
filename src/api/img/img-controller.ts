import { Request, NextFunction, Response, ErrorRequestHandler } from 'express';
import multer = require('multer');
import { config } from '../../config/config';
import { join } from 'path';
import { logger } from '../../util/logger';

const staticPath = join(__dirname, '/../../../public/assets/img/');

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

export const post = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const array = request.file.path.split('/');
  response.json({
    url: `${config.serverBaseUrl}/api/img/${array[array.length - 1]}`
  });
};

export const get = (request: Request, response: Response) => {
  response.sendFile(staticPath + request.params.fileName);
};

export const errorHandler: ErrorRequestHandler = (
  error,
  request,
  response,
  next
) => {
  if (error) {
    logger.error(error.stack);
    response.status(500);
    response.json(error);
    return;
  }
  response.status(500).json(new Error('Algo salió mal, contacta un técnico'));
};
