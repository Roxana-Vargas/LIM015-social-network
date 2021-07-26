export const Nav = () => {
  const containerNav = document.createElement('section');
  const container = document.createElement('nav');
  containerNav.classList = 'disable';
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
  const logOut = containerNav.querySelector('.logOut');

  // Función para cerrar sesión
  logOut.addEventListener('click', (event) => {
    menuBurguer.classList.toggle('fa-times');
    menuBurguer.classList = ('disable');
    event.preventDefault();
    const auth = firebase.auth();
    auth.signOut().then(() => {
      window.location.hash = '#/login';
    });
  });

  return containerNav;
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
  // llamar a la base de datos desde firebase
  const dataBase = firebase.firestore();

  // funcion para guardar publicaciones en la base de datos
  const savePost = (post) => {
    dataBase.collection('posts').doc().set({ // guarda datos en una colección que se llame "posts", y dentro de este documento vamos a guardar los datos que en este caso será el post
      post,
    });
  };

  // función para obtener todas las publicaciones
  const getPost = () => dataBase.collection('posts').get(); // desde la base de datos, de la colleción posts, obtener los datos, es decir, los posts

  // función para eliminar publicaciones
  const deletePost = (id) => dataBase.collection('posts').doc(id).delete();

  // Mostrar publicaciones
  containerAll.appendChild(containerApp);
  const btnPost = containerAll.querySelector('#btnPost'); // Captura el botón para publicar
  const postSection = containerAll.querySelector('#containerPosts'); // Captura la sección donde se va a publicar

  btnPost.addEventListener('click', async (event) => { // pasa el evento al botón para publicar
    event.preventDefault();
    const post = containerAll.querySelector('#postTextarea').value; // al dar click, captura el valor ingresado en el textarea
    await savePost(post); // llama a la funcion para guardar post y le pasa como argumento el post
    // llama a la funcion getPost para obtener los posts
    containerAll.querySelector('#postTextarea').value = ''; // cosa rara
    const posts = await getPost();
    postSection.innerHTML = '';
    posts.forEach((doc) => { // recorre todos los posts obtenidos
      const postsData = doc.data();
      postsData.id = doc.id;
      postSection.innerHTML += `
      <section class='postTemplate'>
      <p class='userNameTag'>UserName</p>
      <textarea readonly='readonly' class='areaPost'>${doc.data().post}</textarea>
       <section class='icons sectionIcons'>
        <i class="fas fa-edit btnEdit" data-id="${postsData.id}"></i>
        <i class="fas fa-trash btnDelete" data-id="${postsData.id}"></i>
        <i class="fas fa-comment-alt"></i>
        <i class="fas fa-heart"></i>
       </section>
      </section>`;

      // eliminar  publicaciones
      const btnsDelete = containerAll.querySelectorAll('.btnDelete'); // seleccionar todos los botones
      btnsDelete.forEach((btn) => { // recorre todos los botones
        btn.addEventListener('click', async (e) => { // cuando da click, con e.target detectó el elemento que desencadenó el evento
          await deletePost(e.target.dataset.id); // llamo la función para eliminar post y le paso id
          // location.reload();
        });
      });
    });
  });
  return containerAll;
};
