import Backbone from 'backbone';
import { extend } from 'lodash';
import TodoModel from './model';
import Template from './template.tmpl';

export default Backbone.View.extend({
  template: Template,

  model: TodoModel,

  render() {
    this.$el.html(this.template(extend({
      cid: this.model.cid,
    }, this.model.toJSON())));
    return this;
  },

});
