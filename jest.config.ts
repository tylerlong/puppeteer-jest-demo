// eslint-disable-next-line node/no-unpublished-import
import {Config} from 'jest';

const config: Config = {
  preset: 'jest-puppeteer',
  transform: {
    '^.+\\.ts': 'ts-jest',
  },
  setupFiles: ['dotenv-override-true/config'],
  testTimeout: 128000,
};

export default config;
