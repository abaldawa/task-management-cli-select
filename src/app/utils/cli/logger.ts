/**
 * @author Abhijit Baldawa
 */

/**
 * Logger utility object to be used across
 * the CLI app
 */
const logger = Object.freeze({
  log: console.log,
  error: console.error,
  clearConsole: console.clear,
});

export { logger };
