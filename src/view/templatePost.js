import { getPost } from '../firebase/fireBase-function.js';

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
export const showAllPosts = async (section) => {
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
