import Backbone from 'backbone';
import TodoModel from '../models/todo';

export default Backbone.Collection.extend({
  url: '/todos',
  model: TodoModel,

  completed() {
    return this.filter('complete');
  },

  remaining() {
    return this.without(...this.filter('complete'));
  },

});
