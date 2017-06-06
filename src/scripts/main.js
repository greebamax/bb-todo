import $ from 'jquery';
import TodosCollection from './collections/todos';
import ListView from './views/list-view';

$(() => {
  const todos = new TodosCollection();
  const todosList = new ListView({
    el: '#todo-app',
    model: todos,
  });
  todos.fetch();
});

