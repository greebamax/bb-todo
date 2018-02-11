/* eslint-disable import/first,no-undef */
import '../styles/main.scss';

import $ from 'jquery';
import TodosCollection from './collections/todos';
import ListView from './views/list-view';

$(() => {
  const todos = new TodosCollection();
  const todosList = new ListView({
    el: '#todo-list',
    model: todos,
  });
  todos.fetch();
});

if (__ENV__ !== 'production') {
  // Enable LiveReload
  document.write('<script src="http://localhost:35729/livereload.js?snipver=1"></script>');
}

