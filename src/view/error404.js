export const notFound = () => {
  const containerError = document.createElement('section');
  containerError.className = 'errorSection';
  containerError.innerHTML = `
    <img class="error404" src="imagenes/404img.jpg"></img>
          `;
  return containerError;
};
