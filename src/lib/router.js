// Moverse de pantalla inicio a pantalla registro
import {loginSection} from './view/inicio.js';
import {registerSection} from './view/register.js';

const start = document.getElementById('btnStart');
    start.addEventListener('click', function(){ 
    document.querySelector('#welcome').classList.add('oculto');
    loginSection();
    document.querySelector('.loginSection').classList.add('visible');
    });

const register = document.getElementById('linkRegister');
    register.addEventListener('click', () => { 
    document.querySelector('.loginSection').classList.remove('visible');
    document.querySelector('.loginSection').classList.add('oculto');
    registerSection();
    document.querySelector('.registerSection').classList.add('visible');
    });


    // <a href="#section2">Go to Section 2</a>

    // <div class='registerContainer'>
    //   <p>¿Eres nuevo? <a href='#/register'>Registrate aqui</a></p>
    // </div>


    
    