const baseUrl = 'https://pokeapi.co/api/v2/';

const myList = document.getElementById('container');

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

createList(1);

async function createList(gen) {
    const genUrl = `generation/${gen}`;
    getJson(genUrl).then(data => {
        let unsortedList = [];
        // .map creates a new array and possible modify it
        const newArray = data.pokemon_species.map(item => {
            let nItem = {
                            "id" : item.url.substring(42, (item.url.length - 1)), // this is how the list will be sorted
                            "name" : item.name.charAt(0).toUpperCase() + item.name.substring(1),
                            "url" : item.url
                        };
                        
            unsortedList.push(nItem);
        });
    
        // sort the list by the pokemon's id
        unsortedList.sort((a, b) => {
            return (a.id - b.id);
        });
    
        // now we need to get the pokemon's sprite
        let sortedList = unsortedList.map(item => {
            let listItem = `<div class="cell" data-url='${item.url}' id='${item.id}'>${item.name}<br><img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${item.id}.png" alt="${item.name}"></div>`;
            
            return listItem;
        }).join('');
    
        myList.innerHTML = sortedList;

        queryAll();
    });
}

function queryAll() {
    let allCells = document.getElementsByClassName('cell');
    for(var i = 0; i < allCells.length; i++) {
       allCells[i].addEventListener('click', event => {
        let pokemonId = event.currentTarget.id;
        if(pokemonId != null) {
            getOnePokemon(pokemonId);
            document.getElementById('info').style.margin = "0"; 
        }
       });
    }
            
}

async function getOnePokemon(id) {
    let data = await getJson(`pokemon/${id}`);
    let infoElements = document.getElementById('info').childNodes;
    console.log(infoElements);
    /*
        infoElements[3]: name
        5: container for images
        7: container for abilities
        11: ul for moveset
    */
    // change the title to the Pokemon's name
    infoElements[3].innerHTML = data.name.charAt(0).toUpperCase() + data.name.substring(1);
    // add the sprites
    infoElements[9].innerHTML = `<img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png" alt="${data.name}">`;
    infoElements[11].innerHTML= `<img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${id}.png" alt="${data.name}">`;
   
}

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
    document.getElementById('info').style.margin = '0 0 0 100%';
});


// change the content by the generation
document.getElementById('gen').addEventListener('change', event => {
    const newGen = document.getElementById('gen').value;
    createList(newGen);
});
