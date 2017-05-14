import Backbone from 'backbone';
import _ from 'underscore';

export default Backbone.View.extend({
  tagName: 'li',
  template: _.template('An example template'),

  events: {
    'click .toggle': 'toggleCompleted',
    'dblclick label': 'edit',
    'click .destroy': 'clear',
    'blur .edit': 'close',
  },

  initialize() {
    this.on('change', _.bind(this.render, this));
  },

  render() {
    this.$el.html(this.template(this.model.toJSON()));
    this.input = this.$('.edit');
    return this;
  },

  edit() { },

  close() { },

  updateOnEnter() { },
});
