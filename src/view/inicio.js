export const loginSection = () => {
  // const root = document.getElementById('root');

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
        <button  class="button" id="btnLogin"><a href="#/application">Login</a></button>
        <a href="" class="link">¿Olvidaste tu contraseña?</a>
      </section>
      <section class="sectionIcons">
      <a href=""><i class="fab fa-facebook"></i></a>
      <a href=""><i class="fab fa-google"></i></a>
    </form>
    </section>
    <section class="linkRegister">
      <p class="text">¿No tienes cuenta?</p><a href="#/register" id="linkRegister" class="link">Registrate aquí</a>
    </section>
  `;
  return containerLogin;
  // root.appendChild(containerLogin);
};
