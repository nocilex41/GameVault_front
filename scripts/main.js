document.querySelectorAll('.favorite-btn').forEach(button => {
    button.addEventListener('click', function() {
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