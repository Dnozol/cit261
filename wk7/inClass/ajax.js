// // fetch
// const data = fetch('./data.json');
// // when the promise resolves ...
// data.then(response => {
//     console.log('response', response);
//     return response.json(); // this returns a promise
// }).then(stuff=> {
//     console.log(stuff); // this executes when the response.json is finished;
// });
// console.log(data);

// // function longProcess() {
// //     setTimeout(() => {
// //         return 42;
// //     }, 200); // waits 200 ms
// // }

// // console.log('total:', 10 + longProcess()); // this will show NaN because it's trying to add 10 to a value that doesn't exist yet!

// function longProcess() {
//     return new Promise((resolve, reject)=> {
//         setTimeout(() => {
//            resolve(42);
//         }, 200);
//     });
// }


// longProcess().then((results) => {
//     console.log('total:', 10 + results);
// });
 
const baseUrl = 'https://pokeapi.co/api/v2/';

function getJson(url) {
    return fetch(baseUrl + url).then(response => {
        // just because we got a response, doesn't mean it's a good one
        // error check
        if(response.ok) {
            return response.json();
        } else {
            //something went wrong
            console.log('error');
            throw new Error('response not ok');
        }
    }).catch(err => {
        // this executes when there was a problem
        console.log('getJSON', err);
    });
}

const myList = document.getElementById('list');

getJson('type/13').then(data => {
    // .map creates a new array and possible modify it
    const newArray = data.pokemon.map(item => {
        let listel = `<li id='${item.pokemon}' data-stat='${item.pokemon["height"]}' >${item.pokemon.name}</li>`;
        return listel;
    }).join(''); // this makes it all one string without a delimeter
    myList.innerHTML = newArray;
    bindTouch('#list', event => {
        console.log(event);
    });
});


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

