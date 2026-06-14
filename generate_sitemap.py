import os
import subprocess
from datetime import datetime

base_url = "https://jewishantwerparchive.org/"
excluded_files = {
    "template_article.html",
    "template_event.html",
    "template_profile.html",
    "template_synagogue.html",
    "generic-synagogue.html",
}

def get_git_date(file_path):
    try:
        # Run git command to get the date of the last commit for this file in YYYY-MM-DD format
        result = subprocess.run(
            ["git", "log", "-1", "--format=%as", file_path],
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True,
            check=True
        )
        date_str = result.stdout.strip()
        if date_str:
            return date_str
    except Exception:
        pass
    
    # Fallback to file system modified time if not found in git (e.g. untracked file)
    try:
        mtime = os.path.getmtime(file_path)
        return datetime.fromtimestamp(mtime).strftime("%Y-%m-%d")
    except Exception:
        return datetime.today().strftime("%Y-%m-%d")

def get_priority_and_changefreq(rel_path):
    if rel_path == "index.html":
        return "1.0", "weekly"
    elif rel_path in ["history.html", "rabbis.html", "synagogues.html", "contribute.html", "holocaust/holocaust.html"]:
        return "0.8", "weekly"
    else:
        return "0.6", "monthly"

def main():
    html_files = []
    # Walk directory to find all HTML files
    for root, dirs, files in os.walk("."):
        # Skip hidden directories like .git
        if any(part.startswith('.') and part not in ('.', '..') for part in root.split(os.sep)):
            continue
        for file in files:
            if file.endswith(".html"):
                if file in excluded_files:
                    continue
                full_path = os.path.join(root, file)
                rel_path = os.path.relpath(full_path, ".").replace("\\", "/")
                html_files.append((rel_path, full_path))

    # Sort files alphabetically to keep sitemap clean and deterministic
    html_files.sort()

    xml_lines = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
    ]
    txt_lines = []

    for rel_path, full_path in html_files:
        # Map index.html to the root domain URL
        url = base_url if rel_path == "index.html" else base_url + rel_path
        date_str = get_git_date(full_path)
        priority, changefreq = get_priority_and_changefreq(rel_path)

        xml_lines.append("  <url>")
        xml_lines.append(f"    <loc>{url}</loc>")
        xml_lines.append(f"    <lastmod>{date_str}</lastmod>")
        xml_lines.append(f"    <changefreq>{changefreq}</changefreq>")
        xml_lines.append(f"    <priority>{priority}</priority>")
        xml_lines.append("  </url>")

        txt_lines.append(url)

    xml_lines.append("</urlset>")

    # Write sitemap.xml
    with open("sitemap.xml", "w", encoding="utf-8") as f:
        f.write("\n".join(xml_lines) + "\n")
    print(f"Generated sitemap.xml successfully with {len(html_files)} entries.")

    # Write sitemap.txt
    with open("sitemap.txt", "w", encoding="utf-8") as f:
        f.write("\n".join(txt_lines) + "\n")
    print("Generated sitemap.txt successfully.")

if __name__ == "__main__":
    main()
