export const Nav = () => {
  const containerNav = document.createElement('section');
  const container = document.createElement('nav');

  container.innerHTML = `
    <ul>
      <li><a href='#/application' style="color: black;"> Inicio </a></li>
      <li><a href='#/profile' style="color: black;"> Mi Perfil </a> </li>
      <li><a href='#/top' style="color: black;"> Top </a></li>
      <li class= "logOut"><a href='#/login' style="color: black;"> Log Out </a></li>
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
  // llamar base de datos
  const dataBase = firebase.firestore();
  // funcion para guardar publicaciones
  const savePost = (post) => {
    dataBase.collection('posts').doc().set({
      post,
    });
  };
  // función para obtener publicaciones
  const getPost = () => dataBase.collection('posts').get();
  window.addEventListener('DOMContentLoaded', async (event) => {
    event.preventDefault();
  });
  // Mostrar publicaciones
  containerAll.appendChild(containerApp);
  const btnPost = containerAll.querySelector('#btnPost');
  const postContainer = containerAll.querySelector('#containerPosts');
  btnPost.addEventListener('click', async (event) => {
    event.preventDefault();
    const post = containerAll.querySelector('#postTextarea').value;
    console.log('publicando');
    await savePost(post);
    console.log(post);
    const posts = await getPost();
    console.log(posts);
    postContainer.innerHTML = '';
    posts.forEach(doc => {
      console.log(doc.data());
      postContainer.innerHTML += `<section>
      <p>UserName</p>
      <textarea readonly='readonly'>${doc.data().post}</textarea>
       <section>
        <i class="fas fa-edit"></i>
        <i class="fas fa-trash"></i>
        <i class="fas fa-comment-alt"></i>
        <i class="fas fa-heart"></i>
       </section>
      </section>`;
    });
  });
  // funcion para obtener las publicaciones
  return containerAll;
};
