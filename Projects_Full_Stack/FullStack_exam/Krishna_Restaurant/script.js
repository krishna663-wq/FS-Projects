const recipeContainer = document.getElementById("recipe-container");
const searchBar = document.getElementById("search-bar");

async function code(query = "") {
  try {
    const response = await fetch(
      `https://dummyjson.com/recipes/search?q=${query}`
    );
    const data = await response.json();
    displayRecipes(data.recipes);
  } catch (error) {
    console.error("Error fetching recipes:", error);
    recipeContainer.innerHTML = "<p>Sorry we Don't. have that food </p>";
  }
}

function displayRecipes(recipes) {
  recipeContainer.innerHTML = recipes.length
    ? recipes.map(recipeToCardHTML).join("")
    : "<p>No recipes found. Try a different search term.</p>";
}

function recipeToCardHTML(recipe) {
  const image =
    recipe.image ||
    "https://via.placeholder.com/300x200?text=No+Image+Available"; // Fallback image
  const ingredientsList = recipe.ingredients
    .map((ingredient) => `<li>${ingredient}</li>`)
    .join("");
  const instructionsList = recipe.instructions
    .map((step) => `<li>${step}</li>`)
    .join("");

  return `
    <div class="recipe-card">
      <img src="${image}" alt="${recipe.name}">
      <div class="recipe-content">
        <h3 class="name">${recipe.name}</h3>
        <div class="recipe-details">
          <p><strong>Prep Time:</strong> ${recipe.prepTimeMinutes} mins</p>
          <p><strong>Cook Time:</strong> ${recipe.cookTimeMinutes} mins</p>
          <p><strong>Servings:</strong> ${recipe.servings}</p>
          <p><strong>Difficulty:</strong> ${recipe.difficulty}</p>
          <p><strong>Cuisine:</strong> ${recipe.cuisine}</p>
        </div>
        <div class="recipe-ingredients">
          <strong>Ingredients:</strong>
          <ul>${ingredientsList}</ul>
        </div>
        <div class="recipe-instructions">
          <strong>Instructions:</strong>
          <ol>${instructionsList}</ol>
        </div>
      </div>
    </div>
  `;
}

searchBar.addEventListener("input", (event) => {
  const query = event.target.value.trim();
  code(query);
});

code();
