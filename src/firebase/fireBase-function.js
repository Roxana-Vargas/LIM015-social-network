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
      localStorage.setItem('email', userCredential.user.email);
      localStorage.setItem('uid', userCredential.user.uid);
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
export const savePost = (name, post) => {
  dataBase.collection('posts').doc().set({ // guarda datos en una colección que se llame "posts", y dentro de este documento vamos a guardar los datos que en este caso será el post
    name,
    post,
    likePost: 0,
    array: [],
  });
};

/* **********Función para obtener los posts********** */
export const getPost = () => dataBase.collection('posts').get();

/* **********Función para eliminar los posts********** */
export const deletePost = (id) => dataBase.collection('posts').doc(id).delete();

// funcion para obtener la publicacion que queremos editar
export const getPostForEdit = (id) => dataBase.collection('posts').doc(id).get(); // sólo va a obtener el documento con el id que le pasemos

// funcion para actualizar publicaciones
export const updatePost = (id, updatedPost) => dataBase.collection('posts').doc(id).update(updatedPost); // actualizar el post por su id y con el nuevo campo ingresado

export const updatelike = (doc, id, updateLike, uid) => dataBase.collection('posts').doc(id).update({ likePost: updateLike, array: doc.concat(uid) });
