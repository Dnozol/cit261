import ToDos from './Todos.js';
import { geid } from './ToDos.js';
import { qs } from './Todos.js';
import { qsa } from './Todos.js';

// geid now replaces document.getElementById
const myToDos = new ToDos(geid('#taskList'), 'todo');
 
console.log(myToDos.key);

geid('test').innerHTML = "Hello World!";