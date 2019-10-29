
let commentList = [];

function getAllComments() {

}
function saveComment(hikeName, key) {
    const newComment = {
        name: hikeName,
        date: new Date(),
        content: comment
    };
    commentList.push(newComment);
    writeToLS(key);
}

function renderCommentList(hikeList, element) {
    //element.innerHTML = "";
    console.log('rendering...');
    console.log(element);
    // commentList.forEach(comment => {
    //     const element
    // });
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

// localStorage
function readFromLS(key) {
    return JSON.parse(localStorage.getItem(key));
}

function writeToLS(key) {
    localStorage.setItem(key, JSON.stringify(taskList));
}

class Comment {
    constructor(listElement, key) {
        this.listElement = listElement;
        this.key = key;
        
        //bindTouch('#addButton', this.addComment.bind(this)); 
        let startList = readFromLS(key);
        // startList.forEach(comment => {
        //     commentList.push(comment);
        // });
        this.showCommentsList();
        this.addComment();
    }


    addComment(event) {
        const input = document.querySelector(''); // name of hike
        saveComment(input.nodeValue, this.key);
        this.showCommentsList();
    }

    showCommentsList(event) {
        console.log(event);
       // renderCommentList(commentList, document.getElementsByTagName("button")[0]);
    }
}



export default Comment;