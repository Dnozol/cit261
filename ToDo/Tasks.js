import { qs, geid } from './utilities.js';
import { celi } from './utilities.js';

let taskList = [];

// multiple event listeners
function bindTouch(elementSelector, callback) {
    const element = qs(elementSelector);
    // if 'clicked' on a desktop touchEnd would be ignored
    element.addEventListener('touchEnd', event => {
        // prevents the click
        event.preventDefault();
        callback();
    });
    element.addEventListener('click', callback);
}

// localStorage
function readFromLS(key) {
    return JSON.parse(localStorage.getItem(key));
}

function writeToLS(key) {
    localStorage.setItem(key, JSON.stringify(taskList));
}

function saveTask (task, key) {
    const newTask = {
        id: new Date(),
        name: task,
        completed: false 
    };
    taskList.push(newTask);
    writeToLS(key);
}

class Tasks {
    // key is for using LocalStorage
    constructor(listElement, key) {
        this.listElement = listElement;
        this.key = key;
        // we need to bind 'this' so it doesn't get changed when it's passed
        bindTouch('#addButton', this.addTask.bind(this)); 
    }

    //functions
    // class functions don't include function key word
    addTask() {
        const input = qs('#addTask');
        saveTask(input.value, this.key);
        this.showList();
    }
    showList() {
        const listItem = celi();

        taskList.forEach(task => {

            listItem.appendChild(document.createTextNode(JSON.stringify(task)));
        });
        console.log(listItem);
        qs('#taskList').innerHTML = listItem;
    }
}

export default Tasks;