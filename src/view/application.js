import {
  logOut,
  savePost,
  getPost,
  deletePost,
  getPostForEdit,
  updatePost,
  updatelike,
  updateDislike,
} from '../firebase/fireBase-function.js';

export const Nav = () => {
  const menuBurguer = document.getElementById('menuBurguer');
  menuBurguer.classList = 'fas fa-bars';
  const containerNav = document.createElement('section');
  containerNav.classList = 'containerNav';
  const container = document.createElement('nav');
  containerNav.classList = 'disable';

  // funcion toggle ícono de menu
  menuBurguer.addEventListener('click', () => {
    menuBurguer.classList.toggle('fa-times');
    containerNav.classList.toggle('disable');
  });

  container.innerHTML = `
  <section class='sectionNav'>
    <ul class='navApp' id='menuDropdown'>
      <li class='itemNav'><a href='#/application' class='linkNav'> Inicio </a></li>
      <li class='itemNav'><a href='#/profile' class='linkNav'> Mi Perfil </a> </li>
      <li class='itemNav'><a href='#/top' class='linkNav'> Top </a></li>
      <li class= 'logOut itemNav'><a href='#/login'class='linkNav' > Log Out </a></li>
    </ul>
  </section>
    `;
  containerNav.appendChild(container);
  const linklogOut = containerNav.querySelector('.logOut');

  // Llamar funcion para desloguear
  linklogOut.addEventListener('click', (event) => {
    menuBurguer.classList = ('disable');
    event.preventDefault();
    logOut().then(() => {
      window.location.hash = '#/login';
    });
    localStorage.clear();
  });
  return containerNav;
};

/* **********Función para cambiar color a likes********** */
const likeColor = (likesPosts) => {
  const userUid = localStorage.getItem('uid');
  const uidGoogle = localStorage.getItem('uidGoogle');
  if (likesPosts.includes(userUid || uidGoogle)) {
    return 'redHeart';
  }
  return '';
};

/* **********Función para mostrar todos los posts********** */
const showAllPosts = async (section) => {
  const posts = await getPost();
  const emailUser = localStorage.getItem('email1');
  const emailGoogle = localStorage.getItem('emailGoogle');
  posts.forEach((doc) => { // recorre todos los posts obtenidos
    const newSection = document.createElement('section');
    const postId = doc.data();
    postId.id = doc.id;
    newSection.innerHTML += `
    <section class='postTemplate'>
    <p class='userNameTag'>${doc.data().name}</p>
    <textarea readonly class='areaPost' id='${postId.id}'>${doc.data().post}</textarea>
    <section class="sectionIcons">
    <section id="iconos" class="icons sectionIcons ${((doc.data().name === emailUser) || (doc.data().name === emailGoogle)) ? 'show' : 'hidden'}">
      <i class="fas fa-check" data-id="${postId.id}" id='${postId.id}'></i>
      <i class="fas fa-edit btnEdit" data-id="${postId.id}"></i>
      <i class="fas fa-trash btnDelete" data-id="${postId.id}"></i>
    </section>
    <section class='icons sectionIcons '>
      <i class="fas fa-comment-alt"></i>
      <label for = "likeheart">
      <input id="heart" type="checkbox">
      <i class="fas fa-heart ${likeColor(doc.data().array)}" data-id="${postId.id}"><span class="likeNumber">${doc.data().likePost}</span></i>
      </label>
    </section>
    </section>
    </section>
      `;
    section.appendChild(newSection);
  });
};

/* **********Función para editar post********** */
const btnEdit = document.querySelector('#root');
let idPost = '';
btnEdit.addEventListener('click', async (e) => {
  if (e.target.className === 'fas fa-edit btnEdit') {
    const postForEdit = await getPostForEdit(e.target.dataset.id);
    idPost = postForEdit.id;
    const container = document.querySelector('#root');
    const areaPost = container.querySelectorAll('.areaPost');
    areaPost.forEach((element) => {
      const areaPostId = element.id;
      if (areaPostId === idPost) {
        element.removeAttribute('readonly');
        element.classList.add('focus');
      }
    });
    const btnsCheck = container.querySelectorAll('.fa-check');
    btnsCheck.forEach((el) => {
      const checkId = el.id;
      if (checkId === idPost) {
        el.classList.add('visibility');
      }
    });
    btnsCheck.forEach((btn) => {
      btn.addEventListener('click', () => {
        const containerEdited = document.querySelector('#root');
        const postEdited = containerEdited.querySelectorAll('.areaPost');
        postEdited.forEach((el) => {
          const postModified = el.id;
          if (postModified === idPost) {
            const newValuePost = el.value;
            const post = newValuePost;
            updatePost(idPost, {
              post,
            });
          }
          el.classList.remove('focus');
          el.setAttribute('readonly', 'readonly');
          const hideCheck = containerEdited.querySelectorAll('.fa-check');
          hideCheck.forEach((btnCheck) => {
            btnCheck.classList.remove('visibility');
          });
        });
      });
    });
  }
});

