import {
  getPost,
  deletePost,
  getPostForEdit,
  updatePost,
  updatelike,
  updateDislike,
  uploadPhoto,
} from '../firebase/fireBase-function.js';
import { showAllPosts } from './templatePost.js';
import { savePost } from '../firebase/firebase-dataBase.js';

const rootContainer = document.querySelector('#root');
export const appSection = () => {
  const emailUser = localStorage.getItem('email');
  const containerAll = document.createElement('section');
  const containerApp = document.createElement('section');
  containerApp.className = 'postSection';
  containerApp.innerHTML = `
    <section class='mainContainer'>
      <section class="userProfile">
        <div class="photoProfile">
          <img class="photo" src="imagenes/person-icon.png"></img>
          <label id="select-profile" for="select-photo-profile">
            <input type="file" id="select-photo-profile" class="inputUploadPhoto hide" accept="image/jpeg, image/png">
            <span class="edit-photo"><i class="fas fa-camera edit-photo-btn"></i></span>
            <button id="subirfoto" class ="btnUploadPhoto button" style="display: none;">Subir foto</button>
          </label>
        </div>
        <div class="user info">
          <p>${emailUser}</p>
        </div>
      </section>
      <section class="makePost">
        <input type="text" id="search" placeholder="Buscar">
        <textarea class="inputType" id="postTextarea" placeholder="Comparte con la comunidad"></textarea>
        <span id="errorPost" class="error"></span>
        <button class="button" id="btnPost">Publicar</button>
      </section>
      <section>
        <div id="myModal" class="modal" style="display: none;">
          <div class="modal-content">
          <p>¿Estás seguro que deses eliminar esta publicación?</p>
          <button id="btnAccept" class = "button">Aceptar</button> <button id="btnCancel" class = "button">Cancelar</button>
          </div>
        </div>
      </section>
      <section id="containerPosts"></section>
    </section>
    <section class="sectioAside"></section>

    `;
  containerAll.appendChild(containerApp);

  /* **********Muestra post al iniciar sesión********** */
  const postSection = containerAll.querySelector('#containerPosts');
  showAllPosts(postSection);

  const btnPost = containerAll.querySelector('#btnPost');
  const errorPost = containerAll.querySelector('#errorPost');
  const emailGoogle = localStorage.getItem('emailGoogle');

  /* **********Función para eliminar posts********** */
  rootContainer.addEventListener('click', async (e) => {
    if (e.target.className === 'fas fa-trash btnDelete') {
      rootContainer.querySelector('#myModal').style.display = 'block';
      const btnAccept = rootContainer.querySelector('#btnAccept');
      btnAccept.addEventListener('click', async () => {
        rootContainer.querySelector('#myModal').style.display = 'none';
        await deletePost(e.target.dataset.id);
        postSection.innerHTML = '';
        showAllPosts(postSection);
      });
      const btnCancel = rootContainer.querySelector('#btnCancel');
      btnCancel.addEventListener('click', () => {
        rootContainer.querySelector('#myModal').style.display = 'none';
      });
    }
  });

  /* **********Función para guardar post y publicar********** */
  btnPost.addEventListener('click', async (event) => {
    event.preventDefault();
    const post = containerAll.querySelector('#postTextarea').value;
    if (post === '') {
      errorPost.innerHTML = 'Publicacion vacia';
    } else if (emailUser !== null) {
      savePost(emailUser, post);
      containerAll.querySelector('#postTextarea').value = '';
      errorPost.innerHTML = '';
      postSection.innerHTML = '';
      showAllPosts(postSection);
    } else {
      savePost(emailGoogle, post);
      containerAll.querySelector('#postTextarea').value = '';
      errorPost.innerHTML = '';
      postSection.innerHTML = '';
      showAllPosts(postSection);
    }
  });
  return containerAll;
};

/* **********Función para dar y quitar like********** */
rootContainer.addEventListener('click', async (e) => {
  const postSection = rootContainer.querySelector('#containerPosts');
  const userUid = localStorage.getItem('uid');
  const uidGoogle = localStorage.getItem('uidGoogle');
  if (e.target.classList.contains('fa-heart')) {
    const posts = await getPost();
    posts.forEach(async (doc) => {
      const arrayIDLikes = doc.data().array;
      const postId = doc.data();
      postId.id = doc.id;
      if (postId.id === e.target.dataset.id) {
        if (arrayIDLikes.includes(userUid || uidGoogle)) {
          const index = arrayIDLikes.indexOf(userUid);
          const decrement = -1;
          arrayIDLikes.splice(index, 1);
          await updateDislike(e.target.dataset.id, decrement, arrayIDLikes);
          postSection.innerHTML = '';
          showAllPosts(postSection);
        } else {
          const increment = 1;
          await updatelike(arrayIDLikes, e.target.dataset.id, increment, userUid || uidGoogle);
          postSection.innerHTML = '';
          showAllPosts(postSection);
        }
      }
    });
  }
});

/* **********Función para editar post********** */
let idPost = '';
rootContainer.addEventListener('click', async (e) => {
  const areaPost = rootContainer.querySelectorAll('.areaPost');
  if (e.target.className === 'fas fa-edit btnEdit') {
    const postForEdit = await getPostForEdit(e.target.dataset.id);
    idPost = postForEdit.id;
    areaPost.forEach((element) => {
      const areaPostId = element.id;
      if (areaPostId === idPost) {
        element.removeAttribute('readonly');
        element.classList.add('focus');
      }
    });
    const btnsCheck = rootContainer.querySelectorAll('.fa-check');
    btnsCheck.forEach((el) => {
      const checkId = el.id;
      if (checkId === idPost) {
        el.classList.add('visibility');
      }
    });
    btnsCheck.forEach((btn) => {
      btn.addEventListener('click', () => {
        areaPost.forEach((el) => {
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
          const hideCheck = rootContainer.querySelectorAll('.fa-check');
          hideCheck.forEach((btnCheck) => {
            btnCheck.classList.remove('visibility');
          });
        });
      });
    });
  }
});

/* **********Función para subir y descargar foto de perfil de storage********** */

rootContainer.addEventListener('click', (e) => {
  if (e.target.className === 'inputUploadPhoto hide') {
    const btnUploadPhoto = rootContainer.querySelector('.btnUploadPhoto');
    btnUploadPhoto.style.display = 'inline-block';
  }
});
rootContainer.addEventListener('click', (e) => {
  if (e.target.className === 'btnUploadPhoto button') {
    const file = rootContainer.querySelector('.inputUploadPhoto').files[0];
    const userPhoto = uploadPhoto(file);
    userPhoto.on('state_changed', () => {
      // Handle progress
      // const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      // console.log(progress);
    }, () => {
      // fallo al cargar
    }, () => {
      // carga exitosa
      userPhoto.snapshot.ref.getDownloadURL()
        .then((downloadURL) => {
          const photoUrl = downloadURL;
          const containerPhoto = document.querySelector('.photo');
          containerPhoto.src = `${photoUrl}`;
          const btnUploadPhoto = rootContainer.querySelector('.btnUploadPhoto');
          btnUploadPhoto.style.display = 'none';
          // window.location.reload();
          // const userUid = localStorage.getItem('uid');
          // profilePhoto(userUid, downloadURL);
          //   .then(() => window.location.reload());
          // const userUid = localStorage.getItem('uid');
          // profilePhoto(userUid, downloadURL);
          //   .then(() => window.location.reload());
          // userDate(userUid, downloadURL);
          // profilePhoto('xJj4ObmG5wP1rjw1WtE2', photoUrl);
        });
    });
  }
});
