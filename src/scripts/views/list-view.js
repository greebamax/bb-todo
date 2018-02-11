import Backbone from 'backbone';
import ItemView from './list-item-view';
import Todos from '../collections/todos';

export default Backbone.View.extend({
  tagName: 'ul',
  className: 'container',
  model: Todos,

  initialize() {
    this.listenTo(this.model, 'sync', this.render);
  },

  render() {
    this.$el.html(''); // clear list
    this.model.forEach(model => {
      const itemView = new ItemView({ model });
      this.$el.append(itemView.render().el);
    });
    return this;
  },

});
