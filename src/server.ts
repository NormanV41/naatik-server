import express = require('express');
import apiRouter from './api/api';
import { appMiddleware } from './middleware/app-middleware';
import { connect } from 'mongoose';
import { config } from './config/config';
import signInRouter from './auth/routes';
import { unAuthorizedErrorHandler } from './auth/auth';

if (!config.db) {
  throw new Error("the database's url is not set");
}
connect(
  config.db.url,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    user: config.secrets.dbUsername,
    pass: config.secrets.dbPassword
  }
);
const app = express();

appMiddleware(app);

app.use('/api', apiRouter);
app.use('/auth', signInRouter);

app.use(unAuthorizedErrorHandler);

export default app;
