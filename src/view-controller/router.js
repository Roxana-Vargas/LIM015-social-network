import { components } from '../view/components.js';

export const changeView = (route) => {
  const root = document.getElementById('root');
  root.innerHTML = '';
  switch (route) {
    case '':
    case '#':
    case '#/': return root.appendChild(components.welcome());
    case '#/login': return root.appendChild(components.login());
    case '#/register': return root.appendChild(components.register());
    // case '#/application': return root.appendChild(components.application());
    case '#/application':
      root.appendChild(components.navegación());
      root.appendChild(components.application());
      break;
    case '#/profile': return root.appendChild(components.Profile());
    default:
      return root.appendChild(components.NotFound());
  }
};
