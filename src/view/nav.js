import { logOut } from '../firebase/fireBase-function.js';

const userValidation = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log(user);
    } else {
      window.location.hash = '#/';
    }
  });
};

export const Nav = () => {
  userValidation();
  const menuBurguer = document.getElementById('menuBurguer');
  menuBurguer.classList = 'fas fa-bars';
  const containerNav = document.createElement('section');
  containerNav.classList = 'containerNav';
  const container = document.createElement('nav');
  containerNav.classList = 'disable';

  // funcion toggle ícono de menu
  menuBurguer.addEventListener('click', () => {
    menuBurguer.classList.toggle('fa-times');
    containerNav.classList.toggle('disable');
  });

  container.innerHTML = `
    <nav class='sectionNav'>
      <ul class='navApp' id='menuDropdown'>
        <li class='itemNav'><a href='#/application' class='linkNav'> Inicio </a></li>
        <li class='itemNav'><a href='#/top' class='linkNav'> Top </a></li>
        <li class= 'logOut itemNav'><a href='#/login'class='linkNav' > Log Out </a></li>
      </ul>
    </nav>
      `;
  containerNav.appendChild(container);

  const linklogOut = containerNav.querySelector('.logOut');
  // Llamar funcion para desloguear
  linklogOut.addEventListener('click', (event) => {
    menuBurguer.classList = ('disable');
    event.preventDefault();
    logOut().then(() => {
      window.location.hash = '#/login';
    });
    localStorage.clear();
  });
  return containerNav;
};
