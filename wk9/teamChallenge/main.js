document.onkeypress = function(event) {
    let a = document.querySelector(`audio[data-key= '${event.keyCode}']`);
    let d = document.querySelector(`div[data-key= '${event.keyCode}']`);
    
    d.classList.add("playing");  
    a.addEventListener('transitionend', d.classList.remove("playing"));
    console.dir(a);
    a.currentTime = 0;
    a.play();
}