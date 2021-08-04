import { registerUser } from '../firebase/fireBase-function.js';

export const registerSection = () => {
  const containerAll = document.createElement('section');
  const containerRegister = document.createElement('section');
  containerRegister.className = 'registerSection';
  containerRegister.innerHTML = `
  <section>
    <p class="greetings">¡Conecta con otros programadores!</p>
  </section>
  <form class="formRegister">
    <p class="text">Regístrate</p>
    <input type="text" class="inputType"  id="nameUser" placeholder="Nombre"/></span><br>
    <input type="email" class="inputType"  id="emailRegister" placeholder="Email" autocomplete="on"/><br>
    <input type="password" class="inputType" id="passwordRegister" placeholder="Contraseña ...." autocomplete="on"/><br>
    <input type="password" class="inputType" id="passwordConfirmRegister" placeholder="Confirma tu contraseña ...." autocomplete="on"/><br>
    <button type = "submit" class="button" class="inputType" id="btnRegister">Registrar</button>
    
  </form>
  `;
  // const auth = firebase.auth();
  containerAll.appendChild(containerRegister);
  const btnRegister = containerAll.querySelector('#btnRegister');

  btnRegister.addEventListener('click', (event) => {
    // const auth = firebase.auth();
    event.preventDefault();
    const emailRegister = containerAll.querySelector('#emailRegister').value;
    const passwordRegister = containerAll.querySelector('#passwordRegister').value;
    registerUser(emailRegister, passwordRegister);
  });
  return containerAll;
};
