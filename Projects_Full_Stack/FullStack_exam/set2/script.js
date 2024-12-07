const API_URL = "https://exam-fawn-eight.vercel.app/emoji/";
let emojis = []; // Array to store fetched emoji data

// Fetch data from the API
async function fetchEmojiData() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Failed to fetch data from the API");
    emojis = await response.json();
    displayEmojiData(emojis); // Display all emojis initially
  } catch (error) {
    console.error("Error fetching emoji data:", error);
  }
}

// Display emojis in the UI
function displayEmojiData(emojiData) {
  const emojiList = document.getElementById("emoji-list");
  emojiList.innerHTML = ""; // Clear existing content

  if (emojiData.length === 0) {
    emojiList.innerHTML = `<p>No results found.</p>`;
    return;
  }

  emojiData.forEach((emoji) => {
    const emojiItem = document.createElement("div");
    emojiItem.className = "emoji-item";

    const emojiSymbol = document.createElement("div");
    emojiSymbol.className = "emoji";
    emojiSymbol.textContent = emoji.symbol;

    const emojiName = document.createElement("div");
    emojiName.className = "name";
    emojiName.textContent = emoji.name;

    emojiItem.appendChild(emojiSymbol);
    emojiItem.appendChild(emojiName);
    emojiList.appendChild(emojiItem);
  });
}

// Filter emojis based on search query
function filterEmojis(event) {
  const query = event.target.value.toLowerCase();
  const filteredEmojis = emojis.filter((emoji) =>
    emoji.name.toLowerCase().includes(query)
  );
  displayEmojiData(filteredEmojis);
}

// Add event listener for search input
document.getElementById("search-input").addEventListener("input", filterEmojis);

// Fetch and display emoji data on page load
fetchEmojiData();
