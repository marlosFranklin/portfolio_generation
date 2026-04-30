//SELETOR DA SEÇÃO ABOUT (SECTION)

const about = document.querySelector("#about");

//seletor da seção projects(Carrossel)
const swiperWrapper = document.querySelector(".swiper-wrapper");
// Seletor do Formulário
const formulario = document.querySelector("#formulario");

// Regex de validação do e-mail
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

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

//Buscar dados de projetos github
async function getProjectsGithub() {
  try {
    const resposta = await fetch(
      "https://api.github.com/users/marlosFranklin/repos?sort=updated&per_page=6",
    );
    const repositorios = await resposta.json();

    swiperWrapper.innerHTML = "";

    //objeto contendo a lista de logos das linguagens
    const linguagens = {
      JavaScript: "javascript",
      TypeScript: "typescript",
      Python: "python",
      Java: "java",
      HTML: "html",
      CSS: "css",
      PHP: "php",
      "C#": "csharp",
      Go: "go",
      Kotlin: "kotlin",
      Swift: "swift",
      C: "c",
      "C++": "c_plus",
      GitHub: "github",
    };

    repositorios.forEach((repositorio) => {
      // seleciona o nome da linguahem padrão do repositorio
      const linguagem = repositorio.language || "GitHub";

      //seleciona o logo da linguagem padrão do repositorio
      const logo = linguagens[linguagem] ?? linguagens["GitHub"];

      //constroi a URL que aponta para logo da linguagem padrão do repositorio
      const urlLogo = `./assets/icons/languages/${logo}.svg`;

      //Formara o nome do repositorio
      const nomeFormatado = repositorio.name
        .replace(/[-]/g, "")
        .replace(/[^a-zA-X0-9\s]/g, "")
        .toUpperCase();

      //funcao para trocar texto da descricao
      const trocar = (texto, limite) =>
        texto.length > limite ? texto.substring(0, limite) + "..." : texto;

      //define descricao do repositorio
      const descricao = repositorio.description
        ? trocar(repositorio.description, 100)
        : "projeto desenvolvido no github";

      //tags
      const tags =
        repositorio.topics?.length > 0
          ? repositorio.topics
              .slice(0, 3)
              .map((topic) => `<span class="tag">${topic}</span>`)
              .join("")
          : `<span class="tag">${linguagem}</span>`;

      //cria o botao deploy
      const botaoDeploy = repositorio.homepage
        ? `<a herf="${repositorio.homepage}" target="_blank" class=""botao-outline botao-sm>Deploy</a>`
        : "";

      //botoes acao
      const botoesAcao = `
        <div class="project-buttons">
                  <a href="${repositorio.html_url}" target="_blank" class="botao botao-sm">
                    GitHub
                  </a>
                  <a href="#" target="_blank" class="botao-outline botao-sm">
                    Deploy
                  </a>
                  </div>`;

      swiperWrapper.innerHTML += swiperWrapper.innerHTML += `
                <div class="swiper-slide">
                    <article class="project-card">
                        <div class="project-image">
                            <img src="${urlLogo}" 
                                alt="Ícone ${linguagem}"
                                onerror="this.onerror=null; this.src='./assets/icons/languages/github.svg';">
                        </div>

                        <div class="project-content">
                            <h3>${nomeFormatado}</h3>
                            <p>${descricao}</p>
                            <div class="project-tags">${tags}</div>
                            ${botoesAcao}
                        </div>
                    </article>
                </div>
            `;
    });

    //inicia o carrosel
    iniciarSwiper();
  } catch (error) {
    console.error("erro ao buscar repositorios", error);
  }
}
getProjectsGithub();

// funcao de inicializacao do carrosel -swiper
function iniciarSwiper() {
  new Swiper(".projects-swiper", {
    slidesPerView: 1,
    slidesPerGroup: 1,
    spaceBetween: 24,
    centeredSlides: false,
    loop: true,
    watchOverflow: true,

    breakpoints: {
      0: {
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 40,
        centeredSlides: false,
      },
      769: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 40,
        centeredSlides: false,
      },
      1025: {
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 54,
        centeredSlides: false,
      },
    },

    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },

    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      dynamicBullets: true,
    },

    autoplay: {
      delay: 5000,
      pauseOnMouseEnter: true,
      disableOnInteraction: false,
    },

    grabCursor: true,
    slidesOffsetBefore: 0,
    slidesOffsetAfter: 0,
  });
}
// formulario
formulario.addEventListener("submit", function (event) {
  event.preventDefault();

  document
    .querySelectorAll("form span")
    .forEach((span) => (span.innerHTML = ""));

  let isValid = true;

  const nome = document.querySelector("#nome");
  const erroNome = document.querySelector("#erro-nome");

  if (nome.value.trim().length < 3) {
    erroNome.innerHTML = "O Nome deve ter no mínimo 3 caracteres.";
    if (isValid) nome.focus();
    isValid = false;
  }

  const email = document.querySelector("#email");
  const erroEmail = document.querySelector("#erro-email");

  if (!email.value.trim().match(emailRegex)) {
    erroEmail.innerHTML = "Digite um e-mail válido.";
    if (isValid) email.focus();
    isValid = false;
  }

  const assunto = document.querySelector("#assunto");
  const erroAssunto = document.querySelector("#erro-assunto");

  if (assunto.value.trim().length < 5) {
    erroAssunto.innerHTML = "O Assunto deve ter no mínimo 5 caracteres.";
    if (isValid) assunto.focus();
    isValid = false;
  }

  const mensagem = document.querySelector("#mensagem");
  const erroMensagem = document.querySelector("#erro-mensagem");

  if (mensagem.value.trim().length === 0) {
    erroMensagem.innerHTML = "A mensagem não pode ser vazia.";
    if (isValid) mensagem.focus();
    isValid = false;
  }

  if (isValid) {
    const submitButton = formulario.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.textContent = "Enviando...";

    formulario.submit();
  }
});
