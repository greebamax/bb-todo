import Backbone from 'backbone';
import TodoModel from './todo';

export default Backbone.Collection.extend({
  url: '/todos',
  model: TodoModel,
});
