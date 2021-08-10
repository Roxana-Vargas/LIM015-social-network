import {
  registerUser,
  loginUser,
  loginGoogle,
  logOut,
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
