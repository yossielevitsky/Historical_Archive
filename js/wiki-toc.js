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

    headings.forEach((heading, index) => {
        // Ensure id
        if (!heading.id) {
            heading.id = `section-${index + 1}`;
        }

        const li = document.createElement('li');
        const link = document.createElement('a');
        link.href = `#${heading.id}`;
        link.textContent = heading.textContent;
        link.className = 'toc-link';

        // Indent H3
        if (heading.tagName === 'H3') {
            link.style.paddingLeft = '25px';
            link.style.fontSize = '0.85rem';
        }

        li.appendChild(link);
        tocList.appendChild(li);

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
