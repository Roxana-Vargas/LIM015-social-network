import { components } from '../view/components.js';

export const changeView = (route) => {
  const root = document.getElementById('root');
  root.innerHTML = '';
  switch (route) {
    case '#/': return root.appendChild(components.welcome());
    case '#/login': return root.appendChild(components.Login());
    case '#/Register': return root.appendChild(components.Register());
    case '#/post': return root.appendChild(components.application());
    default:
      break;
  }
};
