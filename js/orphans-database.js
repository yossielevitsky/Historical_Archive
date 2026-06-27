/**
 * Jewish Antwerp Historical Archive - Orphans Database Controller
 * Lightweight Search & Research Engine for the Orphanages Overview Page
 */

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('orphans-db-container');
    if (!container) return;

    // Detect language of the page (default: en)
    const lang = document.documentElement.lang || 'en';

    // Translations Dictionary
    const translations = {
        en: {
            searchPlaceholder: "Search by fate, address, or historical context...",
            colId: "Record ID",
            colName: "Name",
            colFate: "Fate / Status",
            colAddress: "Last Known Address",
            colNotes: "Historical Context & Source",
            statusAll: "All Records",
            statusSurvived: "Survived",
            statusDeported: "Deported / Victim",
            totalRecords: "children records loaded",
            resultsFound: "records matching search",
            noResults: "No records found matching your query.",
            detailsTitle: "Child Record Details",
            closeBtn: "Close",
            unnamedChild: "Unnamed Child (Girls' Home)",
            inventaris: "Inventory Number",
            category: "Category",
            detailsLabel: "Biographical details & citations:"
        },
        nl: {
            searchPlaceholder: "Zoek op status, adres of historische context...",
            colId: "Record-ID",
            colName: "Naam",
            colFate: "Status / Lot",
            colAddress: "Laatst bekende adres",
            colNotes: "Historische context & Bron",
            statusAll: "Alle registers",
            statusSurvived: "Overleefd",
            statusDeported: "Gedeporteerd / Slachtoffer",
            totalRecords: "kinderregisters geladen",
            resultsFound: "overeenkomstige registers",
            noResults: "Geen registers gevonden die voldoen aan uw zoekopdracht.",
            detailsTitle: "Details kinderregister",
            closeBtn: "Sluiten",
            unnamedChild: "Onbekend Kind (Meisjeshuis)",
            inventaris: "Inventarisnummer",
            category: "Categorie",
            detailsLabel: "Biografische gegevens & citaten:"
        },
        fr: {
            searchPlaceholder: "Rechercher par statut, adresse ou contexte...",
            colId: "ID du dossier",
            colName: "Nom",
            colFate: "Statut / Destin",
            colAddress: "Dernière adresse connue",
            colNotes: "Contexte historique & Source",
            statusAll: "Tous les dossiers",
            statusSurvived: "Survivant",
            statusDeported: "Déporté / Victime",
            totalRecords: "dossiers d'enfants chargés",
            resultsFound: "dossiers correspondants",
            noResults: "Aucun dossier ne correspond à votre recherche.",
            detailsTitle: "Détails du dossier de l'enfant",
            closeBtn: "Fermer",
            unnamedChild: "Enfant non nommé (Foyer pour filles)",
            inventaris: "Numéro d'inventaire",
            category: "Catégorie",
            detailsLabel: "Détails biographiques & citations:"
        },
        he: {
            searchPlaceholder: "חפש לפי גורל, כתובת או הערות היסטוריות...",
            colId: "מזהה רשומה",
            colName: "שם",
            colFate: "גורל / סטטוס",
            colAddress: "כתובת אחרונה ידועה",
            colNotes: "הקשר היסטורי ומקור",
            statusSurvived: "שרד/ה",
            statusDeported: "גורש/ה / קורבן",
            totalRecords: "רשומות ילדים נטענו",
            resultsFound: "רשומות תואמות לחיפוש",
            noResults: "לא נמצאו רשומות המתאימות לחיפוש שלך.",
            detailsTitle: "פרטי רשומת הילד/ה",
            closeBtn: "סגור",
            unnamedChild: "ילדה ללא שם (בית הבנות)",
            inventaris: "מספר ארכיון",
            category: "קטגוריה",
            detailsLabel: "פרטים ביוגרפיים ומקורות:"
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

    // Determine path to names-orphans.csv
    let csvPath = '../names-orphans.csv';
    if (window.location.pathname.includes('/nl/') || window.location.pathname.includes('/fr/') || window.location.pathname.includes('/he/')) {
        csvPath = '../../names-orphans.csv';
    }

    let headers = [];
    let records = [];
    let filteredRecords = [];
    let currentFilter = 'all'; // 'all', 'survived', 'deported'
    let searchQuery = '';

    // Load CSV
    async function loadOrphansDatabase() {
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

                records = rawRows.map(row => {
                    // Match length
                    if (row.length < headers.length) {
                        row = row.concat(new Array(headers.length - row.length).fill(''));
                    } else if (row.length > headers.length) {
                        row = row.slice(0, headers.length);
                    }
                    
                    const rec = {};
                    headers.forEach(h => {
                        rec[h] = row[headerIndices[h]] ? row[headerIndices[h]].trim() : '';
                    });
                    return rec;
                });

                filteredRecords = [...records];
                renderInterface();
            }
        } catch (err) {
            console.error("Failed to load names-orphans.csv:", err);
            container.innerHTML = `
                <div style="text-align: center; padding: 2rem; color: #ff6b6b; border: 1px dashed #ff6b6b; border-radius: 8px;">
                    Error loading children database records.
                </div>
            `;
        }
    }

    // Filter & search records
    function filterRecords() {
        filteredRecords = records.filter(rec => {
            // Filter by query
            const matchQuery = !searchQuery || 
                (rec.ID && rec.ID.toLowerCase().includes(searchQuery)) ||
                (rec.ExtraInformatie && rec.ExtraInformatie.toLowerCase().includes(searchQuery)) ||
                (rec.Overlijdensdetails && rec.Overlijdensdetails.toLowerCase().includes(searchQuery)) ||
                (rec.Adres && rec.Adres.toLowerCase().includes(searchQuery));
            
            // Filter by status badge
            let matchStatus = true;
            if (currentFilter === 'survived') {
                matchStatus = rec.Overlijdensdetails && rec.Overlijdensdetails.includes("Overleefde");
            } else if (currentFilter === 'deported') {
                matchStatus = rec.Overlijdensdetails && (rec.Overlijdensdetails.includes("Gedeporteerd") || rec.Overlijdensdetails.includes("Omgekomen"));
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
                        <input type="text" id="orphans-search" class="search-input" placeholder="${t.searchPlaceholder}" style="width: 100%; box-sizing: border-box; padding-left: 2.5rem;">
                    </div>
                    <div class="filter-buttons" style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
                        <button class="reset-btn active" data-filter="all" id="btn-filter-all" style="padding: 0.5rem 1rem; border-radius: 6px; font-size: 0.9rem;">${t.statusAll}</button>
                        <button class="reset-btn" data-filter="survived" id="btn-filter-survived" style="padding: 0.5rem 1rem; border-radius: 6px; font-size: 0.9rem;">${t.statusSurvived}</button>
                        <button class="reset-btn" data-filter="deported" id="btn-filter-deported" style="padding: 0.5rem 1rem; border-radius: 6px; font-size: 0.9rem;">${t.statusDeported}</button>
                    </div>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.9rem; color: var(--color-text-muted);">
                    <span id="records-count">${records.length} ${t.totalRecords}</span>
                </div>
            </div>
            
            <div class="table-wrapper">
                <table class="db-table">
                    <thead>
                        <tr>
                            <th style="width: 12%;">${t.colId}</th>
                            <th style="width: 25%;">${t.colName}</th>
                            <th style="width: 20%;">${t.colFate}</th>
                            <th style="width: 25%;">${t.colAddress}</th>
                            <th style="width: 18%;">${t.colNotes}</th>
                        </tr>
                    </thead>
                    <tbody id="orphans-table-body">
                        <!-- Table rows inserted dynamically -->
                    </tbody>
                </table>
            </div>

            <!-- Modal for Detail View -->
            <div id="orphans-modal" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); z-index: 1000; justify-content: center; align-items: center; padding: 1rem; box-sizing: border-box;">
                <div style="background: var(--color-charcoal); border: 1px solid var(--color-slate); padding: 2rem; border-radius: 12px; max-width: 600px; width: 100%; position: relative; box-shadow: 0 4px 20px rgba(0,0,0,0.5); box-sizing: border-box; text-align: ${lang === 'he' ? 'right' : 'left'};" dir="${lang === 'he' ? 'rtl' : 'ltr'}">
                    <h3 id="modal-title" style="font-family: var(--font-serif); color: var(--color-gold); margin-top: 0; margin-bottom: 1.5rem; font-size: 1.5rem; border-bottom: 1px solid #333; padding-bottom: 0.5rem;">${t.detailsTitle}</h3>
                    <div id="modal-content" style="color: var(--color-text-main); font-size: 1rem; line-height: 1.6; margin-bottom: 2rem;"></div>
                    <div style="text-align: ${lang === 'he' ? 'left' : 'right'};">
                        <button id="modal-close" class="reset-btn">${t.closeBtn}</button>
                    </div>
                </div>
            </div>
        `;

        // Wire events
        const searchInput = document.getElementById('orphans-search');
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
                
                // Style adjustment for visual active state
                filterBtns.forEach(b => {
                    b.style.backgroundColor = 'transparent';
                    b.style.color = 'var(--color-gold)';
                });
                btn.style.backgroundColor = 'var(--color-gold)';
                btn.style.color = 'var(--color-charcoal)';

                currentFilter = btn.getAttribute('data-filter');
                filterRecords();
            });
        });

        // Initialize button styling
        const initialActiveBtn = document.getElementById('btn-filter-all');
        if (initialActiveBtn) {
            initialActiveBtn.style.backgroundColor = 'var(--color-gold)';
            initialActiveBtn.style.color = 'var(--color-charcoal)';
        }

        // Close modal event
        const modal = document.getElementById('orphans-modal');
        const modalClose = document.getElementById('modal-close');
        modalClose.addEventListener('click', () => {
            modal.style.display = 'none';
        });
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });

        renderTableBody();
        updateCountLabel();
    }

    // Render table rows
    function renderTableBody() {
        const tbody = document.getElementById('orphans-table-body');
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
            // Determine status badge style
            let badgeStyle = '';
            let localizedStatus = rec.Overlijdensdetails;
            if (rec.Overlijdensdetails && rec.Overlijdensdetails.includes("Overleefde")) {
                badgeStyle = 'background-color: rgba(46, 117, 89, 0.2); color: #52c48a; border: 1px solid rgba(46, 117, 89, 0.4);';
                localizedStatus = t.statusSurvived;
            } else {
                badgeStyle = 'background-color: rgba(224, 86, 86, 0.2); color: #ff6b6b; border: 1px solid rgba(224, 86, 86, 0.4);';
                localizedStatus = t.statusDeported;
            }

            // Excerpt of extra info
            const excerpt = rec.ExtraInformatie && rec.ExtraInformatie.length > 60 
                ? rec.ExtraInformatie.substring(0, 60) + '...'
                : rec.ExtraInformatie;

            return `
                <tr class="db-row" data-id="${rec.ID}" style="cursor: pointer;">
                    <td><strong style="color: var(--color-gold); font-size: 0.9rem;">#${rec.ID}</strong></td>
                    <td>${t.unnamedChild}</td>
                    <td>
                        <span class="badge" style="${badgeStyle}">${localizedStatus}</span>
                    </td>
                    <td>${rec.Adres || t.unnamedChild}</td>
                    <td style="color: var(--color-text-muted); font-size: 0.85rem; max-width: 250px;">
                        ${excerpt} <span style="color: var(--color-gold); font-weight: 500; font-size: 0.8rem; text-decoration: underline; white-space: nowrap; margin-left: 0.25rem;">→</span>
                    </td>
                </tr>
            `;
        }).join('');

        // Wire row click event to show modal
        const rows = tbody.querySelectorAll('.db-row');
        rows.forEach(row => {
            row.addEventListener('click', () => {
                const id = row.getAttribute('data-id');
                const rec = records.find(r => r.ID === id);
                if (rec) {
                    showRecordModal(rec);
                }
            });
        });
    }

    // Update count label
    function updateCountLabel() {
        const countLabel = document.getElementById('records-count');
        if (!countLabel) return;
        
        if (searchQuery || currentFilter !== 'all') {
            countLabel.textContent = `${filteredRecords.length} ${t.resultsFound} (of ${records.length} ${t.totalRecords})`;
        } else {
            countLabel.textContent = `${records.length} ${t.totalRecords}`;
        }
    }

    // Show details in modal
    function showRecordModal(rec) {
        const modal = document.getElementById('orphans-modal');
        const content = document.getElementById('modal-content');
        if (!modal || !content) return;

        let badgeStyle = '';
        let localizedStatus = rec.Overlijdensdetails;
        if (rec.Overlijdensdetails && rec.Overlijdensdetails.includes("Overleefde")) {
            badgeStyle = 'background-color: rgba(46, 117, 89, 0.2); color: #52c48a; border: 1px solid rgba(46, 117, 89, 0.4);';
            localizedStatus = t.statusSurvived;
        } else {
            badgeStyle = 'background-color: rgba(224, 86, 86, 0.2); color: #ff6b6b; border: 1px solid rgba(224, 86, 86, 0.4);';
            localizedStatus = t.statusDeported;
        }

        content.innerHTML = `
            <div style="margin-bottom: 1.5rem; display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; border-bottom: 1px solid #333; padding-bottom: 1rem;">
                <div>
                    <strong style="color: var(--color-gold); font-size: 0.85rem; display: block; text-transform: uppercase;">${t.colId}</strong>
                    <span style="font-size: 1.1rem; font-weight: 600;">#${rec.ID}</span>
                </div>
                <div>
                    <strong style="color: var(--color-gold); font-size: 0.85rem; display: block; text-transform: uppercase;">${t.colFate}</strong>
                    <span class="badge" style="${badgeStyle} margin-top: 0.25rem;">${localizedStatus}</span>
                </div>
            </div>
            
            <div style="margin-bottom: 1.5rem; display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; border-bottom: 1px solid #333; padding-bottom: 1rem;">
                <div>
                    <strong style="color: var(--color-gold); font-size: 0.85rem; display: block; text-transform: uppercase;">${t.colName}</strong>
                    <span>${t.unnamedChild}</span>
                </div>
                <div>
                    <strong style="color: var(--color-gold); font-size: 0.85rem; display: block; text-transform: uppercase;">${t.colAddress}</strong>
                    <span>${rec.Adres}</span>
                </div>
            </div>

            <div style="margin-bottom: 1.5rem; display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; border-bottom: 1px solid #333; padding-bottom: 1rem;">
                <div>
                    <strong style="color: var(--color-gold); font-size: 0.85rem; display: block; text-transform: uppercase;">${t.inventaris}</strong>
                    <span>${rec.Inventarisnummer}</span>
                </div>
                <div>
                    <strong style="color: var(--color-gold); font-size: 0.85rem; display: block; text-transform: uppercase;">${t.category}</strong>
                    <span>${rec.Categorie}</span>
                </div>
            </div>
            
            <div style="margin-top: 1rem;">
                <strong style="color: var(--color-gold); font-size: 0.85rem; display: block; text-transform: uppercase; margin-bottom: 0.5rem;">${t.detailsLabel}</strong>
                <p style="background: rgba(0,0,0,0.3); border: 1px solid #333; padding: 1rem; border-radius: 6px; font-size: 0.95rem; margin: 0; line-height: 1.6;">
                    ${rec.ExtraInformatie}
                </p>
            </div>
        `;

        modal.style.display = 'flex';
    }

    loadOrphansDatabase();
});
