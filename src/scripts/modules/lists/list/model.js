import BaseModel from 'base/model';

export default class TaskList extends BaseModel {
  get urlRoot() {
    return this.collection.url;
  }

  get defaults() {
    return {
      tasks: [],
      loading: true,
    };
  }

  // initialize() {
  //   this.set('tasks', this.getTasks());
  // }

  getTasks() {
    // const tasks = new TasksCollection({
    //   id: this.get(this.idAttribute),
    // });

    // tasks.fetch();

    // this.listenTo(tasks, 'sync', this.onTasksLoad);

    // return tasks;
  }

  onTasksLoad(model, response) {
    this.set('loading', false);
    this.trigger('tasks:sync', response);
  }
}
