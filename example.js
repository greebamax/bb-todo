var Todo = Backbone.Model.extend({
  defaults: {
    title: '',
    completed: false
  },
  validate: function (attrs) {
    if (attrs.title === undefined) {
      return 'Remember to set a title for your todo.';
    }
  },
  initialize: function () {
    console.log('This model has been initialized.');
    this.on('invalid', function (model, error) {
      console.log(error);
    });
  }
});

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
    // выполняется при двойном щелчке по задаче
  },

  close: function () {
    // выполняется, когда задача теряет фокус
  },

  updateOnEnter: function (e) {
    // выполняется при каждом нажатии клавиши в режиме редактирования задачи,
    // но мы будем ждать нажатия enter, чтобы попасть в действие
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
