// ======== GAME TRACKER ========

// Cargar juegos desde localStorage o crear lista vacía
let games = JSON.parse(localStorage.getItem('games')) || [];

// Elementos del DOM
const gameForm = document.getElementById('gameForm');
const gameList = document.getElementById('gameList');

// Renderizar los juegos
function renderGames() {
  gameList.innerHTML = '';

  if (games.length === 0) {
    gameList.innerHTML = '<p>No tienes juegos aún. ¡Agrega uno!</p>';
    return;
  }

  games.forEach((game, index) => {
    const card = document.createElement('div');
    card.classList.add('game-card');
    card.innerHTML = `
      <h3>${game.title}</h3>
      <small>Plataforma: ${game.platform}</small>
      <p>${game.review || 'Sin reseña aún.'}</p>
      <div class="actions">
        <button onclick="editGame(${index})">✏️ Editar</button>
        <button onclick="deleteGame(${index})">🗑️ Eliminar</button>
      </div>
    `;
    gameList.appendChild(card);
  });
}

// Agregar nuevo juego
gameForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const title = document.getElementById('gameTitle').value.trim();
  const platform = document.getElementById('gamePlatform').value.trim();
  const review = document.getElementById('gameReview').value.trim();

  if (!title || !platform) return alert('Por favor completa los campos.');

  games.push({ title, platform, review });
  localStorage.setItem('games', JSON.stringify(games));

  gameForm.reset();
  renderGames();
});

// Editar un juego existente
function editGame(index) {
  const game = games[index];
  const newTitle = prompt('Nuevo título:', game.title);
  const newPlatform = prompt('Nueva plataforma:', game.platform);
  const newReview = prompt('Nueva reseña:', game.review);

  if (newTitle && newPlatform) {
    games[index] = { title: newTitle, platform: newPlatform, review: newReview };
    localStorage.setItem('games', JSON.stringify(games));
    renderGames();
  }
}

// Eliminar un juego
function deleteGame(index) {
  if (confirm('¿Eliminar este juego?')) {
    games.splice(index, 1);
    localStorage.setItem('games', JSON.stringify(games));
    renderGames();
  }
}

// Render inicial
renderGames();
