const baseUrl = 'https://pokeapi.co/api/v2/';

function getJson(url) {
    console.log("getjson");
    return fetch(url).then(response => {
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

async function getPokemonList() {
    console.log("getpkmn");
    const listElement = document.getElementById('list');
    const data = await getJson(baseUrl + 'type/3');
    // do something with our data
    // get Json returns a promise, .then allows use to do something with it
    data.pokemon.forEach(element => {
        listElement.appendChild(renderPokemon(element));
    });
}

function renderPokemon(pokemon) {
    const item = document.createElement('li');
    item.innerHTML = pokemon.pokemon.name;
    return item;
}

getPokemonList();