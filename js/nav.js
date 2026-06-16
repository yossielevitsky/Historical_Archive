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
            link.addEventListener('click', (e) => {
                // Don't close if it's the dropdown toggle
                if (link.classList.contains('dropbtn')) {
                    return;
                }

                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                hamburger.setAttribute('aria-expanded', false);
            });
        });
    }

    // 2. Search Functionality
    const searchData = [
        // Main Pages
        { title: "Home", url: "index.html", type: "Page" },
        { title: "History of Jewish Antwerp", url: "history.html", type: "Page" },
        { title: "Rabbis", url: "rabbis.html", type: "Page" },
        { title: "Synagogues", url: "synagogues.html", type: "Page" },
        { title: "Contribute", url: "contribute.html", type: "Page" },

        // Holocaust Section
        { title: "The Holocaust", url: "holocaust/holocaust.html", type: "Page" },
        { title: "Righteous Among the Nations", url: "holocaust/righteous.html", type: "Wiki" },
        { title: "Memorials & Monuments", url: "holocaust/memorials.html", type: "Wiki" },
        { title: "Names Database", url: "holocaust/names.html", type: "Wiki" },
        { title: "Jewish Orphanages", url: "holocaust/orphanages.html", type: "Wiki" },
        { title: "Dossin Kazerne", url: "holocaust/dossin.html", type: "Wiki" },
        { title: "Antwerp Central Station", url: "holocaust/central-station.html", type: "Wiki" },
        { title: "Escape to Havana: St. Louis and Cuba's Diamond Refuge", url: "history/cuba-connection.html", type: "Wiki" },

        // Synagogues
        { title: "Agudath Israel", url: "synagogues/agudath-israel.html", type: "Synagogue" },
        { title: "Alexander Synagogue", url: "synagogues/alexander-synagogue.html", type: "Synagogue" },
        { title: "Beit Yaakov", url: "synagogues/beit-yaakov.html", type: "Synagogue" },
        { title: "Belz 2 (Ohel Moshe)", url: "synagogues/belz-2-ohel-moshe.html", type: "Synagogue" },
        { title: "Belz 3 (Beis Ahron)", url: "synagogues/belz-3-beis-ahron.html", type: "Synagogue" },
        { title: "Belz 4 (Beis Hillel)", url: "synagogues/belz-4-beis-hillel.html", type: "Synagogue" },
        { title: "Belz Center", url: "synagogues/belz-center.html", type: "Synagogue" },
        { title: "Beth Mordechai", url: "synagogues/beth-mordechai.html", type: "Synagogue" },
        { title: "Bobov", url: "synagogues/bobov-synagogue.html", type: "Synagogue" },
        { title: "Chabad Lubavitch", url: "synagogues/chabad-lubavitch.html", type: "Synagogue" },
        { title: "Daas Sholem-Shotz", url: "synagogues/daas-sholem-shotz.html", type: "Synagogue" },
        { title: "Eisenmann Synagogue", url: "synagogues/eisenmann-synagogue.html", type: "Synagogue" },
        { title: "Gur", url: "synagogues/gur-synagogue.html", type: "Synagogue" },
        { title: "Hollandse Synagoge", url: "synagogues/hollandse-synagoge.html", type: "Synagogue" },
        { title: "Beit Hakneset Hasafaradi Jotsei Geruzia", url: "synagogues/jotsei-geruzia-synagogue.html", type: "Synagogue" },
        { title: "K'hal Chasidim", url: "synagogues/khal-chasidim.html", type: "Synagogue" },
        { title: "Klausenburg", url: "synagogues/klausenburg-synagogue.html", type: "Synagogue" },
        { title: "Machsike Hadass", url: "synagogues/machsike-hadass.html", type: "Synagogue" },
        { title: "Moryah Terlist", url: "synagogues/moryah-terlist.html", type: "Synagogue" },
        { title: "Ohel Yaakov", url: "synagogues/ohel-yaakov.html", type: "Synagogue" },
        { title: "Oosten Synagogue", url: "synagogues/oosten-synagogue.html", type: "Synagogue" },
        { title: "Or Shraga-Kolel", url: "synagogues/or-shraga-kolel.html", type: "Synagogue" },
        { title: "Portuguese Synagogue", url: "synagogues/portuguese-synagogue.html", type: "Synagogue" },
        { title: "Pshevorsk Synagogue", url: "synagogues/pshevorsk-synagogue.html", type: "Synagogue" },
        { title: "Satmar 2", url: "synagogues/satmar-2.html", type: "Synagogue" },
        { title: "Satmar Synagogue", url: "synagogues/satmar-synagogue.html", type: "Synagogue" },
        { title: "Schmigred", url: "synagogues/schmigred-synagogue.html", type: "Synagogue" },
        { title: "Tshortkow", url: "synagogues/tshortkow-synagogue.html", type: "Synagogue" },
        { title: "Van Den Nestlei Synagogue", url: "synagogues/van-den-nestlei-synagogue.html", type: "Synagogue" },
        { title: "Wiznitz 2", url: "synagogues/wiznitz-2.html", type: "Synagogue" },
        { title: "Wiznitz", url: "synagogues/wiznitz-synagogue.html", type: "Synagogue" },
        { title: "Zichron Benjamin", url: "synagogues/zichron-benjamin.html", type: "Synagogue" },

        // Rabbis
        { title: "Dayan Schmal", url: "rabbis/dayan-schmal.html", type: "Rabbi" },
        { title: "Mizrachi - Beth Hamedrash Rav Amiel", url: "rabbis/mizrachi-rav-amiel.html", type: "Rabbi" },
        { title: "Rabbi Chaim Kreiswirth", url: "rabbis/rabbi-chaim-kreiswirth.html", type: "Rabbi" },
        { title: "Rav Aaron Schiff", url: "rabbis/rav-aaron-schiff.html", type: "Rabbi" },
        { title: "Rav Dovid Moshe Lieberman", url: "rabbis/rav-dovid-moshe-lieberman.html", type: "Rabbi" },
        { title: "Rav Hillel Medalie", url: "rabbis/rav-hillel-medalie.html", type: "Rabbi" },
        { title: "Rav Markus Mordechai Rottenberg", url: "rabbis/rav-markus-mordechai-rottenberg.html", type: "Rabbi" },
        { title: "Rav Moshe Avigdor Amiel", url: "rabbis/rav-moshe-avigdor-amiel.html", type: "Rabbi" },
        { title: "Rav Pinchas Padwa", url: "rabbis/rav-pinchas-padwa.html", type: "Rabbi" },
        { title: "Reb Leibish", url: "rabbis/reb-leibish.html", type: "Rabbi" },
        { title: "Shemu’el Brodt", url: "rabbis/shemuel-brodt.html", type: "Rabbi" },

        // Places
        { title: "Heide, Kalmthout", url: "places/heide.html", type: "Place" }
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
                    // Calculate relative path prefix based on home link
                    let pathPrefix = '';
                    const homeLink = document.querySelector('.main-nav a[href$="index.html"]');
                    if (homeLink) {
                        const href = homeLink.getAttribute('href');
                        // If href is "index.html", prefix is ""
                        // If href is "../index.html", prefix is "../"
                        pathPrefix = href.replace('index.html', '');
                    }

                    filtered.forEach(item => {
                        const div = document.createElement('a');
                        div.className = 'search-item';
                        div.href = pathPrefix + item.url;
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

        // 3. Language Switcher Injection
        const langLi = document.createElement('li');
        langLi.className = 'lang-switcher-item';
        langLi.innerHTML = `
            <div class="lang-switcher">
                <button class="lang-btn" aria-expanded="false">
                    <span class="lang-current">EN</span>
                    <span class="lang-arrow">▼</span>
                </button>
                <ul class="lang-dropdown">
                    <li><a href="#" class="lang-option active" data-lang="en">English</a></li>
                    <li><a href="#" class="lang-option" data-lang="nl">Nederlands</a></li>
                    <li><a href="#" class="lang-option" data-lang="fr">Français</a></li>
                    <li><a href="#" class="lang-option" data-lang="he">עברית</a></li>
                </ul>
            </div>
        `;

        if (navUl) {
            navUl.appendChild(langLi);
        }

        // Language Switcher Logic
        const langBtn = langLi.querySelector('.lang-btn');
        const langDropdown = langLi.querySelector('.lang-dropdown');

        if (langBtn && langDropdown) {
            const currentLang = document.documentElement.lang || 'en';
            
            // Set current language display
            langBtn.querySelector('.lang-current').textContent = currentLang === 'he' ? 'עב' : currentLang.toUpperCase();

            // Calculate paths to roots
            const logoLink = document.querySelector('.logo a');
            let depth = 0;
            let pathToLangRoot = '';
            if (logoLink) {
                const href = logoLink.getAttribute('href');
                const matches = href.match(/\.\.\//g);
                depth = matches ? matches.length : 0;
                pathToLangRoot = href.replace('index.html', '');
            }

            let pathToSiteRoot = '';
            if (currentLang === 'en') {
                pathToSiteRoot = pathToLangRoot;
            } else {
                pathToSiteRoot = '../' + pathToLangRoot;
            }

            // Get current page filename relative to language root
            const segments = window.location.pathname.split('/');
            const pagePathSegments = segments.slice(segments.length - (depth + 1));
            let relativePagePath = pagePathSegments.join('/');
            if (!relativePagePath || relativePagePath.endsWith('/')) {
                relativePagePath = 'index.html';
            }

            // Update each option's href
            langDropdown.querySelectorAll('.lang-option').forEach(option => {
                const targetLang = option.getAttribute('data-lang');
                
                // Set active class
                if (targetLang === currentLang) {
                    option.classList.add('active');
                } else {
                    option.classList.remove('active');
                }

                // Calculate target relative URL
                let targetUrl = '';
                if (targetLang === 'en') {
                    targetUrl = pathToSiteRoot + relativePagePath;
                } else {
                    targetUrl = pathToSiteRoot + targetLang + '/' + relativePagePath;
                }
                
                option.setAttribute('href', targetUrl);
            });

            langBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                const isExpanded = langBtn.getAttribute('aria-expanded') === 'true';
                langBtn.setAttribute('aria-expanded', !isExpanded);
                langDropdown.classList.toggle('active');
            });

            // Close when clicking outside
            document.addEventListener('click', (e) => {
                if (!langLi.contains(e.target)) {
                    langDropdown.classList.remove('active');
                    langBtn.setAttribute('aria-expanded', 'false');
                }
            });
        }
    }

    // 4. History Dropdown Click Logic
    const historyLinks = document.querySelectorAll('.dropdown > a');

    historyLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            const dropdownContent = link.nextElementSibling;

            // Close other dropdowns if we add more in the future
            document.querySelectorAll('.dropdown-content').forEach(content => {
                if (content !== dropdownContent) {
                    content.classList.remove('show');
                }
            });

            if (dropdownContent) {
                dropdownContent.classList.toggle('show');
            }
        });
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.dropdown')) {
            document.querySelectorAll('.dropdown-content.show').forEach(content => {
                content.classList.remove('show');
            });
        }
    });
});
