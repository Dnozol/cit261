import { key } from './keys.js';
import {getJSON} from './utilities.js';

const baseUrl = "https://api.nal.usda.gov/fdc/v1/";

//curl -H "Content-Type: application?json"

//-d '{generalSearchInput":"Cheddar cheese"}'

async function getFood(search) {
    const options = { 
                        method : "post",
                        headers : {"Content-Type": "application/json"},
                        body: JSON.stringify({generalSearchInput: search})
                    };
    return await getJSON(baseUrl + `search?api_key=${key}`, options);
}

function renderList(foodList) {
    document.getElementById("list").innerHTML = foodList.map(item => `<li>${item.description}</li>`).join('');
}

const searchElement = document.getElementById("query");

searchElement.addEventListener('keyup', search);

async function search() {
    const query = searchElement.value;
    if (query.length > 2) {
        const foods = await getFood(query);
        renderList(foods.foods);
    }
}
