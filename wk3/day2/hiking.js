function displayHikeList() {
    const hikeListElement = document.getElementById('hikes');
    // make sure the element is empty
    hikeListElement.innerHTML = '';
    hikeList.forEach(hike => {
        hikeListElement.appendChild(buildHikeHtmlDetailed(hike));
    });
}

function buildHikeHtml(hike) {
    // the hard way
    // // create new list item element
    // const item = document.createElement('li');
    // const img = document.createElement('img');
    // img.src = "./hiking-start_files/" + hike.imgSrc;
    // img.alt = hike.imgAlt;
    // item.appendChild(img);
    // const title = document.createElement('h2');
    // title.innerText = hike.name;
    // item.appendChild(title);
    // // more stuff here
    // console.dir(item);
    // return item;
}

// easy way
function buildHikeHtmlDetailed(hike) {
    // create new list item element
    const item = document.createElement('li');
    // add the class to the li
    item.classList.add('light');
    // the 'back ticks' (``) allow for in-string interpulation
    // copy and pasted from main page
    item.innerHTML = `<img src="./hiking-start_files/${hike.imgSrc}" alt="${hike.imgAlt}">
    <h2>${hike.name}</h2>
    <div>
      <h3>Distance</h3>
      <p>${hike.distance}</p>
    </div>
    <div>
      <h3>Difficulty</h3>
      <p>${hike.difficulty}</p>
    </div>
    <div>
      <h3>Description</h3>
      <p>${hike.description}</p>
    </div>
    <div>
      <h3>How to get there</h3>
      <p>
       ${hike.directions}
      </p>
    </div>`;

    return item;
}

// this executes before the page is loaded, causing problems
//displayHikeList();

// we need to wait for it to load first
// window.onload = displayHikeList;

// the more common way is:
// param1 is the event that we are listening for, param2 is the function to be executed once param1 is fulfilled
window.addEventListener('load', displayHikeList);