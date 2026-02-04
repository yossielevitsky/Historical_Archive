document.addEventListener('DOMContentLoaded', () => {
    // Create Lightbox Elements
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <span class="lightbox-close">&times;</span>
        <img class="lightbox-content" id="lightbox-img">
        <div id="lightbox-caption"></div>
    `;
    document.body.appendChild(lightbox);

    const lightboxImg = document.getElementById('lightbox-img');
    const captionText = document.getElementById('lightbox-caption');
    const closeBtn = document.querySelector('.lightbox-close');

    // Select all images in the gallery grid
    const galleryImages = document.querySelectorAll('.synagogue-grid .card-image img');

    galleryImages.forEach(img => {
        // Add cursor pointer to indicate clickability
        img.style.cursor = 'pointer';

        img.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default link behavior if wrapped in link
            lightbox.style.display = 'block';
            lightboxImg.src = img.src;
            captionText.innerHTML = img.alt;
            document.body.style.overflow = 'hidden'; // Disable scroll
        });
    });

    // Close functionality
    closeBtn.onclick = function () {
        lightbox.style.display = "none";
        document.body.style.overflow = 'auto'; // Enable scroll
    }

    // Close when clicking outside the image
    lightbox.onclick = function (e) {
        if (e.target === lightbox) {
            lightbox.style.display = "none";
            document.body.style.overflow = 'auto';
        }
    }

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.style.display === 'block') {
            lightbox.style.display = "none";
            document.body.style.overflow = 'auto';
        }
    });
});
