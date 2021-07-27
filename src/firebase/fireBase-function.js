// funcion para registrar usuario
const auth = firebase.auth();
// llamar a la base de datos desde firebase
const dataBase = firebase.firestore();

export const registerUser = (email, password) => {
  auth.createUserWithEmailAndPassword(email, password).then((userCredential) => {
    console.log('sign in');
    console.log(userCredential);
    window.location.hash = '#/login';
  }).catch((err) => {
    console.log(err);
  });
};

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

export const logOut = () => {
  auth.signOut().then(() => {
    console.log('deslogueado');
  }).catch((err) => {
    console.log(err);
  });
};

// funcion para guardar publicaciones en la base de datos
export const savePost = (post) => {
  dataBase.collection('posts').doc().set({ // guarda datos en una colección que se llame "posts", y dentro de este documento vamos a guardar los datos que en este caso será el post
    post,
  });
};

export const getPost = () => dataBase.collection('posts').get();

export const templatedeprueba = async () => {
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
    console.log(nuevaseccion);
  });
};
