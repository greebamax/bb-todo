import Backbone from 'backbone';
import TodosCollection from './tasks-collection';

export default Backbone.Model.extend({

  defaults: {
    tasks: [],
    loading: true,
  },

  initialize() {
    this.set('tasks', this.getTasks());
  },

  getTasks() {
    const tasks = new TodosCollection();
    tasks.fetch();

    this.listenTo(tasks, 'sync', this.onTasksLoad);

    return tasks;
  },

  onTasksLoad(model, response) {
    this.set('loading', false);
    this.trigger('tasks:sync', response);
  },

});
