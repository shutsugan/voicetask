'use strict';

/**
* Class representing the controller.
*
* @class the view class.
* @class the model class.
* @class the voicecommand class.
*/
export default class TaskController {
  constructor(view, model, voicecommand) {
    this._recorder = document.querySelector('.recorder');

    this._view = view;
    this._model = model;
    this._voicecommand = voicecommand;

    //populate the main task list.
    this._view.update(this._model.getAll());
    this._addEventListener();
  }

  _addEventListener() {
    //start the voide command.
    this._recorder.addEventListener('mousedown', event => {
      this._voicecommand.startCommand((err, command, result) => {
        this._view.showCommandAndTask(command, result);
        if (err) return this._view.showMessage(err);

        if (result === null) this._execNavigationCommand(command);
        else this._execCommand(command, result);
      }, _ => {
        event.target.classList.add('recorded--opacity');
      })
    });

    //stop the voice command.
    this._recorder.addEventListener('mouseup', event => {
      this._voicecommand.stopCommand(_ => {});
      event.target.classList.remove('recorded--opacity');
    });
  }

  /**
  * navigation commands.
  *
  * @param {String} command to navigate to.
  */
  _execNavigationCommand(command) {
    if (command === 'all') this._view.update(this._model.getAll());
    else if (command === 'active') this._view.update(this._model.getActive());
    else if (command === 'completed') this._view.update(this._model.getCompleted());
  }

  /**
  * execution commands.
  *
  * @param {String} command to execute an action.
  */
  _execCommand(command, task) {
    if (command === 'plus') this._model.setTask(task, task => this._view.render(task));
    else if (command === 'check') this._view.render(task, true);
    else if (command === 'remove') this._model.removeTask(task, _ => this._view.update(this._model.getAll()));
    else if (command === 'clear') this._model.clear(_ => this._view.update(this._model.getAll()));
    else if (command === 'everything') this._view.update();
  }
}
