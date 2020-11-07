import { config } from './config/config';
import app from './server';
import { logger } from './util/logger';
import { verify } from './util/nodemailer';

verify();
app.listen(config.port);
logger.log(`listening on http://localhost:${config.port}`);
