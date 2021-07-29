import {
  logOut,
  savePost,
  getPost,
  deletePost,
} from '../firebase/fireBase-function.js';

export const Nav = () => {
  const containerNav = document.createElement('section');
  const container = document.createElement('nav');
  // containerNav.classList = 'disable';
  const menuBurguer = document.getElementById('menuBurguer');

  // funcion toggle ícono de menu
  menuBurguer.addEventListener('click', () => {
    menuBurguer.classList.toggle('fa-times');
    containerNav.classList.toggle('disable');
  });

  container.innerHTML = `
  <ul class='navApp' id='menuDropdown'>
    <li><a href='#/application' class='linkNav'> Inicio </a></li>
    <li><a href='#/profile' class='linkNav'> Mi Perfil </a> </li>
    <li><a href='#/top' class='linkNav'> Top </a></li>
    <li class= "logOut"><a href='#/login'class='linkNav' > Log Out </a></li>
  </ul>
    `;
  containerNav.appendChild(container);
  const linklogOut = containerNav.querySelector('.logOut');

  // Llamar funcion para desloguear
  linklogOut.addEventListener('click', (event) => {
    menuBurguer.classList.toggle('fa-times');
    menuBurguer.classList = ('disable');
    event.preventDefault();
    logOut();
    window.location.hash = '#/login';
    localStorage.clear();
  });

  return containerNav;
};

/* **********Función para mostrar todos los posts********** */
const showAllPosts = async (section) => {
  const posts = await getPost();
  const emailUser = localStorage.getItem('email1');
  // console.log(emailUser);
  posts.forEach((doc) => { // recorre todos los posts obtenidos
    const newSection = document.createElement('section');
    const postId = doc.data();
    postId.id = doc.id;
    newSection.innerHTML += `
    <section class='postTemplate'>
    <p class='userNameTag'>${doc.data().name}</p>
    <textarea readonly='readonly' class='areaPost'>${doc.data().post}</textarea>
    <section id="iconos" class="icons sectionIcons ${doc.data().name === emailUser ? 'show' : 'hidden'}">
      <i class="fas fa-edit btnEdit"></i>
      <i class="fas fa-trash btnDelete" data-id="${postId.id}"></i>
    </section>
    <section class='icons sectionIcons '>
      <i class="fas fa-comment-alt"></i>
      <i class="fas fa-heart"></i>
    </section>
    </section>`;
    section.appendChild(newSection);
  });
};

export const appSection = () => {
  const containerAll = document.createElement('section');
  const containerApp = document.createElement('section');
  containerApp.className = 'postSection';
  containerApp.innerHTML = `
    <section class="makePost">
      <input type="text" class="inputType" id="searchInput" placeholder="Buscar">
      <textarea class="inputType" id="postTextarea" placeholder="Comparte con la comunidad"></textarea>
      <button class="button" id="btnPost">Publicar</button>
    </section>
    <section id="containerPosts">
    </section>
    `;

  // const deletePost = (id) => dataBase.collection('posts').doc(id).delete();
  containerAll.appendChild(containerApp);
  const btnPost = containerAll.querySelector('#btnPost'); // Captura el botón para publicar
  const postSection = containerAll.querySelector('#containerPosts'); // Captura la sección donde se va a publicar

  // Funcion Delete post
  const btnDelete = document.querySelector('#root');
  btnDelete.addEventListener('click', async (e) => {
    if (e.target.className === 'fas fa-trash btnDelete') {
      await deletePost(e.target.dataset.id);
      postSection.innerHTML = '';
      showAllPosts(postSection);
    }
  });

  showAllPosts(postSection);
  // llama a la funcion para guardar post y le pasa como argumento el post
  btnPost.addEventListener('click', async (event) => { // pasa el evento al botón para publicar
    event.preventDefault();
    const post = containerAll.querySelector('#postTextarea').value; // al dar click, captura el valor ingresado en el textarea
    const emailUser = localStorage.getItem('email');
    savePost(emailUser, post);
    containerAll.querySelector('#postTextarea').value = ''; // cosa rara
    // mostrar();
    postSection.innerHTML = '';
    showAllPosts(postSection);
  });
  return containerAll;
};
