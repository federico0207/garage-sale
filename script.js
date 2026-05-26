
const SHEET_JSON_URL = "PASTE_YOUR_SHEETBEST_URL_HERE";

let products = [];

async function loadProducts() {
  const response = await fetch(SHEET_JSON_URL);
  products = await response.json();

  populateCategories();
  renderProducts();
}

function populateCategories() {
  const categoryFilter = document.getElementById("categoryFilter");

  const categories = [...new Set(products.map(p => p.Categoria))];

  categories.forEach(category => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });
}

function renderProducts() {

  const search = document.getElementById("searchInput").value.toLowerCase();
  const category = document.getElementById("categoryFilter").value;
  const status = document.getElementById("statusFilter").value;

  const container = document.getElementById("products");
  container.innerHTML = "";

  const filtered = products.filter(product => {

    const matchSearch =
      product.Nome.toLowerCase().includes(search) ||
      product.Descrizione.toLowerCase().includes(search);

    const matchCategory =
      category === "all" || product.Categoria === category;

    const matchStatus =
      status === "all" || product.Stato === status;

    return matchSearch && matchCategory && matchStatus;
  });

  filtered.forEach(product => {

    const card = document.createElement("div");
    card.className = "card";

    let badgeClass = "disponibile";

    if (product.Stato === "Prenotato") {
      badgeClass = "prenotato";
    }

    if (product.Stato === "Venduto") {
      badgeClass = "venduto";
    }

    card.innerHTML = `
      <img src="${product.Foto}" alt="">
      <div class="content">
        <h2>${product.Nome}</h2>
        <p>${product.Descrizione}</p>
        <div class="price">${product.Prezzo}</div>
        <div>${product.Categoria}</div>
        <div class="badge ${badgeClass}">
          ${product.Stato}
        </div>
      </div>
    `;

    container.appendChild(card);
  });
}

document.getElementById("searchInput").addEventListener("input", renderProducts);
document.getElementById("categoryFilter").addEventListener("change", renderProducts);
document.getElementById("statusFilter").addEventListener("change", renderProducts);

loadProducts();
