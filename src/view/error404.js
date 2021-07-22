export const notFound = () => {
  const containerError = document.createElement('section');
  containerError.innerHTML = `
            <p>ERROR 404....!!!!!!!!!!</p>
          `;
  return containerError;
};
