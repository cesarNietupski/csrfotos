const ADMIN_PIN = "4321";
const STORAGE_KEY = "cesar_fotografia_site_data";
let data = JSON.parse(localStorage.getItem(STORAGE_KEY)) || DEFAULT_SITE_DATA;

const $ = (selector) => document.querySelector(selector);
const save = () => localStorage.setItem(STORAGE_KEY, JSON.stringify(data));

function login() {
  if ($("#pinInput").value === ADMIN_PIN) {
    $("#loginCard").classList.add("hidden");
    $("#dashboard").classList.remove("hidden");
    renderAll();
  } else {
    alert("PIN incorreto.");
  }
}

function field(label, value, onInput, type = "text") {
  const wrapper = document.createElement("label");
  wrapper.innerHTML = `<span>${label}</span>`;
  const input = type === "textarea" ? document.createElement("textarea") : document.createElement("input");
  input.value = value || "";
  input.addEventListener("input", () => { onInput(input.value); save(); });
  wrapper.appendChild(input);
  return wrapper;
}

function removeButton(callback) {
  const button = document.createElement("button");
  button.className = "remove-btn";
  button.textContent = "Remover";
  button.addEventListener("click", () => {
    if (confirm("Deseja remover este item?")) { callback(); save(); renderAll(); }
  });
  return button;
}

function renderPackages() {
  const editor = $("#packagesEditor");
  editor.innerHTML = "";
  data.packages.forEach((pkg, index) => {
    const card = document.createElement("article");
    card.className = "editor-card";
    const grid = document.createElement("div");
    grid.className = "form-grid";
    grid.append(
      field("Nome do pacote", pkg.name, v => pkg.name = v),
      field("Preço", pkg.price, v => pkg.price = v),
      field("Descrição", pkg.description, v => pkg.description = v, "textarea"),
      field("Itens inclusos, separados por vírgula", pkg.items.join(", "), v => pkg.items = v.split(",").map(i => i.trim()).filter(Boolean), "textarea")
    );
    grid.children[2].classList.add("full");
    grid.children[3].classList.add("full");
    const actions = document.createElement("div");
    actions.className = "card-actions";
    actions.append(removeButton(() => data.packages.splice(index, 1)));
    card.append(grid, actions);
    editor.appendChild(card);
  });
}

function renderContacts() {
  const editor = $("#contactsEditor");
  editor.innerHTML = "";
  data.contacts.forEach((contact, index) => {
    const card = document.createElement("article");
    card.className = "editor-card";
    const grid = document.createElement("div");
    grid.className = "form-grid";
    grid.append(
      field("Tipo", contact.type, v => contact.type = v),
      field("Texto exibido", contact.value, v => contact.value = v),
      field("Link", contact.link, v => contact.link = v)
    );
    grid.children[2].classList.add("full");
    const actions = document.createElement("div");
    actions.className = "card-actions";
    actions.append(removeButton(() => data.contacts.splice(index, 1)));
    card.append(grid, actions);
    editor.appendChild(card);
  });
}

function renderTestimonials() {
  const editor = $("#testimonialsEditor");
  editor.innerHTML = "";
  data.testimonials.forEach((item, index) => {
    const card = document.createElement("article");
    card.className = "editor-card";
    const grid = document.createElement("div");
    grid.className = "form-grid";
    grid.append(
      field("Nome do cliente", item.name, v => item.name = v),
      field("Avaliação", item.text, v => item.text = v, "textarea")
    );
    grid.children[1].classList.add("full");
    const actions = document.createElement("div");
    actions.className = "card-actions";
    actions.append(removeButton(() => data.testimonials.splice(index, 1)));
    card.append(grid, actions);
    editor.appendChild(card);
  });
}

function renderPortfolio() {
  const editor = $("#portfolioEditor");
  editor.innerHTML = "";
  data.portfolio.forEach((photo, index) => {
    const card = document.createElement("article");
    card.className = "editor-card";
    const preview = document.createElement("img");
    preview.className = "preview-img";
    preview.src = photo.image;
    preview.alt = photo.title;
    const grid = document.createElement("div");
    grid.className = "form-grid";
    grid.append(
      field("Título", photo.title, v => photo.title = v),
      field("Categoria", photo.category, v => photo.category = v),
      field("URL da imagem", photo.image, v => { photo.image = v; preview.src = v; })
    );
    grid.children[2].classList.add("full");
    const actions = document.createElement("div");
    actions.className = "card-actions";
    actions.append(removeButton(() => data.portfolio.splice(index, 1)));
    card.append(preview, grid, actions);
    editor.appendChild(card);
  });
}

function renderAll() {
  save();
  renderPackages();
  renderContacts();
  renderTestimonials();
  renderPortfolio();
}

$("#loginButton").addEventListener("click", login);
$("#pinInput").addEventListener("keydown", e => { if (e.key === "Enter") login(); });

$("#addPackage").addEventListener("click", () => { data.packages.push({ name: "Novo pacote", price: "R$ 0", description: "Descrição do pacote", items: ["Item incluso"] }); renderAll(); });
$("#addContact").addEventListener("click", () => { data.contacts.push({ type: "Novo contato", value: "Texto", link: "#" }); renderAll(); });
$("#addTestimonial").addEventListener("click", () => { data.testimonials.push({ name: "Cliente", text: "Escreva a avaliação aqui." }); renderAll(); });
$("#addPhoto").addEventListener("click", () => { data.portfolio.push({ title: "Nova foto", category: "Categoria", image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80" }); renderAll(); });

$("#exportButton").addEventListener("click", () => {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "dados-site-fotografia.json";
  a.click();
  URL.revokeObjectURL(url);
});

$("#importInput").addEventListener("change", event => {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      data = JSON.parse(reader.result);
      renderAll();
      alert("Dados importados com sucesso.");
    } catch {
      alert("Arquivo inválido.");
    }
  };
  reader.readAsText(file);
});

$("#resetButton").addEventListener("click", () => {
  if (confirm("Restaurar os dados de exemplo?")) {
    data = structuredClone(DEFAULT_SITE_DATA);
    renderAll();
  }
});

document.querySelectorAll(".tab").forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
    document.querySelectorAll(".panel").forEach(p => p.classList.remove("active"));
    tab.classList.add("active");
    $(`#${tab.dataset.tab}Panel`).classList.add("active");
  });
});
