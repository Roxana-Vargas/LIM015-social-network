import { registerUser } from '../firebase/fireBase-function.js';

const menuBurguer = document.getElementById('menuBurguer');
menuBurguer.classList = 'disable';

export const registerSection = () => {
  const containerAll = document.createElement('section');
  const containerRegister = document.createElement('section');
  containerAll.className = 'containerAll';
  containerRegister.className = 'registerSection';
  containerRegister.innerHTML = `
  <section class="greetingsSection">
    <p class="greetings">¡Conecta con otros programadores!</p>
  </section>
  <section class = "formulario">
  <form class="formRegister">
    <p class="text">Regístrate</p>
    <div class="divRegister">
    <i class="fas fa-user"></i>
    <input type="text" class="inputType"  id="nameUser" placeholder="Nombre"/><br>
    </div>
    <div class="divRegister">
    <i class="fas fa-envelope"></i>
    <input type="email" class="inputType"  id="emailRegister" placeholder="user@example.com" autocomplete="on"/>
    <span id="errorEmail" class="error"></span><br>
    </div>
    <div class="divRegister">
    <i class="fas fa-lock"></i>
    <input type="password" class="inputType" id="passwordRegister" placeholder="Contraseña" autocomplete="on"/>
    <span id="errorPassword" class="error"></span><br>
    </div>
    <div class="divRegister">
    <i class="fas fa-lock"></i>
    <input type="password" class="inputType" id="passwordConfirmRegister" placeholder="Confirma tu contraseña" autocomplete="on"/>
    <span id="errorConfirmPassword" class="error"></span><br>
    </div>
    <span id="errorAll" class="error"></span>
    <button type = "submit" class="button" class="inputType" id="btnRegister">Registrar</button>
  </form>
  </section>
  <section class="linkLogin">
    <p class="text">¿Ya tienes cuenta?  <span><a href="#/login" id="linkLogin" class="link">Inicia sesión</a></span></p>
  </section>
  `;
  // const auth = firebase.auth();
  containerAll.appendChild(containerRegister);
  const btnRegister = containerAll.querySelector('#btnRegister');
  const linklogin = containerRegister.querySelector('.linkLogin');

  btnRegister.addEventListener('click', (event) => {
    // const auth = firebase.auth();
    event.preventDefault();
    const name = containerAll.querySelector('#nameUser').value;
    const emailRegister = containerAll.querySelector('#emailRegister').value;
    const passwordRegister = containerAll.querySelector('#passwordRegister').value;
    const passwordConfirm = containerAll.querySelector('#passwordConfirmRegister').value;
    const errorEmail = containerAll.querySelector('#errorEmail');
    const errorPassword = containerAll.querySelector('#errorPassword');
    const errorConfirmPassword = containerAll.querySelector('#errorConfirmPassword');
    const errorAll = containerAll.querySelector('#errorAll');

    const messages = [];
    const regex = /^(([^<>()[\]\\.,;:\s@”]+(\.[^<>()[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;

    if (emailRegister === '' || passwordRegister === '' || name === '' || passwordConfirm === '') {
      messages.push('Llenar todos los campos');
      errorAll.innerHTML = messages;
      errorPassword.innerHTML = '';
      errorConfirmPassword.innerHTML = '';
      errorEmail.innerHTML = '';
    } else if (passwordRegister.length < 6) {
      messages.push('La contraseña debe contener mínimo 6 carácteres');
      errorPassword.innerHTML = messages;
      errorAll.innerHTML = '';
      errorConfirmPassword.innerHTML = '';
      errorEmail.innerHTML = '';
    } else if (passwordRegister !== passwordConfirm) {
      messages.push('Las contraseñas deben coincidir');
      errorConfirmPassword.innerHTML = messages;
      errorAll.innerHTML = '';
      errorPassword.innerHTML = '';
      errorEmail.innerHTML = '';
    } else if (regex.test(emailRegister) === false) {
      errorEmail.innerHTML = 'No es un correo válido';
      errorAll.innerHTML = '';
      errorPassword.innerHTML = '';
      errorConfirmPassword.innerHTML = '';
    } else if (regex.test(emailRegister) === true) {
      registerUser(emailRegister, passwordRegister);
    }
  });

  linklogin.addEventListener('click', () => {
    window.location.hash = '#/login';
  });
  return containerAll;
};
