import Backbone from 'backbone';
import { extend, isFunction } from 'lodash';

/**
 * @class BaseCollection
 * @extends {Backbone.Collection}
 */
export default class BaseCollection extends Backbone.Collection {
  constructor(options) {
    super(options);

    if (this.mixins && this.mixins.length) {
      this.mixins.forEach(mixin => {
        extend(this, mixin);

        if (mixin.init && isFunction(mixin.init)) {
          mixin.init.call(this);
        }
      });
    }
  }
}
