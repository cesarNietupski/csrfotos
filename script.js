const STORAGE_KEY = "cesar_fotografia_site_data";
let siteData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || DEFAULT_SITE_DATA;
let currentCategory = "Todos";

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

function saveData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(siteData));
}

function renderContacts() {
  const contactList = $("#contactList");
  contactList.innerHTML = siteData.contacts.map(contact => `
    <a class="contact-item" href="${contact.link}" target="_blank" rel="noopener">
      <span>${contact.type}</span>
      <strong>${contact.value}</strong>
    </a>
  `).join("");
}

function renderPackages() {
  const grid = $("#packageGrid");
  grid.innerHTML = siteData.packages.map(pkg => `
    <article class="package-card">
      <h3>${pkg.name}</h3>
      <p class="price">${pkg.price}</p>
      <p>${pkg.description}</p>
      <ul>${pkg.items.map(item => `<li>${item}</li>`).join("")}</ul>
      <a class="btn small" href="#contato">Quero este pacote</a>
    </article>
  `).join("");
}

function renderTestimonials() {
  const grid = $("#testimonialGrid");
  grid.innerHTML = siteData.testimonials.map(item => `
    <article class="testimonial-card">
      <p>“${item.text}”</p>
      <strong>${item.name}</strong>
    </article>
  `).join("");
}

function renderPortfolioFilters() {
  const filters = $("#portfolioFilters");
  const categories = ["Todos", ...new Set(siteData.portfolio.map(item => item.category).filter(Boolean))];
  filters.innerHTML = categories.map(category => `
    <button class="filter-btn ${category === currentCategory ? "active" : ""}" data-category="${category}">${category}</button>
  `).join("");

  $$(".filter-btn").forEach(button => {
    button.addEventListener("click", () => {
      currentCategory = button.dataset.category;
      renderPortfolio();
    });
  });
}

function renderPortfolio() {
  renderPortfolioFilters();
  const grid = $("#portfolioGrid");
  const photos = currentCategory === "Todos"
    ? siteData.portfolio
    : siteData.portfolio.filter(item => item.category === currentCategory);

  grid.innerHTML = photos.map((photo, index) => `
    <button class="photo-card" data-index="${siteData.portfolio.indexOf(photo)}">
      <img src="${photo.image}" alt="${photo.title}" loading="lazy" />
      <span>${photo.category}</span>
      <strong>${photo.title}</strong>
    </button>
  `).join("");

  $$(".photo-card").forEach(card => {
    card.addEventListener("click", () => openLightbox(siteData.portfolio[card.dataset.index]));
  });
}

function openLightbox(photo) {
  const lightbox = $("#lightbox");
  lightbox.querySelector("img").src = photo.image;
  lightbox.querySelector("p").textContent = `${photo.title} • ${photo.category}`;
  lightbox.classList.add("show");
  lightbox.setAttribute("aria-hidden", "false");
}

function setupLightbox() {
  const lightbox = $("#lightbox");
  $(".lightbox-close").addEventListener("click", () => {
    lightbox.classList.remove("show");
    lightbox.setAttribute("aria-hidden", "true");
  });
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) lightbox.classList.remove("show");
  });
}

function setupScrollReveal() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  }, { threshold: 0.15 });
  $$(".section-reveal").forEach(section => observer.observe(section));
}

function setupMenu() {
  $(".menu-toggle").addEventListener("click", () => $(".nav-links").classList.toggle("open"));
}

function init() {
  saveData();
  renderContacts();
  renderPackages();
  renderTestimonials();
  renderPortfolio();
  setupLightbox();
  setupScrollReveal();
  setupMenu();
  $("#year").textContent = new Date().getFullYear();
}

init();
