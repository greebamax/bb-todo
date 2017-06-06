import Backbone from 'backbone';
import _ from 'underscore';
import TodoModel from '../models/todo';
import Template from '../templates/todo-item.hbs';

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
