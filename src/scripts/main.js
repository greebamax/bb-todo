import $ from 'jquery';
import TodosCollection from './todos';

$(() => {
  const todos = new TodosCollection();
  todos.fetch();
  todos.on('sync', (collection) => {
    console.log(collection.toJSON());
  });
});

