/* **********Función para registrar usuario********** */
export const registerUser = (email, password) => firebase.auth()
  .createUserWithEmailAndPassword(email, password);

/* **********Función para iniciar sesión********** */
export const loginUser = (emailLogin, passwordLogin) => firebase.auth()
  .signInWithEmailAndPassword(emailLogin, passwordLogin);

/* **********Función para resetear password********** */
export const resetPassword = (emailLogin) => firebase.auth()
  .sendPasswordResetEmail(emailLogin);

/* **********Función iniciar sesión con google********** */
export const loginGoogle = () => {
  const providerGoogle = new firebase.auth.GoogleAuthProvider();
  const loginwithGoogle = firebase.auth().signInWithPopup(providerGoogle);
  return loginwithGoogle;
};

/* **********Función para cerrar sesión********** */
export const logOut = () => firebase.auth().signOut();

/* **********Función para obtener los posts********** */
export const getPost = () => firebase.firestore().collection('posts').get();

/* **********Función para eliminar los posts********** */
export const deletePost = (id) => firebase.firestore().collection('posts').doc(id).delete();

/* **********Función para obtener el post que queremos editar********** */
export const getPostForEdit = (id) => firebase.firestore().collection('posts').doc(id).get(); // sólo va a obtener el documento con el id que le pasemos

/* **********Función para eliminar los posts********** */
export const updatePost = (id, updatedPost) => firebase.firestore().collection('posts').doc(id).update(updatedPost); // actualizar el post por su id y con el nuevo campo ingresado

/* **********Función para dar like a un post********** */
export const updatelike = (doc, id, value, uid) => firebase.firestore().collection('posts').doc(id).update({ likePost: firebase.firestore.FieldValue.increment(value), array: doc.concat(uid) });

/* **********Función para quitar like a un post********** */
export const updateDislike = (id, value, newArray) => firebase.firestore().collection('posts').doc(id).update({ likePost: firebase.firestore.FieldValue.increment(value), array: newArray });

/* **********Función subir foto de perfil a Storage********** */
export const uploadPhoto = (file) => firebase.storage().ref('/userProfileImg/'.concat(file.name)).put(file);

/* **********Función iniciar sesión con facebook**********
export const loginFacebook = () => {
  const providerFB = new firebase.auth.FacebookAuthProvider();
  const loginwithFB = firebase.auth().signInWithPopup(providerFB);
  return loginwithFB;
}; */

/* Guardar foto de perfil en firestore */

// export const profilePhoto = (userId, photoProfile)
// => firebase.firestore().collection('datosUsuarios').doc(userId).update({ photo: photoProfile });

// export const saveUserDate = (file, userId) => {
//   firebase.firestore().collection('datosUsuarios').doc().set({
//     files: file,
//     userId,
//   })
//     .then(() => {
//       console.log('guardo!');
//     })
//     .catch((error) => {
//       console.error('no: ', error);
//     });
// };

/* **********Función para obtener las fotos********** */
// export const getPhotos = () => firebase.firestore().collection('datosUsuarios').get();
