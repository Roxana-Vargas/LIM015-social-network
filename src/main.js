import { changeView } from './view-controller/router.js';

const init = () => {
  changeView(window.location.hash);
  window.addEventListener('hashchange', () => changeView(window.location.hash));
};

window.addEventListener('load', init); // cada vez que escuches una recarga, ejecuta la funcion init.
