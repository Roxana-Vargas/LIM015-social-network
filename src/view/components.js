import { welcomeSection } from './welcome.js';
import { loginSection } from './inicio.js';
import { registerSection } from './register.js';
import { appSection } from './application.js';
import { Nav } from './nav.js';
import { notFound } from './error404.js';

export const components = {
  welcome: welcomeSection,
  login: loginSection,
  register: registerSection,
  application: appSection,
  NotFound: notFound,
  navegación: Nav,
};
