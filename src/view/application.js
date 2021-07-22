export const Nav = () => {
  const container = document.createElement('nav');

  container.innerHTML = `
    <ul>
    <li><a href='#/application' style="color: black;"> Inicio </a></li>    
    <li><a href='#/profile' style="color: black;"> Mi Perfil </a> </li>
    <li><a href='#/top' style="color: black;"> Top </a></li>     
     <li><a href='#/login' style="color: black;"> Log Out </a></li>     
    </ul>
    `;
  return container;
};


export const appSection = () => {
  // const root = document.getElementById('root');

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
  // root.appendChild(containerPost);
};
