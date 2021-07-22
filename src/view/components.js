import { welcomeSection } from './welcome.js';
import { loginSection } from './inicio.js';
import { registerSection } from './register.js';
import { appSection, Nav } from './application.js';
import { notFound } from './error404.js';
import { profile } from './profile.js';

export const components = {
  welcome: welcomeSection,
  login: loginSection,
  register: registerSection,
  application: appSection,
  NotFound: notFound,
  Profile: profile,
  navegación: Nav,
};
