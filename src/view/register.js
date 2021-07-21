export const registerSection = () => {
  // const root = document.getElementById('root');

  const containerRegister = document.createElement('section');
  containerRegister.className = 'registerSection';
  containerRegister.innerHTML = `
  <section>
    <p class="greetings">¡Conecta con otros programadores!</p>
  </section>
  <section class="inputBox">
    <p class="text">Regístrate</p>
    <input type="text" class="inputType"  id="nameUser" placeholder="Nombre"/><br>
    <input type="email" class="inputType"  id="email" placeholder="Email"/><br>
    <input type="password" class="inputType" id="password" placeholder="Contraseña ...."/><br>
    <input type="password" class="inputType" id="passwordConfirm" placeholder="Confirma tu contraseña ...."/><br>
    <button class="button" class="inputType" id="btnRegister"><a href="#/login">Registrar</a></button>
  `;
  return containerRegister;
  // root.appendChild(containerRegister);
};
