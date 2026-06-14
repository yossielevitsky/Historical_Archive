document.addEventListener('DOMContentLoaded', () => {
    const slider = document.getElementById('events-slider');
    const prevBtn = document.querySelector('.prev-arrow');
    const nextBtn = document.querySelector('.next-arrow');

    if (!slider || !prevBtn || !nextBtn) return;

    const scrollAmount = 350; // Scroll increment

    const getScrollStatus = () => {
        const atStart = slider.scrollLeft <= 5;
        const atEnd = (slider.scrollLeft + slider.clientWidth) >= (slider.scrollWidth - 5);
        return { atStart, atEnd };
    };

    nextBtn.addEventListener('click', () => {
        const { atEnd } = getScrollStatus();
        if (atEnd) {
            // Loop back to start
            slider.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
            slider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    });

    prevBtn.addEventListener('click', () => {
        const { atStart } = getScrollStatus();
        if (atStart) {
            // Loop to the end
            slider.scrollTo({ left: slider.scrollWidth, behavior: 'smooth' });
        } else {
            slider.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        }
    });

    // We keep arrows clickable at all times for the loop feel
    prevBtn.style.opacity = '1';
    nextBtn.style.opacity = '1';
    prevBtn.style.pointerEvents = 'auto';
    nextBtn.style.pointerEvents = 'auto';
});
