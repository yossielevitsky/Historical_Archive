document.addEventListener('DOMContentLoaded', () => {
    // 1. Existing Hamburger Logic
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.main-nav ul');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');

            // Accessibility update
            const expanded = hamburger.getAttribute('aria-expanded') === 'true' || false;
            hamburger.setAttribute('aria-expanded', !expanded);
        });

        // Close menu when a link is clicked
        document.querySelectorAll('.main-nav a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                hamburger.setAttribute('aria-expanded', false);
            });
        });
    }

    // 2. Search Functionality
    const searchData = [
        { title: "Home", url: "index.html", type: "Page" },
        { title: "History of Jewish Antwerp", url: "history.html", type: "Page" },
        { title: "Kehilles (Communities)", url: "kehilles.html", type: "Page" },
        { title: "Rabbis", url: "rabbis.html", type: "Page" },
        { title: "Synagogues", url: "synagogues.html", type: "Page" },
        { title: "Contribute", url: "contribute.html", type: "Page" },

        // Detailed Pages
        { title: "Hollandse Synagoge (Shomre Hadass)", url: "hollandse-synagoge.html", type: "Synagogue" },
        { title: "Portuguese Synagogue", url: "portuguese-synagogue.html", type: "Synagogue" },
        { title: "Van Den Nestlei Synagogue (Romi Goldmuntz)", url: "van-den-nestlei-synagogue.html", type: "Synagogue" },
        { title: "Rabbi Chaim Kreiswirth", url: "rabbi-chaim-kreiswirth.html", type: "Rabbi" },

        // Sections / Anchors could be added here if needed
        { title: "Rabbi Moshe Avigdor Amiel", url: "rabbis.html", type: "Rabbi" },
        { title: "Eisenmann Synagogue", url: "synagogues.html", type: "Synagogue" },
        { title: "Machsike Hadass", url: "kehilles.html", type: "Kehille" },
        { title: "Shomre Hadass", url: "kehilles.html", type: "Kehille" }
    ];

    const headerContent = document.querySelector('.header-content');

    // Inject Search HTML if header exists
    if (headerContent) {
        const searchWrapper = document.createElement('div');
        searchWrapper.className = 'search-wrapper';
        searchWrapper.innerHTML = `
            <input type="text" id="searchInput" placeholder="Search..." autocomplete="off">
            <div id="searchResults" class="search-results"></div>
        `;

        // Insert before hamburger for desktop layout preference (Logo - Search - Hamburger - Nav)
        // Or append to end. 
        // Appending to end puts it after Nav.
        // Inserting before Nav?
        // Create list item wrapper for search
        const searchLi = document.createElement('li');
        searchLi.className = 'mobile-search-item';
        searchLi.appendChild(searchWrapper);

        const navUl = document.querySelector('.main-nav ul');
        if (navUl) {
            navUl.appendChild(searchLi);
        } else {
            // Fallback for non-standard layout
            headerContent.appendChild(searchWrapper);
        }

        // Logic
        const searchInput = document.getElementById('searchInput');
        const searchResults = document.getElementById('searchResults');

        if (searchInput && searchResults) {
            searchInput.addEventListener('input', (e) => {
                const query = e.target.value.toLowerCase();
                searchResults.innerHTML = '';

                if (query.length < 2) {
                    searchResults.classList.remove('active');
                    return;
                }

                const filtered = searchData.filter(item =>
                    item.title.toLowerCase().includes(query) ||
                    item.type.toLowerCase().includes(query)
                );

                if (filtered.length > 0) {
                    filtered.forEach(item => {
                        const div = document.createElement('a');
                        div.className = 'search-item';
                        div.href = item.url;
                        div.innerHTML = `
                            <span class="search-item-title">${item.title}</span>
                            <span class="search-item-type">${item.type}</span>
                        `;
                        div.addEventListener('click', (e) => {
                            // Allow default navigation
                            searchResults.classList.remove('active');
                            searchInput.value = '';
                        });
                        searchResults.appendChild(div);
                    });
                    searchResults.classList.add('active');
                } else {
                    searchResults.classList.remove('active');
                }
            });

            // Close when clicking outside
            document.addEventListener('click', (e) => {
                if (!searchWrapper.contains(e.target)) {
                    searchResults.classList.remove('active');
                }
            });
        }
    }
});
