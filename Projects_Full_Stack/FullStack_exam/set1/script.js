const searchBox = document.getElementById("searchBox");
const productCardsContainer = document.getElementById("productCards");

// Fetching products from the API
async function fetchProducts() {
  const response = await fetch("https://fakestoreapi.com/products");
  const products = await response.json();
  return products;
}

// Display product cards
function displayProducts(products) {
  productCardsContainer.innerHTML = "";
  products.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.classList.add("product-card");
    productCard.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p>${product.description}</p>
            <div class="price">$${product.price}</div>
        `;
    productCardsContainer.appendChild(productCard);
  });
}

// Search products by title
searchBox.addEventListener("input", async function () {
  const searchQuery = searchBox.value.toLowerCase();
  const products = await fetchProducts();
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery)
  );
  displayProducts(filteredProducts);
});

// Initial product fetch on page load
fetchProducts().then(displayProducts);
