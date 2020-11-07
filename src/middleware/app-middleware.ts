import morgan = require('morgan');
import * as bodyParser from 'body-parser';
import { Express } from 'express';
import cors = require('cors');
import override from 'method-override';
import nocache from 'nocache';

export const appMiddleware = (app: Express) => {
  app.use(nocache());
  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(cors());
  app.use(override());
};
