export const appSection = () => {
  // const root = document.getElementById('root');

  const containerApp = document.createElement('section');
  containerApp.className = 'postSection';
  containerApp.innerHTML = `
    <section class="makePost">
      <input type="text" class="inputType" placeholder="Buscar">
      <textarea class="inputType" placeholder="Comparte con la comunidad"></textarea>
      <button  class="button">Publicar</button>
    </section>
    <section>
    </section>
        `;
  return containerApp;
  // root.appendChild(containerPost);
};
