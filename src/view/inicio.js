import {
  loginUser,
  loginGoogle,
  loginFacebook,
} from '../firebase/fireBase-function.js';

export const loginSection = () => {
  const containerAll = document.createElement('section');
  const containerLogin = document.createElement('section');
  containerLogin.className = 'loginSection';
  containerLogin.innerHTML = `
    <section>
      <p class="greetings">¡Resuelve tus dudas y conecta con otros programadores!</p>
    </section>
    <form class="formLogin">
      <p class="text">Iniciar sesión</p>
      <input type="email"  class="inputType" id="emailLogin" placeholder="Email..."/>
      <span id="errorEmailLogin" class="error"></span><br>
      <input type="password"  class="inputType" id="passwordLogin" placeholder="Password..." autocomplete="on"/>
      <span id="errorpasswordLogin" class="error"></span><br>
      <span id="errorAllLogin" class="error"></span><br>
      <section class="buttonSection">
        <button  class="button" id="btnLogin">Login</button>
        <a href="" class="link">¿Olvidaste tu contraseña?</a>
      </section>
      <section class="sectionIcons">
      <a href=""><i class="fab fa-facebook facebook"></i></a>
      <a href=""><i class="fab fa-google google"></i></a>
    </form>
    </section>
    <section class="linkRegister">
      <p class="text">¿No tienes cuenta?  <span><a href="#/register" id="linkRegister" class="link">Registrate aquí</a></span></p>
    </section>
  `;
  containerAll.appendChild(containerLogin);
  const btnLogin = containerAll.querySelector('#btnLogin');

  btnLogin.addEventListener('click', (event) => {
    event.preventDefault();
    const emailLogin = containerAll.querySelector('#emailLogin').value;
    const passwordLogin = containerAll.querySelector('#passwordLogin').value;

    const errorAllLogin = containerAll.querySelector('#errorAllLogin');
    const errorEmailLogin = containerAll.querySelector('#errorEmailLogin');
    const errorpasswordLogin = containerAll.querySelector('#errorpasswordLogin');
    const regex = /^(([^<>()[\]\\.,;:\s@”]+(\.[^<>()[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;
    const messages = [];

    if (emailLogin === '' || passwordLogin === '') {
      messages.push('Debe llenar todos los campos');
      errorAllLogin.innerHTML = messages;
      errorEmailLogin.innerHTML = '';
      errorpasswordLogin.innerHTML = '';
    } else if (passwordLogin.length < 6) {
      messages.push('Contraseña no es valida');
      errorpasswordLogin.innerHTML = messages;
      errorEmailLogin.innerHTML = '';
      errorAllLogin.innerHTML = '';
    } else if (regex.test(emailLogin) === false) {
      errorEmailLogin.innerHTML = 'No es un correo válido o la contraseña es incorrecta';
      errorAllLogin.innerHTML = '';
      errorpasswordLogin.innerHTML = '';
    } else if (regex.test(emailLogin) === true) {
      loginUser(emailLogin, passwordLogin);
      localStorage.setItem('email1', emailLogin);
    }
  });

  const google = containerAll.querySelector('.google');
  google.addEventListener('click', (event) => {
    event.preventDefault();
    loginGoogle();
  });

  const facebook = containerAll.querySelector('.facebook');
  facebook.addEventListener('click', (event) => {
    event.preventDefault();
    loginFacebook();
  });

  return containerAll;
};
