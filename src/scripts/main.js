/* eslint-disable import/first */
import './plugins';

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

