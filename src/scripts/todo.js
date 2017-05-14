import Backbone from 'backbone';

export default Backbone.Model.extend({
  defaults: {
    title: '',
    complete: false
  },
  validate(attrs) {
    if (attrs.title === undefined) {
      return 'Remember to set a title for your todo.';
    }
  },
  initialize() {
    console.log('This model has been initialized.');
    this.on('invalid', function (model, error) {
      console.log(error);
    });
  }
});
