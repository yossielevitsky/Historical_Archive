document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('articles-search');
    const articles = document.querySelectorAll('.articles-grid .card');
    const noResults = document.getElementById('no-results-message');

    if (!searchInput || articles.length === 0) return;

    const normalizeText = (text) => {
        return text
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");
    };

    searchInput.addEventListener('input', () => {
        const query = normalizeText(searchInput.value.trim());
        let visibleCount = 0;

        articles.forEach(card => {
            const titleElement = card.querySelector('.card-title');
            const descElement = card.querySelector('.card-content p');
            
            const title = titleElement ? normalizeText(titleElement.textContent) : '';
            const desc = descElement ? normalizeText(descElement.textContent) : '';

            if (!query || title.includes(query) || desc.includes(query)) {
                card.style.display = '';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });

        if (noResults) {
            noResults.style.display = visibleCount === 0 ? 'block' : 'none';
        }
    });
});
