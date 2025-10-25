// 🌟 RESEÑAS PÚBLICAS + VOTOS
// ======================================
document.addEventListener('DOMContentLoaded', () => {
  const gameListPublic = document.querySelector('#blog .library #gameList');
  if (!gameListPublic) return;

  // ---- Funciones base ----
  function cargarReviews() {
    const storedReviews = localStorage.getItem('gameReviews');
    return storedReviews ? JSON.parse(storedReviews) : [];
  }

  function guardarReviews(reviews) {
    localStorage.setItem('gameReviews', JSON.stringify(reviews));
  }

  function getVotes() {
    const storedVotes = localStorage.getItem('userVotes');
    return storedVotes ? JSON.parse(storedVotes) : {};
  }

  function saveVotes(votes) {
    localStorage.setItem('userVotes', JSON.stringify(votes));
  }

  // ===================================
  // MOSTRAR LAS RESEÑAS
  // ===================================
  function mostrarReviewsPublico() {
    gameListPublic.innerHTML = '';
    const reviews = cargarReviews();
    const userVotes = getVotes();

    if (reviews.length === 0) {
      gameListPublic.innerHTML = '<p>Aún no hay reseñas disponibles.</p>';
      return;
    }

    reviews.forEach(review => {
      const reviewId = review.id;
      const currentVote = userVotes[reviewId] || 'none';

      const reviewElement = document.createElement('div');
      reviewElement.className = 'game-card';
      reviewElement.innerHTML = `
        <h3>${review.title} <span class="platform-tag">(${review.platform})</span></h3>
        <p class="review-meta">Por: <strong>${review.author || 'Anónimo'}</strong> en ${review.date}</p>
        <p class="review-text">${review.reviewText}</p>
        <div class="voting-actions">
          <button class="vote-btn like ${currentVote === 'like' ? 'active' : ''}" data-id="${reviewId}" data-vote="like">
            👍 Me Gusta (<span id="likes-${reviewId}">${review.likes || 0}</span>)
          </button>
          <button class="vote-btn dislike ${currentVote === 'dislike' ? 'active' : ''}" data-id="${reviewId}" data-vote="dislike">
            👎 No Me Gusta (<span id="dislikes-${reviewId}">${review.dislikes || 0}</span>)
          </button>
        </div>
      `;
      gameListPublic.appendChild(reviewElement);
    });

    addVotingListeners();
    
  }
  
  

  // ===================================
  // MANEJO DE VOTOS
  // ===================================
  function addVotingListeners() {
    document.querySelectorAll('.vote-btn').forEach(button => {
      button.addEventListener('click', function () {
        const id = parseInt(this.dataset.id);
        const vote = this.dataset.vote;
        handleVote(id, vote);
      });
    });
  }

  function handleVote(id, voteType) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
      alert('Debes iniciar sesión para votar.');
      return;
    }

    let reviews = cargarReviews();
    const reviewIndex = reviews.findIndex(r => r.id === id);
    if (reviewIndex === -1) return;

    const review = reviews[reviewIndex];
    review.likes = Number(review.likes) || 0;
    review.dislikes = Number(review.dislikes) || 0;

    const userVotes = getVotes();
    const currentVote = userVotes[id] || 'none';

    if (currentVote === 'none') {
      review[voteType]++;
      userVotes[id] = voteType;
    } else if (currentVote === voteType) {
      review[voteType]--;
      userVotes[id] = 'none';
    } else {
      review[currentVote]--;
      review[voteType]++;
      userVotes[id] = voteType;
    }

    guardarReviews(reviews);
    saveVotes(userVotes);

    // 🔄 Volvemos a renderizar solo esa reseña (sin recargar todo)
    const likeSpan = document.getElementById(`likes-${review.id}`);
    const dislikeSpan = document.getElementById(`dislikes-${review.id}`);
    if (likeSpan) likeSpan.textContent = review.likes;
    if (dislikeSpan) dislikeSpan.textContent = review.dislikes;

    updateButtonAppearance(id, userVotes[id]);
  }

  function updateButtonAppearance(id, newVoteState) {
    document.querySelectorAll(`.vote-btn[data-id="${id}"]`).forEach(btn => {
      btn.classList.remove('active');
    });
    if (newVoteState !== 'none') {
      const activeBtn = document.querySelector(`.vote-btn[data-id="${id}"][data-vote="${newVoteState}"]`);
      if (activeBtn) activeBtn.classList.add('active');
    }
  }

  mostrarReviewsPublico();
});