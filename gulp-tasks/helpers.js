const { join } = require('path');

const rootDir = join(__dirname, '..');

module.exports = {
  PATH: {
    ROOT: rootDir,
    SRC: join(rootDir, 'src'),
    DEST: join(rootDir, 'build'),
  },
  ENV: {
    DEV: 'development',
    PROD: 'production',
  },
};
