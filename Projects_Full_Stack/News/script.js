const API_KEY = 'pub_615966dec117b9c656ef2ae2941789edc9419';
const API_URL = 'https://newsdata.io/api/1/news';

const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const newsGrid = document.getElementById('newsGrid');

async function fetchNews(query = 'news') {
    try {
        const response = await fetch(`${API_URL}?apikey=${API_KEY}&q=${query}`);
        const data = await response.json();
        return data.results || [];
    } catch (error) {
        console.error('Error fetching news:', error);
        return [];
    }
}

function createNewsCard(article) {
    const card = document.createElement('div');
    card.className = 'news-card';

    const image = article.image_url || 'https://via.placeholder.com/300x200?text=No+Image';
    const title = article.title || 'No Title';
    const source = article.source_id || 'Unknown Source';
    const description = article.description || 'No description available';
    const link = article.link || '#';

    card.innerHTML = `
        <img src="${image}" alt="${title}" class="news-image" onerror="this.src='https://via.placeholder.com/300x200?text=No+Image'">
        <div class="news-content">
            <div class="news-source">${source}</div>
            <h2 class="news-title">${title}</h2>
            <p class="news-description">${description}</p>
            <a href="${link}" target="_blank" class="read-more">Read More</a>
        </div>
    `;

    return card;
}

async function displayNews(query) {
    newsGrid.innerHTML = ''; // Clear existing content
    const articles = await fetchNews(query);
    
    if (articles.length === 0) {
        newsGrid.innerHTML = '<p>No news found</p>';
        return;
    }

    articles.forEach(article => {
        const card = createNewsCard(article);
        newsGrid.appendChild(card);
    });
}

// Event listeners
searchButton.addEventListener('click', () => {
    const query = searchInput.value.trim();
    if (query) {
        displayNews(query);
    }
});

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const query = searchInput.value.trim();
        if (query) {
            displayNews(query);
        }
    }
});

// Initial load
displayNews();