class VideoAPI {
    constructor() {
        this.videos = [
            {
                title: "Tutoriel JavaScript Débutant",
                duration: "12:45",
                views: "1.2M",
                thumbnail: "https://placehold.co/400x225",
                author: "CodeMaster",
                date: "2024-01-15"
            },
            // ... autres vidéos similaires
        ];
    }

    createVideoCard(video) {
        return `
            <div class="video-card">
                <div class="thumbnail">
                    <img src="${video.thumbnail}" alt="${video.title}">
                    <span class="duration">${video.duration}</span>
                </div>
                <div class="video-info">
                    <h3>${video.title}</h3>
                    <div class="meta">
                        <span class="author">${video.author}</span>
                        <span class="views">${video.views} vues</span>
                        <span class="date">${this.formatDate(video.date)}</span>
                    </div>
                </div>
            </div>
        `;
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR');
    }

    displayVideos() {
        const videosGrid = document.querySelector('.videos-grid');
        if (!videosGrid) return;

        videosGrid.innerHTML = this.videos
            .map(video => this.createVideoCard(video))
            .join('');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const videoAPI = new VideoAPI();
    videoAPI.displayVideos();

    // Gestion des filtres
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelector('.filter-btn.active').classList.remove('active');
            this.classList.add('active');
        });
    });
}); 