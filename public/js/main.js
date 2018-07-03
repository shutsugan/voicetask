'use strict';

import ShowDialog from './dialog.js';
import VoiceCommand from './voicecommand.js';
import TaskView from './taskview.js';
import TaskModel from './taskmodel.js';
import TaskController from './taskcontroller.js';

//show the voice commands
new ShowDialog('.show-dialog');

new TaskController(new TaskView(), new TaskModel('tasks'), new VoiceCommand());
