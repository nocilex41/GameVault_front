document.addEventListener('click', function (e) {
    const button = e.target.closest('.favorite-btn');

    if (button) {
        const input = button.querySelector('input[name="id"]');
        const gameId = input?.value;

        if (!gameId) {
            console.error('ID du jeu introuvable dans le bouton.');
            return;
        }

        fetch('http://localhost:8000/api/game/delete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: gameId })
        })
            .then(response => {
                if (!response.ok) throw new Error("Erreur lors de la suppression");
                return response.json();
            })
            .then(data => {
                console.log('Jeu supprimé avec succès :', data);
                // Optionnel : retirer la carte du DOM
                button.closest('.game-card')?.remove();
                window.location.reload(true);

            })
            .catch(error => {
                console.error('Erreur :', error);
            });
    }
});
