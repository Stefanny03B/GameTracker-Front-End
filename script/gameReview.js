document.addEventListener('DOMContentLoaded', () => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const author = currentUser ? currentUser.username : null;

  const gameForm = document.getElementById('gameForm');
  const gameList = document.getElementById('gameList');
  if (!gameForm || !gameList) return;

  // --- Funciones de Utilidad ---
  function cargarReviews() {
    const storedReviews = localStorage.getItem('gameReviews');
    return storedReviews ? JSON.parse(storedReviews) : [];
  }

  function guardarReviews(reviewsArray) {
    localStorage.setItem('gameReviews', JSON.stringify(reviewsArray));
  }

  let reviews = cargarReviews();
  mostrarReviews(reviews);

  // ===================================
  // C R E A T E (Crear / Añadir Juego)
  // ===================================
  gameForm.addEventListener('submit', function (event) {
    event.preventDefault();

    if (!author) {
      alert('Debes iniciar sesión para agregar una reseña.');
      return;
    }

    const title = document.getElementById('gameTitle').value.trim();
    const platform = document.getElementById('gamePlatform').value.trim();
    const reviewText = document.getElementById('gameReview').value.trim();

    if (!title || !platform || !reviewText) {
      alert('Por favor completa todos los campos.');
      return;
    }

    const newReview = {
      id: Date.now(),
      title,
      platform,
      reviewText,
      author,
      date: new Date().toLocaleDateString(),
      likes: 0,
      dislikes: 0,
    };

    reviews.push(newReview);
    guardarReviews(reviews);
    mostrarReviews(reviews);
    gameForm.reset();
    alert('✅ Reseña agregada exitosamente.');
  });

  // ===================================
  // R E A D (Leer / Mostrar Juegos)
  // ===================================
  function mostrarReviews(reviewsArray) {
    gameList.innerHTML = '';
    if (reviewsArray.length === 0) {
      gameList.innerHTML = '<p>Aún no hay reseñas. ¡Sé el primero en agregar una!</p>';
      return;
    }

    reviewsArray.forEach((review) => {
      const isOwner = currentUser && review.author === author;
      const reviewElement = document.createElement('div');
      reviewElement.className = 'game-card';
      reviewElement.innerHTML = `
        <h3>${review.title} <span class="platform-tag">(${review.platform})</span></h3>
        <p class="review-meta">Por: <strong>${review.author || 'Anónimo'}</strong> en ${review.date}</p>
        <p class="review-text">${review.reviewText}</p>
        ${
          isOwner
            ? `
          <div class="actions">
            <button class="edit-btn" data-id="${review.id}">✏️ Editar</button>
            <button class="delete-btn" data-id="${review.id}">🗑️ Eliminar</button>
          </div>
        `
            : '<p class="access-info">Solo el autor puede editar o eliminar esta reseña.</p>'
        }
      `;
      gameList.appendChild(reviewElement);
    });

    addActionEventListeners();
  }

  // ===================================
  // U P D A T E (Editar reseña)
  // ===================================
  function handleEdit(id) {
    const review = reviews.find((r) => r.id === id);
    if (!review) return;

    if (!currentUser || review.author !== author) {
      alert('🚫 Solo puedes editar tus propias reseñas.');
      return;
    }

    const newText = prompt('Edita tu reseña:', review.reviewText);
    if (newText !== null && newText.trim() !== '') {
      review.reviewText = newText.trim();
      guardarReviews(reviews);
      mostrarReviews(reviews);
      alert('✅ Reseña actualizada.');
    }
  }

  // ===================================
  // D E L E T E (Eliminar reseña)
  // ===================================
  function handleDelete(id) {
    const reviewIndex = reviews.findIndex((r) => r.id === id);
    if (reviewIndex === -1) return;

    if (!currentUser || reviews[reviewIndex].author !== author) {
      alert('🚫 Solo puedes eliminar tus propias reseñas.');
      return;
    }

    if (confirm('¿Eliminar esta reseña?')) {
      reviews.splice(reviewIndex, 1);
      guardarReviews(reviews);
      mostrarReviews(reviews);
      alert('🗑️ Reseña eliminada.');
    }
  }

  // --- Agregar listeners para los botones ---
  function addActionEventListeners() {
    document.querySelectorAll('.edit-btn').forEach((button) => {
      button.addEventListener('click', () => handleEdit(parseInt(button.dataset.id)));
    });

    document.querySelectorAll('.delete-btn').forEach((button) => {
      button.addEventListener('click', () => handleDelete(parseInt(button.dataset.id)));
    });
  }
});
