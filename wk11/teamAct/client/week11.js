import Auth from './auth.js';
const myAuth = new Auth();

document.getElementById('submit').addEventListener('touchEnd', (event) => {
    event.preventDefault();
    myAuth.login();
});