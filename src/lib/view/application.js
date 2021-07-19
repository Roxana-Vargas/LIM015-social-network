export const postSection=() => {
    const root= document.getElementById('root');

    const containerPost= document.createElement('section');
    containerPost.className="postSection";
    containerPost.innerHTML= `
        <header>
            <img src="../../imagenes/logo-nav.png" alt="">
            <nav>
                <ul>
                    <li> <a href="#"> Inicio </a> </li>
                    <li> <a href="#"> Mi perfil </a> </li>
                    <li> <a href="#"> Top </a> </li>
                    <li> <a href="#"> Recientes </a> </li>
                <ul>
            </nav>
        </header>

        <section>
        <input type="text" placeholder="Buscar">
        <textarea placeholder="Comparte con la comunidad"></textarea>
        <button>Publicar</button>
        </section>

        <section>
        </section>
        `;
root.appendChild(containerLogin);
};