// MODULE
// each module has its own scope
// export is used to make it available outside the the file

// not accessible outside todos.js because it isn't being exported
let liveToDos = [{todo: 'DoStuff'}];

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
    localStorage.setItem(key, JSON.stringify(liveToDos));
}

// for testing
// writeToLS('todo');
// console.log(readFromLS('todo'));

function saveToDo (task, key) {
    const todo = {
        id: new Date(),
        task: task,
        completed: false 
    };
    liveToDos.push(todo);
    writeToLS(key);
}

// we can use this (geid) instead of typing out document.getElementById so frequently
export function geid(idName) {
    return document.getElementById(idName);
}

export function qs(className) {
    return document.querySelector(className);
}

export function qsa(className) {
    return document.querySelectorAll(className);
}

class ToDos {
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
        saveToDo(input.value, this.key);
        this.listToDos();
    }
    listToDos() {
        console.log('worked');
    }
}

// its usually best practice to name the module file the same as the default export
export default ToDos;