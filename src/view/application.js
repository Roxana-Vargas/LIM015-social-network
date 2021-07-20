export const appSection = () => {
  // const root = document.getElementById('root');

  const containerApp = document.createElement('section');
  containerApp.className = 'postSection';
  containerApp.innerHTML = `
    <section>
      <input type="text" placeholder="Buscar">
      <textarea placeholder="Comparte con la comunidad"></textarea>
      <button>Publicar</button>
    </section>
    <section>
    </section>
        `;
  return containerApp;
  // root.appendChild(containerPost);
};
