import Backbone from 'backbone';
import _ from 'underscore';
import ItemView from './item-view';

export default Backbone.View.extend({
  render() {
    const items = this.model.get('items');

    _.each(items, item => {
      const itemView = new ItemView({
        model: item,
      });

      this.$el.append(itemView.render().el);
    }, this);
  },
});
