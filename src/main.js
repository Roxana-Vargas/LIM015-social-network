/* Este es el punto de entrada de tu aplicacion

import { myFunction } from './index.js';

myFunction(); */

import { changeView } from './view-controller/router.js';
import { registerUser, loginUser } from './firebase/fireBase-function.js'; 
// import { registerSection } from './view/register.js';

const init = () => {
  // changeView(window.location.hash = '#/');
  changeView(window.location.hash);
  // en que ruta esta pagina
  window.addEventListener('hashchange', () => changeView(window.location.hash));
};

window.addEventListener('load', init); // cada vez que escuches una recarga, ejecuta la funcion init.
registerUser();
loginUser();

// logInform();
/*
const auth = firebase.auth();
// Capturar el valor de inputs y registrar
const signInform = document.querySelector('#root');
signInform.addEventListener('click', (e) => {
  // e.preventDefault();
  console.log(e);
  if (e.target.innerHTML === 'Registrar') {
    console.log('ok');
    const nameUser = document.querySelector('#nameUser').value;
    const email = document.querySelector('#emailRegister').value;
    const password = document.querySelector('#passwordRegister').value;
    console.log(nameUser, email, password);
    auth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        console.log('sign in');
      });
  }
});

// login
const logInform = document.querySelector('#root');
logInform.addEventListener('click', (e) => {
  if (e.target.innerHTML === 'Login') {
    console.log('oklogin');
    const emailLogin = document.querySelector('#emailLogin').value;
    const passwordLogin = document.querySelector('#passwordLogin').value;
    auth.signInWithEmailAndPassword(emailLogin, passwordLogin)
      .then((userCredential) => {
        console.log('login');
      });
  }
}); */
