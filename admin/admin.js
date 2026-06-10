const ADMIN_PIN = "1234";
const STORAGE_KEY = "csrfotos_admin_draft";
const LEGACY_STORAGE_KEY = "csrfotos_site_data";
const CONFIG_URL = "../config/site-data.json";

let data = normalizeSiteData(DEFAULT_SITE_DATA);
let loadedFrom = "dados padrão";

const $ = s => document.querySelector(s);
const save = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  updateStatus("Rascunho salvo neste navegador. Para publicar, baixe o JSON e substitua config/site-data.json.");
};

async function loadInitialData() {
  const draft = localStorage.getItem(STORAGE_KEY) || localStorage.getItem(LEGACY_STORAGE_KEY);
  if (draft) {
    try {
      data = normalizeSiteData(JSON.parse(draft));
      loadedFrom = "rascunho salvo no navegador";
      return;
    } catch {}
  }

  try {
    const response = await fetch(CONFIG_URL, { cache: "no-store" });
    if (!response.ok) throw new Error("JSON não encontrado");
    data = normalizeSiteData(await response.json());
    loadedFrom = "config/site-data.json";
  } catch (error) {
    console.warn("Usando dados padrão porque o arquivo JSON estático não foi carregado.", error);
    data = normalizeSiteData(DEFAULT_SITE_DATA);
    loadedFrom = "dados padrão";
  }
}

function updateStatus(message) {
  const el = $("#jsonStatus");
  if (el) el.textContent = message;
}

function login() {
  if ($("#pinInput").value === ADMIN_PIN) {
    $("#loginCard").classList.add("hidden");
    $("#dashboard").classList.remove("hidden");
    renderAll(false);
    updateStatus(`Dados carregados de: ${loadedFrom}. O site público lê somente o arquivo config/site-data.json.`);
  } else {
    alert("PIN incorreto.");
  }
}

function field(label, value, onInput, type = "text") {
  const w = document.createElement("label");
  w.innerHTML = `<span>${label}</span>`;
  const i = type === "textarea" ? document.createElement("textarea") : document.createElement("input");
  i.value = value || "";
  i.addEventListener("input", () => { onInput(i.value); save(); });
  w.appendChild(i);
  return w;
}

function removeButton(cb) {
  const b = document.createElement("button");
  b.className = "remove-btn";
  b.textContent = "Remover";
  b.onclick = () => { if (confirm("Deseja remover este item?")) { cb(); renderAll(); } };
  return b;
}

function cardWith(fields, removeCb, preview, extra) {
  const c = document.createElement("article");
  c.className = "editor-card";
  if (preview) c.append(preview);
  const g = document.createElement("div");
  g.className = "form-grid";
  fields.forEach((f, i) => { g.append(f); if (i >= 2 || f.querySelector("textarea")) f.classList.add("full"); });
  c.append(g);
  if (extra) c.append(extra);
  if (removeCb) {
    const a = document.createElement("div");
    a.className = "card-actions";
    a.append(removeButton(removeCb));
    c.append(a);
  }
  return c;
}

function fitStyle(fit) {
  const safe = normalizeImageFit(fit);
  return `--fit-x:${safe.x}%;--fit-y:${safe.y}%;--fit-zoom:${safe.zoom};`;
}

function rangeField(label, value, min, max, step, onInput) {
  const w = document.createElement("label");
  w.className = "range-field";
  const title = document.createElement("span");
  const output = document.createElement("strong");
  const input = document.createElement("input");
  input.type = "range";
  input.min = min;
  input.max = max;
  input.step = step;
  input.value = value;
  const setOutput = () => { output.textContent = label.includes("Zoom") ? `${Number(input.value).toFixed(2)}x` : `${input.value}%`; };
  title.textContent = label;
  setOutput();
  input.addEventListener("input", () => { setOutput(); onInput(Number(input.value)); save(); });
  w.append(title, output, input);
  return w;
}

