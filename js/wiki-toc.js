document.addEventListener('DOMContentLoaded', () => {
    const tocContainer = document.querySelector('.wiki-toc');
    const contentContainer = document.querySelector('.wiki-main-content');

    if (!tocContainer || !contentContainer) return;

    // 0. Inject Restore Button globally
    let restoreBtn = document.querySelector('.toc-restore-btn');
    if (!restoreBtn) {
        restoreBtn = document.createElement('button');
        restoreBtn.className = 'toc-restore-btn';
        restoreBtn.innerHTML = 'Contents &#9654;'; // Arrow right
        document.body.appendChild(restoreBtn);
    }

    // 1. Generate TOC from H2 and H3
    const headings = contentContainer.querySelectorAll('h2, h3');
    const tocList = document.createElement('ul');
    tocList.className = 'toc-list';

    // Header with Hide Button
    const headerContainer = document.createElement('div');
    headerContainer.className = 'toc-header';

    const title = document.createElement('h4');
    title.textContent = 'Contents';

    const hideBtn = document.createElement('button');
    hideBtn.className = 'toc-hide-btn';
    hideBtn.textContent = '[hide]';

    headerContainer.appendChild(title);
    headerContainer.appendChild(hideBtn);

    // Mobile Toggle
    const toggleBtn = document.createElement('div');
    toggleBtn.className = 'toc-toggle';
    toggleBtn.textContent = 'Table of Contents';

    // Clear initial content js-hook
    tocContainer.innerHTML = '';

    // Append Elements
    // Use fragment for better performance? straightforward here.
    tocContainer.appendChild(headerContainer); // Desktop Header
    tocContainer.appendChild(toggleBtn);       // Mobile Header
    tocContainer.appendChild(tocList);

    // Track current H2 list item to append H3s
    let currentH2Li = null;
    let currentSubList = null;

    headings.forEach((heading, index) => {
        // Ensure id
        if (!heading.id) {
            heading.id = `section-${index + 1}`;
        }

        const link = document.createElement('a');
        link.href = `#${heading.id}`;
        link.textContent = heading.textContent;
        link.className = 'toc-link';

        // Check if H2 or H3
        if (heading.tagName === 'H2') {
            const li = document.createElement('li');
            li.className = 'toc-item-h2';

            // Container for [Arrow + Link] to handle layout
            const linkWrapper = document.createElement('div');
            linkWrapper.className = 'toc-link-wrapper';

            // Create Toggle Arrow
            const arrow = document.createElement('span');
            arrow.className = 'toc-toggle-arrow';
            arrow.innerHTML = '&#9656;'; // Right triangle

            // Add click listener for toggle
            arrow.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                li.classList.toggle('expanded');
                if (li.classList.contains('expanded')) {
                    arrow.innerHTML = '&#9662;'; // Down triangle
                } else {
                    arrow.innerHTML = '&#9656;';
                }
            });

            linkWrapper.appendChild(arrow);
            linkWrapper.appendChild(link);
            li.appendChild(linkWrapper);

            tocList.appendChild(li);

            // Prepare for potential H3 children
            currentH2Li = li;
            currentSubList = null; // Reset, create only if needed

        } else if (heading.tagName === 'H3') {
            // It's an H3
            if (currentH2Li) {
                // Ensure sublist exists
                if (!currentSubList) {
                    currentSubList = document.createElement('ul');
                    currentSubList.className = 'toc-sublist';
                    currentH2Li.appendChild(currentSubList);

                    // Show arrow on parent if it has children
                    const parentArrow = currentH2Li.querySelector('.toc-toggle-arrow');
                    if (parentArrow) {
                        parentArrow.classList.add('has-children');
                    }
                }

                const li = document.createElement('li');
                li.className = 'toc-item-h3';
                li.appendChild(link);
                currentSubList.appendChild(li);
            } else {
                // Orphan H3 (before any H2) - treat as top level for now or append to root
                const li = document.createElement('li');
                li.className = 'toc-item-h3 orphan';
                li.appendChild(link);
                tocList.appendChild(li);
            }
        }

        // Smooth Scroll (Same logic)
        link.addEventListener('click', (e) => {
            e.preventDefault();

            // Mobile: Close TOC after click
            if (window.innerWidth <= 900) {
                tocList.classList.remove('expanded');
                toggleBtn.classList.remove('expanded');
            }

            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                // Expanding parent if clicking H3? Optional but good UX
                // If we are scrolling to H2, maybe expand it? 
                if (heading.tagName === 'H2' && currentH2Li) {
                    // logic to find the specific LI for this H2 if we were inside the loop...
                    // simpler: let the user expand manually or expand automatically upon navigation
                    // For now, simple navigation
                }

                // Adjust for fixed header
                const headerOffset = 100;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // 2. Hide / Restore Logic
    const pageContainer = document.querySelector('.wiki-page-container');

    hideBtn.addEventListener('click', () => {
        tocContainer.classList.add('hidden');
        pageContainer.classList.add('toc-hidden');
        restoreBtn.classList.add('visible');
    });

    restoreBtn.addEventListener('click', () => {
        tocContainer.classList.remove('hidden');
        pageContainer.classList.remove('toc-hidden');
        restoreBtn.classList.remove('visible');
    });

    // Mobile: Hide desktop specific elements
    function handleResize() {
        if (window.innerWidth <= 900) {
            headerContainer.style.display = 'none';
            // Also ensure full TOC isn't hidden by desktop logic if resizing
            tocContainer.classList.remove('hidden');
            pageContainer.classList.remove('toc-hidden');
            restoreBtn.classList.remove('visible');
        } else {
            headerContainer.style.display = 'flex';
        }
    }

    window.addEventListener('resize', handleResize);
    handleResize(); // Init

    // 3. Active Section Highlighting
    const observerOptions = {
        root: null,
        rootMargin: '-100px 0px -60% 0px', // Trigger when section is near top
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remove active from all
                document.querySelectorAll('.toc-link').forEach(link => link.classList.remove('active'));

                // Add active to current
                const activeLink = document.querySelector(`.toc-link[href="#${entry.target.id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, observerOptions);

    headings.forEach(heading => observer.observe(heading));


    // 3. Mobile Toggle Logic
    toggleBtn.addEventListener('click', () => {
        tocList.classList.toggle('expanded');
        toggleBtn.classList.toggle('expanded');
    });
});
