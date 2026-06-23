/**
 * Jewish Antwerp Historical Archive - Names Database Controller
 * Redesigned Holocaust Memorial Search & Research Engine
 */

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('names-db-container');
    if (!container) return;

    // Detect language of the page (default: en)
    const lang = document.documentElement.lang || 'en';

    // Translations Dictionary
    const translations = {
        en: {
            loadingTitle: "Loading Names Database",
            loadingText: "Downloading records... This may take a moment.",
            parsingText: "Parsing and indexing archival records...",
            searchPlaceholder: "Search by first name, last name, place, occupation...",
            statsTotal: "names in database",
            statsResults: "search results",
            statsActiveFilters: "active filters",
            clearFilters: "Clear all",
            filterTitle: "Filter Archive",
            filterLabelBirthPlace: "Birth Place",
            filterLabelBirthCountry: "Birth Country",
            filterLabelResidence: "Residence",
            filterLabelOccupation: "Occupation",
            filterLabelDeathPlace: "Death Place",
            filterLabelCategory: "Category",
            filterLabelBirthYear: "Birth Year",
            sortLabel: "Sort by",
            sortSurnameAsc: "Surname (A - Z)",
            sortSurnameDesc: "Surname (Z - A)",
            sortBirthAsc: "Birth Date (Oldest first)",
            sortBirthDesc: "Birth Date (Newest first)",
            sortDeathAsc: "Death Date (Oldest first)",
            sortDeathDesc: "Death Date (Newest first)",
            exportBtn: "Export results to CSV",
            copyLinkBtn: "Copy link to record",
            viewDetails: "View Details",
            loadMore: "Load More",
            noResults: "No records found matching your criteria.",
            linkCopied: "Link copied to clipboard!",
            closeModal: "Close",
            unknown: "Unknown",
            filterToggleBtn: "Filters",
            fields: {
                ID: "Record ID",
                Inventarisnummer: "Inventory Number",
                Categorie: "Category",
                Familienaam: "Surname",
                Voornaam: "First Name",
                Geboortedatum: "Birth Date",
                Geboorteplaats: "Birth Place",
                Geboorteland: "Birth Country",
                Overlijdensdatum: "Death Date",
                Overlijdensplaats: "Death Place",
                Overlijdensdetails: "Death Details",
                Woonplaats: "Residence",
                Adres: "Address",
                Beroep: "Occupation",
                Huwelijkspartner: "Spouse",
                Begraafplaats: "Cemetery",
                Verzetsbeweging: "Resistance Movement",
                Legerinformatie: "Military Service",
                ExtraInformatie: "Additional Information",
                Dossin_PersonId: "Dossin Barracks Person ID",
                Toegang: "Access Code"
            },
            modalSections: {
                personal: "Personal Information",
                persecution: "Wartime & Persecution",
                death: "Death Details",
                archive: "Archival Information"
            },
            sourceAttribution: "Source: FelixArchief Antwerp – Namenproject Antwerpen. Data based on an export of June 23, 2026. This data represents a snapshot; records may have been modified or supplemented afterwards."
        },
        nl: {
            loadingTitle: "Namendatabank Laden",
            loadingText: "Gegevens downloaden... Dit kan even duren.",
            parsingText: "Archiefrecords verwerken en indexeren...",
            searchPlaceholder: "Zoek op voornaam, familienaam, plaats, beroep...",
            statsTotal: "namen in databank",
            statsResults: "zoekresultaten",
            statsActiveFilters: "actieve filters",
            clearFilters: "Wissen",
            filterTitle: "Archief Filteren",
            filterLabelBirthPlace: "Geboorteplaats",
            filterLabelBirthCountry: "Geboorteland",
            filterLabelResidence: "Woonplaats",
            filterLabelOccupation: "Beroep",
            filterLabelDeathPlace: "Overlijdensplaats",
            filterLabelCategory: "Categorie",
            filterLabelBirthYear: "Geboortejaar",
            sortLabel: "Sorteer op",
            sortSurnameAsc: "Familienaam (A - Z)",
            sortSurnameDesc: "Familienaam (Z - A)",
            sortBirthAsc: "Geboortedatum (Oud - Nieuw)",
            sortBirthDesc: "Geboortedatum (Nieuw - Oud)",
            sortDeathAsc: "Overlijdensdatum (Oud - Nieuw)",
            sortDeathDesc: "Overlijdensdatum (Nieuw - Oud)",
            exportBtn: "Exporteer naar CSV",
            copyLinkBtn: "Kopieer link naar record",
            viewDetails: "Bekijk details",
            loadMore: "Meer laden",
            noResults: "Geen records gevonden die voldoen aan uw criteria.",
            linkCopied: "Directe link naar record gekopieerd!",
            closeModal: "Sluiten",
            unknown: "Onbekend",
            filterToggleBtn: "Filters",
            fields: {
                ID: "Archief ID",
                Inventarisnummer: "Inventarisnummer",
                Categorie: "Categorie",
                Familienaam: "Familienaam",
                Voornaam: "Voornaam",
                Geboortedatum: "Geboortedatum",
                Geboorteplaats: "Geboorteplaats",
                Geboorteland: "Geboorteland",
                Overlijdensdatum: "Overlijdensdatum",
                Overlijdensplaats: "Overlijdensplaats",
                Overlijdensdetails: "Overlijdensdetails",
                Woonplaats: "Woonplaats",
                Adres: "Adres",
                Beroep: "Beroep",
                Huwelijkspartner: "Huwelijkspartner",
                Begraafplaats: "Begraafplaats",
                Verzetsbeweging: "Verzetsbeweging",
                Legerinformatie: "Legerinformatie",
                ExtraInformatie: "Extra informatie",
                Dossin_PersonId: "Dossin Person ID",
                Toegang: "Toegangsnummer"
            },
            modalSections: {
                personal: "Persoonlijke Gegevens",
                persecution: "Oorlog & Vervolging",
                death: "Overlijdensgegevens",
                archive: "Archief & Bronnen"
            },
            sourceAttribution: "Bron: FelixArchief Antwerpen – Namenproject Antwerpen. Gegevens gebaseerd op een export van 23 juni 2026. Deze gegevens vormen een momentopname; records kunnen nadien gewijzigd of aangevuld zijn."
        },
        fr: {
            loadingTitle: "Chargement de la base de données",
            loadingText: "Téléchargement des archives... Veuillez patienter.",
            parsingText: "Traitement et indexation des dossiers d'archives...",
            searchPlaceholder: "Rechercher par prénom, nom de famille, lieu, profession...",
            statsTotal: "noms dans la base",
            statsResults: "résultats",
            statsActiveFilters: "filtres actifs",
            clearFilters: "Effacer tout",
            filterTitle: "Filtrer les archives",
            filterLabelBirthPlace: "Lieu de naissance",
            filterLabelBirthCountry: "Pays de naissance",
            filterLabelResidence: "Résidence",
            filterLabelOccupation: "Profession",
            filterLabelDeathPlace: "Lieu de décès",
            filterLabelCategory: "Catégorie",
            filterLabelBirthYear: "Année de naissance",
            sortLabel: "Trier par",
            sortSurnameAsc: "Nom de famille (A - Z)",
            sortSurnameDesc: "Nom de famille (Z - A)",
            sortBirthAsc: "Date de naissance (Plus ancien)",
            sortBirthDesc: "Date de naissance (Plus récent)",
            sortDeathAsc: "Date de décès (Plus ancien)",
            sortDeathDesc: "Date de décès (Plus récent)",
            exportBtn: "Exporter les résultats en CSV",
            copyLinkBtn: "Copier le lien direct",
            viewDetails: "Voir les détails",
            loadMore: "Charger plus",
            noResults: "Aucun dossier trouvé ne correspond à vos critères.",
            linkCopied: "Lien direct vers la fiche copié !",
            closeModal: "Fermer",
            unknown: "Inconnu",
            filterToggleBtn: "Filtres",
            fields: {
                ID: "ID de la fiche",
                Inventarisnummer: "Numéro d'inventaire",
                Categorie: "Catégorie",
                Familienaam: "Nom de famille",
                Voornaam: "Prénom",
                Geboortedatum: "Date de naissance",
                Geboorteplaats: "Lieu de naissance",
                Geboorteland: "Pays de naissance",
                Overlijdensdatum: "Date de décès",
                Overlijdensplaats: "Lieu de décès",
                Overlijdensdetails: "Détails du décès",
                Woonplaats: "Résidence",
                Adres: "Adresse",
                Beroep: "Profession",
                Huwelijkspartner: "Conjoint(e)",
                Begraafplaats: "Cimetière",
                Verzetsbeweging: "Mouvement de résistance",
                Legerinformatie: "Informations militaires",
                ExtraInformatie: "Informations supplémentaires",
                Dossin_PersonId: "ID Personne (Caserne Dossin)",
                Toegang: "Code d'accès"
            },
            modalSections: {
                personal: "Informations Personnelles",
                persecution: "Guerre & Persécution",
                death: "Détails du Décès",
                archive: "Informations d'Archive"
            },
            sourceAttribution: "Source : FelixArchief Anvers – Projet des Noms d'Anvers. Données basées sur un export du 23 juin 2026. Ces données constituent un instantané ; des fiches peuvent avoir été modifiées ou complétées par la suite."
        },
        he: {
            loadingTitle: "טוען את מאגר השמות",
            loadingText: "מוריד נתונים... אנא המתן.",
            parsingText: "מעבד ומאנדקס את רשומות הארכיון...",
            searchPlaceholder: "חיפוש לפי שם פרטי, שם משפחה, מקום, עיסוק...",
            statsTotal: "שמות במאגר",
            statsResults: "תוצאות חיפוש",
            statsActiveFilters: "מסננים פעילים",
            clearFilters: "נקה הכל",
            filterTitle: "סינון הארכיון",
            filterLabelBirthPlace: "מקום לידה",
            filterLabelBirthCountry: "ארץ לידה",
            filterLabelResidence: "מקום מגורים",
            filterLabelOccupation: "עיסוק",
            filterLabelDeathPlace: "מקום פטירה",
            filterLabelCategory: "קטגוריה",
            filterLabelBirthYear: "שנת לידה",
            sortLabel: "מיון לפי",
            sortSurnameAsc: "שם משפחה (א - ת)",
            sortSurnameDesc: "שם משפחה (ת - א)",
            sortBirthAsc: "תאריך לידה (מהישן לחדש)",
            sortBirthDesc: "תאריך לידה (מהחדש לישן)",
            sortDeathAsc: "תאריך פטירה (מהישן לחדש)",
            sortDeathDesc: "תאריך פטירה (מהחדש לישן)",
            exportBtn: "ייצוא תוצאות לקובץ CSV",
            copyLinkBtn: "העתק קישור ישיר לרשומה",
            viewDetails: "פרטים נוספים",
            loadMore: "טען עוד שמות",
            noResults: "לא נמצאו רשומות המתאימות לקריטריונים שלכם.",
            linkCopied: "הקישור הישיר לרשומה הועתק!",
            closeModal: "סגור",
            unknown: "לא ידוע",
            filterToggleBtn: "מסננים",
            fields: {
                ID: "מזהה רשומה",
                Inventarisnummer: "מספר ארכיון",
                Categorie: "קטגוריה",
                Familienaam: "שם משפחה",
                Voornaam: "שם פרטי",
                Geboortedatum: "תאריך לידה",
                Geboorteplaats: "מקום לידה",
                Geboorteland: "ארץ לידה",
                Overlijdensdatum: "תאריך פטירה",
                Overlijdensplaats: "מקום פטירה",
                Overlijdensdetails: "פרטי פטירה",
                Woonplaats: "מקום מגורים",
                Adres: "כתובת",
                Beroep: "עיסוק",
                Huwelijkspartner: "בן/בת זוג",
                Begraafplaats: "בית עלמין",
                Verzetsbeweging: "תנועת התנגדות",
                Legerinformatie: "מידע צבאי",
                ExtraInformatie: "מידע נוסף",
                Dossin_PersonId: "מזהה אסיר (מחנה דוסין)",
                Toegang: "קוד גישה"
            },
            modalSections: {
                personal: "פרטים אישיים",
                persecution: "תקופת המלחמה והרדיפות",
                death: "פרטי פטירה",
                archive: "מידע ארכיוני"
            },
            sourceAttribution: "מקור: FelixArchief אנטוורפן – פרויקט השמות אנטוורפן. הנתונים מבוססים על ייצוא מ-23 ביוני 2026. נתונים אלו מהווים תמונת מצב זמנית; ייתכן שהרשומות עודכנו או הושלמו לאחר מכן."
        }
    };

    const t = translations[lang] || translations.en;

    // Helper functions
    function normalizeText(text) {
        if (!text) return '';
        return text.toString()
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/ij/g, "y");
    }

    function formatNumber(num) {
        if (lang === 'nl') {
            return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        }
        return num.toLocaleString(lang);
    }

    function extractYear(dateStr, descStr) {
        if (dateStr && dateStr.length >= 4) {
            const y = parseInt(dateStr.substring(0, 4), 10);
            if (!isNaN(y) && y > 1800 && y < 2000) return y;
        }
        if (descStr) {
            const match = descStr.match(/\b(18\d\d|19\d\d)\b/);
            if (match) return parseInt(match[0], 10);
        }
        return null;
    }

    // Helper to format dates beautifully depending on language
    function formatMemorialDate(dateStr, descStr) {
        if (!dateStr || dateStr.startsWith('0')) {
            return descStr || t.unknown;
        }
        // Date format: YYYY-MM-DD
        const parts = dateStr.split(' ')[0].split('-');
        if (parts.length === 3) {
            const year = parseInt(parts[0], 10);
            const monthIdx = parseInt(parts[1], 10) - 1;
            const day = parseInt(parts[2], 10);
            
            if (!isNaN(year) && !isNaN(monthIdx) && !isNaN(day)) {
                let monthName = '';
                if (lang === 'nl') {
                    const months = ['januari', 'maart', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december'];
                    // Fix index out of bound just in case
                    monthName = months[monthIdx] || '';
                } else if (lang === 'fr') {
                    const months = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
                    monthName = months[monthIdx] || '';
                } else if (lang === 'he') {
                    const months = ['בנובמבר', 'בפברואר', 'במרץ', 'באפריל', 'במאי', 'ביוני', 'ביולי', 'באוגוסט', 'בספטמבר', 'באוקטובר', 'בנובמבר', 'בדצמבר'];
                    // Note: Hebrew months prefix
                    monthName = months[monthIdx] || '';
                } else {
                    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
                    monthName = months[monthIdx] || '';
                }

                let formatted = '';
                if (lang === 'he') {
                    formatted = `${day} ${monthName} ${year}`;
                } else {
                    formatted = `${day} ${monthName} ${year}`;
                }
                
                if (descStr && descStr !== dateStr && !descStr.includes('Precieze overlijdensdatum is niet gekend')) {
                    return `${formatted} (${descStr})`;
                }
                return formatted;
            }
        }
        return descStr || dateStr || t.unknown;
    }

    // Custom CSV parser that handles newlines in quotes
    function parseCSV(text) {
        const result = [];
        let i = 0;
        const len = text.length;
        let row = [];
        let entry = '';
        
        while (i < len) {
            let c = text[i];
            if (c === '"') {
                i++;
                let start = i;
                while (i < len) {
                    if (text[i] === '"') {
                        if (i + 1 < len && text[i + 1] === '"') {
                            entry += text.substring(start, i) + '"';
                            i += 2;
                            start = i;
                        } else {
                            entry += text.substring(start, i);
                            i++;
                            break;
                        }
                    } else {
                        i++;
                    }
                }
            } else {
                let start = i;
                while (i < len && text[i] !== ',' && text[i] !== '\r' && text[i] !== '\n') {
                    i++;
                }
                entry += text.substring(start, i);
            }
            
            row.push(entry);
            entry = '';
            
            if (i < len && text[i] === ',') {
                i++;
                if (i < len && (text[i] === '\r' || text[i] === '\n')) {
                    row.push('');
                } else if (i === len) {
                    row.push('');
                }
            } else if (i < len && (text[i] === '\r' || text[i] === '\n')) {
                result.push(row);
                row = [];
                if (text[i] === '\r' && i + 1 < len && text[i + 1] === '\n') {
                    i += 2;
                } else {
                    i++;
                }
            }
        }
        
        if (row.length > 0) {
            result.push(row);
        }
        return result;
    }

    // Determine path to names.csv based on current path depth
    let csvPath = '../names.csv';
    if (window.location.pathname.includes('/nl/') || window.location.pathname.includes('/fr/') || window.location.pathname.includes('/he/')) {
        csvPath = '../../names.csv';
    }

    // Render loading state
    container.innerHTML = `
        <div class="database-loader" id="db-loader">
            <h3 class="loader-title">${t.loadingTitle}</h3>
            <p class="loader-status" id="loader-status">${t.loadingText}</p>
            <div class="progress-container">
                <div class="progress-bar" id="progress-bar"></div>
            </div>
        </div>
    `;

    const progressBar = document.getElementById('progress-bar');
    const loaderStatus = document.getElementById('loader-status');

    let rawRecords = [];
    let headers = [];
    let records = []; // Mapped clean records
    let filteredRecords = [];
    
    // Unique filter options
    let filterOptions = {
        birthPlace: [],
        birthCountry: [],
        residence: [],
        occupation: [],
        deathPlace: [],
        category: [],
        birthYear: []
    };

    // Active filters state
    let activeFilters = {
        query: '',
        birthPlace: '',
        birthCountry: '',
        residence: '',
        occupation: '',
        deathPlace: '',
        category: '',
        birthYear: ''
    };

    let currentSort = 'surname_asc';
    let currentPage = 1;
    const recordsPerPage = 24;

    // Load data with progress stream
    async function loadData() {
        try {
            const response = await fetch(csvPath);
            if (!response.ok) throw new Error(`Network response was not OK: ${response.status} ${response.statusText}`);
            
            let text = '';
            
            if (response.body && typeof response.body.getReader === 'function') {
                const contentLength = response.headers.get('content-length');
                const total = contentLength ? parseInt(contentLength, 10) : 0;
                
                let loaded = 0;
                const reader = response.body.getReader();
                const chunks = [];
                
                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;
                    chunks.push(value);
                    loaded += value.length;
                    
                    if (total > 0 && progressBar) {
                        const pct = Math.round((loaded / total) * 100);
                        progressBar.style.width = pct + '%';
                        loaderStatus.textContent = `${t.loadingText} (${pct}%)`;
                    }
                }
                
                if (loaderStatus) loaderStatus.textContent = t.parsingText;
                
                // Concatenate binary chunks
                const chunksAll = new Uint8Array(loaded);
                let position = 0;
                for (let chunk of chunks) {
                    chunksAll.set(chunk, position);
                    position += chunk.length;
                }
                
                const decoder = new TextDecoder('utf-8');
                text = decoder.decode(chunksAll);
            } else {
                // Fallback for environments where body streaming is not supported or blocked
                if (loaderStatus) loaderStatus.textContent = t.loadingText;
                if (progressBar) progressBar.style.width = '50%';
                text = await response.text();
            }
            
            // Parse CSV in microtask to allow loader text repaint
            setTimeout(() => {
                const parsed = parseCSV(text);
                if (parsed.length > 0) {
                    headers = parsed[0].map(h => h.trim());
                    rawRecords = parsed.slice(1);
                    processRecords();
                } else {
                    throw new Error("No data in CSV");
                }
            }, 50);
            
        } catch (err) {
            console.error("Error loading names database: ", err);
            loaderStatus.innerHTML = `<span style="color: #ff6b6b;">Error loading database. Please check your network connection and try again.<br><small>${err.message}</small></span>`;
        }
    }

    // Clean and index records
    function processRecords() {
        const headerIndices = {};
        headers.forEach((h, idx) => {
            headerIndices[h] = idx;
        });

        records = rawRecords.map(row => {
            // Guarantee row length matches headers
            if (row.length < headers.length) {
                row = row.concat(new Array(headers.length - row.length).fill(''));
            } else if (row.length > headers.length) {
                row = row.slice(0, headers.length);
            }

            const rec = {};
            headers.forEach(h => {
                rec[h] = row[headerIndices[h]] ? row[headerIndices[h]].trim() : '';
            });

            // Extract birth year for filtering
            rec._birthYearVal = extractYear(rec.Geboortedatum, rec.Omschrijving_geboortedatum);

            // Clean categorical indices (ignore 0 or unassigned values)
            if (rec.Overlijdensplaats === '0') rec.Overlijdensplaats = '';
            if (rec.Geboorteplaats === '0') rec.Geboorteplaats = '';
            if (rec.Woonplaats === '0') rec.Woonplaats = '';
            if (rec.Beroep === '0' || rec.Beroep === 'zonder') rec.Beroep = '';

            // Concatenate all text fields into normalized string for fast search
            rec._searchString = normalizeText(
                `${rec.Voornaam} ${rec.Familienaam} ${rec.Voornaam} ${rec.Geboorteplaats} ${rec.Geboorteland} ${rec.Woonplaats} ${rec.Adres} ${rec.Beroep} ${rec.Overlijdensplaats} ${rec.ExtraInformatie} ${rec.Inventarisnummer} ${rec.Dossin_PersonId}`
            );

            return rec;
        });

        // Generate filter options
        const bpSet = new Set();
        const bcSet = new Set();
        const wpSet = new Set();
        const bpOcc = new Set();
        const dpSet = new Set();
        const catSet = new Set();
        const bySet = new Set();

        records.forEach(rec => {
            if (rec.Geboorteplaats) bpSet.add(rec.Geboorteplaats);
            if (rec.Geboorteland) bcSet.add(rec.Geboorteland);
            if (rec.Woonplaats) wpSet.add(rec.Woonplaats);
            if (rec.Beroep) bpOcc.add(rec.Beroep);
            if (rec.Overlijdensplaats) dpSet.add(rec.Overlijdensplaats);
            if (rec.Categorie) catSet.add(rec.Categorie);
            if (rec._birthYearVal) bySet.add(rec._birthYearVal);
        });

        filterOptions.birthPlace = Array.from(bpSet).sort();
        filterOptions.birthCountry = Array.from(bcSet).sort();
        filterOptions.residence = Array.from(wpSet).sort();
        filterOptions.occupation = Array.from(bpOcc).sort();
        filterOptions.deathPlace = Array.from(dpSet).sort();
        filterOptions.category = Array.from(catSet).sort();
        filterOptions.birthYear = Array.from(bySet).sort((a, b) => a - b);

        // Hide loader and draw App
        const loader = document.getElementById('db-loader');
        if (loader) loader.remove();

        renderApp();
        
        // Check for direct routing via query param (?id=12345)
        const urlParams = new URLSearchParams(window.location.search);
        const recordId = urlParams.get('id');
        if (recordId) {
            const matched = records.find(r => r.ID === recordId);
            if (matched) {
                openRecordModal(matched);
            }
        }
    }

    // Render main layout
    function renderApp() {
        container.innerHTML = `
            <!-- Search & Toolbar -->
            <div class="search-container">
                <div class="search-input-wrapper">
                    <span class="search-icon-fixed">🔍</span>
                    <input type="text" id="db-search-input" placeholder="${t.searchPlaceholder}">
                </div>
                <button class="mobile-filter-toggle-btn" id="btn-toggle-filters">
                    <span>⚙️</span> ${t.filterToggleBtn}
                </button>
            </div>

            <div class="active-filters-container" id="active-filters-chips" style="display: none;">
                <span class="active-filter-title">${t.statsActiveFilters}:</span>
                <!-- chips rendered dynamically -->
                <button class="clear-all-filters" id="btn-clear-filters">${t.clearFilters}</button>
            </div>

            <!-- Dashboard Toolbar -->
            <div class="toolbar-container">
                <div class="sort-wrapper">
                    <label class="sort-label" for="db-sort">${t.sortLabel}:</label>
                    <select class="sort-select" id="db-sort">
                        <option value="surname_asc">${t.sortSurnameAsc}</option>
                        <option value="surname_desc">${t.sortSurnameDesc}</option>
                        <option value="birth_asc">${t.sortBirthAsc}</option>
                        <option value="birth_desc">${t.sortBirthDesc}</option>
                        <option value="death_asc">${t.sortDeathAsc}</option>
                        <option value="death_desc">${t.sortDeathDesc}</option>
                    </select>
                </div>
            </div>

            <!-- Stats Dashboard -->
            <div class="stats-panel">
                <div class="stats-card">
                    <div class="stats-number" id="stats-db-total">${formatNumber(records.length)}</div>
                    <div class="stats-label">${t.statsTotal}</div>
                </div>
                <div class="stats-card">
                    <div class="stats-number" id="stats-results-count">0</div>
                    <div class="stats-label">${t.statsResults}</div>
                </div>
                <div class="stats-card">
                    <div class="stats-number" id="stats-active-filters-count">0</div>
                    <div class="stats-label">${t.statsActiveFilters}</div>
                </div>
            </div>

            <!-- Core Split Layout -->
            <div class="names-db-layout">
                <!-- Sidebar Filters -->
                <aside class="filter-panel">
                    <h3 class="filter-panel-title">
                        <span>${t.filterTitle}</span>
                        <button class="clear-all-filters" id="sidebar-clear-filters">${t.clearFilters}</button>
                    </h3>
                    
                    <div class="filter-group">
                        <label class="filter-label">${t.filterLabelCategory}</label>
                        <div id="filter-category"></div>
                    </div>
                    
                    <div class="filter-group">
                        <label class="filter-label">${t.filterLabelBirthPlace}</label>
                        <div id="filter-birth-place"></div>
                    </div>

                    <div class="filter-group">
                        <label class="filter-label">${t.filterLabelBirthCountry}</label>
                        <div id="filter-birth-country"></div>
                    </div>

                    <div class="filter-group">
                        <label class="filter-label">${t.filterLabelResidence}</label>
                        <div id="filter-residence"></div>
                    </div>

                    <div class="filter-group">
                        <label class="filter-label">${t.filterLabelOccupation}</label>
                        <div id="filter-occupation"></div>
                    </div>

                    <div class="filter-group">
                        <label class="filter-label">${t.filterLabelDeathPlace}</label>
                        <div id="filter-death-place"></div>
                    </div>

                    <div class="filter-group">
                        <label class="filter-label">${t.filterLabelBirthYear}</label>
                        <div id="filter-birth-year"></div>
                    </div>
                </aside>

                <!-- Grid & Pagination -->
                <section>
                    <div class="names-grid" id="names-grid-results"></div>
                    
                    <div class="no-results-state" id="no-results-view" style="display: none;">
                        <div class="no-results-icon">🕯️</div>
                        <p>${t.noResults}</p>
                    </div>

                    <div class="pagination-container" id="pagination-panel">
                        <button class="load-more-btn" id="btn-load-more">
                            ${t.loadMore}
                        </button>
                    </div>
                </section>
            </div>

            <!-- Modal and Notifications -->
            <div class="modal-overlay" id="record-modal-overlay">
                <div class="modal-container" id="record-modal-container"></div>
            </div>
            
            <div class="toast-notification" id="toast-notification"></div>
        `;

        // Attach listeners
        document.getElementById('db-search-input').addEventListener('input', debounce((e) => {
            activeFilters.query = e.target.value;
            applyFilters();
        }, 150));

        document.getElementById('db-sort').addEventListener('change', (e) => {
            currentSort = e.target.value;
            applyFilters(false); // Don't reset pagination if just sorting
        });

        document.getElementById('btn-load-more').addEventListener('click', () => {
            currentPage++;
            renderPageResults();
        });


        const toggleBtn = document.getElementById('btn-toggle-filters');
        const filterPanel = document.querySelector('.filter-panel');
        if (toggleBtn && filterPanel) {
            toggleBtn.addEventListener('click', () => {
                filterPanel.classList.toggle('active');
                toggleBtn.classList.toggle('active');
            });
        }

        document.getElementById('btn-clear-filters').addEventListener('click', resetFilters);
        document.getElementById('sidebar-clear-filters').addEventListener('click', resetFilters);

        // Bind escape key and overlay click for modal
        const modalOverlay = document.getElementById('record-modal-overlay');
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) closeModal();
        });
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeModal();
        });

        // Initialize custom selects
        initDropdown('filter-category', 'category', filterOptions.category);
        initDropdown('filter-birth-place', 'birthPlace', filterOptions.birthPlace);
        initDropdown('filter-birth-country', 'birthCountry', filterOptions.birthCountry);
        initDropdown('filter-residence', 'residence', filterOptions.residence);
        initDropdown('filter-occupation', 'occupation', filterOptions.occupation);
        initDropdown('filter-death-place', 'deathPlace', filterOptions.deathPlace);
        initDropdown('filter-birth-year', 'birthYear', filterOptions.birthYear);

        applyFilters();
    }

    // Debouncer to prevent search stutters
    function debounce(func, delay) {
        let timeout;
        return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), delay);
        };
    }

    // Build Searchable Select dropdown widget
    function initDropdown(containerId, filterKey, optionsList) {
        const root = document.getElementById(containerId);
        if (!root) return;

        const dropdown = document.createElement('div');
        dropdown.className = 'names-dropdown';
        dropdown.id = `dropdown-${filterKey}`;

        const button = document.createElement('button');
        button.className = 'names-dropdown-btn';
        button.type = 'button';
        button.textContent = `---`;

        const menu = document.createElement('div');
        menu.className = 'names-dropdown-menu';

        // Add search input if options list is long (> 10 items)
        if (optionsList.length > 10) {
            const searchWrapper = document.createElement('div');
            searchWrapper.className = 'names-dropdown-search-wrapper';
            
            const searchInput = document.createElement('input');
            searchInput.className = 'names-dropdown-search';
            searchInput.type = 'text';
            searchInput.placeholder = '🔍 ...';
            
            searchWrapper.appendChild(searchInput);
            menu.appendChild(searchWrapper);

            // Filter options as you type inside select dropdown
            searchInput.addEventListener('input', () => {
                const q = normalizeText(searchInput.value);
                menu.querySelectorAll('.names-dropdown-option').forEach(option => {
                    const text = normalizeText(option.textContent);
                    if (text.includes(q)) {
                        option.style.display = '';
                    } else {
                        option.style.display = 'none';
                    }
                });
            });
        }

        const optionsContainer = document.createElement('ul');
        optionsContainer.className = 'names-dropdown-options';

        // Add empty choice
        const emptyOption = document.createElement('li');
        emptyOption.className = 'names-dropdown-option selected';
        emptyOption.dataset.value = '';
        emptyOption.textContent = `---`;
        optionsContainer.appendChild(emptyOption);

        optionsList.forEach(opt => {
            const li = document.createElement('li');
            li.className = 'names-dropdown-option';
            li.dataset.value = opt;
            li.textContent = opt;
            optionsContainer.appendChild(li);
        });

        menu.appendChild(optionsContainer);
        dropdown.appendChild(button);
        dropdown.appendChild(menu);
        root.appendChild(dropdown);

        // Click event to toggle active
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            // Close other dropdowns
            document.querySelectorAll('.names-dropdown.active').forEach(d => {
                if (d !== dropdown) d.classList.remove('active');
            });
            dropdown.classList.toggle('active');
            
            // Focus search input on open
            if (dropdown.classList.contains('active')) {
                const s = dropdown.querySelector('.names-dropdown-search');
                if (s) s.focus();
            }
        });

        // Click option selection
        optionsContainer.addEventListener('click', (e) => {
            const target = e.target;
            if (target.classList.contains('names-dropdown-option')) {
                optionsContainer.querySelectorAll('.names-dropdown-option').forEach(o => o.classList.remove('selected'));
                target.classList.add('selected');
                
                const val = target.dataset.value;
                activeFilters[filterKey] = val;
                button.textContent = val ? val : `---`;
                
                dropdown.classList.remove('remove');
                dropdown.classList.remove('active');
                
                // Clear dropdown search text
                const s = dropdown.querySelector('.names-dropdown-search');
                if (s) {
                    s.value = '';
                    menu.querySelectorAll('.names-dropdown-option').forEach(o => o.style.display = '');
                }

                applyFilters();
            }
        });

        // Global click listener to close dropdowns
        document.addEventListener('click', () => {
            dropdown.classList.remove('active');
        });
    }

    // Set value of custom dropdown programmatically
    function setDropdownValue(filterKey, val) {
        const dropdown = document.getElementById(`dropdown-${filterKey}`);
        if (!dropdown) return;

        const button = dropdown.querySelector('.names-dropdown-btn');
        const options = dropdown.querySelectorAll('.names-dropdown-option');
        
        button.textContent = val ? val : `---`;
        options.forEach(opt => {
            if (opt.dataset.value === val.toString()) {
                opt.classList.add('selected');
            } else {
                opt.classList.remove('selected');
            }
        });
    }

    // Filter, sort, and slice data
    function applyFilters(resetPage = true) {
        if (resetPage) currentPage = 1;

        const queryNormalized = normalizeText(activeFilters.query);
        const queryTokens = queryNormalized.split(/\s+/).filter(t => t.length > 0);

        let activeFiltersCount = 0;
        const keys = Object.keys(activeFilters);
        keys.forEach(k => {
            if (k !== 'query' && activeFilters[k]) activeFiltersCount++;
        });

        filteredRecords = records.filter(rec => {
            // Text Search matching all tokens
            if (queryTokens.length > 0) {
                const matchAll = queryTokens.every(token => rec._searchString.includes(token));
                if (!matchAll) return false;
            }

            // Select Dropdown Filters
            if (activeFilters.category && rec.Categorie !== activeFilters.category) return false;
            if (activeFilters.birthPlace && rec.Geboorteplaats !== activeFilters.birthPlace) return false;
            if (activeFilters.birthCountry && rec.Geboorteland !== activeFilters.birthCountry) return false;
            if (activeFilters.residence && rec.Woonplaats !== activeFilters.residence) return false;
            if (activeFilters.occupation && rec.Beroep !== activeFilters.occupation) return false;
            if (activeFilters.deathPlace && rec.Overlijdensplaats !== activeFilters.deathPlace) return false;
            if (activeFilters.birthYear && rec._birthYearVal?.toString() !== activeFilters.birthYear.toString()) return false;

            return true;
        });

        // Perform sorting
        sortFilteredRecords();

        // Update stats
        document.getElementById('stats-results-count').textContent = formatNumber(filteredRecords.length);
        document.getElementById('stats-active-filters-count').textContent = formatNumber(activeFiltersCount);

        // Update chips list
        renderActiveChips(activeFiltersCount);

        // Render page
        renderPageResults();
    }

    // Sort records in memory
    function sortFilteredRecords() {
        if (currentSort === 'surname_asc') {
            filteredRecords.sort((a, b) => a.Familienaam.localeCompare(b.Familienaam));
        } else if (currentSort === 'surname_desc') {
            filteredRecords.sort((a, b) => b.Familienaam.localeCompare(a.Familienaam));
        } else if (currentSort === 'birth_asc') {
            filteredRecords.sort((a, b) => {
                if (!a.Geboortedatum) return 1;
                if (!b.Geboortedatum) return -1;
                return a.Geboortedatum.localeCompare(b.Geboortedatum);
            });
        } else if (currentSort === 'birth_desc') {
            filteredRecords.sort((a, b) => {
                if (!a.Geboortedatum) return 1;
                if (!b.Geboortedatum) return -1;
                return b.Geboortedatum.localeCompare(a.Geboortedatum);
            });
        } else if (currentSort === 'death_asc') {
            filteredRecords.sort((a, b) => {
                if (!a.Overlijdensdatum) return 1;
                if (!b.Overlijdensdatum) return -1;
                return a.Overlijdensdatum.localeCompare(b.Overlijdensdatum);
            });
        } else if (currentSort === 'death_desc') {
            filteredRecords.sort((a, b) => {
                if (!a.Overlijdensdatum) return 1;
                if (!b.Overlijdensdatum) return -1;
                return b.Overlijdensdatum.localeCompare(a.Overlijdensdatum);
            });
        }
    }

    // Render active filters as dismissible chips
    function renderActiveChips(filtersCount) {
        const chipsContainer = document.getElementById('active-filters-chips');
        if (!chipsContainer) return;

        // Remove old chips
        chipsContainer.querySelectorAll('.filter-chip').forEach(c => c.remove());

        if (filtersCount === 0) {
            chipsContainer.style.display = 'none';
            return;
        }

        chipsContainer.style.display = 'flex';
        const clearBtn = document.getElementById('btn-clear-filters');

        const labelMap = {
            category: t.filterLabelCategory,
            birthPlace: t.filterLabelBirthPlace,
            birthCountry: t.filterLabelBirthCountry,
            residence: t.filterLabelResidence,
            occupation: t.filterLabelOccupation,
            deathPlace: t.filterLabelDeathPlace,
            birthYear: t.filterLabelBirthYear
        };

        Object.keys(activeFilters).forEach(key => {
            const val = activeFilters[key];
            if (key !== 'query' && val) {
                const chip = document.createElement('div');
                chip.className = 'filter-chip';
                chip.innerHTML = `
                    <span>${labelMap[key]}: ${val}</span>
                    <button class="filter-chip-remove" data-key="${key}">&times;</button>
                `;
                
                chip.querySelector('.filter-chip-remove').addEventListener('click', (e) => {
                    const k = e.target.dataset.key;
                    activeFilters[k] = '';
                    setDropdownValue(k, '');
                    applyFilters();
                });
                
                chipsContainer.insertBefore(chip, clearBtn);
            }
        });
    }

    // Render cards slice on grid
    function renderPageResults() {
        const grid = document.getElementById('names-grid-results');
        const noResults = document.getElementById('no-results-view');
        const loadMoreBtn = document.getElementById('btn-load-more');
        const paginationPanel = document.getElementById('pagination-panel');

        if (currentPage === 1) {
            grid.innerHTML = '';
        }

        if (filteredRecords.length === 0) {
            grid.innerHTML = '';
            noResults.style.display = 'block';
            paginationPanel.style.display = 'none';
            return;
        }

        noResults.style.display = 'none';

        const startIndex = (currentPage - 1) * recordsPerPage;
        const endIndex = Math.min(currentPage * recordsPerPage, filteredRecords.length);
        const slice = filteredRecords.slice(startIndex, endIndex);

        slice.forEach(rec => {
            const card = document.createElement('div');
            card.className = 'memorial-card';
            
            // Format dates
            const dob = formatMemorialDate(rec.Geboortedatum, rec.Omschrijving_geboortedatum);
            const dod = formatMemorialDate(rec.Overlijdensdatum, rec.Omschrijving_overlijdensdatum);
            const birthInfo = rec.Geboorteplaats ? `${dob}, ${rec.Geboorteplaats}` : dob;
            const deathInfo = rec.Overlijdensplaats ? `${dod}, ${rec.Overlijdensplaats}` : dod;

            card.innerHTML = `
                <div>
                    <div class="card-header">
                        <h4 class="card-name">${rec.Familienaam}, ${rec.Voornaam}</h4>
                        <span class="card-category-badge">${rec.Categorie || t.unknown}</span>
                    </div>
                    <div class="card-details-list">
                        <div class="card-detail-item">
                            <span class="card-detail-label">${t.fields.Geboortedatum}:</span>
                            <span class="card-detail-value">${birthInfo}</span>
                        </div>
                        <div class="card-detail-item">
                            <span class="card-detail-label">${t.fields.Overlijdensdatum}:</span>
                            <span class="card-detail-value">${deathInfo}</span>
                        </div>
                        ${rec.Woonplaats ? `
                        <div class="card-detail-item">
                            <span class="card-detail-label">${t.fields.Woonplaats}:</span>
                            <span class="card-detail-value">${rec.Woonplaats}</span>
                        </div>` : ''}
                        ${rec.Beroep ? `
                        <div class="card-detail-item">
                            <span class="card-detail-label">${t.fields.Beroep}:</span>
                            <span class="card-detail-value">${rec.Beroep}</span>
                        </div>` : ''}
                    </div>
                </div>
                <div class="card-actions">
                    <button class="card-btn btn-view-rec" data-id="${rec.ID}">${t.viewDetails}</button>
                </div>
            `;

            grid.appendChild(card);
        });

        // Setup Card action detail modals
        grid.querySelectorAll('.btn-view-rec').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const recId = e.target.dataset.id;
                const rec = records.find(r => r.ID === recId);
                if (rec) openRecordModal(rec);
            });
        });

        // Show/hide Load More button
        if (endIndex >= filteredRecords.length) {
            paginationPanel.style.display = 'none';
        } else {
            paginationPanel.style.display = 'flex';
        }
    }

    // Reset filters state
    function resetFilters() {
        document.getElementById('db-search-input').value = '';
        activeFilters = {
            query: '',
            birthPlace: '',
            birthCountry: '',
            residence: '',
            occupation: '',
            deathPlace: '',
            category: '',
            birthYear: ''
        };

        const keys = Object.keys(activeFilters);
        keys.forEach(k => {
            if (k !== 'query') setDropdownValue(k, '');
        });

        applyFilters();
    }

    // Open detailed record view modal
    function openRecordModal(rec) {
        const overlay = document.getElementById('record-modal-overlay');
        const container = document.getElementById('record-modal-container');

        // Layout categorized grids, hiding empty or unassigned fields
        const makeFieldHTML = (key) => {
            const val = rec[key];
            if (!val || val === '0' || val === 'null' || val === 'undefined') return '';
            
            let displayVal = val;
            if (key === 'Geboortedatum') displayVal = formatMemorialDate(rec.Geboortedatum, rec.Omschrijving_geboortedatum);
            if (key === 'Overlijdensdatum') displayVal = formatMemorialDate(rec.Overlijdensdatum, rec.Omschrijving_overlijdensdatum);
            
            return `
                <div class="modal-field">
                    <span class="modal-field-label">${t.fields[key]}</span>
                    <span class="modal-field-value">${displayVal}</span>
                </div>
            `;
        };

        const personalHTML = [
            makeFieldHTML('Voornaam'),
            makeFieldHTML('Familienaam'),
            makeFieldHTML('Geboortedatum'),
            makeFieldHTML('Geboorteplaats'),
            makeFieldHTML('Geboorteland'),
            makeFieldHTML('Beroep'),
            makeFieldHTML('Huwelijkspartner')
        ].join('');

        const persecutionHTML = [
            makeFieldHTML('Woonplaats'),
            makeFieldHTML('Adres'),
            makeFieldHTML('Categorie'),
            makeFieldHTML('Dossin_PersonId'),
            makeFieldHTML('Verzetsbeweging'),
            makeFieldHTML('Legerinformatie')
        ].join('');

        const deathHTML = [
            makeFieldHTML('Overlijdensdatum'),
            makeFieldHTML('Overlijdensplaats'),
            makeFieldHTML('Overlijdensdetails'),
            makeFieldHTML('Begraafplaats')
        ].join('');

        const archiveHTML = [
            makeFieldHTML('ID'),
            makeFieldHTML('Inventarisnummer'),
            makeFieldHTML('Toegang'),
            makeFieldHTML('ExtraInformatie')
        ].join('');

        container.innerHTML = `
            <div class="modal-header">
                <div>
                    <h3 class="modal-title">${rec.Voornaam} ${rec.Familienaam}</h3>
                    <span class="card-category-badge" style="margin-top: 5px; display: inline-block;">
                        ${rec.Categorie || t.unknown}
                    </span>
                </div>
                <button class="modal-close-btn" id="btn-close-modal">&times;</button>
            </div>
            <div class="modal-body">
                ${personalHTML ? `
                <div class="modal-section">
                    <h4 class="modal-section-title">${t.modalSections.personal}</h4>
                    <div class="modal-grid">${personalHTML}</div>
                </div>` : ''}
                
                ${persecutionHTML ? `
                <div class="modal-section">
                    <h4 class="modal-section-title">${t.modalSections.persecution}</h4>
                    <div class="modal-grid">${persecutionHTML}</div>
                </div>` : ''}

                ${deathHTML ? `
                <div class="modal-section">
                    <h4 class="modal-section-title">${t.modalSections.death}</h4>
                    <div class="modal-grid">${deathHTML}</div>
                </div>` : ''}

                ${archiveHTML ? `
                <div class="modal-section">
                    <h4 class="modal-section-title">${t.modalSections.archive}</h4>
                    <div class="modal-grid">${archiveHTML}</div>
                </div>` : ''}
            </div>
            <div class="modal-footer">
                <p class="modal-source-text">${t.sourceAttribution}</p>
                <div style="display: flex; gap: 8px;">
                    <button class="modal-action-btn" id="btn-modal-copy-link" data-id="${rec.ID}">
                        <span>🔗</span> ${t.copyLinkBtn}
                    </button>
                    <button class="modal-action-btn" id="btn-modal-close">${t.closeModal}</button>
                </div>
            </div>
        `;

        overlay.classList.add('active');

        // Bind copy link and close buttons
        document.getElementById('btn-close-modal').addEventListener('click', closeModal);
        document.getElementById('btn-modal-close').addEventListener('click', closeModal);
        document.getElementById('btn-modal-copy-link').addEventListener('click', (e) => {
            const id = e.currentTarget.dataset.id;
            copyDirectLink(id);
        });

        // Set URL param so that it is shareable
        const newUrl = new URL(window.location.href);
        newUrl.searchParams.set('id', rec.ID);
        window.history.pushState({ path: newUrl.href }, '', newUrl.href);
    }

    function closeModal() {
        const overlay = document.getElementById('record-modal-overlay');
        overlay.classList.remove('active');
        
        // Remove URL param
        const newUrl = new URL(window.location.href);
        newUrl.searchParams.delete('id');
        window.history.pushState({ path: newUrl.href }, '', newUrl.href);
    }

    // Copy direct link to individual record
    function copyDirectLink(id) {
        const link = `${window.location.origin}${window.location.pathname}?id=${id}`;
        navigator.clipboard.writeText(link).then(() => {
            showToast(t.linkCopied);
        }).catch(err => {
            console.error("Failed to copy link: ", err);
        });
    }

    // Toast alerts helper
    function showToast(message) {
        const toast = document.getElementById('toast-notification');
        if (!toast) return;
        toast.textContent = message;
        toast.classList.add('active');
        setTimeout(() => {
            toast.classList.remove('active');
        }, 3000);
    }

    // Export current filtered results to CSV file
    function exportResultsToCSV() {
        if (filteredRecords.length === 0) return;

        // Build CSV columns (using same header order, ignoring internal fields)
        const csvHeaders = headers.filter(h => h !== '_birthYearVal' && h !== '_searchString');
        
        let csvContent = "\uFEFF"; // Add Byte Order Mark (BOM) to support UTF-8 characters in Excel
        csvContent += csvHeaders.join(',') + "\r\n";

        filteredRecords.forEach(rec => {
            const rowValues = csvHeaders.map(h => {
                let val = rec[h] || '';
                // Escape double quotes and wrap in quotes if contains comma, quote, or newline
                if (val.includes(',') || val.includes('"') || val.includes('\n') || val.includes('\r')) {
                    val = `"${val.replace(/"/g, '""')}"`;
                }
                return val;
            });
            csvContent += rowValues.join(',') + "\r\n";
        });

        // Create blob and link to download
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        
        link.setAttribute("href", url);
        link.setAttribute("download", `namenproject_antwerpen_export_${new Date().toISOString().slice(0,10)}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    // Boot Database loading
    loadData();
});
