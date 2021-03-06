import _ = require('lodash');
import { development } from './develpoment';
import { production } from './production';
import { testing } from './testing';
import { readFileSync } from 'fs';
import { join } from 'path';

const secretsPath = join(__dirname, '../../secrets.json');

const secrets = JSON.parse(readFileSync(secretsPath, { encoding: 'utf8' })) as {
  jwt: string;
  emailPassword: string;
  dbUsername: string;
  dbPassword: string;
};

const nonEnvConfig = {
  dev: 'development',
  test: 'testing',
  prod: 'production',
  port: process.env.PORT || 4242,
  env: '',
  appRoot: process.env.APP_ROOT || process.cwd(),
  expireTime: 60 * 60 * 24,
  serverBaseUrl: 'http://localhost:4242',
  secrets: {
    jwt: secrets.jwt,
    emailPassword: secrets.emailPassword,
    dbUsername: secrets.dbUsername,
    dbPassword: secrets.dbPassword
  }
};

nonEnvConfig.env = process.env.NODE_ENV || nonEnvConfig.dev;

let envConfig: {
  logging?: boolean;
  db?: { url: string };
  targetContactEmail?: string;
};

switch (nonEnvConfig.env) {
  case nonEnvConfig.dev:
    envConfig = development;
    break;
  case nonEnvConfig.prod:
    envConfig = production;
    break;
  case nonEnvConfig.test:
    envConfig = testing;
  default:
    throw new Error('no environment set up');
}

export const config = _.merge(nonEnvConfig, envConfig);
