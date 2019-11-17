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

const myList = document.getElementById('container');

getJson('pokedex/national/').then(data => {

    // .map creates a new array and possible modify it
    const newArray = data.pokemon_entries.map(item => {
        console.log(item);
        let listel = `<div id='${item.pokemon_species.name}' >${item.pokemon_species.name}</div>`;
        return listel;
    }).join(''); // this makes it all one string without a delimeter
     myList.innerHTML = newArray;
    bindTouch('#container', event => {
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

