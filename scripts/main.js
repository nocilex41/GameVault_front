document.querySelectorAll('.favorite-btn').forEach(button => {
    button.addEventListener('click', function() {
        const star = this.querySelector('.fa-star');
        star.classList.toggle('far');
        star.classList.toggle('fas');
    });
}); 