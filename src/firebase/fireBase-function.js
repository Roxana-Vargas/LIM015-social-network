/* **********Llamar a la autentificación y base de datos de firebase********** */
// const auth = firebase.auth();
// const dataBase = firebase.firestore();
// const providerGoogle = new firebase.auth.GoogleAuthProvider();
// const providerFB = new firebase.auth.FacebookAuthProvider();

export const registerUser = (email, password) => firebase.auth()
  .createUserWithEmailAndPassword(email, password);

/* **********Función para iniciar sesión********** */
export const loginUser = (emailLogin, passwordLogin) => firebase.auth()
  .signInWithEmailAndPassword(emailLogin, passwordLogin);

/* **********Función iniciar sesión con google********** */
export const loginGoogle = () => {
  const providerGoogle = new firebase.auth.GoogleAuthProvider();
  const loginwithGoogle = firebase.auth().signInWithPopup(providerGoogle);
  return loginwithGoogle;
};
/* **********Función iniciar sesión con facebook**********
export const loginFacebook = () => {
  const providerFB = new firebase.auth.FacebookAuthProvider();
  const loginwithFB = firebase.auth().signInWithPopup(providerFB);
  return loginwithFB;
}; */

/* **********Función para cerrar sesión********** */
export const logOut = () => firebase.auth().signOut();

/* **********Función para guardar post en la base de datos********** */
export const savePost = (name, post) => {
  firebase.firestore().collection('posts').doc().set({ // guarda datos en una colección que se llame "posts", y dentro de este documento vamos a guardar los datos que en este caso será el post
    name,
    post,
    likePost: 0,
    array: [],
  })
    .then(() => {
      console.log('Document successfully written!');
    })
    .catch((error) => {
      console.error('Error writing document: ', error);
    });
};

/* **********Función para obtener los posts********** */
export const getPost = () => firebase.firestore().collection('posts').get();

/* **********Función para eliminar los posts********** */
export const deletePost = (id) => firebase.firestore().collection('posts').doc(id).delete();

// funcion para obtener la publicacion que queremos editar
export const getPostForEdit = (id) => firebase.firestore().collection('posts').doc(id).get(); // sólo va a obtener el documento con el id que le pasemos

// funcion para actualizar publicaciones
export const updatePost = (id, updatedPost) => firebase.firestore().collection('posts').doc(id).update(updatedPost); // actualizar el post por su id y con el nuevo campo ingresado

export const updatelike = (doc, id, value, uid) => firebase.firestore().collection('posts').doc(id).update({ likePost: firebase.firestore.FieldValue.increment(value), array: doc.concat(uid) });

export const updateDislike = (id, value, newArray) => firebase.firestore().collection('posts').doc(id).update({ likePost: firebase.firestore.FieldValue.increment(value), array: newArray });
