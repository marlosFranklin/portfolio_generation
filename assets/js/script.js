//SELETOR DA SEÇÃO ABOUT (SECTION)

const about = document.querySelector("#about");

// FUNÇÃO PARA BUSCAR DADOS DO PERFIL DO GITHUB
async function getAboutGithub() {
  try {
    const resposta = await fetch("https://api.github.com/users/marlosFranklin");
    const perfil = await resposta.json();
    about.innerHTML = "";

    about.innerHTML = `
      <figure class="about-image">
        <img src="${perfil.avatar_url}" alt="foto do perfil - ${perfil.name}">
      </figure>

      <article class="about-content">
      <h2>Sobre Mim</h2>
     <p>Sou desenvolvedor de software em início de carreira, com cerca de um ano de experiência atuando
          principalmente como desenvolvedor frontend, além de experiência em atividades de backend.

          Tenho maior conhecimento em tecnologias de frontend, como JavaScript, TypeScript, React e Angular, e sigo
          estudando para fortalecer minhas habilidades em backend e evoluir como desenvolvedor full stack.

          Busco oportunidades que me permitam continuar aprendendo, contribuir com o time e crescer profissionalmente na
          área de desenvolvimento de software.</p>

           <div class="about-buttons-data">
          <div class="buttons-container">
            <a href="${perfil.html_url}" target="_blank" class="botao">GitHub</a>
            <a href="#" target="_blank" class="botao-outline">Currículo</a>
          </div>

          <div class="data-container">
            <div class="data-item">
              <span class="data-number">${perfil.followers}</span>
              <span class="data-label">Seguidores</span>
            </div>
            <div class="data-item">
              <span class="data-number">${perfil.public_repos}</span>
              <span class="data-label">Repositórios</span>
            </div>
          </div>
        </div>
      
      </article>
    `;
  } catch (error) {
    console.error("Erro ao buscar dados do Github", error);
  }
}
getAboutGithub();
