export function getJSON(url, options = null) {
    return fetch(url, options).then(response => {
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