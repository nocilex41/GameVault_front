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
        const ratings_count = game.ratings_count ? new Intl.NumberFormat('fr-FR').format(game.ratings_count) : '0';
        
        return `
            <div class="game-card">
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
                <div class="game-stats">
                    <span class="ratings-count">
                        <i class="fas fa-users"></i> ${ratings_count} avis
                    </span>
                </div>
                <p>${game.description_raw ? game.description_raw.slice(0, 100) + '...' : 'Pas de description disponible'}</p>
                <div class="card-footer">
                    <div class="release-date">
                        <i class="far fa-calendar"></i>
                        ${new Date(game.released).toLocaleDateString('fr-FR')}
                    </div>
                    <button class="favorite-btn">
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

            // Réinitialiser les écouteurs d'événements pour les favoris
            document.querySelectorAll('.favorite-btn').forEach(button => {
                button.addEventListener('click', function() {
                    const star = this.querySelector('.fa-star');
                    star.classList.toggle('far');
                    star.classList.toggle('fas');
                });
            });
        } catch (error) {
            console.error('Erreur lors de l\'affichage des jeux:', error);
            gamesGrid.innerHTML = '<p>Une erreur est survenue lors du chargement des jeux.</p>';
        }
    }
}

// Initialiser et exécuter
document.addEventListener('DOMContentLoaded', () => {
    const gameAPI = new GameAPI();
    gameAPI.displayGames();
}); 