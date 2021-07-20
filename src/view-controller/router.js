import { components } from '../view/components.js';

export const changeView = (route) => {
  const root = document.getElementById('root');
  root.innerHTML = '';
  switch (route) {
    case '#/': return root.appendChild(components.welcome());
    case '#/login': return root.appendChild(components.login());
    case '#/register': return root.appendChild(components.register());
    default:
      break;
  }
};
