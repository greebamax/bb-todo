import Backbone from 'backbone';

export default Backbone.View.extend({
  events: {},

  render() {
    this.$el.html(this.model.toJSON());
    return this;
  }
});
