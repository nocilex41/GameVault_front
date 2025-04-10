const API_KEY = '671699ca61094aa4b3b33ea1d1f129ee';
const BASE_URL = 'https://api.rawg.io/api';

class GameAPI {
    constructor() {
        this.apiKey = API_KEY;
    }

    async fetchGames(page = 1, pageSize = 20) {
        try {
            const response = await fetch(
                `${BASE_URL}/games?key=${this.apiKey}&page=${page}&page_size=${pageSize}&ordering=-metacritic&metacritic=85,100&ratings_count=100&dates=2010-01-01,2024-12-31&exclude_additions=true`
            );
            const data = await response.json();
            return data.results;
        } catch (error) {
            console.error('Erreur lors de la récupération des jeux:', error);
            return [];
        }
    }

    async searchGames(searchTerm) {
        try {
            const response = await fetch(
                `${BASE_URL}/games?key=${this.apiKey}&search=${searchTerm}&ordering=-rating`
            );
            const data = await response.json();
            return data.results;
        } catch (error) {
            console.error('Erreur lors de la recherche des jeux:', error);
            return [];
        }
    }

    createGameCard(game) {
        const rating = game.rating ? (game.rating * 2).toFixed(1) : 'N/A';
        const metacritic = game.metacritic || 'N/A';
        
        return `
            <div class="game-card">
                <input type="hidden" class="game-slug" value="${game.slug}">
                <img src="${game.background_image || 'https://placehold.co/300x200'}" alt="${game.name}">
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
                    <button class="favorite-btn" data-slug="${game.slug}" data-is-favorite="false">
                        <input type="hidden" value="${game.slug}" name="id">
                        <i class="fa-star far"></i>
                    </button>
                </div>
            </div>
        `;
    }

    async displayGames() {
        const gamesGrid = document.querySelector('.games-grid');
        if (!gamesGrid) return;

        try {
            const games = await this.fetchGames();
            gamesGrid.innerHTML = games.map(game => this.createGameCard(game)).join('');

            try {
                const response = await fetch('http://localhost:8000/api/game');
                const favoriteGames = await response.json();

                games.forEach(game => {
                    const button = document.querySelector(`.favorite-btn[data-slug="${game.slug}"]`);
                    if (favoriteGames.some(favGame => favGame.slug === game.slug)) {
                        button.setAttribute('data-is-favorite', 'true');
                        button.querySelector('.fa-star').classList.remove('far');
                        button.querySelector('.fa-star').classList.add('fas');
                    }
                });
            } catch (error) {
                console.error('Erreur lors de la récupération des jeux favoris:', error);
            }

            document.querySelectorAll('.favorite-btn').forEach(button => {
                button.addEventListener('click', async function() {
                    const slug = this.getAttribute('data-slug');
                    const isFavorite = this.getAttribute('data-is-favorite') === 'true';
                    const game = games.find(game => game.slug === slug);
                    

                    if (!isFavorite) {
                        try {
                            const response = await fetch('http://localhost:8000/api/game/favorite', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    game: game,
                                    // Ajoute d'autres propriétés si nécessaire
                                })
                            });

                            if (response.ok) {
                                this.setAttribute('data-is-favorite', 'true');
                                this.querySelector('.fa-star').classList.remove('far');
                                this.querySelector('.fa-star').classList.add('fas');
                            } else {
                                console.error('Erreur lors de l\'ajout aux favoris');
                            }
                        } catch (error) {
                            console.error('Erreur lors de l\'ajout aux favoris:', error);
                        }
                    } 
                });
            });
        } catch (error) {
            console.error('Erreur lors de l\'affichage des jeux:', error);
            gamesGrid.innerHTML = '<p>Une erreur est survenue lors du chargement des jeux.</p>';
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const gameAPI = new GameAPI();
    gameAPI.displayGames();
});