export const appSection = () => {
  const containerAll = document.createElement('section');
  const containerApp = document.createElement('section');
  // containerAll.className = 'appSection';
  containerApp.className = 'postSection';
  containerApp.innerHTML = `
    <section class='areaPost'>
      <section class="makePost">
      <input type="text" id="search" placeholder="Buscar">
      <textarea class="inputType" id="postTextarea" placeholder="Comparte con la comunidad"></textarea>
      <span id="errorPost" class="error"></span>
      <button class="button" id="btnPost">Publicar</button>
    </section>
    <section>
    <!-- The Modal -->
      <div id="myModal" class="modal" style="display: none;">
      <!-- Modal content -->
      <div class="modal-content">
      <p>¿Estás seguro que deses eliminar esta publicación?</p>
      <button id="btnAccept" class = "button">Aceptar</button> <button id="btnCancel" class = "button">Cancelar</button>
      </div>
      </div>
    </section>
    <section id="containerPosts">
    </section>
    </section>
    <section class="sectioAside">
    </section>

    `;
  containerAll.appendChild(containerApp);

  const btnPost = containerAll.querySelector('#btnPost'); // Captura el botón para publicar
  const postSection = containerAll.querySelector('#containerPosts'); // Captura la sección donde se va a publicar
  showAllPosts(postSection);
  /* **********Función para eliminar posts********** */
  const btnDelete = document.querySelector('#root');
  btnDelete.addEventListener('click', async (e) => {
    if (e.target.className === 'fas fa-trash btnDelete') {
      const modal = document.querySelector('#root');
      modal.querySelector('#myModal').style.display = 'block';
      const btnAccept = modal.querySelector('#btnAccept');
      btnAccept.addEventListener('click', async () => {
        modal.querySelector('#myModal').style.display = 'none';
        await deletePost(e.target.dataset.id);
        postSection.innerHTML = '';
        showAllPosts(postSection);
      });
      const btnCancel = modal.querySelector('#btnCancel');
      btnCancel.addEventListener('click', () => {
        modal.querySelector('#myModal').style.display = 'none';
      });
    }
  });
  /* **********Función para guardar post y publicar********** */
  btnPost.addEventListener('click', async (event) => { // pasa el evento al botón para publicar
    event.preventDefault();
    const errorPost = containerAll.querySelector('#errorPost');
    const post = containerAll.querySelector('#postTextarea').value; // al dar click, captura el valor ingresado en el textarea
    const emailUser = localStorage.getItem('email');
    const emailGoogle = localStorage.getItem('emailGoogle');
    if (post === '') {
      errorPost.innerHTML = 'Publicacion vacia';
    } else if (emailUser !== null) {
      savePost(emailUser, post);
      containerAll.querySelector('#postTextarea').value = ''; // cosa rara
      errorPost.innerHTML = '';
      postSection.innerHTML = '';
      showAllPosts(postSection);
    } else {
      savePost(emailGoogle, post);
      containerAll.querySelector('#postTextarea').value = ''; // cosa rara
      errorPost.innerHTML = '';
      postSection.innerHTML = '';
      showAllPosts(postSection);
    }
  });
  return containerAll;
};

const btnlike = document.querySelector('#root');
btnlike.addEventListener('click', async (e) => {
  const userUid = localStorage.getItem('uid');
  const uidGoogle = localStorage.getItem('uidGoogle');
  if (e.target.classList.contains('fa-heart')) {
    const postsdos = await getPost();
    postsdos.forEach(async (doc) => {
      const arrayIDLikes = doc.data().array;
      const postId = doc.data();
      postId.id = doc.id;
      if (postId.id === e.target.dataset.id) {
        if (arrayIDLikes.includes(userUid || uidGoogle)) {
          const index = arrayIDLikes.indexOf(userUid);
          const decrement = -1;
          arrayIDLikes.splice(index, 1);
          await updateDislike(e.target.dataset.id, decrement, arrayIDLikes);
          const containerAll = document.querySelector('#root');
          const postSection2 = containerAll.querySelector('#containerPosts');
          postSection2.innerHTML = '';
          showAllPosts(postSection2);
        } else {
          // const increment = firebase.firestore.FieldValue.increment(1);
          const increment = 1;
          await updatelike(arrayIDLikes, e.target.dataset.id, increment, userUid || uidGoogle);
          const containerAll = document.querySelector('#root');
          const postSection2 = containerAll.querySelector('#containerPosts');
          postSection2.innerHTML = '';
          showAllPosts(postSection2);
        }
      }
    });
  }
});
