import os
import re

WORKSPACE_DIR = r"c:\Users\Admin\Documents\joods antwerp"

def update_articles_list():
    # 1. Update articles.html
    en_path = os.path.join(WORKSPACE_DIR, "articles.html")
    if os.path.exists(en_path):
        with open(en_path, "r", encoding="utf-8") as f:
            content = f.read()
        content = content.replace(
            '<img src="images/Sholem_Aleichem.jpg" alt="Sholem Aleichem" style="object-fit: cover;">',
            '<img src="images/Sholem%20Aleichem\'s%20Motl,%20the%20Cantor\'s%20Son.jfif" alt="Sholem Aleichem\'s Motl" style="object-fit: cover;">'
        )
        with open(en_path, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"Updated card image in: {en_path}")

    # 2. Update nl/articles.html
    nl_path = os.path.join(WORKSPACE_DIR, "nl", "articles.html")
    if os.path.exists(nl_path):
        with open(nl_path, "r", encoding="utf-8") as f:
            content = f.read()
        content = content.replace(
            '<img src="../images/Sholem_Aleichem.jpg" alt="Sholem Aleichem" style="object-fit: cover;">',
            '<img src="../images/Sholem%20Aleichem\'s%20Motl,%20the%20Cantor\'s%20Son.jfif" alt="Sholem Aleichems Motl" style="object-fit: cover;">'
        )
        with open(nl_path, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"Updated card image in: {nl_path}")

    # 3. Update fr/articles.html
    fr_path = os.path.join(WORKSPACE_DIR, "fr", "articles.html")
    if os.path.exists(fr_path):
        with open(fr_path, "r", encoding="utf-8") as f:
            content = f.read()
        content = content.replace(
            '<img src="../images/Sholem_Aleichem.jpg" alt="Sholem Aleichem" style="object-fit: cover;">',
            '<img src="../images/Sholem%20Aleichem\'s%20Motl,%20the%20Cantor\'s%20Son.jfif" alt="Motl de Sholem Aleichem" style="object-fit: cover;">'
        )
        with open(fr_path, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"Updated card image in: {fr_path}")

    # 4. Update he/articles.html
    he_path = os.path.join(WORKSPACE_DIR, "he", "articles.html")
    if os.path.exists(he_path):
        with open(he_path, "r", encoding="utf-8") as f:
            content = f.read()
        content = content.replace(
            '<img src="../images/Sholem_Aleichem.jpg" alt="Sholem Aleichem" style="object-fit: cover;">',
            '<img src="../images/Sholem%20Aleichem\'s%20Motl,%20the%20Cantor\'s%20Son.jfif" alt="מוטל של שלום עליכם" style="object-fit: cover;">'
        )
        with open(he_path, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"Updated card image in: {he_path}")

