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
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                hamburger.setAttribute('aria-expanded', false);
            });
        });
    }

    // 2. Search Functionality
    const translations = {
        en: {
            placeholder: "Search...",
            contribute: "Contribute",
            types: {
                page: "Page",
                article: "Article",
                research: "Research",
                synagogue: "Synagogue",
                rabbi: "Rabbi",
                place: "Place",
                school: "School",
                event: "Event",
                company: "Company",
                kehilla: "Kehilla",
                person: "Person",
                yeshiva: "Yeshiva",
                history: "History",
                hasidic_dynasty: "Hasidic Dynasty"
            }
        },
        nl: {
            placeholder: "Zoeken...",
            contribute: "Bijdragen",
            types: {
                page: "Pagina",
                article: "Artikel",
                research: "Onderzoek",
                synagogue: "Synagoge",
                rabbi: "Rabbijn",
                place: "Plaats",
                school: "School",
                event: "Evenement",
                company: "Bedrijf",
                kehilla: "Kehilla",
                person: "Persoon",
                yeshiva: "Yeshiva",
                history: "Geschiedenis",
                hasidic_dynasty: "Chassidische dynastie"
            }
        },
        fr: {
            placeholder: "Rechercher...",
            contribute: "Contribuer",
            types: {
                page: "Page",
                article: "Article",
                research: "Recherche",
                synagogue: "Synagogue",
                rabbi: "Rabbin",
                place: "Lieu",
                school: "École",
                event: "Événement",
                company: "Entreprise",
                kehilla: "Kehilla",
                person: "Personne",
                yeshiva: "Yeshiva",
                history: "Histoire",
                hasidic_dynasty: "Dynastie hassidique"
            }
        },
        he: {
            placeholder: "חיפוש...",
            contribute: "לתרום",
            types: {
                page: "דף",
                article: "מאמר",
                research: "מחקר",
                synagogue: "בית כנסת",
                rabbi: "רב",
                place: "מקום",
                school: "בית ספר",
                event: "אירוע",
                company: "חברה",
                kehilla: "קהילה",
                person: "אישיות",
                yeshiva: "ישיבה",
                history: "היסטוריה",
                hasidic_dynasty: "שושלת חסידית"
            }
        }
    };

    const currentLang = document.documentElement.lang || 'en';
    const langData = translations[currentLang] || translations['en'];

    const searchData = [
        // Main Pages
        { title: "Home", url: "index.html", type: "Page", titleNl: "Home", titleFr: "Accueil", titleHe: "בית" },
        { title: "History of Jewish Antwerp", url: "history.html", type: "Page", titleNl: "Volledige geschiedenis", titleFr: "Histoire complète", titleHe: "היסטוריה מלאה" },
        { title: "Rabbis", url: "rabbis.html", type: "Page", titleNl: "Rabbijnen", titleFr: "Rabbins", titleHe: "רבנים" },
        { title: "Chazanim", url: "chazanim.html", type: "Page", titleNl: "Chazaniem", titleFr: "Chazanim", titleHe: "חזנים" },
        { title: "Synagogues", url: "synagogues.html", type: "Page", titleNl: "Synagogen", titleFr: "Synagogues", titleHe: "בתי כנסת" },
        { title: "Contribute", url: "contribute.html", type: "Page", titleNl: "Bijdragen", titleFr: "Contribuer", titleHe: "לתרום" },
        { title: "Articles", url: "articles.html", type: "Page", titleNl: "Artikelen", titleFr: "Articles", titleHe: "מאמרים" },

        // Holocaust Section
        { title: "The Holocaust", url: "holocaust/holocaust.html", type: "Page", titleNl: "De Holocaust", titleFr: "La Shoah", titleHe: "השואה" },
        { title: "Righteous Among the Nations", url: "holocaust/righteous.html", type: "Article", titleNl: "Rechtvaardigen onder de Volkeren", titleFr: "Justes parmi les nations", titleHe: "חסידי אומות העולם" },
        { title: "Memorials & Monuments", url: "holocaust/memorials.html", type: "Article", titleNl: "Gedenktekens & Monumenten", titleFr: "Mémoriaux & Monuments", titleHe: "אנדרטאות ומונומנטים" },
        { title: "Names Database", url: "holocaust/names.html", type: "Research", titleNl: "Namen Database", titleFr: "Base de données des noms", titleHe: "מאגר שמות" },
        { title: "Jewish Orphanages", url: "holocaust/orphanages.html", type: "Article", titleNl: "Joodse Weeshuizen", titleFr: "Orphelinats juifs", titleHe: "בתי יתומים יהודיים" },
        { title: "Dossin Kazerne", url: "holocaust/dossin.html", type: "Article", titleNl: "Kazerne Dossin", titleFr: "Caserne Dossin", titleHe: "קסרקטין דוסין (מכלן)" },
        { title: "Antwerp Central Station", url: "holocaust/central-station.html", type: "Article", titleNl: "Antwerpen-Centraal", titleFr: "Gare centrale d'Anvers", titleHe: "התחנה המרכזית van Antwerpen" },
        { title: "Escape to Havana: St. Louis and Cuba's Diamond Refuge", url: "articles/cuba-connection.html", type: "Article", titleHe: "הבריחה להוואנה: סנט לואיס ומקלט היהלומים של קובה" },
        { title: "The Chida's Journey Through Antwerp, Brussels, and Mechelen in the 1770s", url: "articles/chida-journey-antwerp-belgium.html", type: "Article", titleHe: "מסע החיד\"א באנטוורפן, בריסל ומכלן בשנות ה-1770" },
        { title: "Antwerp Through the Eyes of Sholem Aleichem's Motl the Cantor's Son", url: "articles/sholem-aleichem-motl.html", type: "Article", titleNl: "Antwerpen door de ogen van Sholem Aleichems Motl de Chazans zoon", titleFr: "Anvers à travers les yeux de Motl, fils du chantre de Sholem Aleichem", titleHe: "אנטוורפן בעיניו של מוטל בן החזן של שלום עליכם" },
        { title: "The 1980 Antwerp Attack on Jewish Children", url: "articles/1980-terrorist-attack.html", type: "Article", titleNl: "De Antwerpse aanval op Joodse kinderen in 1980", titleFr: "L'attaque d'Anvers contre des enfants juifs en 1980", titleHe: "הפיגוע באנטוורפן ב-1980 על ילדים יהודים" },
        { title: "1981 Antwerp Synagogue Bombing", url: "articles/1981-synagogue-bombing.html", type: "Article", titleNl: "1981 Bombardement op de Antwerpse synagoge", titleFr: "Attentat à la bombe contre la synagogue d'Anvers en 1981", titleHe: "1981 הפצצת בית הכנסת באנטוורפן" },

        // Orphanages & Homes
        { title: "Home de la Glacière (Orphanage)", url: "holocaust/home-de-la-glaciere.html", type: "Article", titleNl: "Home de la Glacière (Weeshuis)", titleFr: "Home de la Glacière (Orphelinat)", titleHe: "בית הילדים בבריסל (Home de la Glacière)" },
        { title: "Jongenshuis (Boys' Home Orphanage)", url: "holocaust/jongenshuis.html", type: "Article", titleNl: "Jongenshuis (Jongensweeshuis)", titleFr: "Jongenshuis (Foyer pour garçons)", titleHe: "בית הבנים (Jongenshuis)" },
        { title: "Jewish Orphanage (Lange Leemstraat)", url: "holocaust/lange-leemstraat-orphanage.html", type: "Article", titleNl: "Joods Weeshuis (Lange Leemstraat)", titleFr: "Orphelinat Juif (Lange Leemstraat)", titleHe: "בית היתומים היהודי (Lange Leemstraat)" },
        { title: "Meisjeshuis (Girls' Home Orphanage)", url: "holocaust/meisjeshuis.html", type: "Article", titleNl: "Meisjeshuis (Meisjesweeshuis)", titleFr: "Meisjeshuis (Foyer pour filles)", titleHe: "בית הבנות (Meisjeshuis)" },
        { title: "Pennsylvania Foundation", url: "holocaust/pennsylvania-foundation.html", type: "Article", titleNl: "Pennsylvania Foundation", titleFr: "Pennsylvania Foundation", titleHe: "קרן פנסילבניה (Pennsylvania Foundation)" },

        // Synagogues
        { title: "Chabad Lubavitch", url: "synagogues/chabad-lubavitch.html", type: "Synagogue", titleHe: "חב\"ד ליובאוויטש" },
        { title: "Eisenmann Synagogue", url: "synagogues/eisenmann-synagogue.html", type: "Synagogue", titleHe: "בית הכנסת אייזנמן" },
        { title: "Hollandse Synagoge", url: "synagogues/hollandse-synagoge.html", type: "Synagogue", titleHe: "בית הכנסת של הולנד" },
        { title: "Machsike Hadass", url: "synagogues/machsike-hadass.html", type: "Synagogue", titleHe: "מחסיקה הדסה" },
        { title: "Moryah Terlist", url: "synagogues/moryah-terlist.html", type: "Synagogue", titleHe: "מוריה טרליסט" },
        { title: "Oosten Synagogue", url: "synagogues/oosten-synagogue.html", type: "Synagogue", titleHe: "בית הכנסת אוסטן" },
        { title: "Portuguese Synagogue", url: "synagogues/portuguese-synagogue.html", type: "Synagogue", titleHe: "בית כנסת פורטוגלי" },
        { title: "Pshevorsk Synagogue", url: "synagogues/pshevorsk-synagogue.html", type: "Synagogue", titleHe: "בית הכנסת פשבורסק" },
        { title: "Van Den Nestlei Synagogue", url: "synagogues/van-den-nestlei-synagogue.html", type: "Synagogue", titleHe: "ואן דן נסטליי" },

        // Rabbis
        { title: "Dayan Schmal", url: "rabbis/dayan-schmal.html", type: "Rabbi", titleHe: "דיין שמאל" },
        { title: "Mizrachi - Beth Hamedrash Rav Amiel", url: "rabbis/mizrachi-rav-amiel.html", type: "Rabbi", titleHe: "מזרחי - בית המדרש הרב עמיאל" },
        { title: "Rabbi Chaim Kreiswirth", url: "rabbis/rabbi-chaim-kreiswirth.html", type: "Rabbi", titleHe: "הרב חיים קרייזווירט" },
        { title: "Rav Aaron Schiff", url: "rabbis/rav-aaron-schiff.html", type: "Rabbi", titleHe: "הרב אהרן שיף" },
        { title: "Rav Dovid Moshe Lieberman", url: "rabbis/rav-dovid-moshe-lieberman.html", type: "Rabbi", titleHe: "הרב דוד משה ליברמן" },
        { title: "Rav Hillel Medalie", url: "rabbis/rav-hillel-medalie.html", type: "Rabbi", titleHe: "הרב הלל מדליה" },
        { title: "Rav Markus Mordechai Rottenberg", url: "rabbis/rav-markus-mordechai-rottenberg.html", type: "Rabbi", titleHe: "הרב מרדכי רוטנברג" },
        { title: "Rav Moshe Avigdor Amiel", url: "rabbis/rav-moshe-avigdor-amiel.html", type: "Rabbi", titleHe: "הרב משה אבגדור עמיאל" },
        { title: "Rav Pinchas Padwa", url: "rabbis/rav-pinchas-padwa.html", type: "Rabbi", titleHe: "הרב פנחס פדווה" },
        { title: "Rav Eliyahu Shternbuch", url: "rabbis/rav-eliyahu-shternbuch.html", type: "Rabbi", titleHe: "הרב אליהו שטרנבוך" },
        { title: "Rabbi Chaim Aryeh Leibish Leizer (Reb Leibish)", url: "rabbis/reb-leibish.html", type: "Rabbi", titleHe: "הרב חיים אריה לייביש לייזר" },
        { title: "Rabbi Yaakov Leizer (Reb Yankele)", url: "rabbis/rabbi-yaakov-leizer.html", type: "Rabbi", titleHe: "הרב יעקב לייזר" },
        { title: "Rabbi Moshe Yitzchak Gewirtzman (Reb Itzikel)", url: "rabbis/rabbi-moshe-yitzchak-gewirtzman.html", type: "Rabbi", titleHe: "הרב משה יצחק גבירצמן" },
        { title: "Shemu’el Brodt", url: "rabbis/shemuel-brodt.html", type: "Rabbi", titleHe: "שמואל ברודט" },
        { title: "Rabbi Yehuda Aryeh Treger", url: "rabbis/rabbi-yehuda-aryeh-treger.html", type: "Rabbi", titleHe: "הרב יהודה אריה טרגר" },
        { title: "Rabbi Shraga Feivel Shapira", url: "rabbis/rabbi-shraga-feivel-shapira.html", type: "Rabbi", titleNl: "Rabbijn Shraga Feivel Shapira", titleFr: "Rabbin Shraga Feivel Shapira", titleHe: "הרב שרגא פייבל שפירא" },

        // Places
        { title: "Heide, Kalmthout", url: "places/heide.html", type: "Place", titleHe: "הייד, קלמהוט" },
        { title: "Yeshivat Heide", url: "places/yeshivat-heide.html", type: "Yeshiva", titleNl: "Yeshivat Heide", titleFr: "Yeshivat Heide", titleHe: "ישיבת הייד" },
        { title: "Jesode Hatorah School", url: "places/jesode-hatorah.html", type: "School", titleHe: "בית הספר יסודי התורה" },
        { title: "Yavne School", url: "places/yavne.html", type: "School", titleHe: "בית הספר יבנה" },
        { title: "Tachkemoni School", url: "places/tachkemoni.html", type: "School", titleHe: "בית הספר תחכמוני" },
        { title: "Belz School", url: "places/belz-school.html", type: "School", titleHe: "בית הספר בעלז" },
        { title: "Heide-Kalmthout Holocaust Victims Database", url: "places/heide-victims.html", type: "Research", titleNl: "Heide-Kalmthout Holocaust Slachtoffers Databank", titleFr: "Base de données des victimes de la Shoah de Heide-Kalmthout", titleHe: "מאגר קורבנות השואה של היידה-קלמטהוט" },

        // History Events & Organizations
        { title: "Belgian Revolution of 1830", url: "history/belgian-revolution-1830.html", type: "Event", titleNl: "Belgische Revolutie van 1830", titleFr: "Révolution belge de 1830", titleHe: "המהפכה הבלגית של 1830" },
        { title: "Antwerp Pogrom", url: "history/antwerp-pogrom.html", type: "Event", titleNl: "Antwerpse pogrom", titleFr: "Pogrom d'Anvers", titleHe: "פוגרום אנטוורפן" },
        { title: "Red Star Line", url: "history/red-star-line.html", type: "Company", titleNl: "Red Star Line", titleFr: "Red Star Line", titleHe: "רד סטאר ליין" },

        // History Periods
        { title: "Medieval Period (History)", url: "history/medieval-period.html", type: "History", titleNl: "Middeleeuwse periode (Geschiedenis)", titleFr: "Période médiévale (Histoire)", titleHe: "ימי הביניים (היסטוריה)" },
        { title: "Early Modern Period (History)", url: "history/early-modern-period.html", type: "History", titleNl: "Vroegmoderne tijd (Geschiedenis)", titleFr: "Période moderne (Histoire)", titleHe: "העת החדשה המוקדמת (היסטוריה)" },
        { title: "19th Century (History)", url: "history/19th-century.html", type: "History", titleNl: "19e eeuw (Geschiedenis)", titleFr: "XIXe siècle (Histoire)", titleHe: "המאה ה-19 (היסטוריה)" },
        { title: "Pre-War Era (History)", url: "history/pre-war.html", type: "History", titleNl: "Vooroorlogse periode (Geschiedenis)", titleFr: "L'époque d'avant-guerre (Histoire)", titleHe: "תקופת טרום המלחמה (היסטוריה)" },
        { title: "World War II (History)", url: "history/wwii.html", type: "History", titleNl: "Wereldoorlog II (Geschiedenis)", titleFr: "Seconde Guerre mondiale (Histoire)", titleHe: "מלחמת העולם השנייה (היסטוריה)" },
        { title: "Post-War Rebuilding (History)", url: "history/post-war.html", type: "History", titleNl: "Naoorlogse wederopbouw (Geschiedenis)", titleFr: "Reconstruction d'après-guerre (Histoire)", titleHe: "שיקום שלאחר המלחמה (היסטוריה)" },
        { title: "Modern Antwerp (History)", url: "history/modern-antwerp.html", type: "History", titleNl: "Modern Antwerpen (Geschiedenis)", titleFr: "Anvers moderne (Histoire)", titleHe: "אנטוורפן המודרנית (היסטוריה)" },
        { title: "Full History Timeline", url: "history/full-history.html", type: "History", titleNl: "Volledige geschiedenis tijdlijn", titleFr: "Chronologie complète de l'histoire", titleHe: "ציר זמן היסטורי מלא" },

        // Communal Bodies (Kehilles)
        { title: "Machsike Hadas", url: "organizations/machsike-hadas.html", type: "kehilla", titleHe: "מחזיקי הדת" },
        { title: "Shomre Hadas", url: "organizations/shomre-hadas.html", type: "kehilla", titleHe: "שומרי הדת" },
        { title: "Sephardic Community", url: "organizations/sephardic-community.html", type: "kehilla", titleHe: "הקהילה הספרדית" },
        { title: "Pshevorsk", url: "organizations/pshevorsk.html", type: "hasidic_dynasty", titleHe: "פשבורסק" },

        // New pages added in June 2026 / People
        { title: "Jozef Sterngold", url: "people/jozef-sterngold.html", type: "Person", titleNl: "Jozef Sterngold", titleFr: "Jozef Sterngold", titleHe: "יוזף שטרנגולד" },
        { title: "April 1943 attack", url: "history/april-1943-attack.html", type: "Event", titleNl: "De aanval van april 1943", titleFr: "L'attaque d'avril 1943", titleHe: "ההתקפה של אפריל 1943" },

        // Chazanim
        { title: "Benjamin Muller", url: "chazanim/benjamin-muller.html", type: "Person", titleHe: "בנימין מילר" },
        { title: "Yossi Muller", url: "chazanim/yossi-muller.html", type: "Person", titleHe: "יוסי מילר" },
        { title: "Benzion Moskovitz", url: "chazanim/benzion-moskovitz.html", type: "Person", titleHe: "בנציון מוסקוביץ" },
        { title: "Abraham Jelenko", url: "chazanim/abraham-jelenko.html", type: "Person", titleHe: "אברהם ילנקו" },
        { title: "Simon Davidovic", url: "chazanim/simon-davidovic.html", type: "Person", titleHe: "שמעון דוידוביץ" },
        { title: "Uscher Felder", url: "chazanim/uscher-felder.html", type: "Person", titleHe: "אשר פלדר" },
        { title: "Jacob Feldinger", url: "chazanim/jacob-feldinger.html", type: "Person", titleHe: "יעקב פלדינגר" }
    ];

    const headerContent = document.querySelector('.header-content');

    // Inject Search HTML if header exists
    if (headerContent) {
        // 1. Header-only search wrapper (visible on desktop, hidden on mobile)
        const searchWrapper = document.createElement('div');
        searchWrapper.className = 'search-wrapper header-only';
        searchWrapper.innerHTML = `
            <input type="text" placeholder="${langData.placeholder}" autocomplete="off">
            <div class="search-results"></div>
        `;

        const hamburgerBtn = headerContent.querySelector('.hamburger');
        
        // 1b. Header-only Contribute button (visible on desktop, hidden on mobile)
        let pathToContribute = '';
        const headerLogoLink = headerContent.querySelector('.logo a');
        if (headerLogoLink) {
            const href = headerLogoLink.getAttribute('href');
            const pathPrefix = href.replace('index.html', '');
            pathToContribute = pathPrefix + 'contribute.html';
        } else {
            pathToContribute = 'contribute.html';
        }

        const contributeBtn = document.createElement('a');
        contributeBtn.href = pathToContribute;
        contributeBtn.className = 'btn contribute-btn header-only';
        contributeBtn.textContent = langData.contribute;

        if (hamburgerBtn) {
            headerContent.insertBefore(searchWrapper, hamburgerBtn);
            headerContent.insertBefore(contributeBtn, hamburgerBtn);
        } else {
            headerContent.appendChild(searchWrapper);
            headerContent.appendChild(contributeBtn);
        }

        // Inject header language switcher directly under header-content
        const langWrapper = document.createElement('div');
        langWrapper.className = 'lang-switcher-wrapper header-only';
        langWrapper.innerHTML = `
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
        if (hamburgerBtn) {
            headerContent.insertBefore(langWrapper, hamburgerBtn);
        } else {
            headerContent.appendChild(langWrapper);
        }

        // Inject mobile drawer language switcher under nav list
        const navUl = document.querySelector('.main-nav ul');
        if (navUl) {
            // Calculate prefix for Contribute link on mobile
            let pathToContribute = '';
            const logoLink = document.querySelector('.logo a');
            if (logoLink) {
                const href = logoLink.getAttribute('href');
                const pathPrefix = href.replace('index.html', '');
                pathToContribute = pathPrefix + 'contribute.html';
            } else {
                pathToContribute = 'contribute.html';
            }

            // Detect if we are on the contribute page to mark it active
            const isContributePage = window.location.pathname.endsWith('contribute.html');
            const activeClass = isContributePage ? ' class="active"' : '';

            const contributeLi = document.createElement('li');
            contributeLi.className = 'mobile-only';
            contributeLi.innerHTML = `<a href="${pathToContribute}"${activeClass}>${langData.contribute}</a>`;
            navUl.appendChild(contributeLi);

            const langLi = document.createElement('li');
            langLi.className = 'lang-switcher-item mobile-only';
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
            navUl.appendChild(langLi);

            // 2. Mobile-only drawer search wrapper (inserted at the very top of drawer list)
            const searchLi = document.createElement('li');
            searchLi.className = 'mobile-search-item mobile-only';
            const mobileSearchWrapper = document.createElement('div');
            mobileSearchWrapper.className = 'search-wrapper';
            mobileSearchWrapper.innerHTML = `
                <input type="text" placeholder="${langData.placeholder}" autocomplete="off">
                <div class="search-results"></div>
            `;
            searchLi.appendChild(mobileSearchWrapper);
            navUl.insertBefore(searchLi, navUl.firstChild);
        }

        // Dynamic Search Logic for both wrappers
        const setupSearch = (wrapper) => {
            const searchInput = wrapper.querySelector('input');
            const searchResults = wrapper.querySelector('.search-results');
            if (!searchInput || !searchResults) return;

            searchInput.addEventListener('input', (e) => {
                const query = e.target.value.toLowerCase();
                searchResults.innerHTML = '';

                if (query.length < 2) {
                    searchResults.classList.remove('active');
                    return;
                }

                const filtered = searchData.filter(item => {
                    const itemTypeKey = item.type.toLowerCase();
                    const EnglishType = item.type.toLowerCase();
                    const localizedType = (langData.types[itemTypeKey] || item.type).toLowerCase();

                    let titleMatch = item.title.toLowerCase().includes(query);
                    if (currentLang === 'he' && item.titleHe) {
                        titleMatch = titleMatch || item.titleHe.includes(query);
                    } else if (currentLang === 'nl' && item.titleNl) {
                        titleMatch = titleMatch || item.titleNl.toLowerCase().includes(query);
                    } else if (currentLang === 'fr' && item.titleFr) {
                        titleMatch = titleMatch || item.titleFr.toLowerCase().includes(query);
                    }

                    const typeMatch = EnglishType.includes(query) ||
                                      localizedType.includes(query);

                    return titleMatch || typeMatch;
                });

                if (filtered.length > 0) {
                    // Calculate relative path prefix based on home link
                    let pathPrefix = '';
                    const homeLink = document.querySelector('.main-nav a[href$="index.html"]');
                    if (homeLink) {
                        const href = homeLink.getAttribute('href');
                        pathPrefix = href.replace('index.html', '');
                    }

                    filtered.forEach(item => {
                        const div = document.createElement('a');
                        div.className = 'search-item';
                        div.href = pathPrefix + item.url;

                        let displayTitle = item.title;
                        if (currentLang === 'he' && item.titleHe) {
                            displayTitle = item.titleHe;
                        } else if (currentLang === 'nl' && item.titleNl) {
                            displayTitle = item.titleNl;
                        } else if (currentLang === 'fr' && item.titleFr) {
                            displayTitle = item.titleFr;
                        }

                        const itemTypeKey = item.type.toLowerCase();
                        const displayType = langData.types[itemTypeKey] || item.type;

                        div.innerHTML = `
                            <span class="search-item-title">${displayTitle}</span>
                            <span class="search-item-type">${displayType}</span>
                        `;
                        div.addEventListener('click', (e) => {
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
                if (!wrapper.contains(e.target)) {
                    searchResults.classList.remove('active');
                }
            });
        };

        // Setup all search wrappers on the page
        document.querySelectorAll('.search-wrapper').forEach(setupSearch);

        // 3. Language Switcher Logic (runs on all .lang-switcher instances on the page)
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
        const segments = window.location.pathname.split('/').filter(Boolean);
        let relativePagePath = 'index.html';
        if (segments.length > 0) {
            const lastSegment = segments[segments.length - 1];
            if (lastSegment === 'nl' || lastSegment === 'fr' || lastSegment === 'he' || lastSegment === 'en') {
                relativePagePath = 'index.html';
            } else {
                const startIdx = Math.max(0, segments.length - (depth + 1));
                const pageSegments = segments.slice(startIdx);
                if (pageSegments.length > 0 && ['nl', 'fr', 'he', 'en'].includes(pageSegments[0])) {
                    pageSegments.shift();
                }
                relativePagePath = pageSegments.join('/') || 'index.html';
            }
        }

        document.querySelectorAll('.lang-switcher').forEach(switcher => {
            const langBtn = switcher.querySelector('.lang-btn');
            const langDropdown = switcher.querySelector('.lang-dropdown');
            if (!langBtn || !langDropdown) return;

            // Set current language display
            langBtn.querySelector('.lang-current').textContent = currentLang === 'he' ? 'עב' : currentLang.toUpperCase();

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
                if (!switcher.contains(e.target)) {
                    langDropdown.classList.remove('active');
                    langBtn.setAttribute('aria-expanded', 'false');
                }
            });
        });
    }


    // 5. Historical Tooltip Logic
    // Scan the page for all internal article links and convert them to tooltip triggers dynamically
    const articleLinks = document.querySelectorAll('.wiki-main-content a, .wiki-content a');
    articleLinks.forEach(link => {
        if (link.classList.contains('historical-tooltip-trigger')) {
            return;
        }

        const href = link.getAttribute('href');
        if (!href) return;

        // Only allow links inside paragraphs (p) or list items (li)
        if (!link.closest('p') && !link.closest('li')) {
            return;
        }

        // Skip buttons, cards, or other non-text UI components
        if (link.classList.contains('btn') || link.closest('.btn') || 
            link.classList.contains('card') || link.closest('.card') ||
            link.classList.contains('card-link')) {
            return;
        }

        // Skip breadcrumbs
        if (link.closest('.breadcrumb-nav') || link.classList.contains('breadcrumb-link')) {
            return;
        }

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
            },
            'jozef-sterngold': {
                image: '',
                en: { title: 'Jozef Sterngold', years: '', desc: 'Jozef Sterngold was a key figure in the Belgian Jewish resistance (CDJ) during WWII, saving children and hiding refugees, and subsequently led the post-war rebuilding of Antwerp\'s Jewish institutions.' },
                nl: { title: 'Jozef Sterngold', years: '', desc: 'Jozef Sterngold was een sleutelfiguur in het Belgisch-joodse verzet (CDJ) tijdens de Tweede Wereldoorlog. Hij redde kinderen en hielp onderduikers, en leidde daarna de naoorlogse wederopbouw van joodse instellingen.' },
                fr: { title: 'Jozef Sterngold', years: '', desc: 'Jozef Sterngold fut une figure clé de la résistance juive belge (CDJ) pendant la guerre, sauvant des enfants et cachant des réfugiés, puis dirigea la reconstruction d\'après-guerre des institutions juives d\'Anvers.' },
                he: { title: 'יוזף שטרנגולד', years: '', desc: 'יוזף שטרנגולד היה דמות מפתח במחתרת היהודית בבלגיה (CDJ) במהלך מלחמת העולם השנייה, והציל ילדים ופליטים במקומות מסתור, ובהמשך הוביל את שיקום המוסדות היהודיים באנטוורפן לאחר המלחמה.' }
            },
            'april-1943-attack': {
                image: '',
                en: { title: 'The April 1943 Attack', years: '', desc: 'On April 19, 1943, three Belgian resistance members stopped the Twentieth Convoy transport train carrying Jewish deportees from Dossin Barracks to Auschwitz, enabling 233 prisoners to escape.' },
                nl: { title: 'De aanval van april 1943', years: '', desc: 'Op 19 april 1943 hielden drie Belgische verzetsleden de trein van het Twintigste Transport tegen, die joodse gedeporteerden van de Dossinkazerne naar Auschwitz vervoerde, waardoor 233 gevangenen konden ontsnappen.' },
                fr: { title: 'L\'attaque d\'avril 1943', years: '', desc: 'Le 19 avril 1943, trois résistants belges ont arrêté le train du XXe convoi transportant des déportés juifs de la caserne Dossin vers Auschwitz, permettant à 233 prisonniers de s\'échapper.' },
                he: { title: 'ההתקפה של אפריל 1943', years: '', desc: 'ב-19 באפריל 1943, שלושה חברי מחתרת בלגים עצרו את רכבת המשלוח של השיירה העשרים שהובילה מגורשים יהודים מקסרקטין דוסין לאושוויץ, ואפשרו ל-233 אסירים להימלט.' }
            },
            'dossin-barracks': {
                image: '',
                en: { title: 'Dossin Barracks', years: '', desc: '' },
                nl: { title: 'Kazerne Dossin', years: '', desc: '' },
                fr: { title: 'Caserne Dossin', years: '', desc: '' },
                he: { title: 'קסרקטין דוסין', years: '', desc: '' }
            },
            'vnv': {
                image: '',
                en: { title: 'VNV (Flemish National Union)', years: '', desc: '' },
                nl: { title: 'VNV (Vlaamse Nationale Unie)', years: '', desc: '' },
                fr: { title: 'VNV (Union nationale flamande)', years: '', desc: '' },
                he: { title: 'VNV (לאומית פלמית איחוד)', years: '', desc: '' }
            },
            'consistoire': {
                image: '',
                en: { title: 'Consistoire Central Israélite de Belgique', years: '', desc: '' },
                nl: { title: 'Consistoire Central Israélite de Belgique', years: '', desc: '' },
                fr: { title: 'Consistoire Central Israélite de Belgique', years: '', desc: '' },
                he: { title: 'Consistoire Central Israélite de Belgique', years: '', desc: '' }
            },
            'edict-of-tolerance': {
                image: '',
                en: { title: 'Edict of Tolerance', years: '', desc: '' },
                nl: { title: 'Edict van tolerantie', years: '', desc: '' },
                fr: { title: 'Édit de tolérance', years: '', desc: '' },
                he: { title: 'צו הסובלנות', years: '', desc: '' }
            },
            'bubonic-plague': {
                image: '',
                en: { title: 'Bubonic Plague', years: '', desc: '' },
                nl: { title: 'Builenpest', years: '', desc: '' },
                fr: { title: 'Peste bubonique', years: '', desc: '' },
                he: { title: 'הדבר הבובוני', years: '', desc: '' }
            },
            'baldwin-iv': {
                image: '',
                en: { title: 'Baldwin IV, Count of Flanders', years: '', desc: '' },
                nl: { title: 'Boudewijn IV, graaf van Vlaanderen', years: '', desc: '' },
                fr: { title: 'Baudouin IV, comte de Flandre', years: '', desc: '' },
                he: { title: 'בולדווין הרביעי, רוזן פלנדריה', years: '', desc: '' }
            },
            'red-star-line': {
                image: '',
                en: { title: 'Red Star Line', years: '', desc: 'The Red Star Line was a shipping line founded in 1871 operating between Antwerp and America. It served as a gateway to the New World for over two million passengers, including hundreds of thousands of Eastern European Jewish emigrants.' },
                nl: { title: 'Red Star Line', years: '', desc: 'De Red Star Line was een in 1871 opgerichte rederij tussen Antwerpen en Amerika. Het diende als toegangspoort tot de Nieuwe Wereld voor meer dan twee miljoen passagiers, onder wie honderdduizenden Oost-Europese joodse emigranten.' },
                fr: { title: 'Red Star Line', years: '', desc: 'La Red Star Line était une compagnie maritime fondée en 1871 reliant Anvers à l\'Amérique. Elle a servi de porte d\'entrée vers le Nouveau Monde pour plus de deux millions de passagers, dont des centaines de milliers d\'émigrants juifs d\'Europe de l\'Est.' },
                he: { title: 'רד סטאר ליין', years: '', desc: 'רד סטאר ליין הייתה חברת ספנות שנוסדה בשנת 1871 וקישרה בין אנטוורפן לאמריקה. היא שימשה שער לעולם החדש עבור למעלה משני מיליון נוסעים, בהם מאות אלפי מהגרים יהודים ממזרח אירופה.' }
            },
            'antwerp-pogrom': {
                image: '',
                en: { title: 'Antwerp Pogrom', years: '', desc: 'The Antwerp Pogrom occurred on Easter Monday, April 14, 1941, when violent pro-Nazi collaborators attacked the Jewish quarter, setting fire to the Eisenmann and Van Den Nestlei synagogues and assaulting Jewish residents.' },
                nl: { title: 'Antwerpse pogrom', years: '', desc: 'De Antwerpse Pogrom vond plaats op paasmaandag 14 april 1941, toen pro-nazicollaborateurs de joodse wijk aanvielen, de synagogen Eisenmann en Van Den Nestlei in brand staken en joodse bewoners mishandelden.' },
                fr: { title: 'Pogrom d\'Anvers', years: '', desc: 'Le pogrom d\'Anvers a eu lieu le lundi de Pâques 14 avril 1941, lorsque des collaborateurs pro-nazis ont attaqué le quartier juif, incendiant les synagogues Eisenmann et Van Den Nestlei et agressant des résidents juifs.' },
                he: { title: 'פוגרום אנטוורפן', years: '', desc: 'פוגרום אנטוורפן התרחש ביום שני של פסחא, 14 באפריל 1941, כאשר משתפי פעולה פרו-נאצים תקפו את הרובע היהודי, הציתו את בתי הכנסת אייזנמן וואן דן נסטליי ותקפו תושבים יהודים.' }
            },
            'belgian-revolution-1830': {
                image: '',
                en: { title: 'Belgian Revolution', years: '', desc: 'The Belgian Revolution of 1830 led to the secession of the southern provinces from the Netherlands, establishing an independent Kingdom of Belgium. For the Jewish community, the 1831 Constitution brought full civic emancipation and official state recognition of Judaism.' },
                nl: { title: 'Belgische Revolutie', years: '', desc: 'De Belgische Revolutie van 1830 leidde tot de afscheiding van de zuidelijke provincies van de Nederlanden, waardoor een onafhankelijk België ontstond. Voor de joodse gemeenschap bracht de grondwet van 1831 volledige burgerlijke emancipatie en staatserkenning.' },
                fr: { title: 'Révolution belge', years: '', desc: 'La Révolution belge de 1830 a conduit à la sécession des provinces du Sud des Pays-Bas, créant une Belgique indépendante. Pour la communauté juive, la Constitution de 1831 a apporté une pleine émancipation civique et la reconnaissance de l\'État.' },
                he: { title: 'המהפכה הבלגית', years: '', desc: 'המהפכה הבלגית של 1830 הובילה לפרישת המחוזות הדרומיים מארצות השפלה ולהקמת בלגיה העצמאית. עבור הקהילה היהודית, חוקת 1831 הביאה לאמנציפציה אזרחית מלאה ולהכרה רשמית ביהדות על ידי המדינה.' }
            },
            'hollandse-synagoge': {
                image: '',
                en: { title: 'Hollandse Synagoge', years: '', desc: '' },
                nl: { title: 'Hollandse Synagoge', years: '', desc: '' },
                fr: { title: 'Synagogue Hollandse', years: '', desc: '' },
                he: { title: 'בית הכנסת של הולנד', years: '', desc: '' }
            },
            'romi-goldmuntz-synagogue': {
                image: '',
                en: { title: 'Romi Goldmuntz Synagogue', years: '', desc: '' },
                nl: { title: 'Romi Goldmuntz-synagoge', years: '', desc: '' },
                fr: { title: 'Synagogue Romi Goldmuntz', years: '', desc: '' },
                he: { title: 'בית הכנסת רומי גולדמונץ', years: '', desc: '' }
            },
            'jesode-hatorah': {
                image: '',
                en: { title: 'Jesode Hatorah', years: '', desc: 'Founded in 1895, Jesode Hatorah is the oldest Jewish day school in Antwerp. Closed during WWII and reopened in May 1945, it today serves as a large educational cornerstone for the Haredi community.' },
                nl: { title: 'Jesode Hatorah', years: '', desc: 'Jesode Hatorah, opgericht in 1895, is de oudste joodse dagschool in Antwerpen. Gesloten tijdens de Tweede Wereldoorlog en heropend in mei 1945, fungeert het vandaag als een grote onderwijshoeksteen voor de Haredi-gemeenschap.' },
                fr: { title: 'Jesode Hatora', years: '', desc: 'Fondée en 1895, Jesode Hatorah est la plus ancienne école juive d\'Anvers. Fermée pendant la Seconde Guerre mondiale et rouverte en mai 1945, elle est aujourd\'hui un pilier éducatif majeur pour la communauté Haredi.' },
                he: { title: 'ישודה התורה', years: '', desc: 'יסודי התורה, שנוסד בשנת 1895, הוא בית הספר היומי היהודי הוותיק ביותר באנטוורפן. הוא נסגר במהלך מלחמת העולם השנייה ונפתח מחדש במאי 1945, וכיום משמש כאבן יסוד חינוכית גדולה לקהילה החרדית.' }
            },
            'tachkemoni': {
                image: '',
                en: { title: 'Tachkemoni', years: '', desc: 'Founded in 1920, the Tachkemoni school in Antwerp was established under the Religious Zionist Mizrachi movement, combining modern Hebrew, Zionist philosophy, traditional religious texts, and secular studies.' },
                nl: { title: 'Tachkemoni', years: '', desc: 'De in 1920 opgerichte Tachkemoni-school in Antwerpen werd opgezet onder de religieus-zionistische Mizrachi-beweging en combineert modern Hebreeuws, zionistische filosofie, religieuze teksten en seculiere studies.' },
                fr: { title: 'Tachkémoni', years: '', desc: 'Fondée en 1920, l\'école Tachkemoni d\'Anvers a été créée sous l\'égide du mouvement sioniste religieux Mizrachi, combinant l\'hébreu moderne, la philosophie sioniste, les textes religieux et les études profanes.' },
                he: { title: 'תחכמוני', years: '', desc: 'בית ספר תחכמוני באנטוורפן, שנוסד בשנת 1920, הוקם מטעם תנועת המזרחי (הציונות הדתית), ומשלב עברית מודרנית, פילוסופיה ציונית, לימודי קודש ולימודי חול.' }
            },
            'heide': {
                image: '',
                en: { title: 'Heide', years: '', desc: '' },
                nl: { title: 'Heide', years: '', desc: '' },
                fr: { title: 'Heide', years: '', desc: '' },
                he: { title: 'הייד', years: '', desc: '' }
            },
            'rav-markus-mordechai-rottenberg': {
                image: '',
                en: { title: 'Marcus Rottenberg', years: '', desc: 'Marcus (Mordechai) Rottenberg served as the Chief Rabbi of Antwerp\'s Orthodox community (Machsike Hadas) from 1912. He refused to abandon his congregation during the war and was murdered in Auschwitz in 1943.' },
                nl: { title: 'Marcus Rottenberg', years: '', desc: 'Marcus (Mordechai) Rottenberg was vanaf 1912 opperrabbijn van de Antwerps-orthodoxe gemeenschap (Machsike Hadas). Hij weigerde zijn gemeente tijdens de oorlog te verlaten en werd in 1943 vermoord in Auschwitz.' },
                fr: { title: 'Marcus Rottenberg', years: '', desc: 'Marcus (Mordechai) Rottenberg a été le grand rabbin de la communauté orthodoxe d\'Anvers (Machsike Hadas) à partir de 1912. Il refusa d\'abandonner sa congrégation pendant la guerre et fut assassiné à Auschwitz en 1943.' },
                he: { title: 'מרקוס רוטנברג', years: '', desc: 'הרב מרדכי (מרקוס) רוטנברג כיהן כרבה הראשי של הקהילה החרדית "מחזיקי הדת" באנטוורפן משנת 1912. הוא סירב לנטוש את קהילתו במהלך המלחמה ונרצח באושוויץ בשנת 1943.' }
            },
            'machsike-hadas': {
                image: '',
                en: { title: 'Machsike Hadas', years: '', desc: 'Machsike Hadas is the principal ultra-Orthodox (Haredi) umbrella organization in Antwerp. Established in the late 19th century, it oversees synagogues, schools, and dietary certification (kashrut) systems.' },
                nl: { title: 'Machsike Hadas', years: '', desc: 'Machsike Hadas is de belangrijkste ultraorthodoxe (Haredi) koepelorganisatie in Antwerpen. Opgericht in de late 19e eeuw, houdt zij toezicht op synagogen, scholen en kasjroet-certificering.' },
                fr: { title: 'Machsike Hadas', years: '', desc: 'Machsike Hadas est la principale organisation faîtière ultra-orthodoxe (Haredi) d\'Anvers. Fondée à la fin du XIXe siècle, elle supervise les synagogues, les écoles et la certification de la cacherout.' },
                he: { title: 'מחסיקה הדס', years: '', desc: 'מחזיקי הדת הוא ארגון הגג החרדי המרכזי באנטוורפן. הוא הוקם בשלהי המאה ה-19 ומפקח על בתי כנסת, מוסדות חינוך ומערכות השגחת כשרות.' }
            },
            'shomre-hadas': {
                image: '',
                en: { title: 'Shomre Hadas', years: '', desc: 'Shomre Hadas is the main Modern Orthodox and traditional Jewish congregation in Antwerp, established in the 19th century. Its flagship synagogue, the Hollandse Synagoge, opened in 1893.' },
                nl: { title: 'Shomre Hadas', years: '', desc: 'Shomre Hadas is de belangrijkste modern-orthodoxe en traditionele joodse gemeente in Antwerpen, opgericht in de 19e eeuw. Haar vlaggenschip, de Hollandse Synagoge, werd geopend in 1893.' },
                fr: { title: 'Shomre Hadas', years: '', desc: 'Shomre Hadas est la principale congrégation juive orthodoxe moderne et traditionnelle d\'Anvers, établie au XIXe siècle. Sa synagogue phare, la Hollandse Synagoge, a ouvert ses portes en 1893.' },
                he: { title: 'שומר הדס', years: '', desc: 'שומרי הדת היא הקהילה היהודית האורתודוקסית-מודרנית והמסורתית המרכזית באנטוורפן, שהוקמה במאה ה-19. בית הכנסת המרכזי שלה, בית הכנסת ההולנדי, נפתח בשנת 1893.' }
            },
            'sephardic-community': {
                image: '',
                en: { title: 'Sephardic Community', years: '', desc: 'The Sephardic community in Antwerp dates back to 16th-century Crypto-Jews, with later waves arriving from the Ottoman Empire for the diamond trade, establishing the Portuguese Synagogue following the Portuguese rite.' },
                nl: { title: 'Sefardische Gemeenschap', years: '', desc: 'De Sefardische gemeenschap in Antwerpen stamt uit de 16e-eeuwse cryptojoden. Latere golven arriveerden uit het Ottomaanse Rijk voor de diamanthandel en stichtten de Portugese Synagoge volgens de Portugese ritus.' },
                fr: { title: 'Communauté sépharade', years: '', desc: 'La communauté sépharade d\'Anvers remonte aux marranes du XVIe siècle. Des vagues ultérieures arrivèrent de l\'Empire ottoman pour le commerce du diamant, fondant la synagogue portugaise selon le rite portugais.' },
                he: { title: 'קהילה ספרדית', years: '', desc: 'הקהילה הספרדית באנטוורפן מתחילה באנוסים מהמאה ה-16, כאשר גלים מאוחרים יותר הגיעו מהאימפריה העות\'מאנית לצורך ענף היהלומים והקימו את בית הכנסת הפורטוגזי בנוסח פורטוגל.' }
            },
            'yavne': {
                image: '',
                en: { title: 'Yavne', years: '', desc: 'Established in the post-WWII era, the Yavne school serves Orthodox Zionist families in Antwerp, integrating Torah study with secular knowledge (Torah u-Madda) from kindergarten through secondary school.' },
                nl: { title: 'Yavne', years: '', desc: 'De na de Tweede Wereldoorlog opgerichte Yavne-school bedient orthodox-zionistische gezinnen in Antwerpen en integreert Tora-studie met seculiere kennis (Torah u-Madda) van kleuter- tot secundair onderwijs.' },
                fr: { title: 'Yavné', years: '', desc: 'Créée après la Seconde Guerre mondiale, l\'école Yavné s\'adresse aux familles orthodoxes sionistes d\'Anvers, intégrant l\'étude de la Torah et les connaissances profanes (Torah u-Madda) de la maternelle au secondaire.' },
                he: { title: 'יבנה', years: '', desc: 'בית ספר יבנה, שהוקם בתקופה שלאחר מלחמת העולם השנייה, משרת משפחות דתיות-לאומיות באנטוורפן, ומשלב לימודי קודש עם ידע כללי (תורה ומדע) מגיל הגן ועד לתיכון.' }
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
                let rootPrefix = '';
                const navScript = document.querySelector('script[src*="js/nav.js"], script[src*="nav.js"]');
                if (navScript) {
                    const src = navScript.getAttribute('src');
                    rootPrefix = src.replace(/js\/nav\.js$/, '').replace(/nav\.js$/, '');
                } else {
                    const logoLink = document.querySelector('.logo a');
                    if (logoLink) {
                        const href = logoLink.getAttribute('href');
                        rootPrefix = href.replace('index.html', '');
                    }
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
                if (href === '#' || href === 'javascript:void(0)' || !href) {
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
