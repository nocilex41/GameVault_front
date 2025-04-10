// Ce fichier n'est plus utilisé, mais je le laisse ici au cas où
// Tu peux le supprimer si tu n'en as plus besoin

function fetchAndDisplayGames() {
    fetch('http://localhost:8000/api/game')
        .then(res => res.json())
        .then(games => {
            const container = document.querySelector('.games-grid');

            games.forEach(game => {
                const rating = game.rating ?? 'N/A';
                const metacritic = game.ratingsCount ?? 0; 
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
                <input type="hidden" value="${game.slug}" name="id">
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
