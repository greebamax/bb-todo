var ItemView = Backbone.View.extend({
  events: {},
  render: function () {
    this.$el.html(this.model.toJSON());
    return this;
  }
});
