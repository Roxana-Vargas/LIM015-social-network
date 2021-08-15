import {
  registerUser,
  loginUser,
  loginGoogle,
  logOut,
  resetPassword,
} from '../src/firebase/fireBase-function.js';

const firebasemock = require('firebase-mock');

const mockauth = new firebasemock.MockFirebase();
mockauth.autoFlush();

global.firebase = firebasemock.MockFirebaseSdk(
  // use null if your code does not use RTDB
  () => null,
  () => mockauth,
);

// Funciones del Register
describe('Crea una cuenta con un email y password', () => {
  it('debería poder crear un usuario', () => registerUser('newuser@hotmail.com', '123456')
    .then((user) => {
      expect(user.email).toBe('newuser@hotmail.com');
    }));
});

// Funciones del Login

describe('login con email y password', () => {
  it('debería iniciar sesión', () => loginUser('newuser@hotmail.com', '123456')
    .then((user) => {
      expect(user.email).toBe('newuser@hotmail.com');
    }));
});

describe('cerrar sesion', () => {
  it('deberia cerrar sesion', () => logOut()
    .then((user) => {
      expect(user).toBe(undefined);
    }));
});

describe('signInGoogle', () => {
  it('debería poder iniciar sesión con mi cuenta de google', () => loginGoogle()
    .then((user) => {
      expect(user.providerData[0].providerId).toBe('google.com');
    }));
});

describe('resetPassword', () => {
  it('Deberia enviar un email para restablecer contraseña', () => {
    const mockSendPasswordResetEmail = jest.fn();
    firebase.auth().sendPasswordResetEmail = mockSendPasswordResetEmail;
    resetPassword('test@gmail.com');
    // verificar si fue llamado el metodo de firebase
    expect(mockSendPasswordResetEmail).toHaveBeenCalled();
    expect(mockSendPasswordResetEmail.mock.calls).toHaveLength(1);
    // verificar si el metodo recibio como arg el email
    expect(mockSendPasswordResetEmail).toHaveBeenCalledWith('test@gmail.com');
  });
});

// current User
// describe('Verify current user ', () => {
//   it('Deberia extraer a usuario logeado', () => {
//     const mockUser = {
//       currentUser: { uid: '001' },
//     };
//     firebase.auth().onAuthStateChanged().currentUser = mockUser.currentUser;
//     expect(userValidation().uid).toEqual('001');
//   });
// });

// Función currentUser
// describe('Función para administrar usuarios firebase', () => {
//   it('Debería mostrar el usuario ingresado', () => {
//     const userMock = {
//       currentUser: { id: 'abc01' },
//     };
//     firebase.auth().onAuthStateChanged().currentUser = userMock.currentUser;
//     const isUser = (user) => {
//       expect(user.id).toEqual('abc02');
//     };
//     userValidation(isUser);
//   });
// });
