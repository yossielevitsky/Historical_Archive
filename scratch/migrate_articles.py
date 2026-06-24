import os
import re
import shutil

WORKSPACE_DIR = r"c:\Users\Admin\Documents\joods antwerp"

ARTICLE_FILENAMES = [
    "1980-terrorist-attack.html",
    "1981-synagogue-bombing.html",
    "cuba-connection.html",
    "chida-journey-antwerp-belgium.html",
    "sholem-aleichem-motl.html"
]

LANGUAGES = ["en", "nl", "fr", "he"]

def main():
    # 1. Create target directories if they don't exist
    for lang in LANGUAGES:
        if lang == "en":
            target_dir = os.path.join(WORKSPACE_DIR, "articles")
        else:
            target_dir = os.path.join(WORKSPACE_DIR, lang, "articles")
        os.makedirs(target_dir, exist_ok=True)
        print(f"Ensured folder exists: {target_dir}")

    # 2. Move files and update breadcrumbs & nav
    for filename in ARTICLE_FILENAMES:
        for lang in LANGUAGES:
            if lang == "en":
                src_path = os.path.join(WORKSPACE_DIR, "history", filename)
                dst_path = os.path.join(WORKSPACE_DIR, "articles", filename)
            else:
                src_path = os.path.join(WORKSPACE_DIR, lang, "history", filename)
                dst_path = os.path.join(WORKSPACE_DIR, lang, "articles", filename)

            if os.path.exists(src_path):
                # Read content
                with open(src_path, "r", encoding="utf-8") as f:
                    content = f.read()

                # Update breadcrumbs and active classes
                # English
                if lang == "en":
                    # Breadcrumbs: Home -> History -> [Name]  ===>  Home -> Articles -> [Name]
                    content = content.replace(
                        '<a href="../history.html" class="breadcrumb-link">History</a>',
                        '<a href="../articles.html" class="breadcrumb-link">Articles</a>'
                    )
                    # Nav menu active status:
                    # Remove active class from History
                    content = content.replace(
                        '<li><a href="../history.html" class="active">Full History</a></li>',
                        '<li><a href="../history.html">Full History</a></li>'
                    )
                    # Add active class to Articles
                    content = content.replace(
                        '<li><a href="../articles.html">Articles</a></li>',
                        '<li><a href="../articles.html" class="active">Articles</a></li>'
                    )

                # Dutch
                elif lang == "nl":
                    content = content.replace(
                        '<a href="../history.html" class="breadcrumb-link">Geschiedenis</a>',
                        '<a href="../articles.html" class="breadcrumb-link">Artikelen</a>'
                    )
                    content = content.replace(
                        '<li><a href="../history.html" class="active">Volledige geschiedenis</a></li>',
                        '<li><a href="../history.html">Volledige geschiedenis</a></li>'
                    )
                    content = content.replace(
                        '<li><a href="../articles.html">Artikelen</a></li>',
                        '<li><a href="../articles.html" class="active">Artikelen</a></li>'
                    )

                # French
                elif lang == "fr":
                    content = content.replace(
                        '<a href="../history.html" class="breadcrumb-link">Histoire</a>',
                        '<a href="../articles.html" class="breadcrumb-link">Articles</a>'
                    )
                    content = content.replace(
                        '<li><a href="../history.html" class="active">Histoire complète</a></li>',
                        '<li><a href="../history.html">Histoire complète</a></li>'
                    )
                    content = content.replace(
                        '<li><a href="../articles.html">Articles</a></li>',
                        '<li><a href="../articles.html" class="active">Articles</a></li>'
                    )

                # Hebrew
                elif lang == "he":
                    content = content.replace(
                        '<a href="../history.html" class="breadcrumb-link">הִיסטוֹרִיָה</a>',
                        '<a href="../articles.html" class="breadcrumb-link">מאמרים</a>'
                    )
                    content = content.replace(
                        '<li><a href="../history.html" class="active">היסטוריה מלאה</a></li>',
                        '<li><a href="../history.html">היסטוריה מלאה</a></li>'
                    )
                    content = content.replace(
                        '<li><a href="../articles.html">מאמרים</a></li>',
                        '<li><a href="../articles.html" class="active">מאמרים</a></li>'
                    )

                # Write to new destination
                with open(dst_path, "w", encoding="utf-8") as f:
                    f.write(content)
                print(f"Moved and updated: {src_path} -> {dst_path}")

                # Delete the old file
                os.remove(src_path)
                print(f"Deleted old file: {src_path}")
            else:
                print(f"Source file not found (skipping): {src_path}")

    # 3. Update references in index.html, articles.html, history.html (and localized folders)
    # Walk and replace 'history/[filename]' with 'articles/[filename]'
    # (except for period pages which remain in history)
    # Also update js/nav.js
    
    replace_patterns = []
    for filename in ARTICLE_FILENAMES:
        replace_patterns.append((f"history/{filename}", f"articles/{filename}"))
        # Also handle potential url-encoded or backslash paths in js or other files
        replace_patterns.append((f"history\\/{filename}", f"articles\\/{filename}"))

    target_files = [
        # Root files
        "index.html",
        "articles.html",
        "history.html",
        "js/nav.js",
        # Dutch
        "nl/index.html",
        "nl/articles.html",
        "nl/history.html",
        # French
        "fr/index.html",
        "fr/articles.html",
        "fr/history.html",
        # Hebrew
        "he/index.html",
        "he/articles.html",
        "he/history.html"
    ]

    for rel_path in target_files:
        full_path = os.path.join(WORKSPACE_DIR, rel_path.replace("/", os.sep))
        if os.path.exists(full_path):
            with open(full_path, "r", encoding="utf-8") as f:
                content = f.read()

            modified = False
            for old_pat, new_pat in replace_patterns:
                if old_pat in content:
                    content = content.replace(old_pat, new_pat)
                    modified = True
            
            if modified:
                with open(full_path, "w", encoding="utf-8") as f:
                    f.write(content)
                print(f"Updated links in: {full_path}")
            else:
                print(f"No link updates needed in: {full_path}")
        else:
            print(f"Target file not found: {full_path}")

if __name__ == "__main__":
    main()
