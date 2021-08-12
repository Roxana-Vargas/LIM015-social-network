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
        <div class="imputIcon">
          <i class="fas fa-user"></i>
          <input type="text" class="inputType"  id="nameUser" placeholder="Nombre"/><br>
        </div>
        <br>
      </div>
      <div class="divRegister">
        <div class="imputIcon">
          <i class="fas fa-envelope"></i>
          <input type="email" class="inputType"  id="emailRegister" placeholder="user@example.com" autocomplete="on"/>
        </div>
        <div class="divSpan">
          <span id="errorEmail" class="error"></span><br>
        </div>
      </div>
      <div class="divRegister">
        <div class="imputIcon">
          <i class="fas fa-lock"></i>
          <input type="password" class="inputType" id="passwordRegister" placeholder="Contraseña" autocomplete="on"/>
        </div>
        <div class="divSpan">
          <span id="errorPassword" class="error"></span><br>
        </div>
      </div>
      <div class="divRegister">
        <div class="imputIcon">
          <i class="fas fa-lock"></i>
          <input type="password" class="inputType" id="passwordConfirmRegister" placeholder="Confirma tu contraseña" autocomplete="on"/>
        </div>
        <div class="divSpan">
          <span id="errorConfirmPassword" class="error"></span><br>
        </div>
      </div>
      <span id="errorAll" class="error"></span>
      <button type = "submit" class="button" class="inputType" id="btnRegister">Registrar</button>
  </form>
  </section>
  <section class="linkLogin">
    <p class="text">¿Ya tienes cuenta?  <span><a href="#/login" id="linkLogin" class="link">Inicia sesión</a></span></p>
  </section>
  `;
  containerAll.appendChild(containerRegister);
  const btnRegister = containerAll.querySelector('#btnRegister');
  const linklogin = containerRegister.querySelector('.linkLogin');

  btnRegister.addEventListener('click', (event) => {
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
    if (emailRegister === '' || passwordRegister === '' || name === '' || passwordConfirm === '') {
      messages.push('Llenar todos los campos');
      errorAll.innerHTML = messages;
      errorPassword.innerHTML = '';
      errorConfirmPassword.innerHTML = '';
      errorEmail.innerHTML = '';
    } else if (passwordRegister !== passwordConfirm) {
      messages.push('Las contraseñas deben coincidir');
      errorConfirmPassword.innerHTML = messages;
      errorAll.innerHTML = '';
      errorPassword.innerHTML = '';
      errorEmail.innerHTML = '';
    } else {
      registerUser(emailRegister, passwordRegister)
        .then(() => {
          // emailVerification();
          window.location.hash = '#/login';
        }).catch((err) => {
          const errorCode = err.code;
          if (errorCode === 'auth/email-already-in-use') {
            errorEmail.innerHTML = 'El correo electrónico ya está registrado';
          } else if (errorCode === 'auth/invalid-email') {
            errorEmail.innerHTML = 'Correo electrónico no válido';
          } else if (errorCode === 'auth/weak-password') {
            errorPassword.innerHTML = 'La contraseña debe contener mínimo 6 carácteres';
          }
        });
      errorAll.innerHTML = '';
      errorPassword.innerHTML = '';
      errorEmail.innerHTML = '';
      errorConfirmPassword.innerHTML = '';
    }
  });

  linklogin.addEventListener('click', () => {
    window.location.hash = '#/login';
  });
  return containerAll;
};
