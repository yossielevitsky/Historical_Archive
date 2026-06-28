/**
 * Jewish Antwerp Historical Archive - Heide Victims Database Controller
 */

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('heide-db-container');
    if (!container) return;

    const lang = document.documentElement.lang || 'en';

    // Inject styles
    const style = document.createElement('style');
    style.innerHTML = `
        #heide-db-container .search-input {
            width: 100%;
            padding: 0.75rem 1rem;
            padding-left: 2.5rem;
            background-color: var(--color-charcoal);
            border: 1px solid rgba(255, 255, 255, 0.15);
            border-radius: 6px;
            color: var(--color-text-main);
            font-size: 1rem;
            outline: none;
            transition: all 0.3s ease;
        }
        #heide-db-container .search-input:focus {
            border-color: var(--color-gold);
            box-shadow: 0 0 0 2px rgba(197, 160, 89, 0.2);
        }
        #heide-db-container .table-wrapper {
            overflow-x: auto;
            border: 1px solid #333;
            border-radius: 8px;
            margin-top: 1.5rem;
        }
        #heide-db-container .db-table {
            width: 100%;
            border-collapse: collapse;
            text-align: left;
            font-size: 0.95rem;
        }
        html[dir="rtl"] #heide-db-container .db-table {
            text-align: right;
        }
        #heide-db-container .db-table th {
            background-color: rgba(197, 160, 89, 0.1);
            color: var(--color-gold);
            font-family: var(--font-serif);
            padding: 1rem;
            border-bottom: 2px solid #333;
            font-weight: 600;
        }
        #heide-db-container .db-table td {
            padding: 1rem;
            border-bottom: 1px solid #2d2d2d;
            color: var(--color-text-main);
        }
        #heide-db-container .db-table tbody tr:nth-child(even) {
            background-color: rgba(255, 255, 255, 0.02);
        }
        #heide-db-container .db-table tbody tr:hover {
            background-color: rgba(197, 160, 89, 0.05);
        }
        #heide-db-container .reset-btn {
            padding: 0.5rem 1rem;
            border-radius: 6px;
            font-size: 0.9rem;
            border: 1px solid var(--color-gold);
            background-color: transparent;
            color: var(--color-gold);
            cursor: pointer;
            transition: all 0.2s ease;
        }
        #heide-db-container .reset-btn.active {
            background-color: var(--color-gold);
            color: var(--color-charcoal);
            font-weight: 600;
        }
        #heide-db-container .reset-btn:hover {
            background-color: rgba(197, 160, 89, 0.1);
        }
        #heide-db-container .reset-btn.active:hover {
            background-color: var(--color-gold);
        }
        #heide-db-container .badge {
            display: inline-block;
            padding: 0.25rem 0.5rem;
            border-radius: 4px;
            font-size: 0.75rem;
            font-weight: 600;
        }
        #heide-db-container .badge.badge-victim {
            background-color: rgba(160, 160, 160, 0.1);
            color: var(--color-text-muted);
            border: 1px solid rgba(160, 160, 160, 0.25);
        }
        #heide-db-container .badge.badge-survived {
            background-color: rgba(197, 160, 89, 0.12);
            color: var(--color-gold);
            border: 1px solid rgba(197, 160, 89, 0.25);
        }
        #heide-db-container .badge.badge-adult {
            background-color: rgba(255, 255, 255, 0.1);
            color: #eee;
            border: 1px solid rgba(255, 255, 255, 0.2);
        }
        #heide-db-container .badge.badge-child {
            background-color: rgba(52, 152, 219, 0.15);
            color: #3498db;
            border: 1px solid rgba(52, 152, 219, 0.3);
        }
    `;
    document.head.appendChild(style);

    const translations = {
        en: {
            searchPlaceholder: "Search by name, family, notes...",
            colFamily: "Family",
            colName: "Name",
            colAge: "Age at Deportation",
            colCategory: "Category",
            colNotes: "Notes / Status",
            statusAll: "All Records",
            statusVictims: "Deported / Victims",
            statusSurvived: "Survived",
            totalRecords: "records loaded",
            resultsFound: "records matching search",
            noResults: "No records found matching your query.",
            detailsTitle: "Victim Details",
            closeBtn: "Close",
            summaryText: "During the German occupation, 40 of the 230 registered Jewish residents of Heide (Kalmthout) were murdered in the Holocaust.",
            adult: "Adult",
            child: "Child",
            survived: "Survived",
            deceased: "Deceased"
        },
        nl: {
            searchPlaceholder: "Zoek op naam, familie, opmerkingen...",
            colFamily: "Familie",
            colName: "Naam",
            colAge: "Leeftijd bij deportatie",
            colCategory: "Categorie",
            colNotes: "Opmerkingen / Status",
            statusAll: "Alle registers",
            statusVictims: "Gedeporteerd / Slachtoffers",
            statusSurvived: "Overleefd",
            totalRecords: "registers geladen",
            resultsFound: "overeenkomstige registers",
            noResults: "Geen registers gevonden die voldoen aan uw zoekopdracht.",
            detailsTitle: "Details slachtoffer",
            closeBtn: "Sluiten",
            summaryText: "Tijdens de Duitse bezetting werden 40 van de 230 ingeschreven joodse inwoners van Heide (Kalmthout) vermoord in de Holocaust.",
            adult: "Volwassene",
            child: "Kind",
            survived: "Overleefd",
            deceased: "Overleden"
        },
        fr: {
            searchPlaceholder: "Rechercher par nom, famille, notes...",
            colFamily: "Famille",
            colName: "Nom",
            colAge: "Âge lors de la déportation",
            colCategory: "Catégorie",
            colNotes: "Notes / Statut",
            statusAll: "Tous les dossiers",
            statusVictims: "Déportés / Victimes",
            statusSurvived: "Survivants",
            totalRecords: "dossiers chargés",
            resultsFound: "dossiers correspondants",
            noResults: "Aucun dossier ne correspond à votre recherche.",
            detailsTitle: "Détails de la victime",
            closeBtn: "Fermer",
            summaryText: "Pendant l'occupation allemande, 40 des 230 résidents juifs enregistrés à Heide (Kalmthout) ont été assassinés pendant la Shoah.",
            adult: "Adulte",
            child: "Enfant",
            survived: "Survivant",
            deceased: "Décédé"
        },
        he: {
            searchPlaceholder: "חפש לפי שם, משפחה, הערות...",
            colFamily: "משפחה",
            colName: "שם",
            colAge: "גיל בעת הגירוש",
            colCategory: "קטגוריה",
            colNotes: "הערות / סטטוס",
            statusAll: "כל הרשומות",
            statusVictims: "גורשו / קורבנות",
            statusSurvived: "שרדו",
            totalRecords: "רשומות נטענו",
            resultsFound: "רשומות תואמות לחיפוש",
            noResults: "לא נמצאו רשומות המתאימות לחיפוש שלך.",
            detailsTitle: "פרטי הקורבן",
            closeBtn: "סגור",
            summaryText: "במהלך הכיבוש הגרמני, 40 מתוך 230 התושבים היהודים שהיו רשומים בהיידה (קלמטהוט) נרצחו בשואה.",
            adult: "מבוגר",
            child: "ילד",
            survived: "שרד",
            deceased: "נרצח/ה"
        }
    };

    const t = translations[lang] || translations.en;

    // Simple CSV parser
    function parseCSV(text) {
        const result = [];
        let row = [];
        let insideQuote = false;
        let entry = '';
        
        for (let i = 0; i < text.length; i++) {
            const char = text[i];
            const nextChar = text[i + 1];
            
            if (char === '"') {
                if (insideQuote && nextChar === '"') {
                    entry += '"';
                    i++;
                } else {
                    insideQuote = !insideQuote;
                }
            } else if (char === ',' && !insideQuote) {
                row.push(entry);
                entry = '';
            } else if ((char === '\n' || char === '\r') && !insideQuote) {
                if (char === '\r' && nextChar === '\n') {
                    i++;
                }
                row.push(entry);
                result.push(row);
                row = [];
                entry = '';
            } else {
                entry += char;
            }
        }
        
        if (row.length > 0 || entry !== '') {
            row.push(entry);
            result.push(row);
        }
        return result;
    }

    // Determine path to heide_victims.csv
    let csvPath = '../heide_victims.csv';
    if (window.location.pathname.includes('/nl/') || window.location.pathname.includes('/fr/') || window.location.pathname.includes('/he/')) {
        csvPath = '../../heide_victims.csv';
    }

    let headers = [];
    let records = [];
    let filteredRecords = [];
    let currentFilter = 'all'; // 'all', 'victims', 'survived'
    let searchQuery = '';

    // Load CSV
    async function loadHeideDatabase() {
        try {
            const response = await fetch(csvPath);
            if (!response.ok) throw new Error(`HTTP error ${response.status}`);
            
            const text = await response.text();
            const parsed = parseCSV(text);
            
            if (parsed.length > 1) {
                headers = parsed[0].map(h => h.trim());
                const rawRows = parsed.slice(1);
                
                const headerIndices = {};
                headers.forEach((h, idx) => {
                    headerIndices[h] = idx;
                });

                records = rawRows.filter(row => row.length > 0 && row[0] !== '').map(row => {
                    if (row.length < headers.length) {
                        row = row.concat(new Array(headers.length - row.length).fill(''));
                    } else if (row.length > headers.length) {
                        row = row.slice(0, headers.length);
                    }
                    
                    return {
                        Family: row[headerIndices['Family']] || '',
                        FirstName: row[headerIndices['First Name']] || '',
                        LastName: row[headerIndices['Last Name']] || '',
                        Age: row[headerIndices['Age at Deportation']] || '',
                        Category: row[headerIndices['Category']] || '',
                        Notes: row[headerIndices['Notes']] || ''
                    };
                });

                filteredRecords = [...records];
                renderInterface();
                filterRecords();
            }
        } catch (err) {
            console.error("Failed to load heide_victims.csv:", err);
            container.innerHTML = `
                <div style="text-align: center; padding: 2rem; color: #ff6b6b; border: 1px dashed #ff6b6b; border-radius: 8px;">
                    Error loading database records.
                </div>
            `;
        }
    }

    // Filter & search records
    function filterRecords() {
        filteredRecords = records.filter(rec => {
            // Filter by query
            const nameSearch = (rec.FirstName + ' ' + rec.LastName).toLowerCase();
            const matchQuery = !searchQuery || 
                nameSearch.includes(searchQuery) ||
                rec.Family.toLowerCase().includes(searchQuery) ||
                rec.Notes.toLowerCase().includes(searchQuery);
            
            // Filter by status badge
            let matchStatus = true;
            const isSurvived = rec.Notes.toLowerCase().includes('survived');
            if (currentFilter === 'survived') {
                matchStatus = isSurvived;
            } else if (currentFilter === 'victims') {
                matchStatus = !isSurvived;
            }

            return matchQuery && matchStatus;
        });

        renderTableBody();
        updateCountLabel();
    }

    // Render entire interface
    function renderInterface() {
        container.innerHTML = `
            <div class="search-bar-container" style="display: flex; flex-direction: column; gap: 1rem; margin-bottom: 1.5rem;">
                <div style="display: flex; gap: 1rem; width: 100%; flex-wrap: wrap;">
                    <div style="position: relative; flex: 1; min-width: 280px;">
                        <input type="text" id="heide-search" class="search-input" placeholder="${t.searchPlaceholder}" style="width: 100%; box-sizing: border-box;">
                    </div>
                    <div class="filter-buttons" style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
                        <button class="reset-btn active" data-filter="all" id="btn-filter-all">${t.statusAll}</button>
                        <button class="reset-btn" data-filter="victims" id="btn-filter-victims">${t.statusVictims}</button>
                        <button class="reset-btn" data-filter="survived" id="btn-filter-survived">${t.statusSurvived}</button>
                    </div>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.9rem; color: var(--color-text-muted); flex-wrap: wrap; gap: 0.5rem;">
                    <span id="records-count">${records.length} ${t.totalRecords}</span>
                </div>
            </div>
            
            <div class="table-wrapper">
                <table class="db-table">
                    <thead>
                        <tr>
                            <th style="width: 20%;">${t.colFamily}</th>
                            <th style="width: 30%;">${t.colName}</th>
                            <th style="width: 15%;">${t.colAge}</th>
                            <th style="width: 15%;">${t.colCategory}</th>
                            <th style="width: 20%;">${t.colNotes}</th>
                        </tr>
                    </thead>
                    <tbody id="heide-table-body">
                        <!-- Table rows inserted dynamically -->
                    </tbody>
                </table>
            </div>
        `;

        // Wire events
        const searchInput = document.getElementById('heide-search');
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value.toLowerCase().trim();
            filterRecords();
        });

        // Filter button clicks
        const filterBtns = document.querySelectorAll('.filter-buttons button');
        filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                currentFilter = btn.getAttribute('data-filter');
                filterRecords();
            });
        });
    }

    function renderTableBody() {
        const tbody = document.getElementById('heide-table-body');
        if (!tbody) return;

        if (filteredRecords.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="5" style="text-align: center; padding: 2rem; color: var(--color-text-muted);">
                        ${t.noResults}
                    </td>
                </tr>
            `;
            return;
        }

        tbody.innerHTML = filteredRecords.map(rec => {
            const isSurvived = rec.Notes.toLowerCase().includes('survived');
            const statusBadgeClass = isSurvived ? 'badge-survived' : 'badge-victim';
            const statusText = isSurvived ? t.survived : t.deceased;
            
            const categoryBadgeClass = rec.Category.toLowerCase() === 'child' ? 'badge-child' : 'badge-adult';
            const categoryText = rec.Category.toLowerCase() === 'child' ? t.child : t.adult;

            const localizedNotes = rec.Notes
                .replace('Father', lang === 'he' ? 'אב' : lang === 'nl' ? 'Vader' : lang === 'fr' ? 'Père' : 'Father')
                .replace('Mother', lang === 'he' ? 'אם' : lang === 'nl' ? 'Moeder' : lang === 'fr' ? 'Mère' : 'Mother')
                .replace('Daughter of Helene', lang === 'he' ? 'בתה של הלן' : lang === 'nl' ? 'Dochter van Helene' : lang === 'fr' ? 'Fille d\'Helene' : 'Daughter of Helene')
                .replace('Daughter of David', lang === 'he' ? 'בתו של דוד' : lang === 'nl' ? 'Dochter van David' : lang === 'fr' ? 'Fille de David' : 'Daughter of David')
                .replace('Daughter', lang === 'he' ? 'בת' : lang === 'nl' ? 'Dochter' : lang === 'fr' ? 'Fille' : 'Daughter')
                .replace('Son', lang === 'he' ? 'בן' : lang === 'nl' ? 'Zoon' : lang === 'fr' ? 'Fils' : 'Son')
                .replace('Survived Holocaust (page updated 2024)', lang === 'he' ? 'שרד/ה את השואה (עודכן ב-2024)' : lang === 'nl' ? 'Overleefde Holocaust (bijgewerkt 2024)' : lang === 'fr' ? 'A survécu à la Shoah (mis à jour en 2024)' : 'Survived Holocaust (page updated 2024)');

            return `
                <tr>
                    <td style="font-weight: 500;">${rec.Family}</td>
                    <td>${rec.FirstName} ${rec.LastName}</td>
                    <td>${rec.Age || '-'}</td>
                    <td><span class="badge ${categoryBadgeClass}">${categoryText}</span></td>
                    <td>
                        <span class="badge ${statusBadgeClass}">${statusText}</span>
                        ${localizedNotes ? `<div style="font-size: 0.85rem; color: var(--color-text-muted); margin-top: 4px;">${localizedNotes}</div>` : ''}
                    </td>
                </tr>
            `;
        }).join('');
    }

    function updateCountLabel() {
        const label = document.getElementById('records-count');
        if (!label) return;
        label.textContent = `${filteredRecords.length} ${t.resultsFound} (${records.length} ${t.totalRecords})`;
    }

    // Trigger load
    loadHeideDatabase();
});
