export const registerSection = () => {
  // const root = document.getElementById('root');

  const containerRegister = document.createElement('section');
  containerRegister.className = 'registerSection';
  containerRegister.innerHTML = `
  <section>
    <p class="greetings">¡Conecta con otros programadores!</p>
  </section>
  <form class="formRegister">
    <p class="text">Regístrate</p>
    <input type="text" class="inputType"  id="nameUser" placeholder="Nombre"/><br>
    <input type="email" class="inputType"  id="emailRegister" placeholder="Email" autocomplete="on"/><br>
    <input type="password" class="inputType" id="passwordRegister" placeholder="Contraseña ...." autocomplete="on"/><br>
    <input type="password" class="inputType" id="passwordConfirmRegister" placeholder="Confirma tu contraseña ...." autocomplete="on"/><br>
    <button class="button" class="inputType" id="btnRegister"><a href="#/login">Registrar</a></button>
  </form>
  `;
  return containerRegister;
  // root.appendChild(containerRegister);
};
