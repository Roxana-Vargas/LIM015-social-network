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
    <input type="text" class="inputType"  id="nameUser" placeholder="Nombre"/><br>
    <input type="email" class="inputType"  id="emailRegister" placeholder="user@example.com" autocomplete="on"/><br>
    <span id="errorEmail" class="error"></span>
    <input type="password" class="inputType" id="passwordRegister" placeholder="Contraseña" autocomplete="on"/><br>
    <span id="errorPassword" class="error"></span>
    <input type="password" class="inputType" id="passwordConfirmRegister" placeholder="Confirma tu contraseña" autocomplete="on"/><br>
    <span id="errorConfirmPassword" class="error"></span>
    <span id="errorAll" class="error"></span>
    <button type = "submit" class="button" class="inputType" id="btnRegister">Registrar</button>
  </form>
  `;
  // const auth = firebase.auth();
  containerAll.appendChild(containerRegister);
  const btnRegister = containerAll.querySelector('#btnRegister');

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
    if (emailRegister === '' || passwordRegister === '' || name === '' || passwordConfirm === '') {
      messages.push('Llenar todos los campos');
      errorAll.innerHTML = messages;
      console.log(messages);
    } else if (passwordRegister.length < 6) {
      messages.push('La contraseña debe contener mínimo 6 carácteres');
      errorPassword.innerHTML = messages;
      console.log(messages);
    } else if (passwordRegister !== passwordConfirm) {
      messages.push('Las contraseñas deben coincidir');
      errorConfirmPassword.innerHTML = messages;
      console.log(messages);
    } else {
      // registerUser(emailRegister, passwordRegister);
      errorEmail.innerText = registerUser(emailRegister, passwordRegister);
    }
  });
  return containerAll;
};
