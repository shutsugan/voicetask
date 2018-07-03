'use strict';

/**
* Class representing the model.
*
* @param {String} name the name of the localStorage.
*/
export default class TaskModel {
  constructor(name) {
    this._name = name;
    this._storage = localStorage;
  }

  /**
  * return all the tasks.
  *
  * @return the tasks.
  */
  getAll() {
    return this._storage.getItem(this._name) ? this._storage.getItem(this._name).split(' ') : [];
  }

  /**
  * add task to localStorage.
  *
  * @param {String} task to be added.
  * @param {Callback} callback to be called at the end.
  */
  setTask(task, callback) {
    const the_task = task.pop();
    const tasks = this.getAll();
    tasks.unshift(the_task);

    this._storage.setItem(this._name, tasks.join(' '));

    callback(the_task);
  }

  /**
  * remove task from localStorage.
  *
  * @param {String} task to be removed.
  * @param {Callback} callback to be called at the end.
  */
  removeTask(task, callback) {
    const the_task = task.pop();
    const tasks = this.getAll();

    if (tasks.includes(the_task)) {
      const index = tasks.indexOf(the_task);
      tasks.splice(index, 1);
      this._storage.setItem(this._name, tasks.join(' '));

      callback();
    }
  }

  /**
  * clear localStorage.
  *
  * @param {Callback} callback to be called at the end.
  */
  clear(callback) {
    this._storage.setItem(this._name, '');

    callback();
  }
}
