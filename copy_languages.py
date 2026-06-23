import os
import shutil
import re

languages = ['nl', 'fr', 'he']
excluded_files = {
    "template_article.html",
    "template_event.html",
    "template_profile.html",
    "template_synagogue.html",
    "template_place.html",
    "generic-synagogue.html",
    "copy_languages.py",
    "generate_sitemap.py",
    "sitemap.xml",
    "sitemap.txt",
    "robots.txt",
    "names.html",
}
excluded_dirs = {
    ".git",
    "css",
    "js",
    "images",
    "english",
    "french",
    "hebrew",
    "nl",
    "fr",
    "he",
}

def adjust_content(content, lang, rel_path):
    # Adjust lang attribute in html tag (and direction for Hebrew RTL)
    if lang == 'he':
        content = re.sub(r'<html\s+lang="[^"]*"', '<html lang="he" dir="rtl"', content)
    else:
        content = re.sub(r'<html\s+lang="[^"]*"', f'<html lang="{lang}"', content)

    # Adjust asset links: prepend ../ to paths starting with css/, js/, images/, favicon.svg
    # Replacing these strings adjusts the relative path level correctly for any depth.
    content = content.replace('css/', '../css/')
    content = content.replace('js/', '../js/')
    content = content.replace('images/', '../images/')
    content = content.replace('favicon.svg', '../favicon.svg')
    
    return content

def main():
    # Gather html files
    html_files = []
    for root, dirs, files in os.walk("."):
        parts = root.split(os.sep)
        # Skip excluded directories and hidden ones
        if any(part in excluded_dirs or part.startswith('.') and part not in ('.', '..') for part in parts):
            continue
        for file in files:
            if file.endswith(".html") and file not in excluded_files:
                full_path = os.path.join(root, file)
                rel_path = os.path.relpath(full_path, ".")
                html_files.append((rel_path, full_path))

    for lang in languages:
        print(f"Creating files for language: {lang}")
        for rel_path, full_path in html_files:
            dest_path = os.path.join(lang, rel_path)
            dest_dir = os.path.dirname(dest_path)
            if dest_dir:
                os.makedirs(dest_dir, exist_ok=True)
            
            with open(full_path, "r", encoding="utf-8") as f:
                content = f.read()
            
            adjusted = adjust_content(content, lang, rel_path)
            
            with open(dest_path, "w", encoding="utf-8") as f:
                f.write(adjusted)
            print(f"  Copied and adjusted: {rel_path} -> {dest_path}")

    # Remove empty old directories
    for old_dir in ["english", "french", "hebrew"]:
        if os.path.exists(old_dir):
            try:
                shutil.rmtree(old_dir)
                print(f"Removed old empty directory: {old_dir}")
            except Exception as e:
                print(f"Could not remove old directory {old_dir}: {e}")

if __name__ == "__main__":
    main()
