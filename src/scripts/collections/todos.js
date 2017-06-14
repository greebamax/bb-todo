import Backbone from 'backbone';
import TodoModel from '../models/todo';

export default Backbone.Collection.extend({
  url: '/todos',
  model: TodoModel,

  completed() {
    return this.filter(todo => todo.get('completed'));
  },

  remaining() {
    return this.without.apply(this, this.completed());
  },

});
