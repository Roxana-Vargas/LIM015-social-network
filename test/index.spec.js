// configuración de mock

import MockFirebase from 'mock-cloud-firestore';

import {
  getPostForEdit,
  deletePost,
  getPost,
  updatePost,
  updatelike,
  updateDislike,
  // savePost,
} from '../src/firebase/fireBase-function.js';

const fixtureData = {
  __collection__: {
    posts: {
      __doc__: {
        abc123: {
          post: 'Hola Mundo',
          likePost: 1,
          array: [],
          name: 'Rox',
        },
        abc125: {
          post: 'Hello World',
          likePost: 1,
          array: ['bet123'],
          name: 'Bet',
        },
        abc127: {
          post: 'salut monde',
          likePost: 1,
          array: ['itzel789'],
          name: 'Itzel',
        },
        abc129: {
          post: 'Ciao mondo',
          likePost: 0,
          array: [],
          name: 'Vivi',
        },
      },
    },
  },
};

global.firebase = new MockFirebase(fixtureData, { isNaiveSnapshotListenerEnabled: true });

// Test a la función para editar post
describe('getPostForEdit', () => {
  it('Debería poder obtener el post con id=abc125', () => getPostForEdit('abc125').then((doc) => {
    const result = doc.data();
    expect(result.post).toBe('Hello World');
  }));
});

// Test para eliminar el post por su id

describe('deletePost', () => {
  it('Debería poder eliminar el post con id: abc123', () => {
    deletePost('abc123').then((postDoc) => {
      expect(postDoc).toBe(undefined);
      getPost();
    });
  });
});

// Test para actualizar un post por su id

describe('updatePost', () => {
  it('debería poder actualizar un post por su id', async () => {
    const posts = await getPost();
    posts.forEach((doc) => {
      if (doc.id === 'abc125') {
        updatePost('abc125', { post: 'Post modificado' }).then(() => {
          const result = doc.data();
          expect(result.post).toBe('Post modificado');
        });
      }
    });
  });
});

// Test para dar like

describe('updatelike', () => {
  it('debería poder dar like a un post', async () => {
    const posts = await getPost();
    posts.forEach((doc) => {
      if (doc.id === 'abc129') {
        const array = doc.data().array;
        updatelike(array, 'abc129', 1, 'rox789').then(() => {
          const result = doc.data();
          expect(result.likePost).toBe(1);
        });
      }
    });
  });
});

// Test para quitar like

describe('updateDislike', () => {
  it('debería poder quitar like a un post', async () => {
    const posts = await getPost();
    posts.forEach((doc) => {
      if (doc.id === 'abc127') {
        updateDislike('abc127', -1, []).then(() => {
          const result = doc.data();
          expect(result.likePost).toBe(0);
        });
      }
    });
  });
});

// describe('funcion crearPost', () => {
//   it('Deberia agregar un post', (done) => savePost('bet', 'hola').then(() => {
//     const callback = (posts) => {
//       const result = posts.find((elemento) => elemento.data().post === ('hola'));
//       expect(result.data().post).toBe('hola');
//       done();
//     };
//     getPost(callback);
//   }));
// });

// describe('crear post', () => {
//   it('debería agregar un post', () => savePost({ name: 'Carlos' }, { post: 'hhh' }).then(() => {
//     console.log('Document successfully written!');
//   })
//     .catch((error) => {
//       console.error('Error writing document:', error);
//     }));
// });

// describe('addPost', () => {
//   it('Debería porder agregar un post', () => savePost('user001', 'Nuevo post')
//     .then(() => getPost(
//       (data) => {
//         const result = data.find((post) => post.content === 'Nuevo post');
//         expect(result.content).toBe('Nuevo post');
//       }, 'posts',
//     )));
// });

// it('should set a document', () => {
//   const output = fixtureData.collection('posts').doc('LA').set({
//     name: 'Jesus +',
//     post: 'holaaaaaa',
//   })
//     .then(() => {
//       console.log('Document successfully written!');
//     })
//     .catch((error) => {
//       console.error('Error writing document:', error);
//     });
//   // [END set_document]
//   return output;
// });
