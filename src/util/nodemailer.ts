import { createTransport } from 'nodemailer';
import { config } from '../config/config';
import { logger } from './logger';

export const transporter = createTransport({
  host: 'smtp.office365.com',
  secure: false,
  auth: {
    user: 'nvasquez@naatik.com',
    pass: config.secrets.emailPassword
  }
});

export const verify = () => {
  transporter.verify((error, success) => {
    if (error) {
      throw error;
    }
    logger.log('Nodemail is ready');
  });
};
