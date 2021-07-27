import {
  loginUser,
  loginGoogle,
  loginFacebook,
  templatedeprueba,
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
      <input type="email"  class="inputType" id="emailLogin" placeholder="Email..."/><br>
      <input type="password"  class="inputType" id="passwordLogin" placeholder="Password..." autocomplete="on"/><br>
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
      <p class="text">¿No tienes cuenta?</p><a href="#/register" id="linkRegister" class="link">Registrate aquí</a>
    </section>
  `;
  containerAll.appendChild(containerLogin);
  const btnLogin = containerAll.querySelector('#btnLogin');

  btnLogin.addEventListener('click', (event) => {
    event.preventDefault();
    const emailLogin = containerAll.querySelector('#emailLogin').value;
    const passwordLogin = containerAll.querySelector('#passwordLogin').value;
    loginUser(emailLogin, passwordLogin);
    templatedeprueba();
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
