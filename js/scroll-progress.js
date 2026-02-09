document.addEventListener('DOMContentLoaded', () => {
    const progressBar = document.querySelector('.scroll-progress-bar');
    const footer = document.querySelector('.main-footer');

    if (!progressBar || !footer) return;

    function updateProgress() {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight;
        const winHeight = window.innerHeight;
        const footerHeight = footer.offsetHeight;

        // Calculate the maximum scroll position where the progress bar should be 100%
        // This is when the bottom of the viewport reaches the top of the footer
        const contentBottom = docHeight - footerHeight;
        const maxScroll = contentBottom - winHeight;

        let scrollPercent = 0;

        if (maxScroll > 0) {
            scrollPercent = (scrollTop / maxScroll) * 100;
        } else {
            // If content fits in viewport (excluding footer logic), handle gracefully
            // If we are truly at bottom, 100%, else 0?
            // For now, let's keep it 0 if there's no scrolling, or 100 if we are technically 'done'.
            // Given the requirement "fill increases smoothly as the user scrolls", 0 starts makes sense.
            scrollPercent = 0;
            if (scrollTop >= maxScroll && maxScroll !== 0) {
                // This block is tricky if maxScroll is negative.
                // Let's stick to the prompt: indicate how far user has scrolled.
                // If no scroll is possible, 0 or 100 is debatable. 
                // Let's default to simple clamping.
            }
        }

        // Clamp values
        if (scrollPercent < 0) scrollPercent = 0;
        if (scrollPercent > 100) scrollPercent = 100;

        progressBar.style.width = `${scrollPercent}%`;
    }

    // Use requestAnimationFrame for performance
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateProgress();
                ticking = false;
            });
            ticking = true;
        }
    });

    // Update on resize as dimensions might change
    window.addEventListener('resize', updateProgress);

    // Initial call
    updateProgress();
});
