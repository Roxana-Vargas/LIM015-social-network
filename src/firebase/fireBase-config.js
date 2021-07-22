const firebaseConfig = {
  apiKey: 'AIzaSyBV8tXbMQoaVOyVNwqy9oPJ0Wn-rEqkgYI',
  authDomain: 'coder-beginners.firebaseapp.com',
  projectId: 'coder-beginners',
  storageBucket: 'coder-beginners.appspot.com',
  messagingSenderId: '141709355404',
  appId: '1:141709355404:web:fc3bae3fce3c95aa050ea9',
  measurementId: 'G-PH2LE599LS',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
// firebase.auth();
console.log('firebaseConfig');
