/* **********Función para guardar post en la base de datos********** */
export const savePost = (name, post) => {
  firebase.firestore().collection('posts').doc().set({ // guarda datos en una colección que se llame "posts", y dentro de este documento vamos a guardar los datos que en este caso será el post
    name,
    post,
    likePost: 0,
    array: [],
  });
};
