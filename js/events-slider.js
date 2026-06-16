document.addEventListener('DOMContentLoaded', () => {
    const wrappers = document.querySelectorAll('.slider-wrapper');
    wrappers.forEach(wrapper => {
        const slider = wrapper.querySelector('.events-slider, .articles-slider');
        const prevBtn = wrapper.querySelector('.prev-arrow, .slider-arrow.prev-arrow');
        const nextBtn = wrapper.querySelector('.next-arrow, .slider-arrow.next-arrow');

        if (!slider) return;

        const slides = slider.children;
        const numSlides = slides.length;
        if (numSlides <= 1) return;

        // Create dots container
        const dotsContainer = document.createElement('div');
        dotsContainer.className = 'slider-dots';
        
        // Append it below the slider wrapper
        wrapper.parentNode.insertBefore(dotsContainer, wrapper.nextSibling);

        const dots = [];
        for (let i = 0; i < numSlides; i++) {
            const dot = document.createElement('button');
            dot.className = 'slider-dot' + (i === 0 ? ' active' : '');
            dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
            dotsContainer.appendChild(dot);
            dots.push(dot);

            dot.addEventListener('click', () => {
                const targetSlide = slides[i];
                const isRTL = getComputedStyle(slider).direction === 'rtl';
                let targetLeft;
                if (isRTL) {
                    targetLeft = targetSlide.offsetLeft - (slider.scrollWidth - slider.clientWidth);
                } else {
                    targetLeft = targetSlide.offsetLeft - slider.offsetLeft;
                }
                slider.scrollTo({
                    left: targetLeft,
                    behavior: 'smooth'
                });
            });
        }

        // Update active dot on scroll
        const updateActiveDot = () => {
            const scrollLeft = Math.abs(slider.scrollLeft);
            const maxScrollLeft = slider.scrollWidth - slider.clientWidth;
            
            let activeIndex = 0;
            if (maxScrollLeft > 0) {
                // Map the scroll percentage linearly to the slide index
                const scrollPercentage = scrollLeft / maxScrollLeft;
                activeIndex = Math.round(scrollPercentage * (numSlides - 1));
            }
            
            dots.forEach((dot, idx) => {
                if (idx === activeIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        };

        slider.addEventListener('scroll', () => {
            if (slider.scrollTimeout) {
                cancelAnimationFrame(slider.scrollTimeout);
            }
            slider.scrollTimeout = requestAnimationFrame(updateActiveDot);
        });

        // Initial update
        updateActiveDot();

        if (prevBtn && nextBtn) {
            const scrollAmount = 350; // Scroll increment

            const getScrollStatus = () => {
                const isRTL = getComputedStyle(slider).direction === 'rtl';
                const scrollLeftVal = Math.abs(slider.scrollLeft);
                const maxScrollLeft = slider.scrollWidth - slider.clientWidth;
                const atStart = scrollLeftVal <= 5;
                const atEnd = (scrollLeftVal + slider.clientWidth) >= (slider.scrollWidth - 5);
                return { atStart, atEnd, isRTL, maxScrollLeft };
            };

            nextBtn.addEventListener('click', () => {
                const { atEnd, isRTL } = getScrollStatus();
                if (atEnd) {
                    slider.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                    const direction = isRTL ? -1 : 1;
                    slider.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
                }
            });

            prevBtn.addEventListener('click', () => {
                const { atStart, isRTL, maxScrollLeft } = getScrollStatus();
                if (atStart) {
                    const targetLeft = isRTL ? -maxScrollLeft : slider.scrollWidth;
                    slider.scrollTo({ left: targetLeft, behavior: 'smooth' });
                } else {
                    const direction = isRTL ? -1 : 1;
                    slider.scrollBy({ left: -direction * scrollAmount, behavior: 'smooth' });
                }
            });

            // We keep arrows clickable at all times for the loop feel
            prevBtn.style.opacity = '1';
            nextBtn.style.opacity = '1';
            prevBtn.style.pointerEvents = 'auto';
            nextBtn.style.pointerEvents = 'auto';
        }
    });
});
