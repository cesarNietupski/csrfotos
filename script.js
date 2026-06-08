const STORAGE_KEY = "csrfotos_site_data";
const LEGACY_STORAGE_KEY = "cesar_fotografia_site_data";
const storedData = localStorage.getItem(STORAGE_KEY) || localStorage.getItem(LEGACY_STORAGE_KEY);
let siteData = normalizeSiteData(storedData ? JSON.parse(storedData) : DEFAULT_SITE_DATA);
let currentCategory = "Todos";
let currentAlbum = null;
let currentImageIndex = 0;
const $ = selector => document.querySelector(selector);
const $$ = selector => document.querySelectorAll(selector);
const escapeHtml = value => String(value ?? "").replace(/[&<>'"]/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[char]));
function imageFitStyle(fit) {
  const safe = normalizeImageFit(fit);
  return `--fit-x:${safe.x}%;--fit-y:${safe.y}%;--fit-zoom:${safe.zoom};--fit-hover-zoom:${(safe.zoom * 1.08).toFixed(3)};`;
}

function saveData() { localStorage.setItem(STORAGE_KEY, JSON.stringify(siteData)); }
function renderTexts() {
  const t = siteData.texts;
  document.title = t.siteTitle;
  Object.entries(t).forEach(([key, value]) => { const el = document.getElementById(key); if (el && key !== "heroImage" && key !== "heroImageAlt") el.textContent = value; });
  $("#heroImage").src = t.heroImage; $("#heroImage").alt = t.heroImageAlt; $("#heroImage").style.cssText = imageFitStyle(t.heroImageFit);
  $("#albumClose").ariaLabel = t.galleryCloseLabel; $("#albumPrevious").ariaLabel = t.galleryPreviousLabel; $("#albumNext").ariaLabel = t.galleryNextLabel;
}
function renderContacts() { $("#contactList").innerHTML = siteData.contacts.map(c => `<a class="contact-item" href="${escapeHtml(c.link)}" target="_blank" rel="noopener"><span>${escapeHtml(c.type)}</span><strong>${escapeHtml(c.value)}</strong></a>`).join(""); }
function renderPackages() { $("#packageGrid").innerHTML = siteData.packages.map(p => `<article class="package-card"><h3>${escapeHtml(p.name)}</h3><p class="price">${escapeHtml(p.price)}</p><p>${escapeHtml(p.description)}</p><ul>${p.items.map(i => `<li>${escapeHtml(i)}</li>`).join("")}</ul><a class="btn small" href="#contato">${escapeHtml(siteData.texts.packageButton)}</a></article>`).join(""); }
function renderTestimonials() { $("#testimonialGrid").innerHTML = siteData.testimonials.map(i => `<article class="testimonial-card"><p>“${escapeHtml(i.text)}”</p><strong>${escapeHtml(i.name)}</strong></article>`).join(""); }
function renderPortfolioFilters() {
  const categories = ["Todos", ...new Set(siteData.portfolio.map(i => i.category).filter(Boolean))];
  $("#portfolioFilters").innerHTML = categories.map(c => `<button class="filter-btn ${c === currentCategory ? "active" : ""}" data-category="${escapeHtml(c)}">${escapeHtml(c)}</button>`).join("");
  $$(".filter-btn").forEach(b => b.addEventListener("click", () => { currentCategory = b.dataset.category; renderPortfolio(); }));
}
function renderPortfolio() {
  renderPortfolioFilters();
  const albums = currentCategory === "Todos" ? siteData.portfolio : siteData.portfolio.filter(i => i.category === currentCategory);
  $("#portfolioGrid").innerHTML = albums.map(a => `<button class="photo-card" data-index="${siteData.portfolio.indexOf(a)}"><img style="${imageFitStyle(a.coverFit)}" src="${escapeHtml(a.cover || a.images[0])}" alt="${escapeHtml(a.title)}" loading="lazy" /><span>${escapeHtml(a.category)} • ${a.images.length} fotos</span><strong>${escapeHtml(a.title)}</strong></button>`).join("");
  $$(".photo-card").forEach(card => card.addEventListener("click", () => openAlbum(Number(card.dataset.index))));
}
function openAlbum(index) { currentAlbum = siteData.portfolio[index]; currentImageIndex = 0; renderAlbum(); $("#albumLightbox").classList.add("show"); $("#albumLightbox").setAttribute("aria-hidden", "false"); document.body.classList.add("no-scroll"); }
function renderAlbum() {
  if (!currentAlbum) return;
  const images = currentAlbum.images.length ? currentAlbum.images : [currentAlbum.cover];
  currentImageIndex = (currentImageIndex + images.length) % images.length;
  $("#albumImage").src = images[currentImageIndex]; $("#albumImage").alt = `${currentAlbum.title} - ${currentImageIndex + 1}`;
  $("#albumTitle").textContent = currentAlbum.title; $("#albumMeta").textContent = `${currentAlbum.category} • ${siteData.texts.galleryCounterLabel} ${currentImageIndex + 1} de ${images.length}`;
  $("#albumThumbnails").innerHTML = images.map((img, i) => `<button class="album-thumb ${i === currentImageIndex ? "active" : ""}" data-image-index="${i}"><img src="${escapeHtml(img)}" alt="Miniatura ${i + 1}" /></button>`).join("");
  $$(".album-thumb").forEach(b => b.addEventListener("click", () => { currentImageIndex = Number(b.dataset.imageIndex); renderAlbum(); }));
}
function closeAlbum() { $("#albumLightbox").classList.remove("show"); $("#albumLightbox").setAttribute("aria-hidden", "true"); document.body.classList.remove("no-scroll"); }
function setupAlbum() {
  $("#albumClose").addEventListener("click", closeAlbum); $("#albumPrevious").addEventListener("click", () => { currentImageIndex--; renderAlbum(); }); $("#albumNext").addEventListener("click", () => { currentImageIndex++; renderAlbum(); });
  document.addEventListener("keydown", e => { if (!$("#albumLightbox").classList.contains("show")) return; if (e.key === "Escape") closeAlbum(); if (e.key === "ArrowLeft") { currentImageIndex--; renderAlbum(); } if (e.key === "ArrowRight") { currentImageIndex++; renderAlbum(); } });
}
function setupScrollReveal() { const observer = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); }), { threshold: .15 }); $$(".section-reveal").forEach(s => observer.observe(s)); }
function setupMenu() { $(".menu-toggle").addEventListener("click", () => $(".nav-links").classList.toggle("open")); $$(".nav-links a").forEach(a => a.addEventListener("click", () => $(".nav-links").classList.remove("open"))); }
function init() { saveData(); renderTexts(); renderContacts(); renderPackages(); renderTestimonials(); renderPortfolio(); setupAlbum(); setupScrollReveal(); setupMenu(); $("#year").textContent = new Date().getFullYear(); }
init();
