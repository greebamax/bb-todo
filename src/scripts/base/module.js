import Mn from 'backbone.marionette';

const IS_LOADED = Symbol('isLoaded');

class BaseModule extends Mn.Object {
  constructor(options) {
    super(options);

    this.isLoaded = false;
  }

  get isLoaded() {
    return this.getOption(IS_LOADED);
  }

  set isLoaded(state) {
    this.options[IS_LOADED] = state;
  }

  load() {
    return new Promise(resolve => {
      this.isLoaded = true;
      resolve();
    });
  }
}

export default BaseModule;
