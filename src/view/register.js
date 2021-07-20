export const registerSection = () => {
  // const root = document.getElementById('root');

  const containerRegister = document.createElement('section');
  containerRegister.className = 'registerSection';
  containerRegister.innerHTML = `
  <section>
    <p>¡Conecta con otros programadores!</p>
  </section>
  <section>
    <p>Regístrate</p>
    <input type="text"  id="nameUser" placeholder="Nombre"/><br>
    <input type="email"  id="email" placeholder="Email"/><br>
    <input type="password"  id="password" placeholder="Contraseña ...."/><br>
    <input type="password"  id="passwordConfirm" placeholder="Confirma tu contraseña ...."/><br>
    <button class="button" id="btnRegister"><a href="#/login">Registrar</a></button>
  `;
  return containerRegister;
  // root.appendChild(containerRegister);
};
