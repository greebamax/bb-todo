/* eslint-disable import/first,no-undef */
import $ from 'jquery';
import ListView from './tasks-list/tasks-list-view';
import ListModel from './tasks-list/tasks-list-model';

$(() => {
  const todosList = new ListView({
    el: '#todo-list',
    model: new ListModel(),
  });
  todosList.render();
});

if (__ENV__ !== 'production') {
  // Enable LiveReload
  document.write('<script src="http://localhost:35729/livereload.js?snipver=1"></script>');
}
