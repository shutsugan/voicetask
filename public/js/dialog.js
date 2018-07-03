'use strict';

/**
* Class representing the voice commands dailog modal.
*
*/
export default class ShowDialog {
  /**
  * The dialog constructor.
  * getting the hocks
  * and listening to them.
  *
  * @param {String} trigger css selector of dialog open button.
  */
  constructor(trigger) {
    this._dialog = document.querySelector('dialog');
    this._open = document.querySelector(trigger);
    this._close = this._dialog.querySelector('.close');

    this._addEventListener();
  }

  /**
  * The dialog open and close event listeners.
  *
  */
  _addEventListener() {
    if (this._open) this._open.addEventListener('click', _ => this._showDialog());
    if (this._close) this._close.addEventListener('click', _ => this._closeDialog());
  }

  /**
  * Show the dialog.
  *
  */
  _showDialog() {
    this._dialog.showModal();
  }

  /**
  * Close the dialog.
  *
  */
  _closeDialog() {
    this._dialog.close();
  }
}
