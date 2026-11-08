(() => {
  const FIGMA_URL = "https://www.figma.com/community/file/1301631027349874475";
  const GITHUB_URL = "https://github.com/reearantes/PowerBI_Projects";

  const copy = {
    pt: {
      cardMeta: "PROJETO 04 / POWER BI & MODELOS",
      cardTitle: "Modelos e projetos Power BI",
      cardChallenge: "Apresentar projetos autorais de Business Intelligence com contexto visual, sem depender de uma demonstração publicada.",
      cardSolution: "Galeria com o template Spotify e duas visões do Dashboard Financeiro, seguida pelos modelos interativos com dados fictícios.",
      cardContribution: "Uma visão direta da experiência em Power BI, design de dashboards, modelagem, ETL e storytelling analítico.",
      cardButton: "Explorar projetos e modelos",
      modalKicker: "PORTFÓLIO VISUAL · PROJETO 04",
      modalTitle: "Modelos e projetos Power BI",
      modalIntro: "Projetos reais apresentados como imagens, com o template no Figma e o código-fonte no GitHub.",
      eyebrow: "PROJETOS POWER BI",
      heading: "Dashboards em destaque",
      headingCopy: "Uma seleção visual de trabalhos autorais. Clique em qualquer tela para ampliar.",
      figma: "Abrir template no Figma ↗",
      github: "Ver projeto no GitHub ↗",
      spotifyTitle: "Template Spotify — Power BI",
      spotifyCopy: "Capa e dashboard inspirados no universo Spotify, com composição visual criada no Figma.",
      featured: "DESTAQUE",
      financeOverview: "Dashboard Financeiro — visão geral",
      financeOverviewCopy: "Receitas, custos, despesas, lucro e principais recortes gerenciais em uma única visão.",
      financeCashflow: "Dashboard Financeiro — fluxo de caixa",
      financeCashflowCopy: "Detalhamento mensal de entradas e saídas com gráfico de cascata e tabela analítica.",
      staticNote: "Estas peças são apresentadas como imagens estáticas. O arquivo PBIX, o processo de ETL e a documentação estão disponíveis no repositório.",
      interactiveTitle: "Laboratório interativo",
      interactiveCopy: "A seguir, explore os modelos funcionais com dados 100% fictícios.",
    },
    en: {
      cardMeta: "PROJECT 04 / POWER BI & MODELS",
      cardTitle: "Power BI models and projects",
      cardChallenge: "Showcase original Business Intelligence projects with visual context, without requiring a published demo.",
      cardSolution: "A gallery featuring the Spotify template and two Financial Dashboard views, followed by interactive models with fictitious data.",
      cardContribution: "A direct view of Power BI, dashboard design, modeling, ETL and analytics storytelling experience.",
      cardButton: "Explore projects and models",
      modalKicker: "VISUAL PORTFOLIO · PROJECT 04",
      modalTitle: "Power BI models and projects",
      modalIntro: "Real projects presented as images, with the template on Figma and source files on GitHub.",
      eyebrow: "POWER BI PROJECTS",
      heading: "Featured dashboards",
      headingCopy: "A visual selection of original work. Select any screen to view it at full size.",
      figma: "Open template on Figma ↗",
      github: "View project on GitHub ↗",
      spotifyTitle: "Spotify Template — Power BI",
      spotifyCopy: "Cover and dashboard inspired by Spotify, with its visual composition created in Figma.",
      featured: "FEATURED",
      financeOverview: "Financial Dashboard — overview",
      financeOverviewCopy: "Revenue, costs, expenses, profit and key management breakdowns in one view.",
      financeCashflow: "Financial Dashboard — cash flow",
      financeCashflowCopy: "Monthly inflow and outflow details with a waterfall chart and analytical table.",
      staticNote: "These projects are shown as static images. The PBIX file, ETL process and documentation are available in the repository.",
      interactiveTitle: "Interactive lab",
      interactiveCopy: "Next, explore working models built with 100% fictitious data.",
    },
  };

  const language = () => (document.documentElement.lang.toLowerCase().startsWith("en") ? "en" : "pt");

  function setText(element, value) {
    if (element && element.textContent !== value) element.textContent = value;
  }

  function ensureStylesheet() {
    if (document.querySelector('link[data-models-gallery="styles"]')) return;
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "./css/models-gallery.css";
    link.dataset.modelsGallery = "styles";
    document.head.append(link);
  }

  function syncProjectCard(strings) {
    const art = document.querySelector(".project-art.models-art");
    const card = art?.closest("article");
    if (!card) return;

    setText(card.querySelector(".project-copy span"), strings.cardMeta);
    setText(card.querySelector(".project-copy h3"), strings.cardTitle);
    const summaries = card.querySelectorAll(".case-summary dd");
    setText(summaries[0], strings.cardChallenge);
    setText(summaries[1], strings.cardSolution);
    setText(summaries[2], strings.cardContribution);

    const button = card.querySelector(".case-open");
    if (button && button.dataset.galleryLabel !== strings.cardButton) {
      button.dataset.galleryLabel = strings.cardButton;
      button.innerHTML = `${strings.cardButton} <span aria-hidden="true">↗</span><span class="sr-only">: ${strings.cardTitle}</span>`;
    }
  }

  function galleryMarkup(strings) {
    return `
      <div class="powerbi-gallery__heading">
        <div>
          <span class="powerbi-gallery__eyebrow">${strings.eyebrow}</span>
          <h3>${strings.heading}</h3>
          <p>${strings.headingCopy}</p>
        </div>
        <div class="powerbi-gallery__actions">
          <a href="${FIGMA_URL}" target="_blank" rel="noreferrer">${strings.figma}</a>
          <a href="${GITHUB_URL}" target="_blank" rel="noreferrer">${strings.github}</a>
        </div>
      </div>
      <figure class="powerbi-gallery__featured">
        <a href="./assets/models/spotify-power-bi.png" target="_blank" rel="noreferrer">
          <img src="./assets/models/spotify-power-bi.png" alt="${strings.spotifyTitle}" loading="eager">
        </a>
        <figcaption>
          <div><h4>${strings.spotifyTitle}</h4><p>${strings.spotifyCopy}</p></div>
          <span class="powerbi-gallery__tag">${strings.featured}</span>
        </figcaption>
      </figure>
      <div class="powerbi-gallery__grid">
        <figure>
          <a href="./assets/models/dashboard-financeiro-visao-geral.jpg" target="_blank" rel="noreferrer">
            <img src="./assets/models/dashboard-financeiro-visao-geral.jpg" alt="${strings.financeOverview}" loading="lazy">
          </a>
          <figcaption><h4>${strings.financeOverview}</h4><p>${strings.financeOverviewCopy}</p></figcaption>
        </figure>
        <figure>
          <a href="./assets/models/dashboard-financeiro-fluxo-caixa.jpg" target="_blank" rel="noreferrer">
            <img src="./assets/models/dashboard-financeiro-fluxo-caixa.jpg" alt="${strings.financeCashflow}" loading="lazy">
          </a>
          <figcaption><h4>${strings.financeCashflow}</h4><p>${strings.financeCashflowCopy}</p></figcaption>
        </figure>
      </div>
      <div class="powerbi-gallery__note"><p>${strings.staticNote}</p></div>
    `;
  }

  function syncDialog(strings, locale) {
    const detail = document.querySelector(".models-dialog .case-detail");
    const heading = detail?.querySelector(".case-heading");
    const lab = detail?.querySelector(".interactive-lab");
    if (!detail || !heading || !lab) return;

    setText(heading.querySelector(".section-kicker"), strings.modalKicker);
    setText(heading.querySelector("#case-title"), strings.modalTitle);
    setText(heading.querySelector("#case-intro"), strings.modalIntro);

    let gallery = detail.querySelector("[data-powerbi-gallery]");
    if (!gallery) {
      gallery = document.createElement("section");
      gallery.className = "powerbi-gallery";
      gallery.dataset.powerbiGallery = locale;
      heading.insertAdjacentElement("afterend", gallery);
    }
    if (gallery.dataset.powerbiGallery !== locale || !gallery.hasChildNodes()) {
      gallery.dataset.powerbiGallery = locale;
      gallery.innerHTML = galleryMarkup(strings);
    }

    let interactiveHeading = detail.querySelector("[data-interactive-showcase-heading]");
    if (!interactiveHeading) {
      interactiveHeading = document.createElement("div");
      interactiveHeading.className = "interactive-showcase-heading";
      interactiveHeading.dataset.interactiveShowcaseHeading = "true";
      lab.insertAdjacentElement("beforebegin", interactiveHeading);
    }
    const interactiveMarkup = `<h3>${strings.interactiveTitle}</h3><p>${strings.interactiveCopy}</p>`;
    if (interactiveHeading.innerHTML !== interactiveMarkup) interactiveHeading.innerHTML = interactiveMarkup;
  }

  function sync() {
    const locale = language();
    const strings = copy[locale];
    ensureStylesheet();
    syncProjectCard(strings);
    syncDialog(strings, locale);
  }

  const observer = new MutationObserver(sync);
  observer.observe(document.documentElement, { childList: true, subtree: true });
  sync();
})();
