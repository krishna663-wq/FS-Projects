document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('search-input');
  const searchButton = document.getElementById('search-button');
  const showsContainer = document.getElementById('shows-container');

  function searchShows() {
      const query = searchInput.value.trim();
      showsContainer.innerHTML = '';

      if (!query) {
          showErrorMessage('Please enter a TV show name');
          return;
      }

      fetch(`https://api.tvmaze.com/search/shows?q=${encodeURIComponent(query)}`)
          .then(response => response.json())
          .then(data => {
              if (data.length === 0) {
                  showErrorMessage('No shows found. Try another search.');
                  return;
              }

              // Add "Suggestions" heading
              const suggestionsHeading = document.createElement('h2');
              suggestionsHeading.textContent = 'Search Results';
              suggestionsHeading.style.color = 'var(--accent-color)';
              suggestionsHeading.style.textAlign = 'center';
              suggestionsHeading.style.marginBottom = '20px';
              showsContainer.appendChild(suggestionsHeading);

              data.forEach(item => {
                  const show = item.show;
                  const showCard = createShowCard(show);
                  showsContainer.appendChild(showCard);
              });
          })
          .catch(error => {
              console.error('Search error:', error);
              showErrorMessage('An error occurred. Please try again.');
          });
  }

  function createShowCard(show) {
      const card = document.createElement('div');
      card.classList.add('show-card');
      card.style.cursor = 'pointer'; // Add pointer cursor to indicate clickability

      const imageUrl = show.image
          ? (show.image.original || show.image.medium)
          : 'https://via.placeholder.com/300x450?text=No+Image';

      const summary = show.summary
          ? show.summary.replace(/<\/?[^>]+(>|$)/g, '').substring(0, 150) + '...'
          : 'No description available.';

      card.innerHTML = `
          <img src="${imageUrl}" alt="${show.name}">
          <div class="show-details">
              <h2>${show.name}</h2>
              <p>${summary}</p>
              ${show.rating.average
                  ? `<p>Rating: ${show.rating.average}/10</p>`
                  : '<p>No rating available</p>'}
          </div>
      `;

      // Add click event to redirect to show details
      card.addEventListener('click', () => {
          window.location.href = `show-details.html?id=${show.id}`;
      });

      // Add hover effect for better user interaction
      card.addEventListener('mouseenter', () => {
          card.style.transform = 'scale(1.05)';
          card.style.boxShadow = '0 8px 12px rgba(0,0,0,0.2)';
      });

      card.addEventListener('mouseleave', () => {
          card.style.transform = 'scale(1)';
          card.style.boxShadow = 'none';
      });

      return card;
  }

  function showErrorMessage(message) {
      showsContainer.innerHTML = `
          <div class="error-message">
              <p>${message}</p>
          </div>
      `;
  }

  // Event Listeners
  searchButton.addEventListener('click', searchShows);
  searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
          searchShows();
      }
  });

  // Optional: Add keyboard accessibility for search button
  searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
          searchButton.classList.add('active');
      }
  });

  searchInput.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') {
          searchButton.classList.remove('active');
      }
  });
});