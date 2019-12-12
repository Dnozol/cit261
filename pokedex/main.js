import {createList, getOnePokemon} from './apiCalls.js';


createList(1);


// multiple event listeners
function bindTouch(elementSelector, callback) {
    const element = document.querySelector(elementSelector);
    // if 'clicked' on a desktop touchEnd would be ignored
    element.addEventListener('touchEnd', event => {
        // prevents the click
        event.preventDefault();
        callback();
    });

    element.addEventListener('click', callback);
}

bindTouch('#back', event => {
    document.getElementById('info').style.opacity = "0";
    document.getElementById('info').style.zIndex = "-1"; 
});


// change the content by the generation
document.getElementById('gen').addEventListener('change', event => {
    const newGen = document.getElementById('gen').value;
    createList(newGen);
});
