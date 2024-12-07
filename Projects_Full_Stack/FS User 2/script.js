// Fetch user data from API
async function fetchUserData() {
    try {
      const response = await fetch('https://dummyjson.com/users');
      if (!response.ok) throw new Error('Failed to fetch user data');
      const data = await response.json();
      return data.users; // Extract 'users' array
    } catch (error) {
      console.error(error);
      document.getElementById('statusMessage').textContent =
        'Failed to load user data. Please try again later.';
      return [];
    }
  }
  
  // Render user directory
  function renderUserDirectory(users) {
    const userDirectory = document.getElementById('userDirectory');
    const statusMessage = document.getElementById('statusMessage');
    userDirectory.innerHTML = '';
    statusMessage.textContent = '';
  
    if (users.length === 0) {
      statusMessage.textContent = 'No users found.';
      return;
    }
  
    users.forEach((user) => {
      const userCard = document.createElement('div');
      userCard.classList.add('user-card');
  
      const name = document.createElement('h3');
      name.textContent = user.firstName + ' ' + user.lastName;
  
      const email = document.createElement('p');
      email.textContent = `📧 Email: ${user.email}`;
  
      const phone = document.createElement('p');
      phone.textContent = `📞 Phone: ${user.phone}`;
  
      const address = document.createElement('p');
      address.textContent = `📍 Address: ${user.address.city}, ${user.address.state}`;
  
      userCard.appendChild(name);
      userCard.appendChild(email);
      userCard.appendChild(phone);
      userCard.appendChild(address);
      userDirectory.appendChild(userCard);
    });
  }
  
  // Search functionality
  document.getElementById('searchInput').addEventListener('input', () => {
    const searchQuery = document.getElementById('searchInput').value.toLowerCase();
    fetchUserData().then((users) => {
      const filteredUsers = users.filter((user) =>
        (user.firstName + ' ' + user.lastName).toLowerCase().includes(searchQuery)
      );
      renderUserDirectory(filteredUsers);
    });
  });
  
  // Initial load of user data
  fetchUserData().then(renderUserDirectory);
  