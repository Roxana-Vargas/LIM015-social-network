export const welcomeSection = () => {
  const containerWelcome = document.createElement('section');
  containerWelcome.className = 'welcomeSection';
  containerWelcome.innerHTML = `
  <section id="welcome">
    <p>Conecta con otros PROGRAMADORES</p>
    <button id="btnStart"><a href='#/login'>Get Start</a></button>
  </section>
    `;
  return containerWelcome;
};
