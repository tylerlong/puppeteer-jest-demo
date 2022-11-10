// eslint-disable-next-line node/no-unpublished-import
import {Config} from 'jest';

const config: Config = {
  preset: 'jest-puppeteer',
  transform: {
    '^.+\\.ts': 'ts-jest',
  },
};

export default config;
