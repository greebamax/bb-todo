import { isString } from 'lodash';

const SKIPPED_PARAMS = ['to', 'icon'];

/**
 *  Creates transpiled route.
 *  Will transpile all passed params into URL by
 *  its names if it was used in URL string
 *
 * @param {String} to URL, goes to href attribute
 * @example
 *   Common usage:
 *    {{link (route "route-link")}}
 *
 *   With params:
 *    {{link
 *        to=(route "path/with/{key2}/and/{id}/or_another/{key}/to")
 *        id=id
 *        key="value"
 *        key2="value2"}}
 *
 * @returns {String}
 */
export default Handlebars => options => {
  let to;
  let passedArgs;

  if (isString(options)) {
    to = options;
  } else {
    passedArgs = Object.keys(options.hash);
    to = options.hash.to; // eslint-disable-line
  }
  let url = Handlebars.escapeExpression(to);

  if (passedArgs && passedArgs.length) {
    url = passedArgs.reduce((str, key) => {
      if (SKIPPED_PARAMS.includes(key)) { // not expect to be used such params in URL string
        return str;
      }
      // replace all passed args by its name
      return str.replace(new RegExp(`{${key}}`), options.hash[key]);
    }, url);
  }

  return `#/${url}`;
};