function fitEditor(title, fit, previewImg) {
  fit = normalizeImageFit(fit);
  const box = document.createElement("div");
  box.className = "fit-editor";
  box.innerHTML = `<h3>${title}</h3><p class="hint">Use estes controles para mover a foto dentro da máscara e evitar cortes em rostos, detalhes ou objetos importantes.</p>`;
  const previewWrap = document.createElement("div");
  previewWrap.className = "mask-preview";
  const preview = previewImg.cloneNode();
  previewWrap.append(preview);
  const apply = () => {
    preview.style.cssText = fitStyle(fit);
    if (previewImg) previewImg.style.cssText = fitStyle(fit);
  };
  apply();
  const controls = document.createElement("div");
  controls.className = "fit-controls";
  controls.append(
    rangeField("Horizontal", fit.x, 0, 100, 1, v => { fit.x = v; apply(); }),
    rangeField("Vertical", fit.y, 0, 100, 1, v => { fit.y = v; apply(); }),
    rangeField("Zoom", fit.zoom, 1, 2.5, 0.01, v => { fit.zoom = v; apply(); })
  );
  box.append(previewWrap, controls);
  return { element: box, fit };
}

const TEXT_LABELS = {
  siteTitle: "Título da aba do navegador",
  brandHighlight: "Marca destacada",
  brandRest: "Complemento da marca",
  navAbout: "Menu: Sobre",
  navPortfolio: "Menu: Portfólio",
  navPackages: "Menu: Pacotes",
  navTestimonials: "Menu: Avaliações",
  navContact: "Menu: Contato",
  heroEyebrow: "Destaque acima do título principal",
  heroTitle: "Título principal",
  heroText: "Texto principal",
  heroPrimaryButton: "Botão principal",
  heroSecondaryButton: "Botão secundário",
  heroImage: "URL da imagem principal",
  heroImageAlt: "Descrição da imagem principal",
  heroBadgeLine1: "Selo na imagem: linha 1",
  heroBadgeLine2: "Selo na imagem: linha 2",
  aboutEyebrow: "Sobre: destaque",
  aboutTitle: "Sobre: título",
  aboutText: "Sobre: texto",
  portfolioEyebrow: "Portfólio: destaque",
  portfolioTitle: "Portfólio: título",
  portfolioText: "Portfólio: texto",
  packagesEyebrow: "Pacotes: destaque",
  packagesTitle: "Pacotes: título",
  packagesText: "Pacotes: texto",
  packageButton: "Texto do botão dos pacotes",
  testimonialsEyebrow: "Avaliações: destaque",
  testimonialsTitle: "Avaliações: título",
  contactEyebrow: "Contato: destaque",
  contactTitle: "Contato: título",
  contactText: "Contato: texto",
  footerText: "Texto do rodapé",
  adminLink: "Link da área administrativa",
  galleryCloseLabel: "Acessibilidade: fechar galeria",
  galleryPreviousLabel: "Acessibilidade: foto anterior",
  galleryNextLabel: "Acessibilidade: próxima foto",
  galleryCounterLabel: "Texto do contador da galeria"
};

function renderTexts() {
  const e = $("#textsEditor");
  e.innerHTML = "";
  const c = document.createElement("article");
  c.className = "editor-card";
  const g = document.createElement("div");
  g.className = "form-grid";
  Object.entries(TEXT_LABELS).forEach(([k, l]) => {
    const large = /Text|Title|footer|gallery/.test(k);
    const f = field(l, data.texts[k], v => { data.texts[k] = v; if (k === "heroImage") heroPreview.src = v; }, large ? "textarea" : "text");
    if (large) f.classList.add("full");
    g.append(f);
  });
  c.append(g);
  const heroPreview = document.createElement("img");
  heroPreview.className = "preview-img mask-fit-img";
  heroPreview.src = data.texts.heroImage;
  heroPreview.alt = "Prévia da imagem principal";
  const editor = fitEditor("Enquadramento da imagem principal", data.texts.heroImageFit, heroPreview);
  data.texts.heroImageFit = editor.fit;
  c.append(editor.element);
  e.append(c);
}

function renderPackages() {
  const e = $("#packagesEditor");
  e.innerHTML = "";
  data.packages.forEach((p, x) => e.append(cardWith([
    field("Nome", p.name, v => p.name = v),
    field("Preço", p.price, v => p.price = v),
    field("Descrição", p.description, v => p.description = v, "textarea"),
    field("Itens, separados por vírgula", (p.items || []).join(", "), v => p.items = v.split(",").map(s => s.trim()).filter(Boolean), "textarea")
  ], () => { data.packages.splice(x, 1); save(); })));
}

function renderContacts() {
  const e = $("#contactsEditor");
  e.innerHTML = "";
  data.contacts.forEach((c, x) => e.append(cardWith([
    field("Tipo", c.type, v => c.type = v),
    field("Texto exibido", c.value, v => c.value = v),
    field("Link", c.link, v => c.link = v)
  ], () => { data.contacts.splice(x, 1); save(); })));
}

