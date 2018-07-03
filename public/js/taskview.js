'use strict';

/**
* Class representing the view.
*
*/
export default class TaskView {
  constructor() {
    //get the tasks container.
    this._container = document.querySelector('.task-container');
  }

  /**
  * mark all tasks as complete.
  *
  * @param {String} tasks to be updated.
  */
  update(tasks = '') {
    if (!tasks) {
      //update all the unchecked tasks.
      const tasks = Array.from(document.querySelectorAll(`[data-task]`));

      tasks.forEach(task => {
        this._updateTask(task);
      });

      return;
    }

    //update the main list with the tasks.
    this._container.innerHTML = '';
    tasks.forEach(task => this._addTask(task));
  }

  /**
  * add a new task,
  * if in list mark as completed.
  *
  * @param {String} task the task to be add or update.
  * @param {Boolean} update flages the existing task.
  */
  render(task, update) {
    if (update) {
      //task already in the list.
      //update the task status.
      const ts = document.querySelector(`[data-task="${task}"]`);
      this._updateTask(ts);

      return;
    }

    //add the new task to the list.
    this._addTask(task);
  }

  /**
  * log failure message.
  *
  * @param {String} message of the failure.
  */
  showMessage(message) {
    const data = {message: `${message}`, timeout: 7000};
    const snackbarContainer = document.querySelector('#demo-toast-example');

    snackbarContainer.MaterialSnackbar.showSnackbar(data);
  }

  /**
  * display the issued command and task
  *
  * @param {String} command result of the voice speech recognition.
  * @param {String} result of speech recognition.
  */
  showCommandAndTask(command, result) {
    const command_data = `${command}`;
    const task_data = `${result}`;
    const command_text = document.querySelector('.command-text');
    const task_text = document.querySelector('.task-text');

    command_text.textContent = command_data;
    task_text.textContent = task_data;
  }

  /**
  * task template generator
  *
  * @param {String} task to be injected in the template.
  * @return {String} the generated template.
  */
  _generateTaskTemplate(task) {
    console.log(task);
    return `
      <div class="mdl-card__actions mdl-card--border fade-in" data-task="${task}">
        <span class="mdl-card--center mdl-card--active-color">
          <i class="material-icons">check_box_outline_blank</i>
          <p class="mdl-card__actions-text">${task}</p>
        </span>
      </div>
    `;
  }

  /**
  * update a task in the list.
  *
  * @param {String} task to be updated.
  */
  _updateTask(task) {
    const span = task.querySelector('span');

    if (span.classList.contains('mdl-card--active-color')) {
      span.classList.remove('mdl-card--active-color');
      span.classList.add('mdl-card--completed-color');
      span.querySelector('i').textContent = 'check_box';
    } else {
      span.classList.add('mdl-card--active-color');
      span.classList.remove('mdl-card--completed-color');
      span.querySelector('i').textContent = 'check_box_outline_blank';
    }
  }

  /**
  * add task to the list.
  *
  * @param {String} task to be added.
  */
  _addTask(task) {
    this._container.innerHTML += this._generateTaskTemplate(task);
    this._animate(this._container);
  }

  /**
  * animate the add and update actions.
  *
  * @param {HTMLElement} element to be animated.
  */
  _animate(element) {
    element.animate([
      {opacity: 0},
      {opacity: 1}
    ], {
      duration: 1000
    });
  }
}
