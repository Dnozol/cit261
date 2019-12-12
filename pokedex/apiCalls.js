
const baseUrl = 'https://pokeapi.co/api/v2/';

const myList = document.getElementById('container');


export async function createList(gen) {
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

export async function getOnePokemon(id) {
    let data = await getJson(`pokemon/${id}`);
    
    // change the title to the Pokemon's name
    document.getElementById("title").innerHTML = data.name.charAt(0).toUpperCase() + data.name.substring(1);
    // add the sprites
    document.getElementById("normImg").innerHTML = `<img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png" alt="${data.name}">`;
    document.getElementById("shinImg").innerHTML= `<img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${id}.png" alt="${data.name}">`;
    
    // create a list of the abilities and moves
    let abilitesList = document.getElementById("abilitiesSection");
    let movesList = document.getElementById("movesList");
    // clear out the current contents
    abilitesList.innerHTML = "";
    movesList.innerHTML = "";

    for(let i = 0; i < data.abilities.length; i++){
        let item = `<p>${data.abilities[i].ability.name.charAt(0).toUpperCase() + data.abilities[i].ability.name.substring(1)}</p>`;
        abilitesList.innerHTML += item;
    }

    for(let i = 0; i < data.moves.length; i++) {
        let item = `<div data-url="${data.moves[i].move.url}">${data.moves[i].move.name.charAt(0).toUpperCase() + data.moves[i].move.name.substring(1)}</div>`;
        movesList.innerHTML += item;
    }
}

function queryAll() {
    let allCells = document.getElementsByClassName('cell');
    for(var i = 0; i < allCells.length; i++) {
       allCells[i].addEventListener('click', event => {
        let pokemonId = event.currentTarget.id;
        if(pokemonId != null) {
            getOnePokemon(pokemonId);
            document.getElementById('info').style.opacity = "1"; 
            document.getElementById('info').style.zIndex = "1"; 
        }
       });
    }
            
}