document.addEventListener('DOMContentLoaded', () => {
    // 1. Standard Wiki Content Accordion (Flat structure)
    // Used in template_synagogue.html, template_profile.html, etc.
    const wikiContent = document.querySelector('.wiki-content');
    const wikiSidebar = document.querySelector('.wiki-sidebar');
    const wikiContainer = document.querySelector('.wiki-container');

    if (wikiContent) {
        initAccordion(wikiContent);

        // Sidebar Logic for standard pages
        if (wikiSidebar && wikiContainer) {
            handleMobileLayout(wikiContent, wikiSidebar, wikiContainer);
            window.addEventListener('resize', () => {
                handleMobileLayout(wikiContent, wikiSidebar, wikiContainer);
            });
        }
    }

    // 2. History Page Accordion (Section-based structure)
    // Used in history.html
    const historyContainer = document.querySelector('.wiki-accordion-sections');
    if (historyContainer) {
        initHistoryAccordion(historyContainer);
    }

    // --- Helper Functions ---

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
                    if (window.innerWidth > 900) return; // Disable on desktop (aligned with CSS breakpoint)
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

    function initHistoryAccordion(container) {
        const sections = container.querySelectorAll('section');
        sections.forEach(section => {
            const header = section.querySelector('h2');
            if (!header) return;

            // Check if already wrapped (idempotency)
            if (section.querySelector('.section-content-wrapper')) return;

            // Create wrapper
            const wrapper = document.createElement('div');
            wrapper.className = 'section-content-wrapper';

            // Move all children after header into wrapper
            // using while loop to move remaining siblings safely
            let nextNode = header.nextSibling;
            while (nextNode) {
                const nodeToMove = nextNode;
                nextNode = nextNode.nextSibling; // save reference to next
                wrapper.appendChild(nodeToMove);
            }

            section.appendChild(wrapper);

            // Add click listener
            header.addEventListener('click', () => {
                if (window.innerWidth > 900) return; // Disable on desktop
                section.classList.toggle('active');
                header.classList.toggle('active');
            });
        });
    }

    function handleMobileLayout(content, sidebar, container) {
        if (!content || !sidebar || !container) return;

        const isMobile = window.innerWidth <= 900; // Increased breakpoint to match general mobile/tablet flow

        if (isMobile) {
            // Move sidebar INTO content, after the introduction (before first h2)
            const firstHeader = content.querySelector('h2');
            if (firstHeader) {
                if (firstHeader.previousElementSibling !== sidebar) {
                    content.insertBefore(sidebar, firstHeader);
                }
            } else {
                // If no headers, append to end or after first P? 
                // Default to appending to content
                if (sidebar.parentElement !== content) {
                    content.appendChild(sidebar);
                }
            }
        } else {
            // Desktop: Move sidebar back to container
            if (sidebar.parentElement !== container) {
                container.appendChild(sidebar);
            }
        }
    }
});
