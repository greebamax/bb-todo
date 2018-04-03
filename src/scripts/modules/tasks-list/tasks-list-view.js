import Backbone from 'backbone';
import TaskView from '../task/task-view';
import TasksListModel from './tasks-list-model';

export default Backbone.View.extend({
  tagName: 'ul',
  model: TasksListModel,

  initialize() {
    this.listenTo(this.model, 'tasks:sync', this.render);
  },

  render() {
    this.$el.empty();
    if (this.model.get('loading')) {
      this.$el.html('Loading...');
      return;
    }

    this.model.get('tasks').forEach(model => {
      const itemView = new TaskView({ model });
      this.$el.append(itemView.render().el);
    });
  },

});
