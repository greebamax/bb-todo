import { join } from 'path';

export const PATH = {
  ROOT: process.cwd(),
  TASKS_ROOT: join(process.cwd(), 'gulp-tasks'),
  SRC: join(process.cwd(), 'src'),
  DEST: join(process.cwd(), 'build'),
};

export const ENV = {
  DEV: 'development',
  PROD: 'production',
};
