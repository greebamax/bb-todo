import $ from 'jquery';
import TodosCollection from './todos';
import ListView from './list-view';

$(() => {
  const todos = new TodosCollection();
  const todosList = new ListView({
    el: '#todo-app',
    model: todos,
  });
  todos.fetch();
});

