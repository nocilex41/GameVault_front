document.querySelectorAll('.favorite-btn').forEach(button => {
    button.addEventListener('click', function () {
        const star = this.querySelector('.fa-star');
        star.classList.toggle('far');
        star.classList.toggle('fas');
    });
});

document.querySelectorAll('.favorites-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const icon = btn.querySelector('i');
        icon.classList.toggle('fas'); // ajoute ou retire l'étoile pleine
        icon.classList.toggle('far'); // enlève ou ajoute l'étoile vide
    });
});

function fetchAndDisplayGames() {
    fetch('http://localhost:8000/api/game')
        .then(res => res.json())
        .then(games => {
            const container = document.querySelector('.games-grid');


            games.forEach(game => {
                const rating = game.rating ?? 'N/A';
                const metacritic = game.ratingsCount ?? 0; // À adapter si tu as une vraie note metacritic
                const backgroundImage = game.backgroundImage || 'https://placehold.co/300x200';

                const card = document.createElement('div');
                card.className = 'game-card';
                card.innerHTML = `
        <input type="hidden" class="game-slug" value="${game.slug}">
        <img src="${backgroundImage}" alt="${game.name}">
        <h3>${game.name}</h3>
        <div class="game-ratings">
          <span class="rating">
            <i class="fas fa-star"></i> ${rating}/10
          </span>
          <span class="metacritic ${metacritic >= 85 ? 'high' : metacritic >= 70 ? 'medium' : 'low'}">
            ${metacritic}
          </span>
        </div>
        <div class="card-footer">
          <div class="release-date">
            <i class="far fa-calendar"></i>
            ${new Date(game.released).toLocaleDateString('fr-FR')}
          </div>
          
          <button class="favorite-btn" data-slug="${game.slug}">
                <input type="hidden" value="${game.id}" name="id">
                <i class="fas fa-star"></i>
            </button>


        </div>
      `;

                container.appendChild(card);
            });
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des jeux :', error);
        });
}
fetchAndDisplayGames();