function renderTestimonials() {
  const e = $("#testimonialsEditor");
  e.innerHTML = "";
  data.testimonials.forEach((t, x) => e.append(cardWith([
    field("Nome do cliente", t.name, v => t.name = v),
    field("Avaliação", t.text, v => t.text = v, "textarea")
  ], () => { data.testimonials.splice(x, 1); save(); })));
}

function renderPortfolio() {
  const e = $("#portfolioEditor");
  e.innerHTML = "";
  data.portfolio.forEach((a, x) => {
    a.coverFit = normalizeImageFit(a.coverFit);
    const p = document.createElement("img");
    p.className = "preview-img mask-fit-img";
    p.src = a.cover || a.images[0];
    p.alt = "Prévia da capa";
    p.style.cssText = fitStyle(a.coverFit);
    const fit = fitEditor("Enquadramento da capa do álbum", a.coverFit, p);
    a.coverFit = fit.fit;
    e.append(cardWith([
      field("Título do ensaio", a.title, v => a.title = v),
      field("Categoria", a.category, v => a.category = v),
      field("URL da capa", a.cover, v => { a.cover = v; p.src = v; fit.element.querySelector("img").src = v; }),
      field("Fotos do álbum — uma URL por linha", (a.images || []).join("\n"), v => a.images = v.split(/\n/).map(s => s.trim()).filter(Boolean), "textarea")
    ], () => { data.portfolio.splice(x, 1); save(); }, p, fit.element));
  });
}

function renderAll(shouldSave = true) {
  if (shouldSave) save();
  renderTexts();
  renderPortfolio();
  renderPackages();
  renderContacts();
  renderTestimonials();
}

function exportJson() {
  const file = new Blob([JSON.stringify(normalizeSiteData(data), null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(file);
  const a = document.createElement("a");
  a.href = url;
  a.download = "site-data.json";
  a.click();
  URL.revokeObjectURL(url);
  updateStatus("Arquivo site-data.json gerado. Substitua o arquivo dentro da pasta config/ para publicar no site.");
}

function copyJson() {
  const json = JSON.stringify(normalizeSiteData(data), null, 2);
  navigator.clipboard.writeText(json).then(() => {
    updateStatus("JSON copiado. Cole esse conteúdo no arquivo config/site-data.json para publicar.");
  }).catch(() => alert("Não foi possível copiar automaticamente. Use o botão Baixar site-data.json."));
}

async function start() {
  await loadInitialData();

  $("#loginButton").onclick = login;
  $("#pinInput").onkeydown = e => { if (e.key === "Enter") login(); };
  $("#addAlbum").onclick = () => { data.portfolio.push({ title: "Novo ensaio", category: "Categoria", cover: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80", coverFit: { x: 50, y: 50, zoom: 1 }, images: ["https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=85"] }); renderAll(); };
  $("#addPackage").onclick = () => { data.packages.push({ name: "Novo pacote", price: "R$ 0", description: "Descrição", items: ["Item incluso"] }); renderAll(); };
  $("#addContact").onclick = () => { data.contacts.push({ type: "Novo contato", value: "Texto", link: "#" }); renderAll(); };
  $("#addTestimonial").onclick = () => { data.testimonials.push({ name: "Cliente", text: "Avaliação" }); renderAll(); };
  $("#exportButton").onclick = exportJson;
  $("#copyButton").onclick = copyJson;
  $("#importInput").onchange = e => {
    const f = e.target.files[0];
    if (!f) return;
    const r = new FileReader();
    r.onload = () => {
      try {
        data = normalizeSiteData(JSON.parse(r.result));
        renderAll();
        alert("Dados importados com sucesso.");
      } catch {
        alert("Arquivo inválido.");
      }
    };
    r.readAsText(f);
  };
  $("#resetButton").onclick = () => { if (confirm("Restaurar os dados de exemplo?")) { data = normalizeSiteData(DEFAULT_SITE_DATA); renderAll(); } };
  document.querySelectorAll(".tab").forEach(t => t.onclick = () => {
    document.querySelectorAll(".tab,.panel").forEach(i => i.classList.remove("active"));
    t.classList.add("active");
    $("#" + t.dataset.tab + "Panel").classList.add("active");
  });
}

start();
