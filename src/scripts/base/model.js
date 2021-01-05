import Backbone from "backbone";
import extend from "lodash/extend";
import isFunction from "lodash/isFunction";

/**
 * @class BaseModel
 * @extends {Backbone.Model}
 */
export default class BaseModel extends Backbone.Model {
  constructor(...args) {
    super(...args);

    if (this.mixins && this.mixins.length) {
      this.mixins.forEach((mixin) => {
        extend(this, mixin);

        if (mixin.init && isFunction(mixin.init)) {
          mixin.init.call(this);
        }
      });
    }
  }
}
