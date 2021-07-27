/* **********Llamar a la autentificación y base de datos de firebase********** */
const auth = firebase.auth();
const dataBase = firebase.firestore();

/* **********Función para registrar usuario********** */
export const registerUser = (email, password) => {
  auth.createUserWithEmailAndPassword(email, password).then((userCredential) => {
    console.log('sign in');
    console.log(userCredential);
    window.location.hash = '#/login';
  }).catch((err) => {
    console.log(err);
  });
};

/* **********Función para iniciar sesión********** */
export const loginUser = (emailLogin, passwordLogin) => {
  auth.signInWithEmailAndPassword(emailLogin, passwordLogin)
    .then((userCredential) => {
      console.log('sign in');
      console.log(userCredential);
      window.location.hash = '#/application';
    }).catch((err) => {
      console.log(err);
    });
};

/* **********Función iniciar sesión con google********** */
export const loginGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider)
    .then((result) => {
      console.log('ingreso con google');
      console.log(result);
      window.location.hash = '#/application';
    }).catch((err) => {
      console.log(err);
    });
};

/* **********Función iniciar sesión con facebook********** */
export const loginFacebook = () => {
  const provider = new firebase.auth.FacebookAuthProvider();
  auth.signInWithPopup(provider)
    .then((result) => {
      console.log('ingreso con facebook');
      console.log(result);
      window.location.hash = '#/application';
    }).catch((err) => {
      console.log(err);
    });
};

/* **********Función para cerrar sesión********** */
export const logOut = () => {
  auth.signOut().then(() => {
    console.log('deslogueado');
  }).catch((err) => {
    console.log(err);
  });
};

/* **********Función para guardar post en la base de datos********** */
export const savePost = (post) => {
  dataBase.collection('posts').doc().set({ // guarda datos en una colección que se llame "posts", y dentro de este documento vamos a guardar los datos que en este caso será el post
    post,
  });
};

/* **********Función para obtener los posts********** */
export const getPost = () => dataBase.collection('posts').get();

/* **********Función para mostrar todos los posts********** */
export const showAllPosts = async (seccion) => {
  const posts = await getPost();
  posts.forEach((doc) => { // recorre todos los posts obtenidos
    const nuevaseccion = document.createElement('section');
    nuevaseccion.innerHTML += `
    <section class='postTemplate'>
    <p class='userNameTag'>UserName</p>
    <textarea readonly='readonly' class='areaPost'>${doc.data().post}</textarea>
     <section class='icons sectionIcons'>
      <i class="fas fa-edit btnEdit"></i>
      <i class="fas fa-trash btnDelete"></i>
      <i class="fas fa-comment-alt"></i>
      <i class="fas fa-heart"></i>
     </section>
    </section>`;
    seccion.appendChild(nuevaseccion);
  });
};
