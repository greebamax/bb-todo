/* eslint-disable no-console */
export const log = console.log.bind(console, "LOG: ");
export const error = console.error.bind(console, "ERROR: ");

export default {
  log,
  error,
};
