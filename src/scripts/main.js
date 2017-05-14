import $ from 'jQuery';
import ListView from './list-view';
import TodosCollection from './todos';

$(function(){
  const todos = new TodosCollection();
  todos.fetch();
  todos.on('sync', collection => {
    console.log(collection.toJSON());
  });
});

