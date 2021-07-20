/* Este es el punto de entrada de tu aplicacion

import { myFunction } from './index.js';

myFunction(); */

import { changeView } from './view-controller/router.js';

const init = () => {
  changeView(window.location.hash = '#/');
  changeView(window.location.hash);
  // en que ruta esta pagina
  window.addEventListener('hashchange', () => changeView(window.location.hash));
};

window.addEventListener('load', init); // cada vez que escuches una recarga, ejecuta la funcion init.
