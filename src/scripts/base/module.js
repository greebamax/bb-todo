import Mn from 'backbone.marionette';

const IS_LOADED = Symbol('isLoaded');
const DEFAULTS = { isLoaded: false };


/**
 * @class BaseModule
 * @extends {Marionette.Object}
 */
export default class BaseModule extends Mn.Object {
  constructor(options = DEFAULTS) {
    super(options);
  }

  initialize() {
    this.isLoaded = this.options.isLoaded;
  }

  get isLoaded() {
    return this[IS_LOADED];
  }

  set isLoaded(state) {
    this[IS_LOADED] = state;
  }

  load() {
    return new Promise(resolve => {
      this[IS_LOADED] = true;
      resolve();
    });
  }

  unload() {
    this[IS_LOADED] = false;
  }
}
