document.addEventListener('DOMContentLoaded', () => {
    // Select the main content container
    const wikiContent = document.querySelector('.wiki-content');
    const wikiSidebar = document.querySelector('.wiki-sidebar');
    const wikiContainer = document.querySelector('.wiki-container');

    // Accordion Logic
    if (wikiContent) {
        initAccordion(wikiContent);

        // Mobile Sidebar Logic
        handleMobileLayout(wikiContent, wikiSidebar, wikiContainer);

        // Listen for resize to adjust layout
        window.addEventListener('resize', () => {
            handleMobileLayout(wikiContent, wikiSidebar, wikiContainer);
        });
    }

    function initAccordion(contentContainer) {
        const children = Array.from(contentContainer.children);
        let currentWrapper = null;

        children.forEach(child => {
            // If it's a header, start a new group
            if (child.tagName === 'H2' || child.tagName === 'H3') {
                currentWrapper = null;
                child.classList.add('accordion-header');

                // Create a new wrapper
                currentWrapper = document.createElement('div');
                currentWrapper.classList.add('accordion-content');
                child.insertAdjacentElement('afterend', currentWrapper);

                // Click event
                child.addEventListener('click', () => {
                    if (window.innerWidth > 768) return; // Disable on desktop
                    child.classList.toggle('active');
                    const content = child.nextElementSibling;
                    if (content && content.classList.contains('accordion-content')) {
                        content.classList.toggle('is-open');
                    }
                });
            } else if (currentWrapper) {
                currentWrapper.appendChild(child);
            }
        });
    }

    function handleMobileLayout(content, sidebar, container) {
        if (!content || !sidebar || !container) return;

        const isMobile = window.innerWidth <= 768;

        if (isMobile) {
            // Move sidebar INTO content, after the introduction (before first h2)
            // Function logic: Find the first H2. Insert Sidebar before it.
            const firstHeader = content.querySelector('h2');

            if (firstHeader) {
                // If it's not already there
                if (firstHeader.previousElementSibling !== sidebar) {
                    content.insertBefore(sidebar, firstHeader);
                }
            } else {
                // No headers? Just append to content or put it at top?
                // Default to top if no headers, or bottom. Let's append to bottom of intro if no headers.
                content.appendChild(sidebar);
            }
        } else {
            // Desktop: Move sidebar back to container
            // It should be the second child of wiki-container (grid layout)
            // wiki-container has .wiki-main and .wiki-sidebar
            if (sidebar.parentElement !== container) {
                container.appendChild(sidebar);
            }
        }
    }
});
