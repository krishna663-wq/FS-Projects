const API_URL = "https://dummyjson.com/products";
const searchBar = document.getElementById("search-bar");
const productContainer = document.getElementById("product-container");

async function fetchProducts() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data.products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

function displayProducts(products) {
  productContainer.innerHTML = ""; 
  if (products.length === 0) {
    productContainer.innerHTML = "<p>No products found.</p>";
    return;
  }

  products.forEach((product) => {
    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
      <img src="${product.thumbnail}" alt="${product.title}" />
      <h2>${product.title}</h2>
      <p>${product.description}</p>
      <p class="price">$${product.price}</p>
    `;

    productContainer.appendChild(card);
  });
}
function filterProducts(products, query) {
  return products.filter((product) =>
    product.title.toLowerCase().includes(query.toLowerCase())
  );
}
async function init() {
  const products = await fetchProducts();
  displayProducts(products);

  searchBar.addEventListener("input", (e) => {
    const query = e.target.value;
    const filteredProducts = filterProducts(products, query);
    displayProducts(filteredProducts);
  });
}

init();
