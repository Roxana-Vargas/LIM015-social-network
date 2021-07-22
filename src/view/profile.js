export const profile = () => {
  const container = document.createElement('section');
  const informationProfile = document.createElement('section');
  const containerProfile = document.createElement('section');
  informationProfile.innerHTML = `
    <section class="informationProfile">          
          <div class="photoProfile">
              <img class="photo" src="https://static.wikia.nocookie.net/las-chicas-superpoderosas-reboot/images/5/55/Bellota_apariencia.png/revision/latest?cb=20160608180207&path-prefix=es">
          </div>         
      <input type="file" id="select-photo-profile" class="hide" accept="image/jpeg, image/png">
      <div>       
          <h3>Nombre:</h3> <h4 class="userName"> Bellota </h4>
          <h3>Sobre mi:</h3> <p>Me gusta............</p>
      </div>
      </section>
      `;
  containerProfile.innerHTML = `
      <section class="edition-information">
        <form class="editProfile">          
          <label >Nombre:</label>
          <input type="text" id="usernameEdit" value=" ">         
        
            <label>Sobre mi:</label>
            <textarea > </textarea> 
            <label>Sigueme</label>
            <input type="text" value=" "> 
            <button >Editar Perfil</button></br>        
          <button type="submit">Actualizar</button>
        </form>         
      </section>           
      `;
  container.appendChild(informationProfile);
  container.appendChild(containerProfile);
  return container;
};
