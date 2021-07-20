export const welcomeSection = () => {
  // const root = document.getElementById('root');

  const containerWelcome = document.createElement('section');
  containerWelcome.className = 'welcomeSection';
  containerWelcome.innerHTML = `
  <section id="welcome">
    <p>Conecta con otros PROGRAMADORES</p>
    <button id="btnStart" class="button"><a href='#/login'>Get Start</a></button>
  </section>
    `;
  return containerWelcome;
  // root.appendChild(containerWelcome);
};
