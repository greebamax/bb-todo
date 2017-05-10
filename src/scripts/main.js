import TodosCollection from './todos';

var TodoView = Backbone.View.extend({
  tagName: 'li',
  template: _.template('An example template'),
  events: {
    'click .toggle': 'toggleCompleted',
    'dblclick label': 'edit',
    'click .destroy': 'clear',
    'blur .edit': 'close'
  },

  initialize: function () {
    this.on('change', _.bind(this.render, this));
  },

  render: function () {
    this.$el.html(this.template(this.model.toJSON()));
    this.input = this.$('.edit');
    return this;
  },

  edit: function () {
  },

  close: function () {
  },

  updateOnEnter: function (e) {
  }
});


var ListView = Backbone.View.extend({
  render: function () {
    var items = this.model.get('items');

    _.each(items, function (item) {
      var itemView = new ItemView({
        model: item
      });

      this.$el.append(itemView.render().el);
    }, this);
  }
});

var ItemView = Backbone.View.extend({
  events: {},
  render: function () {
    this.$el.html(this.model.toJSON());
    return this;
  }
});

TodosCollection.fetch();
