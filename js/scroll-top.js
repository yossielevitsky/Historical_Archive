document.addEventListener('DOMContentLoaded', () => {
    // Create button element dynamically
    const scrollBtn = document.createElement('button');
    scrollBtn.id = 'scrollTopBtn';
    scrollBtn.innerHTML = '&uarr;'; // Up arrow HTML entity
    scrollBtn.title = 'Go to top';
    document.body.appendChild(scrollBtn);

    // Show/hide button based on scroll position
    const toggleScrollBtn = () => {
        if (window.scrollY > 300) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
    };

    // Scroll to top functionality
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    // Event listeners
    window.addEventListener('scroll', toggleScrollBtn);
    scrollBtn.addEventListener('click', scrollToTop);
});
