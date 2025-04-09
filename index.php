<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="GameVault - Votre bibliothèque de jeux vidéo">
    <meta name="theme-color" content="#191970">
    <title>GameVault</title>
    <link rel="stylesheet" href="styles/styles.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
</head>
<body>
    <header>
        <nav>
            <div class="logo"><a href="index.html">GameVault</a></div>
            <ul>
                <li><a href="index.html" aria-current="page">Accueil</a></li>
                <li><a href="favoris.html">Favoris</a></li>
            </ul>
        </nav>
    </header>

    <main>
        <h1>Bienvenue sur GameVault</h1>
        <div class="games-grid" aria-label="Liste des jeux">
            <!-- Les cartes de jeux seront générées ici par l'API -->
            <div class="loading-spinner">
                <i class="fas fa-spinner fa-spin"></i>
                <span>Chargement des jeux...</span>
            </div>
        </div>
    </main>

    <footer>
        <p>&copy; 2025 GameVault - Tous droits réservés</p>
    </footer>

    

    <!-- <script src="scripts/delete.js"></script> -->
    <script src="scripts/API_RAWG.js"></script>
</body>
</html>