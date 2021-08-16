const menuBurguer = document.getElementById('menuBurguer');
menuBurguer.classList = 'disable';

export const welcomeSection = () => {
  const containerAll = document.createElement('section');
  const containerWelcome = document.createElement('section');
  containerWelcome.className = 'welcomeSection';
  containerWelcome.innerHTML = `
    <section id='logoWelcome'>
      <img src="imagenes/logo-form.png" alt="logo" class='logoDesktop'>
    </section>
    <section id="welcome">
      <p>Conecta con otros PROGRAMADORES</p>
      <button  id="btnStart">Get Start</button>
    </section>
    `;
  containerAll.appendChild(containerWelcome);

  const btnStart = containerAll.querySelector('#btnStart');
  btnStart.addEventListener('click', () => {
    window.location.hash = '#/login';
  });

  return containerWelcome;
};
