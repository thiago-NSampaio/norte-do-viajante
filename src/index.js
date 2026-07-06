const tabsHeader = document.querySelectorAll("#tabs-header li a");
const tabsContainer = document.querySelectorAll("#tabs-menu li");
const titleEl = document.getElementById("tab-title");
const descEl = document.getElementById("tab-desc");
const hero = document.querySelector(".hero-container");
const logo = document.querySelector(".logo-container");

const pages = ["home", "destinos", "fichas", "sobre"];
const defaultPage = "home";

const tabContent = {
  direcao: {
    title: "Encontre a sua Direção",
    desc: "Descubra destinos personalizados mapeados por interesses através de nossa inteligência geográfica. Filtre por gastronomia, cultura ou aventura sem esforço.",
    backgroundURL: '../public/three-brown-wooden-boat-on-blue-lake-water-taken-at-daytime.jpg'
  },
  fichasInteligentes: {
    title: "Fichas Inteligentes",
    desc: "Consulte índices integrados de custo de vida, clima histórico e dados de segurança em tempo real antes mesmo de preparar as suas malas.",
    backgroundURL: '../public/stats-cities.jpg'
  },
  roteiros: {
    title: "Roteiros Sob Medida",
    desc: "Trabalhe em conjunto com nossos especialistas para consolidar suas cidades favoritas em um itinerário de viagem inteligente e otimizado.",
    backgroundURL: '../public/glenn-carstens-peters.jpg'
  },
  definicao: {
    title: "Alta Definição",
    desc: "Explore galerias urbanas imersivas alimentadas por fotógrafos globais. Inspire-se visualmente com a arquitetura e os cenários do seu próximo destino.",
    backgroundURL: '../public/anastase-maragos.jpg'
  },
};

logo.addEventListener("click", (e) => {
  e.preventDefault();
  updatePage("home");
});

tabsHeader.forEach((tab) => {
  tab.addEventListener("click", (e) => {
    e.preventDefault();
    const selectedPage = tab.getAttribute("data-page");
    if (!selectedPage) return;
    updatePage(selectedPage);
  });
});

function updatePage(page = defaultPage) {
  const currentPage = pages.includes(page) ? page : defaultPage;
  const isHomePage = currentPage === "home";

  hero.classList.toggle("d-none", !isHomePage);

  pages.forEach((pageName) => {
    const el = document.getElementById(pageName);
    if (el) {
      if (isHomePage) {
        el.classList.add("d-none");
      } else {
        el.classList.toggle("d-none", pageName !== currentPage);
      }
    }
  });

  tabsHeader.forEach((tab) => {
    if (tab.getAttribute("data-page") === currentPage) {
      tab.classList.add("active");
    } else {
      tab.classList.remove("active");
    }
  });

  sessionStorage.setItem("activePage", currentPage);
}

function updateTabContent(tabKey) {
  if (!tabContent[tabKey]) return;

  titleEl.classList.add("fade-out");
  descEl.classList.add("fade-out");

  setTimeout(() => {
    titleEl.textContent = tabContent[tabKey].title;
    descEl.textContent = tabContent[tabKey].desc;
    hero.style.setProperty('--hero-bg-url', `url('${tabContent[tabKey].backgroundURL}')`);

    titleEl.classList.remove("fade-out");
    descEl.classList.remove("fade-out");
  }, 180);

  tabsContainer.forEach((tab) => {
    if (tab.getAttribute("data-tab") === tabKey) {
      tab.classList.add("active");
    } else {
      tab.classList.remove("active");
    }
  });
}

tabsContainer.forEach((tab) => {
  tab.addEventListener("click", () => {
    const selectedTab = tab.getAttribute("data-tab");
    sessionStorage.setItem("activeTabHero", selectedTab);
    updateTabContent(selectedTab);
  });
});

window.addEventListener("DOMContentLoaded", () => {
  const savedTabHero = sessionStorage.getItem("activeTabHero");
  const savedPage = sessionStorage.getItem("activePage") || defaultPage;

  updatePage(savedPage);
  if (savedTabHero && tabContent[savedTabHero]) {
    updateTabContent(savedTabHero);
  }
});
