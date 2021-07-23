export const Nav = () => {
  const containerNav = document.createElement('section');
  const container = document.createElement('nav');

  container.innerHTML = `
    <ul>
      <li><a href='#/application'"> Inicio </a></li>
      <li><a href='#/profile'> Mi Perfil </a> </li>
      <li><a href='#/top'> Top </a></li>
      <li class= "logOut"><a href='#/login'> Log Out </a></li>
    </ul>
    `;
  containerNav.appendChild(container);
  const logOut = containerNav.querySelector('.logOut');

  logOut.addEventListener('click', (event) => {
    event.preventDefault();
    const auth = firebase.auth();
    auth.signOut().then(() => {
      console.log('Deslogueado');
      window.location.hash = '#/login';
    });
  });

  return containerNav;
};

export const appSection = () => {
  const containerApp = document.createElement('section');
  containerApp.className = 'postSection';
  containerApp.innerHTML = `
    <section class="makePost">
      <input type="text" class="inputType" id="searchInput" placeholder="Buscar">
      <textarea class="inputType" id="postTextarea" placeholder="Comparte con la comunidad"></textarea>
      <button class="button" id="btnPost">Publicar</button>
    </section>
    <section>
    </section>
    `;
  return containerApp;
};
