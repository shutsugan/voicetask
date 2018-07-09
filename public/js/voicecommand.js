'use strict';

/**
* Class representing the voice command system.
*
*/
export default class VoiceCommand {
  /**
  * Init the speech recognition,
  * the grammar list and the recognition event.
  *
  */
  constructor() {
    this._SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    this._SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList;
    this._SpeechRecognitionEvent = window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent;

    this._recognition = new this._SpeechRecognition();
    this._speechRecognitionList = new this._SpeechGrammarList();

    this._grammar = '';
    this._nav_commands = [
      'all',
      'active',
      'completed'
    ];

    this._commands = [
      'plus',
      'remove',
      'clear',
      'check',
      'everything'
    ];

    this._getGrammar();
    this._init();
  }

  /**
  * start voice recognition.
  *
  * @param {Callback} resultCb returns the voice recognition result.
  * @param {Callback} endCb stop voice recognition.
  */
  startCommand(resultCb, endCb) {
    this._recognition.start();
    this._getResult(resultCb);
    this.stopCommand(endCb);
  }

  /**
  * stop voice recognition.
  *
  * @param {Callback} callback call after stoping the voice recognition.
  */
  stopCommand(callback) {
    this._recognition.onspeechend = _ => {
        this._recognition.stop();
        callback();
    };
  }

  _init() {
    this._recognition.grammars = this._speechRecognitionList;
    //this._recognition.continuous = false;
    this._recognition.lang = 'en-US';
    this._recognition.interimResults = false;
    this._recognition.maxAlternatives = 1;
  }

  /**
  * set grammar list.
  *
  */
  _getGrammar() {
    this._grammar = `#JSGF V1.0; grammar commands; public <command> = ${this._commands.concat(this._nav_commands).join(' | ')}`;
    this._speechRecognitionList.addFromString(this._grammar, 1);
  }

  /**
  * get voice recognition result.
  *
  * @param {Callback} callback return result.
  */
  _getResult(callback) {
    this._recognition.onresult = event => {
      const last = event.results.length - 1;
      const confidence = event.results[0][0].confidence;
      const transcript = event.results[last][0].transcript;

      //split command and task.
      const result = transcript.split(' ')
      const command = result.shift().toLowerCase();
      const task = result;

      console.log(confidence);
      console.log(task);
      console.log(command);

      //check the recognition confidence.
      if (confidence >= 0.7) {
        if (this._nav_commands.includes(command)) callback(null, command, null);
        else if (this._commands.includes(command)) callback(null, command, task);
        else callback(`${command} command not found, please see the commands list.`, command, task);
      } else {
        callback('Not sure what do you mean?', command, task);
      }
    };
  }
}
