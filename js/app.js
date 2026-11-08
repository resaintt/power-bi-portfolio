(() => {
  "use strict";

  const content = window.PORTFOLIO_CONTENT;
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const state = { lang: new URLSearchParams(location.search).get("lang") === "en" ? "en" : "pt", filter: "all" };

  function escapeHtml(value) {
    return String(value).replace(/[&<>'"]/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[char]));
  }

  function translatePage() {
    const data = content[state.lang];
    document.documentElement.lang = state.lang === "pt" ? "pt-BR" : "en";
    $$('[data-i18n]').forEach(element => {
      const value = data.ui[element.dataset.i18n];
      if (value) element.textContent = value;
    });
    $$('[data-lang]').forEach(button => button.setAttribute("aria-pressed", String(button.dataset.lang === state.lang)));
    renderExpertise();
    renderFilters();
    renderProjects();
    renderProcess();
    renderQuotes();
  }

  function renderExpertise() {
    $('[data-expertise]').innerHTML = content[state.lang].expertise.map((item, index) => `
      <article class="expertise-card reveal"><span>0${index + 1}</span><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.text)}</p></article>
    `).join("");
    observeReveals();
  }

  function renderFilters() {
    const labels = content[state.lang].filters;
    $('[data-filters]').innerHTML = Object.entries(labels).map(([key, label]) => `
      <button type="button" data-filter="${key}" aria-pressed="${key === state.filter}">${escapeHtml(label)}</button>
    `).join("");
  }

  function renderProjects() {
    $('[data-projects]').innerHTML = content[state.lang].projects.map(project => `
      <article class="project-card reveal" data-category="${project.category}" ${state.filter !== "all" && state.filter !== project.category ? "hidden" : ""}>
        <div class="project-art"><span>${escapeHtml(project.label)}</span></div>
        <div class="project-body">
          <span class="project-meta">${escapeHtml(project.category.toUpperCase())}</span>
          <h3>${escapeHtml(project.title)}</h3><p>${escapeHtml(project.summary)}</p>
          <div class="tag-list">${project.tags.map(tag => `<span>${escapeHtml(tag)}</span>`).join("")}</div>
          <button type="button" data-project="${project.id}">${state.lang === "pt" ? "Explorar estudo de caso →" : "Explore case study →"}</button>
        </div>
      </article>
    `).join("");
    observeReveals();
  }

  function renderProcess() {
    $('[data-process]').innerHTML = content[state.lang].process.map(([title, text], index) => `
      <li class="reveal"><span>0${index + 1}</span><h3>${escapeHtml(title)}</h3><p>${escapeHtml(text)}</p></li>
    `).join("");
    observeReveals();
  }

  function renderQuotes() {
    $('[data-quotes]').innerHTML = content[state.lang].quotes.map(quote => `
      <blockquote class="quote reveal"><p>“${escapeHtml(quote.text)}”</p><footer>${escapeHtml(quote.name)}<span>${escapeHtml(quote.role)}</span></footer></blockquote>
    `).join("");
    observeReveals();
  }

  function setLanguage(lang, closeIntro = false) {
    state.lang = lang;
    const url = new URL(location.href);
    url.searchParams.set("lang", lang);
    history.replaceState({}, "", url);
    translatePage();
    if (closeIntro) {
      const intro = $('[data-intro]');
      intro.classList.add("is-leaving");
      sessionStorage.setItem("portfolio-intro-seen", "1");
      setTimeout(() => { intro.hidden = true; }, 560);
    }
  }

  function openProject(id) {
    const project = content[state.lang].projects.find(item => item.id === id);
    if (!project) return;
    $('[data-modal-content]').innerHTML = `<article class="case-content">
      <p class="eyebrow">${escapeHtml(project.label)}</p><h2 id="case-title">${escapeHtml(project.title)}</h2>
      <div class="tag-list">${project.tags.map(tag => `<span>${escapeHtml(tag)}</span>`).join("")}</div>
      <h3>${state.lang === "pt" ? "DESAFIO" : "CHALLENGE"}</h3><p>${escapeHtml(project.challenge)}</p>
      <h3>${state.lang === "pt" ? "SOLUÇÃO" : "SOLUTION"}</h3><p>${escapeHtml(project.solution)}</p>
      <h3>${state.lang === "pt" ? "CONTRIBUIÇÃO" : "CONTRIBUTION"}</h3><p>${escapeHtml(project.contribution)}</p>
    </article>`;
    const modal = $('[data-modal]');
    modal.showModal();
    document.body.classList.add("modal-open");
  }

  let revealObserver;
  function observeReveals() {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      $$('.reveal').forEach(element => element.classList.add('is-visible'));
      return;
    }
    revealObserver ||= new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); revealObserver.unobserve(entry.target); }
    }), { threshold: .12 });
    $$('.reveal:not(.is-visible)').forEach(element => revealObserver.observe(element));
  }

  function animateCounters() {
    const counterObserver = new IntersectionObserver(entries => entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const target = Number(entry.target.dataset.counter);
      const started = performance.now();
      const tick = now => {
        const progress = Math.min((now - started) / 900, 1);
        entry.target.textContent = String(Math.round(target * (1 - Math.pow(1 - progress, 3))));
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      counterObserver.unobserve(entry.target);
    }), { threshold: .8 });
    $$('[data-counter]').forEach(counter => counterObserver.observe(counter));
  }

  function bindEvents() {
    document.addEventListener('click', event => {
      const enter = event.target.closest('[data-enter-lang]');
      if (enter) setLanguage(enter.dataset.enterLang, true);
      const lang = event.target.closest('[data-lang]');
      if (lang) setLanguage(lang.dataset.lang);
      const filter = event.target.closest('[data-filter]');
      if (filter) { state.filter = filter.dataset.filter; renderFilters(); renderProjects(); }
      const project = event.target.closest('[data-project]');
      if (project) openProject(project.dataset.project);
      if (event.target.closest('[data-modal-close]')) $('[data-modal]').close();
      const menuLink = event.target.closest('[data-nav] a');
      if (menuLink) { $('[data-nav]').classList.remove('is-open'); $('[data-menu]').setAttribute('aria-expanded', 'false'); }
    });
    $('[data-menu]').addEventListener('click', event => {
      const open = $('[data-nav]').classList.toggle('is-open');
      event.currentTarget.setAttribute('aria-expanded', String(open));
    });
    $('[data-modal]').addEventListener('close', () => document.body.classList.remove('modal-open'));
    window.addEventListener('scroll', () => $('[data-header]').classList.toggle('is-scrolled', scrollY > 15), { passive: true });
  }

  function init() {
    bindEvents();
    translatePage();
    observeReveals();
    animateCounters();
    if (sessionStorage.getItem('portfolio-intro-seen') === '1' || location.hash) $('[data-intro]').hidden = true;
  }

  init();
})();
