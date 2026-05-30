
const SHEET_JSON_URL = "https://api.sheetbest.com/sheets/17f1e164-f628-467d-a2f8-811c80e3dbb0";

let products = [];

let currentImages = [];
let currentIndex = 0;
let currentProduct = null;

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
    
card.style.cursor = "pointer";

card.onclick = function() {
  currentProduct = product;
  currentImages = product.Foto.split(",");
  currentIndex = 0;
  openModal();
};

    let badgeClass = "disponibile";

    if (product.Stato === "Reservado") {
      badgeClass = "prenotato";
    }

    if (product.Stato === "Vendido") {
      badgeClass = "venduto";
    }

    card.innerHTML = `
      <img src="${product.Foto.split(',')[0]}" alt="">
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

const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImage");

function openModal() {

  modal.style.display = "block";

  modalImg.src = currentImages[currentIndex];

  document.getElementById("modalTitle").textContent =
    currentProduct.Nome;

  document.getElementById("modalPrice").textContent =
    currentProduct.Prezzo;

  document.getElementById("modalDescription").textContent =
    currentProduct.Descrizione;

  const message =
    `Hola, me interesa ${currentProduct.Nome}`;

  document.getElementById("productWhatsapp").href =
    `https://wa.me/529981308940?text=${encodeURIComponent(message)}`;
}

  const message =
    `Hola, me interesa ${currentProduct.Nome}`;

  document.getElementById("productWhatsapp").href =
    `https://wa.me/529981308940?text=${encodeURIComponent(message)}`;
}

function closeModal() {
  modal.style.display = "none";
}

document.querySelector(".close").onclick = closeModal;

document.getElementById("nextBtn").onclick = () => {
  currentIndex =
    (currentIndex + 1) % currentImages.length;

  modalImg.src = currentImages[currentIndex];
};

document.getElementById("prevBtn").onclick = () => {
  currentIndex =
    (currentIndex - 1 + currentImages.length)
    % currentImages.length;

  modalImg.src = currentImages[currentIndex];
};

window.onclick = function(event) {
  if (event.target == modal) {
    closeModal();
  }
};

let touchStartX = 0;
let touchEndX = 0;

modalImg.addEventListener("touchstart", (e) => {
  touchStartX = e.changedTouches[0].screenX;
});

modalImg.addEventListener("touchend", (e) => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
});

function handleSwipe() {

  const swipeDistance = touchEndX - touchStartX;

  // Ignore very short swipes
  if (Math.abs(swipeDistance) < 50) {
    return;
  }

  // Swipe left = next image
  if (swipeDistance < 0) {
    currentIndex =
      (currentIndex + 1) % currentImages.length;

    modalImg.src = currentImages[currentIndex];
  }

  // Swipe right = previous image
  if (swipeDistance > 0) {
    currentIndex =
      (currentIndex - 1 + currentImages.length)
      % currentImages.length;

    modalImg.src = currentImages[currentIndex];
  }
}
