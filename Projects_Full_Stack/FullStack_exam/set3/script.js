// script.js
document.getElementById("search-button").addEventListener("click", () => {
  const query = document.getElementById("search-input").value.trim();
  if (query) {
    fetchShows(query);
  }
});

async function fetchShows(query) {
  const apiUrl = `https://api.tvmaze.com/search/shows?q=${query}`;
  const resultsContainer = document.getElementById("results");
  resultsContainer.innerHTML = "<p>Loading...</p>";

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.length === 0) {
      resultsContainer.innerHTML = "<p>No results found.</p>";
      return;
    }

    resultsContainer.innerHTML = "";
    data.forEach((item) => {
      const { show } = item;
      const card = document.createElement("div");
      card.className = "card";

      const image = show.image
        ? show.image.medium
        : "https://via.placeholder.com/210x295";
      const description = show.summary
        ? show.summary.replace(/<[^>]*>?/gm, "")
        : "No description available.";

      card.innerHTML = `
          <img src="${image}" alt="${show.name}">
          <div class="card-content">
            <h2>${show.name}</h2>
            <p>${description}</p>
          </div>
        `;
      resultsContainer.appendChild(card);
    });
  } catch (error) {
    resultsContainer.innerHTML =
      "<p>Something went wrong. Please try again later.</p>";
    console.error(error);
  }
}
