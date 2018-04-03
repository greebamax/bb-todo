import Backbone from 'backbone';
import _ from 'lodash';
import TodoModel from './task-model';
import Template from './task-template.hbs';

export default Backbone.View.extend({
  tagName: 'li',
  template: Template,

  model: TodoModel,

  render() {
    this.$el.html(this.template(_.extend({
      cid: this.model.cid,
    }, this.model.toJSON())));
    return this;
  },

});
