const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const recipesContainer = document.getElementById('recipes-container');

const API_URL = 'https://dummyjson.com/recipes';

// Event listeners
searchInput.addEventListener('input', handleSearch);
searchButton.addEventListener('click', () => fetchRecipes(searchInput.value.trim()));

function handleSearch() {
    fetchRecipes(searchInput.value.trim());
}


async function fetchRecipes(query) {
    if (!query) {
        fetchAllRecipes();
        return;
    }

    try {
        const response = await fetch(`${API_URL}/search?q=${encodeURIComponent(query)}`);
        const data = await response.json();
        displayRecipes(data.recipes);
    } catch (error) {
        console.error('Error fetching recipes:', error);
        recipesContainer.innerHTML = '<p>Error fetching recipes. Please try again later.</p>';
    }
}

async function fetchAllRecipes() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        displayRecipes(data.recipes);
    } catch (error) {
        console.error('Error fetching all recipes:', error);
        recipesContainer.innerHTML = '<p>Error fetching recipes. Please try again later.</p>';
    }
}

function displayRecipes(recipes) {
    recipesContainer.innerHTML = '';
    
    if (recipes.length === 0) {
        // Instead of showing a message, fetch and display all recipes
        fetchAllRecipes();
        return;
    }

    recipes.forEach(recipe => {
        const recipeCard = createRecipeCard(recipe);
        recipesContainer.appendChild(recipeCard);
    });
}

function createRecipeCard(recipe) {
    const card = document.createElement('div');
    card.className = 'recipe-card';

    const image = document.createElement('img');
    image.src = recipe.image || 'placeholder.jpg';
    image.alt = recipe.name;

    const content = document.createElement('div');
    content.className = 'recipe-card-content';

    const title = document.createElement('h2');
    title.textContent = recipe.name;

    const ingredients = document.createElement('ul');
    recipe.ingredients.slice(0, 5).forEach(ingredient => {
        const li = document.createElement('li');
        li.textContent = ingredient;
        ingredients.appendChild(li);
    });

    const instructions = document.createElement('p');
    instructions.textContent = recipe.instructions.slice(0, 100) + '...';

    content.appendChild(title);
    content.appendChild(ingredients);
    content.appendChild(instructions);

    card.appendChild(image);
    card.appendChild(content);

    return card;
}

// Initial load
fetchRecipes();

