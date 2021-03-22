import morgan = require('morgan');
import { urlencoded, json } from 'body-parser';
import { Express } from 'express';
import cors = require('cors');
import override from 'method-override';
import nocache from 'nocache';
import cookieParser from 'cookie-parser';

export const appMiddleware = (app: Express) => {
  app.use(nocache());
  app.use(morgan('dev'));
  app.use(urlencoded({ extended: true }));
  app.use(json());
  app.use(cors());
  app.use(override());
  app.use(cookieParser());
};
