import Backbone from 'backbone';
import logger from 'helpers/logger';

export default Backbone.Model.extend({
  defaults: {
    title: '',
    complete: false,
  },

  validate(attrs) {
    if (attrs.title === undefined) {
      return 'Remember to set a title for your todo.';
    }

    return undefined;
  },

  initialize() {
    this.on('invalid', (model, error) => {
      logger.error(error);
    });
  },

  toggle() {
    this.save({
      completed: !this.get('completed'),
    });
  },
});
