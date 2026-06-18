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
        { title: "Righteous Among the Nations", url: "holocaust/righteous.html", type: "Article" },
        { title: "Memorials & Monuments", url: "holocaust/memorials.html", type: "Article" },
        { title: "Names Database", url: "holocaust/names.html", type: "Article" },
        { title: "Jewish Orphanages", url: "holocaust/orphanages.html", type: "Article" },
        { title: "Dossin Kazerne", url: "holocaust/dossin.html", type: "Article" },
        { title: "Antwerp Central Station", url: "holocaust/central-station.html", type: "Article" },
        { title: "Escape to Havana: St. Louis and Cuba's Diamond Refuge", url: "history/cuba-connection.html", type: "Article" },
        { title: "The Chida's Journey Through Antwerp, Brussels, and Mechelen in the 1770s", url: "history/chida-two-cities.html", type: "Article" },

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
        { title: "Rav Eliyahu Shternbuch", url: "rabbis/rav-eliyahu-shternbuch.html", type: "Rabbi" },
        { title: "Reb Leibish", url: "rabbis/reb-leibish.html", type: "Rabbi" },
        { title: "Shemu’el Brodt", url: "rabbis/shemuel-brodt.html", type: "Rabbi" },
        { title: "Rabbi Yehuda Aryeh Treger", url: "rabbis/rabbi-yehuda-aryeh-treger.html", type: "Rabbi" },

        // Places
        { title: "Heide, Kalmthout", url: "places/heide.html", type: "Place" },
        { title: "Jesode Hatorah School", url: "places/jesode-hatorah.html", type: "School" },
        { title: "Yavne School", url: "places/yavne.html", type: "School" },
        { title: "Tachkemoni School", url: "places/tachkemoni.html", type: "School" },
        { title: "Belz School", url: "places/belz-school.html", type: "School" },

        // History Events & Organizations
        { title: "Belgian Revolution of 1830", url: "history/belgian-revolution-1830.html", type: "Event" },
        { title: "Antwerp Pogrom", url: "history/antwerp-pogrom.html", type: "Event" },
        { title: "Red Star Line", url: "history/red-star-line.html", type: "Company" }
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

    // 5. Historical Tooltip Logic
    // Scan the page for all internal article links and convert them to tooltip triggers dynamically
    const articleLinks = document.querySelectorAll('.wiki-main-content a, .wiki-content a');
    articleLinks.forEach(link => {
        if (link.classList.contains('historical-tooltip-trigger')) {
            return;
        }

        const href = link.getAttribute('href');
        if (!href) return;

        // Skip anchors, mailto, tel, external, and javascript links
        if (href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || 
            href.startsWith('http') || href.startsWith('javascript:')) {
            return;
        }

        // Add trigger class and dynamic preview flag
        link.classList.add('historical-tooltip-trigger');
        link.setAttribute('data-dynamic-preview', 'true');
    });

    const tooltipTriggers = document.querySelectorAll('.historical-tooltip-trigger');
    if (tooltipTriggers.length > 0) {
        let tooltip = document.querySelector('.historical-tooltip');
        let backdrop = document.querySelector('.historical-tooltip-backdrop');

        if (!tooltip) {
            tooltip = document.createElement('div');
            tooltip.className = 'historical-tooltip';
            tooltip.setAttribute('role', 'tooltip');
            tooltip.setAttribute('aria-hidden', 'true');
            tooltip.innerHTML = `
                <button class="historical-tooltip-close" aria-label="Close tooltip">&times;</button>
                <div class="historical-tooltip-text">
                    <div class="historical-tooltip-title">
                        <span class="historical-tooltip-name"></span>
                        <span class="historical-tooltip-years"></span>
                    </div>
                    <div class="historical-tooltip-desc"></div>
                </div>
                <div class="historical-tooltip-image-container">
                    <img class="historical-tooltip-image" src="" alt="">
                </div>
            `;
            document.body.appendChild(tooltip);
        }

        if (!backdrop) {
            backdrop = document.createElement('div');
            backdrop.className = 'historical-tooltip-backdrop';
            document.body.appendChild(backdrop);
        }

        const closeBtn = tooltip.querySelector('.historical-tooltip-close');

        const tooltipData = {
            'henry-iii': {
                image: 'images/brabant.jpg',
                en: {
                    title: 'Henry III, Duke of Brabant',
                    years: '(c. 1230–1261)',
                    desc: 'was Duke of Brabant from 1248 until his death. A patron of the arts and a trouvère (poet-composer), he ruled during a period of growing political influence for Brabant. Shortly before his death, he signed a will containing a provision that would have expelled the Jews of Brabant unless they abandoned moneylending. The measure was never enforced, as he died two days later and his widow, Adelaide of Burgundy, acting as regent, did not implement the policy. Consequently, the Jewish communities of Brabant remained in the duchy.'
                },
                nl: {
                    title: 'Hendrik III, Hertog van Brabant',
                    years: '(ca. 1230–1261)',
                    desc: 'was hertog van Brabant van 1248 tot zijn dood. Als beschermheer van de kunsten en trouvère (dichter-componist) regeerde hij in een periode van groeiende politieke invloed voor Brabant. Kort voor zijn dood ondertekende hij een testament met een bepaling die de Joden uit Brabant zou hebben verdreven, tenzij ze stopten met het uitlenen van geld. De maatregel werd nooit ten uitvoer gelegd, aangezien hij twee dagen later stierf en zijn weduwe, Aleidis van Bourgondië, die optrad als regentes, het beleid niet uitvoerde. Bijgevolg bleven de Joodse gemeenschappen van Brabant in het hertogdom.'
                },
                fr: {
                    title: 'Henri III, duc de Brabant',
                    years: '(v. 1230–1261)',
                    desc: "fut duc de Brabant de 1248 jusqu'à sa mort. Protecteur des arts et trouvère (poète-compositeur), il régna durant une période d'influence politique croissante pour le Brabant. Peu avant sa mort, il signa un testament contenant une disposition qui aurait expulsé les Juifs du Brabant à moins qu'ils n'abandonnent le prêt d'argent. La mesure ne fut jamais appliquée, car il mourut deux jours plus tard et sa veuve, Adélaïde de Bourgogne, agissant en tant que régente, ne mit pas en œuvre cette politique. Par conséquent, les communautés juives du Brabant restèrent dans le duché."
                },
                he: {
                    title: 'הנרי השלישי, דוכס בראבנט',
                    years: '(1230–1261 בקירוב)',
                    desc: 'היה דוכס בראבנט משנת 1248 ועד מותו. כפטרון האמנויות וטרובר (משורר-מלחין), הוא שלט בתקופה של השפעה פוליטית גוברת של בראבנט. זמן קצר לפני מותו, הוא חתם על צוואה המכילה הוראה שהייתה מגרשת את יהודי בראבנט אלא אם כן ינטשו את עיסוק ההלוואה בריבית. הגזירה מעולם לא נאכפה, כיוון שהוא נפטר כעבור יומיים ואלמנתו, אדלייד מבורגונדי, ששימשה כעוצרת, לא יישמה את המדיניות. כתוצאה מכך, הקהילות היהודיות של בראבנט נותרו בדוכסות.'
                }
            },
            'jacob-ben-jekuthiel': {
                image: '',
                en: {
                    title: 'Jacob ben Jekuthiel',
                    years: '(d. 1023)',
                    desc: 'was a Jewish scholar from Rouen who became known for his efforts to protect Jewish communities during the persecutions in France and Lorraine around 1007. He traveled to Rome to petition Pope John XVII for intervention against anti-Jewish violence, securing papal support that helped halt the persecutions. After spending years in Rome and Lorraine, he accepted an invitation from Baldwin IV, Count of Flanders to settle in Arras, where he died shortly after arriving in 1023. Because Arras had no Jewish cemetery, he was buried in Reims.'
                },
                nl: {
                    title: 'Jacob ben Jekuthiel',
                    years: '(d. 1023)',
                    desc: 'was een Joodse geleerde uit Rouen die bekend werd om zijn inspanningen om Joodse gemeenschappen te beschermen tijdens de vervolgingen in Frankrijk en Lotharingen rond 1007. Hij reisde naar Rome om paus Johannes XVII te verzoeken om tussenbeide te komen tegen het anti-Joodse geweld, waarmee hij pauselijke steun verwierf die hielp de vervolgingen te stoppen. Na jaren in Rome en Lotharingen te hebben doorgebracht, accepteerde hij een uitnodiging van Boudewijn IV, graaf van Vlaanderen om zich in Arras te vestigen, waar hij kort na zijn aankomst in 1023 stierf. Omdat Arras geen Joodse begraafplaats had, werd hij begraven in Reims.'
                },
                fr: {
                    title: 'Jacob ben Jekuthiel',
                    years: '(m. 1023)',
                    desc: "était un érudit juif de Rouen qui s'est fait connaître pour ses efforts visant à protéger les communautés juives lors des persécutions en France et en Lorraine vers 1007. Il s'est rendu à Rome pour demander l'intervention du pape Jean XVII contre les violences anti-juives, obtenant un soutien papal qui a contribué à stopper les persécutions. Après avoir passé des années à Rome et en Lorraine, il accepta l'invitation de Baudouin IV, comte de Flandre, à s'installer à Arras, où il mourut peu après son arrivée en 1023. Arras n'ayant pas de cimetière juif, il fut enterré à Reims."
                },
                he: {
                    title: 'יעקב בן יקותיאל',
                    years: '(נפטר ב-1023)',
                    desc: 'היה למדן יהודי מרואן שהתפרסם במאמציו להגן על הקהילות היהודיות במהלך הרדיפות בצרפת ובלורן בסביבות שנת 1007. הוא נסע לרומא כדי לבקש מהאפיפיור יוחנן השבעה עשר להתערב נגד האלימות האנטי-יהודית, והשיג תמיכה אפיפיורית שסייעה לעצור את הרדיפות. לאחר שבילה שנים ברומא ובלורן, נענה להזמנתו של בלדווין הרביעי, רוזן פלנדריה להתיישב באראס, שם נפטר זמן קצר לאחר הגעתו בשנת 1023. מכיוון שבאראס לא היה בית קברות יהודי, הוא נקבר בריימס.'
                }
            }
        };

        const currentLang = document.documentElement.lang || 'en';
        let matchedLang = 'en';
        if (currentLang.startsWith('nl')) matchedLang = 'nl';
        else if (currentLang.startsWith('fr')) matchedLang = 'fr';
        else if (currentLang.startsWith('he')) matchedLang = 'he';

        let hideTimeout;
        let hoverTimeout;
        let activeTrigger = null;
        const previewCache = {};

        const getSummaryText = (text) => {
            if (!text) return '';
            let cleaned = text.replace(/\s+/g, ' ').trim();
            if (cleaned.length <= 240) return cleaned;
            let truncated = cleaned.substring(0, 240);
            const lastSpace = truncated.lastIndexOf(' ');
            if (lastSpace > 180) {
                truncated = truncated.substring(0, lastSpace);
            }
            return truncated + '...';
        };

        const positionTooltip = (trigger) => {
            const rect = trigger.getBoundingClientRect();
            const tooltipWidth = tooltip.offsetWidth;
            const tooltipHeight = tooltip.offsetHeight;
            const offset = 12;

            tooltip.classList.remove('arrow-top', 'arrow-bottom');

            let top = rect.top + window.scrollY - tooltipHeight - offset;
            let left = rect.left + window.scrollX + (rect.width - tooltipWidth) / 2;
            tooltip.classList.add('arrow-bottom');

            if (rect.top - tooltipHeight - offset < 0) {
                top = rect.bottom + window.scrollY + offset;
                tooltip.classList.remove('arrow-bottom');
                tooltip.classList.add('arrow-top');
            }

            let clampedLeft = left;
            if (clampedLeft < 10) {
                clampedLeft = 10;
            } else if (clampedLeft + tooltipWidth > window.innerWidth - 10) {
                clampedLeft = window.innerWidth - tooltipWidth - 10;
            }

            tooltip.style.top = `${top}px`;
            tooltip.style.left = `${clampedLeft}px`;

            const triggerCenter = rect.left + window.scrollX + rect.width / 2;
            const arrowOffset = triggerCenter - clampedLeft;

            const clampedArrowOffset = Math.max(20, Math.min(tooltipWidth - 20, arrowOffset));
            tooltip.style.setProperty('--arrow-left', `${clampedArrowOffset}px`);
        };

        const show = (trigger, person) => {
            activeTrigger = trigger;
            clearTimeout(hideTimeout);
            const data = tooltipData[person];
            if (!data) return;

            const localized = data[matchedLang] || data['en'];
            if (!localized) return;

            tooltip.querySelector('.historical-tooltip-name').textContent = localized.title;
            tooltip.querySelector('.historical-tooltip-years').textContent = localized.years || '';
            tooltip.querySelector('.historical-tooltip-desc').textContent = localized.desc;
            
            const imgContainer = tooltip.querySelector('.historical-tooltip-image-container');
            const imgEl = tooltip.querySelector('.historical-tooltip-image');

            if (data.image) {
                tooltip.classList.remove('no-image');
                const logoLink = document.querySelector('.logo a');
                let rootPrefix = '';
                if (logoLink) {
                    const href = logoLink.getAttribute('href');
                    rootPrefix = href.replace('index.html', '');
                }
                const imgPath = `${rootPrefix}${data.image}`;
                
                imgEl.src = imgPath;
                imgEl.alt = localized.title;
                if (imgContainer) imgContainer.style.display = '';
            } else {
                tooltip.classList.add('no-image');
                imgEl.src = '';
                imgEl.alt = '';
                if (imgContainer) imgContainer.style.display = 'none';
            }

            tooltip.setAttribute('aria-hidden', 'false');

            const isMobile = window.innerWidth < 1024;
            if (isMobile) {
                tooltip.style.top = '';
                tooltip.style.left = '';
                tooltip.classList.remove('arrow-top', 'arrow-bottom');
                backdrop.classList.add('show');
            } else {
                tooltip.classList.add('show');
                positionTooltip(trigger);
            }
            tooltip.classList.add('show');
        };

        const showDynamic = (trigger, href) => {
            activeTrigger = trigger;
            const targetAbsoluteUrl = new URL(href, window.location.href).href;

            if (previewCache[targetAbsoluteUrl]) {
                renderDynamic(trigger, previewCache[targetAbsoluteUrl]);
                return;
            }

            // Set dynamic loading preview card layout
            tooltip.classList.remove('no-image');
            tooltip.querySelector('.historical-tooltip-name').textContent = 'Loading...';
            tooltip.querySelector('.historical-tooltip-years').textContent = '';
            tooltip.querySelector('.historical-tooltip-desc').textContent = 'Fetching page preview...';
            
            const imgContainer = tooltip.querySelector('.historical-tooltip-image-container');
            const imgEl = tooltip.querySelector('.historical-tooltip-image');
            tooltip.classList.add('no-image');
            imgEl.src = '';
            imgEl.alt = '';
            if (imgContainer) imgContainer.style.display = 'none';

            tooltip.setAttribute('aria-hidden', 'false');
            tooltip.classList.add('show');
            positionTooltip(trigger);

            fetch(targetAbsoluteUrl)
                .then(response => {
                    if (!response.ok) throw new Error('Preview load failed');
                    return response.text();
                })
                .then(html => {
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(html, 'text/html');

                    const h1 = doc.querySelector('.wiki-header h1, .wiki-main-content h1, h1');
                    const title = h1 ? h1.textContent.trim() : '';

                    const p = doc.querySelector('.intro-text, .wiki-content p, .wiki-main-content p, p');
                    let desc = p ? p.textContent.trim() : '';
                    desc = getSummaryText(desc);

                    const img = doc.querySelector('.wiki-main-content img, .wiki-image-container img, article img');
                    let image = '';
                    if (img) {
                        const src = img.getAttribute('src');
                        if (src) {
                            image = new URL(src, targetAbsoluteUrl).href;
                        }
                    }

                    const pageData = { title, desc, image };
                    previewCache[targetAbsoluteUrl] = pageData;

                    renderDynamic(trigger, pageData);
                })
                .catch(err => {
                    console.error('Dynamic preview error:', err);
                    if (activeTrigger === trigger) {
                        tooltip.querySelector('.historical-tooltip-name').textContent = 'Preview Unavailable';
                        tooltip.querySelector('.historical-tooltip-desc').textContent = 'Could not load page preview.';
                    }
                });
        };

        const renderDynamic = (trigger, data) => {
            if (activeTrigger !== trigger) return;
            tooltip.querySelector('.historical-tooltip-name').textContent = data.title;
            tooltip.querySelector('.historical-tooltip-years').textContent = '';
            tooltip.querySelector('.historical-tooltip-desc').textContent = data.desc;

            const imgContainer = tooltip.querySelector('.historical-tooltip-image-container');
            const imgEl = tooltip.querySelector('.historical-tooltip-image');

            if (data.image) {
                tooltip.classList.remove('no-image');
                imgEl.src = data.image;
                imgEl.alt = data.title;
                if (imgContainer) imgContainer.style.display = '';
            } else {
                tooltip.classList.add('no-image');
                imgEl.src = '';
                imgEl.alt = '';
                if (imgContainer) imgContainer.style.display = 'none';
            }

            tooltip.classList.add('show');
            positionTooltip(trigger);
        };

        const hide = () => {
            hideTimeout = setTimeout(() => {
                tooltip.classList.remove('show');
                tooltip.setAttribute('aria-hidden', 'true');
                backdrop.classList.remove('show');
                activeTrigger = null;
            }, 200);
        };

        tooltipTriggers.forEach(trigger => {
            const person = trigger.getAttribute('data-person');
            const href = trigger.getAttribute('href');
            const isDynamic = trigger.getAttribute('data-dynamic-preview') === 'true';

            trigger.addEventListener('mouseenter', () => {
                if (window.innerWidth >= 1024) { // Only on PC
                    clearTimeout(hideTimeout);
                    clearTimeout(hoverTimeout);
                    hoverTimeout = setTimeout(() => {
                        if (isDynamic) {
                            showDynamic(trigger, href);
                        } else {
                            show(trigger, person);
                        }
                    }, 250);
                }
            });

            trigger.addEventListener('mouseleave', () => {
                if (window.innerWidth >= 1024) {
                    clearTimeout(hoverTimeout);
                    hide();
                }
            });

            trigger.addEventListener('click', (e) => {
                if (!isDynamic || href === '#') {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    const isMobile = window.innerWidth < 1024;
                    if (isMobile) {
                        if (tooltip.classList.contains('show')) {
                            tooltip.classList.remove('show');
                            tooltip.setAttribute('aria-hidden', 'true');
                            backdrop.classList.remove('show');
                        } else {
                            show(trigger, person);
                        }
                    }
                }
            });
        });

        tooltip.addEventListener('mouseenter', () => {
            if (window.innerWidth >= 1024) {
                clearTimeout(hideTimeout);
            }
        });
        tooltip.addEventListener('mouseleave', () => {
            if (window.innerWidth >= 1024) {
                hide();
            }
        });

        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            tooltip.classList.remove('show');
            tooltip.setAttribute('aria-hidden', 'true');
            backdrop.classList.remove('show');
        });

        backdrop.addEventListener('click', () => {
            tooltip.classList.remove('show');
            tooltip.setAttribute('aria-hidden', 'true');
            backdrop.classList.remove('show');
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && tooltip.classList.contains('show')) {
                tooltip.classList.remove('show');
                tooltip.setAttribute('aria-hidden', 'true');
                backdrop.classList.remove('show');
            }
        });

        window.addEventListener('resize', () => {
            tooltip.classList.remove('show');
            tooltip.setAttribute('aria-hidden', 'true');
            backdrop.classList.remove('show');
        });
    }
});
