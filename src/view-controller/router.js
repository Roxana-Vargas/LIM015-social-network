import { components } from '../view/components.js';

export const changeView = (route) => {
  const root = document.getElementById('root');
  root.innerHTML = '';
  switch (route) {
    case '':
    case '#':
    case '#/': root.appendChild(components.welcome());
      break;
    case '#/login': root.appendChild(components.login());
      break;
    case '#/register': root.appendChild(components.register());
      break;
    case '#/application':
      root.appendChild(components.navegación());
      root.appendChild(components.application());
      break;
    case '#/profile': root.appendChild(components.Profile());
      break;
    default:
      root.appendChild(components.NotFound());
  }
  return root;
};
