import Tasks from './Tasks.js';
import { geid } from './utilities.js';
import { qs } from './utilities.js';
import { qsa } from './utilities.js';

const myToDos = new Tasks(geid('#taskList'), 'todo');