const auth = firebase.auth();
// Función para registrar usuario
export const registerUser = () => {
  const signInform = document.querySelector('#root');
  signInform.addEventListener('click', (e) => {
  // e.preventDefault();
    console.log(e);
    if (e.target.innerHTML === 'Registrar') {
      console.log('ok');
      const nameUser = document.querySelector('#nameUser').value;
      const email = document.querySelector('#emailRegister').value;
      const password = document.querySelector('#passwordRegister').value;
      console.log(nameUser, email, password);
      auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          console.log('sign in');
        });
    }
  });
};

// Función para iniciar sesión
export const loginUser = () => {
  const logInform = document.querySelector('#root');
  logInform.addEventListener('click', (e) => {
    if (e.target.innerHTML === 'Login') {
      console.log('oklogin');
      const emailLogin = document.querySelector('#emailLogin').value;
      const passwordLogin = document.querySelector('#passwordLogin').value;
      auth.signInWithEmailAndPassword(emailLogin, passwordLogin)
        .then((userCredential) => {
          console.log('login');
        });
    }
  });
};
