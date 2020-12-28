const { join } = require("path");

exports.PATH = {
  ROOT: process.cwd(),
  TASKS_ROOT: join(process.cwd(), "gulp-tasks"),
  SRC: join(process.cwd(), "src"),
  DEST: join(process.cwd(), "build"),
};

exports.ENV = {
  DEV: "development",
  PROD: "production",
};
