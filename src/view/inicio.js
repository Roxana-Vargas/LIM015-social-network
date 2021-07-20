export const loginSection = () => {
  // const root = document.getElementById('root');

  const containerLogin = document.createElement('section');
  containerLogin.className = 'loginSection';
  containerLogin.innerHTML = `
    <section>
      <p>¡Resuelve tus dudas y conecta con otros programadores!</p>
    </section>
      <section>
        <p>Iniciar sesión</p>
        <input type="email"  id="email" placeholder="Email..."/><br>
        <input type="password"  id="password" placeholder="Password..."/><br>
        <button><a href="#/application">Login</a></button>
        <a href="">¿Olvidaste tu contraseña?</a>
      </section>
        <a href="">Facebook</a>
        <a href="">Google</a>
        <section>
        <p>¿No tienes cuenta?</p><a href="#/register" id="linkRegister">Registrate aquí</a>
      </section>
    `;
  return containerLogin;
  // root.appendChild(containerLogin);
};