def update_index_files():
    # 1. index.html
    en_index = os.path.join(WORKSPACE_DIR, "index.html")
    if os.path.exists(en_index):
        with open(en_index, "r", encoding="utf-8") as f:
            content = f.read()
        
        target_card = """              <article class="article-card">
                <div class="article-image">
                  <a href="#"><img src="https://placehold.co/800x400/2d2d2d/c5a059?text=Future+Article+2" alt="Future Article" style="object-fit: cover;"></a>
                </div>
                <div class="article-content">
                  <h3>Future Article 2</h3>
                  <p>Content for this historical article will be published soon. Stay tuned for updates.</p>
                  <a href="#" class="read-more">Read More &rarr;</a>
                </div>
              </article>"""
              
        new_card = """              <article class="article-card">
                <div class="article-image">
                  <a href="articles/sholem-aleichem-motl.html"><img src="images/Sholem%20Aleichem's%20Motl,%20the%20Cantor's%20Son.jfif" alt="Sholem Aleichem's Motl, the Cantor's Son" style="object-fit: cover;"></a>
                </div>
                <div class="article-content">
                  <h3>Sholem Aleichem's Motl in Antwerp</h3>
                  <p>Sholem Aleichem's portrayal of Antwerp in his final masterpiece, Motl the Cantor's Son, capturing the Jewish mass migration era.</p>
                  <a href="articles/sholem-aleichem-motl.html" class="read-more">Read More &rarr;</a>
                </div>
              </article>"""
        
        if target_card in content:
            content = content.replace(target_card, new_card)
        else:
            content = re.sub(
                r'<article class="article-card">\s*<div class="article-image">\s*<a href="#"><img src="https://placehold.co/800x400/2d2d2d/c5a059\?text=Future\+Article\+2"[^>]*></a>\s*</div>\s*<div class="article-content">\s*<h3>Future Article 2</h3>\s*<p>Content for this historical article will be published soon. Stay tuned for updates.</p>\s*<a href="#" class="read-more">Read More &rarr;</a>\s*</div>\s*</article>',
                new_card,
                content
            )
            
        with open(en_index, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"Updated index card in: {en_index}")

    # 2. nl/index.html
    nl_index = os.path.join(WORKSPACE_DIR, "nl", "index.html")
    if os.path.exists(nl_index):
        with open(nl_index, "r", encoding="utf-8") as f:
            content = f.read()
            
        target_card = """              <article class="article-card">
                <div class="article-image">
                  <a href="#"><img src="https://placehold.co/800x400/2d2d2d/c5a059?text=Future+Article+2" alt="Future Article" style="object-fit: cover;"></a>
                </div>
                <div class="article-content">
                  <h3>Toekomstig artikel 2</h3>
                  <p>De inhoud van dit historische artikel wordt binnenkort gepubliceerd. Blijf op de hoogte voor updates.</p>
                  <a href="#" class="read-more">Lees verder →</a>
                </div>
              </article>"""
              
        new_card = """              <article class="article-card">
                <div class="article-image">
                  <a href="articles/sholem-aleichem-motl.html"><img src="../images/Sholem%20Aleichem's%20Motl,%20the%20Cantor's%20Son.jfif" alt="Sholem Aleichems Motl, de Chazans zoon" style="object-fit: cover;"></a>
                </div>
                <div class="article-content">
                  <h3>Sholem Aleichems Motl in Antwerpen</h3>
                  <p>Sholem Aleichems weergave van Antwerpen in zijn laatste meesterwerk, Motl de Chazans zoon, over het tijdperk van de Joodse massamigratie.</p>
                  <a href="articles/sholem-aleichem-motl.html" class="read-more">Lees verder →</a>
                </div>
              </article>"""
              
        if target_card in content:
            content = content.replace(target_card, new_card)
        else:
            content = re.sub(
                r'<article class="article-card">\s*<div class="article-image">\s*<a href="#"><img src="https://placehold.co/800x400/2d2d2d/c5a059\?text=Future\+Article\+2"[^>]*></a>\s*</div>\s*<div class="article-content">\s*<h3>Toekomstig artikel 2</h3>\s*<p>De inhoud van dit historische artikel wordt binnenkort gepubliceerd. Blijf op de hoogte voor updates.</p>\s*<a href="#" class="read-more">Lees verder →</a>\s*</div>\s*</article>',
                new_card,
                content
            )
            
        with open(nl_index, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"Updated index card in: {nl_index}")

    # 3. fr/index.html
    fr_index = os.path.join(WORKSPACE_DIR, "fr", "index.html")
    if os.path.exists(fr_index):
        with open(fr_index, "r", encoding="utf-8") as f:
            content = f.read()
            
        target_card = """              <article class="article-card">
                <div class="article-image">
                  <a href="#"><img src="https://placehold.co/800x400/2d2d2d/c5a059?text=Future+Article+2" alt="Future Article" style="object-fit: cover;"></a>
                </div>
                <div class="article-content">
                  <h3>Futur article 2</h3>
                  <p>Le contenu de cet article historique sera publié prochainement. Restez à l'écoute des mises à jour.</p>
                  <a href="#" class="read-more">Lire la suite →</a>
                </div>
              </article>"""
              
        new_card = """              <article class="article-card">
                <div class="article-image">
                  <a href="articles/sholem-aleichem-motl.html"><img src="../images/Sholem%20Aleichem's%20Motl,%20the%20Cantor's%20Son.jfif" alt="Motl de Sholem Aleichem" style="object-fit: cover;"></a>
                </div>
                <div class="article-content">
                  <h3>Motl de Sholem Aleichem à Anvers</h3>
                  <p>La description d'Anvers par Sholem Aleichem dans son premier chef-d'œuvre, Motl le fils du chantre, capturant l'ère de la migration de masse juive.</p>
                  <a href="articles/sholem-aleichem-motl.html" class="read-more">Lire la suite →</a>
                </div>
              </article>"""
              
        if target_card in content:
            content = content.replace(target_card, new_card)
        else:
            content = re.sub(
                r'<article class="article-card">\s*<div class="article-image">\s*<a href="#"><img src="https://placehold.co/800x400/2d2d2d/c5a059\?text=Future\+Article\+2"[^>]*></a>\s*</div>\s*<div class="article-content">\s*<h3>Futur article 2</h3>\s*<p>Le contenu de cet article historique sera publié prochainement. Restez à l\'écoute des mises à jour.</p>\s*<a href="#" class="read-more">Lire la suite →</a>\s*</div>\s*</article>',
                new_card,
                content
            )
            
        with open(fr_index, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"Updated index card in: {fr_index}")

    # 4. he/index.html
    he_index = os.path.join(WORKSPACE_DIR, "he", "index.html")
    if os.path.exists(he_index):
        with open(he_index, "r", encoding="utf-8") as f:
            content = f.read()
            
        target_card = """              <article class="article-card">
                <div class="article-image">
                  <a href="#"><img src="https://placehold.co/800x400/2d2d2d/c5a059?text=Future+Article+2" alt="Future Article" style="object-fit: cover;"></a>
                </div>
                <div class="article-content">
                  <h3>סעיף 2 עתידי</h3>
                  <p>תוכן למאמר היסטורי זה יתפרסם בקרוב. הישארו מעודכנים לעדכונים.</p>
                  <a href="#" class="read-more">קרא עוד →</a>
                </div>
              </article>"""
              
        new_card = """              <article class="article-card">
                <div class="article-image">
                  <a href="articles/sholem-aleichem-motl.html"><img src="../images/Sholem%20Aleichem's%20Motl,%20the%20Cantor's%20Son.jfif" alt="מוטל של שלום עליכם באנטוורפן" style="object-fit: cover;"></a>
                </div>
                <div class="article-content">
                  <h3>מוטל של שלום עליכם באנטוורפן</h3>
                  <p>תיאורו של אנטוורפן ביצירת המופת של שלום עליכם, מוטל בן פייסי החזן, המציג את תקופת ההגירה ההמונית היהודית.</p>
                  <a href="articles/sholem-aleichem-motl.html" class="read-more">קרא עוד →</a>
                </div>
              </article>"""
              
        if target_card in content:
            content = content.replace(target_card, new_card)
        else:
            content = re.sub(
                r'<article class="article-card">\s*<div class="article-image">\s*<a href="#"><img src="https://placehold.co/800x400/2d2d2d/c5a059\?text=Future\+Article\+2"[^>]*></a>\s*</div>\s*<div class="article-content">\s*<h3>סעיף 2 עתידי</h3>\s*<p>תוכן למאמר היסטורי זה יתפרסם בקרוב. הישארו מעודכנים לעדכונים.</p>\s*<a href="#" class="read-more">קרא עוד →</a>\s*</div>\s*</article>',
                new_card,
                content
            )
            
        with open(he_index, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"Updated index card in: {he_index}")

if __name__ == "__main__":
    update_articles_list()
    update_index_files()
