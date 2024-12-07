const API_URL = "https://api.memegen.link/templates";
const memeContainer = document.getElementById("meme-cards");
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");

async function fetchMemes() {
  try {
    const response = await fetch(API_URL);
    const memes = await response.json();
    displayMemes(memes);
  } catch (error) {
    console.error("Error fetching memes:", error);
    memeContainer.innerHTML = "<p>Failed to load memes. Please try again later.</p>";
  }
}

function displayMemes(memes) {
  memeContainer.innerHTML = "";
  memes.forEach((meme) => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${meme.blank}" alt="${meme.name}">
      <div class="card-content">
        <h3>${meme.name}</h3>
        <p>Lines: 2</p>
      </div>
    `;
    memeContainer.appendChild(card);
  });
}

function searchMemes(memes, query) {
  const filteredMemes = memes.filter((meme) =>
    meme.name.toLowerCase().includes(query.toLowerCase())
  );
  displayMemes(filteredMemes);
}

searchBtn.addEventListener("click", async () => {
  const query = searchInput.value.trim();
  if (query) {
    const response = await fetch(API_URL);
    const memes = await response.json();
    searchMemes(memes, query);
  } else {
    fetchMemes();
  }
});

fetchMemes();
