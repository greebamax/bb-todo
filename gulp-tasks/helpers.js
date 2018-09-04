const { resolve } = require('path');

const rootDir = resolve(__dirname, '..');

module.exports = {
  PATHS: {
    ROOT: rootDir,
    SRC: resolve(rootDir, 'src'),
  },
  ENV: {
    DEV: 'development',
    PROD: 'production',
  },
};
