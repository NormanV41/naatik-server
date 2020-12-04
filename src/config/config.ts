import _ = require('lodash');
import { development } from './develpoment';
import { production } from './production';
import { testing } from './testing';
import { readFileSync } from 'fs';
import { join } from 'path';

const secretsPath = join(__dirname,'../../secrets.json')

const secrets = JSON.parse(
  readFileSync(secretsPath, { encoding: 'utf8' })
) as {
  jwtDev: string;
  emailPassword: string;
  dbUsername: string;
  dbPassword: string;
};

if(!process.env.APP_ROOT){
  throw new Error('set APP_ROOT environment variable')
}

const nonEnvConfig = {
  dev: 'development',
  test: 'testing',
  prod: 'production',
  port: process.env.PORT || 4242,
  env: '',
  appRoot: process.env.APP_ROOT,
  expireTime: 60 * 60 * 24,
  serverBaseUrl: 'http://localhost:4242',
  secrets: {
    jwt: process.env.JWT || secrets.jwtDev,
    emailPassword: process.env.jwtDev || secrets.emailPassword,
    dbUsername: secrets.dbUsername,
    dbPassword: secrets.dbPassword
  }
};

process.env.NODE_ENV = process.env.NODE_ENV || nonEnvConfig.dev;
nonEnvConfig.env = process.env.NODE_ENV;



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
