import Backbone from 'backbone';
import $ from 'jquery';
import _ from 'underscore';
import TodoModel from './todo';

export default Backbone.View.extend({
  tagName: 'li',
  template: _.template($('#todo-item-tmpl').html()),

  model: TodoModel,

  render() {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  },
});
